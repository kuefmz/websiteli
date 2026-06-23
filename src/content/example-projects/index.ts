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

type LocalizedExampleProjectPageContent = Partial<Omit<ExampleProjectPageContent, "items">> & {
  items?: Partial<Record<ExampleProjectSlug, Partial<ExampleProjectContent>>>;
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

const localized: Partial<Record<LocaleCode, LocalizedExampleProjectPageContent>> = {
  de: {
    seo: { title: "Beispielprojekte und Chancenanalysen - Websiteli", description: "Illustrative Websiteli-Analysen für Website Design, Digitalisierung, KI-Automation, Analytics, SEO und Leadgenerierung.", keywords: en.seo.keywords },
    eyebrow: "Beispielprojekte", title: "Die Business-Logik hinter den Demos.", text: "Illustrative Chancenanalysen. Es sind Beispiele und keine Kunden-Fallstudien.",
    labels: { ...en.labels, businessType: "Unternehmenstyp", currentSituation: "Aktuelle Situation", potentialChallenges: "Mögliche Herausforderungen", illustrativeOpportunity: "Illustrative Chance", assumptions: "Annahme", recommendedPackage: "Empfohlenes Paket", relatedDemo: "Verknüpfte Demo", viewDemo: "Demo ansehen", requestAudit: "Audit anfragen", primaryCta: "Kostenlosen Digital-Audit anfragen", secondaryCta: "Discovery Call buchen", learnMore: "Mehr erfahren" },
    packageNames: { "Growth Setup": "Wachstums-Setup", "AI/Data Upgrade": "KI- und Daten-Upgrade" },
    items: {
      "restaurant-visibility": { title: "Analyse der Restaurant-Sichtbarkeit", businessType: "Restaurant / Café", badge: "Illustrative Analyse", disclaimer: "Diese Analyse ist illustrativ und zeigt mögliche Chancen. Ergebnisse hängen von Unternehmen, Branche, Wettbewerb und Umsetzung ab.", currentSituation: ["Keine eigene Website", "Nur Social-Media-Präsenz", "Keine Online-Reservierungen", "Kein Analytics-Tracking"], potentialChallenges: ["Kunden springen ab, bevor sie Kontakt aufnehmen", "Begrenzte Sichtbarkeit in Suchmaschinen", "Umständlicher Buchungsprozess"], assumptions: ["2.000 Profilaufrufe pro Monat", "5% interessierte Besucher"], illustrativeOpportunity: ["Einfachere Reservierungen", "Bessere Sichtbarkeit", "Bessere Kundenerfahrung"] },
      "consultant-lead-generation": { title: "Analyse zur Leadgenerierung für Berater", businessType: "Berater / Coach", badge: "Illustrative Analyse", disclaimer: "Diese Analyse ist illustrativ und zeigt mögliche Chancen. Ergebnisse hängen von Unternehmen, Branche, Wettbewerb und Umsetzung ab.", currentSituation: ["Nur LinkedIn", "Keine Website", "Keine Lead-Erfassung"], potentialChallenges: ["Besucher verschwinden wieder", "Kein Kontakt-Funnel", "Kein Newsletter-Wachstum"], illustrativeOpportunity: ["Lead-Erfassung", "Automatisierte Terminbuchung", "Professioneller Markenauftritt"] },
      "ai-customer-assistant": { title: "Analyse für einen KI-Kundenassistenten", businessType: "KMU", badge: "Illustrative Analyse", disclaimer: "Diese Analyse ist illustrativ und zeigt mögliche Chancen. Ergebnisse hängen von Unternehmen, Branche, Wettbewerb und Umsetzung ab.", currentSituation: ["Wiederkehrende Kundenfragen", "Manueller Support"], illustrativeOpportunity: ["Schnellere Antworten", "Weniger Unterbrechungen", "Lead-Qualifizierung"] },
      "analytics-visibility": { title: "Analyse der Analytics-Sichtbarkeit", businessType: "Wachsendes Unternehmen", badge: "Illustrative Analyse", disclaimer: "Diese Analyse ist illustrativ und zeigt mögliche Chancen. Ergebnisse hängen von Unternehmen, Branche, Wettbewerb und Umsetzung ab.", currentSituation: ["Begrenzter Einblick in die Website-Performance", "Kein Conversion-Tracking"], illustrativeOpportunity: ["Besucherverhalten verstehen", "Beste Seiten erkennen", "Marketingentscheidungen verbessern"] },
    },
  },
  hu: {
    seo: { title: "Példaprojektek és üzleti lehetőségelemzések - Websiteli", description: "Illusztratív Websiteli elemzések weboldal-tervezéshez, digitalizációhoz, AI automatizáláshoz, analitikához, SEO-hoz és lead generáláshoz.", keywords: en.seo.keywords },
    eyebrow: "Példaprojektek", title: "Az üzleti gondolkodás a demók mögött.", text: "Illusztratív lehetőségelemzések. Ezek példák, nem ügyfél-esettanulmányok.",
    labels: { ...en.labels, businessType: "Vállalkozástípus", currentSituation: "Jelenlegi helyzet", potentialChallenges: "Lehetséges kihívások", illustrativeOpportunity: "Illusztratív lehetőség", assumptions: "Feltételezés", recommendedPackage: "Ajánlott csomag", relatedDemo: "Kapcsolódó demó", viewDemo: "Demó megtekintése", requestAudit: "Audit kérése", primaryCta: "Ingyenes digitális audit kérése", secondaryCta: "Discovery call foglalása", learnMore: "Részletek" },
    packageNames: { "Growth Setup": "Növekedési csomag", "AI/Data Upgrade": "AI/adat fejlesztés" },
    items: {
      "restaurant-visibility": { title: "Éttermi láthatósági elemzés", businessType: "Étterem / kávézó", badge: "Illusztratív elemzés", disclaimer: "Ez az elemzés illusztratív, és lehetséges lehetőségeket mutat be. Az eredmények a vállalkozástól, iparágtól, versenytől és megvalósítástól függnek.", currentSituation: ["Nincs saját weboldal", "Csak közösségi média jelenlét", "Nincs online foglalás", "Nincs analitikai mérés"], potentialChallenges: ["Az ügyfelek kapcsolatfelvétel nélkül távozhatnak", "Korlátozott keresőbeli láthatóság", "Nehézkes foglalási élmény"], assumptions: ["2 000 profilmegtekintés havonta", "5% érdeklődő látogató"], illustrativeOpportunity: ["Egyszerűbb foglalás", "Jobb láthatóság", "Jobb ügyfélélmény"] },
      "consultant-lead-generation": { title: "Tanácsadói leadgenerálási elemzés", businessType: "Tanácsadó / coach", badge: "Illusztratív elemzés", disclaimer: "Ez az elemzés illusztratív, és lehetséges lehetőségeket mutat be. Az eredmények a vállalkozástól, iparágtól, versenytől és megvalósítástól függnek.", currentSituation: ["Csak LinkedIn jelenlét", "Nincs weboldal", "Nincs leadgyűjtés"], potentialChallenges: ["A látogatók eltűnnek", "Nincs kapcsolatfelvételi tölcsér", "Nincs hírlevél-növekedés"], illustrativeOpportunity: ["Leadgyűjtés", "Automatizált időpontfoglalás", "Professzionális márkaépítés"] },
      "ai-customer-assistant": { title: "AI ügyfélszolgálati asszisztens elemzés", businessType: "KKV", badge: "Illusztratív elemzés", disclaimer: "Ez az elemzés illusztratív, és lehetséges lehetőségeket mutat be. Az eredmények a vállalkozástól, iparágtól, versenytől és megvalósítástól függnek.", currentSituation: ["Ismétlődő ügyfélkérdések", "Manuális ügyféltámogatás"], illustrativeOpportunity: ["Gyorsabb válaszok", "Kevesebb megszakítás", "Lead minősítés"] },
      "analytics-visibility": { title: "Analitikai láthatósági elemzés", businessType: "Növekvő vállalat", badge: "Illusztratív elemzés", disclaimer: "Ez az elemzés illusztratív, és lehetséges lehetőségeket mutat be. Az eredmények a vállalkozástól, iparágtól, versenytől és megvalósítástól függnek.", currentSituation: ["Korlátozott rálátás a weboldal teljesítményére", "Nincs konverziómérés"], illustrativeOpportunity: ["Látogatói viselkedés megértése", "Legjobban teljesítő oldalak azonosítása", "Jobb marketingdöntések"] },
    },
  },
  pl: {
    seo: { title: "Przykładowe projekty i analizy możliwości - Websiteli", description: "Ilustracyjne analizy Websiteli dla stron, digitalizacji, AI, analityki, SEO i lead generation.", keywords: en.seo.keywords },
    eyebrow: "Przykładowe projekty", title: "Uzasadnienie biznesowe demo.", text: "Ilustracyjne analizy możliwości. To przykłady, nie case studies klientów.",
    labels: { ...en.labels, businessType: "Typ biznesu", currentSituation: "Obecna sytuacja", potentialChallenges: "Potencjalne wyzwania", illustrativeOpportunity: "Ilustracyjna możliwość", assumptions: "Założenia", recommendedPackage: "Rekomendowany pakiet", relatedDemo: "Powiązane demo", viewDemo: "Zobacz demo", requestAudit: "Poproś o audyt", primaryCta: "Poproś o bezpłatny audyt cyfrowy", secondaryCta: "Umów rozmowę discovery", learnMore: "Dowiedz się więcej" },
    packageNames: { "Growth Setup": "Pakiet wzrostu", "AI/Data Upgrade": "Rozbudowa AI i danych" },
    items: {
      "restaurant-visibility": { title: "Analiza widoczności restauracji", businessType: "Restauracja / kawiarnia", badge: "Analiza ilustracyjna", disclaimer: "Ta analiza jest ilustracyjna i pokazuje potencjalne możliwości. Wyniki zależą od firmy, branży, konkurencji i wdrożenia.", currentSituation: ["Brak własnej strony", "Tylko media społecznościowe", "Brak rezerwacji online", "Brak analityki"], potentialChallenges: ["Klienci mogą odejść bez kontaktu", "Ograniczona widoczność w wyszukiwarkach", "Trudny proces rezerwacji"], assumptions: ["2 000 wyświetleń profilu miesięcznie", "5% zainteresowanych odwiedzających"], illustrativeOpportunity: ["Łatwiejsze rezerwacje", "Lepsza widoczność", "Lepsze doświadczenie klienta"] },
      "consultant-lead-generation": { title: "Analiza pozyskiwania leadów dla konsultanta", businessType: "Konsultant / coach", badge: "Analiza ilustracyjna", disclaimer: "Ta analiza jest ilustracyjna i pokazuje potencjalne możliwości. Wyniki zależą od firmy, branży, konkurencji i wdrożenia.", currentSituation: ["Tylko LinkedIn", "Brak strony", "Brak zbierania leadów"], potentialChallenges: ["Odwiedzający znikają", "Brak lejka kontaktu", "Brak wzrostu newslettera"], illustrativeOpportunity: ["Zbieranie leadów", "Automatyzacja rezerwacji", "Profesjonalny wizerunek"] },
      "ai-customer-assistant": { title: "Analiza asystenta klienta AI", businessType: "MŚP", badge: "Analiza ilustracyjna", disclaimer: "Ta analiza jest ilustracyjna i pokazuje potencjalne możliwości. Wyniki zależą od firmy, branży, konkurencji i wdrożenia.", currentSituation: ["Powtarzalne pytania klientów", "Ręczna obsługa"], illustrativeOpportunity: ["Szybsze odpowiedzi", "Mniej przerw w pracy", "Kwalifikacja leadów"] },
      "analytics-visibility": { title: "Analiza widoczności analitycznej", businessType: "Rosnąca firma", badge: "Analiza ilustracyjna", disclaimer: "Ta analiza jest ilustracyjna i pokazuje potencjalne możliwości. Wyniki zależą od firmy, branży, konkurencji i wdrożenia.", currentSituation: ["Ograniczony wgląd w wyniki strony", "Brak śledzenia konwersji"], illustrativeOpportunity: ["Zrozumienie zachowania odwiedzających", "Identyfikacja najlepszych stron", "Lepsze decyzje marketingowe"] },
    },
  },
  es: {
    seo: { title: "Proyectos ejemplo y análisis de oportunidad - Websiteli", description: "Análisis ilustrativos de Websiteli para webs, transformación digital, IA, analítica, SEO y leads.", keywords: en.seo.keywords },
    eyebrow: "Proyectos ejemplo", title: "La lógica de negocio detrás de las demos.", text: "Evaluaciones ilustrativas de oportunidad. Son ejemplos, no casos reales de clientes.",
    labels: { ...en.labels, businessType: "Tipo de negocio", currentSituation: "Situación actual", potentialChallenges: "Retos potenciales", illustrativeOpportunity: "Oportunidad ilustrativa", assumptions: "Supuestos", recommendedPackage: "Paquete recomendado", relatedDemo: "Demo relacionada", viewDemo: "Ver demo", requestAudit: "Solicitar auditoría", primaryCta: "Solicitar auditoría digital gratuita", secondaryCta: "Reservar llamada discovery", learnMore: "Saber más" },
    packageNames: { "Growth Setup": "Configuración de crecimiento", "AI/Data Upgrade": "Mejora de IA y datos" },
    items: {
      "restaurant-visibility": { title: "Análisis de visibilidad para restaurante", businessType: "Restaurante / cafetería", badge: "Análisis ilustrativo", disclaimer: "Este análisis es ilustrativo y muestra posibles oportunidades. Los resultados varían según el negocio, el sector, la competencia y la implementación.", currentSituation: ["Sin sitio web propio", "Solo presencia en redes sociales", "Sin reservas online", "Sin medición analítica"], potentialChallenges: ["Los clientes pueden irse sin contactar", "Visibilidad limitada en buscadores", "Experiencia de reserva difícil"], assumptions: ["2.000 visitas al perfil al mes", "5% de visitantes interesados"], illustrativeOpportunity: ["Reservas más sencillas", "Mayor visibilidad", "Mejor experiencia para clientes"] },
      "consultant-lead-generation": { title: "Análisis de captación de leads para consultor", businessType: "Consultor / coach", badge: "Análisis ilustrativo", disclaimer: "Este análisis es ilustrativo y muestra posibles oportunidades. Los resultados varían según el negocio, el sector, la competencia y la implementación.", currentSituation: ["Solo LinkedIn", "Sin sitio web", "Sin captación de leads"], potentialChallenges: ["Los visitantes desaparecen", "Sin embudo de contacto", "Sin crecimiento de boletín"], illustrativeOpportunity: ["Captación de leads", "Automatización de reservas", "Marca profesional"] },
      "ai-customer-assistant": { title: "Análisis de asistente de clientes con IA", businessType: "Pyme", badge: "Análisis ilustrativo", disclaimer: "Este análisis es ilustrativo y muestra posibles oportunidades. Los resultados varían según el negocio, el sector, la competencia y la implementación.", currentSituation: ["Preguntas repetitivas de clientes", "Soporte manual"], illustrativeOpportunity: ["Respuestas más rápidas", "Menos interrupciones", "Cualificación de leads"] },
      "analytics-visibility": { title: "Análisis de visibilidad analítica", businessType: "Empresa en crecimiento", badge: "Análisis ilustrativo", disclaimer: "Este análisis es ilustrativo y muestra posibles oportunidades. Los resultados varían según el negocio, el sector, la competencia y la implementación.", currentSituation: ["Visión limitada del rendimiento web", "Sin seguimiento de conversiones"], illustrativeOpportunity: ["Entender el comportamiento de visitantes", "Identificar las mejores páginas", "Mejorar decisiones de marketing"] },
    },
  },
  fr: {
    seo: { title: "Projets exemples et analyses d'opportunité - Websiteli", description: "Analyses illustratives Websiteli pour sites, transformation digitale, IA, analytics, SEO et leads.", keywords: en.seo.keywords },
    eyebrow: "Projets exemples", title: "La logique métier derrière les démos.", text: "Analyses d'opportunité illustratives. Ce sont des exemples, pas des cas clients.",
    labels: { ...en.labels, businessType: "Type d'activité", currentSituation: "Situation actuelle", potentialChallenges: "Défis potentiels", illustrativeOpportunity: "Opportunité illustrative", assumptions: "Hypothèses", recommendedPackage: "Offre recommandée", relatedDemo: "Démo liée", viewDemo: "Voir la démo", requestAudit: "Demander un audit", primaryCta: "Demander un audit digital gratuit", secondaryCta: "Réserver un appel découverte", learnMore: "En savoir plus" },
    packageNames: { "Growth Setup": "Configuration croissance", "AI/Data Upgrade": "Amélioration IA et données" },
    items: {
      "restaurant-visibility": { title: "Analyse de visibilité pour restaurant", businessType: "Restaurant / café", badge: "Analyse illustrative", disclaimer: "Cette analyse est illustrative et montre des opportunités possibles. Les résultats varient selon l'activité, le secteur, la concurrence et la mise en œuvre.", currentSituation: ["Pas de site dédié", "Présence uniquement sur les réseaux sociaux", "Pas de réservation en ligne", "Pas de suivi analytics"], potentialChallenges: ["Les clients peuvent partir sans contacter", "Visibilité limitée dans les moteurs de recherche", "Expérience de réservation difficile"], assumptions: ["2 000 vues de profil par mois", "5% de visiteurs intéressés"], illustrativeOpportunity: ["Réservations plus simples", "Visibilité améliorée", "Meilleure expérience client"] },
      "consultant-lead-generation": { title: "Analyse de génération de leads pour consultant", businessType: "Consultant / coach", badge: "Analyse illustrative", disclaimer: "Cette analyse est illustrative et montre des opportunités possibles. Les résultats varient selon l'activité, le secteur, la concurrence et la mise en œuvre.", currentSituation: ["LinkedIn uniquement", "Pas de site web", "Pas de capture de leads"], potentialChallenges: ["Les visiteurs disparaissent", "Pas de parcours de contact", "Pas de croissance newsletter"], illustrativeOpportunity: ["Capture de leads", "Automatisation de réservation", "Image professionnelle"] },
      "ai-customer-assistant": { title: "Analyse d'assistant client IA", businessType: "PME", badge: "Analyse illustrative", disclaimer: "Cette analyse est illustrative et montre des opportunités possibles. Les résultats varient selon l'activité, le secteur, la concurrence et la mise en œuvre.", currentSituation: ["Questions clients répétitives", "Support manuel"], illustrativeOpportunity: ["Réponses plus rapides", "Moins d'interruptions", "Qualification des leads"] },
      "analytics-visibility": { title: "Analyse de visibilité analytics", businessType: "Entreprise en croissance", badge: "Analyse illustrative", disclaimer: "Cette analyse est illustrative et montre des opportunités possibles. Les résultats varient selon l'activité, le secteur, la concurrence et la mise en œuvre.", currentSituation: ["Vue limitée sur la performance du site", "Pas de suivi des conversions"], illustrativeOpportunity: ["Comprendre le comportement des visiteurs", "Identifier les meilleures pages", "Améliorer les décisions marketing"] },
    },
  },
  it: {
    seo: { title: "Progetti esempio e analisi opportunità - Websiteli", description: "Analisi illustrative Websiteli per siti, trasformazione digitale, AI, analytics, SEO e lead.", keywords: en.seo.keywords },
    eyebrow: "Progetti esempio", title: "La logica business dietro le demo.", text: "Valutazioni illustrative di opportunità. Sono esempi, non case study clienti.",
    labels: { ...en.labels, businessType: "Tipo di attività", currentSituation: "Situazione attuale", potentialChallenges: "Sfide potenziali", illustrativeOpportunity: "Opportunità illustrativa", assumptions: "Ipotesi", recommendedPackage: "Pacchetto consigliato", relatedDemo: "Demo collegata", viewDemo: "Vedi demo", requestAudit: "Richiedi audit", primaryCta: "Richiedi audit digitale gratuito", secondaryCta: "Prenota una discovery call", learnMore: "Scopri di più" },
    packageNames: { "Growth Setup": "Pacchetto crescita", "AI/Data Upgrade": "Upgrade AI e dati" },
    items: {
      "restaurant-visibility": { title: "Analisi visibilità ristorante", businessType: "Ristorante / bar", badge: "Analisi illustrativa", disclaimer: "Questa analisi è illustrativa e mostra potenziali opportunità. I risultati variano in base ad attività, settore, concorrenza e implementazione.", currentSituation: ["Nessun sito dedicato", "Solo presenza social", "Nessuna prenotazione online", "Nessun tracciamento analytics"], potentialChallenges: ["I clienti possono uscire senza contattare", "Visibilità limitata sui motori di ricerca", "Prenotazione poco fluida"], assumptions: ["2.000 visualizzazioni profilo al mese", "5% di visitatori interessati"], illustrativeOpportunity: ["Prenotazioni più semplici", "Migliore visibilità", "Migliore esperienza cliente"] },
      "consultant-lead-generation": { title: "Analisi lead generation per consulente", businessType: "Consulente / coach", badge: "Analisi illustrativa", disclaimer: "Questa analisi è illustrativa e mostra potenziali opportunità. I risultati variano in base ad attività, settore, concorrenza e implementazione.", currentSituation: ["Solo LinkedIn", "Nessun sito", "Nessuna acquisizione lead"], potentialChallenges: ["I visitatori spariscono", "Nessun funnel di contatto", "Nessuna crescita newsletter"], illustrativeOpportunity: ["Acquisizione lead", "Automazione booking", "Brand professionale"] },
      "ai-customer-assistant": { title: "Analisi assistente clienti AI", businessType: "PMI", badge: "Analisi illustrativa", disclaimer: "Questa analisi è illustrativa e mostra potenziali opportunità. I risultati variano in base ad attività, settore, concorrenza e implementazione.", currentSituation: ["Domande clienti ripetitive", "Supporto manuale"], illustrativeOpportunity: ["Risposte più rapide", "Meno interruzioni", "Qualificazione lead"] },
      "analytics-visibility": { title: "Analisi visibilità analytics", businessType: "Azienda in crescita", badge: "Analisi illustrativa", disclaimer: "Questa analisi è illustrativa e mostra potenziali opportunità. I risultati variano in base ad attività, settore, concorrenza e implementazione.", currentSituation: ["Insight limitati sulle performance del sito", "Nessun tracciamento conversioni"], illustrativeOpportunity: ["Comprendere il comportamento dei visitatori", "Identificare le pagine migliori", "Migliorare le decisioni marketing"] },
    },
  },
  cz: {
    seo: { title: "Ukázkové projekty a analýzy příležitostí - Websiteli", description: "Ilustrativní analýzy Websiteli pro weby, digitalizaci, AI, analytiku, SEO a leady.", keywords: en.seo.keywords },
    eyebrow: "Ukázkové projekty", title: "Business logika za demy.", text: "Ilustrativní posouzení příležitostí. Jsou to příklady, ne případové studie klientů.",
    labels: { ...en.labels, businessType: "Typ podnikání", currentSituation: "Aktuální situace", potentialChallenges: "Možné výzvy", illustrativeOpportunity: "Ilustrativní příležitost", assumptions: "Předpoklady", recommendedPackage: "Doporučený balíček", relatedDemo: "Související demo", viewDemo: "Zobrazit demo", requestAudit: "Požádat o audit", primaryCta: "Požádat o bezplatný digitální audit", secondaryCta: "Rezervovat discovery call", learnMore: "Zjistit více" },
    packageNames: { "Growth Setup": "Růstový balíček", "AI/Data Upgrade": "AI a datové rozšíření" },
    items: {
      "restaurant-visibility": { title: "Analýza viditelnosti restaurace", businessType: "Restaurace / kavárna", badge: "Ilustrativní analýza", disclaimer: "Tato analýza je ilustrativní a ukazuje možné příležitosti. Výsledky se liší podle firmy, oboru, konkurence a implementace.", currentSituation: ["Žádný vlastní web", "Pouze sociální sítě", "Žádné online rezervace", "Žádné analytics měření"], potentialChallenges: ["Zákazníci mohou odejít bez kontaktu", "Omezená viditelnost ve vyhledávačích", "Složitá rezervace"], assumptions: ["2 000 zobrazení profilu měsíčně", "5% zaujatých návštěvníků"], illustrativeOpportunity: ["Jednodušší rezervace", "Lepší viditelnost", "Lepší zákaznická zkušenost"] },
      "consultant-lead-generation": { title: "Analýza získávání leadů pro konzultanta", businessType: "Konzultant / kouč", badge: "Ilustrativní analýza", disclaimer: "Tato analýza je ilustrativní a ukazuje možné příležitosti. Výsledky se liší podle firmy, oboru, konkurence a implementace.", currentSituation: ["Pouze LinkedIn", "Žádný web", "Žádný sběr leadů"], potentialChallenges: ["Návštěvníci odcházejí", "Chybí kontaktní funnel", "Newsletter neroste"], illustrativeOpportunity: ["Sběr leadů", "Automatizace rezervací", "Profesionální značka"] },
      "ai-customer-assistant": { title: "Analýza AI zákaznického asistenta", businessType: "Malá nebo střední firma", badge: "Ilustrativní analýza", disclaimer: "Tato analýza je ilustrativní a ukazuje možné příležitosti. Výsledky se liší podle firmy, oboru, konkurence a implementace.", currentSituation: ["Opakující se dotazy zákazníků", "Ruční podpora"], illustrativeOpportunity: ["Rychlejší odpovědi", "Méně přerušení", "Kvalifikace leadů"] },
      "analytics-visibility": { title: "Analýza viditelnosti analytiky", businessType: "Rostoucí firma", badge: "Ilustrativní analýza", disclaimer: "Tato analýza je ilustrativní a ukazuje možné příležitosti. Výsledky se liší podle firmy, oboru, konkurence a implementace.", currentSituation: ["Omezený přehled o výkonu webu", "Žádné měření konverzí"], illustrativeOpportunity: ["Porozumět chování návštěvníků", "Najít nejvýkonnější stránky", "Zlepšit marketingová rozhodnutí"] },
    },
  },
  pt: {
    seo: { title: "Projetos exemplo e análises de oportunidade - Websiteli", description: "Análises ilustrativas Websiteli para sites, transformação digital, AI, analytics, SEO e leads.", keywords: en.seo.keywords },
    eyebrow: "Projetos exemplo", title: "A lógica de negócio por trás das demos.", text: "Avaliações ilustrativas de oportunidade. São exemplos, não estudos de caso de clientes.",
    labels: { ...en.labels, businessType: "Tipo de negócio", currentSituation: "Situação atual", potentialChallenges: "Desafios potenciais", illustrativeOpportunity: "Oportunidade ilustrativa", assumptions: "Premissas", recommendedPackage: "Pacote recomendado", relatedDemo: "Demo relacionada", viewDemo: "Ver demo", requestAudit: "Pedir auditoria", primaryCta: "Pedir auditoria digital gratuita", secondaryCta: "Marcar discovery call", learnMore: "Saber mais" },
    packageNames: { "Growth Setup": "Pacote de crescimento", "AI/Data Upgrade": "Upgrade de IA e dados" },
    items: {
      "restaurant-visibility": { title: "Análise de visibilidade para restaurante", businessType: "Restaurante / café", badge: "Análise ilustrativa", disclaimer: "Esta análise é ilustrativa e mostra oportunidades potenciais. Os resultados variam conforme o negócio, setor, concorrência e implementação.", currentSituation: ["Sem site próprio", "Apenas presença em redes sociais", "Sem reservas online", "Sem medição analytics"], potentialChallenges: ["Clientes podem sair sem contactar", "Visibilidade limitada nos motores de busca", "Experiência de reserva difícil"], assumptions: ["2.000 visualizações de perfil por mês", "5% de visitantes interessados"], illustrativeOpportunity: ["Reservas mais simples", "Melhor visibilidade", "Melhor experiência do cliente"] },
      "consultant-lead-generation": { title: "Análise de geração de leads para consultor", businessType: "Consultor / coach", badge: "Análise ilustrativa", disclaimer: "Esta análise é ilustrativa e mostra oportunidades potenciais. Os resultados variam conforme o negócio, setor, concorrência e implementação.", currentSituation: ["Apenas LinkedIn", "Sem site", "Sem captação de leads"], potentialChallenges: ["Visitantes desaparecem", "Sem funil de contacto", "Sem crescimento da newsletter"], illustrativeOpportunity: ["Captação de leads", "Automação de marcações", "Imagem profissional"] },
      "ai-customer-assistant": { title: "Análise de assistente de clientes com IA", businessType: "PME", badge: "Análise ilustrativa", disclaimer: "Esta análise é ilustrativa e mostra oportunidades potenciais. Os resultados variam conforme o negócio, setor, concorrência e implementação.", currentSituation: ["Perguntas repetitivas de clientes", "Suporte manual"], illustrativeOpportunity: ["Respostas mais rápidas", "Menos interrupções", "Qualificação de leads"] },
      "analytics-visibility": { title: "Análise de visibilidade analytics", businessType: "Empresa em crescimento", badge: "Análise ilustrativa", disclaimer: "Esta análise é ilustrativa e mostra oportunidades potenciais. Os resultados variam conforme o negócio, setor, concorrência e implementação.", currentSituation: ["Visão limitada do desempenho do site", "Sem tracking de conversões"], illustrativeOpportunity: ["Compreender o comportamento dos visitantes", "Identificar as melhores páginas", "Melhorar decisões de marketing"] },
    },
  },
  da: {
    seo: { title: "Eksempelprojekter og mulighedsanalyser - Websiteli", description: "Illustrative Websiteli-analyser for websites, digital transformation, AI, analytics, SEO og leads.", keywords: en.seo.keywords },
    eyebrow: "Eksempelprojekter", title: "Forretningslogikken bag demoerne.", text: "Illustrative mulighedsvurderinger. Det er eksempler, ikke kundecases.",
    labels: { ...en.labels, businessType: "Virksomhedstype", currentSituation: "Nuværende situation", potentialChallenges: "Mulige udfordringer", illustrativeOpportunity: "Illustrativ mulighed", assumptions: "Antagelser", recommendedPackage: "Anbefalet pakke", relatedDemo: "Relateret demo", viewDemo: "Se demo", requestAudit: "Anmod om audit", primaryCta: "Anmod om gratis digital audit", secondaryCta: "Book discovery call", learnMore: "Læs mere" },
    packageNames: { "Growth Setup": "Vækstpakke", "AI/Data Upgrade": "AI- og dataopgradering" },
    items: {
      "restaurant-visibility": { title: "Analyse af restaurants synlighed", businessType: "Restaurant / café", badge: "Illustrativ analyse", disclaimer: "Denne analyse er illustrativ og viser mulige muligheder. Resultater afhænger af virksomhed, branche, konkurrence og implementering.", currentSituation: ["Intet dedikeret website", "Kun tilstedeværelse på sociale medier", "Ingen online reservationer", "Ingen analytics-måling"], potentialChallenges: ["Kunder kan forlade siden uden kontakt", "Begrænset synlighed i søgemaskiner", "Besværlig bookingoplevelse"], assumptions: ["2.000 profilvisninger om måneden", "5% interesserede besøgende"], illustrativeOpportunity: ["Nemmere reservationer", "Bedre synlighed", "Bedre kundeoplevelse"] },
      "consultant-lead-generation": { title: "Analyse af leadgenerering for konsulent", businessType: "Konsulent / coach", badge: "Illustrativ analyse", disclaimer: "Denne analyse er illustrativ og viser mulige muligheder. Resultater afhænger af virksomhed, branche, konkurrence og implementering.", currentSituation: ["Kun LinkedIn", "Intet website", "Ingen leadopsamling"], potentialChallenges: ["Besøgende forsvinder", "Ingen kontaktfunnel", "Ingen vækst i nyhedsbrev"], illustrativeOpportunity: ["Leadopsamling", "Bookingautomatisering", "Professionel branding"] },
      "ai-customer-assistant": { title: "Analyse af AI-kundeassistent", businessType: "SMV", badge: "Illustrativ analyse", disclaimer: "Denne analyse er illustrativ og viser mulige muligheder. Resultater afhænger af virksomhed, branche, konkurrence og implementering.", currentSituation: ["Gentagne kundespørgsmål", "Manuel support"], illustrativeOpportunity: ["Hurtigere svar", "Færre afbrydelser", "Leadkvalificering"] },
      "analytics-visibility": { title: "Analyse af analytics-synlighed", businessType: "Voksende virksomhed", badge: "Illustrativ analyse", disclaimer: "Denne analyse er illustrativ og viser mulige muligheder. Resultater afhænger af virksomhed, branche, konkurrence og implementering.", currentSituation: ["Begrænset indsigt i website-performance", "Ingen konverteringssporing"], illustrativeOpportunity: ["Forstå besøgendes adfærd", "Identificere de bedste sider", "Forbedre marketingbeslutninger"] },
    },
  },
  nl: {
    seo: { title: "Voorbeeldprojecten en kansanalyses - Websiteli", description: "Illustratieve Websiteli-analyses voor websites, digitale transformatie, AI, analytics, SEO en leads.", keywords: en.seo.keywords },
    eyebrow: "Voorbeeldprojecten", title: "De zakelijke logica achter de demo's.", text: "Illustratieve kansanalyses. Dit zijn voorbeelden, geen klantcases.",
    labels: { ...en.labels, businessType: "Bedrijfstype", currentSituation: "Huidige situatie", potentialChallenges: "Mogelijke uitdagingen", illustrativeOpportunity: "Illustratieve kans", assumptions: "Aannames", recommendedPackage: "Aanbevolen pakket", relatedDemo: "Gerelateerde demo", viewDemo: "Bekijk demo", requestAudit: "Vraag audit aan", primaryCta: "Vraag een gratis digitale audit aan", secondaryCta: "Boek een discovery call", learnMore: "Meer informatie" },
    packageNames: { "Growth Setup": "Groeipakket", "AI/Data Upgrade": "AI- en data-upgrade" },
    items: {
      "restaurant-visibility": { title: "Analyse van restaurantzichtbaarheid", businessType: "Restaurant / café", badge: "Illustratieve analyse", disclaimer: "Deze analyse is illustratief en toont mogelijke kansen. Resultaten verschillen per bedrijf, sector, concurrentie en uitvoering.", currentSituation: ["Geen eigen website", "Alleen aanwezigheid op sociale media", "Geen online reserveringen", "Geen analytics-meting"], potentialChallenges: ["Klanten kunnen vertrekken zonder contact", "Beperkte zichtbaarheid in zoekmachines", "Moeilijke reserveringservaring"], assumptions: ["2.000 profielweergaven per maand", "5% geïnteresseerde bezoekers"], illustrativeOpportunity: ["Eenvoudigere reserveringen", "Betere zichtbaarheid", "Betere klantervaring"] },
      "consultant-lead-generation": { title: "Analyse van leadgeneratie voor consultant", businessType: "Consultant / coach", badge: "Illustratieve analyse", disclaimer: "Deze analyse is illustratief en toont mogelijke kansen. Resultaten verschillen per bedrijf, sector, concurrentie en uitvoering.", currentSituation: ["Alleen LinkedIn", "Geen website", "Geen leadcapture"], potentialChallenges: ["Bezoekers verdwijnen", "Geen contactfunnel", "Geen groei van nieuwsbrief"], illustrativeOpportunity: ["Leadcapture", "Boekingsautomatisering", "Professionele branding"] },
      "ai-customer-assistant": { title: "Analyse van AI-klantassistent", businessType: "MKB", badge: "Illustratieve analyse", disclaimer: "Deze analyse is illustratief en toont mogelijke kansen. Resultaten verschillen per bedrijf, sector, concurrentie en uitvoering.", currentSituation: ["Herhalende klantvragen", "Handmatige support"], illustrativeOpportunity: ["Snellere antwoorden", "Minder onderbrekingen", "Leadkwalificatie"] },
      "analytics-visibility": { title: "Analyse van analytics-zichtbaarheid", businessType: "Groeiend bedrijf", badge: "Illustratieve analyse", disclaimer: "Deze analyse is illustratief en toont mogelijke kansen. Resultaten verschillen per bedrijf, sector, concurrentie en uitvoering.", currentSituation: ["Beperkt inzicht in websiteprestaties", "Geen conversietracking"], illustrativeOpportunity: ["Bezoekersgedrag begrijpen", "Best presterende pagina's vinden", "Marketingbeslissingen verbeteren"] },
    },
  },
  ja: {
    seo: { title: "プロジェクト例と機会分析 - Websiteli", description: "Webサイト、デジタル変革、AI自動化、分析、SEO、リード獲得のWebsiteliによる例示的な分析。", keywords: en.seo.keywords },
    eyebrow: "プロジェクト例", title: "デモの背景にあるビジネス視点。", text: "機会を示すための例示的な評価です。実際の顧客事例ではありません。",
    labels: { ...en.labels, businessType: "事業タイプ", currentSituation: "現在の状況", potentialChallenges: "想定される課題", illustrativeOpportunity: "例示的な機会", assumptions: "仮定", recommendedPackage: "推奨パッケージ", relatedDemo: "関連デモ", viewDemo: "デモを見る", requestAudit: "監査を依頼", primaryCta: "無料デジタル監査を依頼", secondaryCta: "ディスカバリーコールを予約", learnMore: "詳しく見る" },
    packageNames: { "Growth Setup": "成長支援パッケージ", "AI/Data Upgrade": "AI・データ強化" },
    items: {
      "restaurant-visibility": { title: "レストラン可視性分析", businessType: "レストラン / カフェ", badge: "例示的な分析", disclaimer: "この分析は例示目的で、潜在的な機会を示すものです。結果は事業、業界、競合、実装内容によって異なります。", currentSituation: ["専用Webサイトがない", "SNSのみで運用", "オンライン予約がない", "アクセス解析がない"], potentialChallenges: ["顧客が連絡前に離脱する可能性", "検索エンジンでの可視性が限定的", "予約体験が分かりにくい"], assumptions: ["月2,000回のプロフィール閲覧", "5%の関心ある訪問者"], illustrativeOpportunity: ["予約を簡単にする", "可視性を高める", "顧客体験を改善する"] },
      "consultant-lead-generation": { title: "コンサルタントのリード獲得分析", businessType: "コンサルタント / コーチ", badge: "例示的な分析", disclaimer: "この分析は例示目的で、潜在的な機会を示すものです。結果は事業、業界、競合、実装内容によって異なります。", currentSituation: ["LinkedInのみ", "Webサイトがない", "リード獲得導線がない"], potentialChallenges: ["訪問者が離脱する", "問い合わせ導線がない", "ニュースレターが成長しない"], illustrativeOpportunity: ["リード獲得", "予約自動化", "専門的なブランド表現"] },
      "ai-customer-assistant": { title: "AI顧客アシスタント分析", businessType: "中小企業", badge: "例示的な分析", disclaimer: "この分析は例示目的で、潜在的な機会を示すものです。結果は事業、業界、競合、実装内容によって異なります。", currentSituation: ["繰り返しの顧客質問", "手作業のサポート"], illustrativeOpportunity: ["より速い回答", "中断の削減", "リード判定"] },
      "analytics-visibility": { title: "分析可視性の評価", businessType: "成長中の企業", badge: "例示的な分析", disclaimer: "この分析は例示目的で、潜在的な機会を示すものです。結果は事業、業界、競合、実装内容によって異なります。", currentSituation: ["Webサイト成果の把握が限定的", "コンバージョン計測がない"], illustrativeOpportunity: ["訪問者行動を理解する", "成果の高いページを特定する", "マーケティング判断を改善する"] },
    },
  },
};

export function getExampleProjectPageContent(locale: LocaleCode): ExampleProjectPageContent {
  const copy = localized[locale] ?? {};
  const items = Object.fromEntries(
    Object.entries(en.items).map(([slug, item]) => [
      slug,
      {
        ...item,
        ...(copy.items?.[slug as ExampleProjectSlug] ?? {}),
      },
    ]),
  ) as Record<ExampleProjectSlug, ExampleProjectContent>;

  return {
    ...en,
    ...copy,
    seo: { ...en.seo, ...copy.seo },
    labels: { ...en.labels, ...copy.labels },
    packageNames: { ...en.packageNames, ...copy.packageNames },
    items,
  };
}

export function getExampleProject(locale: LocaleCode, slug: ExampleProjectSlug) {
  return getExampleProjectPageContent(locale).items[slug];
}
