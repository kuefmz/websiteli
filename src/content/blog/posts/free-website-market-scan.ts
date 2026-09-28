import type { BlogPostSource, BlogPostTranslation } from "../types";

type Copy = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  readingTime: string;
  audience: string;
  excerpt: string;
  summary: string[];
  takeaways: string[];
  headings: string[];
  paragraphs: string[];
  faqs: { question: string; answer: string }[];
};

function makeTranslation(language: "en" | "de" | "fr" | "it" | "es", copy: Copy): BlogPostTranslation {
  return {
    title: copy.title,
    description: copy.description,
    category: copy.category,
    tags: copy.tags,
    language,
    readingTime: copy.readingTime,
    audience: copy.audience,
    excerpt: copy.excerpt,
    summary: copy.summary,
    keyTakeaways: copy.takeaways,
    chatGptPrompts: [],
    faqs: copy.faqs,
    body:
      copy.headings.map((heading, index) => `## ${heading}\n\n${copy.paragraphs[index]}`).join("\n\n") +
      `\n\n[Open the free Websiteli Market Scan](/en/market-scan/) · [Website services](/en/services-pricing/) · [Contact Websiteli](/en/contact/)`,
  };
}

const translations = {
  en: makeTranslation("en", {
    title: "Free Website & Market Scan: Find SEO Gaps, Competitors and Buyer Signals from One URL",
    description: "Websiteli Market Scan analyses a public website, checks SEO and conversion fundamentals, and researches relevant competitor, buyer, review and content signals from one URL.",
    category: "Website Strategy",
    tags: ["free website audit", "website analysis", "market analysis", "competitor research", "buyer signals", "SEO audit", "conversion audit", "Websiteli Market Scan"],
    readingTime: "8 min read",
    audience: "Small-business owners, founders, marketers and website owners who want a fast evidence-based website and market review",
    excerpt: "Enter one public URL and get a website diagnosis, prioritised improvements, market research signals and source links without filling the report with unrelated results.",
    summary: [
      "Websiteli Market Scan combines a live website crawl with public market research from one URL.",
      "The website diagnosis checks observable fundamentals such as titles, descriptions, headings, calls to action, lead capture, analytics, structured data, mobile setup and content depth.",
      "Commercial websites can also be researched for relevant buyer language, competitor candidates, public discussions, review mentions and content opportunities.",
      "External findings are filtered for relevance and source URLs are kept so the results can be checked.",
      "The tool prefers an empty section over weak or unrelated market data.",
    ],
    takeaways: [
      "Use the scan to identify website issues before spending more on traffic.",
      "Treat the website score as a diagnostic heuristic, not a revenue prediction.",
      "Verify external market findings through the source links included in the report.",
      "Use the prioritised recommendations to decide what to improve first.",
      "Run the free scan directly from the Websiteli Market Scan page.",
    ],
    headings: [
      "What is the Websiteli Market Scan?",
      "What the website analysis checks",
      "How the market research works",
      "Why the report can show zero buyer signals",
      "How the improvement recommendations are created",
      "When this type of website audit is useful",
      "How to run your free website and market scan",
    ],
    paragraphs: [
      "Websiteli Market Scan is a free website and market analysis tool. You enter one public website URL. The tool crawls a small set of relevant pages, analyses observable website fundamentals, detects the site’s positioning and—when the site is clearly commercial—researches public market signals related to that positioning. The result is one report that combines website diagnosis, market evidence and a prioritised action plan.",
      "The website audit checks signals that can be observed directly from the pages it crawls: page titles, meta descriptions, heading structure, calls to action, lead capture, analytics markers, structured data, mobile viewport setup and content depth. The score is deliberately simple and transparent. It describes the sampled fundamentals; it does not claim to predict revenue, rankings or conversion rate.",
      "For commercial sites, the scanner builds search queries from the positioning and topical phrases it detects on the site. It then looks for public buyer conversations, pain points, competitor candidates, review mentions and content opportunities. Results must pass relevance filters before they are shown. The report keeps source links so a business owner can inspect the evidence instead of accepting a black-box conclusion.",
      "A zero is sometimes the correct result. Public search providers can rate-limit automated requests, and some markets simply do not expose strong public conversations for a specific query. Websiteli therefore avoids padding the report with generic articles, directories or unrelated companies just to make the numbers look impressive. No result is more useful than a misleading result.",
      "The action plan is grounded in the crawl. If structured data is missing, the report can explain why adding the right schema matters. If proof is weak, it can recommend stronger case studies or testimonials. If the site is commercial and pricing is unclear, it can suggest earlier price or scope clarity. Recommendations also explain why the improvement matters and how it could help a visitor become a client.",
      "This type of scan is useful before a website redesign, SEO project, paid advertising campaign, conversion optimisation effort or positioning review. It is also useful when a website looks polished but the owner is unsure what to improve next. The report separates healthy foundations from opportunities, so the next step can be based on evidence rather than a generic checklist.",
      "Open the [free Websiteli Market Scan](/en/market-scan/), enter a public website URL and start the scan. You can review the report preview in the browser. The Market Scan is currently available in English, German, French, Italian and Spanish, with localized SEO metadata, FAQ content and language-specific pages.",
    ],
    faqs: [
      { question: "Is the Websiteli Market Scan free?", answer: "Yes. The scan can be run without a credit card or login. The report preview is shown in the browser." },
      { question: "What does the Market Scan analyse?", answer: "It analyses website fundamentals such as titles, descriptions, structure, calls to action, lead capture, analytics, structured data, mobile setup and content depth. Commercial sites can also receive filtered public market findings." },
      { question: "Does the Market Scan use AI to invent recommendations?", answer: "No. Recommendations are generated from observable crawl checks and the detected site profile. External market findings are filtered and source links are kept when available." },
      { question: "Why can a report have zero buyer signals or reviews?", answer: "Public sources may return no relevant results or may rate-limit automated requests. The tool intentionally prefers zero to unrelated or weak evidence." },
      { question: "Can I scan a competitor's public website?", answer: "You can enter a public HTTP or HTTPS website. Private, local and non-public network addresses are blocked for security." },
    ],
  }),
  de: makeTranslation("de", {
    title: "Kostenloser Website- & Market Scan: SEO-Lücken, Wettbewerber und Buyer Signals aus einer URL",
    description: "Der Websiteli Market Scan analysiert eine öffentliche Website, prüft SEO- und Conversion-Grundlagen und recherchiert relevante Wettbewerber-, Buyer-, Review- und Content-Signale.",
    category: "Website-Strategie",
    tags: ["kostenloser Website Audit", "Website Analyse", "Marktanalyse", "Wettbewerberanalyse", "Buyer Signals", "SEO Audit", "Conversion Audit", "Websiteli Market Scan"],
    readingTime: "8 Min. Lesezeit",
    audience: "KMU, Gründer, Marketingverantwortliche und Website-Betreiber, die schnell eine nachvollziehbare Website- und Marktanalyse möchten",
    excerpt: "Eine öffentliche URL genügt für Website-Diagnose, priorisierte Verbesserungen, Marktsignale und überprüfbare Quellen.",
    summary: [
      "Der Websiteli Market Scan verbindet einen Live-Crawl der Website mit öffentlicher Marktrecherche.",
      "Die Website-Diagnose prüft beobachtbare Grundlagen wie Titel, Beschreibungen, Überschriften, CTAs, Lead Capture, Analytics, strukturierte Daten, Mobile Setup und Content-Tiefe.",
      "Bei kommerziellen Websites werden zusätzlich relevante Buyer-Sprache, Wettbewerber, öffentliche Diskussionen, Reviews und Content-Chancen recherchiert.",
      "Externe Ergebnisse werden nach Relevanz gefiltert und behalten Quellenlinks.",
      "Der Scanner zeigt lieber einen leeren Bereich als irrelevante Marktdaten.",
    ],
    takeaways: [
      "Nutze den Scan, bevor du mehr Budget in Traffic investierst.",
      "Der Score ist eine Diagnose-Heuristik und keine Umsatzprognose.",
      "Prüfe externe Marktergebnisse über die verlinkten Quellen.",
      "Nutze die priorisierten Empfehlungen, um die nächste Verbesserung auszuwählen.",
      "Der Market Scan kann direkt kostenlos gestartet werden.",
    ],
    headings: ["Was ist der Websiteli Market Scan?","Was die Website-Analyse prüft","Wie die Marktrecherche funktioniert","Warum der Report auch 0 Buyer Signals zeigen kann","Wie die Verbesserungsvorschläge entstehen","Wann ein solcher Website-Audit sinnvoll ist","So startest du deinen kostenlosen Website- und Market Scan"],
    paragraphs: [
      "Der Websiteli Market Scan ist ein kostenloses Tool für Website- und Marktanalyse. Du gibst eine öffentliche Website-URL ein. Das Tool crawlt relevante Seiten, prüft beobachtbare Website-Grundlagen, erkennt die Positionierung und recherchiert bei klar kommerziellen Websites passende öffentliche Marktsignale. Das Ergebnis verbindet Website-Diagnose, Markt-Evidenz und priorisierten Aktionsplan.",
      "Der Website-Audit prüft direkt sichtbare beziehungsweise technisch erkennbare Signale: Seitentitel, Meta Descriptions, Überschriftenstruktur, Calls-to-Action, Lead Capture, Analytics-Marker, strukturierte Daten, mobile Viewport-Konfiguration und Content-Tiefe. Der Score ist bewusst transparent und einfach. Er beschreibt die geprüften Grundlagen und sagt keinen Umsatz oder Conversion-Wert voraus.",
      "Für kommerzielle Websites erstellt der Scanner Suchanfragen aus der erkannten Positionierung und den wichtigsten Themen der Website. Danach sucht er nach Buyer-Gesprächen, Pain Points, Wettbewerbern, Review-Erwähnungen und Content-Chancen. Ergebnisse müssen Relevanzfilter bestehen, bevor sie im Report erscheinen. Quellenlinks bleiben erhalten.",
      "Eine Null kann ein korrektes Ergebnis sein. Öffentliche Suchanbieter können automatisierte Anfragen begrenzen, und nicht jeder Markt hat starke öffentliche Diskussionen. Websiteli füllt deshalb keine Bereiche mit generischen Artikeln, Verzeichnissen oder unpassenden Firmen, nur damit der Report voller aussieht.",
      "Der Aktionsplan basiert auf dem Crawl. Fehlen strukturierte Daten, erklärt der Report, warum passende Schema-Auszeichnung sinnvoll ist. Fehlt Beweisführung, können stärkere Case Studies oder Testimonials empfohlen werden. Bei kommerziellen Websites kann auch frühere Preis- oder Scope-Klarheit relevant sein. Jede Verbesserung erklärt zusätzlich, warum sie wichtig ist und wie sie mehr qualifizierte Anfragen unterstützen kann.",
      "Der Scan ist besonders nützlich vor Redesign, SEO-Projekt, Paid Ads, Conversion-Optimierung oder einer Positionierungsüberarbeitung. Auch bei einer optisch guten Website hilft er, gesunde Grundlagen von echten Verbesserungsmöglichkeiten zu trennen.",
      "Öffne den [kostenlosen Websiteli Market Scan](/en/market-scan/), gib eine öffentliche Website-URL ein und starte die Analyse. Der Market Scan ist aktuell auf Englisch, Deutsch, Französisch, Italienisch und Spanisch verfügbar.",
    ],
    faqs: [
      {question:"Ist der Websiteli Market Scan kostenlos?",answer:"Ja. Der Scan funktioniert ohne Kreditkarte und ohne Login; die Report-Vorschau erscheint direkt im Browser."},
      {question:"Was analysiert der Market Scan?",answer:"Er prüft Website-Grundlagen und kann bei kommerziellen Websites zusätzlich gefilterte öffentliche Marktsignale recherchieren."},
      {question:"Erfindet der Market Scan Empfehlungen mit KI?",answer:"Nein. Empfehlungen werden aus beobachtbaren Crawl-Checks und dem erkannten Website-Profil abgeleitet. Externe Funde werden gefiltert und soweit möglich mit Quellen verknüpft."},
      {question:"Warum kann ein Report 0 Buyer Signals zeigen?",answer:"Öffentliche Quellen können keine relevanten Ergebnisse liefern oder automatisierte Anfragen begrenzen. Der Scan zeigt lieber 0 als irrelevante Evidenz."},
      {question:"Kann ich eine Wettbewerber-Website scannen?",answer:"Öffentliche HTTP- oder HTTPS-Websites können eingegeben werden. Private und lokale Netzwerkadressen sind aus Sicherheitsgründen blockiert."},
    ],
  }),
  fr: makeTranslation("fr", {
    title: "Audit gratuit de site & Market Scan : SEO, concurrents et signaux d’achat depuis une URL",
    description: "Le Websiteli Market Scan analyse un site public, vérifie les bases SEO et conversion, puis recherche des concurrents, signaux d’achat, avis et opportunités de contenu pertinents.",
    category: "Stratégie web",
    tags: ["audit de site gratuit","analyse de site","analyse de marché","analyse concurrents","signaux d'achat","audit SEO","audit conversion","Websiteli Market Scan"],
    readingTime: "8 min de lecture",
    audience: "PME, fondateurs, responsables marketing et propriétaires de sites qui veulent une analyse rapide et vérifiable",
    excerpt: "Une URL publique suffit pour obtenir un diagnostic de site, des améliorations priorisées, des signaux de marché et des sources vérifiables.",
    summary:["Le Market Scan combine un crawl du site avec une recherche de marché publique.","Le diagnostic vérifie titres, descriptions, structure, CTA, capture de leads, analytics, données structurées, mobile et profondeur du contenu.","Les sites commerciaux peuvent recevoir des signaux d’achat, concurrents, discussions, avis et opportunités de contenu filtrés.","Les résultats externes gardent leurs liens sources.","Une section vide est préférée à des données hors sujet."],
    takeaways:["Utilisez le scan avant d’acheter davantage de trafic.","Le score est un diagnostic, pas une prévision de revenus.","Vérifiez les signaux externes via les sources.","Priorisez les améliorations selon le rapport.","Lancez gratuitement le Market Scan depuis Websiteli."],
    headings:["Qu’est-ce que le Websiteli Market Scan ?","Ce que vérifie l’analyse du site","Comment fonctionne la recherche de marché","Pourquoi le rapport peut afficher zéro signal d’achat","Comment sont créées les recommandations","Quand cet audit de site est utile","Comment lancer votre Market Scan gratuit"],
    paragraphs:[
      "Le Websiteli Market Scan est un outil gratuit d’analyse de site et de marché. Vous saisissez une URL publique. Le service explore plusieurs pages pertinentes, vérifie les fondamentaux observables, détecte le positionnement et, lorsque le site est clairement commercial, recherche des signaux publics liés à ce positionnement.",
      "L’audit vérifie des éléments directement observables : titres, meta descriptions, structure des titres, appels à l’action, capture de leads, analytics, données structurées, configuration mobile et profondeur du contenu. Le score reste volontairement transparent : il décrit les fondamentaux échantillonnés et ne prédit ni revenus ni taux de conversion.",
      "Pour un site commercial, le scanner construit des recherches à partir du positionnement et des thèmes détectés. Il recherche ensuite des conversations d’acheteurs, problèmes, concurrents, mentions d’avis et opportunités de contenu. Les résultats doivent passer des filtres de pertinence et conservent leurs URL sources.",
      "Zéro peut être le bon résultat. Les fournisseurs de recherche publics peuvent limiter les requêtes automatisées, et certains marchés offrent peu de conversations publiques pertinentes. Le rapport préfère donc une section vide à une liste de résultats génériques ou trompeurs.",
      "Le plan d’action part du crawl réel. Il peut recommander des données structurées, davantage de preuve, un meilleur parcours de conversion, plus de clarté sur le prix ou des pages qui répondent aux objections. Chaque amélioration explique aussi pourquoi elle compte et comment elle peut soutenir l’acquisition de clients.",
      "Ce scan est utile avant une refonte, un projet SEO, une campagne payante, un travail de conversion ou une révision du positionnement. Il permet de distinguer les fondations déjà solides des améliorations réellement prioritaires.",
      "Ouvrez le [Websiteli Market Scan gratuit](/en/market-scan/), saisissez une URL publique et lancez l’analyse. Le service est disponible en anglais, allemand, français, italien et espagnol.",
    ],
    faqs:[
      {question:"Le Websiteli Market Scan est-il gratuit ?",answer:"Oui. Il peut être lancé sans carte bancaire ni compte."},
      {question:"Que vérifie le Market Scan ?",answer:"Il vérifie les fondamentaux du site et, pour les sites commerciaux, peut rechercher des signaux publics de marché filtrés."},
      {question:"Le Market Scan invente-t-il des recommandations avec l’IA ?",answer:"Non. Les recommandations viennent de contrôles observables et du profil détecté. Les résultats externes sont filtrés et sourcés lorsque possible."},
      {question:"Pourquoi le rapport peut-il afficher zéro signal ?",answer:"Les sources publiques peuvent ne renvoyer aucun résultat pertinent ou limiter les requêtes automatisées. Le scanner préfère zéro à des données peu fiables."},
      {question:"Puis-je analyser le site public d’un concurrent ?",answer:"Oui, si le site est publiquement accessible en HTTP ou HTTPS. Les adresses privées ou locales sont bloquées."},
    ],
  }),
  it: makeTranslation("it", {
    title: "Analisi gratuita sito & Market Scan: SEO, concorrenti e segnali d’acquisto da una URL",
    description: "Websiteli Market Scan analizza un sito pubblico, controlla fondamentali SEO e conversione e ricerca concorrenti, segnali d’acquisto, recensioni e opportunità di contenuto pertinenti.",
    category: "Strategia web",
    tags:["audit sito gratuito","analisi sito web","analisi di mercato","analisi concorrenti","segnali d'acquisto","audit SEO","conversion audit","Websiteli Market Scan"],
    readingTime:"8 min di lettura",audience:"Piccole imprese, founder, marketer e proprietari di siti che vogliono una revisione rapida e verificabile",excerpt:"Inserisci una URL pubblica per ottenere diagnosi del sito, miglioramenti prioritari, segnali di mercato e fonti verificabili.",
    summary:["Il Market Scan combina un crawl live con ricerca pubblica di mercato.","La diagnosi verifica titoli, descrizioni, struttura, CTA, lead capture, analytics, dati strutturati, mobile e profondità dei contenuti.","I siti commerciali possono ricevere segnali d’acquisto, concorrenti, discussioni, recensioni e opportunità di contenuto filtrati.","I risultati esterni mantengono i link alle fonti.","Una sezione vuota è preferita a dati irrilevanti."],
    takeaways:["Usa lo scan prima di spendere di più in traffico.","Il punteggio è diagnostico, non una previsione di ricavi.","Verifica i segnali esterni tramite le fonti.","Usa le priorità per decidere cosa migliorare prima.","Avvia gratuitamente il Market Scan su Websiteli."],
    headings:["Cos’è il Websiteli Market Scan?","Cosa controlla l’analisi del sito","Come funziona la ricerca di mercato","Perché il report può mostrare zero segnali d’acquisto","Come vengono create le raccomandazioni","Quando questo audit è utile","Come avviare il Market Scan gratuito"],
    paragraphs:[
      "Websiteli Market Scan è uno strumento gratuito per analizzare sito e mercato. Inserisci una URL pubblica. Il tool esplora pagine rilevanti, controlla fondamentali osservabili, rileva il posizionamento e, quando il sito è chiaramente commerciale, ricerca segnali pubblici collegati a quel posizionamento.",
      "L’audit verifica elementi osservabili: titoli, meta description, struttura degli heading, call to action, lead capture, analytics, dati strutturati, configurazione mobile e profondità dei contenuti. Il punteggio descrive questi fondamentali e non pretende di prevedere ricavi o tasso di conversione.",
      "Per i siti commerciali, lo scanner crea ricerche dai temi e dal posizionamento rilevati. Cerca conversazioni degli acquirenti, problemi, concorrenti, menzioni di recensioni e opportunità di contenuto. I risultati devono superare filtri di rilevanza e conservano i link alle fonti.",
      "Zero può essere il risultato corretto. I provider pubblici possono applicare rate limit e alcuni mercati hanno poche conversazioni pubbliche rilevanti. Websiteli evita quindi di riempire il report con directory, articoli generici o aziende non pertinenti.",
      "Il piano d’azione parte dai dati del crawl. Può suggerire dati strutturati, prove più forti, un percorso di conversione più chiaro, maggiore trasparenza su prezzo o scope e pagine per rispondere alle obiezioni. Ogni miglioramento spiega anche perché conta e come può aiutare a generare clienti.",
      "Questo scan è utile prima di un redesign, di un progetto SEO, di campagne a pagamento, di ottimizzazione conversioni o di un lavoro sul posizionamento. Aiuta a distinguere ciò che è già solido dalle opportunità prioritarie.",
      "Apri il [Websiteli Market Scan gratuito](/en/market-scan/), inserisci una URL pubblica e avvia l’analisi. È disponibile in inglese, tedesco, francese, italiano e spagnolo.",
    ],
    faqs:[
      {question:"Il Websiteli Market Scan è gratuito?",answer:"Sì. Puoi avviarlo senza carta di credito o account."},
      {question:"Cosa analizza il Market Scan?",answer:"Controlla i fondamentali del sito e, per siti commerciali, può ricercare segnali pubblici di mercato filtrati."},
      {question:"Il Market Scan inventa raccomandazioni con l’AI?",answer:"No. Le raccomandazioni derivano da controlli osservabili e dal profilo del sito; i risultati esterni vengono filtrati e collegati alle fonti quando possibile."},
      {question:"Perché il report può mostrare zero segnali?",answer:"Le fonti pubbliche possono non restituire risultati pertinenti o limitare le richieste automatizzate. Il tool preferisce zero a evidenze deboli."},
      {question:"Posso analizzare il sito pubblico di un concorrente?",answer:"Sì, se è accessibile pubblicamente tramite HTTP o HTTPS. Gli indirizzi privati e locali sono bloccati."},
    ],
  }),
  es: makeTranslation("es", {
    title: "Análisis gratis de web & Market Scan: SEO, competidores y señales de compra desde una URL",
    description: "Websiteli Market Scan analiza una web pública, revisa fundamentos SEO y conversión y busca competidores, señales de compra, reseñas y oportunidades de contenido relevantes.",
    category:"Estrategia web",
    tags:["auditoría web gratis","análisis web","análisis de mercado","análisis de competidores","señales de compra","auditoría SEO","auditoría conversión","Websiteli Market Scan"],
    readingTime:"8 min de lectura",audience:"Pequeñas empresas, fundadores, marketers y propietarios de webs que quieren una revisión rápida y verificable",excerpt:"Introduce una URL pública para obtener diagnóstico web, mejoras prioritarias, señales de mercado y fuentes verificables.",
    summary:["El Market Scan combina un rastreo web en directo con investigación pública de mercado.","El diagnóstico revisa títulos, descripciones, estructura, CTA, captación de leads, analítica, datos estructurados, móvil y profundidad de contenido.","Las webs comerciales pueden recibir señales de compra, competidores, conversaciones, reseñas y oportunidades de contenido filtradas.","Los resultados externos conservan enlaces a las fuentes.","Se prefiere una sección vacía a datos irrelevantes."],
    takeaways:["Usa el análisis antes de invertir más en tráfico.","La puntuación es diagnóstica, no una predicción de ingresos.","Comprueba los hallazgos externos mediante las fuentes.","Usa las prioridades para decidir qué mejorar primero.","Ejecuta gratis el Market Scan de Websiteli."],
    headings:["¿Qué es Websiteli Market Scan?","Qué revisa el análisis de la web","Cómo funciona la investigación de mercado","Por qué el informe puede mostrar cero señales de compra","Cómo se crean las recomendaciones","Cuándo es útil esta auditoría web","Cómo ejecutar tu Market Scan gratis"],
    paragraphs:[
      "Websiteli Market Scan es una herramienta gratuita de análisis web y de mercado. Introduces una URL pública. El sistema rastrea varias páginas relevantes, revisa fundamentos observables, detecta el posicionamiento y, cuando la web es claramente comercial, investiga señales públicas relacionadas con ese posicionamiento.",
      "La auditoría revisa elementos observables: títulos, meta descriptions, estructura de encabezados, llamadas a la acción, captación de leads, analítica, datos estructurados, configuración móvil y profundidad de contenido. La puntuación describe estos fundamentos y no pretende predecir ingresos o tasa de conversión.",
      "Para webs comerciales, el escáner crea consultas a partir del posicionamiento y los temas detectados. Después busca conversaciones de compradores, problemas, competidores, menciones de reseñas y oportunidades de contenido. Los resultados deben superar filtros de relevancia y conservan sus enlaces de origen.",
      "Cero puede ser el resultado correcto. Los proveedores de búsqueda pública pueden limitar solicitudes automatizadas y algunos mercados tienen pocas conversaciones relevantes. Por eso Websiteli evita llenar el informe con directorios, artículos genéricos o empresas que no encajan.",
      "El plan de acción parte del rastreo real. Puede recomendar datos estructurados, más prueba social, un camino de conversión más claro, mayor transparencia sobre precio o alcance y páginas que respondan objeciones. Cada mejora explica también por qué importa y cómo puede ayudar a conseguir clientes.",
      "El análisis es útil antes de un rediseño, proyecto SEO, publicidad pagada, optimización de conversiones o revisión del posicionamiento. Ayuda a separar lo que ya funciona de lo que merece atención prioritaria.",
      "Abre el [Websiteli Market Scan gratis](/en/market-scan/), introduce una URL pública y ejecuta el análisis. Está disponible en inglés, alemán, francés, italiano y español.",
    ],
    faqs:[
      {question:"¿Websiteli Market Scan es gratis?",answer:"Sí. Puedes ejecutarlo sin tarjeta de crédito ni cuenta."},
      {question:"¿Qué analiza Market Scan?",answer:"Revisa fundamentos de la web y, en webs comerciales, puede investigar señales públicas de mercado filtradas."},
      {question:"¿Market Scan inventa recomendaciones con IA?",answer:"No. Las recomendaciones derivan de controles observables y del perfil detectado; los hallazgos externos se filtran y se enlazan a sus fuentes cuando es posible."},
      {question:"¿Por qué el informe puede mostrar cero señales?",answer:"Las fuentes públicas pueden no devolver resultados relevantes o limitar solicitudes automatizadas. El escáner prefiere cero a evidencia débil."},
      {question:"¿Puedo analizar la web pública de un competidor?",answer:"Sí, si es accesible públicamente por HTTP o HTTPS. Las direcciones privadas y locales están bloqueadas."},
    ],
  }),
};

const post: BlogPostSource = {
  slug: "free-website-market-scan",
  status: "published",
  published: true,
  image: "/assets/blog/free-website-market-scan.webp",
  socialImage: "/assets/blog/free-website-market-scan.webp",
  imageAlt: "Websiteli Market Scan: website diagnosis, buyer signals, competitors and content opportunities from one URL",
  author: "Websiteli",
  date: "2026-09-23",
  updated: "2026-09-23",
  related: ["website-before-paid-ads-checklist", "small-business-lead-generation-funnel", "website-lead-qualification"],
  translations,
};

export default post;
