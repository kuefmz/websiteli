import type { BlogPostSource, BlogPostTranslation } from "../types";

const references = [
  {
    publisher: "Baymard Institute",
    title: "Cart Abandonment Rate Statistics",
    href: "https://baymard.com/lists/cart-abandonment-rate",
  },
  {
    publisher: "DataReportal",
    title: "Global Digital Overview",
    href: "https://datareportal.com/global-digital-overview",
  },
  {
    publisher: "Google Search Central",
    title: "Creating helpful, reliable, people-first content",
    href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
  },
  {
    publisher: "HTTP Archive Web Almanac",
    title: "Page Weight 2025",
    href: "https://almanac.httparchive.org/en/2025/page-weight",
  },
  {
    publisher: "Nielsen Norman Group",
    title: "How Long Do Users Stay on Web Pages?",
    href: "https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/",
  },
  {
    publisher: "Stanford Web Credibility Research",
    title: "Web Credibility Guidelines",
    href: "https://credibility.stanford.edu/guidelines/index.html",
  },
  {
    publisher: "StatCounter",
    title: "Search Engine Market Share Worldwide",
    href: "https://gs.statcounter.com/search-engine-market-share",
  },
  {
    publisher: "Think with Google",
    title: "Mobile Page Speed New Industry Benchmarks",
    href: "https://business.google.com/ca-en/think/marketing-strategies/mobile-page-speed-new-industry-benchmarks/",
  },
  {
    publisher: "Think with Google",
    title: "Mobile Site Speed Playbook",
    href: "https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf",
  },
  {
    publisher: "W3Techs",
    title: "Usage Statistics of WordPress",
    href: "https://w3techs.com/technologies/details/cm-wordpress",
  },
  {
    publisher: "WebAIM",
    title: "The WebAIM Million",
    href: "https://webaim.org/projects/million/",
  },
];

type SuccessCopy = Omit<BlogPostTranslation, "summary" | "keyTakeaways" | "chatGptPrompts" | "faqs" | "references" | "body"> & {
  summary: string[];
  takeaways: string[];
  prompts: string[];
  faq: {
    why: string;
    whyAnswer: string;
    speed: string;
    speedAnswer: string;
    seo: string;
    seoAnswer: string;
    check: string;
    checkAnswer: string;
    report: string;
    reportAnswer: string;
  };
  headings: {
    short: string;
    data: string;
    clarity: string;
    trust: string;
    mobile: string;
    search: string;
    accessibility: string;
    platform: string;
    friction: string;
    checklist: string;
    report: string;
    conclusion: string;
  };
  paragraphs: {
    short: string;
    data: string;
    clarity: string;
    trust: string;
    mobile: string;
    search: string;
    accessibility: string;
    platform: string;
    friction: string;
    checklistIntro: string;
    report: string;
    conclusion: string;
  };
  checklist: string[];
};

const translations: BlogPostSource["translations"] = {
  en: makeSuccessTranslation({
    title: "Why Some Business Websites Get Customers While Others Don't",
    description: "A research-backed guide explaining why some business websites generate enquiries and sales while others lose visitors.",
    category: "Website Strategy",
    tags: ["business website", "website conversion", "website statistics", "website trust", "website speed", "mobile website", "SEO statistics", "accessibility", "small business website"],
    language: "en",
    readingTime: "10 min read",
    audience: "Small business owners who want their website to generate more enquiries and customers",
    excerpt: "A website that gets customers is clear, trustworthy, fast, mobile-friendly, searchable, accessible, and easy to act on. The data shows where weak sites lose people.",
    summary: [
      "Visitors decide quickly whether a website is worth their attention, so the offer and next step must be clear immediately.",
      "Trust signals, contact details, proof, and professional design help people feel safe before they contact a business.",
      "Mobile usability and speed affect whether visitors stay, especially because DataReportal reports that 96.2% of internet users use mobile phones to go online at least some of the time.",
      "Search still matters: StatCounter reported Google at 91.27% worldwide search share in June 2026.",
      "The complete Website Success Report remains a lead magnet for readers who want the full checklist and research pack.",
    ],
    takeaways: [
      "Answer what you offer, who it is for, and what to do next within seconds.",
      "Treat speed as a business issue because slow pages lose visitors before they can convert.",
      "Design and test mobile first.",
      "Use structured, helpful content for SEO, AI search, and real customer questions.",
      "Accessibility, forms, and calls to action are conversion factors.",
      "Use the report CTA to turn high-intent readers into subscribers.",
    ],
    prompts: [
      "Review my homepage copy and tell me whether a first-time visitor can understand my offer quickly.",
      "Create a website trust checklist for my small business based on this article.",
      "Rewrite my service page so it is clearer, more SEO-friendly, and more likely to convert visitors into enquiries.",
      "Give me a short audit checklist for mobile usability, speed, trust, SEO, accessibility, and conversion.",
    ],
    faq: {
      why: "Why do some business websites get more customers than others?",
      whyAnswer: "The best-performing business websites combine clear messaging, trust signals, fast loading, mobile usability, SEO-friendly structure, accessible design, and an obvious call to action.",
      speed: "Does website speed really affect customers?",
      speedAnswer: "Yes. Google found that 53% of mobile site visits are abandoned when pages take longer than three seconds to load.",
      seo: "Is SEO still important with AI search?",
      seoAnswer: "Yes. AI search changes discovery, but clear, structured, helpful website content remains essential for search engines, AI tools, and customers.",
      check: "What should I check first if my website is not getting enquiries?",
      checkAnswer: "Start with the headline, call to action, mobile experience, page speed, contact details, trust signals, service page structure, accessibility, and form friction.",
      report: "Why does this article offer a complete report by signup?",
      reportAnswer: "The public article gives the key findings. The complete report gives interested readers a practical checklist and deeper source pack in exchange for joining the email list.",
    },
    headings: {
      short: "The short answer",
      data: "Executive summary",
      clarity: "1. Clear websites keep attention longer",
      trust: "2. Trust is built before the first conversation",
      mobile: "3. Mobile experience and speed shape the journey",
      search: "4. Search visibility still matters, but discovery is changing",
      accessibility: "5. Accessibility is a customer experience issue",
      platform: "6. Website builders are common, but strategy still matters",
      friction: "7. Forms and checkout flows lose people when they create friction",
      checklist: "The Websiteli website success checklist",
      report: "Download the complete research report",
      conclusion: "Conclusion",
    },
    paragraphs: {
      short: "Some business websites get customers because they make the next step obvious. They explain the offer quickly, build trust, load fast, work on mobile, and make it easy to contact the business. Nielsen Norman Group explains that users often leave pages within 10-20 seconds unless the value proposition is clear quickly.",
      data: "The verified data points in this guide are practical: Google found that 53% of mobile site visits are abandoned after more than three seconds; DataReportal reported 6.12 billion internet users at the start of April 2026; WebAIM found detectable WCAG failures on 95.9% of the top one million home pages in 2026; Baymard reports an average cart abandonment rate of 70.22%.",
      clarity: "Visitors usually ask: what do you offer, is it relevant to me, and what should I do next? A stronger website answers those questions in plain language before the visitor has to hunt.",
      trust: "Stanford's Web Credibility Guidelines emphasize clear contact information, a real organization behind the site, easy verification, and professional design. Small businesses need these signals because many visitors do not know the brand yet.",
      mobile: "Mobile is central to discovery and buying. DataReportal reports that 96.2% of internet users use a mobile phone to go online at least some of the time, and Google reports that bounce probability rises 123% as mobile load time goes from one to ten seconds. HTTP Archive found the median 2025 home page was 2.86 MB on desktop and 2.56 MB on mobile, with images taking the largest share of bytes.",
      search: "Google held 91.27% worldwide search engine market share in June 2026. Search is also changing through AI summaries and answer engines, so the safest response is clear, specific, helpful content that answers real customer questions and uses sensible structure.",
      accessibility: "Accessibility removes friction for more people. WebAIM's 2026 Million found detectable WCAG failures on 95.9% of home pages. Low contrast, missing alt text, unlabeled forms, empty links, and unclear buttons are not only compliance issues; they make conversion harder.",
      platform: "W3Techs reported in July 2026 that WordPress is used by 41.5% of all websites and 59.2% of websites with a known CMS. Tools are common, but tools do not replace strategy. A website still needs message, structure, performance, trust, SEO, and conversion planning.",
      friction: "Baymard reports an average documented cart abandonment rate of 70.22%. Service businesses can lose people in the same way through long contact forms, unclear pricing, surprise steps, weak confirmation messages, or missing trust near the form.",
      checklistIntro: "Use this quick checklist to review your own website.",
      report: "This article is the public version. The complete Websiteli Website Success Report includes the deeper source pack, a full audit checklist, and practical prompts for improving your website.",
      conclusion: "Some websites get customers because they make it easy to understand, trust, and contact the business. Others lose customers through doubt, delay, confusion, or friction. The fix is not decoration; it is clarity, speed, trust, accessibility, search structure, and a better next step.",
    },
    checklist: [
      "Can a visitor understand your offer quickly?",
      "Is the main call to action visible on mobile and desktop?",
      "Are contact details and trust signals easy to find?",
      "Do important pages load quickly and use compressed images?",
      "Does each important service have its own useful content?",
      "Are forms short, labeled, and clear about what happens next?",
    ],
  }, true),
  de: makeSuccessTranslation(localizedSuccessCopy("de", {
    title: "Warum manche Business-Websites Kunden gewinnen und andere nicht",
    description: "Ein recherchierter Leitfaden dazu, warum einige Unternehmenswebsites Anfragen und Verkäufe erzeugen, während andere Besucher verlieren.",
    category: "Website-Strategie",
    tags: ["Business-Website", "Website-Conversion", "Website-Statistiken", "Website-Vertrauen", "Website-Geschwindigkeit", "mobile Website", "SEO-Statistiken", "Barrierefreiheit", "KMU-Website"],
    readingTime: "10 Min. Lesezeit",
    audience: "Kleine Unternehmen, die mit ihrer Website mehr Anfragen und Kunden gewinnen möchten",
    excerpt: "Eine Website, die Kunden gewinnt, ist klar, vertrauenswürdig, schnell, mobilfreundlich, auffindbar, zugänglich und handlungsorientiert.",
    localeName: "German",
  })),
  hu: makeSuccessTranslation(localizedSuccessCopy("hu", {
    title: "Miért hoz ügyfeleket néhány céges weboldal, míg mások nem",
    description: "Kutatásokra épülő útmutató arról, miért hoznak egyes céges weboldalak érdeklődőket és eladásokat, mások pedig elveszítik a látogatókat.",
    category: "Weboldal stratégia",
    tags: ["céges weboldal", "weboldal konverzió", "weboldal statisztikák", "weboldal bizalom", "weboldal sebesség", "mobil weboldal", "SEO statisztikák", "akadálymentesség", "kisvállalati weboldal"],
    readingTime: "10 perc olvasás",
    audience: "Kisvállalkozók, akik több érdeklődőt és ügyfelet szeretnének a weboldalukból",
    excerpt: "Az ügyfeleket hozó weboldal érthető, megbízható, gyors, mobilbarát, kereshető, hozzáférhető és könnyű rajta cselekedni.",
    localeName: "Hungarian",
  })),
  pl: makeSuccessTranslation(localizedSuccessCopy("pl", {
    title: "Dlaczego jedne strony firmowe zdobywają klientów, a inne nie",
    description: "Przewodnik oparty na źródłach pokazujący, dlaczego niektóre strony generują zapytania i sprzedaż, a inne tracą odwiedzających.",
    category: "Strategia strony",
    tags: ["strona firmowa", "konwersja strony", "statystyki stron", "zaufanie do strony", "szybkość strony", "strona mobilna", "statystyki SEO", "dostępność", "strona małej firmy"],
    readingTime: "10 min czytania",
    audience: "Właściciele małych firm, którzy chcą więcej zapytań i klientów ze strony",
    excerpt: "Strona zdobywająca klientów jest jasna, wiarygodna, szybka, mobilna, widoczna, dostępna i ułatwia działanie.",
    localeName: "Polish",
  })),
  es: makeSuccessTranslation(localizedSuccessCopy("es", {
    title: "Por qué algunas webs de negocio consiguen clientes y otras no",
    description: "Guía respaldada por investigación sobre por qué algunas webs generan consultas y ventas mientras otras pierden visitantes.",
    category: "Estrategia web",
    tags: ["web de negocio", "conversión web", "estadísticas web", "confianza web", "velocidad web", "web móvil", "estadísticas SEO", "accesibilidad", "web de pequeña empresa"],
    readingTime: "10 min de lectura",
    audience: "Pequeñas empresas que quieren más consultas y clientes desde su web",
    excerpt: "Una web que consigue clientes es clara, fiable, rápida, móvil, visible, accesible y fácil de usar.",
    localeName: "Spanish",
  })),
  fr: makeSuccessTranslation(localizedSuccessCopy("fr", {
    title: "Pourquoi certains sites d'entreprise gagnent des clients et d'autres non",
    description: "Guide sourcé expliquant pourquoi certains sites génèrent des demandes et ventes tandis que d'autres perdent des visiteurs.",
    category: "Stratégie web",
    tags: ["site d'entreprise", "conversion site web", "statistiques site web", "confiance web", "vitesse site", "site mobile", "statistiques SEO", "accessibilité", "site petite entreprise"],
    readingTime: "10 min de lecture",
    audience: "Petites entreprises qui veulent générer plus de demandes et clients avec leur site",
    excerpt: "Un site qui gagne des clients est clair, crédible, rapide, mobile, trouvable, accessible et facile à utiliser.",
    localeName: "French",
  })),
  it: makeSuccessTranslation(localizedSuccessCopy("it", {
    title: "Perché alcuni siti aziendali ottengono clienti e altri no",
    description: "Guida basata su ricerca sul perché alcuni siti generano contatti e vendite mentre altri perdono visitatori.",
    category: "Strategia web",
    tags: ["sito aziendale", "conversione sito", "statistiche siti", "fiducia sito", "velocità sito", "sito mobile", "statistiche SEO", "accessibilità", "sito piccola impresa"],
    readingTime: "10 min di lettura",
    audience: "Piccole imprese che vogliono più richieste e clienti dal sito",
    excerpt: "Un sito che porta clienti è chiaro, affidabile, veloce, mobile, trovabile, accessibile e facile da usare.",
    localeName: "Italian",
  })),
  cz: makeSuccessTranslation(localizedSuccessCopy("cz", {
    title: "Proč některé firemní weby získávají zákazníky a jiné ne",
    description: "Výzkumem podložený průvodce tím, proč některé weby přinášejí poptávky a prodeje, zatímco jiné ztrácejí návštěvníky.",
    category: "Webová strategie",
    tags: ["firemní web", "konverze webu", "statistiky webů", "důvěra na webu", "rychlost webu", "mobilní web", "SEO statistiky", "přístupnost", "web malé firmy"],
    readingTime: "10 min čtení",
    audience: "Malé firmy, které chtějí z webu více poptávek a zákazníků",
    excerpt: "Web, který získává zákazníky, je jasný, důvěryhodný, rychlý, mobilní, dohledatelný, přístupný a snadno použitelný.",
    localeName: "Czech",
  })),
  sk: makeSuccessTranslation(localizedSuccessCopy("sk", {
    title: "Prečo niektoré firemné weby získavajú zákazníkov a iné nie",
    description: "Výskumom podložený sprievodca tým, prečo niektoré weby prinášajú dopyty a predaje, zatiaľ čo iné strácajú návštevníkov.",
    category: "Webová stratégia",
    tags: ["firemný web", "konverzia webu", "štatistiky webov", "dôvera na webe", "rýchlosť webu", "mobilný web", "SEO štatistiky", "prístupnosť", "web malej firmy"],
    readingTime: "10 min čítania",
    audience: "Malé firmy, ktoré chcú z webu viac dopytov a zákazníkov",
    excerpt: "Web, ktorý získava zákazníkov, je jasný, dôveryhodný, rýchly, mobilný, vyhľadateľný, prístupný a ľahko použiteľný.",
    localeName: "Slovak",
  })),
  pt: makeSuccessTranslation(localizedSuccessCopy("pt", {
    title: "Porque alguns sites empresariais conseguem clientes e outros não",
    description: "Guia apoiado por investigação sobre porque alguns sites geram contactos e vendas enquanto outros perdem visitantes.",
    category: "Estratégia de site",
    tags: ["site empresarial", "conversão de site", "estatísticas de sites", "confiança no site", "velocidade do site", "site mobile", "estatísticas SEO", "acessibilidade", "site pequena empresa"],
    readingTime: "10 min de leitura",
    audience: "Pequenas empresas que querem mais contactos e clientes a partir do site",
    excerpt: "Um site que consegue clientes é claro, confiável, rápido, mobile, encontrável, acessível e fácil de usar.",
    localeName: "Portuguese",
  })),
  da: makeSuccessTranslation(localizedSuccessCopy("da", {
    title: "Hvorfor nogle virksomhedswebsites får kunder, og andre ikke gør",
    description: "Researchbaseret guide til hvorfor nogle websites skaber henvendelser og salg, mens andre mister besøgende.",
    category: "Websitestrategi",
    tags: ["virksomhedswebsite", "websitekonvertering", "websitestatistik", "websitetillid", "websitehastighed", "mobilt website", "SEO-statistik", "tilgængelighed", "website til mindre virksomhed"],
    readingTime: "10 min læsning",
    audience: "Mindre virksomheder, der vil have flere henvendelser og kunder fra websitet",
    excerpt: "Et website, der får kunder, er klart, troværdigt, hurtigt, mobilvenligt, søgbart, tilgængeligt og nemt at handle på.",
    localeName: "Danish",
  })),
  nl: makeSuccessTranslation(localizedSuccessCopy("nl", {
    title: "Waarom sommige bedrijfswebsites klanten opleveren en andere niet",
    description: "Onderbouwde gids over waarom sommige websites aanvragen en omzet opleveren terwijl andere bezoekers verliezen.",
    category: "Websitestrategie",
    tags: ["bedrijfswebsite", "websiteconversie", "websitestatistieken", "websitevertrouwen", "websitesnelheid", "mobiele website", "SEO-statistieken", "toegankelijkheid", "website klein bedrijf"],
    readingTime: "10 min lezen",
    audience: "Kleine bedrijven die meer aanvragen en klanten uit hun website willen halen",
    excerpt: "Een website die klanten oplevert is duidelijk, betrouwbaar, snel, mobiel, vindbaar, toegankelijk en makkelijk om actie op te nemen.",
    localeName: "Dutch",
  })),
  ja: makeSuccessTranslation(localizedSuccessCopy("ja", {
    title: "顧客を獲得するビジネスサイトとそうでないサイトの違い",
    description: "なぜ一部のビジネスサイトは問い合わせや売上につながり、他は訪問者を失うのかを調査データに基づいて解説します。",
    category: "ウェブサイト戦略",
    tags: ["ビジネスサイト", "サイトコンバージョン", "ウェブサイト統計", "サイトの信頼", "サイト速度", "モバイルサイト", "SEO統計", "アクセシビリティ", "小規模事業サイト"],
    readingTime: "10分で読めます",
    audience: "ウェブサイトから問い合わせと顧客を増やしたい小規模事業者",
    excerpt: "顧客を獲得するサイトは、明確で、信頼でき、速く、モバイル対応で、見つけやすく、使いやすいサイトです。",
    localeName: "Japanese",
  })),
};

function localizedSuccessCopy(
  language: BlogPostTranslation["language"],
  base: Pick<SuccessCopy, "title" | "description" | "category" | "tags" | "readingTime" | "audience" | "excerpt"> & { localeName: string },
): SuccessCopy {
  const localized = {
    de: {
      summary: ["Besucher entscheiden schnell, ob die Website relevant ist.", "Vertrauen, Geschwindigkeit, mobile Nutzung, SEO, Barrierefreiheit und einfache Kontaktwege bestimmen die Ergebnisse.", "Der vollständige Report bleibt ein sinnvoller Lead Magnet."],
      takeaways: ["Machen Sie Angebot und nächsten Schritt sofort klar.", "Behandeln Sie Geschwindigkeit als Geschäftsthema.", "Testen Sie zuerst mobil.", "Nutzen Sie hilfreiche, strukturierte Inhalte.", "Reduzieren Sie Reibung in Formularen."],
      prompts: [`Prüfe meine Startseite anhand von "${base.title}".`, "Erstelle eine Vertrauens-Checkliste für meine Website.", "Schreibe meine Serviceseite klarer und konversionsstärker."],
      why: "Warum gewinnen manche Websites mehr Kunden?", whyAnswer: "Weil sie Klarheit, Vertrauen, Geschwindigkeit, mobile Nutzbarkeit, SEO-Struktur, Barrierefreiheit und klare CTAs verbinden.",
      speed: "Beeinflusst Website-Geschwindigkeit Kunden?", speedAnswer: "Ja. Google fand, dass 53% mobiler Besuche abgebrochen werden, wenn Seiten länger als drei Sekunden laden.",
      seo: "Ist SEO mit KI-Suche noch wichtig?", seoAnswer: "Ja. KI verändert Entdeckung, aber klare, hilfreiche und strukturierte Inhalte bleiben wichtig.",
      check: "Was sollte ich zuerst prüfen?", checkAnswer: "Headline, CTA, mobile Ansicht, Geschwindigkeit, Kontaktdaten, Vertrauenssignale, Barrierefreiheit und Formularlänge.",
      report: "Warum gibt es den Report per Anmeldung?", reportAnswer: "Der Artikel zeigt die Kernpunkte. Der Report liefert Checkliste, Quellenpaket und praktische Prompts.",
      headings: ["Die kurze Antwort", "Executive Summary", "1. Klare Websites halten Aufmerksamkeit", "2. Vertrauen entsteht vor dem ersten Gespräch", "3. Mobile Nutzung und Geschwindigkeit prägen die Reise", "4. Suche bleibt wichtig", "5. Barrierefreiheit ist Kundenerlebnis", "6. Tools ersetzen keine Strategie", "7. Formulare verlieren Menschen bei Reibung", "Websiteli Website-Erfolgscheckliste", "Vollständigen Research Report herunterladen", "Fazit"],
      paragraphs: ["Manche Websites gewinnen Kunden, weil sie den nächsten Schritt sichtbar machen.", "Die Daten zeigen: Menschen entscheiden schnell, mobile Nutzung dominiert, Geschwindigkeit kostet Besucher und Barrierefreiheit bleibt eine große Lücke.", "Beantworten Sie sofort: Was bieten Sie, für wen ist es, was passiert als Nächstes?", "Kontaktinformationen, echte Belege, klare Organisation und professionelles Design reduzieren Zweifel.", "Mobile und Performance entscheiden oft, ob Besucher bleiben.", "Google dominiert Suche weiter, während KI-Suche strukturierte und hilfreiche Inhalte noch wichtiger macht.", "Barrierefreiheit entfernt Reibung für mehr Menschen.", "WordPress und Builder sind verbreitet, aber Strategie entscheidet.", "Lange oder unklare Formulare verlieren Interessenten wie schlechte Checkouts.", "Nutzen Sie diese Liste für eine schnelle Prüfung.", "Der vollständige Report enthält Quellen, Checkliste und Prompts.", "Kunden entstehen durch Klarheit, Vertrauen, Tempo und eine einfache nächste Handlung."],
      checklist: ["Ist das Angebot sofort verständlich?", "Ist der CTA sichtbar?", "Sind Kontakt und Vertrauen leicht zu finden?", "Lädt die Seite schnell?", "Hat jede Leistung klare Inhalte?", "Sind Formulare kurz und beschriftet?"],
    },
    hu: {
      summary: ["A látogatók gyorsan döntenek a relevanciáról.", "A bizalom, sebesség, mobilélmény, SEO, akadálymentesség és egyszerű kapcsolatfelvétel határozza meg az eredményt.", "A teljes riport továbbra is lead magnetként működik."],
      takeaways: ["Az ajánlat és a következő lépés legyen azonnal egyértelmű.", "A sebesség üzleti kérdés.", "Mobilon tesztelj először.", "Használj hasznos, strukturált tartalmat.", "Csökkentsd az űrlapok súrlódását."],
      prompts: [`Vizsgáld át a főoldalamat a(z) "${base.title}" alapján.`, "Készíts weboldal-bizalmi checklistát.", "Írd át a szolgáltatásoldalamat érthetőbbre és konverziósabbra."],
      why: "Miért hoznak egyes weboldalak több ügyfelet?", whyAnswer: "Mert ötvözik az érthető üzenetet, bizalmi jeleket, gyorsaságot, mobil használhatóságot, SEO-szerkezetet, akadálymentességet és világos CTA-t.",
      speed: "Tényleg számít a sebesség?", speedAnswer: "Igen. A Google szerint a mobil látogatások 53%-a megszakad, ha az oldal három másodpercnél lassabb.",
      seo: "Fontos még a SEO az AI keresés mellett?", seoAnswer: "Igen. Az AI változtat a felfedezésen, de az érthető, hasznos és strukturált tartalom továbbra is fontos.",
      check: "Mit ellenőrizzek először?", checkAnswer: "Címsor, CTA, mobilnézet, sebesség, elérhetőség, bizalmi jelek, akadálymentesség és űrlaphossz.",
      report: "Miért feliratkozással érhető el a riport?", reportAnswer: "A cikk a fő tanulságokat adja, a riport részletes checklistát, forrásokat és promptokat.",
      headings: ["Rövid válasz", "Vezetői összefoglaló", "1. A világos weboldalak tovább tartják a figyelmet", "2. A bizalom az első beszélgetés előtt épül", "3. A mobil és a sebesség alakítja az utat", "4. A kereshetőség továbbra is fontos", "5. Az akadálymentesség ügyfélélmény", "6. Az eszközök nem helyettesítik a stratégiát", "7. Az űrlapok súrlódásnál elveszítik az embereket", "Websiteli weboldal-siker checklist", "Teljes kutatási riport letöltése", "Összegzés"],
      paragraphs: ["Egyes weboldalak ügyfelet hoznak, mert egyértelművé teszik a következő lépést.", "Az adatok szerint gyors döntések, mobilhasználat, sebesség és akadálymentesség számítanak.", "Azonnal válaszolj: mit kínálsz, kinek, mi legyen a következő lépés?", "Az elérhetőség, valós bizonyítékok és profi megjelenés csökkenti a kételyt.", "A mobil és a teljesítmény gyakran eldönti, hogy marad-e a látogató.", "A Google továbbra is domináns, az AI keresés pedig még fontosabbá teszi a strukturált tartalmat.", "Az akadálymentesség több embernek csökkenti a súrlódást.", "A platform hasznos, de a stratégia dönt.", "A hosszú vagy zavaros űrlapok elveszíthetik az érdeklődőt.", "Használd gyors auditként.", "A teljes riport forrásokat, checklistát és promptokat ad.", "Az ügyfélszerzés kulcsa az érthetőség, bizalom, gyorsaság és könnyű cselekvés."],
      checklist: ["Érthető az ajánlat?", "Látható a CTA?", "Könnyen megtalálható a kapcsolat és a bizalom?", "Gyors az oldal?", "Minden szolgáltatásnak van hasznos tartalma?", "Rövidek és címkézettek az űrlapok?"],
    },
    pl: {
      summary: ["Odwiedzający szybko oceniają, czy strona jest dla nich.", "Zaufanie, szybkość, mobile, SEO, dostępność i prosty kontakt decydują o wynikach.", "Pełny raport działa jako lead magnet."],
      takeaways: ["Wyjaśnij ofertę i kolejny krok od razu.", "Traktuj szybkość jak temat biznesowy.", "Najpierw testuj mobile.", "Twórz pomocne, uporządkowane treści.", "Zmniejsz tarcie w formularzach."],
      prompts: [`Oceń moją stronę główną według "${base.title}".`, "Stwórz checklistę zaufania dla mojej strony.", "Przepisz stronę usługi, aby była jaśniejsza i lepiej konwertowała."],
      why: "Dlaczego jedne strony zdobywają więcej klientów?", whyAnswer: "Łączą jasny przekaz, zaufanie, szybkość, mobile, strukturę SEO, dostępność i wyraźne CTA.",
      speed: "Czy szybkość strony wpływa na klientów?", speedAnswer: "Tak. Google ustalił, że 53% wizyt mobilnych jest porzucanych, gdy ładowanie trwa ponad trzy sekundy.",
      seo: "Czy SEO nadal jest ważne przy wyszukiwaniu AI?", seoAnswer: "Tak. AI zmienia odkrywanie treści, ale jasna i pomocna struktura pozostaje ważna.",
      check: "Co sprawdzić najpierw?", checkAnswer: "Nagłówek, CTA, mobile, szybkość, kontakt, zaufanie, dostępność i formularze.",
      report: "Dlaczego raport jest po zapisie?", reportAnswer: "Artykuł daje kluczowe wnioski, a raport checklistę, źródła i prompty.",
      headings: ["Krótka odpowiedź", "Podsumowanie", "1. Jasne strony dłużej utrzymują uwagę", "2. Zaufanie buduje się przed rozmową", "3. Mobile i szybkość kształtują ścieżkę", "4. Widoczność w wyszukiwarce nadal ma znaczenie", "5. Dostępność to doświadczenie klienta", "6. Narzędzia nie zastąpią strategii", "7. Formularze tracą ludzi przez tarcie", "Checklista sukcesu strony Websiteli", "Pobierz pełny raport badawczy", "Wniosek"],
      paragraphs: ["Niektóre strony zdobywają klientów, bo od razu pokazują kolejny krok.", "Dane pokazują szybkie decyzje, znaczenie mobile, prędkości i dostępności.", "Odpowiedz od razu: co oferujesz, komu i co dalej?", "Kontakt, dowody i profesjonalny wygląd zmniejszają niepewność.", "Mobile i wydajność często decydują o pozostaniu na stronie.", "Google nadal dominuje, a AI wymaga jeszcze jaśniejszych treści.", "Dostępność zmniejsza tarcie dla większej liczby osób.", "Platforma pomaga, ale strategia decyduje.", "Długie i niejasne formularze tracą zainteresowanych.", "Użyj listy jako szybkiego audytu.", "Pełny raport zawiera źródła, checklistę i prompty.", "Klienci pojawiają się tam, gdzie jest jasność, zaufanie, szybkość i prosty krok."],
      checklist: ["Czy oferta jest jasna?", "Czy CTA jest widoczne?", "Czy kontakt i zaufanie są łatwe do znalezienia?", "Czy strona jest szybka?", "Czy usługi mają użyteczne treści?", "Czy formularze są krótkie i opisane?"],
    },
    es: {
      summary: ["Los visitantes deciden rápido si la web es relevante.", "Confianza, velocidad, móvil, SEO, accesibilidad y contacto sencillo influyen en los resultados.", "El informe completo funciona como lead magnet."],
      takeaways: ["Aclara la oferta y el siguiente paso desde el inicio.", "Trata la velocidad como un tema de negocio.", "Prueba primero en móvil.", "Usa contenido útil y estructurado.", "Reduce la fricción en formularios."],
      prompts: [`Revisa mi portada según "${base.title}".`, "Crea una checklist de confianza para mi web.", "Reescribe mi página de servicios para que sea más clara y convierta mejor."],
      why: "¿Por qué algunas webs consiguen más clientes?", whyAnswer: "Porque combinan mensaje claro, confianza, velocidad, móvil, estructura SEO, accesibilidad y llamadas a la acción visibles.",
      speed: "¿La velocidad afecta a los clientes?", speedAnswer: "Sí. Google encontró que el 53% de las visitas móviles se abandonan si la página tarda más de tres segundos.",
      seo: "¿El SEO sigue siendo importante con la búsqueda con IA?", seoAnswer: "Sí. La IA cambia el descubrimiento, pero el contenido claro, útil y estructurado sigue siendo esencial.",
      check: "¿Qué debo revisar primero?", checkAnswer: "Titular, CTA, móvil, velocidad, contacto, señales de confianza, accesibilidad y formularios.",
      report: "¿Por qué el informe se entrega por registro?", reportAnswer: "El artículo da los hallazgos principales; el informe añade checklist, fuentes y prompts prácticos.",
      headings: ["Respuesta breve", "Resumen ejecutivo", "1. Las webs claras retienen más atención", "2. La confianza se crea antes del primer contacto", "3. Móvil y velocidad moldean el recorrido", "4. La visibilidad en búsqueda sigue importando", "5. La accesibilidad es experiencia de cliente", "6. Las herramientas no sustituyen la estrategia", "7. Los formularios pierden personas cuando crean fricción", "Checklist de éxito web de Websiteli", "Descargar el informe completo", "Conclusión"],
      paragraphs: ["Algunas webs consiguen clientes porque hacen evidente el siguiente paso.", "Los datos muestran decisiones rápidas, peso del móvil, importancia de velocidad y brechas de accesibilidad.", "Responde de inmediato: qué ofreces, para quién y qué debe hacer la persona después.", "Contacto claro, pruebas reales y diseño profesional reducen dudas.", "La experiencia móvil y el rendimiento deciden si muchas personas se quedan.", "Google sigue dominando la búsqueda y la IA exige contenido más claro y estructurado.", "La accesibilidad reduce fricción para más personas.", "La plataforma ayuda, pero la estrategia decide el resultado.", "Los formularios largos o confusos pueden perder usuarios interesados.", "Usa esta lista como auditoría rápida.", "El informe completo incluye fuentes, checklist y prompts.", "Los clientes llegan cuando hay claridad, confianza, velocidad y un siguiente paso sencillo."],
      checklist: ["¿La oferta se entiende rápido?", "¿El CTA está visible?", "¿Contacto y confianza son fáciles de encontrar?", "¿La página es rápida?", "¿Cada servicio tiene contenido útil?", "¿Los formularios son cortos y claros?"],
    },
    fr: {
      summary: ["Les visiteurs décident vite si le site est pertinent.", "Confiance, vitesse, mobile, SEO, accessibilité et contact simple influencent les résultats.", "Le rapport complet reste un bon lead magnet."],
      takeaways: ["Clarifiez l'offre et l'étape suivante tout de suite.", "Traitez la vitesse comme un sujet business.", "Testez d'abord sur mobile.", "Utilisez du contenu utile et structuré.", "Réduisez la friction des formulaires."],
      prompts: [`Analyse ma page d'accueil selon "${base.title}".`, "Crée une checklist de confiance pour mon site.", "Réécris ma page service pour plus de clarté et de conversion."],
      why: "Pourquoi certains sites gagnent-ils plus de clients ?", whyAnswer: "Ils combinent message clair, confiance, vitesse, mobile, structure SEO, accessibilité et CTA visible.",
      speed: "La vitesse influence-t-elle les clients ?", speedAnswer: "Oui. Google a constaté que 53% des visites mobiles sont abandonnées si la page met plus de trois secondes à charger.",
      seo: "Le SEO reste-t-il important avec la recherche IA ?", seoAnswer: "Oui. L'IA change la découverte, mais un contenu clair, utile et structuré reste essentiel.",
      check: "Que vérifier en premier ?", checkAnswer: "Titre, CTA, mobile, vitesse, contact, preuves de confiance, accessibilité et formulaires.",
      report: "Pourquoi le rapport est-il proposé après inscription ?", reportAnswer: "L'article donne les points clés; le rapport ajoute checklist, sources et prompts pratiques.",
      headings: ["Réponse courte", "Résumé exécutif", "1. Les sites clairs retiennent l'attention", "2. La confiance se construit avant le premier contact", "3. Mobile et vitesse façonnent le parcours", "4. La visibilité de recherche compte encore", "5. L'accessibilité est une expérience client", "6. Les outils ne remplacent pas la stratégie", "7. Les formulaires perdent des personnes quand ils créent de la friction", "Checklist de réussite Websiteli", "Télécharger le rapport complet", "Conclusion"],
      paragraphs: ["Certains sites gagnent des clients parce qu'ils rendent l'étape suivante évidente.", "Les données montrent des décisions rapides, l'importance du mobile, de la vitesse et de l'accessibilité.", "Répondez vite: que proposez-vous, pour qui et quelle est la suite?", "Contact clair, preuves réelles et design professionnel réduisent le doute.", "L'expérience mobile et la performance décident souvent si les visiteurs restent.", "Google domine toujours la recherche et l'IA rend le contenu structuré encore plus important.", "L'accessibilité réduit la friction pour plus de personnes.", "La plateforme aide, mais la stratégie décide.", "Les formulaires longs ou confus peuvent faire perdre des prospects.", "Utilisez cette liste comme audit rapide.", "Le rapport complet inclut sources, checklist et prompts.", "Les clients viennent avec clarté, confiance, vitesse et étape suivante simple."],
      checklist: ["L'offre est-elle claire rapidement?", "Le CTA est-il visible?", "Contact et confiance sont-ils faciles à trouver?", "La page est-elle rapide?", "Chaque service a-t-il un contenu utile?", "Les formulaires sont-ils courts et clairs?"],
    },
    it: {
      summary: ["I visitatori decidono in fretta se il sito è rilevante.", "Fiducia, velocità, mobile, SEO, accessibilità e contatto semplice influenzano i risultati.", "Il report completo resta un lead magnet utile."],
      takeaways: ["Chiarisci subito offerta e passo successivo.", "Tratta la velocità come tema business.", "Testa prima su mobile.", "Usa contenuti utili e strutturati.", "Riduci l'attrito nei form."],
      prompts: [`Analizza la mia homepage secondo "${base.title}".`, "Crea una checklist di fiducia per il mio sito.", "Riscrivi la pagina servizio per renderla più chiara e orientata alla conversione."],
      why: "Perché alcuni siti ottengono più clienti?", whyAnswer: "Perché uniscono messaggio chiaro, fiducia, velocità, mobile, struttura SEO, accessibilità e CTA visibili.",
      speed: "La velocità influenza i clienti?", speedAnswer: "Sì. Google ha rilevato che il 53% delle visite mobile viene abbandonato se la pagina impiega più di tre secondi.",
      seo: "La SEO conta ancora con la ricerca AI?", seoAnswer: "Sì. L'AI cambia la scoperta, ma contenuti chiari, utili e strutturati restano essenziali.",
      check: "Cosa controllare per primo?", checkAnswer: "Titolo, CTA, mobile, velocità, contatti, fiducia, accessibilità e form.",
      report: "Perché il report richiede l'iscrizione?", reportAnswer: "L'articolo offre i punti chiave; il report aggiunge checklist, fonti e prompt pratici.",
      headings: ["Risposta breve", "Executive summary", "1. I siti chiari mantengono l'attenzione", "2. La fiducia nasce prima del contatto", "3. Mobile e velocità guidano il percorso", "4. La visibilità in ricerca conta ancora", "5. L'accessibilità è esperienza cliente", "6. Gli strumenti non sostituiscono la strategia", "7. I form perdono persone quando creano attrito", "Checklist Websiteli per il successo del sito", "Scarica il report completo", "Conclusione"],
      paragraphs: ["Alcuni siti ottengono clienti perché rendono ovvio il passo successivo.", "I dati mostrano decisioni rapide, peso del mobile, velocità e accessibilità.", "Rispondi subito: cosa offri, per chi e cosa fare dopo.", "Contatti chiari, prove reali e design professionale riducono il dubbio.", "Esperienza mobile e performance decidono spesso se le persone restano.", "Google domina ancora la ricerca e l'AI rende più importanti i contenuti strutturati.", "L'accessibilità riduce attrito per più persone.", "La piattaforma aiuta, ma la strategia decide.", "Form lunghi o confusi possono perdere contatti interessati.", "Usa questa lista come audit rapido.", "Il report completo include fonti, checklist e prompt.", "I clienti arrivano da chiarezza, fiducia, velocità e passo semplice."],
      checklist: ["L'offerta è chiara subito?", "La CTA è visibile?", "Contatto e fiducia sono facili da trovare?", "La pagina è veloce?", "Ogni servizio ha contenuto utile?", "I form sono brevi e chiari?"],
    },
    cz: {
      summary: ["Návštěvníci rychle rozhodují, zda je web relevantní.", "Důvěra, rychlost, mobil, SEO, přístupnost a jednoduchý kontakt ovlivňují výsledky.", "Celý report funguje jako lead magnet."],
      takeaways: ["Hned vysvětlete nabídku a další krok.", "Berte rychlost jako obchodní téma.", "Testujte nejprve na mobilu.", "Používejte užitečný strukturovaný obsah.", "Snižte tření ve formulářích."],
      prompts: [`Zkontroluj mou homepage podle "${base.title}".`, "Vytvoř checklist důvěry pro můj web.", "Přepiš stránku služby, aby byla jasnější a lépe konvertovala."],
      why: "Proč některé weby získávají více zákazníků?", whyAnswer: "Protože kombinují jasné sdělení, důvěru, rychlost, mobil, SEO strukturu, přístupnost a viditelné CTA.",
      speed: "Ovlivňuje rychlost zákazníky?", speedAnswer: "Ano. Google zjistil, že 53% mobilních návštěv je opuštěno, pokud se stránka načítá déle než tři sekundy.",
      seo: "Je SEO důležité i s AI vyhledáváním?", seoAnswer: "Ano. AI mění objevování, ale jasný, užitečný a strukturovaný obsah zůstává důležitý.",
      check: "Co zkontrolovat nejdřív?", checkAnswer: "Nadpis, CTA, mobil, rychlost, kontakt, důvěru, přístupnost a formuláře.",
      report: "Proč je report za registrací?", reportAnswer: "Článek dává hlavní poznatky; report přidává checklist, zdroje a prompty.",
      headings: ["Krátká odpověď", "Shrnutí", "1. Jasné weby udrží pozornost", "2. Důvěra vzniká před kontaktem", "3. Mobil a rychlost určují cestu", "4. Vyhledatelnost je stále důležitá", "5. Přístupnost je zákaznická zkušenost", "6. Nástroje nenahradí strategii", "7. Formuláře ztrácejí lidi třením", "Checklist úspěchu webu Websiteli", "Stáhnout celý report", "Závěr"],
      paragraphs: ["Některé weby získávají zákazníky, protože ukazují jasný další krok.", "Data ukazují rychlá rozhodnutí, význam mobilu, rychlosti a přístupnosti.", "Odpovězte hned: co nabízíte, komu a co dál.", "Kontakt, důkazy a profesionální design snižují pochybnosti.", "Mobilní zkušenost a výkon často rozhodnou, zda lidé zůstanou.", "Google stále dominuje a AI vyžaduje jasnější strukturovaný obsah.", "Přístupnost snižuje tření pro více lidí.", "Platforma pomáhá, ale rozhoduje strategie.", "Dlouhé nebo nejasné formuláře ztrácejí zájemce.", "Použijte seznam jako rychlý audit.", "Celý report obsahuje zdroje, checklist a prompty.", "Zákazníci přicházejí díky jasnosti, důvěře, rychlosti a jednoduchému kroku."],
      checklist: ["Je nabídka rychle jasná?", "Je CTA viditelné?", "Jsou kontakt a důvěra snadno k nalezení?", "Je stránka rychlá?", "Má každá služba užitečný obsah?", "Jsou formuláře krátké a popsané?"],
    },
    sk: {
      summary: ["Návštevníci rýchlo rozhodujú, či je web relevantný.", "Dôvera, rýchlosť, mobil, SEO, prístupnosť a jednoduchý kontakt ovplyvňujú výsledky.", "Celý report funguje ako lead magnet."],
      takeaways: ["Hneď vysvetlite ponuku a ďalší krok.", "Berte rýchlosť ako obchodnú tému.", "Testujte najprv na mobile.", "Používajte užitočný štruktúrovaný obsah.", "Znížte trenie vo formulároch."],
      prompts: [`Skontroluj moju homepage podľa "${base.title}".`, "Vytvor checklist dôvery pre môj web.", "Prepíš stránku služby, aby bola jasnejšia a lepšie konvertovala."],
      why: "Prečo niektoré weby získavajú viac zákazníkov?", whyAnswer: "Pretože kombinujú jasné posolstvo, dôveru, rýchlosť, mobil, SEO štruktúru, prístupnosť a viditeľné CTA.",
      speed: "Ovplyvňuje rýchlosť zákazníkov?", speedAnswer: "Áno. Google zistil, že 53% mobilných návštev je opustených, ak sa stránka načítava dlhšie než tri sekundy.",
      seo: "Je SEO dôležité aj pri AI vyhľadávaní?", seoAnswer: "Áno. AI mení objavovanie, ale jasný, užitočný a štruktúrovaný obsah zostáva dôležitý.",
      check: "Čo skontrolovať najskôr?", checkAnswer: "Nadpis, CTA, mobil, rýchlosť, kontakt, dôveru, prístupnosť a formuláre.",
      report: "Prečo je report za registráciou?", reportAnswer: "Článok dáva hlavné poznatky; report pridáva checklist, zdroje a prompty.",
      headings: ["Krátka odpoveď", "Zhrnutie", "1. Jasné weby udržia pozornosť", "2. Dôvera vzniká pred kontaktom", "3. Mobil a rýchlosť určujú cestu", "4. Vyhľadateľnosť je stále dôležitá", "5. Prístupnosť je zákaznícka skúsenosť", "6. Nástroje nenahradia stratégiu", "7. Formuláre strácajú ľudí trením", "Checklist úspechu webu Websiteli", "Stiahnuť celý report", "Záver"],
      paragraphs: ["Niektoré weby získavajú zákazníkov, pretože ukazujú jasný ďalší krok.", "Dáta ukazujú rýchle rozhodnutia, význam mobilu, rýchlosti a prístupnosti.", "Odpovedzte hneď: čo ponúkate, komu a čo ďalej.", "Kontakt, dôkazy a profesionálny dizajn znižujú pochybnosti.", "Mobilná skúsenosť a výkon často rozhodnú, či ľudia zostanú.", "Google stále dominuje a AI vyžaduje jasnejší štruktúrovaný obsah.", "Prístupnosť znižuje trenie pre viac ľudí.", "Platforma pomáha, ale rozhoduje stratégia.", "Dlhé alebo nejasné formuláre strácajú záujemcov.", "Použite zoznam ako rýchly audit.", "Celý report obsahuje zdroje, checklist a prompty.", "Zákazníci prichádzajú vďaka jasnosti, dôvere, rýchlosti a jednoduchému kroku."],
      checklist: ["Je ponuka rýchlo jasná?", "Je CTA viditeľné?", "Sú kontakt a dôvera ľahko nájdené?", "Je stránka rýchla?", "Má každá služba užitočný obsah?", "Sú formuláre krátke a označené?"],
    },
    pt: {
      summary: ["Os visitantes decidem rapidamente se o site é relevante.", "Confiança, velocidade, mobile, SEO, acessibilidade e contacto simples moldam resultados.", "O relatório completo continua a ser um lead magnet."],
      takeaways: ["Mostre logo a oferta e o próximo passo.", "Trate a velocidade como tema de negócio.", "Teste primeiro no telemóvel.", "Use conteúdo útil e estruturado.", "Reduza fricção nos formulários."],
      prompts: [`Analisa a minha página inicial com base em "${base.title}".`, "Cria uma checklist de confiança para o meu site.", "Reescreve a página de serviço para ficar mais clara e converter melhor."],
      why: "Porque alguns sites conseguem mais clientes?", whyAnswer: "Porque combinam mensagem clara, confiança, velocidade, mobile, estrutura SEO, acessibilidade e CTA visível.",
      speed: "A velocidade afeta os clientes?", speedAnswer: "Sim. A Google concluiu que 53% das visitas mobile são abandonadas quando a página demora mais de três segundos.",
      seo: "O SEO ainda é importante com pesquisa por IA?", seoAnswer: "Sim. A IA muda a descoberta, mas conteúdo claro, útil e estruturado continua essencial.",
      check: "O que verificar primeiro?", checkAnswer: "Título, CTA, mobile, velocidade, contactos, confiança, acessibilidade e formulários.",
      report: "Porque o relatório exige inscrição?", reportAnswer: "O artigo dá os pontos principais; o relatório acrescenta checklist, fontes e prompts práticos.",
      headings: ["Resposta curta", "Resumo executivo", "1. Sites claros mantêm atenção", "2. A confiança nasce antes do contacto", "3. Mobile e velocidade moldam a jornada", "4. A visibilidade na pesquisa ainda importa", "5. A acessibilidade é experiência do cliente", "6. Ferramentas não substituem estratégia", "7. Formulários perdem pessoas quando criam fricção", "Checklist de sucesso Websiteli", "Descarregar o relatório completo", "Conclusão"],
      paragraphs: ["Alguns sites conseguem clientes porque tornam óbvio o próximo passo.", "Os dados mostram decisões rápidas, importância do mobile, velocidade e acessibilidade.", "Responda logo: o que oferece, para quem e qual o próximo passo.", "Contacto claro, provas reais e design profissional reduzem dúvidas.", "Experiência mobile e performance decidem muitas vezes se a pessoa fica.", "A Google continua dominante e a IA torna o conteúdo estruturado ainda mais importante.", "A acessibilidade reduz fricção para mais pessoas.", "A plataforma ajuda, mas a estratégia decide.", "Formulários longos ou confusos perdem interessados.", "Use a lista como auditoria rápida.", "O relatório completo inclui fontes, checklist e prompts.", "Clientes surgem com clareza, confiança, velocidade e próximo passo simples."],
      checklist: ["A oferta é clara depressa?", "O CTA está visível?", "Contactos e confiança são fáceis de encontrar?", "A página é rápida?", "Cada serviço tem conteúdo útil?", "Os formulários são curtos e claros?"],
    },
    da: {
      summary: ["Besøgende beslutter hurtigt, om websitet er relevant.", "Tillid, hastighed, mobil, SEO, tilgængelighed og enkel kontakt påvirker resultaterne.", "Den fulde rapport fungerer som lead magnet."],
      takeaways: ["Gør tilbud og næste skridt tydeligt med det samme.", "Behandl hastighed som et forretningstema.", "Test først på mobil.", "Brug hjælpsomt, struktureret indhold.", "Reducer friktion i formularer."],
      prompts: [`Gennemgå min forside ud fra "${base.title}".`, "Lav en tillidstjekliste for mit website.", "Omskriv min serviceside, så den er klarere og konverterer bedre."],
      why: "Hvorfor får nogle websites flere kunder?", whyAnswer: "Fordi de kombinerer klart budskab, tillid, hastighed, mobilbrug, SEO-struktur, tilgængelighed og synlige CTA'er.",
      speed: "Påvirker hastighed kunder?", speedAnswer: "Ja. Google fandt, at 53% af mobile besøg opgives, hvis siden loader i mere end tre sekunder.",
      seo: "Er SEO stadig vigtigt med AI-søgning?", seoAnswer: "Ja. AI ændrer opdagelse, men klart, hjælpsomt og struktureret indhold er stadig vigtigt.",
      check: "Hvad skal jeg tjekke først?", checkAnswer: "Overskrift, CTA, mobil, hastighed, kontakt, tillid, tilgængelighed og formularer.",
      report: "Hvorfor kræver rapporten tilmelding?", reportAnswer: "Artiklen giver hovedpunkter; rapporten tilføjer tjekliste, kilder og praktiske prompts.",
      headings: ["Kort svar", "Executive summary", "1. Klare websites holder opmærksomhed", "2. Tillid skabes før kontakt", "3. Mobil og hastighed former rejsen", "4. Søgesynlighed betyder stadig noget", "5. Tilgængelighed er kundeoplevelse", "6. Værktøjer erstatter ikke strategi", "7. Formularer mister folk ved friktion", "Websiteli website-success tjekliste", "Download den fulde rapport", "Konklusion"],
      paragraphs: ["Nogle websites får kunder, fordi næste skridt er tydeligt.", "Data viser hurtige beslutninger, mobil, hastighed og tilgængelighed.", "Svar med det samme: hvad tilbyder du, til hvem og hvad er næste skridt?", "Kontakt, beviser og professionelt design reducerer tvivl.", "Mobiloplevelse og performance afgør ofte, om folk bliver.", "Google dominerer stadig, og AI gør struktureret indhold vigtigere.", "Tilgængelighed reducerer friktion for flere.", "Platformen hjælper, men strategi afgør resultatet.", "Lange eller uklare formularer mister interesserede.", "Brug listen som hurtig audit.", "Rapporten indeholder kilder, tjekliste og prompts.", "Kunder kommer fra klarhed, tillid, hastighed og et enkelt næste skridt."],
      checklist: ["Er tilbuddet hurtigt klart?", "Er CTA synlig?", "Er kontakt og tillid lette at finde?", "Er siden hurtig?", "Har hver ydelse nyttigt indhold?", "Er formularer korte og tydelige?"],
    },
    nl: {
      summary: ["Bezoekers beslissen snel of de website relevant is.", "Vertrouwen, snelheid, mobiel, SEO, toegankelijkheid en eenvoudig contact bepalen resultaten.", "Het volledige rapport werkt als lead magnet."],
      takeaways: ["Maak aanbod en volgende stap meteen duidelijk.", "Behandel snelheid als bedrijfsthema.", "Test eerst mobiel.", "Gebruik nuttige, gestructureerde content.", "Verminder frictie in formulieren."],
      prompts: [`Beoordeel mijn homepage op basis van "${base.title}".`, "Maak een vertrouwen-checklist voor mijn website.", "Herschrijf mijn servicepagina zodat die duidelijker is en beter converteert."],
      why: "Waarom leveren sommige websites meer klanten op?", whyAnswer: "Omdat ze duidelijke boodschap, vertrouwen, snelheid, mobiel gebruik, SEO-structuur, toegankelijkheid en zichtbare CTA's combineren.",
      speed: "Heeft snelheid invloed op klanten?", speedAnswer: "Ja. Google vond dat 53% van mobiele bezoeken wordt afgebroken als een pagina langer dan drie seconden laadt.",
      seo: "Is SEO nog belangrijk met AI-zoekopdrachten?", seoAnswer: "Ja. AI verandert ontdekking, maar duidelijke, nuttige en gestructureerde content blijft belangrijk.",
      check: "Wat moet ik eerst controleren?", checkAnswer: "Headline, CTA, mobiel, snelheid, contact, vertrouwen, toegankelijkheid en formulieren.",
      report: "Waarom is het rapport via inschrijving?", reportAnswer: "Het artikel geeft de kern; het rapport voegt checklist, bronnen en praktische prompts toe.",
      headings: ["Kort antwoord", "Samenvatting", "1. Duidelijke websites houden aandacht vast", "2. Vertrouwen ontstaat voor het eerste contact", "3. Mobiel en snelheid vormen de reis", "4. Zoekzichtbaarheid blijft belangrijk", "5. Toegankelijkheid is klantervaring", "6. Tools vervangen geen strategie", "7. Formulieren verliezen mensen bij frictie", "Websiteli website-success checklist", "Download het volledige rapport", "Conclusie"],
      paragraphs: ["Sommige websites leveren klanten op omdat de volgende stap duidelijk is.", "Data wijst op snelle beslissingen, mobiel gebruik, snelheid en toegankelijkheid.", "Beantwoord meteen: wat bied je, voor wie en wat is de volgende stap?", "Contact, bewijs en professioneel ontwerp verminderen twijfel.", "Mobiele ervaring en performance bepalen vaak of bezoekers blijven.", "Google domineert nog steeds en AI maakt gestructureerde content belangrijker.", "Toegankelijkheid vermindert frictie voor meer mensen.", "Het platform helpt, maar strategie bepaalt.", "Lange of onduidelijke formulieren verliezen geïnteresseerden.", "Gebruik de lijst als snelle audit.", "Het rapport bevat bronnen, checklist en prompts.", "Klanten komen door duidelijkheid, vertrouwen, snelheid en een eenvoudige volgende stap."],
      checklist: ["Is het aanbod snel duidelijk?", "Is de CTA zichtbaar?", "Zijn contact en vertrouwen makkelijk te vinden?", "Is de pagina snel?", "Heeft elke dienst nuttige content?", "Zijn formulieren kort en duidelijk?"],
    },
  } as const;

  const fallback = {
    summary: base.language === "ja" ? ["訪問者はすばやく判断します。", "信頼、速度、モバイル、SEO、アクセシビリティ、簡単な連絡導線が結果を左右します。", "完全版レポートはリード獲得導線として機能します。"] : ["Visitors decide quickly whether the website is relevant.", "Trust, speed, mobile usability, SEO, accessibility, and simple contact paths shape results.", "The complete report remains a useful lead magnet."],
    takeaways: base.language === "ja" ? ["提供内容と次の行動をすぐ明確にする。", "速度をビジネス課題として扱う。", "まずモバイルで確認する。", "役立つ構造化コンテンツを使う。", "フォームの摩擦を減らす。"] : ["Make the offer and next step clear immediately.", "Treat speed as a business issue.", "Test mobile first.", "Use helpful, structured content.", "Reduce form friction."],
    prompts: base.language === "ja" ? [`「${base.title}」をもとにトップページをレビューしてください。`, "サイトの信頼チェックリストを作ってください。", "サービスページをより明確で問い合わせにつながる文章にしてください。"] : [`Review my homepage based on "${base.title}".`, "Create a website trust checklist.", "Rewrite my service page so it is clearer and more likely to convert."],
    why: base.language === "ja" ? "なぜ顧客を獲得するサイトがあるのですか。" : "Why do some websites get more customers?",
    whyAnswer: base.language === "ja" ? "明確なメッセージ、信頼、速度、モバイル対応、SEO構造、アクセシビリティ、明確なCTAが揃っているからです。" : "Because they combine clear messaging, trust, speed, mobile usability, SEO structure, accessibility, and clear calls to action.",
    speed: base.language === "ja" ? "速度は顧客に影響しますか。" : "Does speed affect customers?",
    speedAnswer: base.language === "ja" ? "はい。Googleは、モバイルページの読み込みが3秒を超えると訪問の53%が離脱すると報告しています。" : "Yes. Google found that 53% of mobile visits are abandoned when pages take longer than three seconds to load.",
    seo: base.language === "ja" ? "AI検索時代でもSEOは重要ですか。" : "Is SEO still important with AI search?",
    seoAnswer: base.language === "ja" ? "はい。AIは発見の形を変えますが、明確で役立つ構造化コンテンツは重要です。" : "Yes. AI changes discovery, but clear, helpful, structured content remains important.",
    check: base.language === "ja" ? "最初に何を確認しますか。" : "What should I check first?",
    checkAnswer: base.language === "ja" ? "見出し、CTA、モバイル、速度、連絡先、信頼材料、アクセシビリティ、フォームを確認します。" : "Check the headline, CTA, mobile experience, speed, contact details, trust signals, accessibility, and forms.",
    report: base.language === "ja" ? "なぜレポートは登録制ですか。" : "Why is the report offered by signup?",
    reportAnswer: base.language === "ja" ? "記事は要点を示し、完全版レポートはチェックリスト、出典、実用プロンプトを提供します。" : "The article gives the key findings, while the report adds the checklist, sources, and practical prompts.",
    headings: base.language === "ja" ? ["短い答え", "概要", "1. 明確なサイトは注意を保つ", "2. 信頼は問い合わせ前に作られる", "3. モバイルと速度が体験を左右する", "4. 検索で見つかることは今も重要", "5. アクセシビリティは顧客体験", "6. ツールだけでは戦略にならない", "7. フォームの摩擦で離脱が起きる", "Websiteliサイト成功チェックリスト", "完全版調査レポートをダウンロード", "まとめ"] : ["Short answer", "Executive summary", "1. Clear websites keep attention", "2. Trust is built before contact", "3. Mobile and speed shape the journey", "4. Search visibility still matters", "5. Accessibility is customer experience", "6. Tools do not replace strategy", "7. Forms lose people through friction", "Website success checklist", "Download the full research report", "Conclusion"],
    paragraphs: base.language === "ja" ? ["顧客を獲得するサイトは、次の行動を明確にします。", "データは、速い判断、モバイル、速度、アクセシビリティが重要であることを示します。", "何を、誰に、次に何をするかをすぐ示します。", "連絡先、実績、プロらしい見た目が不安を減らします。", "モバイルと速度は滞在を左右します。", "Googleは今も強く、AI検索では構造化された役立つ情報がさらに重要です。", "アクセシビリティは多くの人の摩擦を減らします。", "ツールは役立ちますが、戦略が成果を決めます。", "長く不明確なフォームは離脱を増やします。", "このリストを簡易監査に使ってください。", "完全版には出典、チェックリスト、プロンプトが含まれます。", "明確さ、信頼、速度、簡単な行動が顧客につながります。"] : ["Some websites get customers because they make the next step clear.", "The data points to fast decisions, mobile usage, speed, and accessibility.", "Answer what you offer, who it is for, and what happens next.", "Contact details, proof, and professional design reduce doubt.", "Mobile experience and performance often decide whether people stay.", "Google still dominates search, and AI makes structured helpful content more important.", "Accessibility reduces friction for more people.", "Tools help, but strategy decides the outcome.", "Long or unclear forms can lose interested people.", "Use this list as a quick audit.", "The full report includes sources, checklist, and prompts.", "Customers come from clarity, trust, speed, and an easy next step."],
    checklist: base.language === "ja" ? ["提供内容はすぐ伝わるか。", "CTAは見えるか。", "連絡先と信頼材料は見つけやすいか。", "ページは速いか。", "主要サービスに役立つ説明があるか。", "フォームは短く明確か。"] : ["Is the offer clear quickly?", "Is the CTA visible?", "Are contact and trust easy to find?", "Is the page fast?", "Does each service have useful content?", "Are forms short and labeled?"],
  };

  const selected = localized[language as keyof typeof localized] ?? fallback;

  return {
    ...base,
    summary: [...selected.summary],
    takeaways: [...selected.takeaways],
    prompts: [...selected.prompts],
    faq: {
      why: selected.why,
      whyAnswer: selected.whyAnswer,
      speed: selected.speed,
      speedAnswer: selected.speedAnswer,
      seo: selected.seo,
      seoAnswer: selected.seoAnswer,
      check: selected.check,
      checkAnswer: selected.checkAnswer,
      report: selected.report,
      reportAnswer: selected.reportAnswer,
    },
    headings: {
      short: selected.headings[0],
      data: selected.headings[1],
      clarity: selected.headings[2],
      trust: selected.headings[3],
      mobile: selected.headings[4],
      search: selected.headings[5],
      accessibility: selected.headings[6],
      platform: selected.headings[7],
      friction: selected.headings[8],
      checklist: selected.headings[9],
      report: selected.headings[10],
      conclusion: selected.headings[11],
    },
    paragraphs: {
      short: selected.paragraphs[0],
      data: selected.paragraphs[1],
      clarity: selected.paragraphs[2],
      trust: selected.paragraphs[3],
      mobile: selected.paragraphs[4],
      search: selected.paragraphs[5],
      accessibility: selected.paragraphs[6],
      platform: selected.paragraphs[7],
      friction: selected.paragraphs[8],
      checklistIntro: selected.paragraphs[9],
      report: selected.paragraphs[10],
      conclusion: selected.paragraphs[11],
    },
    checklist: [...selected.checklist],
  };
}

function makeSuccessTranslation(copy: SuccessCopy, withReferences = false): BlogPostTranslation {
  const body = `## ${copy.headings.short}

${copy.paragraphs.short} ([Nielsen Norman Group](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/)).

## ${copy.headings.data}

${getStatsBlock(copy.language)}

${copy.paragraphs.data}

## ${copy.headings.clarity}

${copy.paragraphs.clarity}

## ${copy.headings.trust}

${copy.paragraphs.trust} ([Stanford Web Credibility Research](https://credibility.stanford.edu/guidelines/index.html)).

## ${copy.headings.mobile}

${copy.paragraphs.mobile} ([Think with Google](https://business.google.com/ca-en/think/marketing-strategies/mobile-page-speed-new-industry-benchmarks/), [HTTP Archive Web Almanac](https://almanac.httparchive.org/en/2025/page-weight)).

## ${copy.headings.search}

${copy.paragraphs.search} ([Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

## ${copy.headings.accessibility}

${copy.paragraphs.accessibility}

## ${copy.headings.platform}

${copy.paragraphs.platform} ([W3Techs](https://w3techs.com/technologies/details/cm-wordpress)).

## ${copy.headings.friction}

${copy.paragraphs.friction}

## ${copy.headings.checklist}

${copy.paragraphs.checklistIntro}

${copy.checklist.map((item) => `- ${item}`).join("\n")}

## ${copy.headings.report}

${copy.paragraphs.report}

## ${copy.headings.conclusion}

${copy.paragraphs.conclusion}`;

  return {
    title: copy.title,
    description: copy.description,
    category: copy.category,
    tags: copy.tags,
    language: copy.language,
    readingTime: copy.readingTime,
    audience: copy.audience,
    excerpt: copy.excerpt,
    summary: copy.summary,
    keyTakeaways: copy.takeaways,
    chatGptPrompts: copy.prompts,
    references: withReferences ? references : undefined,
    faqs: [
      { question: copy.faq.why, answer: copy.faq.whyAnswer },
      { question: copy.faq.speed, answer: copy.faq.speedAnswer },
      { question: copy.faq.seo, answer: copy.faq.seoAnswer },
      { question: copy.faq.check, answer: copy.faq.checkAnswer },
      { question: copy.faq.report, answer: copy.faq.reportAnswer },
    ],
    body,
  };
}

function getStatsBlock(language: BlogPostTranslation["language"]) {
  const blocks: Record<BlogPostTranslation["language"], string> = {
    en: `- Google found that 53% of mobile site visits are abandoned when pages take longer than three seconds to load ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- DataReportal reported 6.12 billion internet users at the start of April 2026, equal to 73.8% of the world's population, and 96.2% of internet users use a mobile phone to go online at least some of the time ([DataReportal](https://datareportal.com/global-digital-overview)).
- StatCounter reported Google at 91.27% worldwide search engine market share in June 2026 ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- WebAIM found detectable WCAG failures on 95.9% of the top one million home pages in 2026 ([WebAIM](https://webaim.org/projects/million/)).
- Baymard reports an average documented cart abandonment rate of 70.22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    de: `- Google fand, dass 53% mobiler Website-Besuche abgebrochen werden, wenn Seiten länger als drei Sekunden laden ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- DataReportal meldete Anfang April 2026 6,12 Milliarden Internetnutzer, 73,8% der Weltbevölkerung; 96,2% nutzen zumindest gelegentlich ein Mobiltelefon fürs Internet ([DataReportal](https://datareportal.com/global-digital-overview)).
- StatCounter meldete Google im Juni 2026 mit 91,27% weltweitem Suchmaschinenmarktanteil ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- WebAIM fand 2026 auf 95,9% der Top-eine-Million-Homepages erkennbare WCAG-Fehler ([WebAIM](https://webaim.org/projects/million/)).
- Baymard berichtet eine durchschnittlich dokumentierte Warenkorbabbruchrate von 70,22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    hu: `- A Google szerint a mobil webhelylátogatások 53%-a megszakad, ha az oldal három másodpercnél tovább tölt be ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- A DataReportal 2026 áprilisának elején 6,12 milliárd internethasználót jelzett, ami a világ népességének 73,8%-a; 96,2% legalább időnként mobiltelefonnal internetezik ([DataReportal](https://datareportal.com/global-digital-overview)).
- A StatCounter szerint a Google globális keresőpiaci részesedése 2026 júniusában 91,27% volt ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- A WebAIM 2026-ban a top egymillió főoldal 95,9%-án talált kimutatható WCAG-hibákat ([WebAIM](https://webaim.org/projects/million/)).
- A Baymard 70,22%-os átlagos dokumentált kosárelhagyási arányt közöl ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    pl: `- Google ustalił, że 53% wizyt mobilnych jest porzucanych, gdy strona ładuje się dłużej niż trzy sekundy ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- DataReportal podał 6,12 mld użytkowników internetu na początku kwietnia 2026 r., czyli 73,8% populacji świata; 96,2% korzysta z telefonu do internetu przynajmniej czasami ([DataReportal](https://datareportal.com/global-digital-overview)).
- StatCounter podał, że Google miało 91,27% globalnego udziału w rynku wyszukiwarek w czerwcu 2026 r. ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- WebAIM wykrył błędy WCAG na 95,9% z miliona najpopularniejszych stron głównych w 2026 r. ([WebAIM](https://webaim.org/projects/million/)).
- Baymard podaje średni udokumentowany wskaźnik porzuceń koszyka 70,22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    es: `- Google encontró que el 53% de las visitas móviles se abandona cuando una página tarda más de tres segundos en cargar ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- DataReportal informó de 6,12 mil millones de usuarios de internet a comienzos de abril de 2026, el 73,8% de la población mundial; el 96,2% usa un móvil para conectarse al menos parte del tiempo ([DataReportal](https://datareportal.com/global-digital-overview)).
- StatCounter situó a Google en el 91,27% de cuota mundial de búsqueda en junio de 2026 ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- WebAIM detectó fallos WCAG en el 95,9% del millón de homepages analizadas en 2026 ([WebAIM](https://webaim.org/projects/million/)).
- Baymard informa de una tasa media documentada de abandono de carrito del 70,22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    fr: `- Google a constaté que 53% des visites mobiles sont abandonnées lorsqu'une page met plus de trois secondes à charger ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- DataReportal a rapporté 6,12 milliards d'internautes début avril 2026, soit 73,8% de la population mondiale; 96,2% utilisent un téléphone mobile pour aller en ligne au moins une partie du temps ([DataReportal](https://datareportal.com/global-digital-overview)).
- StatCounter a mesuré Google à 91,27% de part mondiale de recherche en juin 2026 ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- WebAIM a détecté des échecs WCAG sur 95,9% du million de pages d'accueil analysées en 2026 ([WebAIM](https://webaim.org/projects/million/)).
- Baymard indique un taux moyen documenté d'abandon de panier de 70,22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    it: `- Google ha rilevato che il 53% delle visite mobile viene abbandonato quando una pagina impiega più di tre secondi a caricarsi ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- DataReportal ha riportato 6,12 miliardi di utenti internet a inizio aprile 2026, pari al 73,8% della popolazione mondiale; il 96,2% usa un telefono mobile per andare online almeno parte del tempo ([DataReportal](https://datareportal.com/global-digital-overview)).
- StatCounter ha indicato Google al 91,27% della quota mondiale dei motori di ricerca a giugno 2026 ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- WebAIM ha trovato errori WCAG rilevabili sul 95,9% del milione di homepage analizzate nel 2026 ([WebAIM](https://webaim.org/projects/million/)).
- Baymard riporta un tasso medio documentato di abbandono carrello del 70,22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    cz: `- Google zjistil, že 53% mobilních návštěv webu je opuštěno, pokud se stránka načítá déle než tři sekundy ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- DataReportal uvedl na začátku dubna 2026 6,12 miliardy uživatelů internetu, tedy 73,8% světové populace; 96,2% používá k internetu alespoň někdy mobilní telefon ([DataReportal](https://datareportal.com/global-digital-overview)).
- StatCounter uvedl Google v červnu 2026 s 91,27% světovým podílem ve vyhledávání ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- WebAIM v roce 2026 našel detekovatelné chyby WCAG na 95,9% z milionu nejnavštěvovanějších domovských stránek ([WebAIM](https://webaim.org/projects/million/)).
- Baymard uvádí průměrnou dokumentovanou míru opuštění košíku 70,22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    sk: `- Google zistil, že 53% mobilných návštev webu je opustených, ak sa stránka načítava dlhšie než tri sekundy ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- DataReportal uviedol na začiatku apríla 2026 6,12 miliardy používateľov internetu, teda 73,8% svetovej populácie; 96,2% používa na internet aspoň niekedy mobilný telefón ([DataReportal](https://datareportal.com/global-digital-overview)).
- StatCounter uviedol Google v júni 2026 s 91,27% svetovým podielom vo vyhľadávaní ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- WebAIM v roku 2026 našiel detegovateľné chyby WCAG na 95,9% z milióna najnavštevovanejších domovských stránok ([WebAIM](https://webaim.org/projects/million/)).
- Baymard uvádza priemernú dokumentovanú mieru opustenia košíka 70,22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    pt: `- A Google concluiu que 53% das visitas mobile são abandonadas quando uma página demora mais de três segundos a carregar ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- A DataReportal reportou 6,12 mil milhões de utilizadores de internet no início de abril de 2026, 73,8% da população mundial; 96,2% usa telemóvel para aceder à internet pelo menos parte do tempo ([DataReportal](https://datareportal.com/global-digital-overview)).
- A StatCounter colocou a Google com 91,27% de quota mundial de pesquisa em junho de 2026 ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- A WebAIM encontrou falhas WCAG detetáveis em 95,9% do milhão de homepages analisadas em 2026 ([WebAIM](https://webaim.org/projects/million/)).
- A Baymard indica uma taxa média documentada de abandono de carrinho de 70,22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    da: `- Google fandt, at 53% af mobile websitebesøg opgives, når sider tager mere end tre sekunder at indlæse ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- DataReportal rapporterede 6,12 milliarder internetbrugere i starten af april 2026, 73,8% af verdens befolkning; 96,2% bruger mobiltelefon til at gå online i hvert fald noget af tiden ([DataReportal](https://datareportal.com/global-digital-overview)).
- StatCounter satte Google til 91,27% global søgemaskineandel i juni 2026 ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- WebAIM fandt registrerbare WCAG-fejl på 95,9% af de øverste én million hjemmesider i 2026 ([WebAIM](https://webaim.org/projects/million/)).
- Baymard rapporterer en gennemsnitligt dokumenteret kurvforladelsesrate på 70,22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    nl: `- Google vond dat 53% van mobiele websitebezoeken wordt afgebroken wanneer pagina's langer dan drie seconden laden ([Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)).
- DataReportal meldde begin april 2026 6,12 miljard internetgebruikers, 73,8% van de wereldbevolking; 96,2% gebruikt minstens soms een mobiele telefoon om online te gaan ([DataReportal](https://datareportal.com/global-digital-overview)).
- StatCounter rapporteerde Google op 91,27% wereldwijd zoekmarktaandeel in juni 2026 ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).
- WebAIM vond detecteerbare WCAG-fouten op 95,9% van de top één miljoen homepages in 2026 ([WebAIM](https://webaim.org/projects/million/)).
- Baymard rapporteert een gemiddeld gedocumenteerd winkelwagenverlatingspercentage van 70,22% ([Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)).`,
    ja: `- Googleは、モバイルページの読み込みが3秒を超えると、訪問の53%が離脱すると報告しています（[Think with Google](https://www.thinkwithgoogle.com/_qs/documents/4290/c676a_Google_MobileSiteSpeed_Playbook_v2.1_digital_4JWkGQT.pdf)）。
- DataReportalは、2026年4月初めのインターネット利用者を61.2億人、世界人口の73.8%と報告し、96.2%が少なくとも一部の時間でモバイル端末を使ってオンラインになるとしています（[DataReportal](https://datareportal.com/global-digital-overview)）。
- StatCounterは、2026年6月のGoogleの世界検索シェアを91.27%と報告しています（[StatCounter](https://gs.statcounter.com/search-engine-market-share)）。
- WebAIMは、2026年の上位100万ホームページの95.9%で検出可能なWCAG違反を見つけました（[WebAIM](https://webaim.org/projects/million/)）。
- Baymardは、記録された平均カート放棄率を70.22%としています（[Baymard Institute](https://baymard.com/lists/cart-abandonment-rate)）。`,
  };

  return blocks[language];
}

export default {
  slug: "why-business-websites-get-customers",
  title: "Why Some Business Websites Get Customers While Others Don't",
  language: "en",
  description: "A research-backed guide explaining why some business websites generate enquiries and sales while others lose visitors.",
  tags: ["business website", "website conversion", "website statistics", "website trust", "website speed", "mobile website", "SEO statistics", "accessibility", "small business website"],
  published: true,
  status: "published",
  image: "/assets/blog/business-websites-get-customers-statistics.png",
  imageAlt: "Infographic showing verified statistics about business websites, including trust, mobile use, speed, accessibility, and search visibility.",
  author: "Websiteli",
  date: "2026-07-05",
  publishDate: "2026-07-05",
  updated: "2026-07-06",
  related: [
    "/en/services-pricing/",
    "/en/blog/business-website-features/",
    "/en/blog/small-business-website/",
    "/en/blog/website-cost-switzerland/",
    "/en/contact/",
  ],
  translations,
} satisfies BlogPostSource;
