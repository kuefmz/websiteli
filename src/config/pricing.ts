import pricing from "./pricing.json";

export const packageKeys = ["digitalFoundation", "growthSetup", "aiDataUpgrade"] as const;
export type PackageKey = (typeof packageKeys)[number];

export const euCountryCodes = [
  "AT",
  "DE",
  "FR",
  "ES",
  "IT",
  "NL",
  "BE",
  "IE",
  "PT",
  "FI",
  "SE",
  "DK",
  "CZ",
  "SK",
  "SI",
  "HR",
  "RO",
  "BG",
  "GR",
  "EE",
  "LV",
  "LT",
  "LU",
  "MT",
  "CY",
] as const;

export const packageKeyByName: Record<string, PackageKey> = {
  "Digital Foundation": "digitalFoundation",
  "Growth Setup": "growthSetup",
  "AI/Data Upgrade": "aiDataUpgrade",
};

export function normalizeCountryCode(countryCode: string | undefined | null) {
  if (typeof countryCode !== "string") return "";
  const normalized = countryCode.trim().toUpperCase();

  if (normalized === "DEFAULT" || normalized === "EU") return normalized;

  return normalized.slice(0, 2);
}

export function getPricingMarketForCountry(countryCode: string | undefined | null) {
  const normalizedCountry = normalizeCountryCode(countryCode);

  if (normalizedCountry && normalizedCountry in pricing) {
    return normalizedCountry;
  }

  if (euCountryCodes.includes(normalizedCountry as (typeof euCountryCodes)[number])) {
    return "EU";
  }

  return "DEFAULT";
}

export function getPricingForCountry(countryCode: string | undefined | null) {
  return pricing[getPricingMarketForCountry(countryCode) as keyof typeof pricing];
}

export { pricing };
