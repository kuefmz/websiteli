import { localeCodes, type LocaleCode } from "../locales";
import smallBusinessWebsite from "./posts/small-business-website";
import whyAiGeneratedWebsitesAreNotEnough from "./posts/why-ai-generated-websites-are-not-enough-for-a-real-business";
import businsessWebsiteFreatures from "./posts/business-website-features";
import type { BlogPostSource } from "./types";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  audience: string;
  excerpt: string;
  headings: string[];
  body: string;
  related: string[];
  faqs: { question: string; answer: string }[];
  locale: LocaleCode;
  sourceLocale: LocaleCode;
  isFallback: boolean;
};

const DEFAULT_LOCALE: LocaleCode = "en";
const blogSources: BlogPostSource[] = [smallBusinessWebsite, whyAiGeneratedWebsitesAreNotEnough, businsessWebsiteFreatures];

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
  "lead generation landing page",
  "website maintenance audit",
];

function getPostDate(value: string) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function getMarkdownHeadings(body: string) {
  return body
    .split("\n")
    .map((line) => line.match(/^##\s+(.+)$/)?.[1]?.trim())
    .filter((heading): heading is string => Boolean(heading));
}

function toBlogPost(source: BlogPostSource, locale: LocaleCode): BlogPost {
  const translation = source.translations[locale] ?? source.translations[DEFAULT_LOCALE];
  const isFallback = !source.translations[locale] && locale !== DEFAULT_LOCALE;

  return {
    slug: source.slug,
    title: translation.title,
    description: translation.description,
    category: translation.category,
    tags: translation.tags,
    featuredImage: source.image,
    author: source.author,
    publishedAt: source.date,
    updatedAt: source.updated ?? source.date,
    readingTime: translation.readingTime,
    audience: translation.audience,
    excerpt: translation.excerpt,
    headings: getMarkdownHeadings(translation.body),
    body: translation.body,
    related: source.related,
    faqs: translation.faqs,
    locale,
    sourceLocale: translation.language,
    isFallback,
  };
}

export async function getBlogPosts(locale: LocaleCode) {
  return blogSources
    .filter((source) => source.published)
    .map((source) => toBlogPost(source, locale))
    .sort((a, b) => getPostDate(b.publishedAt) - getPostDate(a.publishedAt));
}

export async function getBlogPost(locale: LocaleCode, slug: string) {
  return (await getBlogPosts(locale)).find((post) => post.slug === slug);
}

export async function getBlogSlugs() {
  return blogSources.filter((source) => source.published).map((source) => source.slug);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getHeadingId(heading: string) {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function renderBlogMarkdown(markdown: string) {
  const html: string[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${escapeHtml(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`);
    list = [];
  };

  markdown.split(/\r?\n/).forEach((line) => {
    const heading = line.match(/^##\s+(.+)$/)?.[1]?.trim();
    const listItem = line.match(/^-\s+(.+)$/)?.[1]?.trim();

    if (heading) {
      flushParagraph();
      flushList();
      html.push(`<h2 id="${getHeadingId(heading)}">${escapeHtml(heading)}</h2>`);
      return;
    }

    if (listItem) {
      flushParagraph();
      list.push(listItem);
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      return;
    }

    flushList();
    paragraph.push(line.trim());
  });

  flushParagraph();
  flushList();

  return html.join("");
}

export function getBlogIndexContent(locale: LocaleCode) {
  const localized: Record<LocaleCode, {
    seo: { title: string; description: string };
    eyebrow: string;
    title: string;
    text: string;
    featured: string;
    searchLabel: string;
    categoriesLabel: string;
    readArticle: string;
  }> = {
    en: {
      seo: {
        title: "Website, SEO and AI Automation Blog - Websiteli",
        description: "Practical Websiteli guides about business websites, SEO, local visibility, lead generation, analytics, ownership and AI automation.",
      },
      eyebrow: "Blog",
      title: "Practical guides for businesses that want more leads.",
      text: "Articles about websites, SEO, local visibility, analytics, automation and owning the digital assets behind your business.",
      featured: "Featured article",
      searchLabel: "Search articles",
      categoriesLabel: "Categories",
      readArticle: "Read article",
    },
    de: {
      seo: { title: "Website, SEO und KI-Automation Blog - Websiteli", description: "Praktische Websiteli-Artikel zu Websites, SEO, lokaler Sichtbarkeit, Leadgenerierung, Analytics, Eigentum und KI-Automation." },
      eyebrow: "Blog",
      title: "Praktische Leitfäden für Unternehmen, die mehr Anfragen wollen.",
      text: "Artikel über Websites, SEO, lokale Sichtbarkeit, Analytics, Automatisierung und digitale Eigentumsrechte.",
      featured: "Empfohlener Artikel",
      searchLabel: "Artikel suchen",
      categoriesLabel: "Kategorien",
      readArticle: "Artikel lesen",
    },
    hu: {
      seo: { title: "Weboldal, SEO és AI automatizálás blog - Websiteli", description: "Gyakorlati Websiteli útmutatók céges weboldalakról, SEO-ról, helyi láthatóságról, lead generálásról, analitikáról és AI-ról." },
      eyebrow: "Blog",
      title: "Gyakorlati útmutatók több érdeklődőt kereső vállalkozásoknak.",
      text: "Cikkek weboldalakról, SEO-ról, helyi láthatóságról, analitikáról, automatizálásról és digitális tulajdonról.",
      featured: "Kiemelt cikk",
      searchLabel: "Cikkek keresése",
      categoriesLabel: "Kategóriák",
      readArticle: "Cikk olvasása",
    },
    pl: {
      seo: { title: "Blog o stronach, SEO i automatyzacji AI - Websiteli", description: "Praktyczne poradniki Websiteli o stronach firmowych, SEO, widoczności lokalnej, leadach, analityce, własności i AI." },
      eyebrow: "Blog",
      title: "Praktyczne poradniki dla firm, które chcą więcej zapytań.",
      text: "Artykuły o stronach, SEO, lokalnej widoczności, analityce, automatyzacji i własności zasobów cyfrowych.",
      featured: "Polecany artykuł",
      searchLabel: "Szukaj artykułów",
      categoriesLabel: "Kategorie",
      readArticle: "Czytaj artykuł",
    },
    es: {
      seo: { title: "Blog de webs, SEO y automatización con IA - Websiteli", description: "Guías prácticas de Websiteli sobre webs de negocio, SEO, visibilidad local, leads, analítica, propiedad e IA." },
      eyebrow: "Blog",
      title: "Guías prácticas para negocios que quieren más clientes potenciales.",
      text: "Artículos sobre webs, SEO, visibilidad local, analítica, automatización y propiedad digital.",
      featured: "Artículo destacado",
      searchLabel: "Buscar artículos",
      categoriesLabel: "Categorías",
      readArticle: "Leer artículo",
    },
    fr: {
      seo: { title: "Blog sites web, SEO et automatisation IA - Websiteli", description: "Guides pratiques Websiteli sur sites d'entreprise, SEO, visibilité locale, leads, analytics, propriété et IA." },
      eyebrow: "Blog",
      title: "Guides pratiques pour les entreprises qui veulent plus de demandes.",
      text: "Articles sur les sites, le SEO, la visibilité locale, les analytics, l'automatisation et la propriété numérique.",
      featured: "Article à la une",
      searchLabel: "Rechercher des articles",
      categoriesLabel: "Catégories",
      readArticle: "Lire l'article",
    },
    it: {
      seo: { title: "Blog su siti web, SEO e automazione AI - Websiteli", description: "Guide pratiche Websiteli su siti aziendali, SEO, visibilità locale, lead generation, analytics, proprietà e AI." },
      eyebrow: "Blog",
      title: "Guide pratiche per aziende che vogliono più contatti.",
      text: "Articoli su siti, SEO, visibilità locale, analytics, automazione e proprietà degli asset digitali.",
      featured: "Articolo in evidenza",
      searchLabel: "Cerca articoli",
      categoriesLabel: "Categorie",
      readArticle: "Leggi l'articolo",
    },
    cz: {
      seo: { title: "Blog o webech, SEO a AI automatizaci - Websiteli", description: "Praktické návody Websiteli o firemních webech, SEO, lokální viditelnosti, lead generation, analytice, vlastnictví a AI." },
      eyebrow: "Blog",
      title: "Praktické návody pro firmy, které chtějí více poptávek.",
      text: "Články o webech, SEO, lokální viditelnosti, analytice, automatizaci a vlastnictví digitálních aktiv.",
      featured: "Doporučený článek",
      searchLabel: "Hledat články",
      categoriesLabel: "Kategorie",
      readArticle: "Číst článek",
    },
    sk: {
      seo: { title: "Blog o weboch, SEO a AI automatizácii - Websiteli", description: "Praktické články Websiteli pre slovenské firmy o weboch, SEO, lokálnej viditeľnosti, lead generation, analytike a AI." },
      eyebrow: "Blog",
      title: "Praktické návody pre firmy, ktoré chcú viac dopytov.",
      text: "Články o webových stránkach, SEO, lokálnej viditeľnosti, analytike, automatizácii a vlastníctve digitálnych aktív.",
      featured: "Odporúčaný článok",
      searchLabel: "Hľadať články",
      categoriesLabel: "Kategórie",
      readArticle: "Čítať článok",
    },
    pt: {
      seo: { title: "Blog de sites, SEO e automação com IA - Websiteli", description: "Guias práticos da Websiteli sobre sites empresariais, SEO, visibilidade local, leads, analytics, propriedade e IA." },
      eyebrow: "Blog",
      title: "Guias práticos para negócios que querem mais pedidos.",
      text: "Artigos sobre sites, SEO, visibilidade local, analytics, automação e propriedade digital.",
      featured: "Artigo em destaque",
      searchLabel: "Pesquisar artigos",
      categoriesLabel: "Categorias",
      readArticle: "Ler artigo",
    },
    da: {
      seo: { title: "Blog om websites, SEO og AI-automatisering - Websiteli", description: "Praktiske Websiteli-guides om virksomhedswebsites, SEO, lokal synlighed, leads, analytics, ejerskab og AI." },
      eyebrow: "Blog",
      title: "Praktiske guides til virksomheder, der vil have flere henvendelser.",
      text: "Artikler om websites, SEO, lokal synlighed, analytics, automatisering og ejerskab af digitale aktiver.",
      featured: "Udvalgt artikel",
      searchLabel: "Søg artikler",
      categoriesLabel: "Kategorier",
      readArticle: "Læs artikel",
    },
    nl: {
      seo: { title: "Blog over websites, SEO en AI-automatisering - Websiteli", description: "Praktische Websiteli-gidsen over bedrijfswebsites, SEO, lokale zichtbaarheid, leads, analytics, eigendom en AI." },
      eyebrow: "Blog",
      title: "Praktische gidsen voor bedrijven die meer aanvragen willen.",
      text: "Artikelen over websites, SEO, lokale zichtbaarheid, analytics, automatisering en eigendom van digitale assets.",
      featured: "Uitgelicht artikel",
      searchLabel: "Artikelen zoeken",
      categoriesLabel: "Categorieën",
      readArticle: "Artikel lezen",
    },
    ja: {
      seo: { title: "Webサイト、SEO、AI自動化ブログ - Websiteli", description: "ビジネスサイト、SEO、地域での見つけやすさ、リード獲得、分析、所有権、AI自動化に関するWebsiteliの実用ガイド。" },
      eyebrow: "ブログ",
      title: "問い合わせを増やしたいビジネスのための実用ガイド。",
      text: "Webサイト、SEO、地域検索、分析、自動化、デジタル資産の所有権に関する記事です。",
      featured: "注目記事",
      searchLabel: "記事を検索",
      categoriesLabel: "カテゴリー",
      readArticle: "記事を読む",
    },
  };

  return localized[locale];
}

export function getMarketKeywords() {
  return marketKeywords;
}
