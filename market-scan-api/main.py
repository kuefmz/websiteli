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
    "get","new","home","page","contact","privacy","cookie","cookies","read","learn","click","menu","blog","about","want","wants","wanted",
    "stay","loop","join","email","newsletter","subscribe","footer","copyright","rights","reserved",
    "und","der","die","das","ein","eine","mit","für","von","auf","ist","im","zu","wir","sie","ihr","ihre"
}
AGGREGATOR_HOSTS = {
    "g2.com","gartner.com","capterra.com","getapp.com","softwareadvice.com","trustradius.com",
    "selecthub.com","cbinsights.com","rankred.com","worldmetrics.org","slashdot.org","sourceforge.net",
    "6wresearch.com","statista.com","grandviewresearch.com","researchandmarkets.com",
    "marketresearch.com","marketsandmarkets.com"
}
NON_COMPETITOR_PATH_RE = re.compile(
    r"/(?:blog|blogs|article|articles|guide|guides|news|industry-report|report|reports|research|insights?|magazine)/",
    re.I,
)
REVIEW_HOST_HINTS = (
    "trustpilot.","g2.","capterra.","getapp.","trustradius.","clutch.","yelp.","glassdoor.",
    "google.com/maps","reviews.io","provenexpert.","tripadvisor."
)
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
            return 0 if re.search(r"service|product|pricing|shop|store|directory|compare|about|contact|solution|leistung|angebot|preis|kontakt|laden|geschäft", href, re.I) else 1

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
            "query": query,
            "provider": "DuckDuckGo",
        })
    return [x for x in results if x["title"]]


async def ddg_search_many(queries: list[str], per_query: int = 8) -> list[dict[str, Any]]:
    clean_queries = [clean_text(q) for q in queries if clean_text(q)]
    if not clean_queries:
        return []
    batches = await asyncio.gather(*(ddg_search(query, per_query) for query in clean_queries))
    return unique_by([item for batch in batches for item in batch])


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
            "query": query,
            "provider": "Reddit",
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


def is_conversational_signal(item: dict[str, Any]) -> bool:
    url = (item.get("url") or "").lower()
    host = (urlparse(url).hostname or "").lower()
    title = clean_text(item.get("title"))
    text = f"{title} {item.get('body','')} {item.get('snippet','')}"
    if any(token in host for token in ("reddit.com", "quora.com", "stackexchange.com", "gutefrage.net")):
        return True
    if re.search(r"/(?:forum|forums|community|discussion|discussions)/", url, re.I):
        return True
    if "?" in title:
        return True
    return bool(re.search(
        r"\b(?:looking for|can anyone|does anyone|anyone (?:use|know|recommend)|"
        r"recommend(?:ation|ations)?|where can i|what should i|which (?:one|shop|store|product)|"
        r"has anyone|i need|i'm looking|im looking|suche nach|kann jemand|empfehl)"
        r"\b",
        text,
        re.I,
    ))


def classify_signals(items: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    buyer, pains = [], []
    for item in items:
        if not is_conversational_signal(item):
            continue
        text = f"{item.get('title','')} {item.get('body','')} {item.get('snippet','')}"
        if any(p.search(text) for p in BUYER_PATTERNS):
            buyer.append(item)
        if any(p.search(text) for p in PAIN_PATTERNS):
            pains.append(item)
    return buyer, pains



def _content_tokens(value: str) -> list[str]:
    return [
        token for token in re.findall(r"[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ0-9+#.-]{2,}", (value or "").lower())
        if token not in STOPWORDS and not token.isdigit()
    ]


def extract_brand(title: str, fallback: str) -> str:
    cleaned = clean_text(title)
    if not cleaned:
        return fallback
    # Split only on visual title separators, never on hyphens inside names such as Ciuciu-Kiss.
    parts = re.split(r"\s+[|–—-]\s+|\s*\|\s*", cleaned, maxsplit=1)
    brand = clean_text(parts[0])
    return brand or fallback


def infer_market_profile(pages: list[dict[str, Any]], brand: str) -> dict[str, Any]:
    home = pages[0] if pages else {}
    title = clean_text(home.get("title", ""))
    description = clean_text(home.get("description", ""))
    headings = [clean_text(x) for x in home.get("headings", [])[:12]]
    visible = " ".join([title, description, *headings])
    brand_tokens = set(_content_tokens(brand))

    # Use titles/descriptions/headings from several sampled pages so category terms are not
    # inferred from the homepage slogan alone.
    fragments = [title, description, *headings]
    for page in pages[1:6]:
        fragments.extend([
            clean_text(page.get("title", "")),
            clean_text(page.get("description", "")),
            *[clean_text(x) for x in page.get("headings", [])[:6]],
        ])
    fragments = [
        fragment for fragment in fragments
        if len(_content_tokens(fragment)) >= 2
        and not re.fullmatch(r"(about|contact|home|blog|products? coming soon)(?:\s+" + re.escape(brand.lower()) + r")?", fragment.lower())
    ]

    phrase_scores: Counter[str] = Counter()
    for fragment in fragments:
        tokens = [t for t in _content_tokens(fragment) if t not in brand_tokens]
        for n in (2, 3):
            for i in range(0, max(0, len(tokens) - n + 1)):
                phrase = " ".join(tokens[i:i+n]).strip(" .,-")
                if len(phrase) >= 7:
                    base = 4 if n == 2 else 2
                    phrase_scores[phrase] += base if fragment in (title, description) else 1
    body_tokens = [
        token for token in _content_tokens(" ".join(page.get("text", "")[:16000] for page in pages))
        if token not in brand_tokens
    ]
    body_bigrams = Counter(
        f"{body_tokens[i]} {body_tokens[i+1]}"
        for i in range(len(body_tokens) - 1)
        if body_tokens[i] != body_tokens[i+1]
    )
    for phrase, count in body_bigrams.items():
        if count >= 2 and len(phrase) >= 7:
            phrase_scores[phrase] += min(count, 5)

    phrases = []
    for phrase, _ in phrase_scores.most_common(30):
        tokens = set(_content_tokens(phrase))
        if not tokens:
            continue
        # Keep the search vocabulary diverse instead of returning three overlapping
        # variants such as "pleasure product", "product price", "price comparison".
        if any(len(tokens & set(_content_tokens(existing))) / max(1, len(tokens)) > 0.75 for existing in phrases):
            continue
        phrases.append(phrase)
        if len(phrases) >= 4:
            break

    full_text = " ".join(page.get("text", "") for page in pages)
    location = ""
    if re.search(r"\b(switzerland|swiss|schweiz|suisse|svizzera)\b", full_text, re.I):
        location = "Switzerland"
    elif re.search(r"\b(germany|deutschland)\b", full_text, re.I):
        location = "Germany"
    elif re.search(r"\b(austria|österreich)\b", full_text, re.I):
        location = "Austria"
    elif re.search(r"\b(spain|españa)\b", full_text, re.I):
        location = "Spain"
    elif re.search(r"\b(portugal)\b", full_text, re.I):
        location = "Portugal"

    lower_urls = " ".join(page.get("url", "").lower() for page in pages)
    lower_visible = visible.lower()
    commercial_markers = [
        r"/services?\b", r"/pricing\b", r"/shop\b", r"/products?\b", r"/solutions?\b",
        r"consult(?:ing|ant)", r"agency", r"book (?:a )?(?:call|demo|consultation)",
        r"get a quote", r"request a quote", r"hire me", r"work with me", r"services"
    ]
    personal_markers = [
        r"\bphd\b", r"\bcv\b", r"resume", r"portfolio", r"publications?", r"researcher",
        r"data engineer", r"machine learning engineer", r"personal website"
    ]
    commercial_hits = sum(bool(re.search(p, lower_urls + " " + lower_visible, re.I)) for p in commercial_markers)
    commercial_hits += min(2, sum(1 for page in pages if page.get("hasBooking")))
    personal_hits = sum(bool(re.search(p, lower_visible, re.I)) for p in personal_markers)
    has_money_page = bool(re.search(r"/pricing\b|/shop\b|/services?\b|/solutions?\b|/products?\b", lower_urls, re.I))

    if has_money_page or commercial_hits >= 3:
        site_type = "commercial"
        confidence = "high"
    elif commercial_hits >= 1 and personal_hits <= 1:
        site_type = "commercial"
        confidence = "medium"
    elif personal_hits >= 2 and not has_money_page:
        site_type = "personal"
        confidence = "low"
    else:
        site_type = "informational"
        confidence = "low"

    positioning = description or (headings[0] if headings else title)
    query_terms = phrases[:3]
    if not query_terms:
        query_terms = [x["term"] for x in keyword_counts(visible)[:4]]

    return {
        "siteType": site_type,
        "marketConfidence": confidence,
        "positioning": positioning[:280],
        "queryTerms": query_terms[:4],
        "marketLocation": location,
        "commercialSignals": commercial_hits,
        "personalSignals": personal_hits,
    }


def result_relevance(item: dict[str, Any], terms: list[str]) -> float:
    haystack = f"{item.get('title','')} {item.get('snippet','')} {item.get('body','')}".lower()
    hay_tokens = set(_content_tokens(haystack))
    best = 0.0
    for term in terms:
        term_tokens = [t for t in _content_tokens(term) if len(t) >= 4]
        if not term_tokens:
            continue
        overlap = sum(1 for token in term_tokens if token in hay_tokens)
        ratio = overlap / len(term_tokens)
        phrase_bonus = 0.35 if term.lower() in haystack else 0.0
        best = max(best, ratio + phrase_bonus)
    return round(best, 3)


def filter_relevant(items: list[dict[str, Any]], terms: list[str], minimum: float = 0.72) -> list[dict[str, Any]]:
    scored = []
    for item in items:
        score = result_relevance(item, terms)
        if score < minimum:
            continue
        enriched = dict(item)
        enriched["relevance"] = score
        scored.append((score, enriched))
    scored.sort(key=lambda pair: pair[0], reverse=True)
    return unique_by([item for _, item in scored])


def expanded_market_terms(profile: dict[str, Any]) -> list[str]:
    terms = [clean_text(x) for x in profile.get("queryTerms", []) if clean_text(x)]
    positioning = clean_text(profile.get("positioning", "")).lower()
    expansions = []
    if re.search(r"\bpleasure products?\b|\badult products?\b|\bintimate products?\b", positioning):
        expansions.extend(["sex toys", "intimate products"])
    if re.search(r"\bprice comparison\b|compare prices", positioning):
        expansions.append("price comparison")
    output = []
    for term in [*expansions, *terms]:
        term_l = term.lower()
        if term_l not in [x.lower() for x in output]:
            output.append(term)
    return output[:4]


def build_market_queries(profile: dict[str, Any], brand: str) -> dict[str, Any]:
    terms = expanded_market_terms(profile)
    if not terms:
        return {}
    location = clean_text(profile.get("marketLocation", ""))
    geo = f" {location}" if location else ""

    buyer = []
    pain = []
    competitors = []
    reddit = []
    for term in terms[:3]:
        buyer.extend([
            f'"{term}"{geo} recommendations',
            f'"{term}"{geo} compare prices',
        ])
        pain.extend([
            f'"{term}"{geo} problems',
            f'"{term}"{geo} complaints',
        ])
        competitors.extend([
            f'"{term}"{geo} shops',
            f'"{term}"{geo} alternatives',
        ])
        reddit.append(f'site:reddit.com "{term}"{geo}')

    return {
        "terms": terms,
        "buyer": buyer,
        "pain": pain,
        "competitors": competitors,
        "reddit": reddit,
        "reviews": [f'"{brand}" reviews'],
    }


def site_specific_content_opportunities(profile: dict[str, Any], pages: list[dict[str, Any]], signals: list[dict[str, Any]]) -> list[dict[str, Any]]:
    opportunities = []
    seen = set()

    # First prefer actual questions/concerns from relevant public conversations.
    for item in signals:
        title = clean_text(item.get("title"))
        if not title or title.lower() in seen:
            continue
        seen.add(title.lower())
        opportunities.append({
            "title": title,
            "source": item.get("url", ""),
            "context": clean_text(item.get("snippet") or item.get("body") or "")[:260],
            "basis": "external-signal",
        })
        if len(opportunities) >= 4:
            return opportunities

    positioning = clean_text(profile.get("positioning", ""))
    positioning_lower = positioning.lower()
    page_text = " ".join(
        " ".join([p.get("title", ""), p.get("description", ""), " ".join(p.get("headings", [])), p.get("text", "")[:6000]])
        for p in pages
    ).lower()

    if re.search(r"price comparison|compare prices", positioning_lower):
        candidates = [
            (
                "Explain exactly how your price comparison works",
                ["how we compare", "methodology", "how it works"],
                "Build trust by showing which stores are covered, how often prices update and what the comparison includes.",
            ),
            (
                "Compare total purchase cost, not only the sticker price",
                ["shipping cost", "delivery cost", "total price", "total cost"],
                "A decision page that combines product price, shipping cost and delivery time can be more useful than a simple price table.",
            ),
            (
                "Show how you decide which stores are trustworthy",
                ["trusted stores", "store criteria", "retailer criteria", "verified stores"],
                "Explain the criteria behind store inclusion, payment safety, discreet delivery and customer-service quality.",
            ),
            (
                "Create a buyer guide for choosing between similar products",
                ["buying guide", "how to choose", "which product", "comparison guide"],
                "Help visitors decide what to buy before asking them to compare where to buy it.",
            ),
        ]
    else:
        terms = profile.get("queryTerms") or []
        offer = clean_text(terms[0] if terms else "")
        candidates = [
            (
                f"Explain how {offer} works and what customers should expect",
                ["how it works", "process", "steps"],
                "A clear process page can reduce uncertainty for visitors who are evaluating the offer.",
            ),
            (
                f"Clarify who {offer} is for — and who it is not for",
                ["who it is for", "ideal for", "best for"],
                "Specific fit criteria help qualified visitors recognise themselves and reduce weak enquiries.",
            ),
            (
                f"Publish a transparent pricing and scope guide for {offer}",
                ["pricing", "price", "cost", "scope"],
                "Decision-stage visitors often need a clearer understanding of cost, inclusions and trade-offs.",
            ),
            (
                f"Create an alternatives and comparison guide for {offer}",
                ["alternative", "compare", "comparison"],
                "A fair comparison page can capture high-intent visitors already evaluating alternatives.",
            ),
        ]

    for title, markers, context in candidates:
        if any(marker in page_text for marker in markers):
            continue
        opportunities.append({
            "title": title,
            "source": "",
            "context": context,
            "basis": "website-gap",
        })
        if len(opportunities) >= 4:
            break
    return opportunities


def extract_review_mentions(results: list[dict[str, Any]], own_host: str, brand: str) -> list[dict[str, Any]]:
    mentions = []
    brand_tokens = [t for t in _content_tokens(brand) if len(t) >= 4]
    for item in results:
        url = item.get("url") or ""
        host = (urlparse(url).hostname or "").lower().removeprefix("www.")
        haystack = f"{item.get('title','')} {item.get('snippet','')}".lower()
        if not host or own_host in host:
            continue
        if not any(hint in host or hint in url.lower() for hint in REVIEW_HOST_HINTS):
            continue
        if brand_tokens and not any(token in haystack for token in brand_tokens):
            continue
        mentions.append({"title":item["title"],"snippet":item.get("snippet",""),"url":url})
    return unique_by(mentions)[:8]


def executive_summary(profile: dict[str, Any], diagnostics: dict[str, Any], actions: list[dict[str, Any]], buyer: list[dict[str, Any]], competitors: list[dict[str, Any]]) -> dict[str, Any]:
    failed = [x for x in diagnostics["checks"] if not x["passed"]]
    healthy = [x for x in diagnostics["checks"] if x["passed"]]
    top_action = actions[0]["title"] if actions else "Keep testing the primary offer"
    if profile["siteType"] == "personal":
        headline = "Strong personal presence, but not enough commercial positioning to map a reliable buyer market."
        market_note = "This site reads primarily as a personal/professional profile, so generic market and competitor results are intentionally suppressed rather than guessed."
    elif profile["marketConfidence"] == "high":
        headline = f"Strong website foundation. The clearest next improvement is: {top_action}."
        if buyer or competitors:
            market_note = f"This run found {len(buyer)} relevant buyer-intent signals and {len(competitors)} plausible market alternatives."
        else:
            market_note = "The public search providers returned no external findings that passed our relevance threshold in this run, so we did not pad the report with unrelated results."
    else:
        headline = f"The website is readable, but the commercial market is not clear enough to infer confidently. The clearest website action is: {top_action}."
        market_note = "External findings are shown only when they match the website's detected positioning closely enough."

    return {
        "headline": headline,
        "positioning": profile.get("positioning", ""),
        "marketNote": market_note,
        "topAction": top_action,
        "healthyCount": len(healthy),
        "opportunityCount": len(failed),
        "marketConfidence": profile.get("marketConfidence", "low"),
        "siteType": profile.get("siteType", "informational"),
    }


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
        {"key":"content","label":"Content depth","passed":len(all_text) > 1800 and len(pages) >= 3,"detail":f"{len(pages)} pages sampled"},
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
    if pains or buyer:
        angles.append("Proof angle: use a concrete before/after example or implementation result that addresses the strongest observed buyer concern.")
    return list(dict.fromkeys(angles))[:6]


def market_candidates(results: list[dict[str, Any]], own_host: str, location: str = "") -> list[dict[str, Any]]:
    candidates = []
    seen = set()
    for item in results:
        try:
            parsed = urlparse(item["url"])
            host = (parsed.hostname or "").removeprefix("www.").lower()
            path = parsed.path or "/"
        except Exception:
            continue

        if (
            not host
            or own_host in host
            or host in AGGREGATOR_HOSTS
            or NON_COMPETITOR_PATH_RE.search(path)
            or re.search(r"(reddit|youtube|linkedin|facebook|instagram|wikipedia|medium|quora|duckduckgo|researchgate)\.", host, re.I)
        ):
            continue

        context = f"{item.get('title','')} {item.get('snippet','')}"
        lower = context.lower()

        if location == "Switzerland":
            swiss = host.endswith(".ch") or bool(re.search(r"\b(swiss|switzerland|schweiz|suisse|svizzera)\b", context, re.I))
            if not swiss:
                continue

        transactional = bool(re.search(
            r"\b(shop|store|sexshop|sex shop|online shop|online store|buy|products?|catalog|retailer|retail|compare prices|price comparison)\b",
            lower,
            re.I,
        ))
        if not transactional:
            continue

        if host in seen:
            continue
        seen.add(host)

        candidate_type = (
            "direct"
            if re.search(r"\b(shop|store|sexshop|sex shop|retailer|buy|products?|catalog)\b", lower, re.I)
            else "indirect"
        )
        candidates.append({
            "name": host,
            "url": item["url"],
            "context": item["title"],
            "snippet": item.get("snippet", ""),
            "type": candidate_type,
            "relevance": item.get("relevance"),
        })

    candidates.sort(key=lambda x: (0 if x["type"] == "direct" else 1, -(x.get("relevance") or 0)))
    return candidates[:10]


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
<div style="background:#f5f2ec;border-radius:14px;padding:18px;margin:22px 0"><strong style="font-size:32px">{score}/100</strong><br>Website fundamentals score</div>
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
        "version": "0.6.0",
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
            brand = extract_brand(title, host)
            profile = infer_market_profile(pages, brand)
            query_terms = profile["queryTerms"]
            queries = build_market_queries(profile, brand)

            search_terms = expanded_market_terms(profile)
            if profile["siteType"] == "commercial" and queries:
                primary_reddit_query = " ".join(search_terms[:2]) + (f" {profile.get('marketLocation')}" if profile.get("marketLocation") else "")
                reddit, reddit_web, buyer_web, pain_web, market_results, review_results = await asyncio.gather(
                    reddit_search(primary_reddit_query.strip()),
                    ddg_search_many(queries["reddit"], 6),
                    ddg_search_many(queries["buyer"], 6),
                    ddg_search_many(queries["pain"], 6),
                    ddg_search_many(queries["competitors"], 8),
                    ddg_search_many(queries["reviews"], 10),
                )
            else:
                reddit, reddit_web, buyer_web, pain_web, market_results = [], [], [], [], []
                review_results = await ddg_search(f'"{brand}" reviews', 12)

        relevance_terms = search_terms or query_terms
        relevant_reddit = filter_relevant(unique_by(reddit + reddit_web), relevance_terms, 0.72)
        relevant_buyer_web = filter_relevant(buyer_web, relevance_terms, 0.72)
        relevant_pain_web = filter_relevant(pain_web, relevance_terms, 0.72)
        reddit_buyer, reddit_pains = classify_signals(relevant_reddit)
        web_buyer, _ = classify_signals(relevant_buyer_web)
        _, web_pains = classify_signals(relevant_pain_web)
        buyer_signals = unique_by(reddit_buyer + web_buyer)
        pain_points = unique_by(reddit_pains + web_pains)
        relevant_market = filter_relevant(unique_by(market_results + buyer_web), relevance_terms, 0.78)
        competitors = market_candidates(relevant_market, host, profile.get("marketLocation", ""))
        diagnostics = website_diagnostics(pages)
        content_opportunities = (
            site_specific_content_opportunities(profile, pages, buyer_signals + pain_points)
            if profile["siteType"] == "commercial"
            else []
        )
        ad_angles = make_ad_angles(pain_points, buyer_signals, keywords) if profile["siteType"] == "commercial" else []
        actions = priority_actions(diagnostics, pages, buyer_signals, pain_points, competitors)
        review_mentions = extract_review_mentions(review_results, host, brand)
        exec_summary = executive_summary(profile, diagnostics, actions, buyer_signals, competitors)

        full_report = {
            "scannedUrl": url,
            "brand": brand,
            "elapsedMs": round((time.time() - started) * 1000),
            "summary": {
                "pagesCrawled": len(pages),
                "buyerSignals": len(buyer_signals),
                "redditDiscussions": len(relevant_reddit),
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
            "executive": exec_summary,
            "marketProfile": profile,
            "research": {
                "queries": queries if profile["siteType"] == "commercial" else {"reviews": f'"{brand}" reviews'},
                "relevanceThreshold": 0.72,
                "competitorThreshold": 0.78,
                "rawCounts": {
                    "redditApi": len(reddit),
                    "redditWeb": len(reddit_web),
                    "buyerWeb": len(buyer_web),
                    "painWeb": len(pain_web),
                    "marketWeb": len(market_results),
                    "reviewWeb": len(review_results),
                },
                "filteredCounts": {
                    "reddit": len(relevant_reddit),
                    "buyerWeb": len(relevant_buyer_web),
                    "painWeb": len(relevant_pain_web),
                    "marketWeb": len(relevant_market),
                    "reviews": len(review_mentions),
                },
                "note": "External findings are shown only when they pass a site-specific relevance threshold. Empty sections are preferred over unrelated results.",
            },
            "priorityActions": actions,
            "buyerSignals": buyer_signals[:10],
            "painPoints": pain_points[:10],
            "redditDiscussions": relevant_reddit[:12],
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
