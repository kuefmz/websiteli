import cs from "./locales/cs.json";
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

export const localeCodes = ["en", "de", "hu", "pl", "es", "fr", "it", "cs", "pt", "da", "nl", "ja"] as const;
export type LocaleCode = (typeof localeCodes)[number];

export const pageSlugs = ["services", "packages", "demos", "example-projects", "about", "contact"] as const;
export type PageSlug = (typeof pageSlugs)[number];

export const locales = {
  cs,
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
} as const;

export const pageNavKeys = {
  services: "services",
  packages: "packages",
  demos: "demos",
  "example-projects": "exampleProjects",
  about: "about",
  contact: "contact",
} as const;

export function isLocaleCode(value: string | undefined): value is LocaleCode {
  return Boolean(value && localeCodes.includes(value as LocaleCode));
}

export function getLocaleContent(locale: LocaleCode) {
  return locales[locale];
}

export function getLocalizedPath(locale: LocaleCode, page?: PageSlug | "home") {
  return page && page !== "home" ? `/${locale}/${page}/` : `/${locale}/`;
}

export function getAlternates(page?: PageSlug | "home") {
  return localeCodes.map((locale) => ({
    locale,
    href: getLocalizedPath(locale, page),
  }));
}
