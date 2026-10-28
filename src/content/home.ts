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
      "Swiss digital consultancy for distinctive websites, intelligent automation, data and connected business systems.",
  },
  hero: {
    eyebrow: "Websites for small businesses",
    title: "Websites that turn visitors into customers.",
    text: "Fast, professional websites built in Switzerland - designed around trust, enquiries, bookings and sales.",
    secondary: "Need more than a website? We can also connect automation, AI and custom business tools.",
    priceSignal: "",
    primaryCta: "See our work",
    secondaryCta: "Run the free Website & Market Scan",
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
      { label: "Internal AI assistants", href: "/services/internal-ai-assistants/" },
      { label: "Lead generation automation", href: "/services/lead-generation/" },
      { label: "Digital expertise", href: "/services-pricing/" },
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
        question: "How do we begin a collaboration?",
        answer: "Every project is scoped around your requirements. We agree deliverables, responsibilities and a tailored proposal after an initial consultation.",
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
    cta: "Run the free Website & Market Scan",
  },
};

const localized: Record<LocaleCode, Partial<ConversionHomeContent>> = {
  en: {},
  de: {
  "seo": {
    "title": "Webdesign Schweiz für KMU & Kleinunternehmen | Websiteli",
    "description": "Individuelle Websites und digitale Lösungen aus der Schweiz."
  },
  "hero": {
    "eyebrow": "Webdesign für Schweizer KMU",
    "title": "Professionelle Websites für KMU in der Schweiz",
    "text": "Websiteli gestaltet und entwickelt Websites, die Ihr Angebot verständlich zeigen und den Kontakt einfach machen – für kleine Unternehmen und Selbstständige.",
    "secondary": "Responsives Design, Kontaktformular und SEO-Grundlagen. Zusätzliche Funktionen planen wir nach Ihrem Bedarf.",
    "priceSignal": "",
    "primaryCta": "Unsere Arbeit ansehen",
    "secondaryCta": "Kostenloser Website-Check"
  },
  "portfolio": {
    "eyebrow": "Umgesetzte Projekte",
    "title": "Einblick in unsere Websites",
    "text": "Ausgewählte Websites und Webanwendungen aus unserer Arbeit.",
    "viewAll": "Ganzes Portfolio ansehen",
    "viewWebsite": "Website ansehen",
    "linkPending": "Website-Link wird geprüft"
  },
  "trust": [
    "Team in der Schweiz",
    "Individuelle Umsetzung",
    "SEO-Grundlagen",
    "Für Mobilgeräte optimiert",
    "Ihre Website bleibt in Ihrem Besitz",
    "Direkter Kontakt mit der Entwicklung"
  ],
  "solutions": {
    "eyebrow": "Leistungen",
    "title": "Die passende Website für Ihr Unternehmen",
    "text": "Starten Sie mit einem klaren Online-Auftritt. Buchungen, Automation oder individuelle Tools ergänzen wir, wenn sie zu Ihren Abläufen passen.",
    "learnMore": "Leistung ansehen",
    "cards": [
      {
        "title": "Business-Websites",
        "text": "Professionelle Websites für KMU, Kleinunternehmen und Selbstständige mit klaren Kontaktwegen.",
        "href": "business-websites"
      },
      {
        "title": "Websites und Automation",
        "text": "Verbinden Sie Formulare, Buchungen und wiederkehrende Aufgaben.",
        "href": "business-automation"
      },
      {
        "title": "Individuelle KI und Software",
        "text": "Eigene Anwendungen, wenn bestehende Tools Ihre Anforderungen nicht abdecken.",
        "href": "custom-web-apps"
      }
    ]
  },
  "pricing": {
    "eyebrow": "Preise",
    "title": "Ein klarer Startpunkt für Ihr Budget",
    "text": "Die Ausgangspreise geben Ihnen Orientierung. Der genaue Umfang und die Kosten stehen in Ihrer Offerte.",
    "compare": "Pakete und Website-Kosten vergleichen",
    "customQuote": "Individuelle Offerte",
    "plans": {
      "digitalFoundation": {
        "title": "Digitale Grundlage",
        "text": "Responsive Website mit Kontaktformular, Analytics, Search Console und SEO-Grundlagen."
      },
      "growthSetup": {
        "title": "Wachstums-Setup",
        "text": "Erweiterter Aufbau mit Buchungsintegration, Lead-Erfassung und Conversion-Tracking-Grundlagen."
      },
      "aiDataUpgrade": {
        "title": "KI- und Daten-Upgrade",
        "text": "KI-Assistenten, Dashboards und Automatisierung für Ihre Abläufe."
      }
    },
    "maintenance": {
      "title": "Website-Wartung",
      "text": "Separate Betreuung für Updates, Monitoring, kleine Änderungen und technischen Support."
    }
  },
  "process": {
    "eyebrow": "Zusammenarbeit",
    "title": "Von Ihrer Anfrage zur fertigen Website",
    "steps": [
      {
        "title": "Anforderungen besprechen",
        "text": "Wir klären Ihr Angebot, Ziele, Inhalte und gewünschte Kontaktwege."
      },
      {
        "title": "Gestalten und entwickeln",
        "text": "Wir bauen Struktur, Design, Seiten, Formulare und technische Grundlagen auf."
      },
      {
        "title": "Gemeinsam prüfen",
        "text": "Sie prüfen Inhalte und Gestaltung und geben die Umsetzung frei."
      },
      {
        "title": "Veröffentlichen und übergeben",
        "text": "Wir klären den Start, Ihre Zugänge und die gewünschte Betreuung."
      }
    ]
  },
  "founder": {
    "eyebrow": "Das Team",
    "title": "Entwicklung und direkter Kontakt in der Schweiz",
    "text": "Websiteli verbindet Webdesign mit Softwareentwicklung. Sie besprechen Ihr Projekt direkt mit dem Team, das es umsetzt."
  },
  "outcomes": {
    "eyebrow": "Ihr Online-Auftritt",
    "title": "Was eine gut geplante Website erleichtert",
    "items": [
      {
        "title": "Anfragen ermöglichen",
        "text": "Zeigen Sie Ihr Angebot und den nächsten Schritt deutlich."
      },
      {
        "title": "Buchungen vereinfachen",
        "text": "Integrieren Sie einen passenden Buchungsweg bei Bedarf."
      },
      {
        "title": "Interessenten erreichen",
        "text": "Erfassen Sie Anfragen mit den nötigen Informationen."
      },
      {
        "title": "Produkte präsentieren",
        "text": "Machen Sie Produkte und Kaufmöglichkeiten verständlich."
      },
      {
        "title": "Vertrauen aufbauen",
        "text": "Zeigen Sie reale Arbeiten, Kontaktdaten und Ihr Unternehmen."
      },
      {
        "title": "Abläufe vereinfachen",
        "text": "Ergänzen Sie Automation für wiederkehrende Aufgaben."
      }
    ]
  },
  "industries": {
    "eyebrow": "Branchen",
    "title": "Websites für unterschiedliche Anforderungen",
    "text": "Entdecken Sie Beispiele für branchenspezifische Websites.",
    "links": [
      {
        "label": "Websites für Gesundheitspraxen",
        "href": "/industries/healthcare/"
      },
      {
        "label": "Websites für Restaurants",
        "href": "/industries/restaurants/"
      }
    ]
  },
  "partners": {
    "eyebrow": "Partnerschaften",
    "title": "Mit Websiteli zusammenarbeiten",
    "text": "Erfahren Sie mehr über Möglichkeiten zur Zusammenarbeit.",
    "cta": "Partnerprogramm ansehen"
  },
  "faq": {
    "eyebrow": "Häufige Fragen",
    "title": "Vor Ihrem Website-Projekt",
    "items": [
      {
        "question": "Was kostet eine Website bei Websiteli?",
        "answer": "Jedes Projekt wird anhand Ihrer Anforderungen geplant. Nach einem persönlichen Gespräch erhalten Sie eine individuelle Offerte mit klaren Leistungen und Verantwortlichkeiten."
      },
      {
        "question": "Eignet sich Websiteli für kleine Unternehmen?",
        "answer": "Ja. Wir planen Websites für KMU, Kleinunternehmen und Selbstständige mit einem klar vereinbarten Umfang."
      },
      {
        "question": "Kann Websiteli meine bestehende Website betreuen?",
        "answer": "Website-Wartung ist separat verfügbar und umfasst unter anderem Updates, Monitoring und kleine Inhaltsänderungen. Den passenden Umfang klären wir gemeinsam."
      }
    ]
  },
  "finalCta": {
    "eyebrow": "Nächster Schritt",
    "title": "Was braucht Ihre Website als Nächstes?",
    "text": "Lassen Sie Ihren bestehenden Auftritt prüfen oder besprechen Sie die Anforderungen für eine neue Website.",
    "cta": "Kostenloser Website-Check"
  }
},
  hu: {
    hero: {
      eyebrow: "Weboldalak kisvállalkozásoknak",
      title: "Weboldalak, amelyek ügyfelekké alakítják a látogatókat.",
      text: "Gyors, professzionális weboldalak Svájcban - bizalomra, ajánlatkérésekre, foglalásokra és eladásokra tervezve.",
      secondary: "Több kell, mint weboldal? Automatizálást, AI-t és egyedi üzleti eszközöket is kapcsolunk hozzá.",
      priceSignal: "",
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
      priceSignal: "",
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
      priceSignal: "",
      primaryCta: "Ver trabajos",
      secondaryCta: "Análisis web y de mercado gratis",
    },
    finalCta: { ...en.finalCta, cta: "Ejecutar el análisis web y de mercado gratis" },
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
      priceSignal: "",
      primaryCta: "Voir nos réalisations",
      secondaryCta: "Lancer l’audit site & marché gratuit",
    },
    portfolio: { ...en.portfolio, viewAll: "Voir tout le portfolio", viewWebsite: "Voir le site", linkPending: "Lien du site en vérification" },
    finalCta: { ...en.finalCta, cta: "Lancer l’audit site & marché gratuit" },
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
      priceSignal: "",
      primaryCta: "Vedi i lavori",
      secondaryCta: "Avvia l’analisi gratuita sito & mercato",
    },
    portfolio: { ...en.portfolio, viewAll: "Vedi tutto il portfolio", viewWebsite: "Vedi sito", linkPending: "Link del sito in verifica" },
    finalCta: { ...en.finalCta, cta: "Avvia l’analisi gratuita sito & mercato" },
  },
  cz: {
    hero: {
      eyebrow: "Weby pro malé firmy",
      title: "Weby, které mění návštěvníky v zákazníky.",
      text: "Rychlé profesionální weby vytvořené ve Švýcarsku - pro důvěru, poptávky, rezervace a prodej.",
      secondary: "Potřebujete víc než web? Připojíme také automatizaci, AI a vlastní business nástroje.",
      priceSignal: "",
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
      priceSignal: "",
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
      priceSignal: "",
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
      priceSignal: "",
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
      priceSignal: "",
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
      priceSignal: "",
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
