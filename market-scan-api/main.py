from __future__ import annotations

import asyncio
import html
import ipaddress
import json
import os
import re
import smtplib
import socket
import time
import uuid
from collections import Counter, defaultdict, deque
from dataclasses import dataclass
from email.message import EmailMessage
from typing import Any
from urllib.parse import parse_qs, quote_plus, unquote, urljoin, urlparse, urlunparse

import httpx
from bs4 import BeautifulSoup
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, HttpUrl


APP_VERSION = "0.4.0"
REPORT_TTL_SECONDS = 60 * 60
MAX_PAGES = 8
MAX_QUEUE = 40
MAX_REDIRECTS = 5
MAX_RESPONSE_BYTES = 2 * 1024 * 1024
REQUEST_TIMEOUT = 10.0
SCAN_CONCURRENCY = int(os.getenv("SCAN_CONCURRENCY", "3"))
SCAN_RATE_LIMIT = int(os.getenv("SCAN_RATE_LIMIT_PER_HOUR", "12"))
EMAIL_RATE_LIMIT = int(os.getenv("EMAIL_RATE_LIMIT_PER_HOUR", "12"))

app = FastAPI(title="Websiteli Market Scan API", version=APP_VERSION)
allowed_origins = [
    value.strip()
    for value in os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:4321,https://websiteli.ch"
    ).split(",")
    if value.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if "*" in allowed_origins else allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["content-type"],
)

report_cache: dict[str, dict[str, Any]] = {}
rate_buckets: dict[str, deque[float]] = defaultdict(deque)
scan_semaphore = asyncio.Semaphore(SCAN_CONCURRENCY)

STOPWORDS = {
    "the","and","for","that","with","this","from","your","you","are","our","was","were","have","has","had","not",
    "but","can","will","all","more","their","about","into","than","they","what","when","where","which","who","how",
    "why","a","an","to","of","in","on","at","as","is","it","be","or","we","i","my","me","us","by","if","so","do",
    "get","new","home","page","contact","privacy","cookie","cookies","und","der","die","das","ein","eine","mit","für",
    "von","auf","ist","im","zu","wir","sie","ihr","ihre"
}
BUYER_PATTERNS = [
    re.compile(x, re.I) for x in [
        r"looking for", r"recommend(?:ation|ations)?", r"alternative to",
        r"best (?:tool|service|agency|company|software|provider)", r"how much",
        r"price|pricing|cost", r"worth it", r"where can i", r"need (?:a|an|help)",
        r"anyone use", r"switch(?:ing)? from", r"compare|comparison",
        r"suche (?:nach|eine|einen)", r"empfehl", r"kosten|preis"
    ]
]
PAIN_PATTERNS = [
    re.compile(x, re.I) for x in [
        r"frustrat", r"hate", r"annoy", r"problem", r"issue", r"difficult",
        r"hard to", r"too expensive", r"slow", r"confus", r"doesn.?t work",
        r"waste", r"manual", r"time consuming", r"schwierig", r"nerv",
        r"funktioniert nicht", r"zu teuer", r"langsam"
    ]
]
BLOCKED_HOSTNAMES = {"localhost", "localhost.localdomain"}
ALLOWED_CONTENT_TYPES = (
    "text/html",
    "application/xhtml+xml",
    "application/json",
    "text/plain",
)


class ScanRequest(BaseModel):
    url: str


class EmailReportRequest(BaseModel):
    scanId: str
    email: EmailStr
    consent: bool


def cleanup_reports() -> None:
    now = time.time()
    expired = [
        scan_id
        for scan_id, item in report_cache.items()
        if now - item["created_at"] > REPORT_TTL_SECONDS
    ]
    for scan_id in expired:
        report_cache.pop(scan_id, None)


def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def enforce_rate_limit(bucket: str, ip: str, limit: int) -> None:
    now = time.time()
    key = f"{bucket}:{ip}"
    q = rate_buckets[key]
    while q and now - q[0] > 3600:
        q.popleft()
    if len(q) >= limit:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")
    q.append(now)


def normalize_url(value: str) -> str:
    raw = (value or "").strip()
    if not raw:
        raise ValueError("URL is required")
    candidate = raw if re.match(r"^https?://", raw, re.I) else f"https://{raw}"
    parsed = urlparse(candidate)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise ValueError("Please provide a valid public website URL")
    if parsed.username or parsed.password:
        raise ValueError("URLs with credentials are not allowed")
    host = parsed.hostname.rstrip(".").lower()
    if host in BLOCKED_HOSTNAMES or host.endswith(".localhost") or "." not in host:
        raise ValueError("Please provide a valid public website URL")
    port = parsed.port
    netloc = host if port is None else f"{host}:{port}"
    return urlunparse((parsed.scheme, netloc, parsed.path or "/", "", parsed.query, ""))


def is_public_ip(value: str) -> bool:
    ip = ipaddress.ip_address(value)
    return bool(
        ip.is_global
        and not ip.is_private
        and not ip.is_loopback
        and not ip.is_link_local
        and not ip.is_multicast
        and not ip.is_reserved
        and not ip.is_unspecified
    )


async def validate_public_target(url: str) -> None:
    parsed = urlparse(url)
    host = parsed.hostname
    if not host:
        raise ValueError("Invalid URL")
    if host.lower() in BLOCKED_HOSTNAMES or host.lower().endswith(".localhost"):
        raise ValueError("Private or local addresses are not allowed")

    try:
        literal = ipaddress.ip_address(host)
        if not is_public_ip(str(literal)):
            raise ValueError("Private or non-public IP addresses are not allowed")
        return
    except ValueError as exc:
        if "not allowed" in str(exc):
            raise
    try:
        infos = await asyncio.to_thread(
            socket.getaddrinfo,
            host,
            parsed.port or (443 if parsed.scheme == "https" else 80),
            type=socket.SOCK_STREAM,
        )
    except socket.gaierror as exc:
        raise ValueError("Website hostname could not be resolved") from exc

    addresses = {info[4][0] for info in infos}
    if not addresses or any(not is_public_ip(address) for address in addresses):
        raise ValueError("Private or non-public network destinations are not allowed")


async def fetch_text(
    url: str,
    *,
    timeout: float = REQUEST_TIMEOUT,
    accept: str = "text/html,application/xhtml+xml,application/json;q=0.9,text/plain;q=0.8",
) -> str:
    current = normalize_url(url)
    async with httpx.AsyncClient(
        timeout=httpx.Timeout(timeout),
        follow_redirects=False,
        headers={
            "user-agent": "WebsiteliMarketScan/0.4 (+https://websiteli.ch)",
            "accept": accept,
        },
    ) as client:
        for _ in range(MAX_REDIRECTS + 1):
            await validate_public_target(current)
            async with client.stream("GET", current) as response:
                if response.status_code in {301, 302, 303, 307, 308}:
                    location = response.headers.get("location")
                    if not location:
                        raise ValueError("Redirect without a destination")
                    current = normalize_url(urljoin(current, location))
                    continue
                response.raise_for_status()

                content_type = response.headers.get("content-type", "").lower()
                if content_type and not any(t in content_type for t in ALLOWED_CONTENT_TYPES):
                    raise ValueError(f"Unsupported response content type: {content_type.split(';')[0]}")

                content_length = response.headers.get("content-length")
                if content_length:
                    try:
                        if int(content_length) > MAX_RESPONSE_BYTES:
                            raise ValueError("Response is too large to scan safely")
                    except ValueError:
                        if content_length.isdigit():
                            raise

                chunks: list[bytes] = []
                size = 0
                async for chunk in response.aiter_bytes():
                    size += len(chunk)
                    if size > MAX_RESPONSE_BYTES:
                        raise ValueError("Response is too large to scan safely")
                    chunks.append(chunk)
                data = b"".join(chunks)
                encoding = response.encoding or "utf-8"
                return data.decode(encoding, errors="replace")
        raise ValueError("Too many redirects")


def clean_text(value: Any) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def page_from_html(url: str, raw_html: str) -> dict[str, Any]:
    soup = BeautifulSoup(raw_html, "lxml")
    for tag in soup(["script", "style", "noscript", "svg"]):
        tag.extract()

    body = soup.body.get_text(" ", strip=True) if soup.body else soup.get_text(" ", strip=True)
    text = clean_text(body)[:70000]
    headings = [
        clean_text(tag.get_text(" ", strip=True))
        for tag in soup.find_all(["h1", "h2", "h3"], limit=80)
    ]
    headings = [x for x in headings if x]
    ctas = [
        clean_text(tag.get_text(" ", strip=True))
        for tag in soup.find_all(["a", "button"], limit=160)
    ]
    ctas = [x for x in ctas if x and len(x) <= 90][:120]
    links = [tag.get("href") for tag in soup.find_all("a", href=True)]
    title = clean_text(soup.title.get_text(" ", strip=True) if soup.title else "")

    description = ""
    meta_desc = soup.find("meta", attrs={"name": re.compile("^description$", re.I)})
    if meta_desc:
        description = clean_text(meta_desc.get("content"))

    canonical = ""
    canonical_tag = soup.find("link", attrs={"rel": lambda v: v and "canonical" in v})
    if canonical_tag:
        canonical = clean_text(canonical_tag.get("href"))

    viewport = ""
    viewport_tag = soup.find("meta", attrs={"name": re.compile("^viewport$", re.I)})
    if viewport_tag:
        viewport = clean_text(viewport_tag.get("content"))

    hrefs = [str(x or "") for x in links]
    return {
        "url": url,
        "title": title,
        "description": description,
        "canonical": canonical,
        "viewport": viewport,
        "headings": headings,
        "ctas": ctas,
        "text": text,
        "formCount": len(soup.find_all("form")),
        "h1Count": len(soup.find_all("h1")),
        "mailtoCount": sum(1 for x in hrefs if x.lower().startswith("mailto:")),
        "phoneCount": sum(1 for x in hrefs if x.lower().startswith("tel:")),
        "hasAnalytics": bool(re.search(r"googletagmanager|gtag\(|google-analytics|plausible|matomo|clarity|contentsquare", raw_html, re.I)),
        "hasSchema": bool(soup.find("script", attrs={"type": "application/ld+json"})),
        "hasBooking": bool(re.search(r"calendly|booking|book now|book a|reserve|termin|buchen", raw_html, re.I)),
        "hasStrongCta": any(re.search(r"contact|book|buy|get started|quote|demo|call|subscribe|anfragen|kontakt|buchen|angebot", x, re.I) for x in ctas),
        "links": hrefs,
    }


def keyword_counts(text: str) -> list[dict[str, Any]]:
    tokens = re.findall(r"[a-zäöüß][a-zäöüß-]{2,}", text.lower(), re.I)
    counts = Counter(
        token for token in tokens
        if token not in STOPWORDS and len(token) <= 28
    )
    return [{"term": term, "count": count} for term, count in counts.most_common(30)]


async def crawl_site(start_url: str) -> list[dict[str, Any]]:
    parsed_start = urlparse(start_url)
    origin = (parsed_start.scheme, parsed_start.hostname, parsed_start.port)
    seen: set[str] = set()
    queue: deque[str] = deque([start_url])
    pages: list[dict[str, Any]] = []

    while queue and len(pages) < MAX_PAGES:
        url = queue.popleft()
        if url in seen:
            continue
        seen.add(url)
        try:
            page = page_from_html(url, await fetch_text(url))
            pages.append(page)
        except Exception as exc:
            if not pages:
                raise ValueError(f"Could not crawl website: {exc}") from exc
            continue

        def priority(href: str) -> int:
            return 0 if re.search(r"service|product|pricing|about|contact|solution|leistung|angebot|preis|kontakt", href, re.I) else 1

        for href in sorted(page["links"], key=priority):
            try:
                absolute = normalize_url(urljoin(url, href))
                parsed = urlparse(absolute)
                if (parsed.scheme, parsed.hostname, parsed.port) != origin:
                    continue
                if re.search(r"\.(?:pdf|jpg|jpeg|png|gif|webp|svg|zip|xml|mp4|mp3)$", parsed.path, re.I):
                    continue
                if absolute not in seen and len(queue) < MAX_QUEUE:
                    queue.append(absolute)
            except Exception:
                continue
    return pages


def decode_ddg_url(href: str) -> str:
    if not href:
        return ""
    absolute = urljoin("https://duckduckgo.com", href)
    parsed = urlparse(absolute)
    query = parse_qs(parsed.query)
    return unquote(query.get("uddg", [absolute])[0])


async def ddg_search(query: str, limit: int = 12) -> list[dict[str, Any]]:
    url = f"https://html.duckduckgo.com/html/?q={quote_plus(query)}"
    try:
        raw = await fetch_text(url, timeout=8.5)
    except Exception:
        return []
    soup = BeautifulSoup(raw, "lxml")
    results = []
    for result in soup.select(".result")[:limit]:
        a = result.select_one(".result__a")
        if not a:
            continue
        title = clean_text(a.get_text(" ", strip=True))
        snippet_tag = result.select_one(".result__snippet")
        results.append({
            "title": title,
            "snippet": clean_text(snippet_tag.get_text(" ", strip=True) if snippet_tag else ""),
            "url": decode_ddg_url(a.get("href") or ""),
        })
    return [x for x in results if x["title"]]


async def reddit_search(query: str) -> list[dict[str, Any]]:
    url = f"https://www.reddit.com/search.json?q={quote_plus(query)}&limit=40&sort=relevance&t=year"
    try:
        raw = await fetch_text(url, timeout=8.5, accept="application/json")
        payload = json.loads(raw)
    except Exception:
        return []
    results = []
    for child in payload.get("data", {}).get("children", []):
        data = child.get("data", {})
        title = clean_text(data.get("title"))
        if not title:
            continue
        permalink = data.get("permalink") or ""
        results.append({
            "title": title,
            "body": clean_text(data.get("selftext")),
            "subreddit": data.get("subreddit") or "",
            "score": int(data.get("score") or 0),
            "comments": int(data.get("num_comments") or 0),
            "url": f"https://www.reddit.com{permalink}" if permalink else "",
        })
    return results


def unique_by(items: list[dict[str, Any]], key_name: str = "url") -> list[dict[str, Any]]:
    seen: set[str] = set()
    output = []
    for item in items:
        key = str(item.get(key_name) or item.get("title") or "")
        if not key or key in seen:
            continue
        seen.add(key)
        output.append(item)
    return output


def classify_signals(items: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    buyer, pains = [], []
    for item in items:
        text = f"{item.get('title','')} {item.get('body','')} {item.get('snippet','')}"
        if any(p.search(text) for p in BUYER_PATTERNS):
            buyer.append(item)
        if any(p.search(text) for p in PAIN_PATTERNS):
            pains.append(item)
    return buyer, pains


def website_diagnostics(pages: list[dict[str, Any]]) -> dict[str, Any]:
    home = pages[0] if pages else {}
    all_text = " ".join(page["text"] for page in pages)
    forms = sum(page["formCount"] for page in pages)
    has_contact = any(page["mailtoCount"] or page["phoneCount"] or re.search(r"contact|kontakt", page["url"], re.I) for page in pages)
    checks = [
        {"key":"title","label":"Homepage title","passed":25 <= len(home.get("title","")) <= 70,"detail":f"{len(home.get('title',''))} characters" if home.get("title") else "Missing"},
        {"key":"description","label":"Meta description","passed":80 <= len(home.get("description","")) <= 180,"detail":f"{len(home.get('description',''))} characters" if home.get("description") else "Missing"},
        {"key":"h1","label":"Clear H1 structure","passed":home.get("h1Count",0) == 1,"detail":f"{home.get('h1Count',0)} H1 elements on homepage"},
        {"key":"cta","label":"Conversion CTA","passed":any(p["hasStrongCta"] for p in pages),"detail":"Action-oriented CTA detected" if any(p["hasStrongCta"] for p in pages) else "No strong action CTA detected"},
        {"key":"forms","label":"Lead capture","passed":forms > 0 or has_contact,"detail":f"{forms} form(s) detected" if forms > 0 else "Direct contact path detected" if has_contact else "No form or direct contact path detected"},
        {"key":"analytics","label":"Analytics","passed":any(p["hasAnalytics"] for p in pages),"detail":"Analytics marker detected" if any(p["hasAnalytics"] for p in pages) else "No common analytics marker detected"},
        {"key":"schema","label":"Structured data","passed":any(p["hasSchema"] for p in pages),"detail":"JSON-LD detected" if any(p["hasSchema"] for p in pages) else "No JSON-LD detected"},
        {"key":"mobile","label":"Mobile viewport","passed":bool(home.get("viewport")),"detail":"Viewport meta tag detected" if home.get("viewport") else "Viewport meta tag missing"},
        {"key":"content","label":"Service clarity","passed":len(all_text) > 1800 and len(pages) >= 3,"detail":f"{len(pages)} pages sampled"},
    ]
    score = round(sum(1 for x in checks if x["passed"]) / len(checks) * 100)
    return {"score": score, "checks": checks}


def priority_actions(diagnostics: dict[str, Any], pages: list[dict[str, Any]], buyer: list[dict[str, Any]], pains: list[dict[str, Any]], competitors: list[dict[str, Any]]) -> list[dict[str, str]]:
    failed = {x["key"] for x in diagnostics["checks"] if not x["passed"]}
    actions: list[dict[str, str]] = []
    if {"cta", "forms"} & failed:
        actions.append({"priority":"High","area":"Conversion","title":"Create one unmistakable primary conversion path","detail":"Use one primary CTA above the fold and repeat it near proof, pricing and the end of key pages. Remove competing actions where possible."})
    if {"title", "description", "h1"} & failed:
        actions.append({"priority":"High","area":"SEO","title":"Tighten search-facing positioning","detail":"Align the homepage title, meta description and H1 around the core offer, audience and geography instead of generic brand language."})
    if "analytics" in failed:
        actions.append({"priority":"High","area":"Measurement","title":"Track the actions that indicate commercial intent","detail":"Measure form submits, booking clicks, phone/email clicks and important CTA interactions so optimisation is based on outcomes."})
    if "schema" in failed:
        actions.append({"priority":"Medium","area":"SEO","title":"Add structured data","detail":"Add appropriate Organization/LocalBusiness, Service, FAQ or Article JSON-LD where the page content supports it."})
    if buyer:
        actions.append({"priority":"High","area":"Messaging","title":"Mirror real buyer language on high-intent pages","detail":f"Use recurring phrasing from public buyer conversations, especially questions like “{buyer[0]['title'][:120]}”."})
    if pains:
        actions.append({"priority":"Medium","area":"Content","title":"Answer the strongest recurring objection","detail":f"Create proof or content that directly addresses: “{pains[0]['title'][:120]}”."})
    if competitors:
        names = ", ".join(x["name"] for x in competitors[:3])
        actions.append({"priority":"Medium","area":"Positioning","title":"Build a clear alternative/comparison story","detail":f"Explain the situations where your offer differs from alternatives such as {names}."})
    if len(pages) < 4:
        actions.append({"priority":"Medium","area":"Content","title":"Create dedicated intent pages","detail":"Add focused service/use-case pages so visitors and search engines can understand specific offers without relying on one general page."})
    if not actions:
        actions.append({"priority":"Medium","area":"Experiment","title":"Test one stronger offer","detail":"The sampled fundamentals look healthy. Run a focused test on the primary offer, CTA wording or proof placement and measure qualified enquiries."})
    return actions[:7]


def make_content_opportunities(signals: list[dict[str, Any]], keywords: list[dict[str, Any]]) -> list[dict[str, Any]]:
    questions = [
        {"title":x["title"],"source":x.get("url",""),"context":x.get("snippet") or x.get("body") or ""}
        for x in signals
        if re.search(r"\?|\bhow\b|\bwhat\b|\bwhich\b|\bwhere\b|\bwhy\b|\brecommend", x.get("title",""), re.I)
    ][:12]
    if len(questions) >= 8:
        return questions
    fallback = [
        {"title":f"Create a decision-focused guide around “{x['term']}”","source":"","context":f"This term appears repeatedly on the scanned website ({x['count']} occurrences in sampled text)."}
        for x in keywords[:12-len(questions)]
    ]
    return questions + fallback


def make_ad_angles(pains: list[dict[str, Any]], buyer: list[dict[str, Any]], keywords: list[dict[str, Any]]) -> list[str]:
    angles: list[str] = []
    for item in pains + buyer:
        text = f"{item.get('title','')} {item.get('snippet','')}"
        if re.search(r"price|pricing|cost|expensive|kosten|preis|teuer", text, re.I):
            angles.append("Price clarity: make cost, scope and expected outcome easy to understand before the sales call.")
        if re.search(r"slow|time|manual|langsam|zeit", text, re.I):
            angles.append("Speed and simplicity: position the offer around less coordination, fewer manual steps and faster execution.")
        if re.search(r"recommend|best|alternative|compare|empfehl|vergleich", text, re.I):
            angles.append("Comparison angle: explain when to choose you instead of the common alternatives buyers are evaluating.")
        if re.search(r"problem|issue|doesn.?t work|frustrat|hate|schwierig|nerv", text, re.I):
            angles.append("Pain-to-outcome angle: open with the recurring frustration, then show the specific business outcome you create.")
    angles.extend([
        "Proof angle: lead with a concrete before/after example, result or implementation screenshot instead of generic capability claims.",
        f"Category angle: build a focused campaign around “{keywords[0]['term'] if keywords else 'your core service'}” and a single high-intent use case.",
    ])
    return list(dict.fromkeys(angles))[:10]


def market_candidates(results: list[dict[str, Any]], own_host: str) -> list[dict[str, Any]]:
    candidates = []
    seen = set()
    for item in results:
        try:
            host = (urlparse(item["url"]).hostname or "").removeprefix("www.")
        except Exception:
            continue
        if not host or own_host in host or re.search(r"(reddit|youtube|linkedin|facebook|instagram|wikipedia|medium|quora|duckduckgo)\.", host, re.I):
            continue
        if host in seen:
            continue
        seen.add(host)
        candidates.append({"name":host,"url":item["url"],"context":item["title"],"snippet":item.get("snippet","")})
    return candidates[:12]


def report_email_html(report: dict[str, Any]) -> str:
    def esc(value: Any) -> str:
        return html.escape(str(value or ""), quote=True)

    def list_html(items: list[Any], renderer) -> str:
        if not items:
            return '<p style="color:#666">No strong public signals were found for this section.</p>'
        return '<ul style="padding-left:20px">' + "".join(renderer(x) for x in items) + "</ul>"

    actions = list_html(report["priorityActions"], lambda x: f'<li style="margin:0 0 14px"><strong>{esc(x["priority"])} · {esc(x["area"])} — {esc(x["title"])}</strong><br><span>{esc(x["detail"])}</span></li>')
    diagnostics = list_html(report["website"]["diagnostics"], lambda x: f'<li style="margin:0 0 10px"><strong>{esc("OK" if x["passed"] else "Review")} — {esc(x["label"])}</strong>: {esc(x["detail"])}</li>')

    def source_renderer(x: dict[str, Any]) -> str:
        source = x.get("url") or x.get("source") or ""
        link = f' — <a href="{esc(source)}">source</a>' if source else ""
        body = (x.get("body") or x.get("snippet") or x.get("context") or "")[:360]
        return f'<li style="margin:0 0 12px"><strong>{esc(x.get("title") or x.get("name") or "Signal")}</strong>{link}<br><span>{esc(body)}</span></li>'

    score = report["website"]["opportunityScore"]
    return f'''<!doctype html><html><body style="font-family:Arial,sans-serif;color:#171717;line-height:1.5;max-width:760px;margin:auto;padding:28px">
<div style="font-size:13px;color:#8a6a45;text-transform:uppercase;letter-spacing:.08em;font-weight:700">Websiteli Market Scan</div>
<h1 style="margin:8px 0 4px">{esc(report["brand"])}</h1>
<p style="color:#666">{esc(report["scannedUrl"])}</p>
<div style="background:#f5f2ec;border-radius:14px;padding:18px;margin:22px 0"><strong style="font-size:32px">{score}/100</strong><br>Website opportunity score</div>
<h2>What we would fix first</h2>{actions}
<h2>Website diagnosis</h2>{diagnostics}
<h2>Buyer signals</h2>{list_html(report["buyerSignals"], source_renderer)}
<h2>Recurring pain points</h2>{list_html(report["painPoints"], source_renderer)}
<h2>Competitor candidates</h2>{list_html(report["competitorCandidates"], source_renderer)}
<h2>Content opportunities</h2>{list_html(report["contentOpportunities"], source_renderer)}
<h2>Ad angles worth testing</h2>{list_html(report["adAngles"], lambda x: f'<li style="margin:0 0 10px">{esc(x)}</li>')}
<p style="margin-top:30px;padding:18px;background:#111;color:#fff;border-radius:12px">Want Websiteli to implement the highest-impact fixes? <a style="color:#d9aa72" href="https://calendly.com/jenifer-ciuciu-kiss-websiteli/30min">Book a 30-minute call →</a></p>
<p style="font-size:12px;color:#777">Public data providers can rate-limit automated requests. Review mentions and competitors are discovery signals rather than complete platform datasets.</p>
</body></html>'''


def email_configured() -> bool:
    return bool(os.getenv("SMTP_HOST") and os.getenv("SMTP_USER") and os.getenv("SMTP_PASS"))


def send_report_email(to_email: str, report: dict[str, Any]) -> None:
    host = os.getenv("SMTP_HOST")
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASS")
    if not (host and user and password):
        raise RuntimeError("Report email delivery is not configured yet.")

    port = int(os.getenv("SMTP_PORT", "587"))
    sender = os.getenv("REPORT_FROM_EMAIL") or user
    reply_to = os.getenv("REPORT_REPLY_TO") or sender

    msg = EmailMessage()
    msg["From"] = sender
    msg["To"] = to_email
    msg["Reply-To"] = reply_to
    msg["Subject"] = f'Your Websiteli Market Scan — {report["brand"]}'
    msg.set_content("Your Websiteli Market Scan is available in the HTML version of this email.")
    msg.add_alternative(report_email_html(report), subtype="html")

    if port == 465:
        with smtplib.SMTP_SSL(host, port, timeout=15) as smtp:
            smtp.login(user, password)
            smtp.send_message(msg)
    else:
        with smtplib.SMTP(host, port, timeout=15) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.ehlo()
            smtp.login(user, password)
            smtp.send_message(msg)


@app.get("/health")
async def health() -> dict[str, Any]:
    return {
        "ok": True,
        "service": "websiteli-market-scan",
        "version": APP_VERSION,
        "emailConfigured": email_configured(),
    }


@app.post("/api/scan")
async def scan(payload: ScanRequest, request: Request) -> dict[str, Any]:
    enforce_rate_limit("scan", client_ip(request), SCAN_RATE_LIMIT)
    started = time.time()
    try:
        url = normalize_url(payload.url)
        await validate_public_target(url)
        async with scan_semaphore:
            pages = await crawl_site(url)

            corpus = " ".join(
                " ".join([p["title"], p["description"], " ".join(p["headings"]), p["text"]])
                for p in pages
            )
            keywords = keyword_counts(corpus)
            host = (urlparse(url).hostname or "").removeprefix("www.")
            title = pages[0]["title"] if pages else ""
            brand = re.split(r"[|–—-]", title)[0].strip() if title else host
            core_terms = [x["term"] for x in keywords[:5]]
            topic_query = " ".join(([brand] + core_terms)[:6])
            market_query = " ".join(core_terms[:3]) or brand

            reddit, buyer_web, pain_web, market_results, review_results = await asyncio.gather(
                reddit_search(topic_query),
                ddg_search(f"{market_query} recommendations forum", 12),
                ddg_search(f"{market_query} problems complaints", 12),
                ddg_search(f"{market_query} services alternatives competitors", 14),
                ddg_search(f'"{brand}" reviews customer experience', 12),
            )

        web_signals = unique_by(buyer_web + pain_web)
        reddit_buyer, reddit_pains = classify_signals(reddit)
        web_buyer, web_pains = classify_signals(web_signals)
        buyer_signals = unique_by(reddit_buyer + web_buyer)
        pain_points = unique_by(reddit_pains + web_pains)
        competitors = market_candidates(market_results, host)
        diagnostics = website_diagnostics(pages)
        content_opportunities = make_content_opportunities(reddit + web_signals, keywords)
        ad_angles = make_ad_angles(pain_points, buyer_signals, keywords)
        actions = priority_actions(diagnostics, pages, buyer_signals, pain_points, competitors)
        review_mentions = [
            {"title":x["title"],"snippet":x.get("snippet",""),"url":x["url"]}
            for x in review_results if x.get("url")
        ][:12]

        full_report = {
            "scannedUrl": url,
            "brand": brand,
            "elapsedMs": round((time.time() - started) * 1000),
            "summary": {
                "pagesCrawled": len(pages),
                "buyerSignals": len(buyer_signals),
                "redditDiscussions": len(reddit),
                "reviewMentions": len(review_mentions),
                "competitorCandidates": len(competitors),
                "contentOpportunities": len(content_opportunities),
                "adAngles": len(ad_angles),
                "priorityActions": len(actions),
            },
            "website": {
                "title": pages[0]["title"] if pages else "",
                "description": pages[0]["description"] if pages else "",
                "formsFound": sum(p["formCount"] for p in pages),
                "opportunityScore": diagnostics["score"],
                "diagnostics": diagnostics["checks"],
                "keywords": keywords,
                "pages": [{"url":p["url"],"title":p["title"],"headings":p["headings"][:8]} for p in pages],
            },
            "priorityActions": actions,
            "buyerSignals": buyer_signals[:15],
            "painPoints": pain_points[:15],
            "redditDiscussions": reddit[:25],
            "reviewMentions": review_mentions,
            "competitorCandidates": competitors,
            "contentOpportunities": content_opportunities,
            "adAngles": ad_angles,
            "methodology": {
                "notes": [
                    "Website findings come from a live crawl of up to eight same-domain pages.",
                    "The website opportunity score is a transparent heuristic based on nine observable website checks; it is not a guarantee of commercial performance.",
                    "Buyer signals combine public Reddit and web-search results when providers permit automated access.",
                    "Review mentions are search-result mentions, not a complete review-platform scrape.",
                    "Competitors are candidates inferred from public search results and should be reviewed before strategy decisions.",
                    "Public search providers may rate-limit requests, so zero results can mean unavailable data rather than zero market activity.",
                ]
            },
        }

        cleanup_reports()
        scan_id = str(uuid.uuid4())
        report_cache[scan_id] = {"created_at": time.time(), "report": full_report}
        return {
            "scanId": scan_id,
            "scannedUrl": full_report["scannedUrl"],
            "brand": full_report["brand"],
            "elapsedMs": full_report["elapsedMs"],
            "summary": full_report["summary"],
            "website": {"opportunityScore": full_report["website"]["opportunityScore"]},
            "priorityActions": full_report["priorityActions"][:3],
            "report": full_report,
            "reportLocked": False,
            "previewSeconds": 90,
        }
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc) or "Scan failed") from exc


@app.post("/api/email-report")
async def email_report(payload: EmailReportRequest, request: Request) -> dict[str, bool]:
    enforce_rate_limit("email", client_ip(request), EMAIL_RATE_LIMIT)
    cleanup_reports()
    if not payload.consent:
        raise HTTPException(status_code=400, detail="Consent is required")

    cached = report_cache.get(payload.scanId)
    if not cached:
        raise HTTPException(status_code=410, detail="This report expired. Please run a new scan.")
    if not email_configured():
        raise HTTPException(status_code=503, detail="Report email delivery is not configured yet.")

    try:
        await asyncio.to_thread(send_report_email, str(payload.email).lower(), cached["report"])
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Could not send the report email. Please try again.") from exc

    report_cache.pop(payload.scanId, None)
    return {"ok": True}
