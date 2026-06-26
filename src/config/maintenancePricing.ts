import maintenancePricing from "./maintenancePricing.json";
import { getPricingMarketForCountry } from "./pricing";

export type MaintenancePricingMarket = keyof typeof maintenancePricing;

export function getMaintenancePricingForCountry(countryCode: string | undefined | null) {
  const market = getPricingMarketForCountry(countryCode) as MaintenancePricingMarket;
  return maintenancePricing[market] ?? maintenancePricing.DEFAULT;
}

export { maintenancePricing };
