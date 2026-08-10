import type { LocaleCode } from "./locales";

type HomeCard = {
  title: string;
  text: string;
  href?: string;
};

type HomeFaq = {
  question: string;
  answer: string;
};

export type ConversionHomeContent = {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    secondary: string;
    priceSignal: string;
    primaryCta: string;
    secondaryCta: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    text: string;
    viewAll: string;
    viewWebsite: string;
    linkPending: string;
  };
  trust: string[];
  solutions: {
    eyebrow: string;
    title: string;
    text: string;
    learnMore: string;
    cards: HomeCard[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    text: string;
    compare: string;
    customQuote: string;
    plans: Record<"digitalFoundation" | "growthSetup" | "aiDataUpgrade", { title: string; text: string }>;
    maintenance: { title: string; text: string };
  };
  process: {
    eyebrow: string;
    title: string;
    steps: HomeCard[];
  };
  founder: {
    eyebrow: string;
    title: string;
    text: string;
  };
  outcomes: {
    eyebrow: string;
    title: string;
    items: HomeCard[];
  };
  industries: {
    eyebrow: string;
    title: string;
    text: string;
    links: Array<{ label: string; href: string }>;
  };
  partners: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: HomeFaq[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
  };
};

const en: ConversionHomeContent = {
  seo: {
    title: "Websiteli - Websites that turn visitors into customers",
    description:
      "Swiss web design for small businesses. Websiteli builds fast, professional websites with SEO foundations, clear pricing, forms, analytics and optional automation.",
  },
  hero: {
    eyebrow: "Websites for small businesses",
    title: "Websites that turn visitors into customers.",
    text: "Fast, professional websites built in Switzerland - designed around trust, enquiries, bookings and sales.",
    secondary: "Need more than a website? We can also connect automation, AI and custom business tools.",
    priceSignal: "Websites from CHF 990",
    primaryCta: "See our work",
    secondaryCta: "Get a free website review",
  },
  portfolio: {
    eyebrow: "Real work",
    title: "Websites we've built",
    text: "A selection of websites and digital products we've designed and built.",
    viewAll: "View full portfolio",
    viewWebsite: "View website",
    linkPending: "Website link being verified",
  },
  trust: ["Swiss-based", "Custom-built", "SEO foundations included", "Mobile-first", "You own your website", "Direct contact with developers"],
  solutions: {
    eyebrow: "What we build",
    title: "Start with the website. Add smarter systems when they help.",
    text: "Websiteli is website-first for new visitors, with automation and AI available when the business is ready.",
    learnMore: "Learn more",
    cards: [
      {
        title: "Business Websites",
        text: "Professional websites designed to turn visitors into enquiries, bookings or sales.",
        href: "business-websites",
      },
      {
        title: "Websites + Automation",
        text: "Connect forms, bookings, follow-ups and everyday workflows.",
        href: "lead-generation",
      },
      {
        title: "Custom AI & Software",
        text: "When an off-the-shelf tool is not enough, we can build the system around your business.",
        href: "custom-web-apps",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Clear starting points",
    text: "Every project is scoped properly, but you should know the starting point before you contact us.",
    compare: "Compare all packages",
    customQuote: "Custom quote",
    plans: {
      digitalFoundation: {
        title: "Digital Foundation",
        text: "A professional website foundation for small businesses that need a credible online presence.",
      },
      growthSetup: {
        title: "Growth Setup",
        text: "A larger setup for leads, bookings, Google Business, tracking and growth-focused pages.",
      },
      aiDataUpgrade: {
        title: "AI/Data Upgrade",
        text: "Automation, AI helpers, dashboards or custom workflows after the website foundation is clear.",
      },
    },
    maintenance: {
      title: "Website Maintenance",
      text: "Monthly care for updates, monitoring, small changes and technical support.",
    },
  },
  process: {
    eyebrow: "How it works",
    title: "A simple path from first message to launch.",
    steps: [
      { title: "Tell us about your business", text: "Share your current website, goals and what visitors should do next." },
      { title: "We design and build", text: "We shape the structure, pages, visuals, forms, SEO basics and tracking." },
      { title: "You review", text: "You check the website, request changes and confirm the launch details." },
      { title: "We launch", text: "The site goes live with ownership, handover and support options clear." },
    ],
  },
  founder: {
    eyebrow: "Human team",
    title: "Built by developers in Switzerland.",
    text:
      "Websiteli is a lean Swiss-based studio run by technical founders. We combine software engineering with practical small-business websites, clear scope and direct communication.",
  },
  outcomes: {
    eyebrow: "Business outcomes",
    title: "What a better website can make easier",
    items: [
      { title: "Get more enquiries", text: "Make the offer and next step obvious." },
      { title: "Accept bookings", text: "Give visitors a smoother path to reserve a time." },
      { title: "Collect leads", text: "Capture useful context before you reply." },
      { title: "Sell products", text: "Create clearer product and trust journeys." },
      { title: "Build trust", text: "Show real work, ownership and contact details early." },
      { title: "Automate follow-ups", text: "Add reminders or workflows when manual work grows." },
    ],
  },
  industries: {
    eyebrow: "Solutions for",
    title: "Website plans for common small-business needs",
    text: "Long-tail industry content stays on dedicated pages so the homepage can stay clear.",
    links: [
      { label: "Business websites", href: "/services/business-websites/" },
      { label: "Portfolio websites", href: "/services/portfolio-websites/" },
      { label: "Healthcare websites", href: "/industries/healthcare/" },
      { label: "Restaurant websites", href: "/industries/restaurants/" },
      { label: "Beauty websites", href: "/industries/beauty-salons/" },
      { label: "Automation", href: "/services/business-automation/" },
      { label: "AI assistants", href: "/services/ai-chatbots/" },
      { label: "Website maintenance", href: "/services/website-maintenance/" },
    ],
  },
  partners: {
    eyebrow: "Partners",
    title: "Work with Websiteli",
    text: "For wedding professionals, agencies, consultants and partners who want to offer better websites to their clients.",
    cta: "Explore partnerships",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions before a website project",
    items: [
      {
        question: "How much does a Websiteli website cost?",
        answer: "The configured Swiss starting price is CHF 990 for Digital Foundation. Larger website and growth scopes are quoted from the pricing configuration and final scope.",
      },
      {
        question: "Do I own my website?",
        answer: "Yes. Clients should own the domain, website/source, analytics, Search Console access and assets unless a third-party service has separate terms.",
      },
      {
        question: "Can you add automation or AI later?",
        answer: "Yes. The website is the gateway product. Automation, AI, dashboards and custom tools can be added when they solve a real business problem.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Free website review",
    title: "Want to know what we'd improve on your website?",
    text: "We'll look at your website and send practical recommendations. No obligation.",
    cta: "Get a free website review",
  },
};

const localized: Record<LocaleCode, Partial<ConversionHomeContent>> = {
  en: {},
  de: {
    seo: {
      title: "Websiteli - Websites, die Besucher zu Kunden machen",
      description: "Schweizer Webdesign für kleine Unternehmen: schnelle Websites mit SEO-Grundlagen, klaren Preisen, Formularen, Analytics und optionaler Automation.",
    },
    hero: {
      eyebrow: "Websites für kleine Unternehmen",
      title: "Websites, die Besucher zu Kunden machen.",
      text: "Schnelle, professionelle Websites aus der Schweiz - gestaltet für Vertrauen, Anfragen, Buchungen und Verkäufe.",
      secondary: "Brauchen Sie mehr als eine Website? Wir verbinden auch Automation, KI und individuelle Business-Tools.",
      priceSignal: "Websites ab CHF 990",
      primaryCta: "Unsere Arbeit ansehen",
      secondaryCta: "Kostenlosen Website-Check anfragen",
    },
    portfolio: { ...en.portfolio, viewAll: "Ganzes Portfolio ansehen", viewWebsite: "Website ansehen", linkPending: "Website-Link wird geprüft" },
    finalCta: { ...en.finalCta, cta: "Kostenlosen Website-Check anfragen" },
  },
  hu: {
    hero: {
      eyebrow: "Weboldalak kisvállalkozásoknak",
      title: "Weboldalak, amelyek ügyfelekké alakítják a látogatókat.",
      text: "Gyors, professzionális weboldalak Svájcban - bizalomra, ajánlatkérésekre, foglalásokra és eladásokra tervezve.",
      secondary: "Több kell, mint weboldal? Automatizálást, AI-t és egyedi üzleti eszközöket is kapcsolunk hozzá.",
      priceSignal: "Weboldalak CHF 990-től",
      primaryCta: "Munkáink",
      secondaryCta: "Ingyenes weboldal-áttekintés",
    },
  },
  pl: {
    hero: {
      eyebrow: "Strony dla małych firm",
      title: "Strony, które zmieniają odwiedzających w klientów.",
      text: "Szybkie, profesjonalne strony budowane w Szwajcarii - pod zaufanie, zapytania, rezerwacje i sprzedaż.",
      secondary: "Potrzebujesz więcej niż strony? Możemy podłączyć automatyzację, AI i narzędzia biznesowe.",
      priceSignal: "Strony od CHF 990",
      primaryCta: "Zobacz realizacje",
      secondaryCta: "Bezpłatny przegląd strony",
    },
  },
  es: {
    hero: {
      eyebrow: "Webs para pequeñas empresas",
      title: "Webs que convierten visitantes en clientes.",
      text: "Webs rápidas y profesionales creadas en Suiza para generar confianza, consultas, reservas y ventas.",
      secondary: "¿Necesitas más que una web? También conectamos automatización, IA y herramientas a medida.",
      priceSignal: "Webs desde CHF 990",
      primaryCta: "Ver trabajos",
      secondaryCta: "Revisión web gratuita",
    },
  },
  fr: {
    seo: {
      title: "Websiteli - Des sites qui transforment les visiteurs en clients",
      description: "Création de sites en Suisse pour PME: sites rapides, bases SEO, prix clairs, formulaires, analytics et automatisation en option.",
    },
    hero: {
      eyebrow: "Sites pour petites entreprises",
      title: "Des sites qui transforment les visiteurs en clients.",
      text: "Sites rapides et professionnels créés en Suisse - pensés pour la confiance, les demandes, les réservations et les ventes.",
      secondary: "Besoin de plus qu'un site? Nous pouvons connecter automatisation, IA et outils métier sur mesure.",
      priceSignal: "Sites dès CHF 990",
      primaryCta: "Voir nos réalisations",
      secondaryCta: "Audit de site gratuit",
    },
    portfolio: { ...en.portfolio, viewAll: "Voir tout le portfolio", viewWebsite: "Voir le site", linkPending: "Lien du site en vérification" },
    finalCta: { ...en.finalCta, cta: "Demander une revue gratuite du site" },
  },
  it: {
    seo: {
      title: "Websiteli - Siti che trasformano i visitatori in clienti",
      description: "Web design in Svizzera per piccole imprese: siti veloci, basi SEO, prezzi chiari, form, analytics e automazione opzionale.",
    },
    hero: {
      eyebrow: "Siti per piccole imprese",
      title: "Siti che trasformano i visitatori in clienti.",
      text: "Siti veloci e professionali creati in Svizzera - pensati per fiducia, richieste, prenotazioni e vendite.",
      secondary: "Serve più di un sito? Possiamo collegare automazione, AI e strumenti business su misura.",
      priceSignal: "Siti da CHF 990",
      primaryCta: "Vedi i lavori",
      secondaryCta: "Revisione gratuita del sito",
    },
    portfolio: { ...en.portfolio, viewAll: "Vedi tutto il portfolio", viewWebsite: "Vedi sito", linkPending: "Link del sito in verifica" },
    finalCta: { ...en.finalCta, cta: "Richiedi una revisione gratuita del sito" },
  },
  cz: {
    hero: {
      eyebrow: "Weby pro malé firmy",
      title: "Weby, které mění návštěvníky v zákazníky.",
      text: "Rychlé profesionální weby vytvořené ve Švýcarsku - pro důvěru, poptávky, rezervace a prodej.",
      secondary: "Potřebujete víc než web? Připojíme také automatizaci, AI a vlastní business nástroje.",
      priceSignal: "Weby od CHF 990",
      primaryCta: "Ukázky práce",
      secondaryCta: "Bezplatná kontrola webu",
    },
  },
  sk: {
    hero: {
      eyebrow: "Weby pre malé firmy",
      title: "Weby, ktoré menia návštevníkov na zákazníkov.",
      text: "Rýchle profesionálne weby vytvorené vo Švajčiarsku - pre dôveru, dopyty, rezervácie a predaj.",
      secondary: "Potrebujete viac než web? Pripojíme aj automatizáciu, AI a vlastné business nástroje.",
      priceSignal: "Weby od CHF 990",
      primaryCta: "Pozrieť prácu",
      secondaryCta: "Bezplatná kontrola webu",
    },
  },
  pt: {
    hero: {
      eyebrow: "Sites para pequenas empresas",
      title: "Sites que transformam visitantes em clientes.",
      text: "Sites rápidos e profissionais criados na Suíça - pensados para confiança, pedidos, reservas e vendas.",
      secondary: "Precisa de mais do que um site? Também ligamos automação, IA e ferramentas à medida.",
      priceSignal: "Sites desde CHF 990",
      primaryCta: "Ver trabalhos",
      secondaryCta: "Revisão gratuita do site",
    },
  },
  da: {
    hero: {
      eyebrow: "Websites til små virksomheder",
      title: "Websites der gør besøgende til kunder.",
      text: "Hurtige, professionelle websites bygget i Schweiz - designet til tillid, henvendelser, bookinger og salg.",
      secondary: "Brug for mere end et website? Vi kan også forbinde automatisering, AI og specialværktøjer.",
      priceSignal: "Websites fra CHF 990",
      primaryCta: "Se vores arbejde",
      secondaryCta: "Gratis website-gennemgang",
    },
  },
  nl: {
    hero: {
      eyebrow: "Websites voor kleine bedrijven",
      title: "Websites die bezoekers klanten maken.",
      text: "Snelle, professionele websites gebouwd in Zwitserland - ontworpen voor vertrouwen, aanvragen, boekingen en verkoop.",
      secondary: "Meer nodig dan een website? We koppelen ook automatisering, AI en maatwerktools.",
      priceSignal: "Websites vanaf CHF 990",
      primaryCta: "Bekijk ons werk",
      secondaryCta: "Gratis websitecheck",
    },
  },
  ja: {
    hero: {
      eyebrow: "小規模ビジネス向けWebサイト",
      title: "訪問者を顧客に変えるWebサイト。",
      text: "スイスで制作する高速でプロフェッショナルなWebサイト。信頼、問い合わせ、予約、販売につながる設計です。",
      secondary: "Webサイト以上が必要な場合は、自動化、AI、カスタム業務ツールも接続できます。",
      priceSignal: "WebサイトはCHF 990から",
      primaryCta: "制作実績を見る",
      secondaryCta: "無料Webサイトレビュー",
    },
  },
};

function mergeHomeContent(locale: LocaleCode): ConversionHomeContent {
  const overrides = localized[locale] ?? {};

  return {
    ...en,
    ...overrides,
    seo: { ...en.seo, ...overrides.seo },
    hero: { ...en.hero, ...overrides.hero },
    portfolio: { ...en.portfolio, ...overrides.portfolio },
    finalCta: { ...en.finalCta, ...overrides.finalCta },
  };
}

export function getConversionHomeContent(locale: LocaleCode) {
  return mergeHomeContent(locale);
}
