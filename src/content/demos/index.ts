import type { LocaleCode } from "../locales";

export const demoSlugs = ["restaurant", "consultant", "local-service", "ai-assistant", "analytics-dashboard"] as const;
export type DemoSlug = (typeof demoSlugs)[number];

export type DemoContent = {
  slug: DemoSlug;
  type: string;
  title: string;
  shortDescription: string;
  recommendedPackage: "Growth Setup" | "AI/Data Upgrade";
  features: string[];
  forText: string;
  challenges: string[];
  included: string[];
  whyItMatters: string;
  relatedProject: "restaurant-visibility" | "consultant-lead-generation" | "ai-customer-assistant" | "analytics-visibility";
};

type DemoPageContent = {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  eyebrow: string;
  title: string;
  text: string;
  labels: {
    recommendedPackage: string;
    features: string;
    learnMore: string;
    for: string;
    commonChallenges: string;
    included: string;
    businessImpact: string;
    viewLiveDemo: string;
    requestSimilar: string;
    viewAnalysis: string;
    primaryCta: string;
    secondaryCta: string;
  };
  packageNames: Record<DemoContent["recommendedPackage"], string>;
  items: Record<DemoSlug, DemoContent>;
};

const en: DemoPageContent = {
  seo: {
    title: "Website Demos and AI Automation Examples - Websiteli",
    description:
      "Explore Websiteli demos for small business websites, AI automation, analytics dashboards, SEO, lead generation, and digital transformation.",
    keywords: "website design, digital transformation, small business websites, AI automation, analytics, SEO, lead generation",
  },
  eyebrow: "Demos",
  title: "See what Websiteli can build.",
  text: "Practical demo concepts for websites, automation, analytics and lead generation. Each demo connects to an illustrative business opportunity analysis.",
  labels: {
    recommendedPackage: "Recommended Package",
    features: "Technologies and features",
    learnMore: "Learn More",
    for: "For",
    commonChallenges: "Common Challenges",
    included: "Included",
    businessImpact: "Business Impact",
    viewLiveDemo: "View Live Demo",
    requestSimilar: "Request Similar Website",
    viewAnalysis: "View Opportunity Analysis",
    primaryCta: "Request a Free Digital Audit",
    secondaryCta: "Book a Discovery Call",
  },
  packageNames: {
    "Growth Setup": "Growth Setup",
    "AI/Data Upgrade": "AI/Data Upgrade",
  },
  items: {
    restaurant: {
      slug: "restaurant",
      type: "restaurant",
      title: "Restaurant / Café Website",
      shortDescription:
        "Modern restaurant website with online reservations, SEO optimization, analytics, reviews, maps and contact forms.",
      recommendedPackage: "Growth Setup",
      features: ["Responsive website", "Online reservation flow", "Menu sections", "Reviews", "Maps", "Analytics", "SEO setup"],
      forText: "Restaurants, cafés, bakeries and local food businesses.",
      challenges: ["Customers cannot book online", "Menu is hard to find", "Poor mobile experience", "Weak search visibility"],
      included: ["Responsive website", "Booking integration", "Contact forms", "Google Analytics", "Search Console", "Review section", "Maps integration"],
      whyItMatters: "A professional website can improve visibility and make reservations easier for customers.",
      relatedProject: "restaurant-visibility",
    },
    consultant: {
      slug: "consultant",
      type: "consultant",
      title: "Consultant / Coach Website",
      shortDescription:
        "Professional service website with positioning, booking, lead capture, newsletter signup, analytics and SEO foundations.",
      recommendedPackage: "Growth Setup",
      features: ["Service pages", "Booking flow", "Lead capture", "Newsletter signup", "Analytics", "SEO setup"],
      forText: "Consultants, coaches, advisors and independent professional service providers.",
      challenges: ["LinkedIn traffic does not convert", "No owned contact funnel", "Booking requires manual messages", "Expertise is hard to evaluate quickly"],
      included: ["Responsive website", "Offer pages", "Booking integration", "Lead-capture form", "Newsletter setup", "Google Analytics", "Search Console"],
      whyItMatters: "A focused website can turn interest into booked calls and make the offer easier to understand.",
      relatedProject: "consultant-lead-generation",
    },
    "local-service": {
      slug: "local-service",
      type: "local_service",
      title: "Local Service Business Website",
      shortDescription:
        "Local business website with service areas, quote requests, trust signals, Google Business support, SEO and conversion tracking.",
      recommendedPackage: "Growth Setup",
      features: ["Service pages", "Quote forms", "Service areas", "Trust sections", "Maps", "Analytics", "Local SEO"],
      forText: "Trades, repair services, beauty studios, wellness providers and other local service businesses.",
      challenges: ["Customers cannot quickly request a quote", "Service areas are unclear", "Trust signals are scattered", "Local SEO is weak"],
      included: ["Responsive website", "Service area pages", "Quote request form", "Google Business Profile support", "Reviews", "Maps", "Conversion tracking"],
      whyItMatters: "A local service website can make it easier for nearby customers to understand, trust and contact the business.",
      relatedProject: "restaurant-visibility",
    },
    "ai-assistant": {
      slug: "ai-assistant",
      type: "ai_assistant",
      title: "AI Customer Assistant",
      shortDescription:
        "AI assistant demo for repeated customer questions, lead qualification, FAQ search, contact handoff and simple support automation.",
      recommendedPackage: "AI/Data Upgrade",
      features: ["FAQ assistant", "Lead qualification", "Contact handoff", "Knowledge base", "Conversation tracking"],
      forText: "SMEs that answer repeated questions and want a faster first response for customers.",
      challenges: ["Repetitive questions interrupt daily work", "Leads arrive without enough context", "Customers wait for basic answers", "Support knowledge is not centralized"],
      included: ["Customer assistant", "FAQ knowledge base", "Lead qualification prompts", "Contact handoff", "Conversation analytics", "Basic workflow automation"],
      whyItMatters: "An AI assistant can reduce repetitive interruptions and help qualify inquiries before a human follows up.",
      relatedProject: "ai-customer-assistant",
    },
    "analytics-dashboard": {
      slug: "analytics-dashboard",
      type: "analytics_dashboard",
      title: "Analytics Dashboard",
      shortDescription:
        "Dashboard demo for website performance, conversion tracking, best pages, inquiry sources, marketing insights and reporting.",
      recommendedPackage: "AI/Data Upgrade",
      features: ["Traffic overview", "Conversion tracking", "Page insights", "Inquiry sources", "Reports", "Marketing decisions"],
      forText: "Growing companies that need clearer insight into website and marketing performance.",
      challenges: ["Website activity is hard to interpret", "No conversion tracking", "Best-performing pages are unknown", "Marketing decisions rely on guesswork"],
      included: ["Analytics dashboard", "Conversion events", "Source tracking", "Page performance view", "Monthly reporting structure", "Decision-focused metrics"],
      whyItMatters: "A dashboard can make website performance visible and help prioritize better marketing decisions.",
      relatedProject: "analytics-visibility",
    },
  },
};

const localized: Partial<Record<LocaleCode, Partial<DemoPageContent>>> = {
  de: {
    seo: { title: "Website-Demos und KI-Automation - Websiteli", description: "Websiteli-Demos für KMU-Websites, KI-Automation, Analytics, SEO und Leadgenerierung.", keywords: en.seo.keywords },
    eyebrow: "Demos",
    title: "Sehen Sie, was Websiteli bauen kann.",
    text: "Praktische Demo-Konzepte für Websites, Automation, Analytics und Leadgenerierung.",
    labels: { ...en.labels, recommendedPackage: "Empfohlenes Paket", features: "Technologien und Funktionen", learnMore: "Mehr erfahren", for: "Für", commonChallenges: "Typische Herausforderungen", included: "Enthalten", businessImpact: "Geschäftlicher Nutzen", viewLiveDemo: "Live-Demo ansehen", requestSimilar: "Ähnliche Website anfragen", viewAnalysis: "Chancenanalyse ansehen", primaryCta: "Kostenlosen Digital-Audit anfragen", secondaryCta: "Discovery Call buchen" },
    packageNames: { "Growth Setup": "Wachstums-Setup", "AI/Data Upgrade": "KI- und Daten-Upgrade" },
  },
  hu: {
    seo: { title: "Weboldal demók és AI automatizálási példák - Websiteli", description: "Websiteli demók kisvállalati weboldalakhoz, AI automatizáláshoz, analitikához, SEO-hoz és lead generáláshoz.", keywords: en.seo.keywords },
    eyebrow: "Demók",
    title: "Nézd meg, mit tud építeni a Websiteli.",
    text: "Gyakorlati demók weboldalakhoz, automatizáláshoz, analitikához és érdeklődőszerzéshez.",
    labels: { ...en.labels, recommendedPackage: "Ajánlott csomag", features: "Technológiák és funkciók", learnMore: "Részletek", for: "Kinek szól", commonChallenges: "Gyakori kihívások", included: "Tartalmazza", businessImpact: "Üzleti hatás", viewLiveDemo: "Élő demó megnyitása", requestSimilar: "Hasonló weboldalt kérek", viewAnalysis: "Lehetőségelemzés megtekintése", primaryCta: "Ingyenes digitális audit kérése", secondaryCta: "Discovery call foglalása" },
    packageNames: { "Growth Setup": "Növekedési csomag", "AI/Data Upgrade": "AI/adat fejlesztés" },
  },
  pl: {
    seo: { title: "Dema stron i automatyzacji AI - Websiteli", description: "Dema Websiteli dla stron małych firm, automatyzacji AI, analityki, SEO i lead generation.", keywords: en.seo.keywords },
    eyebrow: "Demo", title: "Zobacz, co Websiteli może zbudować.", text: "Praktyczne dema stron, automatyzacji, analityki i pozyskiwania leadów.",
    labels: { ...en.labels, recommendedPackage: "Rekomendowany pakiet", features: "Technologie i funkcje", learnMore: "Dowiedz się więcej", for: "Dla kogo", commonChallenges: "Typowe wyzwania", included: "W pakiecie", businessImpact: "Wpływ biznesowy", viewLiveDemo: "Zobacz live demo", requestSimilar: "Poproś o podobną stronę", viewAnalysis: "Zobacz analizę możliwości", primaryCta: "Poproś o bezpłatny audyt cyfrowy", secondaryCta: "Umów rozmowę discovery" },
    packageNames: { "Growth Setup": "Pakiet wzrostu", "AI/Data Upgrade": "Rozbudowa AI i danych" },
  },
  es: {
    seo: { title: "Demos web y automatización IA - Websiteli", description: "Demos de Websiteli para webs de pequeñas empresas, automatización IA, analítica, SEO y generación de leads.", keywords: en.seo.keywords },
    eyebrow: "Demos", title: "Mira lo que Websiteli puede crear.", text: "Conceptos demo para webs, automatización, analítica y generación de leads.",
    labels: { ...en.labels, recommendedPackage: "Paquete recomendado", features: "Tecnologías y funciones", learnMore: "Saber más", for: "Para", commonChallenges: "Retos comunes", included: "Incluido", businessImpact: "Impacto empresarial", viewLiveDemo: "Ver demo en vivo", requestSimilar: "Solicitar una web similar", viewAnalysis: "Ver análisis de oportunidad", primaryCta: "Solicitar auditoría digital gratuita", secondaryCta: "Reservar llamada discovery" },
    packageNames: { "Growth Setup": "Configuración de crecimiento", "AI/Data Upgrade": "Mejora de IA y datos" },
  },
  fr: {
    seo: { title: "Démos de sites et automatisation IA - Websiteli", description: "Démos Websiteli pour sites de PME, automatisation IA, analytics, SEO et génération de leads.", keywords: en.seo.keywords },
    eyebrow: "Démos", title: "Voyez ce que Websiteli peut construire.", text: "Concepts démo pour sites, automatisation, analytics et génération de leads.",
    labels: { ...en.labels, recommendedPackage: "Offre recommandée", features: "Technologies et fonctions", learnMore: "En savoir plus", for: "Pour", commonChallenges: "Défis fréquents", included: "Inclus", businessImpact: "Impact métier", viewLiveDemo: "Voir la démo live", requestSimilar: "Demander un site similaire", viewAnalysis: "Voir l'analyse d'opportunité", primaryCta: "Demander un audit digital gratuit", secondaryCta: "Réserver un appel découverte" },
    packageNames: { "Growth Setup": "Configuration croissance", "AI/Data Upgrade": "Amélioration IA et données" },
  },
  it: {
    seo: { title: "Demo siti web e automazione AI - Websiteli", description: "Demo Websiteli per siti di piccole imprese, automazione AI, analytics, SEO e lead generation.", keywords: en.seo.keywords },
    eyebrow: "Demo", title: "Scopri cosa può costruire Websiteli.", text: "Concept demo per siti, automazione, analytics e generazione di lead.",
    labels: { ...en.labels, recommendedPackage: "Pacchetto consigliato", features: "Tecnologie e funzionalità", learnMore: "Scopri di più", for: "Per", commonChallenges: "Sfide comuni", included: "Incluso", businessImpact: "Impatto business", viewLiveDemo: "Apri demo live", requestSimilar: "Richiedi un sito simile", viewAnalysis: "Vedi analisi opportunità", primaryCta: "Richiedi audit digitale gratuito", secondaryCta: "Prenota una discovery call" },
    packageNames: { "Growth Setup": "Pacchetto crescita", "AI/Data Upgrade": "Upgrade AI e dati" },
  },
  cs: {
    seo: { title: "Dema webů a AI automatizace - Websiteli", description: "Dema Websiteli pro weby malých firem, AI automatizaci, analytiku, SEO a získávání leadů.", keywords: en.seo.keywords },
    eyebrow: "Dema", title: "Podívejte se, co Websiteli umí vytvořit.", text: "Praktická dema webů, automatizace, analytiky a získávání poptávek.",
    labels: { ...en.labels, recommendedPackage: "Doporučený balíček", features: "Technologie a funkce", learnMore: "Zjistit více", for: "Pro koho", commonChallenges: "Typické výzvy", included: "Součástí", businessImpact: "Business dopad", viewLiveDemo: "Zobrazit live demo", requestSimilar: "Poptat podobný web", viewAnalysis: "Zobrazit analýzu příležitosti", primaryCta: "Požádat o bezplatný digitální audit", secondaryCta: "Rezervovat discovery call" },
    packageNames: { "Growth Setup": "Růstový balíček", "AI/Data Upgrade": "AI a datové rozšíření" },
  },
  pt: {
    seo: { title: "Demos de sites e automação AI - Websiteli", description: "Demos Websiteli para sites de pequenas empresas, automação AI, analytics, SEO e geração de leads.", keywords: en.seo.keywords },
    eyebrow: "Demos", title: "Veja o que a Websiteli pode criar.", text: "Conceitos demo para sites, automação, analytics e geração de leads.",
    labels: { ...en.labels, recommendedPackage: "Pacote recomendado", features: "Tecnologias e funcionalidades", learnMore: "Saber mais", for: "Para", commonChallenges: "Desafios comuns", included: "Incluído", businessImpact: "Impacto no negócio", viewLiveDemo: "Ver demo ao vivo", requestSimilar: "Pedir site semelhante", viewAnalysis: "Ver análise de oportunidade", primaryCta: "Pedir auditoria digital gratuita", secondaryCta: "Marcar discovery call" },
    packageNames: { "Growth Setup": "Pacote de crescimento", "AI/Data Upgrade": "Upgrade de IA e dados" },
  },
  da: {
    seo: { title: "Website-demoer og AI-automatisering - Websiteli", description: "Websiteli-demoer til små virksomheders websites, AI-automatisering, analytics, SEO og leadgenerering.", keywords: en.seo.keywords },
    eyebrow: "Demoer", title: "Se hvad Websiteli kan bygge.", text: "Praktiske demoer til websites, automatisering, analytics og leadgenerering.",
    labels: { ...en.labels, recommendedPackage: "Anbefalet pakke", features: "Teknologier og funktioner", learnMore: "Læs mere", for: "For", commonChallenges: "Typiske udfordringer", included: "Inkluderet", businessImpact: "Forretningsværdi", viewLiveDemo: "Se live demo", requestSimilar: "Anmod om lignende website", viewAnalysis: "Se mulighedsanalyse", primaryCta: "Anmod om gratis digital audit", secondaryCta: "Book discovery call" },
    packageNames: { "Growth Setup": "Vækstpakke", "AI/Data Upgrade": "AI- og dataopgradering" },
  },
  nl: {
    seo: { title: "Website-demo's en AI-automatisering - Websiteli", description: "Websiteli-demo's voor websites van kleine bedrijven, AI-automatisering, analytics, SEO en leadgeneratie.", keywords: en.seo.keywords },
    eyebrow: "Demo's", title: "Bekijk wat Websiteli kan bouwen.", text: "Praktische demo's voor websites, automatisering, analytics en leadgeneratie.",
    labels: { ...en.labels, recommendedPackage: "Aanbevolen pakket", features: "Technologieën en functies", learnMore: "Meer informatie", for: "Voor", commonChallenges: "Veelvoorkomende uitdagingen", included: "Inbegrepen", businessImpact: "Zakelijke impact", viewLiveDemo: "Bekijk live demo", requestSimilar: "Vraag vergelijkbare website aan", viewAnalysis: "Bekijk kansenanalyse", primaryCta: "Vraag een gratis digitale audit aan", secondaryCta: "Boek een discovery call" },
    packageNames: { "Growth Setup": "Groeipakket", "AI/Data Upgrade": "AI- en data-upgrade" },
  },
  ja: {
    seo: { title: "WebサイトデモとAI自動化例 - Websiteli", description: "小規模ビジネス向けWebサイト、AI自動化、分析、SEO、リード獲得のWebsiteliデモ。", keywords: en.seo.keywords },
    eyebrow: "デモ", title: "Websiteliで構築できるもの。", text: "Webサイト、自動化、分析、リード獲得の実用的なデモです。",
    labels: { ...en.labels, recommendedPackage: "推奨パッケージ", features: "技術と機能", learnMore: "詳しく見る", for: "対象", commonChallenges: "よくある課題", included: "含まれる内容", businessImpact: "ビジネス効果", viewLiveDemo: "ライブデモを見る", requestSimilar: "同様のサイトを相談する", viewAnalysis: "機会分析を見る", primaryCta: "無料デジタル監査を依頼", secondaryCta: "ディスカバリーコールを予約" },
    packageNames: { "Growth Setup": "成長支援パッケージ", "AI/Data Upgrade": "AI・データ強化" },
  },
};

const termTranslations: Partial<Record<LocaleCode, Record<string, string>>> = {
  de: {
    "Responsive website": "Responsive Website",
    "Online reservation flow": "Online-Reservierungsablauf",
    "Menu sections": "Menübereiche",
    Reviews: "Bewertungen",
    Maps: "Karten",
    Analytics: "Analytics",
    "SEO setup": "SEO-Einrichtung",
    "Booking integration": "Buchungsintegration",
    "Contact forms": "Kontaktformulare",
  },
  hu: {
    "Responsive website": "Reszponzív weboldal",
    "Online reservation flow": "Online foglalási folyamat",
    "Menu sections": "Menü szekciók",
    Reviews: "Értékelések",
    Maps: "Térkép",
    Analytics: "Analitika",
    "SEO setup": "SEO beállítás",
    "Booking integration": "Foglalási integráció",
    "Contact forms": "Kapcsolati űrlapok",
  },
  pl: {
    "Responsive website": "Responsywna strona",
    "Online reservation flow": "Proces rezerwacji online",
    "Menu sections": "Sekcje menu",
    Reviews: "Opinie",
    Maps: "Mapy",
    Analytics: "Analityka",
    "SEO setup": "Konfiguracja SEO",
    "Booking integration": "Integracja rezerwacji",
    "Contact forms": "Formularze kontaktowe",
  },
  es: {
    "Responsive website": "Web responsive",
    "Online reservation flow": "Flujo de reservas online",
    "Menu sections": "Secciones de menú",
    Reviews: "Reseñas",
    Maps: "Mapas",
    Analytics: "Analítica",
    "SEO setup": "Configuración SEO",
    "Booking integration": "Integración de reservas",
    "Contact forms": "Formularios de contacto",
  },
  fr: {
    "Responsive website": "Site responsive",
    "Online reservation flow": "Parcours de réservation en ligne",
    "Menu sections": "Sections menu",
    Reviews: "Avis",
    Maps: "Cartes",
    Analytics: "Analytics",
    "SEO setup": "Configuration SEO",
    "Booking integration": "Intégration réservation",
    "Contact forms": "Formulaires de contact",
  },
  it: {
    "Responsive website": "Sito responsive",
    "Online reservation flow": "Flusso prenotazioni online",
    "Menu sections": "Sezioni menù",
    Reviews: "Recensioni",
    Maps: "Mappe",
    Analytics: "Analytics",
    "SEO setup": "Configurazione SEO",
    "Booking integration": "Integrazione prenotazioni",
    "Contact forms": "Moduli di contatto",
  },
  cs: {
    "Responsive website": "Responzivní web",
    "Online reservation flow": "Online rezervační proces",
    "Menu sections": "Sekce menu",
    Reviews: "Recenze",
    Maps: "Mapy",
    Analytics: "Analytika",
    "SEO setup": "Nastavení SEO",
    "Booking integration": "Integrace rezervací",
    "Contact forms": "Kontaktní formuláře",
  },
  pt: {
    "Responsive website": "Site responsivo",
    "Online reservation flow": "Fluxo de reservas online",
    "Menu sections": "Secções de menu",
    Reviews: "Avaliações",
    Maps: "Mapas",
    Analytics: "Analytics",
    "SEO setup": "Configuração SEO",
    "Booking integration": "Integração de reservas",
    "Contact forms": "Formulários de contacto",
  },
  da: {
    "Responsive website": "Responsivt website",
    "Online reservation flow": "Online reservationsflow",
    "Menu sections": "Menusektioner",
    Reviews: "Anmeldelser",
    Maps: "Kort",
    Analytics: "Analytics",
    "SEO setup": "SEO-opsætning",
    "Booking integration": "Bookingintegration",
    "Contact forms": "Kontaktformularer",
  },
  nl: {
    "Responsive website": "Responsieve website",
    "Online reservation flow": "Online reserveringsflow",
    "Menu sections": "Menusecties",
    Reviews: "Reviews",
    Maps: "Kaarten",
    Analytics: "Analytics",
    "SEO setup": "SEO-instelling",
    "Booking integration": "Boekingsintegratie",
    "Contact forms": "Contactformulieren",
  },
  ja: {
    "Responsive website": "レスポンシブWebサイト",
    "Online reservation flow": "オンライン予約導線",
    "Menu sections": "メニューセクション",
    Reviews: "レビュー",
    Maps: "地図",
    Analytics: "分析",
    "SEO setup": "SEO設定",
    "Booking integration": "予約連携",
    "Contact forms": "問い合わせフォーム",
  },
};

function translateTerms(locale: LocaleCode, values: string[]) {
  const translations = termTranslations[locale] ?? {};
  return values.map((value) => translations[value] ?? value);
}

export function getDemoPageContent(locale: LocaleCode): DemoPageContent {
  const copy = localized[locale] ?? {};
  return {
    ...en,
    ...copy,
    seo: { ...en.seo, ...copy.seo },
    labels: { ...en.labels, ...copy.labels },
    packageNames: { ...en.packageNames, ...copy.packageNames },
    items: Object.fromEntries(
      Object.entries(en.items).map(([slug, item]) => [
        slug,
        {
          ...item,
          features: translateTerms(locale, item.features),
          included: translateTerms(locale, item.included),
        },
      ]),
    ) as Record<DemoSlug, DemoContent>,
  };
}

export function getDemo(locale: LocaleCode, slug: DemoSlug) {
  return getDemoPageContent(locale).items[slug];
}
