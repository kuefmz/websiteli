import cz from "./locales/cz.json";
import da from "./locales/da.json";
import de from "./locales/de.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import hu from "./locales/hu.json";
import it from "./locales/it.json";
import ja from "./locales/ja.json";
import nl from "./locales/nl.json";
import pl from "./locales/pl.json";
import pt from "./locales/pt.json";
import sk from "./locales/sk.json";

export const localeCodes = ["en", "de", "hu", "pl", "es", "fr", "it", "cz", "sk", "pt", "da", "nl", "ja"] as const;
export type LocaleCode = (typeof localeCodes)[number];

export const pageSlugs = ["services-pricing", "portfolio", "blog", "about", "contact"] as const;
export const legacyPageSlugs = ["services", "packages", "demos", "example-projects"] as const;
export type PageSlug = (typeof pageSlugs)[number];
export type LegacyPageSlug = (typeof legacyPageSlugs)[number];

export const locales = {
  cz,
  da,
  en,
  de,
  hu,
  pl,
  es,
  fr,
  it,
  ja,
  nl,
  pt,
  sk,
} as const;

export const pageNavKeys = {
  "services-pricing": "servicesPricing",
  portfolio: "portfolio",
  blog: "blog",
  about: "about",
  contact: "contact",
} as const;

export const legacyRedirects = {
  services: "services-pricing",
  packages: "services-pricing",
  demos: "portfolio",
  "example-projects": "portfolio",
} as const;

export function isLocaleCode(value: string | undefined): value is LocaleCode {
  return Boolean(value && localeCodes.includes(value as LocaleCode));
}

export function getLocaleContent(locale: LocaleCode) {
  return locales[locale];
}

export function getLocalizedPath(locale: LocaleCode, page?: PageSlug | LegacyPageSlug | "home") {
  const resolvedPage = page && page in legacyRedirects ? legacyRedirects[page as LegacyPageSlug] : page;
  return resolvedPage && resolvedPage !== "home" ? `/${locale}/${resolvedPage}/` : `/${locale}/`;
}

export function getAlternates(page?: PageSlug | "home") {
  return localeCodes.map((locale) => ({
    locale,
    href: getLocalizedPath(locale, page),
  }));
}
