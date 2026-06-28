import { localeCodes, type LocaleCode } from "./locales";

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
  related: string[];
  faqs?: { question: string; answer: string }[];
  body: { heading: string; paragraphs: string[]; list?: string[] }[];
};


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

const enPost: BlogPost = {
  slug: "why-ai-generated-websites-are-not-enough-for-a-real-business",
  title: "Why AI-generated websites are not enough for a real business",
  description:
    "AI can speed up website planning and prototypes, but real businesses still need ownership, SEO foundations, analytics, performance, integrations and maintainable code.",
  category: "Website Strategy",
  tags: ["AI websites", "business website", "SEO", "ownership", "automation"],
  featuredImage: "/assets/swiss-ai-websites-hero.png",
  author: "Websiteli",
  publishedAt: "2026-06-26",
  updatedAt: "2026-06-26",
  readingTime: "8 min read",
  audience: "Small business owners, consultants, restaurants and local service providers",
  excerpt:
    "AI is useful for speed, ideas and prototypes. The risk starts when a business does not own the domain, hosting, source code, analytics or search setup behind the website.",
  headings: [
    "AI is a tool, not a business foundation",
    "Where AI-generated websites help",
    "Where they fall short",
    "What every business should own",
    "How Websiteli uses AI responsibly",
  ],
  related: ["/en/services-pricing/", "/en/services-pricing/", "/en/portfolio/#live-demos", "/en/contact/"],
  body: [
    {
      heading: "AI is a tool, not a business foundation",
      paragraphs: [
        "AI-generated websites are useful. They can turn a blank page into a draft, help structure a landing page, suggest copy, generate layout ideas and speed up early prototypes. For a small business owner, that can feel like magic because the first visible version appears quickly.",
        "The problem is not AI. The problem is treating a fast draft as a finished business asset. A real business website has to be owned, measurable, searchable, maintainable and connected to the way customers actually contact you.",
      ],
    },
    {
      heading: "Where AI-generated websites help",
      paragraphs: [
        "AI is strongest at speed and exploration. It can help you compare page structures, write a first service description, generate image ideas, test headlines and clarify what a visitor needs to understand in the first few seconds.",
        "It is also excellent for prototypes. If you need to show a restaurant booking flow, a consultant portfolio, a local service quote form or a dashboard concept, AI can shorten the distance from idea to first version.",
      ],
      list: ["Fast first drafts", "Visual inspiration", "Prototype pages", "Content outlines", "Alternative headlines and calls to action"],
    },
    {
      heading: "Where they fall short",
      paragraphs: [
        "Most business risk appears after the first draft. Who owns the domain? Where is the site hosted? Can you move it later? Can a developer edit the source code? Is the site fast on mobile? Is Google Search Console connected? Are contact forms tracked? Can the website integrate with booking, newsletter, CRM, analytics or automation tools?",
        "A website that looks acceptable but is hard to maintain can become expensive later. Vendor lock-in, weak SEO structure, poor Core Web Vitals, limited analytics and difficult customization all reduce the value of the website as a long-term business asset.",
      ],
      list: [
        "Unclear domain, hosting or code ownership",
        "Vendor lock-in",
        "Thin SEO metadata and weak heading structure",
        "Poor performance on mobile",
        "Difficult maintenance and customization",
        "Limited analytics and conversion tracking",
        "Hard integrations with booking, CRM, newsletter or ads",
      ],
    },
    {
      heading: "What every business should own",
      paragraphs: [
        "A serious website should belong to the business, not to a tool account that is hard to leave. Ownership gives you leverage: you can change providers, improve SEO, add integrations, keep analytics history and continue developing the asset over time.",
      ],
      list: [
        "Domain ownership",
        "Hosting ownership",
        "Source code ownership",
        "Google Analytics and Google Search Console access",
        "Google Business Profile access",
        "Website images, copy and brand assets",
        "Form submissions, lead data and conversion events",
      ],
    },
    {
      heading: "How Websiteli uses AI responsibly",
      paragraphs: [
        "Websiteli uses AI to work faster, explore options and reduce unnecessary manual work. We do not use it as a substitute for ownership, technical setup, SEO foundations or business reasoning.",
        "The goal is simple: every website should be practical, search-friendly, fast, measurable and 100% owned by the client. AI helps us move faster, but the final website remains a real business asset.",
      ],
    },
    {
      heading: "A better next step",
      paragraphs: [
        "If you already have an AI-generated website, the next question is not whether it looks good. The question is whether it can bring customers, prove results and grow with your business. A short website audit can reveal missing ownership, SEO, analytics, performance and conversion foundations before they become expensive problems.",
      ],
    },
  ],
  faqs: [
    {
      question: "Are AI-generated websites bad for business?",
      answer:
        "No. AI-generated drafts can be useful, but they should be turned into a maintainable business website with proper ownership, SEO, analytics, performance and conversion tracking.",
    },
    {
      question: "What should I check before using an AI website builder?",
      answer:
        "Check domain ownership, hosting access, source code access, analytics, Google Search Console, mobile performance, SEO metadata, form tracking and whether the website can integrate with your business tools.",
    },
  ],
};

type LocalizedPostCopy = Pick<BlogPost, "title" | "description" | "category" | "tags" | "readingTime" | "audience" | "excerpt" | "headings" | "body" | "faqs">;

const localizedPostCopy: Record<LocaleCode, LocalizedPostCopy> = {
  en: {
    title: enPost.title,
    description: enPost.description,
    category: enPost.category,
    tags: enPost.tags,
    readingTime: enPost.readingTime,
    audience: enPost.audience,
    excerpt: enPost.excerpt,
    headings: enPost.headings,
    body: enPost.body,
    faqs: enPost.faqs,
  },
  de: {
    title: "Warum KI-generierte Websites für ein echtes Unternehmen nicht genug sind",
    description:
      "KI kann Planung und Prototypen beschleunigen. Unternehmen brauchen trotzdem Eigentum, SEO-Grundlagen, Analytics, Performance, Integrationen und wartbaren Code.",
    category: "Website-Strategie",
    tags: ["KI-Websites", "Business-Website", "SEO", "Eigentum", "Automatisierung"],
    readingTime: "8 Min. Lesezeit",
    audience: "KMU, Berater, Restaurants und lokale Dienstleister",
    excerpt:
      "KI ist hilfreich für Tempo, Ideen und Prototypen. Riskant wird es, wenn Domain, Hosting, Code, Analytics oder Suchmaschinen-Setup nicht dem Unternehmen gehören.",
    headings: ["KI ist ein Werkzeug, kein Fundament", "Wo KI-Websites helfen", "Wo sie zu kurz greifen", "Was jedes Unternehmen besitzen sollte", "Wie Websiteli KI verantwortungsvoll nutzt"],
    body: enPost.body.map((section, index) => ({
      heading: ["KI ist ein Werkzeug, kein Fundament", "Wo KI-Websites helfen", "Wo sie zu kurz greifen", "Was jedes Unternehmen besitzen sollte", "Wie Websiteli KI verantwortungsvoll nutzt", "Der bessere nächste Schritt"][index],
      paragraphs: [
        "KI kann sehr schnell aus einer Idee einen ersten Entwurf machen. Für ein Unternehmen ist dieser Entwurf aber erst der Anfang, nicht das fertige digitale Asset.",
        "Entscheidend sind Eigentum, Suchmaschinen-Grundlagen, Ladezeit, messbare Anfragen und die Möglichkeit, den Auftritt später sauber weiterzuentwickeln.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "Sind KI-generierte Websites schlecht?", answer: "Nein. Sie sind gute Entwürfe, müssen aber zu einer wartbaren Website mit Eigentum, SEO, Analytics und Tracking ausgebaut werden." },
      { question: "Was sollte ich prüfen?", answer: "Prüfen Sie Domain, Hosting, Codezugang, Analytics, Search Console, mobile Performance, SEO-Metadaten, Formulartracking und Integrationen." },
    ],
  },
  hu: {
    title: "Miért nem elég egy AI által generált weboldal egy valódi vállalkozásnak",
    description:
      "Az AI gyorsítja a tervezést és a prototípusokat, de egy vállalkozásnak tulajdonjogra, SEO alapokra, analitikára, teljesítményre, integrációkra és karbantartható kódra is szüksége van.",
    category: "Weboldal stratégia",
    tags: ["AI weboldalak", "céges weboldal", "SEO", "tulajdonjog", "automatizálás"],
    readingTime: "8 perc olvasás",
    audience: "Kisvállalkozások, tanácsadók, éttermek és helyi szolgáltatók",
    excerpt:
      "Az AI gyors és hasznos. A kockázat ott kezdődik, amikor a domain, tárhely, forráskód, analitika vagy keresőoptimalizálás nem a vállalkozás kontrollja alatt van.",
    headings: ["Az AI eszköz, nem üzleti alap", "Miben segít az AI", "Hol kevés önmagában", "Mit kell birtokolnia a vállalkozásnak", "Hogyan használja a Websiteli felelősen az AI-t"],
    body: enPost.body.map((section, index) => ({
      heading: ["Az AI eszköz, nem üzleti alap", "Miben segít az AI", "Hol kevés önmagában", "Mit kell birtokolnia a vállalkozásnak", "Hogyan használja a Websiteli felelősen az AI-t", "Jobb következő lépés"][index],
      paragraphs: [
        "Az AI gyorsan készít első verziót, szövegötletet és oldalstruktúrát. Egy céges weboldalnál ez csak kiindulópont.",
        "A valódi értéket a tulajdonjog, a mérhetőség, a kereshetőség, a gyors betöltés és a későbbi fejleszthetőség adja.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "Rossz választás az AI weboldal?", answer: "Nem, ha prototípusként kezeljük. Üzleti weboldalként viszont szükséges a tulajdonjog, SEO, analitika és konverziómérés." },
      { question: "Mit érdemes ellenőrizni?", answer: "Domain, tárhely, forráskód, Analytics, Search Console, mobil teljesítmény, SEO metaadatok, űrlapkövetés és integrációk." },
    ],
  },
  pl: {
    title: "Dlaczego strony generowane przez AI nie wystarczą prawdziwej firmie",
    description:
      "AI przyspiesza planowanie i prototypy, ale firma nadal potrzebuje własności, SEO, analityki, wydajności, integracji i kodu możliwego do utrzymania.",
    category: "Strategia strony",
    tags: ["strony AI", "strona firmowa", "SEO", "własność", "automatyzacja"],
    readingTime: "8 min czytania",
    audience: "Małe firmy, konsultanci, restauracje i lokalne usługi",
    excerpt:
      "AI pomaga szybko zacząć. Ryzyko pojawia się, gdy domena, hosting, kod, analityka lub konfiguracja SEO nie są pod kontrolą firmy.",
    headings: ["AI to narzędzie, nie fundament", "Gdzie AI pomaga", "Gdzie nie wystarcza", "Co firma powinna posiadać", "Jak Websiteli używa AI odpowiedzialnie"],
    body: enPost.body.map((section, index) => ({
      heading: ["AI to narzędzie, nie fundament", "Gdzie AI pomaga", "Gdzie nie wystarcza", "Co firma powinna posiadać", "Jak Websiteli używa AI odpowiedzialnie", "Lepszy następny krok"][index],
      paragraphs: [
        "AI szybko tworzy pierwszą wersję strony, teksty i pomysły na układ. Dla firmy to dopiero początek pracy.",
        "Profesjonalna strona musi być własnością firmy, być mierzalna, szybka, widoczna w Google i możliwa do rozbudowy.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "Czy strony AI są złe?", answer: "Nie. Są dobre jako szkic, ale finalna strona powinna mieć własność, SEO, analitykę i tracking konwersji." },
      { question: "Co sprawdzić przed wyborem narzędzia?", answer: "Domenę, hosting, dostęp do kodu, Analytics, Search Console, wydajność mobilną, metadane SEO, formularze i integracje." },
    ],
  },
  es: {
    title: "Por qué las webs generadas con IA no bastan para un negocio real",
    description:
      "La IA acelera la planificación y los prototipos, pero un negocio necesita propiedad, SEO, analítica, rendimiento, integraciones y código mantenible.",
    category: "Estrategia web",
    tags: ["webs con IA", "web de negocio", "SEO", "propiedad", "automatización"],
    readingTime: "8 min de lectura",
    audience: "Pequeñas empresas, consultores, restaurantes y servicios locales",
    excerpt:
      "La IA sirve para avanzar rápido. El riesgo empieza cuando el dominio, hosting, código, analítica o SEO no quedan bajo control del negocio.",
    headings: ["La IA es una herramienta, no una base", "Dónde ayuda la IA", "Dónde se queda corta", "Qué debe poseer cada negocio", "Cómo Websiteli usa la IA con criterio"],
    body: enPost.body.map((section, index) => ({
      heading: ["La IA es una herramienta, no una base", "Dónde ayuda la IA", "Dónde se queda corta", "Qué debe poseer cada negocio", "Cómo Websiteli usa la IA con criterio", "Un mejor siguiente paso"][index],
      paragraphs: [
        "La IA puede crear un primer borrador, textos y estructuras en muy poco tiempo. Para una web de empresa, eso solo es el punto de partida.",
        "Lo importante es tener propiedad, medición, visibilidad en buscadores, buen rendimiento móvil y capacidad de crecer sin bloqueo de proveedor.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "¿Son malas las webs generadas con IA?", answer: "No. Son útiles como borrador, pero deben convertirse en una web mantenible con propiedad, SEO, analítica y seguimiento de conversiones." },
      { question: "¿Qué debo revisar?", answer: "Dominio, hosting, acceso al código, Analytics, Search Console, rendimiento móvil, metadatos SEO, tracking de formularios e integraciones." },
    ],
  },
  fr: {
    title: "Pourquoi les sites générés par IA ne suffisent pas à une vraie entreprise",
    description:
      "L'IA accélère la planification et les prototypes, mais une entreprise a besoin de propriété, SEO, analytics, performance, intégrations et code maintenable.",
    category: "Stratégie web",
    tags: ["sites IA", "site d'entreprise", "SEO", "propriété", "automatisation"],
    readingTime: "8 min de lecture",
    audience: "Petites entreprises, consultants, restaurants et services locaux",
    excerpt:
      "L'IA aide à aller vite. Le risque commence lorsque le domaine, l'hébergement, le code, les analytics ou le SEO ne sont pas sous le contrôle de l'entreprise.",
    headings: ["L'IA est un outil, pas une fondation", "Où l'IA aide", "Où elle ne suffit pas", "Ce que chaque entreprise doit posséder", "Comment Websiteli utilise l'IA responsablement"],
    body: enPost.body.map((section, index) => ({
      heading: ["L'IA est un outil, pas une fondation", "Où l'IA aide", "Où elle ne suffit pas", "Ce que chaque entreprise doit posséder", "Comment Websiteli utilise l'IA responsablement", "Une meilleure étape suivante"][index],
      paragraphs: [
        "L'IA peut créer rapidement une première version, des idées de contenu et une structure de page. Pour une entreprise, ce n'est que le début.",
        "La valeur vient de la propriété, de la mesure, du SEO, de la vitesse mobile et de la capacité à faire évoluer le site sans dépendance inutile.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "Les sites IA sont-ils mauvais?", answer: "Non. Ils sont utiles comme brouillon, mais le site final doit être maintenable, propriétaire, optimisé SEO et mesurable." },
      { question: "Que faut-il vérifier?", answer: "Domaine, hébergement, accès au code, Analytics, Search Console, performance mobile, métadonnées SEO, suivi des formulaires et intégrations." },
    ],
  },
  it: {
    title: "Perché i siti generati con AI non bastano a una vera azienda",
    description:
      "L'AI accelera pianificazione e prototipi, ma un'azienda ha bisogno di proprietà, SEO, analytics, performance, integrazioni e codice mantenibile.",
    category: "Strategia web",
    tags: ["siti AI", "sito aziendale", "SEO", "proprietà", "automazione"],
    readingTime: "8 min di lettura",
    audience: "Piccole imprese, consulenti, ristoranti e servizi locali",
    excerpt:
      "L'AI aiuta a partire velocemente. Il rischio nasce quando dominio, hosting, codice, analytics o SEO non restano sotto il controllo dell'azienda.",
    headings: ["L'AI è uno strumento, non una base", "Dove l'AI aiuta", "Dove non basta", "Cosa ogni azienda dovrebbe possedere", "Come Websiteli usa l'AI responsabilmente"],
    body: enPost.body.map((section, index) => ({
      heading: ["L'AI è uno strumento, non una base", "Dove l'AI aiuta", "Dove non basta", "Cosa ogni azienda dovrebbe possedere", "Come Websiteli usa l'AI responsabilmente", "Il prossimo passo migliore"][index],
      paragraphs: [
        "L'AI può creare rapidamente una bozza, testi e idee di layout. Per un sito aziendale, però, è solo l'inizio.",
        "Il valore reale arriva da proprietà, misurazione, SEO, velocità mobile e possibilità di far crescere il sito senza blocchi di fornitore.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "I siti AI sono una cattiva scelta?", answer: "No. Sono utili come bozza, ma il sito finale deve avere proprietà, SEO, analytics e tracciamento conversioni." },
      { question: "Cosa devo controllare?", answer: "Dominio, hosting, accesso al codice, Analytics, Search Console, performance mobile, metadata SEO, form tracking e integrazioni." },
    ],
  },
  cz: {
    title: "Proč weby generované AI nestačí pro skutečnou firmu",
    description:
      "AI zrychlí plánování a prototypy, ale firma potřebuje vlastnictví, SEO základy, analytiku, výkon, integrace a udržovatelný kód.",
    category: "Strategie webu",
    tags: ["AI weby", "firemní web", "SEO", "vlastnictví", "automatizace"],
    readingTime: "8 min čtení",
    audience: "Malé firmy, konzultanti, restaurace a lokální služby",
    excerpt:
      "AI pomáhá s rychlostí a nápady. Riziko začíná, když doména, hosting, kód, analytika nebo SEO nejsou pod kontrolou firmy.",
    headings: ["AI je nástroj, ne základ podnikání", "Kde AI pomáhá", "Kde nestačí", "Co by měla firma vlastnit", "Jak Websiteli používá AI zodpovědně"],
    body: enPost.body.map((section, index) => ({
      heading: ["AI je nástroj, ne základ podnikání", "Kde AI pomáhá", "Kde nestačí", "Co by měla firma vlastnit", "Jak Websiteli používá AI zodpovědně", "Lepší další krok"][index],
      paragraphs: [
        "AI dokáže rychle vytvořit první návrh, texty a strukturu stránky. U firemního webu je to ale jen začátek.",
        "Důležité je vlastnictví, měření, SEO, rychlost na mobilu a možnost web bezpečně rozvíjet bez uzamčení u dodavatele.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "Jsou AI weby špatné?", answer: "Ne. Jsou užitečné jako návrh, ale finální web musí mít vlastnictví, SEO, analytiku a měření konverzí." },
      { question: "Co mám zkontrolovat?", answer: "Doménu, hosting, přístup ke kódu, Analytics, Search Console, mobilní výkon, SEO metadata, sledování formulářů a integrace." },
    ],
  },
  sk: {
    title: "Prečo weby generované AI nestačia pre skutočnú firmu",
    description:
      "AI zrýchli plánovanie a prototypy, ale firma potrebuje vlastníctvo, SEO základy, analytiku, výkon, integrácie a udržiavateľný kód.",
    category: "Stratégia webu",
    tags: ["AI weby", "firemný web", "SEO", "vlastníctvo", "automatizácia"],
    readingTime: "8 min čítania",
    audience: "Malé firmy, konzultanti, reštaurácie a lokálne služby",
    excerpt:
      "AI pomáha s rýchlosťou a nápadmi. Riziko začína, keď doména, hosting, kód, analytika alebo SEO nie sú pod kontrolou firmy.",
    headings: ["AI je nástroj, nie základ podnikania", "Kde AI pomáha", "Kde nestačí", "Čo by mala firma vlastniť", "Ako Websiteli používa AI zodpovedne"],
    body: enPost.body.map((section, index) => ({
      heading: ["AI je nástroj, nie základ podnikania", "Kde AI pomáha", "Kde nestačí", "Čo by mala firma vlastniť", "Ako Websiteli používa AI zodpovedne", "Lepší ďalší krok"][index],
      paragraphs: [
        "AI dokáže rýchlo vytvoriť prvý návrh, texty a štruktúru stránky. Pri firemnom webe je to však iba začiatok.",
        "Dôležité je vlastníctvo, meranie, SEO, rýchlosť na mobile a možnosť web bezpečne rozvíjať bez závislosti od jedného nástroja.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "Sú AI weby zlé?", answer: "Nie. Sú užitočné ako návrh, ale finálny web musí mať vlastníctvo, SEO, analytiku a meranie konverzií." },
      { question: "Čo mám skontrolovať?", answer: "Doménu, hosting, prístup ku kódu, Analytics, Search Console, mobilný výkon, SEO metadáta, sledovanie formulárov a integrácie." },
    ],
  },
  pt: {
    title: "Porque sites gerados por IA não chegam para um negócio real",
    description:
      "A IA acelera planeamento e protótipos, mas um negócio precisa de propriedade, SEO, analytics, performance, integrações e código sustentável.",
    category: "Estratégia web",
    tags: ["sites IA", "site empresarial", "SEO", "propriedade", "automação"],
    readingTime: "8 min de leitura",
    audience: "Pequenas empresas, consultores, restaurantes e serviços locais",
    excerpt:
      "A IA ajuda a avançar depressa. O risco começa quando domínio, alojamento, código, analytics ou SEO não ficam sob controlo do negócio.",
    headings: ["A IA é uma ferramenta, não uma base", "Onde a IA ajuda", "Onde fica curta", "O que cada negócio deve possuir", "Como a Websiteli usa IA com responsabilidade"],
    body: enPost.body.map((section, index) => ({
      heading: ["A IA é uma ferramenta, não uma base", "Onde a IA ajuda", "Onde fica curta", "O que cada negócio deve possuir", "Como a Websiteli usa IA com responsabilidade", "Um melhor próximo passo"][index],
      paragraphs: [
        "A IA cria rapidamente uma primeira versão, textos e ideias de estrutura. Para um site empresarial, isso é apenas o início.",
        "O valor real está na propriedade, medição, SEO, velocidade móvel e capacidade de evoluir o site sem bloqueio de fornecedor.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "Sites com IA são maus?", answer: "Não. São úteis como rascunho, mas o site final precisa de propriedade, SEO, analytics e tracking de conversões." },
      { question: "O que devo verificar?", answer: "Domínio, alojamento, acesso ao código, Analytics, Search Console, performance móvel, metadados SEO, formulários e integrações." },
    ],
  },
  da: {
    title: "Hvorfor AI-genererede websites ikke er nok til en rigtig virksomhed",
    description:
      "AI kan fremskynde planlægning og prototyper, men en virksomhed har stadig brug for ejerskab, SEO, analytics, performance, integrationer og vedligeholdbar kode.",
    category: "Website-strategi",
    tags: ["AI websites", "virksomhedswebsite", "SEO", "ejerskab", "automatisering"],
    readingTime: "8 min læsning",
    audience: "Små virksomheder, konsulenter, restauranter og lokale services",
    excerpt:
      "AI er nyttigt til fart og ideer. Risikoen starter, når domæne, hosting, kode, analytics eller SEO ikke er under virksomhedens kontrol.",
    headings: ["AI er et værktøj, ikke et fundament", "Hvor AI hjælper", "Hvor det ikke er nok", "Hvad enhver virksomhed bør eje", "Sådan bruger Websiteli AI ansvarligt"],
    body: enPost.body.map((section, index) => ({
      heading: ["AI er et værktøj, ikke et fundament", "Hvor AI hjælper", "Hvor det ikke er nok", "Hvad enhver virksomhed bør eje", "Sådan bruger Websiteli AI ansvarligt", "Et bedre næste skridt"][index],
      paragraphs: [
        "AI kan hurtigt skabe et første udkast, tekster og sideideer. For et virksomhedswebsite er det kun begyndelsen.",
        "Den reelle værdi kommer fra ejerskab, måling, SEO, mobil hastighed og mulighed for at udvikle websitet uden leverandørlås.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "Er AI-websites dårlige?", answer: "Nej. De er nyttige som udkast, men det færdige website skal have ejerskab, SEO, analytics og konverteringssporing." },
      { question: "Hvad bør jeg tjekke?", answer: "Domæne, hosting, kodeadgang, Analytics, Search Console, mobil performance, SEO metadata, formularsporing og integrationer." },
    ],
  },
  nl: {
    title: "Waarom AI-gegenereerde websites niet genoeg zijn voor een echt bedrijf",
    description:
      "AI versnelt planning en prototypes, maar een bedrijf heeft eigendom, SEO, analytics, performance, integraties en onderhoudbare code nodig.",
    category: "Website-strategie",
    tags: ["AI websites", "bedrijfswebsite", "SEO", "eigendom", "automatisering"],
    readingTime: "8 min lezen",
    audience: "Kleine bedrijven, consultants, restaurants en lokale diensten",
    excerpt:
      "AI helpt met snelheid en ideeën. Het risico begint wanneer domein, hosting, code, analytics of SEO niet onder controle van het bedrijf staan.",
    headings: ["AI is een hulpmiddel, geen fundament", "Waar AI helpt", "Waar het tekortschiet", "Wat elk bedrijf zou moeten bezitten", "Hoe Websiteli AI verantwoord gebruikt"],
    body: enPost.body.map((section, index) => ({
      heading: ["AI is een hulpmiddel, geen fundament", "Waar AI helpt", "Waar het tekortschiet", "Wat elk bedrijf zou moeten bezitten", "Hoe Websiteli AI verantwoord gebruikt", "Een betere volgende stap"][index],
      paragraphs: [
        "AI kan snel een eerste versie, teksten en paginastuctuur maken. Voor een bedrijfswebsite is dat alleen het begin.",
        "Echte waarde komt uit eigendom, meetbaarheid, SEO, mobiele snelheid en de mogelijkheid om de site later uit te bouwen.",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "Zijn AI-websites slecht?", answer: "Nee. Ze zijn nuttig als concept, maar de uiteindelijke site moet eigendom, SEO, analytics en conversietracking hebben." },
      { question: "Wat moet ik controleren?", answer: "Domein, hosting, toegang tot code, Analytics, Search Console, mobiele performance, SEO metadata, formuliertracking en integraties." },
    ],
  },
  ja: {
    title: "AI生成サイトだけでは本物のビジネスに足りない理由",
    description:
      "AIは企画やプロトタイプを速くしますが、ビジネスには所有権、SEO基盤、分析、表示速度、連携、保守できるコードが必要です。",
    category: "Webサイト戦略",
    tags: ["AIサイト", "ビジネスサイト", "SEO", "所有権", "自動化"],
    readingTime: "約8分",
    audience: "小規模事業者、コンサルタント、飲食店、地域サービス",
    excerpt:
      "AIはスピードとアイデアに役立ちます。問題は、ドメイン、ホスティング、コード、分析、SEO設定を事業者が管理できない場合です。",
    headings: ["AIは土台ではなく道具", "AIが役立つ場面", "AIだけでは足りない点", "事業者が所有すべきもの", "Websiteliの責任あるAI活用"],
    body: enPost.body.map((section, index) => ({
      heading: ["AIは土台ではなく道具", "AIが役立つ場面", "AIだけでは足りない点", "事業者が所有すべきもの", "Websiteliの責任あるAI活用", "次に取るべき一歩"][index],
      paragraphs: [
        "AIは最初の案、文章、ページ構成をすばやく作れます。しかしビジネスサイトでは、それは出発点にすぎません。",
        "重要なのは所有権、計測、SEO、モバイル速度、将来の改善、そして問い合わせや予約につながる仕組みです。",
      ],
      list: section.list,
    })),
    faqs: [
      { question: "AI生成サイトは悪い選択ですか？", answer: "いいえ。下書きとしては有用ですが、完成サイトには所有権、SEO、分析、コンバージョン計測が必要です。" },
      { question: "何を確認すべきですか？", answer: "ドメイン、ホスティング、コードアクセス、Analytics、Search Console、モバイル速度、SEOメタデータ、フォーム計測、外部連携です。" },
    ],
  },
};

const blogPostsByLocale = Object.fromEntries(
  localeCodes.map((locale) => [
    locale,
    [
      {
        ...enPost,
        ...localizedPostCopy[locale],
      },
    ],
  ]),
) as Record<LocaleCode, BlogPost[]>;


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

export function getBlogPosts(locale: LocaleCode) {
  return blogPostsByLocale[locale] ?? [];
}

export function getBlogPost(locale: LocaleCode, slug: string) {
  return getBlogPosts(locale).find((post) => post.slug === slug);
}


export function getMarketKeywords() {
  return marketKeywords;
}
