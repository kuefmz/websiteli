type PriceKey = "landingPage" | "businessWebsite" | "premiumWebsite" | "seoSetup" | "maintenanceMonthly";

type MarketPricing = {
  country: string;
  currency: string;
} & Record<PriceKey, number>;

type PricingConfig = {
  defaultMarket: string;
  markets: Record<string, MarketPricing>;
};

const pricingConfig: PricingConfig = {
  defaultMarket: "CH",
  markets: {
    CH: {
      country: "Switzerland",
      currency: "CHF",
      landingPage: 1000,
      businessWebsite: 2000,
      premiumWebsite: 3500,
      seoSetup: 500,
      maintenanceMonthly: 100,
    },
    HU: {
      country: "Hungary",
      currency: "HUF",
      landingPage: 149000,
      businessWebsite: 299000,
      premiumWebsite: 499000,
      seoSetup: 99000,
      maintenanceMonthly: 19900,
    },
    PL: {
      country: "Poland",
      currency: "PLN",
      landingPage: 2500,
      businessWebsite: 4500,
      premiumWebsite: 8000,
      seoSetup: 1200,
      maintenanceMonthly: 250,
    },
    US: {
      country: "United States",
      currency: "USD",
      landingPage: 1200,
      businessWebsite: 2500,
      premiumWebsite: 4500,
      seoSetup: 700,
      maintenanceMonthly: 150,
    },
    CA: {
      country: "Canada",
      currency: "CAD",
      landingPage: 1500,
      businessWebsite: 3000,
      premiumWebsite: 5500,
      seoSetup: 850,
      maintenanceMonthly: 180,
    },
    AU: {
      country: "Australia",
      currency: "AUD",
      landingPage: 1800,
      businessWebsite: 3500,
      premiumWebsite: 6500,
      seoSetup: 950,
      maintenanceMonthly: 200,
    },
    BR: {
      country: "Brazil",
      currency: "BRL",
      landingPage: 2500,
      businessWebsite: 5000,
      premiumWebsite: 9000,
      seoSetup: 1500,
      maintenanceMonthly: 350,
    },
    DE: {
      country: "Germany",
      currency: "EUR",
      landingPage: 900,
      businessWebsite: 1800,
      premiumWebsite: 3200,
      seoSetup: 500,
      maintenanceMonthly: 100,
    },
    AT: {
      country: "Austria",
      currency: "EUR",
      landingPage: 900,
      businessWebsite: 1800,
      premiumWebsite: 3200,
      seoSetup: 500,
      maintenanceMonthly: 100,
    },
    FR: {
      country: "France",
      currency: "EUR",
      landingPage: 900,
      businessWebsite: 1800,
      premiumWebsite: 3200,
      seoSetup: 500,
      maintenanceMonthly: 100,
    },
    ES: {
      country: "Spain",
      currency: "EUR",
      landingPage: 700,
      businessWebsite: 1400,
      premiumWebsite: 2500,
      seoSetup: 400,
      maintenanceMonthly: 80,
    },
    IT: {
      country: "Italy",
      currency: "EUR",
      landingPage: 700,
      businessWebsite: 1400,
      premiumWebsite: 2500,
      seoSetup: 400,
      maintenanceMonthly: 80,
    },
    GB: {
      country: "United Kingdom",
      currency: "GBP",
      landingPage: 900,
      businessWebsite: 1800,
      premiumWebsite: 3200,
      seoSetup: 500,
      maintenanceMonthly: 100,
    },
    NL: {
      country: "Netherlands",
      currency: "EUR",
      landingPage: 950,
      businessWebsite: 1900,
      premiumWebsite: 3500,
      seoSetup: 550,
      maintenanceMonthly: 110,
    },
    SE: {
      country: "Sweden",
      currency: "SEK",
      landingPage: 12000,
      businessWebsite: 24000,
      premiumWebsite: 42000,
      seoSetup: 7000,
      maintenanceMonthly: 1200,
    },
    NO: {
      country: "Norway",
      currency: "NOK",
      landingPage: 13000,
      businessWebsite: 26000,
      premiumWebsite: 45000,
      seoSetup: 7500,
      maintenanceMonthly: 1300,
    },
    DK: {
      country: "Denmark",
      currency: "DKK",
      landingPage: 8500,
      businessWebsite: 17000,
      premiumWebsite: 30000,
      seoSetup: 5000,
      maintenanceMonthly: 850,
    },
    RO: {
      country: "Romania",
      currency: "RON",
      landingPage: 2500,
      businessWebsite: 5000,
      premiumWebsite: 9000,
      seoSetup: 1500,
      maintenanceMonthly: 350,
    },
    CZ: {
      country: "Czech Republic",
      currency: "CZK",
      landingPage: 25000,
      businessWebsite: 50000,
      premiumWebsite: 85000,
      seoSetup: 15000,
      maintenanceMonthly: 2500,
    },
  },
};

export const countryHeaders = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country-code",
  "x-forwarded-country",
  "cloudfront-viewer-country",
  "x-geo-country",
  "x-client-country",
  "x-country",
  "x-ip-country",
  "x-appengine-country",
  "geoip-country-code",
  "fastly-client-country",
  "x-real-ip-country",
];

function normalizeCountryCode(countryCode: string | null | undefined) {
  return countryCode?.trim().slice(0, 2).toUpperCase() || "";
}

function isSupportedMarket(countryCode: string) {
  return Object.hasOwn(pricingConfig.markets, countryCode);
}

function getCountryCodeFromAkamaiEdgescape(headerValue: string | null) {
  const countryCode = headerValue
    ?.split(",")
    .map((part) => part.trim().split("="))
    .find(([key]) => key?.toLowerCase() === "country_code")?.[1];

  return normalizeCountryCode(countryCode);
}

function getCountryCodeFromRequestMetadata(request: Request) {
  const metadataCountry = (request as Request & { cf?: { country?: string }; geo?: { country?: string } }).cf?.country
    || (request as Request & { cf?: { country?: string }; geo?: { country?: string } }).geo?.country;

  return normalizeCountryCode(metadataCountry);
}

function getDefaultMarket() {
  return pricingConfig.defaultMarket;
}

function isDevelopmentOverrideEnabled() {
  return process.env.NODE_ENV !== "production";
}

export function resolveMarketFromRequest(request: Request) {
  const url = new URL(request.url);
  const overrideMarket = normalizeCountryCode(url.searchParams.get("market"));

  if (isDevelopmentOverrideEnabled() && isSupportedMarket(overrideMarket)) {
    return overrideMarket;
  }

  for (const header of countryHeaders) {
    const market = normalizeCountryCode(request.headers.get(header));

    if (isSupportedMarket(market)) {
      return market;
    }
  }

  const akamaiMarket = getCountryCodeFromAkamaiEdgescape(request.headers.get("x-akamai-edgescape"));

  if (isSupportedMarket(akamaiMarket)) {
    return akamaiMarket;
  }

  const metadataMarket = getCountryCodeFromRequestMetadata(request);

  if (isSupportedMarket(metadataMarket)) {
    return metadataMarket;
  }

  return getDefaultMarket();
}

export function getPricingForMarket(countryCode: string | null | undefined) {
  const market = normalizeCountryCode(countryCode);
  const resolvedMarket = isSupportedMarket(market) ? market : getDefaultMarket();

  return {
    market: resolvedMarket,
    ...pricingConfig.markets[resolvedMarket],
  };
}

export function formatPrice(amount: number, currency: string) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formattedAmount} ${currency}`;
}

export function getResolvedPricing(request: Request) {
  const market = resolveMarketFromRequest(request);
  const pricing = getPricingForMarket(market);

  return {
    market: pricing.market,
    country: pricing.country,
    currency: pricing.currency,
    plans: {
      landingPage: `from ${formatPrice(pricing.landingPage, pricing.currency)}`,
      businessWebsite: `from ${formatPrice(pricing.businessWebsite, pricing.currency)}`,
      premiumWebsite: `from ${formatPrice(pricing.premiumWebsite, pricing.currency)}`,
      seoSetup: `from ${formatPrice(pricing.seoSetup, pricing.currency)}`,
      maintenanceMonthly: `from ${formatPrice(pricing.maintenanceMonthly, pricing.currency)}/month`,
    },
  };
}
