import assert from "node:assert/strict";

const siteUrl = process.env.SITE_URL || "https://websiteli.ch";
const pricingUrl = new URL("/api/pricing.php", siteUrl);

async function fetchPricing(headers = {}) {
  const response = await fetch(pricingUrl, { headers });
  const body = await response.text();

  assert.equal(
    response.status,
    200,
    `${pricingUrl} should return 200. Got ${response.status} from ${response.headers.get("server") || "unknown server"}:\n${body.slice(0, 300)}`,
  );
  assert.match(response.headers.get("content-type") || "", /application\/json/);

  return JSON.parse(body);
}

const defaultPricing = await fetchPricing();

assert.ok(defaultPricing.market, "live API should include a resolved market");
assert.ok(defaultPricing.plans?.landingPage, "live API should include resolved plan prices");
assert.equal(Object.hasOwn(defaultPricing, "markets"), false, "live API must not expose the full pricing table");

const hungaryPricing = await fetchPricing({ "x-vercel-ip-country": "HU" });

assert.equal(hungaryPricing.market, "HU", "live API should honor Hungarian country headers");
assert.equal(hungaryPricing.currency, "HUF");
assert.equal(hungaryPricing.plans.landingPage, "from 149,000 HUF");

console.log(`Live pricing OK at ${siteUrl}`);
