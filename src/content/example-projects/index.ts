import type { LocaleCode } from "../locales";

export const exampleProjectSlugs = [
  "restaurant-visibility",
  "consultant-lead-generation",
  "ai-customer-assistant",
  "analytics-visibility",
] as const;
export type ExampleProjectSlug = (typeof exampleProjectSlugs)[number];

export type ExampleProjectContent = {
  slug: ExampleProjectSlug;
  title: string;
  businessType: string;
  badge: string;
  disclaimer: string;
  currentSituation: string[];
  potentialChallenges?: string[];
  illustrativeOpportunity: string[];
  assumptions?: string[];
  recommendedPackage: "Growth Setup" | "AI/Data Upgrade";
  relatedDemo: "restaurant" | "consultant" | "ai-assistant" | "analytics-dashboard";
};

type ExampleProjectPageContent = {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  eyebrow: string;
  title: string;
  text: string;
  labels: {
    businessType: string;
    currentSituation: string;
    potentialChallenges: string;
    illustrativeOpportunity: string;
    assumptions: string;
    recommendedPackage: string;
    relatedDemo: string;
    viewDemo: string;
    requestAudit: string;
    primaryCta: string;
    secondaryCta: string;
    learnMore: string;
  };
  packageNames: Record<ExampleProjectContent["recommendedPackage"], string>;
  items: Record<ExampleProjectSlug, ExampleProjectContent>;
};

const disclaimer =
  "This analysis is illustrative and intended to demonstrate potential opportunities. Results will vary depending on business, industry, competition, and implementation.";

const en: ExampleProjectPageContent = {
  seo: {
    title: "Example Projects and Business Opportunity Analyses - Websiteli",
    description:
      "Illustrative Websiteli project analyses for website design, digital transformation, AI automation, analytics, SEO and lead generation opportunities.",
    keywords: "website design, digital transformation, small business websites, AI automation, analytics, SEO, lead generation",
  },
  eyebrow: "Example Projects",
  title: "Business reasoning behind the demos.",
  text: "Illustrative opportunity assessments that show the type of business problems Websiteli can help solve. These are examples, not client case studies.",
  labels: {
    businessType: "Business Type",
    currentSituation: "Current Situation",
    potentialChallenges: "Potential Challenges",
    illustrativeOpportunity: "Illustrative Opportunity",
    assumptions: "Assume",
    recommendedPackage: "Recommended Package",
    relatedDemo: "Related Demo",
    viewDemo: "View Demo",
    requestAudit: "Request Audit",
    primaryCta: "Request a Free Digital Audit",
    secondaryCta: "Book a Discovery Call",
    learnMore: "Learn More",
  },
  packageNames: {
    "Growth Setup": "Growth Setup",
    "AI/Data Upgrade": "AI/Data Upgrade",
  },
  items: {
    "restaurant-visibility": {
      slug: "restaurant-visibility",
      title: "Restaurant Visibility Analysis",
      businessType: "Restaurant / Café",
      badge: "Illustrative Analysis",
      disclaimer,
      currentSituation: ["No dedicated website", "Only social media presence", "No online reservations", "No analytics tracking"],
      potentialChallenges: ["Customers may leave without contacting", "Limited visibility in search engines", "Difficult booking experience"],
      assumptions: ["2,000 profile views/month", "5% interested visitors"],
      illustrativeOpportunity: ["Easier reservations", "Improved visibility", "Improved customer experience"],
      recommendedPackage: "Growth Setup",
      relatedDemo: "restaurant",
    },
    "consultant-lead-generation": {
      slug: "consultant-lead-generation",
      title: "Consultant Lead Generation Analysis",
      businessType: "Consultant / Coach",
      badge: "Illustrative Analysis",
      disclaimer,
      currentSituation: ["LinkedIn only", "No website", "No lead capture"],
      potentialChallenges: ["Visitors disappear", "No contact funnel", "No newsletter growth"],
      illustrativeOpportunity: ["Lead capture", "Booking automation", "Professional branding"],
      recommendedPackage: "Growth Setup",
      relatedDemo: "consultant",
    },
    "ai-customer-assistant": {
      slug: "ai-customer-assistant",
      title: "AI Customer Assistant Analysis",
      businessType: "SME",
      badge: "Illustrative Analysis",
      disclaimer,
      currentSituation: ["Repetitive customer questions", "Manual support"],
      illustrativeOpportunity: ["Faster responses", "Fewer interruptions", "Lead qualification"],
      recommendedPackage: "AI/Data Upgrade",
      relatedDemo: "ai-assistant",
    },
    "analytics-visibility": {
      slug: "analytics-visibility",
      title: "Analytics Visibility Analysis",
      businessType: "Growing Company",
      badge: "Illustrative Analysis",
      disclaimer,
      currentSituation: ["Limited insight into website performance", "No conversion tracking"],
      illustrativeOpportunity: ["Understand visitor behavior", "Identify best-performing pages", "Improve marketing decisions"],
      recommendedPackage: "AI/Data Upgrade",
      relatedDemo: "analytics-dashboard",
    },
  },
};

const localized: Partial<Record<LocaleCode, Partial<ExampleProjectPageContent>>> = {
  de: {
    seo: { title: "Beispielprojekte und Chancenanalysen - Websiteli", description: "Illustrative Websiteli-Analysen für Website Design, Digitalisierung, KI-Automation, Analytics, SEO und Leadgenerierung.", keywords: en.seo.keywords },
    eyebrow: "Beispielprojekte", title: "Die Business-Logik hinter den Demos.", text: "Illustrative Chancenanalysen. Es sind Beispiele und keine Kunden-Fallstudien.",
    labels: { ...en.labels, businessType: "Unternehmenstyp", currentSituation: "Aktuelle Situation", potentialChallenges: "Mögliche Herausforderungen", illustrativeOpportunity: "Illustrative Chance", assumptions: "Annahme", recommendedPackage: "Empfohlenes Paket", relatedDemo: "Verknüpfte Demo", viewDemo: "Demo ansehen", requestAudit: "Audit anfragen", primaryCta: "Kostenlosen Digital-Audit anfragen", secondaryCta: "Discovery Call buchen", learnMore: "Mehr erfahren" },
    packageNames: { "Growth Setup": "Wachstums-Setup", "AI/Data Upgrade": "KI- und Daten-Upgrade" },
  },
  hu: {
    seo: { title: "Példaprojektek és üzleti lehetőségelemzések - Websiteli", description: "Illusztratív Websiteli elemzések weboldal-tervezéshez, digitalizációhoz, AI automatizáláshoz, analitikához, SEO-hoz és lead generáláshoz.", keywords: en.seo.keywords },
    eyebrow: "Példaprojektek", title: "Az üzleti gondolkodás a demók mögött.", text: "Illusztratív lehetőségelemzések. Ezek példák, nem ügyfél-esettanulmányok.",
    labels: { ...en.labels, businessType: "Vállalkozástípus", currentSituation: "Jelenlegi helyzet", potentialChallenges: "Lehetséges kihívások", illustrativeOpportunity: "Illusztratív lehetőség", assumptions: "Feltételezés", recommendedPackage: "Ajánlott csomag", relatedDemo: "Kapcsolódó demó", viewDemo: "Demó megtekintése", requestAudit: "Audit kérése", primaryCta: "Ingyenes digitális audit kérése", secondaryCta: "Discovery call foglalása", learnMore: "Részletek" },
    packageNames: { "Growth Setup": "Növekedési csomag", "AI/Data Upgrade": "AI/adat fejlesztés" },
  },
  pl: {
    seo: { title: "Przykładowe projekty i analizy możliwości - Websiteli", description: "Ilustracyjne analizy Websiteli dla stron, digitalizacji, AI, analityki, SEO i lead generation.", keywords: en.seo.keywords },
    eyebrow: "Przykładowe projekty", title: "Uzasadnienie biznesowe demo.", text: "Ilustracyjne analizy możliwości. To przykłady, nie case studies klientów.",
    labels: { ...en.labels, businessType: "Typ biznesu", currentSituation: "Obecna sytuacja", potentialChallenges: "Potencjalne wyzwania", illustrativeOpportunity: "Ilustracyjna możliwość", assumptions: "Założenia", recommendedPackage: "Rekomendowany pakiet", relatedDemo: "Powiązane demo", viewDemo: "Zobacz demo", requestAudit: "Poproś o audyt", primaryCta: "Poproś o bezpłatny audyt cyfrowy", secondaryCta: "Umów rozmowę discovery", learnMore: "Dowiedz się więcej" },
    packageNames: { "Growth Setup": "Pakiet wzrostu", "AI/Data Upgrade": "Rozbudowa AI i danych" },
  },
  es: {
    seo: { title: "Proyectos ejemplo y análisis de oportunidad - Websiteli", description: "Análisis ilustrativos de Websiteli para webs, transformación digital, IA, analítica, SEO y leads.", keywords: en.seo.keywords },
    eyebrow: "Proyectos ejemplo", title: "La lógica de negocio detrás de las demos.", text: "Evaluaciones ilustrativas de oportunidad. Son ejemplos, no casos reales de clientes.",
    labels: { ...en.labels, businessType: "Tipo de negocio", currentSituation: "Situación actual", potentialChallenges: "Retos potenciales", illustrativeOpportunity: "Oportunidad ilustrativa", assumptions: "Supuestos", recommendedPackage: "Paquete recomendado", relatedDemo: "Demo relacionada", viewDemo: "Ver demo", requestAudit: "Solicitar auditoría", primaryCta: "Solicitar auditoría digital gratuita", secondaryCta: "Reservar llamada discovery", learnMore: "Saber más" },
    packageNames: { "Growth Setup": "Configuración de crecimiento", "AI/Data Upgrade": "Mejora de IA y datos" },
  },
  fr: {
    seo: { title: "Projets exemples et analyses d'opportunité - Websiteli", description: "Analyses illustratives Websiteli pour sites, transformation digitale, IA, analytics, SEO et leads.", keywords: en.seo.keywords },
    eyebrow: "Projets exemples", title: "La logique métier derrière les démos.", text: "Analyses d'opportunité illustratives. Ce sont des exemples, pas des cas clients.",
    labels: { ...en.labels, businessType: "Type d'activité", currentSituation: "Situation actuelle", potentialChallenges: "Défis potentiels", illustrativeOpportunity: "Opportunité illustrative", assumptions: "Hypothèses", recommendedPackage: "Offre recommandée", relatedDemo: "Démo liée", viewDemo: "Voir la démo", requestAudit: "Demander un audit", primaryCta: "Demander un audit digital gratuit", secondaryCta: "Réserver un appel découverte", learnMore: "En savoir plus" },
    packageNames: { "Growth Setup": "Configuration croissance", "AI/Data Upgrade": "Amélioration IA et données" },
  },
  it: {
    seo: { title: "Progetti esempio e analisi opportunità - Websiteli", description: "Analisi illustrative Websiteli per siti, trasformazione digitale, AI, analytics, SEO e lead.", keywords: en.seo.keywords },
    eyebrow: "Progetti esempio", title: "La logica business dietro le demo.", text: "Valutazioni illustrative di opportunità. Sono esempi, non case study clienti.",
    labels: { ...en.labels, businessType: "Tipo di attività", currentSituation: "Situazione attuale", potentialChallenges: "Sfide potenziali", illustrativeOpportunity: "Opportunità illustrativa", assumptions: "Ipotesi", recommendedPackage: "Pacchetto consigliato", relatedDemo: "Demo collegata", viewDemo: "Vedi demo", requestAudit: "Richiedi audit", primaryCta: "Richiedi audit digitale gratuito", secondaryCta: "Prenota una discovery call", learnMore: "Scopri di più" },
    packageNames: { "Growth Setup": "Pacchetto crescita", "AI/Data Upgrade": "Upgrade AI e dati" },
  },
  cs: {
    seo: { title: "Ukázkové projekty a analýzy příležitostí - Websiteli", description: "Ilustrativní analýzy Websiteli pro weby, digitalizaci, AI, analytiku, SEO a leady.", keywords: en.seo.keywords },
    eyebrow: "Ukázkové projekty", title: "Business logika za demy.", text: "Ilustrativní posouzení příležitostí. Jsou to příklady, ne případové studie klientů.",
    labels: { ...en.labels, businessType: "Typ podnikání", currentSituation: "Aktuální situace", potentialChallenges: "Možné výzvy", illustrativeOpportunity: "Ilustrativní příležitost", assumptions: "Předpoklady", recommendedPackage: "Doporučený balíček", relatedDemo: "Související demo", viewDemo: "Zobrazit demo", requestAudit: "Požádat o audit", primaryCta: "Požádat o bezplatný digitální audit", secondaryCta: "Rezervovat discovery call", learnMore: "Zjistit více" },
    packageNames: { "Growth Setup": "Růstový balíček", "AI/Data Upgrade": "AI a datové rozšíření" },
  },
  pt: {
    seo: { title: "Projetos exemplo e análises de oportunidade - Websiteli", description: "Análises ilustrativas Websiteli para sites, transformação digital, AI, analytics, SEO e leads.", keywords: en.seo.keywords },
    eyebrow: "Projetos exemplo", title: "A lógica de negócio por trás das demos.", text: "Avaliações ilustrativas de oportunidade. São exemplos, não estudos de caso de clientes.",
    labels: { ...en.labels, businessType: "Tipo de negócio", currentSituation: "Situação atual", potentialChallenges: "Desafios potenciais", illustrativeOpportunity: "Oportunidade ilustrativa", assumptions: "Premissas", recommendedPackage: "Pacote recomendado", relatedDemo: "Demo relacionada", viewDemo: "Ver demo", requestAudit: "Pedir auditoria", primaryCta: "Pedir auditoria digital gratuita", secondaryCta: "Marcar discovery call", learnMore: "Saber mais" },
    packageNames: { "Growth Setup": "Pacote de crescimento", "AI/Data Upgrade": "Upgrade de IA e dados" },
  },
  da: {
    seo: { title: "Eksempelprojekter og mulighedsanalyser - Websiteli", description: "Illustrative Websiteli-analyser for websites, digital transformation, AI, analytics, SEO og leads.", keywords: en.seo.keywords },
    eyebrow: "Eksempelprojekter", title: "Forretningslogikken bag demoerne.", text: "Illustrative mulighedsvurderinger. Det er eksempler, ikke kundecases.",
    labels: { ...en.labels, businessType: "Virksomhedstype", currentSituation: "Nuværende situation", potentialChallenges: "Mulige udfordringer", illustrativeOpportunity: "Illustrativ mulighed", assumptions: "Antagelser", recommendedPackage: "Anbefalet pakke", relatedDemo: "Relateret demo", viewDemo: "Se demo", requestAudit: "Anmod om audit", primaryCta: "Anmod om gratis digital audit", secondaryCta: "Book discovery call", learnMore: "Læs mere" },
    packageNames: { "Growth Setup": "Vækstpakke", "AI/Data Upgrade": "AI- og dataopgradering" },
  },
  nl: {
    seo: { title: "Voorbeeldprojecten en kansanalyses - Websiteli", description: "Illustratieve Websiteli-analyses voor websites, digitale transformatie, AI, analytics, SEO en leads.", keywords: en.seo.keywords },
    eyebrow: "Voorbeeldprojecten", title: "De zakelijke logica achter de demo's.", text: "Illustratieve kansanalyses. Dit zijn voorbeelden, geen klantcases.",
    labels: { ...en.labels, businessType: "Bedrijfstype", currentSituation: "Huidige situatie", potentialChallenges: "Mogelijke uitdagingen", illustrativeOpportunity: "Illustratieve kans", assumptions: "Aannames", recommendedPackage: "Aanbevolen pakket", relatedDemo: "Gerelateerde demo", viewDemo: "Bekijk demo", requestAudit: "Vraag audit aan", primaryCta: "Vraag een gratis digitale audit aan", secondaryCta: "Boek een discovery call", learnMore: "Meer informatie" },
    packageNames: { "Growth Setup": "Groeipakket", "AI/Data Upgrade": "AI- en data-upgrade" },
  },
  ja: {
    seo: { title: "プロジェクト例と機会分析 - Websiteli", description: "Webサイト、デジタル変革、AI自動化、分析、SEO、リード獲得のWebsiteliによる例示的な分析。", keywords: en.seo.keywords },
    eyebrow: "プロジェクト例", title: "デモの背景にあるビジネス視点。", text: "機会を示すための例示的な評価です。実際の顧客事例ではありません。",
    labels: { ...en.labels, businessType: "事業タイプ", currentSituation: "現在の状況", potentialChallenges: "想定される課題", illustrativeOpportunity: "例示的な機会", assumptions: "仮定", recommendedPackage: "推奨パッケージ", relatedDemo: "関連デモ", viewDemo: "デモを見る", requestAudit: "監査を依頼", primaryCta: "無料デジタル監査を依頼", secondaryCta: "ディスカバリーコールを予約", learnMore: "詳しく見る" },
    packageNames: { "Growth Setup": "成長支援パッケージ", "AI/Data Upgrade": "AI・データ強化" },
  },
};

export function getExampleProjectPageContent(locale: LocaleCode): ExampleProjectPageContent {
  const copy = localized[locale] ?? {};
  return {
    ...en,
    ...copy,
    seo: { ...en.seo, ...copy.seo },
    labels: { ...en.labels, ...copy.labels },
    packageNames: { ...en.packageNames, ...copy.packageNames },
    items: en.items,
  };
}

export function getExampleProject(locale: LocaleCode, slug: ExampleProjectSlug) {
  return getExampleProjectPageContent(locale).items[slug];
}
