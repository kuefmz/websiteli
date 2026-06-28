import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
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
  const contact = await readDistFile("en/contact/index.html");
  const portfolio = await readDistFile("en/portfolio/index.html");

  assert.match(contact, /AKfycbxcU1PnJv0YFT7NFI_CnD71NbRl8mAjSljBbZjCqqCXt96bw1lEUlGhbel1-oBm4n-k/);
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

  assert.match(portfolio, /shopify/i);
});

test("newsletter signup posts to the static Google Apps Script endpoint", async () => {
  const englishHome = await readDistFile("en/index.html");

  assert.match(englishHome, /data-newsletter-form/);
  assert.match(englishHome, /id="newsletter"/);
  assert.match(englishHome, /type:\s*"newsletter"/);
  assert.match(englishHome, /AKfycbxcU1PnJv0YFT7NFI_CnD71NbRl8mAjSljBbZjCqqCXt96bw1lEUlGhbel1-oBm4n-k/);
  assert.match(englishHome, /privacyPolicyAccepted/);
  assert.match(englishHome, /utm_content/);
  assert.match(englishHome, /landingPage/);
});

test("blog is localized and article pages include conversion and sharing UX", async () => {
  const englishBlog = await readDistFile("en/blog/index.html");
  const germanArticle = await readDistFile("de/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/index.html");
  const frenchArticle = await readDistFile("fr/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/index.html");
  const japaneseArticle = await readDistFile("ja/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/index.html");

  assert.doesNotMatch(englishBlog, /Future content roadmap|SEO roadmap/i);
  assert.match(germanArticle, /Warum KI-generierte Websites/);
  assert.match(frenchArticle, /Pourquoi les sites générés par IA/);
  assert.match(japaneseArticle, /AI生成サイトだけでは/);
  assert.match(germanArticle, /property="og:type" content="article"/);
  assert.match(germanArticle, /https:\/\/www\.linkedin\.com\/sharing\/share-offsite\/\?url=/);
  assert.match(germanArticle, /https:\/\/www\.facebook\.com\/sharer\/sharer\.php/);
  assert.match(germanArticle, /https:\/\/twitter\.com\/intent\/tweet/);
  assert.match(germanArticle, /https:\/\/www\.pinterest\.com\/pin\/create\/button/);
  assert.match(germanArticle, /data-copy-link=/);
  assert.match(germanArticle, /blog_consultation_click/);
  assert.match(germanArticle, /#newsletter/);
  assert.match(germanArticle, /data-reading-progress/);
  assert.match(germanArticle, /"@type":"FAQPage"/);
});

test("localized package labels do not leak English package names in Hungarian UI", async () => {
  const hungarianHome = await readDistFile("hu/index.html");
  const hungarianContact = await readDistFile("hu/contact/index.html");

  assert.match(hungarianHome, /Digitális alapcsomag/);
  assert.match(hungarianHome, /Növekedési csomag/);
  assert.match(hungarianHome, /AI\/adat fejlesztés/);
  assert.match(hungarianContact, /<option value="digitalFoundation">Digitális alapcsomag<\/option>/);
  assert.doesNotMatch(hungarianContact, />Digital Foundation<\/option>/);
  assert.doesNotMatch(hungarianContact, />AI\/Data Upgrade<\/option>/);
});
