import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { test } from "node:test";

const distDir = join(process.cwd(), "dist");
const attributionRuntimePath = join(process.cwd(), "src/components/AttributionRuntime.astro");
const pricingRuntimePath = join(process.cwd(), "src/components/PricingRuntime.astro");
const layoutPath = join(process.cwd(), "src/layouts/Layout.astro");

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);

      return entry.isDirectory() ? collectFiles(path) : path;
    }),
  );

  return files.flat();
}

async function readDistFile(path) {
  return readFile(join(distDir, path), "utf8");
}

function decodeHtmlAttribute(value) {
  return value
    .replace(/&amp;|&#38;/g, "&")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;|&#60;/g, "<")
    .replace(/&gt;|&#62;/g, ">");
}

function getPagePath(file) {
  const pagePath = `/${relative(distDir, file).replace(/\\/g, "/")}`;

  return pagePath.endsWith("/index.html") ? pagePath.replace(/index\.html$/, "") : pagePath;
}

function getTargetFilePath(pathname) {
  const normalizedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = extname(normalizedPath) ? normalizedPath : `${normalizedPath.replace(/\/$/, "")}/index.html`;
  const resolved = resolve(distDir, filePath.replace(/^\//, ""));

  assert.ok(resolved.startsWith(resolve(distDir)), `Resolved link escapes dist: ${pathname}`);

  return resolved;
}

function getHtmlReferences(html) {
  const references = [];
  const attributePattern = /\b(?:href|src|action)=["']([^"']+)["']/gi;
  const srcsetPattern = /\bsrcset=["']([^"']+)["']/gi;
  let match;

  while ((match = attributePattern.exec(html))) {
    references.push(decodeHtmlAttribute(match[1]));
  }

  while ((match = srcsetPattern.exec(html))) {
    decodeHtmlAttribute(match[1])
      .split(",")
      .map((candidate) => candidate.trim().split(/\s+/)[0])
      .filter(Boolean)
      .forEach((candidate) => references.push(candidate));
  }

  return references;
}

function getAnchors(html) {
  const anchors = new Set();
  const anchorPattern = /\b(?:id|name)=["']([^"']+)["']/gi;
  let match;

  while ((match = anchorPattern.exec(html))) {
    anchors.add(decodeHtmlAttribute(match[1]));
  }

  return anchors;
}

function getInternalUrl(rawReference, sourceFile) {
  const reference = rawReference.trim();

  if (
    !reference ||
    reference.startsWith("mailto:") ||
    reference.startsWith("tel:") ||
    reference.startsWith("data:") ||
    reference.startsWith("javascript:") ||
    reference.startsWith("//")
  ) {
    return null;
  }

  const sourceUrl = new URL(getPagePath(sourceFile), "https://websiteli.ch");
  const url = new URL(reference, sourceUrl);

  if (url.origin !== "https://websiteli.ch") return null;

  return url;
}

function getStructuredData(html) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) return [];

  return JSON.parse(match[1]);
}

test("localized pages include the browser pricing runtime", async () => {
  const englishHome = await readDistFile("en/index.html");

  assert.match(englishHome, /websiteli_attribution/);
  assert.match(englishHome, /localStorage/);
  assert.match(englishHome, /window\.websiteliGetPricingForCountry/);
  assert.match(englishHome, /utm_detected/);
  assert.match(englishHome, /campaign_landing/);
  assert.match(englishHome, /websiteliShowAttribution/);
  assert.match(englishHome, /landing_page/);
  assert.match(englishHome, /Services &amp; Pricing/);
  assert.match(englishHome, /Website maintenance/i);
});

test("root page redirects to the localized English site", async () => {
  const root = await readDistFile("index.html");
  const legacyServices = await readDistFile("en/services/index.html");
  const demoRedirect = await readDistFile("en/demos/shopify-consultant-portfolio/index.html");

  assert.match(root, /new URL\("\/en\/", window\.location\.origin\)/);
  assert.match(root, /websiteli_redirect_context/);
  assert.match(root, /referrer: document\.referrer/);
  assert.match(root, /target\.search = window\.location\.search/);
  assert.doesNotMatch(root, /http-equiv="refresh"/);
  assert.match(root, /Continue to Websiteli/);
  assert.match(legacyServices, /target\.search = window\.location\.search/);
  assert.match(legacyServices, /websiteli_redirect_context/);
  assert.match(demoRedirect, /target\.search = window\.location\.search/);
  assert.match(demoRedirect, /websiteli_redirect_context/);
});

test("pricing source of truth contains supported markets and packages", async () => {
  const source = JSON.parse(await readFile(join(process.cwd(), "src/config/pricing.json"), "utf8"));

  assert.equal(source.CH.currency, "CHF");
  assert.equal(source.US.currency, "USD");
  assert.equal(source.GB.currency, "GBP");
  assert.equal(source.HU.currency, "HUF");
  assert.equal(source.PL.currency, "PLN");
  assert.equal(source.CZ.currency, "CZK");
  assert.equal(source.DK.currency, "DKK");
  assert.equal(source.JP.currency, "JPY");
  assert.equal(source.EU.currency, "EUR");
  assert.equal(source.CH.packages.digitalFoundation.from, 990);
  assert.equal(typeof source.CH.packages.digitalFoundation.from, "number");
  assert.equal(typeof source.CH.packages.growthSetup.from, "number");
  assert.equal(typeof source.CH.packages.aiDataUpgrade.from, "number");
});

test("pricing resolves from IP lookups without a user-facing market selector", async () => {
  const attribution = await readFile(attributionRuntimePath, "utf8");
  const source = await readFile(pricingRuntimePath, "utf8");
  const layout = await readFile(layoutPath, "utf8");
  const files = await collectFiles(distDir);
  const frontendFiles = files.filter((file) => /\.(html|js)$/.test(file));
  const combined = (await Promise.all(frontendFiles.map((file) => readFile(file, "utf8").catch(() => "")))).join("\n");

  assert.match(attribution, /readAttributionFromUrl/);
  assert.match(attribution, /readRedirectContext/);
  assert.match(attribution, /original_referrer/);
  assert.match(attribution, /firstTouch/);
  assert.match(attribution, /lastTouch/);
  assert.match(attribution, /window\.localStorage/);
  assert.match(attribution, /getCurrentAttribution/);
  assert.match(attribution, /source: attribution\.utm_source/);
  assert.match(attribution, /medium: attribution\.utm_medium/);
  assert.match(attribution, /campaign: attribution\.utm_campaign/);
  assert.match(source, /api\.country\.is/);
  assert.match(source, /ipapi\.co/);
  assert.match(source, /geojs\.io/);
  assert.match(source, /cloudflare-trace/);
  assert.match(source, /Promise\.all/);
  assert.match(layout, /getWebsiteliEventAttribution/);
  assert.match(attribution, /utm_campaign/);
  assert.match(layout, /gtag\('config', 'G-TGZY875FGJ', gtagConfig\)/);
  assert.match(layout, /analyticsPagePath = page === "home" \? "\/" : ""/);
  assert.match(layout, /gtagConfig\.page_path = analyticsPagePath/);
  assert.match(layout, /analyticsPageUrl\.search = window\.location\.search/);
  assert.match(layout, /page_location = window\.location\.href/);
  assert.match(layout, /campaign_source/);
  assert.match(layout, /campaign_medium/);
  assert.match(layout, /campaign_name/);
  assert.match(layout, /page_referrer/);
  assert.match(layout, /gtag\('set', attributionParams\)/);
  assert.match(layout, /debug_mode/);
  assert.doesNotMatch(layout, /page_view/);
  assert.doesNotMatch(source, /data-market-select|market_change_select/);
  assert.doesNotMatch(combined, /websiteli_market|document\.cookie/);
});

test("EU countries and unknown countries map to the correct fallback markets", async () => {
  const source = await readFile(pricingRuntimePath, "utf8");
  const pricingConfig = await readFile(join(process.cwd(), "src/config/pricing.ts"), "utf8");

  assert.match(source, /getPricingMarketForCountry/);
  assert.match(source, /pricingData\.euCountryCodes\.includes/);
  assert.match(source, /return "DEFAULT"/);
  assert.match(pricingConfig, /"CZ"/);
  assert.match(pricingConfig, /"DK"/);
  assert.match(pricingConfig, /"PT"/);
});

test("lead forms receive pricing, source, demo, and project metadata", async () => {
  const englishHome = await readDistFile("en/index.html");
  const contact = await readDistFile("en/contact/index.html");
  const portfolio = await readDistFile("en/portfolio/index.html");

  assert.match(contact, /AKfycbyAMZy4vPe56lUmFA8-Q_MDJ-AS4aJJb0vOeiViGPneWtkYn9LKXla2BmSWflsvuE-lyw/);
  assert.match(contact, /type:\s*"form"/);
  assert.match(contact, /metadata:\s*\{/);
  assert.match(contact, /name="pricingMarket"/);
  assert.match(contact, /name="currency"/);
  assert.match(contact, /name="priceShown"/);
  assert.match(contact, /name="relatedDemo"/);
  assert.match(contact, /name="relatedProject"/);
  assert.match(contact, /name="sourcePage"/);
  assert.match(contact, /name="inquiryIntent"/);
  assert.match(contact, /name="utm_source"/);
  assert.match(contact, /name="utm_id"/);
  assert.match(contact, /websiteliGetAttribution/);
  assert.match(contact, /first_utm_source/);
  assert.match(contact, /gclid/);
  assert.match(contact, /<option value="digitalAudit">Digital Audit<\/option>/);

  assert.match(englishHome, /package=digitalAudit/);
  assert.match(portfolio, /shopify/i);
  assert.match(portfolio, /package=digitalAudit(?:&amp;|&#38;)project=/);
});

test("newsletter signup posts to the static Google Apps Script endpoint", async () => {
  const englishHome = await readDistFile("en/index.html");

  assert.match(englishHome, /data-newsletter-form/);
  assert.match(englishHome, /id="newsletter"/);
  assert.match(englishHome, /data-newsletter-campaign="newsletter"/);
  assert.match(englishHome, /name="campaign" type="hidden" value="newsletter"/);
  assert.match(englishHome, /type:\s*"newsletter"/);
  assert.match(englishHome, /campaign,\s*sourceUrl,\s*language/s);
  assert.match(englishHome, /Thanks for subscribing!/);
  assert.match(englishHome, /website:\s*honeypot/);
  assert.match(englishHome, /AKfycbyAMZy4vPe56lUmFA8-Q_MDJ-AS4aJJb0vOeiViGPneWtkYn9LKXla2BmSWflsvuE-lyw/);
  assert.match(englishHome, /privacyPolicyAccepted/);
  assert.match(englishHome, /utm_content/);
  assert.match(englishHome, /landingPage/);
  assert.doesNotMatch(englishHome, /website-success-report/);
});

test("Website Success Report lead magnet uses the report newsletter campaign on localized flagship articles", async () => {
  const englishArticle = await readDistFile("en/blog/why-business-websites-get-customers/index.html");
  const germanArticle = await readDistFile("de/blog/why-business-websites-get-customers/index.html");
  const englishBlog = await readDistFile("en/blog/index.html");
  const germanBlog = await readDistFile("de/blog/index.html");

  assert.match(englishArticle, /Why Some Business Websites Get Customers While Others Don&#39;t/);
  assert.match(englishArticle, /A research-backed guide explaining why some business websites/);
  assert.match(englishArticle, /Get the Free Website Success Report/);
  assert.match(englishArticle, /Research-backed insights, practical checklists, and website statistics delivered to your inbox\./);
  assert.match(englishArticle, /data-newsletter-campaign="website-success-report"/);
  assert.match(englishArticle, /name="campaign" type="hidden" value="website-success-report"/);
  assert.match(englishArticle, /Thanks! Check your inbox for the Website Success Report\./);
  assert.match(englishArticle, /campaign,\s*sourceUrl,\s*language/s);
  assert.match(englishArticle, /website:\s*honeypot/);
  assert.match(englishArticle, /business-websites-get-customers-statistics\.png/);
  assert.match(englishArticle, /alt="Infographic showing verified statistics about business websites, including trust, mobile use, speed, accessibility, and search visibility\."/);
  assert.match(englishArticle, /<link rel="canonical" href="https:\/\/websiteli\.ch\/en\/blog\/why-business-websites-get-customers\/">/);
  assert.match(englishArticle, /property="og:image" content="https:\/\/websiteli\.ch\/assets\/blog\/business-websites-get-customers-statistics\.png"/);
  assert.match(englishArticle, /name="twitter:image" content="https:\/\/websiteli\.ch\/assets\/blog\/business-websites-get-customers-statistics\.png"/);
  assert.match(englishArticle, /Baymard Institute/);
  assert.match(englishArticle, /70\.22%/);
  assert.doesNotMatch(englishArticle, /HubSpot|Semrush|Microsoft/);
  assert.match(englishBlog, /Why Some Business Websites Get Customers While Others Don&#39;t/);
  assert.match(germanBlog, /Warum manche Business-Websites Kunden gewinnen/);
  assert.match(germanArticle, /Warum manche Business-Websites Kunden gewinnen/);
  assert.match(germanArticle, /Kostenlosen Website Success Report erhalten/);
  assert.match(germanArticle, /data-newsletter-campaign="website-success-report"/);
  assert.match(germanArticle, /<link rel="canonical" href="https:\/\/websiteli\.ch\/de\/blog\/why-business-websites-get-customers\/">/);
  assert.match(germanArticle, /Baymard Institute/);
});

test("blog is localized and article pages include conversion and sharing UX", async () => {
  const englishBlog = await readDistFile("en/blog/index.html");
  const germanArticle = await readDistFile("de/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/index.html");
  const frenchArticle = await readDistFile("fr/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/index.html");
  const japaneseArticle = await readDistFile("ja/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/index.html");
  const smallBusinessArticle = await readDistFile("en/blog/small-business-website/index.html");
  const germanSmallBusinessArticle = await readDistFile("de/blog/small-business-website/index.html");
  const hungarianSmallBusinessArticle = await readDistFile("hu/blog/small-business-website/index.html");

  assert.doesNotMatch(englishBlog, /Future content roadmap|SEO roadmap/i);
  assert.match(englishBlog, /How to Create a Small Business Website That Generates Customers/);
  assert.match(englishBlog, /Why Some Business Websites Get Customers While Others Don&#39;t/);
  assert.match(germanArticle, /Warum KI-generierte Websites/);
  assert.match(frenchArticle, /Pourquoi les sites générés par IA/);
  assert.match(japaneseArticle, /AI生成サイトだけでは/);
  assert.match(smallBusinessArticle, /small business website/i);
  assert.match(smallBusinessArticle, /Small Business Website That Generates Customers/);
  assert.match(smallBusinessArticle, /contact your business/);
  assert.doesNotMatch(smallBusinessArticle, /بسهولة/);
  assert.match(germanSmallBusinessArticle, /Small-Business-Website/);
  assert.match(hungarianSmallBusinessArticle, /Hogyan készíts kisvállalati weboldalt/);
  assert.match(hungarianSmallBusinessArticle, /<link rel="canonical" href="https:\/\/websiteli\.ch\/hu\/blog\/small-business-website\/">/);
  assert.match(germanArticle, /property="og:type" content="article"/);
  assert.match(germanArticle, /https:\/\/www\.linkedin\.com\/sharing\/share-offsite\/\?url=/);
  assert.match(germanArticle, /https:\/\/www\.facebook\.com\/sharer\/sharer\.php/);
  assert.match(germanArticle, /https:\/\/twitter\.com\/intent\/tweet/);
  assert.match(germanArticle, /https:\/\/www\.pinterest\.com\/pin\/create\/button/);
  assert.match(germanArticle, /data-copy-link=/);
  assert.doesNotMatch(germanArticle, /Related Websiteli pages|Verwandte Websiteli-Seiten/);
  assert.match(germanArticle, /blog_consultation_click/);
  assert.match(germanArticle, /article-cta-sidebar/);
  assert.match(germanArticle, /article-cta-final/);
  assert.doesNotMatch(germanArticle, /\/de\/<\/a>/);
  assert.match(germanArticle, /#newsletter/);
  assert.match(germanArticle, /data-reading-progress/);
  assert.match(germanArticle, /"@type":"FAQPage"/);
  assert.match(germanArticle, /Artikelzusammenfassung/);
  assert.match(germanArticle, /Wichtigste Erkenntnisse/);
  assert.doesNotMatch(germanArticle, /Continue this article with ChatGPT/);
  assert.doesNotMatch(germanArticle, /chatgpt\.com\/\?q=/);
  assert.match(germanArticle, /<figcaption>/);
  assert.doesNotMatch(germanArticle, /<section class="article-author"/);
  assert.doesNotMatch(germanArticle, /<section class="article-faq"/);
  assert.doesNotMatch(germanArticle, /<section class="related-articles"/);
  assert.doesNotMatch(germanArticle, /<section class="continue-reading"/);
  assert.doesNotMatch(germanArticle, /<section class="article-newsletter-cta"/);
  assert.doesNotMatch(germanArticle, /<section class="about-websiteli"/);
  assert.match(germanArticle, /<section class="article-references"/);
  assert.match(germanArticle, /target="_blank" rel="noopener noreferrer"/);

  const structuredData = getStructuredData(germanArticle);
  const types = structuredData.map((item) => item["@type"]);
  assert.ok(types.includes("BlogPosting"));
  assert.ok(types.includes("BreadcrumbList"));
  assert.ok(types.includes("Organization"));
  assert.ok(types.includes("WebSite"));
  assert.ok(types.includes("FAQPage"));
  assert.ok(types.includes("ImageObject"));
  assert.ok(types.includes("Person"));
  const blogPosting = structuredData.find((item) => item["@type"] === "BlogPosting");
  assert.equal(blogPosting.author["@type"], "Person");
  assert.equal(blogPosting.image["@type"], "ImageObject");
  assert.ok(blogPosting.abstract.length > 180);
});

test("sitemap and public downloads include the Website Success Report flow URLs", async () => {
  const pdf = await readFile(join(distDir, "downloads/websiteli-website-success-report.pdf"));
  const robots = await readFile(join(distDir, "robots.txt"), "utf8");
  const sitemapFiles = (await collectFiles(distDir)).filter((file) => /sitemap.*\.xml$/.test(file));
  const sitemap = (await Promise.all(sitemapFiles.map((file) => readFile(file, "utf8")))).join("\n");

  assert.match(pdf.subarray(0, 8).toString("utf8"), /^%PDF-/);
  assert.match(robots, /Allow:\s*\//);
  assert.doesNotMatch(robots, /Disallow:\s*\/downloads/);
  assert.match(sitemap, /https:\/\/websiteli\.ch\/en\//);
  assert.match(sitemap, /https:\/\/websiteli\.ch\/en\/services-pricing\//);
  assert.match(sitemap, /https:\/\/websiteli\.ch\/en\/contact\//);
  assert.match(sitemap, /https:\/\/websiteli\.ch\/en\/blog\/small-business-website\//);
  assert.match(sitemap, /https:\/\/websiteli\.ch\/en\/blog\/why-business-websites-get-customers\//);
  assert.match(sitemap, /https:\/\/websiteli\.ch\/de\/blog\/why-business-websites-get-customers\//);
  assert.match(sitemap, /https:\/\/websiteli\.ch\/ja\/blog\/website-cost-switzerland\//);
});

test("localized package labels do not leak English package names in Hungarian UI", async () => {
  const hungarianHome = await readDistFile("hu/index.html");
  const hungarianContact = await readDistFile("hu/contact/index.html");

  assert.match(hungarianHome, /Digitális alapcsomag/);
  assert.match(hungarianHome, /Növekedési csomag/);
  assert.match(hungarianHome, /AI\/adat fejlesztés/);
  assert.match(hungarianHome, /package=digitalAudit/);
  assert.match(hungarianContact, /<option value="digitalAudit">Digitális audit<\/option>/);
  assert.match(hungarianContact, /<option value="digitalFoundation">Digitális alapcsomag<\/option>/);
  assert.doesNotMatch(hungarianContact, />Digital Audit<\/option>/);
  assert.doesNotMatch(hungarianContact, />Digital Foundation<\/option>/);
  assert.doesNotMatch(hungarianContact, />AI\/Data Upgrade<\/option>/);
});

test("built pages do not contain broken internal links or anchors", async () => {
  const files = await collectFiles(distDir);
  const fileSet = new Set(files.map((file) => resolve(file)));
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  const htmlCache = new Map();
  const failures = [];

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const references = getHtmlReferences(html);

    for (const reference of references) {
      const url = getInternalUrl(reference, file);
      if (!url) continue;

      const targetFile = getTargetFilePath(url.pathname);

      if (!fileSet.has(targetFile)) {
        failures.push(`${relative(distDir, file)} -> ${reference} missing ${relative(distDir, targetFile)}`);
        continue;
      }

      if (!url.hash || !targetFile.endsWith(".html")) continue;

      const anchor = decodeURIComponent(url.hash.slice(1));
      if (!anchor) continue;

      if (!htmlCache.has(targetFile)) {
        htmlCache.set(targetFile, await readFile(targetFile, "utf8"));
      }

      const anchors = getAnchors(htmlCache.get(targetFile));
      if (!anchors.has(anchor)) {
        failures.push(`${relative(distDir, file)} -> ${reference} missing anchor #${anchor}`);
      }
    }
  }

  assert.deepEqual(failures, []);
});
