import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { test } from "node:test";

const chunksDir = join(process.cwd(), ".vercel/output/_functions/chunks");
const staticDir = join(process.cwd(), ".vercel/output/static");

async function findPricingChunk() {
  const files = await readdir(chunksDir);
  const chunk = files.find((file) => file.startsWith("pricing.server_") && file.endsWith(".mjs"));

  assert.ok(chunk, "compiled pricing server chunk should exist");

  return join(chunksDir, chunk);
}

async function getPricingModule() {
  const pricingChunk = await findPricingChunk();

  return import(`${pricingChunk}?cache=${Date.now()}`);
}

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

test("resolves requested supported markets from CDN headers", async () => {
  const { g: getResolvedPricing } = await getPricingModule();
  const cases = [
    ["x-vercel-ip-country", "HU", "Hungary", "from 149,000 HUF"],
    ["cf-ipcountry", "PL", "Poland", "from 2,500 PLN"],
    ["cloudfront-viewer-country", "US", "United States", "from 1,200 USD"],
    ["fastly-client-country", "HU", "Hungary", "from 149,000 HUF"],
  ];

  for (const [header, countryCode, country, landingPage] of cases) {
    const pricing = getResolvedPricing(
      new Request("https://websiteli.ch/api/pricing", {
        headers: {
          [header]: countryCode,
        },
      }),
    );

    assert.equal(pricing.market, countryCode);
    assert.equal(pricing.country, country);
    assert.equal(pricing.plans.landingPage, landingPage);
  }
});

test("resolves Akamai country_code metadata", async () => {
  const { g: getResolvedPricing } = await getPricingModule();
  const pricing = getResolvedPricing(
    new Request("https://websiteli.ch/api/pricing", {
      headers: {
        "x-akamai-edgescape": "georegion=0,country_code=HU,city=Budapest",
      },
    }),
  );

  assert.equal(pricing.market, "HU");
  assert.equal(pricing.plans.businessWebsite, "from 299,000 HUF");
});

test("falls back to Switzerland for unsupported countries", async () => {
  const { g: getResolvedPricing } = await getPricingModule();
  const pricing = getResolvedPricing(
    new Request("https://websiteli.ch/api/pricing", {
      headers: {
        "x-vercel-ip-country": "ZZ",
      },
    }),
  );

  assert.equal(pricing.market, "CH");
  assert.equal(pricing.country, "Switzerland");
  assert.equal(pricing.plans.landingPage, "from 1,000 CHF");
});

test("development market override works", async () => {
  const { g: getResolvedPricing } = await getPricingModule();
  const pricing = getResolvedPricing(new Request("https://websiteli.ch/api/pricing?market=HU"));

  assert.equal(pricing.market, "HU");
  assert.equal(pricing.plans.maintenanceMonthly, "from 19,900 HUF/month");
});

test("production ignores query override and uses backend country signal", async () => {
  const originalNodeEnv = process.env.NODE_ENV;

  process.env.NODE_ENV = "production";

  try {
    const { g: getResolvedPricing } = await getPricingModule();
    const pricing = getResolvedPricing(
      new Request("https://websiteli.ch/api/pricing?market=HU", {
        headers: {
          "x-vercel-ip-country": "US",
        },
      }),
    );

    assert.equal(pricing.market, "US");
    assert.equal(pricing.plans.landingPage, "from 1,200 USD");
  } finally {
    process.env.NODE_ENV = originalNodeEnv;
  }
});

test("static client output does not contain the full pricing table", async () => {
  const files = await collectFiles(staticDir);
  const combined = (await Promise.all(files.map((file) => readFile(file, "utf8").catch(() => "")))).join("\n");

  assert.equal(combined.includes("149000"), false);
  assert.equal(combined.includes("299000"), false);
  assert.equal(combined.includes("Hungary"), false);
  assert.equal(combined.includes("defaultMarket"), false);
  assert.equal(combined.includes("markets"), false);
});
