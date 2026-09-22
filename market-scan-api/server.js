import express from "express";
import cors from "cors";
import * as cheerio from "cheerio";

const app = express();
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
  "get","new","home","page","contact","privacy","cookie","cookies"
]);

const BUYER_PATTERNS = [
  /looking for/i, /recommend(?:ation|ations)?/i, /alternative to/i, /best (?:tool|service|agency|company|software|provider)/i,
  /how much/i, /price|pricing|cost/i, /worth it/i, /where can i/i, /need (?:a|an|help)/i, /anyone use/i,
  /switch(?:ing)? from/i, /compare|comparison/i
];

const PAIN_PATTERNS = [
  /frustrat/i, /hate/i, /annoy/i, /problem/i, /issue/i, /difficult/i, /hard to/i, /too expensive/i,
  /slow/i, /confus/i, /doesn.?t work/i, /waste/i, /manual/i, /time consuming/i
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
  const timeout = setTimeout(() => controller.abort(), options.timeout || 9000);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "WebsiteliMarketScan/0.1 (+https://websiteli.ch)",
        "accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
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
  $("script,style,noscript,svg").remove();
  const text = cleanText($("body").text()).slice(0, 60000);
  const headings = $("h1,h2,h3").map((_, el) => cleanText($(el).text())).get().filter(Boolean).slice(0, 60);
  const ctas = $("a,button").map((_, el) => cleanText($(el).text())).get()
    .filter((x) => x && x.length <= 90).slice(0, 100);
  const links = $("a[href]").map((_, el) => $(el).attr("href")).get().filter(Boolean);
  return {
    url,
    title: cleanText($("title").first().text()),
    description: cleanText($('meta[name="description"]').attr("content")),
    headings,
    ctas,
    text,
    formCount: $("form").length,
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
    .slice(0, 24)
    .map(([term, count]) => ({ term, count }));
}

async function crawlSite(startUrl) {
  const origin = startUrl.origin;
  const seen = new Set();
  const queue = [startUrl.toString()];
  const pages = [];

  while (queue.length && pages.length < 6) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    try {
      const html = await fetchText(url);
      const page = pageFromHtml(url, html);
      pages.push(page);

      for (const href of page.links) {
        try {
          const absolute = new URL(href, url);
          absolute.hash = "";
          if (absolute.origin !== origin) continue;
          if (/\.(?:pdf|jpg|jpeg|png|gif|webp|svg|zip|xml)$/i.test(absolute.pathname)) continue;
          const normalized = absolute.toString();
          if (!seen.has(normalized) && queue.length < 30) queue.push(normalized);
        } catch {}
      }
    } catch (error) {
      if (!pages.length) throw new Error(`Could not crawl website: ${error.message}`);
    }
  }
  return pages;
}

async function redditSearch(query) {
  const url = new URL("https://www.reddit.com/search.json");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "35");
  url.searchParams.set("sort", "relevance");
  url.searchParams.set("t", "year");

  try {
    const raw = await fetchText(url.toString(), {
      headers: { accept: "application/json" },
      timeout: 8000,
    });
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

async function ddgSearch(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  try {
    const html = await fetchText(url, { timeout: 8000 });
    const $ = cheerio.load(html);
    return $(".result").slice(0, 12).map((_, el) => {
      const title = cleanText($(el).find(".result__a").text());
      const snippet = cleanText($(el).find(".result__snippet").text());
      const href = $(el).find(".result__a").attr("href") || "";
      return { title, snippet, url: href };
    }).get().filter((x) => x.title);
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

function classifySignals(reddit) {
  const buyer = [];
  const pains = [];
  for (const item of reddit) {
    const text = `${item.title} ${item.body}`;
    if (BUYER_PATTERNS.some((r) => r.test(text))) buyer.push(item);
    if (PAIN_PATTERNS.some((r) => r.test(text))) pains.push(item);
  }
  return { buyer, pains };
}

function makeContentOpportunities(reddit, keywords) {
  const questionPosts = reddit
    .filter((x) => /\?|\bhow\b|\bwhat\b|\bwhich\b|\bwhere\b|\bwhy\b|\brecommend/i.test(x.title))
    .map((x) => ({ title: x.title, source: x.url, subreddit: x.subreddit }))
    .slice(0, 12);

  if (questionPosts.length >= 8) return questionPosts;

  const fallback = keywords.slice(0, 12 - questionPosts.length).map((x) => ({
    title: `Create a practical guide around “${x.term}”`,
    source: "",
    subreddit: "",
  }));
  return [...questionPosts, ...fallback];
}

function makeAdAngles(pains, buyer, keywords) {
  const source = [...pains, ...buyer];
  const angles = [];
  for (const item of source) {
    const text = item.title;
    if (/price|pricing|cost|expensive/i.test(text)) angles.push("Price clarity: show exactly what customers get and what affects cost.");
    if (/slow|time|manual/i.test(text)) angles.push("Speed and simplicity: position the offer as a faster path with less manual work.");
    if (/recommend|best|alternative|compare/i.test(text)) angles.push("Comparison angle: explain when to choose you versus common alternatives.");
    if (/problem|issue|doesn.?t work|frustrat|hate/i.test(text)) angles.push("Pain-to-outcome angle: lead with the recurring frustration and show the concrete fix.");
  }
  if (!angles.length) {
    angles.push(
      "Outcome-first angle: lead with the main customer result instead of the implementation details.",
      "Trust angle: use evidence, examples and clear process steps to reduce perceived risk.",
      `Category angle: create a focused campaign around “${keywords[0]?.term || "your core service"}”.`
    );
  }
  return [...new Set(angles)].slice(0, 10);
}

function marketCandidates(results, ownHost) {
  const candidates = results
    .map((x) => {
      try {
        const parsed = new URL(x.url);
        return { name: parsed.hostname.replace(/^www\./, ""), url: x.url, context: x.title };
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter((x) => !x.name.includes(ownHost))
    .filter((x) => !/(reddit|youtube|linkedin|facebook|instagram|wikipedia|medium|quora)\./i.test(x.name));
  return uniqueBy(candidates, (x) => x.name).slice(0, 12);
}

app.get("/health", (_req, res) => res.json({ ok: true, service: "websiteli-market-scan", version: "0.1.0" }));

app.post("/api/scan", async (req, res) => {
  const startedAt = Date.now();
  try {
    const url = normalizeUrl(req.body?.url);
    const pages = await crawlSite(url);
    const corpus = pages.map((p) => [p.title, p.description, p.headings.join(" "), p.text].join(" ")).join(" ");
    const keywords = keywordCounts(corpus);
    const brand = pages[0]?.title?.split(/[|–—-]/)[0]?.trim() || url.hostname.replace(/^www\./, "");
    const coreTerms = keywords.slice(0, 4).map((x) => x.term);
    const topicQuery = [brand, ...coreTerms].filter(Boolean).slice(0, 5).join(" ");

    const [reddit, marketResults, reviewResults] = await Promise.all([
      redditSearch(topicQuery),
      ddgSearch(`${coreTerms.slice(0,3).join(" ")} services alternatives`),
      ddgSearch(`"${brand}" reviews customer experience`),
    ]);

    const signals = classifySignals(reddit);
    const competitors = marketCandidates(marketResults, url.hostname.replace(/^www\./, ""));
    const contentOpportunities = makeContentOpportunities(reddit, keywords);
    const adAngles = makeAdAngles(signals.pains, signals.buyer, keywords);

    const reviewMentions = reviewResults.map((x) => ({
      title: x.title,
      snippet: x.snippet,
      url: x.url,
    })).slice(0, 12);

    const result = {
      scannedUrl: url.toString(),
      brand,
      elapsedMs: Date.now() - startedAt,
      summary: {
        pagesCrawled: pages.length,
        buyerSignals: signals.buyer.length,
        redditDiscussions: reddit.length,
        reviewMentions: reviewMentions.length,
        competitorCandidates: competitors.length,
        contentOpportunities: contentOpportunities.length,
        adAngles: adAngles.length,
      },
      website: {
        title: pages[0]?.title || "",
        description: pages[0]?.description || "",
        formsFound: pages.reduce((sum, page) => sum + page.formCount, 0),
        keywords,
        pages: pages.map((p) => ({ url: p.url, title: p.title, headings: p.headings.slice(0, 8) })),
      },
      buyerSignals: signals.buyer.slice(0, 15),
      painPoints: signals.pains.slice(0, 15),
      redditDiscussions: reddit.slice(0, 25),
      reviewMentions,
      competitorCandidates: competitors,
      contentOpportunities,
      adAngles,
      methodology: {
        notes: [
          "Website data comes from a live crawl of up to six same-domain pages.",
          "Reddit counts are live search results from the previous year when Reddit permits the request.",
          "Review mentions are search-result mentions, not a full review-platform scrape.",
          "Competitors are candidates inferred from public search results and should be reviewed before outreach or strategy decisions."
        ]
      }
    };

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error?.message || "Scan failed" });
  }
});

app.listen(port, () => {
  console.log(`Websiteli Market Scan API listening on :${port}`);
});
