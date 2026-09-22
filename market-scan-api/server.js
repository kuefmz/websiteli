import express from "express";
import cors from "cors";
import * as cheerio from "cheerio";
import nodemailer from "nodemailer";
import crypto from "node:crypto";

const app = express();
const reportCache = new Map();
const REPORT_TTL_MS = 60 * 60 * 1000;

function cleanupReports() {
  const now = Date.now();
  for (const [id, entry] of reportCache.entries()) if (now - entry.createdAt > REPORT_TTL_MS) reportCache.delete(id);
}

function getMailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: String(SMTP_PORT || "587") === "465",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[ch]));
}

function listHtml(items, render) {
  if (!items?.length) return "<p style=\"color:#666\">No strong public signals were found for this section.</p>";
  return `<ul style=\"padding-left:20px\">${items.map(render).join("")}</ul>`;
}

function reportEmailHtml(report) {
  const actionHtml = listHtml(report.priorityActions, (x) => `<li style=\"margin:0 0 14px\"><strong>${escapeHtml(x.priority)} · ${escapeHtml(x.area)} — ${escapeHtml(x.title)}</strong><br><span>${escapeHtml(x.detail)}</span></li>`);
  const diagnosticHtml = listHtml(report.website?.diagnostics, (x) => `<li style=\"margin:0 0 10px\"><strong>${escapeHtml(x.passed ? "OK" : "Review")} — ${escapeHtml(x.label)}</strong>: ${escapeHtml(x.detail)}</li>`);
  const sourceHtml = (items) => listHtml(items, (x) => `<li style=\"margin:0 0 12px\"><strong>${escapeHtml(x.title || x.name || "Signal")}</strong>${x.url || x.source ? ` — <a href=\"${escapeHtml(x.url || x.source)}\">source</a>` : ""}<br><span>${escapeHtml((x.body || x.snippet || x.context || "").slice(0,360))}</span></li>`);
  const angleHtml = listHtml(report.adAngles, (x) => `<li style=\"margin:0 0 10px\">${escapeHtml(x)}</li>`);
  return `<!doctype html><html><body style=\"font-family:Arial,sans-serif;color:#171717;line-height:1.5;max-width:760px;margin:auto;padding:28px\">
    <div style=\"font-size:13px;color:#8a6a45;text-transform:uppercase;letter-spacing:.08em;font-weight:700\">Websiteli Market Scan</div>
    <h1 style=\"margin:8px 0 4px\">${escapeHtml(report.brand)}</h1>
    <p style=\"color:#666\">${escapeHtml(report.scannedUrl)}</p>
    <div style=\"background:#f5f2ec;border-radius:14px;padding:18px;margin:22px 0\"><strong style=\"font-size:32px\">${escapeHtml(report.website?.opportunityScore)}/100</strong><br>Website opportunity score</div>
    <h2>What we would fix first</h2>${actionHtml}
    <h2>Website diagnosis</h2>${diagnosticHtml}
    <h2>Buyer signals</h2>${sourceHtml(report.buyerSignals)}
    <h2>Recurring pain points</h2>${sourceHtml(report.painPoints)}
    <h2>Competitor candidates</h2>${sourceHtml(report.competitorCandidates)}
    <h2>Content opportunities</h2>${sourceHtml(report.contentOpportunities)}
    <h2>Ad angles worth testing</h2>${angleHtml}
    <p style=\"margin-top:30px;padding:18px;background:#111;color:#fff;border-radius:12px\">Want Websiteli to implement the highest-impact fixes? <a style=\"color:#d9aa72\" href=\"https://calendly.com/jenifer-ciuciu-kiss-websiteli/30min\">Book a 30-minute call →</a></p>
    <p style=\"font-size:12px;color:#777\">Public data providers can rate-limit automated requests. Review mentions and competitors are discovery signals rather than complete platform datasets.</p>
  </body></html>`;
}
const port = Number(process.env.PORT || 8787);
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:4321,https://websiteli.ch")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Origin not allowed"));
  },
}));
app.use(express.json({ limit: "64kb" }));

const STOPWORDS = new Set([
  "the","and","for","that","with","this","from","your","you","are","our","was","were","have","has","had","not",
  "but","can","will","all","more","their","about","into","than","they","what","when","where","which","who","how",
  "why","a","an","to","of","in","on","at","as","is","it","be","or","we","i","my","me","us","by","if","so","do",
  "get","new","home","page","contact","privacy","cookie","cookies","und","der","die","das","ein","eine","mit","für",
  "von","auf","ist","im","zu","wir","sie","ihr","ihre"
]);

const BUYER_PATTERNS = [
  /looking for/i, /recommend(?:ation|ations)?/i, /alternative to/i, /best (?:tool|service|agency|company|software|provider)/i,
  /how much/i, /price|pricing|cost/i, /worth it/i, /where can i/i, /need (?:a|an|help)/i, /anyone use/i,
  /switch(?:ing)? from/i, /compare|comparison/i, /suche (?:nach|eine|einen)/i, /empfehl/i, /kosten|preis/i
];

const PAIN_PATTERNS = [
  /frustrat/i, /hate/i, /annoy/i, /problem/i, /issue/i, /difficult/i, /hard to/i, /too expensive/i,
  /slow/i, /confus/i, /doesn.?t work/i, /waste/i, /manual/i, /time consuming/i, /schwierig/i, /nerv/i,
  /funktioniert nicht/i, /zu teuer/i, /langsam/i
];

function normalizeUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) throw new Error("URL is required");
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const parsed = new URL(candidate);
  if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname.includes(".")) {
    throw new Error("Please provide a valid public website URL");
  }
  parsed.hash = "";
  return parsed;
}

async function fetchText(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || 10000);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "WebsiteliMarketScan/0.2 (+https://websiteli.ch)",
        accept: "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
        ...(options.headers || {}),
      },
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function pageFromHtml(url, html) {
  const $ = cheerio.load(html);
  const rawHtml = html;
  $("script,style,noscript,svg").remove();

  const text = cleanText($("body").text()).slice(0, 70000);
  const headings = $("h1,h2,h3").map((_, el) => cleanText($(el).text())).get().filter(Boolean).slice(0, 80);
  const ctas = $("a,button").map((_, el) => cleanText($(el).text())).get().filter((x) => x && x.length <= 90).slice(0, 120);
  const links = $("a[href]").map((_, el) => $(el).attr("href")).get().filter(Boolean);
  const title = cleanText($("title").first().text());
  const description = cleanText($('meta[name="description"]').attr("content"));
  const canonical = cleanText($('link[rel="canonical"]').attr("href"));
  const viewport = cleanText($('meta[name="viewport"]').attr("content"));
  const h1Count = $("h1").length;
  const mailtoCount = $('a[href^="mailto:"]').length;
  const phoneCount = $('a[href^="tel:"]').length;
  const hasAnalytics = /googletagmanager|gtag\(|google-analytics|plausible|matomo|clarity|contentsquare/i.test(rawHtml);
  const hasSchema = $('script[type="application/ld+json"]').length > 0;
  const hasBooking = /calendly|booking|book now|book a|reserve|termin|buchen/i.test(rawHtml);
  const hasStrongCta = ctas.some((x) => /contact|book|buy|get started|quote|demo|call|subscribe|anfragen|kontakt|buchen|angebot/i.test(x));

  return {
    url,
    title,
    description,
    canonical,
    viewport,
    headings,
    ctas,
    text,
    formCount: $("form").length,
    h1Count,
    mailtoCount,
    phoneCount,
    hasAnalytics,
    hasSchema,
    hasBooking,
    hasStrongCta,
    links,
  };
}

function keywordCounts(text) {
  const counts = new Map();
  for (const token of text.toLowerCase().match(/[a-zäöüß][a-zäöüß-]{2,}/gi) || []) {
    if (STOPWORDS.has(token) || token.length > 28) continue;
    counts.set(token, (counts.get(token) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a,b) => b[1] - a[1])
    .slice(0, 30)
    .map(([term, count]) => ({ term, count }));
}

async function crawlSite(startUrl) {
  const origin = startUrl.origin;
  const seen = new Set();
  const queue = [startUrl.toString()];
  const pages = [];

  while (queue.length && pages.length < 8) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    try {
      const html = await fetchText(url);
      const page = pageFromHtml(url, html);
      pages.push(page);

      const prioritized = [...page.links].sort((a,b) => {
        const score = (href) => /service|product|pricing|about|contact|solution|leistung|angebot|preis|kontakt/i.test(href) ? 0 : 1;
        return score(a) - score(b);
      });

      for (const href of prioritized) {
        try {
          const absolute = new URL(href, url);
          absolute.hash = "";
          if (absolute.origin !== origin) continue;
          if (/\.(?:pdf|jpg|jpeg|png|gif|webp|svg|zip|xml|mp4|mp3)$/i.test(absolute.pathname)) continue;
          const normalized = absolute.toString();
          if (!seen.has(normalized) && queue.length < 40) queue.push(normalized);
        } catch {}
      }
    } catch (error) {
      if (!pages.length) throw new Error(`Could not crawl website: ${error.message}`);
    }
  }
  return pages;
}

function decodeDdgUrl(href) {
  if (!href) return "";
  try {
    const absolute = new URL(href, "https://duckduckgo.com");
    const uddg = absolute.searchParams.get("uddg");
    return uddg ? decodeURIComponent(uddg) : absolute.toString();
  } catch {
    return href;
  }
}

async function ddgSearch(query, limit = 12) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  try {
    const html = await fetchText(url, { timeout: 8500 });
    const $ = cheerio.load(html);
    return $(".result").slice(0, limit).map((_, el) => {
      const title = cleanText($(el).find(".result__a").text());
      const snippet = cleanText($(el).find(".result__snippet").text());
      const href = decodeDdgUrl($(el).find(".result__a").attr("href") || "");
      return { title, snippet, url: href };
    }).get().filter((x) => x.title);
  } catch {
    return [];
  }
}

async function redditSearch(query) {
  const url = new URL("https://www.reddit.com/search.json");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "40");
  url.searchParams.set("sort", "relevance");
  url.searchParams.set("t", "year");

  try {
    const raw = await fetchText(url.toString(), { headers: { accept: "application/json" }, timeout: 8500 });
    const json = JSON.parse(raw);
    return (json?.data?.children || []).map(({ data }) => ({
      title: cleanText(data?.title),
      body: cleanText(data?.selftext),
      subreddit: data?.subreddit || "",
      score: Number(data?.score || 0),
      comments: Number(data?.num_comments || 0),
      url: data?.permalink ? `https://www.reddit.com${data.permalink}` : "",
    })).filter((x) => x.title);
  } catch {
    return [];
  }
}

function uniqueBy(items, keyFn) {
  const seen = new Set();
  return items.filter((item) => {
    const key = keyFn(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function classifySignals(items) {
  const buyer = [];
  const pains = [];
  for (const item of items) {
    const text = `${item.title || ""} ${item.body || ""} ${item.snippet || ""}`;
    if (BUYER_PATTERNS.some((r) => r.test(text))) buyer.push(item);
    if (PAIN_PATTERNS.some((r) => r.test(text))) pains.push(item);
  }
  return { buyer, pains };
}

function websiteDiagnostics(pages) {
  const home = pages[0] || {};
  const allText = pages.map((p) => p.text).join(" ");
  const forms = pages.reduce((sum, p) => sum + p.formCount, 0);
  const hasContact = pages.some((p) => p.mailtoCount || p.phoneCount || /contact|kontakt/i.test(p.url));
  const checks = [
    { key:"title", label:"Homepage title", passed: home.title?.length >= 25 && home.title?.length <= 70, detail: home.title ? `${home.title.length} characters` : "Missing" },
    { key:"description", label:"Meta description", passed: home.description?.length >= 80 && home.description?.length <= 180, detail: home.description ? `${home.description.length} characters` : "Missing" },
    { key:"h1", label:"Clear H1 structure", passed: home.h1Count === 1, detail: `${home.h1Count || 0} H1 elements on homepage` },
    { key:"cta", label:"Conversion CTA", passed: pages.some((p) => p.hasStrongCta), detail: pages.some((p) => p.hasStrongCta) ? "Action-oriented CTA detected" : "No strong action CTA detected" },
    { key:"forms", label:"Lead capture", passed: forms > 0 || hasContact, detail: forms > 0 ? `${forms} form(s) detected` : hasContact ? "Direct contact path detected" : "No form or direct contact path detected" },
    { key:"analytics", label:"Analytics", passed: pages.some((p) => p.hasAnalytics), detail: pages.some((p) => p.hasAnalytics) ? "Analytics marker detected" : "No common analytics marker detected" },
    { key:"schema", label:"Structured data", passed: pages.some((p) => p.hasSchema), detail: pages.some((p) => p.hasSchema) ? "JSON-LD detected" : "No JSON-LD detected" },
    { key:"mobile", label:"Mobile viewport", passed: Boolean(home.viewport), detail: home.viewport ? "Viewport meta tag detected" : "Viewport meta tag missing" },
    { key:"content", label:"Service clarity", passed: allText.length > 1800 && pages.length >= 3, detail: `${pages.length} pages sampled` },
  ];
  const score = Math.round(checks.filter((x) => x.passed).length / checks.length * 100);
  return { score, checks };
}

function priorityActions(diagnostics, pages, buyerSignals, pains, competitors) {
  const failed = new Set(diagnostics.checks.filter((x) => !x.passed).map((x) => x.key));
  const actions = [];

  if (failed.has("cta") || failed.has("forms")) actions.push({
    priority:"High", area:"Conversion", title:"Create one unmistakable primary conversion path",
    detail:"Use one primary CTA above the fold and repeat it near proof, pricing and the end of key pages. Remove competing actions where possible."
  });
  if (failed.has("title") || failed.has("description") || failed.has("h1")) actions.push({
    priority:"High", area:"SEO", title:"Tighten search-facing positioning",
    detail:"Align the homepage title, meta description and H1 around the core offer, audience and geography instead of generic brand language."
  });
  if (failed.has("analytics")) actions.push({
    priority:"High", area:"Measurement", title:"Track the actions that indicate commercial intent",
    detail:"Measure form submits, booking clicks, phone/email clicks and important CTA interactions so optimisation is based on outcomes."
  });
  if (failed.has("schema")) actions.push({
    priority:"Medium", area:"SEO", title:"Add structured data",
    detail:"Add appropriate Organization/LocalBusiness, Service, FAQ or Article JSON-LD where the page content supports it."
  });
  if (buyerSignals.length) actions.push({
    priority:"High", area:"Messaging", title:"Mirror real buyer language on high-intent pages",
    detail:`Use recurring phrasing from public buyer conversations, especially questions like “${buyerSignals[0].title.slice(0,120)}”.`
  });
  if (pains.length) actions.push({
    priority:"Medium", area:"Content", title:"Answer the strongest recurring objection",
    detail:`Create proof or content that directly addresses: “${pains[0].title.slice(0,120)}”.`
  });
  if (competitors.length) actions.push({
    priority:"Medium", area:"Positioning", title:"Build a clear alternative/comparison story",
    detail:`Explain the situations where your offer differs from alternatives such as ${competitors.slice(0,3).map((x) => x.name).join(", ")}.`
  });
  if (pages.length < 4) actions.push({
    priority:"Medium", area:"Content", title:"Create dedicated intent pages",
    detail:"Add focused service/use-case pages so visitors and search engines can understand specific offers without relying on one general page."
  });
  if (!actions.length) actions.push({
    priority:"Medium", area:"Experiment", title:"Test one stronger offer",
    detail:"The sampled fundamentals look healthy. Run a focused test on the primary offer, CTA wording or proof placement and measure qualified enquiries."
  });
  return actions.slice(0, 7);
}

function makeContentOpportunities(allSignals, keywords) {
  const questionPosts = allSignals
    .filter((x) => /\?|\bhow\b|\bwhat\b|\bwhich\b|\bwhere\b|\bwhy\b|\brecommend/i.test(x.title || ""))
    .map((x) => ({ title: x.title, source: x.url || "", context: x.snippet || x.body || "" }))
    .slice(0, 12);
  if (questionPosts.length >= 8) return questionPosts;

  const fallback = keywords.slice(0, 12 - questionPosts.length).map((x) => ({
    title: `Create a decision-focused guide around “${x.term}”`,
    source: "",
    context: `This term appears repeatedly on the scanned website (${x.count} occurrences in sampled text).`,
  }));
  return [...questionPosts, ...fallback];
}

function makeAdAngles(pains, buyer, keywords) {
  const source = [...pains, ...buyer];
  const angles = [];
  for (const item of source) {
    const text = `${item.title || ""} ${item.snippet || ""}`;
    if (/price|pricing|cost|expensive|kosten|preis|teuer/i.test(text)) angles.push("Price clarity: make cost, scope and expected outcome easy to understand before the sales call.");
    if (/slow|time|manual|langsam|zeit/i.test(text)) angles.push("Speed and simplicity: position the offer around less coordination, fewer manual steps and faster execution.");
    if (/recommend|best|alternative|compare|empfehl|vergleich/i.test(text)) angles.push("Comparison angle: explain when to choose you instead of the common alternatives buyers are evaluating.");
    if (/problem|issue|doesn.?t work|frustrat|hate|schwierig|nerv/i.test(text)) angles.push("Pain-to-outcome angle: open with the recurring frustration, then show the specific business outcome you create.");
  }
  angles.push(
    "Proof angle: lead with a concrete before/after example, result or implementation screenshot instead of generic capability claims.",
    `Category angle: build a focused campaign around “${keywords[0]?.term || "your core service"}” and a single high-intent use case.`
  );
  return [...new Set(angles)].slice(0, 10);
}

function marketCandidates(results, ownHost) {
  const candidates = results.map((x) => {
    try {
      const parsed = new URL(x.url);
      return { name: parsed.hostname.replace(/^www\./, ""), url: x.url, context: x.title, snippet: x.snippet };
    } catch { return null; }
  })
    .filter(Boolean)
    .filter((x) => !x.name.includes(ownHost))
    .filter((x) => !/(reddit|youtube|linkedin|facebook|instagram|wikipedia|medium|quora|duckduckgo)\./i.test(x.name));
  return uniqueBy(candidates, (x) => x.name).slice(0, 12);
}

app.get("/health", (_req, res) => res.json({ ok:true, service:"websiteli-market-scan", version:"0.3.0", emailConfigured:Boolean(getMailer()) }));

app.post("/api/scan", async (req, res) => {
  const startedAt = Date.now();
  try {
    const url = normalizeUrl(req.body?.url);
    const pages = await crawlSite(url);
    const corpus = pages.map((p) => [p.title,p.description,p.headings.join(" "),p.text].join(" ")).join(" ");
    const keywords = keywordCounts(corpus);
    const brand = pages[0]?.title?.split(/[|–—-]/)[0]?.trim() || url.hostname.replace(/^www\./, "");
    const coreTerms = keywords.slice(0,5).map((x) => x.term);
    const topicQuery = [brand,...coreTerms].filter(Boolean).slice(0,6).join(" ");
    const marketQuery = coreTerms.slice(0,3).join(" ") || brand;

    const [reddit, buyerWeb, painWeb, marketResults, reviewResults] = await Promise.all([
      redditSearch(topicQuery),
      ddgSearch(`${marketQuery} recommendations forum`, 12),
      ddgSearch(`${marketQuery} problems complaints`, 12),
      ddgSearch(`${marketQuery} services alternatives competitors`, 14),
      ddgSearch(`"${brand}" reviews customer experience`, 12),
    ]);

    const webSignals = uniqueBy([...buyerWeb,...painWeb], (x) => x.url || x.title);
    const redditSignals = classifySignals(reddit);
    const webClassified = classifySignals(webSignals);
    const buyerSignals = uniqueBy([...redditSignals.buyer,...webClassified.buyer], (x) => x.url || x.title);
    const painPoints = uniqueBy([...redditSignals.pains,...webClassified.pains], (x) => x.url || x.title);
    const competitors = marketCandidates(marketResults, url.hostname.replace(/^www\./, ""));
    const diagnostics = websiteDiagnostics(pages);
    const contentOpportunities = makeContentOpportunities([...reddit,...webSignals], keywords);
    const adAngles = makeAdAngles(painPoints,buyerSignals,keywords);
    const actions = priorityActions(diagnostics,pages,buyerSignals,painPoints,competitors);

    const reviewMentions = reviewResults.map((x) => ({
      title:x.title, snippet:x.snippet, url:x.url,
    })).filter((x) => x.url).slice(0,12);

    const fullReport = {
      scannedUrl:url.toString(),
      brand,
      elapsedMs:Date.now()-startedAt,
      summary:{
        pagesCrawled:pages.length,
        buyerSignals:buyerSignals.length,
        redditDiscussions:reddit.length,
        reviewMentions:reviewMentions.length,
        competitorCandidates:competitors.length,
        contentOpportunities:contentOpportunities.length,
        adAngles:adAngles.length,
        priorityActions:actions.length,
      },
      website:{
        title:pages[0]?.title || "",
        description:pages[0]?.description || "",
        formsFound:pages.reduce((sum,p)=>sum+p.formCount,0),
        opportunityScore:diagnostics.score,
        diagnostics:diagnostics.checks,
        keywords,
        pages:pages.map((p)=>({url:p.url,title:p.title,headings:p.headings.slice(0,8)})),
      },
      priorityActions:actions,
      buyerSignals:buyerSignals.slice(0,15),
      painPoints:painPoints.slice(0,15),
      redditDiscussions:reddit.slice(0,25),
      reviewMentions,
      competitorCandidates:competitors,
      contentOpportunities,
      adAngles,
      methodology:{
        notes:[
          "Website findings come from a live crawl of up to eight same-domain pages.",
          "The website opportunity score is a transparent heuristic based on nine observable website checks; it is not a guarantee of commercial performance.",
          "Buyer signals combine public Reddit and web-search results when providers permit automated access.",
          "Review mentions are search-result mentions, not a complete review-platform scrape.",
          "Competitors are candidates inferred from public search results and should be reviewed before strategy decisions.",
          "Public search providers may rate-limit requests, so zero results can mean unavailable data rather than zero market activity."
        ]
      }
    };
    cleanupReports();
    const scanId = crypto.randomUUID();
    reportCache.set(scanId, { createdAt:Date.now(), report:fullReport });
    res.json({
      scanId,
      scannedUrl:fullReport.scannedUrl,
      brand:fullReport.brand,
      elapsedMs:fullReport.elapsedMs,
      summary:fullReport.summary,
      website:{ opportunityScore:fullReport.website.opportunityScore },
      priorityActions:fullReport.priorityActions.slice(0,3),
      reportLocked:true
    });
  } catch (error) {
    res.status(400).json({ error:error?.message || "Scan failed" });
  }
});

app.post("/api/email-report", async (req, res) => {
  cleanupReports();
  const scanId = String(req.body?.scanId || "");
  const email = String(req.body?.email || "").trim().toLowerCase();
  const consent = req.body?.consent === true;
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return res.status(400).json({ error:"Please provide a valid email address" });
  if (!consent) return res.status(400).json({ error:"Consent is required" });
  const cached = reportCache.get(scanId);
  if (!cached) return res.status(410).json({ error:"This report expired. Please run a new scan." });
  const mailer = getMailer();
  if (!mailer) return res.status(503).json({ error:"Report email delivery is not configured yet." });

  const from = process.env.REPORT_FROM_EMAIL || process.env.SMTP_USER;
  await mailer.sendMail({
    from,
    to:email,
    replyTo:process.env.REPORT_REPLY_TO || from,
    subject:`Your Websiteli Market Scan — ${cached.report.brand}`,
    html:reportEmailHtml(cached.report),
  });
  reportCache.delete(scanId);
  res.json({ ok:true });
});

app.listen(port, () => console.log(`Websiteli Market Scan API listening on :${port}`));
