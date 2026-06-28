import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { test } from "node:test";

const distDir = join(process.cwd(), "dist");
const pricingRuntimePath = join(process.cwd(), "src/components/PricingRuntime.astro");

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

  assert.match(englishHome, /window\.websiteliGetPricingForCountry/);
  assert.match(englishHome, /Services &amp; Pricing/);
  assert.match(englishHome, /Website maintenance/i);
});

test("root page redirects to the localized English site", async () => {
  const root = await readDistFile("index.html");

  assert.match(root, /content="0;url=\/en\/"/);
  assert.match(root, /Continue to Websiteli/);
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
  const source = await readFile(pricingRuntimePath, "utf8");
  const files = await collectFiles(distDir);
  const frontendFiles = files.filter((file) => /\.(html|js)$/.test(file));
  const combined = (await Promise.all(frontendFiles.map((file) => readFile(file, "utf8").catch(() => "")))).join("\n");

  assert.match(source, /api\.country\.is/);
  assert.match(source, /ipapi\.co/);
  assert.match(source, /geojs\.io/);
  assert.match(source, /cloudflare-trace/);
  assert.match(source, /Promise\.all/);
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
  assert.match(contact, /sessionStorage/);
  assert.match(contact, /gclid/);

  assert.match(portfolio, /shopify/i);
});

test("newsletter signup posts to the static Google Apps Script endpoint", async () => {
  const englishHome = await readDistFile("en/index.html");

  assert.match(englishHome, /data-newsletter-form/);
  assert.match(englishHome, /type:\s*"newsletter"/);
  assert.match(englishHome, /AKfycbxcU1PnJv0YFT7NFI_CnD71NbRl8mAjSljBbZjCqqCXt96bw1lEUlGhbel1-oBm4n-k/);
  assert.match(englishHome, /privacyPolicyAccepted/);
  assert.match(englishHome, /utm_content/);
  assert.match(englishHome, /landingPage/);
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
