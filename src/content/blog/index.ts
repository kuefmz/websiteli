import { localeCodes, type LocaleCode } from "../locales";
import localBusinessWebsite from "./posts/local-business-website";
import smallBusinessWebsite from "./posts/small-business-website";
import whyAiGeneratedWebsitesAreNotEnough from "./posts/why-ai-generated-websites-are-not-enough-for-a-real-business";
import businsessWebsiteFreatures from "./posts/business-website-features";
import websiteFirstImpression from "./posts/website-first-impression";
import websiteVsFacebook from "./posts/website-vs-facebook";
import websiteCostSwitzerland from "./posts/website-cost-switzerland";
import whyBusinessWebsitesGetCustomers from "./posts/why-business-websites-get-customers";
import websiteLifeCycleStatistics from "./posts/website-life-cycle-statistics";
import ceoWebsiteBusinessAsset from "./posts/ceo-website-business-asset";
import yourWebsiteShouldntEndAtContactUs from "./posts/your-website-shouldnt-end-at-contact-us";
import becomeAWebsiteliPartner from "./posts/become-a-websiteli-partner";
import websiteLeadQualification from "./posts/website-lead-qualification";
import type { BlogPostSource } from "./types";

export type BlogPost = {
  slug: string;
  status: "draft" | "scheduled" | "published";
  title: string;
  description: string;
  category: string;
  tags: string[];
  featuredImage: string;
  imageAlt: string;
  author: string;
  publishedAt: string;
  publishDate: string;
  updatedAt: string;
  readingTime: string;
  audience: string;
  excerpt: string;
  summary: string[];
  keyTakeaways: string[];
  chatGptPrompts: string[];
  references: { title: string; publisher: string; href: string }[];
  headings: string[];
  body: string;
  related: string[];
  social: {
    linkedin: string;
    facebook: string;
    instagram: string;
  };
  faqs: { question: string; answer: string }[];
  locale: LocaleCode;
  sourceLocale: LocaleCode;
  isFallback: boolean;
};

const DEFAULT_LOCALE: LocaleCode = "en";
const blogSources: BlogPostSource[] = [
  smallBusinessWebsite,
  whyAiGeneratedWebsitesAreNotEnough,
  businsessWebsiteFreatures,
  websiteFirstImpression,
  websiteVsFacebook,
  localBusinessWebsite,
  websiteCostSwitzerland,
  whyBusinessWebsitesGetCustomers,
  websiteLifeCycleStatistics,
  ceoWebsiteBusinessAsset,
  yourWebsiteShouldntEndAtContactUs,
  becomeAWebsiteliPartner,
  websiteLeadQualification,
];

const marketKeywords = [
  "website creation Switzerland",
  "KMU website erstellen Schweiz",
  "website erstellen Deutschland",
  "Website Agentur Österreich",
  "tvorba webových stránek pro firmy",
  "tvorba web stránok pre firmy",
  "céges weboldal készítés",
  "small business website design",
  "restaurant website booking",
  "AI automation for small business",
  "Google Business Profile optimization",
  "website redesign checklist",
  "local SEO website",
  "local business website",
  "website for local business",
  "website cost Switzerland",
  "website price Switzerland",
  "affordable website Switzerland",
  "lead generation landing page",
  "website lead qualification",
  "qualified website leads",
  "lead routing automation",
  "website maintenance audit",
  "Websiteli partner",
  "white-label web development Switzerland",
  "agency web development partner",
  "AI automation partner",
  "event website development",
];

function getPostDate(value: string) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function getTodayIsoDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function isPublishedSource(source: BlogPostSource) {
  const status = source.status ?? (source.published ? "published" : "draft");
  if (status === "draft") return false;
  if (status === "published") return true;

  const publishDate = source.publishDate ?? source.date;
  return Boolean(publishDate && publishDate <= getTodayIsoDate());
}

function sourceHasLocale(source: BlogPostSource, locale: LocaleCode) {
  return Boolean(source.translations[locale]);
}

function sourceCanRenderLocale(source: BlogPostSource, locale: LocaleCode) {
  return sourceHasLocale(source, locale);
}

function getMarkdownHeadings(body: string) {
  return body
    .split("\n")
    .map((line) => line.match(/^##\s+(.+)$/)?.[1]?.trim())
    .filter((heading): heading is string => Boolean(heading));
}

function stripMarkdown(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function getLeadParagraphs(body: string, limit = 3) {
  return body
    .split(/\n{2,}/)
    .map((block) => stripMarkdown(block.replace(/^#{2,3}\s+/, "")))
    .filter((block) => block && !block.startsWith("- "))
    .slice(0, limit);
}

function getFirstListItems(body: string, limit = 4) {
  return body
    .split("\n")
    .map((line) => line.match(/^-\s+(.+)$/)?.[1])
    .filter((item): item is string => Boolean(item))
    .map(stripMarkdown)
    .slice(0, limit);
}

function getAudienceSummary(translation: BlogPostSource["translations"]["en"]) {
  const labels: Partial<Record<LocaleCode, string>> = {
    en: "Audience",
    de: "Zielgruppe",
    hu: "Célközönség",
    pl: "Odbiorcy",
    es: "Audiencia",
    fr: "Public cible",
    it: "Pubblico",
    cz: "Cílová skupina",
    sk: "Cieľová skupina",
    pt: "Público",
    da: "Målgruppe",
    nl: "Doelgroep",
    ja: "対象読者",
  };

  return `${labels[translation.language] ?? labels.en}: ${translation.audience}.`;
}

function getDefaultSummary(source: BlogPostSource, translation: BlogPostSource["translations"]["en"]) {
  const leadParagraphs = getLeadParagraphs(translation.body, 2);
  const listItems = getFirstListItems(translation.body, 4);
  const summary = [
    translation.description,
    translation.excerpt,
    getAudienceSummary(translation),
    ...leadParagraphs,
    ...listItems.map((item) => `Important point: ${item}.`),
  ];

  return Array.from(new Set(summary.map(stripMarkdown).filter(Boolean))).slice(0, 8);
}

function getDefaultKeyTakeaways(translation: BlogPostSource["translations"]["en"]) {
  const headings = getMarkdownHeadings(translation.body).slice(0, 6);
  const listItems = getFirstListItems(translation.body, 6);
  const takeaways = [
    ...headings.map((heading) => `Focus on ${stripMarkdown(heading).toLowerCase()}.`),
    ...listItems,
  ];

  return Array.from(new Set(takeaways.map(stripMarkdown).filter(Boolean))).slice(0, 7);
}

function getDefaultChatGptPrompts(translation: BlogPostSource["translations"]["en"]) {
  const title = translation.title;
  const normalizedTags = translation.tags.join(" ").toLowerCase();

  const genericPrompts: Record<LocaleCode, string[]> = {
    en: [
      `Based on "${title}", what should I improve first on my business website?`,
      `Turn the article "${title}" into a step-by-step checklist for a small business.`,
      `What mistakes should I avoid after reading "${title}"?`,
    ],
    de: [
      `Was sollte ich nach dem Artikel "${title}" zuerst an meiner Unternehmenswebsite verbessern?`,
      `Erstelle aus "${title}" eine praktische Checkliste für ein kleines Unternehmen.`,
      `Welche Fehler sollte ich nach dem Lesen von "${title}" vermeiden?`,
    ],
    hu: [
      `A(z) "${title}" alapján mit javítsak először a céges weboldalamon?`,
      `Készíts gyakorlati kisvállalkozói ellenőrzőlistát a(z) "${title}" cikkből.`,
      `Milyen hibákat kerüljek el a(z) "${title}" elolvasása után?`,
    ],
    pl: [
      `Na podstawie artykułu "${title}" co najpierw poprawić na stronie firmowej?`,
      `Zmień artykuł "${title}" w praktyczną checklistę dla małej firmy.`,
      `Jakich błędów unikać po przeczytaniu "${title}"?`,
    ],
    es: [
      `Según "${title}", ¿qué debería mejorar primero en mi web de negocio?`,
      `Convierte el artículo "${title}" en una checklist práctica para una pequeña empresa.`,
      `¿Qué errores debería evitar después de leer "${title}"?`,
    ],
    fr: [
      `D'après "${title}", que dois-je améliorer en premier sur mon site d'entreprise ?`,
      `Transforme l'article "${title}" en checklist pratique pour une petite entreprise.`,
      `Quelles erreurs dois-je éviter après avoir lu "${title}" ?`,
    ],
    it: [
      `In base a "${title}", cosa dovrei migliorare per primo sul sito della mia azienda?`,
      `Trasforma l'articolo "${title}" in una checklist pratica per una piccola impresa.`,
      `Quali errori dovrei evitare dopo aver letto "${title}"?`,
    ],
    cz: [
      `Podle článku "${title}" co mám na firemním webu zlepšit jako první?`,
      `Převeď článek "${title}" na praktický checklist pro malou firmu.`,
      `Jakým chybám se mám po přečtení "${title}" vyhnout?`,
    ],
    sk: [
      `Podľa článku "${title}" čo mám na firemnom webe zlepšiť ako prvé?`,
      `Premeň článok "${title}" na praktický checklist pre malú firmu.`,
      `Akým chybám sa mám po prečítaní "${title}" vyhnúť?`,
    ],
    pt: [
      `Com base em "${title}", o que devo melhorar primeiro no site do meu negócio?`,
      `Transforma o artigo "${title}" numa checklist prática para uma pequena empresa.`,
      `Que erros devo evitar depois de ler "${title}"?`,
    ],
    da: [
      `Ud fra "${title}", hvad bør jeg først forbedre på min virksomheds website?`,
      `Lav artiklen "${title}" om til en praktisk tjekliste for en mindre virksomhed.`,
      `Hvilke fejl bør jeg undgå efter at have læst "${title}"?`,
    ],
    nl: [
      `Op basis van "${title}", wat moet ik eerst verbeteren aan mijn bedrijfswebsite?`,
      `Maak van het artikel "${title}" een praktische checklist voor een klein bedrijf.`,
      `Welke fouten moet ik vermijden na het lezen van "${title}"?`,
    ],
    ja: [
      `「${title}」をもとに、事業サイトで最初に改善すべき点を教えてください。`,
      `「${title}」を小規模事業向けの実用チェックリストにしてください。`,
      `「${title}」を読んだあとに避けるべき失敗を教えてください。`,
    ],
  };

  if (normalizedTags.includes("seo") || title.toLowerCase().includes("seo")) {
    return translation.language === "en" ? [
      `Based on "${title}", how can I apply these SEO recommendations to my own small business website?`,
      `Create a practical SEO checklist from the article "${title}".`,
      `What SEO mistakes should I avoid after reading "${title}"?`,
    ] : genericPrompts[translation.language];
  }

  if (normalizedTags.includes("ai") || title.toLowerCase().includes("ai")) {
    return translation.language === "en" ? [
      `Explain the article "${title}" for a beginner business owner.`,
      `Based on "${title}", compare AI website builders with a professionally owned website setup.`,
      `What would an implementation plan look like for the advice in "${title}"?`,
    ] : genericPrompts[translation.language];
  }

  return genericPrompts[translation.language];
}

function getInstagramReadMore(locale: LocaleCode) {
  const labels: Record<LocaleCode, string> = {
    en: "Read it on the Websiteli blog.",
    de: "Lesen Sie den Artikel im Websiteli-Blog.",
    hu: "Olvasd el a Websiteli blogon.",
    pl: "Przeczytaj na blogu Websiteli.",
    es: "Léelo en el blog de Websiteli.",
    fr: "À lire sur le blog Websiteli.",
    it: "Leggilo sul blog Websiteli.",
    cz: "Přečtěte si článek na blogu Websiteli.",
    sk: "Prečítajte si článok na blogu Websiteli.",
    pt: "Leia no blog da Websiteli.",
    da: "Læs artiklen på Websiteli-bloggen.",
    nl: "Lees het op de Websiteli-blog.",
    ja: "Websiteliブログで全文をご覧ください。",
  };

  return labels[locale];
}

function getFallbackSocial(source: BlogPostSource, locale: LocaleCode, title: string, excerpt: string) {
  const readMore = getInstagramReadMore(locale);
  const original = source.social;

  if (locale === DEFAULT_LOCALE) {
    return {
      linkedin: original?.linkedin ?? `${title}\n\n${excerpt}`,
      facebook: original?.facebook ?? `${title}\n\n${excerpt}`,
      instagram: original?.instagram ?? `${title}\n\n${excerpt}\n\n${readMore}`,
    };
  }

  return {
    linkedin: `${title}\n\n${excerpt}`,
    facebook: `${title}\n\n${excerpt}`,
    instagram: `${title}\n\n${excerpt}\n\n${readMore}`,
  };
}

function mapSourceToPost(source: BlogPostSource, locale: LocaleCode): BlogPost | null {
  const sourceLocale = sourceHasLocale(source, locale)
    ? locale
    : source.translationFallback
      ? DEFAULT_LOCALE
      : null;

  if (!sourceLocale || !sourceCanRenderLocale(source, sourceLocale)) return null;

  const translation = source.translations[sourceLocale];
  if (!translation) return null;

  const status = source.status ?? (source.published ? "published" : "draft");
  const publishDate = source.publishDate ?? source.date;
  const summary = translation.summary ?? getDefaultSummary(source, translation);
  const keyTakeaways = translation.keyTakeaways ?? getDefaultKeyTakeaways(translation);
  const chatGptPrompts = translation.chatGptPrompts ?? getDefaultChatGptPrompts(translation);

  return {
    slug: source.slug,
    status,
    title: translation.title,
    description: translation.description,
    category: translation.category,
    tags: translation.tags,
    featuredImage: source.image,
    imageAlt: source.imageAlt ?? translation.title,
    author: source.author,
    publishedAt: source.date,
    publishDate,
    updatedAt: source.updated ?? source.date,
    readingTime: translation.readingTime,
    audience: translation.audience,
    excerpt: translation.excerpt,
    summary,
    keyTakeaways,
    chatGptPrompts,
    references: translation.references ?? [],
    headings: getMarkdownHeadings(translation.body),
    body: translation.body,
    related: source.related,
    social: getFallbackSocial(source, locale, translation.title, translation.excerpt),
    faqs: translation.faqs,
    locale,
    sourceLocale,
    isFallback: sourceLocale !== locale,
  };
}

export const blogPosts: BlogPost[] = blogSources
  .filter(isPublishedSource)
  .flatMap((source) => localeCodes.map((locale) => mapSourceToPost(source, locale)).filter((post): post is BlogPost => Boolean(post)))
  .sort((a, b) => getPostDate(b.publishDate) - getPostDate(a.publishDate));

export const blogKeywords = marketKeywords;

export function getBlogPostsForLocale(locale: LocaleCode) {
  return blogPosts.filter((post) => post.locale === locale);
}

export function getBlogPost(locale: LocaleCode, slug: string) {
  return blogPosts.find((post) => post.locale === locale && post.slug === slug);
}

export function getAllBlogSlugs() {
  return Array.from(new Set(blogPosts.map((post) => post.slug)));
}
