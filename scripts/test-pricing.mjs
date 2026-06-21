import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { test } from "node:test";

const distDir = join(process.cwd(), "dist");
const phpEndpoint = join(distDir, "api/pricing.php");

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

test("static build includes the PHP pricing endpoint", async () => {
  const endpointStat = await stat(phpEndpoint);
  const endpoint = await readFile(phpEndpoint, "utf8");

  assert.equal(endpointStat.isFile(), true);
  assert.match(endpoint, /\$markets = \[/);
  assert.match(endpoint, /lookup_country_from_ip/);
  assert.match(endpoint, /Content-Type: application\/json/);
});

test("homepage fetches only the resolved PHP pricing endpoint", async () => {
  const index = await readFile(join(distDir, "index.html"), "utf8");

  assert.match(index, /\/api\/pricing\.php/);
  assert.doesNotMatch(index, /\/api\/pricing"/);
});

test("frontend HTML, JS, and CSS do not contain the full pricing table", async () => {
  const files = await collectFiles(distDir);
  const frontendFiles = files.filter((file) => {
    if (file.endsWith("pricing.php")) return false;

    return /\.(html|js|css)$/.test(file);
  });
  const combined = (await Promise.all(frontendFiles.map((file) => readFile(file, "utf8").catch(() => "")))).join("\n");

  assert.equal(combined.includes("149000"), false);
  assert.equal(combined.includes("299000"), false);
  assert.equal(combined.includes("Hungary"), false);
  assert.equal(combined.includes("defaultMarket"), false);
  assert.equal(combined.includes("$markets"), false);
});

test("frontend starts with Swiss fallback prices before PHP response", async () => {
  const index = await readFile(join(distDir, "index.html"), "utf8");

  assert.match(index, /from 1,000 CHF/);
  assert.match(index, /from 2,000 CHF/);
  assert.match(index, /from 3,500 CHF/);
});
