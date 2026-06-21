import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { test } from "node:test";

const distDir = join(process.cwd(), "dist");

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

test("homepage resolves pricing on the frontend from an obfuscated table", async () => {
  const files = await collectFiles(distDir);
  const frontendFiles = files.filter((file) => /\.(html|js|css)$/.test(file));
  const combined = (await Promise.all(frontendFiles.map((file) => readFile(file, "utf8").catch(() => "")))).join("\n");

  assert.match(combined, /atob/);
  assert.match(combined, /ipwho\.is/);
  assert.match(combined, /websiteli_market/);
  assert.doesNotMatch(combined, /\/api\/pricing/);
  assert.doesNotMatch(combined, /pricing\.php/);
});

test("pricing source of truth is kept as readable JSON", async () => {
  const source = JSON.parse(await readFile(join(process.cwd(), "src/content/pricing.json"), "utf8"));

  assert.equal(source.defaultMarket, "CH");
  assert.equal(source.markets.GB.currency, "GBP");
  assert.equal(source.markets.GB.landingPage, 900);
});

test("frontend HTML, JS, and CSS do not contain plain readable country prices", async () => {
  const files = await collectFiles(distDir);
  const frontendFiles = files.filter((file) => /\.(html|js|css)$/.test(file));
  const combined = (await Promise.all(frontendFiles.map((file) => readFile(file, "utf8").catch(() => "")))).join("\n");

  assert.equal(combined.includes("149000"), false);
  assert.equal(combined.includes("299000"), false);
  assert.equal(combined.includes("Hungary"), false);
  assert.equal(combined.includes("defaultMarket"), false);
  assert.equal(combined.includes('"markets"'), false);
  assert.equal(combined.includes("$markets"), false);
  assert.equal(combined.includes("pricingConfig"), false);
});

test("frontend starts with Swiss fallback prices before browser country detection", async () => {
  const index = await readFile(join(distDir, "index.html"), "utf8");

  assert.match(index, /from 1,000 CHF/);
  assert.match(index, /from 2,000 CHF/);
  assert.match(index, /from 3,500 CHF/);
});

test("cached Swiss market does not block browser country detection", async () => {
  const source = await readFile(join(process.cwd(), "src/pages/index.astro"), "utf8");

  assert.match(source, /cachedMarket !== "CH"/);
  assert.match(source, /api\.country\.is/);
  assert.match(source, /ipapi\.co/);
});

test("browser country detection can prefer a VPN country over Swiss lookup noise", async () => {
  const source = await readFile(join(process.cwd(), "src/pages/index.astro"), "utf8");

  assert.match(source, /Promise\.all/);
  assert.match(source, /firstNonSwissMarket/);
  assert.match(source, /result\.market !== "CH"/);
});

test("pricing debug mode renders lookup results on the page", async () => {
  const source = await readFile(join(process.cwd(), "src/pages/index.astro"), "utf8");

  assert.match(source, /data-pricing-debug/);
  assert.match(source, /lookupResults/);
});
