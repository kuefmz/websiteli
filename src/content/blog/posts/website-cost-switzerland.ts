import type { BlogPostSource, BlogPostTranslation } from "../types";

const references = [
  {
    publisher: "Google Analytics Help",
    title: "About events",
    href: "https://support.google.com/analytics/answer/9322688",
  },
  {
    publisher: "Google Search Central",
    title: "Search Engine Optimization Starter Guide",
    href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  },
  {
    publisher: "Google Search Console Help",
    title: "About Search Console",
    href: "https://support.google.com/webmasters/answer/9128668",
  },
  {
    publisher: "Websiteli",
    title: "Services & Pricing",
    href: "https://websiteli.ch/en/services-pricing/",
  },
  {
    publisher: "web.dev",
    title: "Web Vitals",
    href: "https://web.dev/articles/vitals",
  },
];

const translations: BlogPostSource["translations"] = {
  en: {
    title: "How Much Does a Business Website Cost in Switzerland?",
    description: "A practical Swiss website cost guide for small businesses, including what affects price, what to budget for, and how to compare offers.",
    category: "Website Pricing",
    tags: ["website cost switzerland", "website price", "affordable website", "business website cost", "Swiss website pricing", "website cost guide"],
    language: "en",
    readingTime: "8 min read",
    audience: "Swiss small business owners planning a website budget",
    excerpt: "Website cost in Switzerland depends on scope, content, design, integrations, and ongoing maintenance. This guide explains the main cost drivers and how to compare offers.",
    summary: [
      "Websiteli's Swiss packages currently start from CHF 990 for Digital Foundation, CHF 1'990 for Growth Setup, CHF 3'290 for AI/Data Upgrade, and CHF 50 per month for maintenance.",
      "Final cost depends on pages, content, design, SEO setup, analytics, forms, integrations, multilingual work, and support.",
      "The best comparison is not only price; compare deliverables, ownership, launch support, and maintenance.",
    ],
    keyTakeaways: [
      "Start with scope and business goal before comparing prices.",
      "Check whether content, SEO, mobile performance, analytics, forms, ownership, and support are included.",
      "Budget for maintenance after launch.",
      "Choose a package that can grow instead of a cheap setup that needs rebuilding soon.",
    ],
    chatGptPrompts: [
      "Estimate a realistic Swiss website budget for my business based on this article.",
      "Create a checklist of questions to ask a website provider before I accept an offer.",
      "Compare two website offers and identify what may be missing from the cheaper option.",
    ],
    references,
    faqs: [
      {
        question: "How much does a business website cost in Switzerland?",
        answer: "For Websiteli's current Swiss packages, Digital Foundation starts from CHF 990, Growth Setup from CHF 1'990, AI/Data Upgrade from CHF 3'290, and maintenance from CHF 50 per month. Final cost depends on scope.",
      },
      {
        question: "What affects website price the most?",
        answer: "The biggest drivers are page count, content, design, SEO setup, analytics, forms, booking or ecommerce integrations, multilingual content, and maintenance.",
      },
      {
        question: "How do I compare website offers?",
        answer: "Compare deliverables, ownership, content support, SEO basics, performance work, analytics, forms, launch support, and post-launch care, not price alone.",
      },
    ],
    body: `## The short answer

Website cost in Switzerland depends on scope. For Websiteli's current Swiss pricing, the main packages start at:

- Digital Foundation: from CHF 990
- Growth Setup: from CHF 1'990
- AI/Data Upgrade: from CHF 3'290
- Website maintenance: from CHF 50 per month in Switzerland

These are starting prices from the Websiteli services and pricing page, not a promise that every project fits the same number ([Websiteli](https://websiteli.ch/en/services-pricing/)). The right website price depends on what the website must do for the business.

## Why website prices vary

Two offers can look similar and include very different work. One may include only a few pages and a template setup. Another may include strategy, content structure, SEO basics, analytics events, forms, privacy setup, performance work, and launch support.

Google Search Console helps site owners monitor and troubleshoot Google Search presence, while Google Analytics events can measure important interactions such as clicks, signups, or purchases ([Google Search Console Help](https://support.google.com/webmasters/answer/9128668), [Google Analytics Help](https://support.google.com/analytics/answer/9322688)).

## Main cost drivers

Most website cost comes from:

- number of pages
- content and copywriting
- design and branding
- SEO and technical setup
- forms, booking, ecommerce, CRM, newsletter, or analytics integrations
- multilingual content
- maintenance after launch

Google's SEO starter guide explains the value of clear, helpful content and search-friendly structure ([Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)). Web Vitals also give site owners a way to evaluate user experience quality ([web.dev](https://web.dev/articles/vitals)).

## What an affordable website should include

Affordable should not mean fragile. A practical website should still include:

- mobile-friendly design
- clear page structure
- basic SEO setup
- fast loading images
- contact form or clear contact route
- privacy and legal pages where needed
- analytics or basic tracking where appropriate
- ownership of domain, content, and key accounts
- launch support
- a plan for future updates

## How to compare offers

Ask each provider the same questions:

- How many pages are included?
- Who writes or edits the content?
- What SEO basics are included?
- Are forms, tracking, and privacy setup included?
- Who owns the domain, hosting, content, and accounts?
- What happens after launch?
- How are future updates handled?
- What is not included?

## Budget examples

A simple local business may need a focused foundation website. A business that wants stronger lead generation may need more service pages, proof, analytics, and conversion paths. A company that needs automation, dashboards, or deeper integrations should budget more because the website becomes part of operations.

## Conclusion

The smartest Swiss website budget is not always the cheapest offer. It is the scope that gives the business a clear, trustworthy, maintainable website with the right foundation for growth.`,
  },
  de: makeTranslation({
    language: "de",
    title: "Wie viel kostet eine Business-Website in der Schweiz?",
    description: "Ein praktischer Schweizer Kostenleitfaden für KMU-Websites: Preistreiber, Budget und Angebotsvergleich.",
    category: "Website-Preise",
    tags: ["Website Kosten Schweiz", "Website Preis", "bezahlbare Website", "Business-Website Kosten", "Schweizer Website Preise", "Website Kostenleitfaden"],
    readingTime: "8 Min. Lesezeit",
    audience: "Schweizer KMU, die ein Website-Budget planen",
    excerpt: "Website-Kosten in der Schweiz hängen von Umfang, Inhalt, Design, Integrationen und Wartung ab.",
    body: `## Die kurze Antwort

Die Kosten einer Business-Website in der Schweiz hängen vom Umfang ab. Bei Websiteli starten die Schweizer Pakete derzeit bei CHF 990 für Digital Foundation, CHF 1'990 für Growth Setup, CHF 3'290 für AI/Data Upgrade und CHF 50 pro Monat für Wartung.

## Warum Preise variieren

Angebote können ähnlich aussehen und trotzdem sehr unterschiedliche Leistungen enthalten: Strategie, Inhalte, SEO, Analytics, Formulare, Datenschutz, Performance und Launch-Support.

## Haupttreiber

- Seitenanzahl
- Texte und Inhalte
- Design und Branding
- SEO und technische Einrichtung
- Formulare, Buchung, Shop, CRM oder Newsletter
- Mehrsprachigkeit
- Wartung nach dem Launch

## Was ein bezahlbares Angebot enthalten sollte

Eine günstige Website sollte trotzdem mobilfreundlich, klar strukturiert, SEO-tauglich, schnell, messbar, rechtlich sauber und gut wartbar sein.

## Angebote vergleichen

Fragen Sie nach Seitenumfang, Content-Unterstützung, SEO, Tracking, Eigentum, Launch-Support, Wartung und nicht enthaltenen Leistungen.

## Fazit

Das beste Budget ist nicht zwingend das niedrigste. Entscheidend ist ein klarer Umfang, der Vertrauen, Auffindbarkeit und Wachstum unterstützt.`,
  }),
  hu: makeTranslation({
    language: "hu",
    title: "Mennyibe kerül egy céges weboldal Svájcban?",
    description: "Gyakorlati svájci weboldal-költség útmutató kisvállalkozásoknak: árképzés, költségvetés és ajánlatok összehasonlítása.",
    category: "Weboldal árak",
    tags: ["weboldal ár Svájc", "weboldal költség", "megfizethető weboldal", "céges weboldal ára", "svájci weboldal árak", "költség útmutató"],
    readingTime: "8 perc olvasás",
    audience: "Svájci kisvállalkozók, akik weboldal-költségvetést terveznek",
    excerpt: "A svájci weboldal ára a terjedelemtől, tartalomtól, dizájntól, integrációktól és karbantartástól függ.",
    body: `## Rövid válasz

Egy céges weboldal ára Svájcban a terjedelemtől függ. A Websiteli svájci csomagjai jelenleg CHF 990-től, CHF 1'990-től, CHF 3'290-től, a karbantartás pedig CHF 50/hótól indul.

## Miért eltérőek az árak

Két ajánlat kívülről hasonlónak tűnhet, de az egyik csak sablont és pár oldalt tartalmaz, a másik stratégiát, tartalmat, SEO-t, analitikát, űrlapokat és indulási támogatást is.

## Fő költségtényezők

- oldalszám
- szöveg és tartalom
- dizájn és márka
- SEO és technikai beállítás
- űrlapok, foglalás, webshop, CRM vagy hírlevél
- többnyelvűség
- karbantartás

## Mit tartalmazzon egy megfizethető weboldal

Legyen mobilbarát, világos szerkezetű, SEO-alapokkal ellátott, gyors, mérhető, jogilag rendezett és később is frissíthető.

## Ajánlatok összehasonlítása

Nézd meg, mi van benne: oldalak, tartalom, SEO, mérés, tulajdonjog, indulás utáni támogatás és karbantartás.

## Összegzés

Nem mindig a legolcsóbb ajánlat a legjobb. A jó költségvetés olyan weboldalt ad, amely bizalmat, kereshetőséget és növekedést támogat.`,
  }),
  pl: makeTranslation({
    language: "pl",
    title: "Ile kosztuje strona firmowa w Szwajcarii?",
    description: "Praktyczny przewodnik po kosztach strony w Szwajcarii: czynniki ceny, budżet i porównywanie ofert.",
    category: "Ceny stron",
    tags: ["koszt strony Szwajcaria", "cena strony", "przystępna strona", "koszt strony firmowej", "szwajcarskie ceny stron", "przewodnik kosztów"],
    readingTime: "8 min czytania",
    audience: "Małe firmy w Szwajcarii planujące budżet strony",
    excerpt: "Koszt strony w Szwajcarii zależy od zakresu, treści, projektu, integracji i utrzymania.",
    body: `## Krótka odpowiedź

Koszt strony firmowej w Szwajcarii zależy od zakresu. Pakiety Websiteli zaczynają się obecnie od CHF 990, CHF 1'990 i CHF 3'290, a utrzymanie od CHF 50 miesięcznie.

## Dlaczego ceny się różnią

Podobne oferty mogą obejmować zupełnie inny zakres: strategię, treści, SEO, analitykę, formularze, prywatność, wydajność i wsparcie przy starcie.

## Główne czynniki kosztu

- liczba stron
- treści i copywriting
- design i branding
- SEO i konfiguracja techniczna
- formularze, rezerwacje, sklep, CRM lub newsletter
- wielojęzyczność
- utrzymanie po publikacji

## Co powinna zawierać rozsądna oferta

Strona powinna być mobilna, czytelna, szybka, mierzalna, z podstawami SEO, formularzem kontaktowym, stronami prawnymi i jasnym planem aktualizacji.

## Jak porównać oferty

Porównuj zakres, własność, treści, SEO, tracking, start, opiekę po publikacji i elementy wyłączone z ceny.

## Wniosek

Najlepszy wybór to nie zawsze najniższa cena, ale zakres, który wspiera zaufanie, widoczność i rozwój.`,
  }),
  es: makeTranslation({
    language: "es",
    title: "¿Cuánto cuesta una web de negocio en Suiza?",
    description: "Guía práctica de costes web en Suiza para pequeñas empresas: precios, presupuesto y comparación de ofertas.",
    category: "Precios web",
    tags: ["coste web Suiza", "precio web", "web asequible", "coste web negocio", "precios web suizos", "guía de costes web"],
    readingTime: "8 min de lectura",
    audience: "Pequeñas empresas suizas que planifican presupuesto web",
    excerpt: "El coste de una web en Suiza depende de alcance, contenido, diseño, integraciones y mantenimiento.",
    body: `## Respuesta breve

El coste de una web de negocio en Suiza depende del alcance. Los paquetes suizos de Websiteli empiezan actualmente desde CHF 990, CHF 1'990 y CHF 3'290, con mantenimiento desde CHF 50 al mes.

## Por qué varían los precios

Dos ofertas pueden parecer parecidas y cubrir trabajos muy distintos: estrategia, contenido, SEO, analítica, formularios, privacidad, rendimiento y lanzamiento.

## Factores principales

- número de páginas
- contenido y copywriting
- diseño y marca
- SEO y configuración técnica
- formularios, reservas, ecommerce, CRM o newsletter
- contenido multilingüe
- mantenimiento

## Qué debe incluir una web asequible

Debe seguir siendo móvil, clara, rápida, medible, con SEO básico, contacto sencillo, páginas legales y plan de actualización.

## Cómo comparar ofertas

Compara entregables, propiedad, contenido, SEO, tracking, soporte de lanzamiento, mantenimiento y exclusiones.

## Conclusión

La mejor opción no siempre es la más barata, sino la que crea una base clara, confiable y mantenible para crecer.`,
  }),
  fr: makeTranslation({
    language: "fr",
    title: "Combien coûte un site d'entreprise en Suisse ?",
    description: "Guide pratique du coût d'un site en Suisse pour petites entreprises : budget, facteurs de prix et comparaison d'offres.",
    category: "Prix des sites",
    tags: ["coût site Suisse", "prix site web", "site abordable", "coût site entreprise", "prix web suisse", "guide coût site"],
    readingTime: "8 min de lecture",
    audience: "Petites entreprises suisses qui préparent un budget web",
    excerpt: "Le coût d'un site en Suisse dépend du périmètre, du contenu, du design, des intégrations et de la maintenance.",
    body: `## Réponse courte

Le prix d'un site d'entreprise en Suisse dépend du périmètre. Les offres suisses Websiteli commencent actuellement à CHF 990, CHF 1'990 et CHF 3'290, avec maintenance dès CHF 50 par mois.

## Pourquoi les prix varient

Deux offres peuvent sembler proches mais inclure un travail différent : stratégie, contenu, SEO, analytics, formulaires, confidentialité, performance et lancement.

## Principaux facteurs

- nombre de pages
- contenu et rédaction
- design et marque
- SEO et configuration technique
- formulaires, réservation, ecommerce, CRM ou newsletter
- multilingue
- maintenance

## Ce qu'un site abordable doit inclure

Il doit rester mobile, clair, rapide, mesurable, avec bases SEO, contact simple, pages légales et plan de mise à jour.

## Comparer les offres

Comparez livrables, propriété, contenu, SEO, tracking, lancement, maintenance et exclusions.

## Conclusion

Le meilleur budget n'est pas forcément le plus bas, mais celui qui crée une base claire, fiable et maintenable.`,
  }),
  it: makeTranslation({
    language: "it",
    title: "Quanto costa un sito aziendale in Svizzera?",
    description: "Guida pratica ai costi di un sito in Svizzera: budget, fattori di prezzo e confronto delle offerte.",
    category: "Prezzi siti web",
    tags: ["costo sito Svizzera", "prezzo sito web", "sito economico", "costo sito aziendale", "prezzi siti svizzeri", "guida costi sito"],
    readingTime: "8 min di lettura",
    audience: "Piccole imprese svizzere che pianificano un budget web",
    excerpt: "Il costo di un sito in Svizzera dipende da ambito, contenuti, design, integrazioni e manutenzione.",
    body: `## Risposta breve

Il costo di un sito aziendale in Svizzera dipende dall'ambito. I pacchetti Websiteli per la Svizzera partono da CHF 990, CHF 1'990 e CHF 3'290, con manutenzione da CHF 50 al mese.

## Perché i prezzi variano

Due offerte possono sembrare simili ma includere lavori diversi: strategia, contenuti, SEO, analytics, form, privacy, performance e supporto al lancio.

## Fattori principali

- numero di pagine
- contenuti e copywriting
- design e branding
- SEO e setup tecnico
- form, booking, ecommerce, CRM o newsletter
- multilingua
- manutenzione

## Cosa deve includere un sito accessibile

Deve essere mobile, chiaro, veloce, misurabile, con basi SEO, contatto semplice, pagine legali e piano di aggiornamento.

## Come confrontare le offerte

Confronta deliverable, proprietà, contenuti, SEO, tracking, supporto al lancio, manutenzione ed esclusioni.

## Conclusione

La scelta migliore non è sempre la più economica, ma quella che crea una base chiara, affidabile e mantenibile.`,
  }),
  cz: makeTranslation({
    language: "cz",
    title: "Kolik stojí firemní web ve Švýcarsku?",
    description: "Praktický průvodce cenou webu ve Švýcarsku: rozpočet, faktory ceny a porovnání nabídek.",
    category: "Ceny webů",
    tags: ["cena webu Švýcarsko", "cena webových stránek", "dostupný web", "cena firemního webu", "švýcarské ceny webů", "průvodce cenou webu"],
    readingTime: "8 min čtení",
    audience: "Švýcarské malé firmy plánující rozpočet webu",
    excerpt: "Cena webu ve Švýcarsku závisí na rozsahu, obsahu, designu, integracích a údržbě.",
    body: `## Krátká odpověď

Cena firemního webu ve Švýcarsku závisí na rozsahu. Balíčky Websiteli pro Švýcarsko aktuálně začínají na CHF 990, CHF 1'990 a CHF 3'290, údržba od CHF 50 měsíčně.

## Proč se ceny liší

Podobné nabídky mohou obsahovat úplně jiný rozsah: strategii, obsah, SEO, analytiku, formuláře, soukromí, výkon a podporu spuštění.

## Hlavní faktory

- počet stránek
- obsah a texty
- design a značka
- SEO a technické nastavení
- formuláře, rezervace, e-shop, CRM nebo newsletter
- vícejazyčnost
- údržba

## Co má dostupný web obsahovat

Má být mobilní, jasný, rychlý, měřitelný, se SEO základy, kontaktní cestou, právními stránkami a plánem aktualizací.

## Porovnání nabídek

Porovnejte výstupy, vlastnictví, obsah, SEO, měření, spuštění, údržbu a výluky.

## Závěr

Nejlepší rozpočet není vždy nejnižší cena, ale rozsah, který vytvoří důvěryhodný a udržitelný základ.`,
  }),
  sk: makeTranslation({
    language: "sk",
    title: "Koľko stojí firemný web vo Švajčiarsku?",
    description: "Praktický sprievodca cenou webu vo Švajčiarsku: rozpočet, faktory ceny a porovnanie ponúk.",
    category: "Ceny webov",
    tags: ["cena webu Švajčiarsko", "cena webovej stránky", "dostupný web", "cena firemného webu", "švajčiarske ceny webov", "sprievodca cenou webu"],
    readingTime: "8 min čítania",
    audience: "Švajčiarske malé firmy plánujúce rozpočet webu",
    excerpt: "Cena webu vo Švajčiarsku závisí od rozsahu, obsahu, dizajnu, integrácií a údržby.",
    body: `## Krátka odpoveď

Cena firemného webu vo Švajčiarsku závisí od rozsahu. Balíčky Websiteli pre Švajčiarsko aktuálne začínajú na CHF 990, CHF 1'990 a CHF 3'290, údržba od CHF 50 mesačne.

## Prečo sa ceny líšia

Podobné ponuky môžu obsahovať úplne iný rozsah: stratégiu, obsah, SEO, analytiku, formuláre, súkromie, výkon a podporu spustenia.

## Hlavné faktory

- počet stránok
- obsah a texty
- dizajn a značka
- SEO a technické nastavenie
- formuláre, rezervácie, e-shop, CRM alebo newsletter
- viacjazyčnosť
- údržba

## Čo má dostupný web obsahovať

Má byť mobilný, jasný, rýchly, merateľný, so SEO základmi, kontaktnou cestou, právnymi stránkami a plánom aktualizácií.

## Porovnanie ponúk

Porovnajte výstupy, vlastníctvo, obsah, SEO, meranie, spustenie, údržbu a výluky.

## Záver

Najlepší rozpočet nie je vždy najnižšia cena, ale rozsah, ktorý vytvorí dôveryhodný a udržateľný základ.`,
  }),
  pt: makeTranslation({
    language: "pt",
    title: "Quanto custa um site empresarial na Suíça?",
    description: "Guia prático de custos de sites na Suíça: orçamento, fatores de preço e comparação de propostas.",
    category: "Preços de sites",
    tags: ["custo site Suíça", "preço de site", "site acessível", "custo site empresarial", "preços web suíços", "guia custo site"],
    readingTime: "8 min de leitura",
    audience: "Pequenas empresas suíças a planear orçamento de site",
    excerpt: "O custo de um site na Suíça depende de escopo, conteúdo, design, integrações e manutenção.",
    body: `## Resposta curta

O custo de um site empresarial na Suíça depende do escopo. Os pacotes Websiteli para a Suíça começam atualmente em CHF 990, CHF 1'990 e CHF 3'290, com manutenção desde CHF 50 por mês.

## Porque os preços variam

Duas propostas podem parecer semelhantes e incluir trabalhos muito diferentes: estratégia, conteúdo, SEO, analytics, formulários, privacidade, performance e lançamento.

## Fatores principais

- número de páginas
- conteúdo e copywriting
- design e marca
- SEO e configuração técnica
- formulários, reservas, ecommerce, CRM ou newsletter
- multilingue
- manutenção

## O que um site acessível deve incluir

Deve ser mobile, claro, rápido, mensurável, com bases SEO, contacto simples, páginas legais e plano de atualização.

## Como comparar propostas

Compare entregáveis, propriedade, conteúdo, SEO, tracking, lançamento, manutenção e exclusões.

## Conclusão

A melhor escolha nem sempre é a mais barata, mas a que cria uma base clara, confiável e sustentável.`,
  }),
  da: makeTranslation({
    language: "da",
    title: "Hvad koster et virksomhedswebsite i Schweiz?",
    description: "Praktisk guide til websiteomkostninger i Schweiz: budget, prisfaktorer og sammenligning af tilbud.",
    category: "Websitepriser",
    tags: ["website pris Schweiz", "website omkostning", "prisvenligt website", "virksomhedswebsite pris", "schweiziske websitepriser", "prisguide website"],
    readingTime: "8 min læsning",
    audience: "Schweiziske mindre virksomheder, der planlægger websitebudget",
    excerpt: "Prisen på et website i Schweiz afhænger af scope, indhold, design, integrationer og vedligehold.",
    body: `## Kort svar

Prisen på et virksomhedswebsite i Schweiz afhænger af omfanget. Websitelis schweiziske pakker starter aktuelt fra CHF 990, CHF 1'990 og CHF 3'290, med vedligehold fra CHF 50 pr. måned.

## Hvorfor priser varierer

To tilbud kan ligne hinanden, men indeholde forskelligt arbejde: strategi, indhold, SEO, analytics, formularer, privatliv, performance og launch-support.

## Prisdrivere

- antal sider
- indhold og tekst
- design og branding
- SEO og teknisk opsætning
- formularer, booking, webshop, CRM eller nyhedsbrev
- flersproget indhold
- vedligehold

## Hvad et prisvenligt website bør indeholde

Det bør være mobilvenligt, klart, hurtigt, målbart, have SEO-basics, enkel kontakt, juridiske sider og plan for opdateringer.

## Sammenlign tilbud

Sammenlign leverancer, ejerskab, indhold, SEO, tracking, launch, vedligehold og fravalg.

## Konklusion

Det bedste budget er ikke altid den laveste pris, men den løsning, der skaber et klart og holdbart fundament.`,
  }),
  nl: makeTranslation({
    language: "nl",
    title: "Wat kost een bedrijfswebsite in Zwitserland?",
    description: "Praktische gids voor websitekosten in Zwitserland: budget, prijsfactoren en aanbiedingen vergelijken.",
    category: "Websiteprijzen",
    tags: ["website kosten Zwitserland", "website prijs", "betaalbare website", "kosten bedrijfswebsite", "Zwitserse websiteprijzen", "kostengids website"],
    readingTime: "8 min lezen",
    audience: "Zwitserse kleine bedrijven die een websitebudget plannen",
    excerpt: "Websitekosten in Zwitserland hangen af van scope, content, design, integraties en onderhoud.",
    body: `## Kort antwoord

De kosten van een bedrijfswebsite in Zwitserland hangen af van de scope. Websiteli-pakketten voor Zwitserland starten momenteel vanaf CHF 990, CHF 1'990 en CHF 3'290, met onderhoud vanaf CHF 50 per maand.

## Waarom prijzen verschillen

Twee offertes kunnen vergelijkbaar lijken maar ander werk bevatten: strategie, content, SEO, analytics, formulieren, privacy, performance en lanceringssupport.

## Belangrijkste kostenfactoren

- aantal pagina's
- content en copywriting
- design en branding
- SEO en technische setup
- formulieren, booking, webshop, CRM of nieuwsbrief
- meertaligheid
- onderhoud

## Wat een betaalbare website moet bevatten

Ze moet mobiel, duidelijk, snel, meetbaar, SEO-basis, eenvoudig contact, juridische pagina's en een updateplan bevatten.

## Offertes vergelijken

Vergelijk deliverables, eigendom, content, SEO, tracking, lancering, onderhoud en uitsluitingen.

## Conclusie

De beste keuze is niet altijd de laagste prijs, maar de scope die een duidelijke en onderhoudbare basis maakt.`,
  }),
  ja: makeTranslation({
    language: "ja",
    title: "スイスでビジネスサイトはいくらかかるか",
    description: "スイスの小規模事業向けウェブサイト費用ガイド。価格要因、予算、見積もり比較を解説します。",
    category: "ウェブサイト料金",
    tags: ["スイス ウェブサイト費用", "ウェブサイト価格", "手頃なサイト", "ビジネスサイト費用", "スイスのサイト料金", "費用ガイド"],
    readingTime: "8分で読めます",
    audience: "ウェブサイト予算を検討しているスイスの小規模事業者",
    excerpt: "スイスでのサイト費用は、範囲、コンテンツ、デザイン、連携、保守によって変わります。",
    body: `## 短い答え

スイスでのビジネスサイト費用は範囲によって変わります。Websiteliのスイス向けパッケージは現在、CHF 990、CHF 1'990、CHF 3'290から、保守は月額CHF 50からです。

## なぜ価格が変わるのか

同じように見える見積もりでも、戦略、文章、SEO、分析、フォーム、プライバシー対応、表示速度、公開サポートの有無が違います。

## 主な費用要因

- ページ数
- コンテンツと文章
- デザインとブランド
- SEOと技術設定
- フォーム、予約、EC、CRM、ニュースレター
- 多言語対応
- 保守

## 手頃なサイトに必要なもの

モバイル対応、明確な構成、速度、計測、SEOの基本、連絡導線、法務ページ、更新計画が必要です。

## 見積もりの比較

納品物、所有権、コンテンツ支援、SEO、計測、公開支援、保守、含まれない項目を比較します。

## まとめ

最適な予算は最安値とは限りません。信頼でき、更新しやすく、成長の土台になる範囲を選ぶことが大切です。`,
  }),
};

function makeTranslation(
  translation: Omit<BlogPostTranslation, "summary" | "keyTakeaways" | "chatGptPrompts" | "faqs">,
): BlogPostTranslation {
  const copy = {
    en: {
      summary: "Final price depends on scope, content, technical setup, integrations, and maintenance.",
      takeaways: ["Compare scope, not price alone.", "Confirm ownership, SEO, tracking, forms, and support.", "Budget for maintenance after launch.", "Choose a package that can grow."],
      prompts: [`Estimate a website budget after reading "${translation.title}".`, `Create questions to ask a provider based on "${translation.title}".`, `Compare two offers using the advice in "${translation.title}".`],
      include: "What affects website price most?",
      includeAnswer: "Scope, page count, content, design, SEO, tracking, integrations, multilingual work, and maintenance are the main drivers.",
      compare: "How should I compare offers?",
      compareAnswer: "Compare deliverables, ownership, content help, SEO, analytics, launch support, maintenance, and exclusions.",
    },
    de: {
      summary: "Der Endpreis hängt von Umfang, Inhalt, Technik, Integrationen und Wartung ab.",
      takeaways: ["Vergleichen Sie den Umfang, nicht nur den Preis.", "Klären Sie Eigentum, SEO, Tracking, Formulare und Support.", "Planen Sie Wartung nach dem Launch ein.", "Wählen Sie ein Paket, das wachsen kann."],
      prompts: [`Schätze ein Website-Budget nach dem Lesen von "${translation.title}".`, `Erstelle Fragen an Anbieter auf Basis von "${translation.title}".`, `Vergleiche zwei Angebote mit den Kriterien aus "${translation.title}".`],
      include: "Was beeinflusst den Preis am stärksten?",
      includeAnswer: "Umfang, Seitenzahl, Inhalte, Design, SEO, Tracking, Integrationen, Mehrsprachigkeit und Wartung sind die wichtigsten Faktoren.",
      compare: "Wie sollte ich Angebote vergleichen?",
      compareAnswer: "Vergleichen Sie Leistungen, Eigentum, Content-Hilfe, SEO, Analytics, Launch-Support, Wartung und Ausschlüsse.",
    },
    hu: {
      summary: "A végső ár a terjedelemtől, tartalomtól, technikai beállítástól, integrációktól és karbantartástól függ.",
      takeaways: ["Ne csak árat, hanem terjedelmet hasonlíts össze.", "Tisztázd a tulajdont, SEO-t, mérést, űrlapokat és supportot.", "Tervezz karbantartási költséggel.", "Olyan csomagot válassz, amely növekedhet."],
      prompts: [`Becsülj weboldal-költségvetést a(z) "${translation.title}" alapján.`, `Készíts kérdéslistát szolgáltatóknak a(z) "${translation.title}" alapján.`, `Hasonlíts össze két ajánlatot a(z) "${translation.title}" szempontjai szerint.`],
      include: "Mi befolyásolja leginkább az árat?",
      includeAnswer: "A terjedelem, oldalszám, tartalom, dizájn, SEO, mérés, integrációk, többnyelvűség és karbantartás.",
      compare: "Hogyan hasonlítsam össze az ajánlatokat?",
      compareAnswer: "Nézd a deliverable-öket, tulajdont, tartalmi segítséget, SEO-t, analitikát, indulási támogatást, karbantartást és kizárásokat.",
    },
    pl: {
      summary: "Cena końcowa zależy od zakresu, treści, konfiguracji technicznej, integracji i utrzymania.",
      takeaways: ["Porównuj zakres, nie samą cenę.", "Potwierdź własność, SEO, tracking, formularze i wsparcie.", "Zaplanuj utrzymanie po publikacji.", "Wybierz pakiet, który może rosnąć."],
      prompts: [`Oszacuj budżet strony po lekturze "${translation.title}".`, `Stwórz pytania do dostawcy na podstawie "${translation.title}".`, `Porównaj dwie oferty według "${translation.title}".`],
      include: "Co najmocniej wpływa na cenę?",
      includeAnswer: "Zakres, liczba stron, treści, design, SEO, tracking, integracje, języki i utrzymanie.",
      compare: "Jak porównać oferty?",
      compareAnswer: "Porównuj zakres, własność, wsparcie treści, SEO, analitykę, start, utrzymanie i wyłączenia.",
    },
    es: {
      summary: "El precio final depende de alcance, contenido, configuración técnica, integraciones y mantenimiento.",
      takeaways: ["Compara alcance, no solo precio.", "Confirma propiedad, SEO, tracking, formularios y soporte.", "Presupuesta mantenimiento después del lanzamiento.", "Elige un paquete que pueda crecer."],
      prompts: [`Estima un presupuesto web tras leer "${translation.title}".`, `Crea preguntas para un proveedor basadas en "${translation.title}".`, `Compara dos ofertas con los criterios de "${translation.title}".`],
      include: "¿Qué influye más en el precio?",
      includeAnswer: "Alcance, páginas, contenido, diseño, SEO, tracking, integraciones, idiomas y mantenimiento.",
      compare: "¿Cómo comparar ofertas?",
      compareAnswer: "Compara entregables, propiedad, ayuda con contenido, SEO, analítica, lanzamiento, mantenimiento y exclusiones.",
    },
    fr: {
      summary: "Le prix final dépend du périmètre, du contenu, de la technique, des intégrations et de la maintenance.",
      takeaways: ["Comparez le périmètre, pas seulement le prix.", "Vérifiez propriété, SEO, tracking, formulaires et support.", "Prévoyez la maintenance après lancement.", "Choisissez une offre évolutive."],
      prompts: [`Estime un budget site après "${translation.title}".`, `Crée des questions pour un prestataire à partir de "${translation.title}".`, `Compare deux offres avec les critères de "${translation.title}".`],
      include: "Qu'est-ce qui influence le plus le prix ?",
      includeAnswer: "Périmètre, pages, contenu, design, SEO, tracking, intégrations, langues et maintenance.",
      compare: "Comment comparer les offres ?",
      compareAnswer: "Comparez livrables, propriété, aide au contenu, SEO, analytics, lancement, maintenance et exclusions.",
    },
    it: {
      summary: "Il prezzo finale dipende da ambito, contenuti, setup tecnico, integrazioni e manutenzione.",
      takeaways: ["Confronta l'ambito, non solo il prezzo.", "Verifica proprietà, SEO, tracking, form e supporto.", "Prevedi manutenzione dopo il lancio.", "Scegli un pacchetto che possa crescere."],
      prompts: [`Stima un budget web dopo "${translation.title}".`, `Crea domande per un fornitore basate su "${translation.title}".`, `Confronta due offerte con i criteri di "${translation.title}".`],
      include: "Cosa incide di più sul prezzo?",
      includeAnswer: "Ambito, pagine, contenuti, design, SEO, tracking, integrazioni, lingue e manutenzione.",
      compare: "Come confrontare le offerte?",
      compareAnswer: "Confronta deliverable, proprietà, aiuto sui contenuti, SEO, analytics, lancio, manutenzione ed esclusioni.",
    },
    cz: {
      summary: "Konečná cena závisí na rozsahu, obsahu, technickém nastavení, integracích a údržbě.",
      takeaways: ["Porovnávejte rozsah, ne jen cenu.", "Ověřte vlastnictví, SEO, měření, formuláře a podporu.", "Počítejte s údržbou po spuštění.", "Vyberte balíček, který může růst."],
      prompts: [`Odhadni rozpočet webu po přečtení "${translation.title}".`, `Vytvoř otázky pro dodavatele podle "${translation.title}".`, `Porovnej dvě nabídky podle "${translation.title}".`],
      include: "Co nejvíc ovlivňuje cenu?",
      includeAnswer: "Rozsah, počet stránek, obsah, design, SEO, měření, integrace, jazyky a údržba.",
      compare: "Jak porovnat nabídky?",
      compareAnswer: "Porovnejte výstupy, vlastnictví, pomoc s obsahem, SEO, analytiku, spuštění, údržbu a výluky.",
    },
    sk: {
      summary: "Konečná cena závisí od rozsahu, obsahu, technického nastavenia, integrácií a údržby.",
      takeaways: ["Porovnávajte rozsah, nie len cenu.", "Overte vlastníctvo, SEO, meranie, formuláre a podporu.", "Počítajte s údržbou po spustení.", "Vyberte balíček, ktorý môže rásť."],
      prompts: [`Odhadni rozpočet webu po prečítaní "${translation.title}".`, `Vytvor otázky pre dodávateľa podľa "${translation.title}".`, `Porovnaj dve ponuky podľa "${translation.title}".`],
      include: "Čo najviac ovplyvňuje cenu?",
      includeAnswer: "Rozsah, počet stránok, obsah, dizajn, SEO, meranie, integrácie, jazyky a údržba.",
      compare: "Ako porovnať ponuky?",
      compareAnswer: "Porovnajte výstupy, vlastníctvo, pomoc s obsahom, SEO, analytiku, spustenie, údržbu a výluky.",
    },
    pt: {
      summary: "O preço final depende de escopo, conteúdo, configuração técnica, integrações e manutenção.",
      takeaways: ["Compare escopo, não só preço.", "Confirme propriedade, SEO, tracking, formulários e suporte.", "Inclua manutenção após o lançamento.", "Escolha um pacote que possa crescer."],
      prompts: [`Estima um orçamento de site depois de ler "${translation.title}".`, `Cria perguntas para um fornecedor com base em "${translation.title}".`, `Compara duas propostas usando "${translation.title}".`],
      include: "O que mais influencia o preço?",
      includeAnswer: "Escopo, páginas, conteúdo, design, SEO, tracking, integrações, idiomas e manutenção.",
      compare: "Como comparar propostas?",
      compareAnswer: "Compare entregáveis, propriedade, apoio de conteúdo, SEO, analytics, lançamento, manutenção e exclusões.",
    },
    da: {
      summary: "Den endelige pris afhænger af scope, indhold, teknisk opsætning, integrationer og vedligehold.",
      takeaways: ["Sammenlign scope, ikke kun pris.", "Bekræft ejerskab, SEO, tracking, formularer og support.", "Budgettér med vedligehold efter lancering.", "Vælg en pakke, der kan vokse."],
      prompts: [`Estimer et websitebudget efter "${translation.title}".`, `Lav spørgsmål til en leverandør ud fra "${translation.title}".`, `Sammenlign to tilbud med rådene i "${translation.title}".`],
      include: "Hvad påvirker prisen mest?",
      includeAnswer: "Scope, sider, indhold, design, SEO, tracking, integrationer, sprog og vedligehold.",
      compare: "Hvordan sammenligner jeg tilbud?",
      compareAnswer: "Sammenlign leverancer, ejerskab, indholdshjælp, SEO, analytics, lancering, vedligehold og fravalg.",
    },
    nl: {
      summary: "De eindprijs hangt af van scope, content, technische setup, integraties en onderhoud.",
      takeaways: ["Vergelijk scope, niet alleen prijs.", "Bevestig eigendom, SEO, tracking, formulieren en support.", "Budgetteer onderhoud na lancering.", "Kies een pakket dat kan meegroeien."],
      prompts: [`Schat een websitebudget na het lezen van "${translation.title}".`, `Maak vragen voor een aanbieder op basis van "${translation.title}".`, `Vergelijk twee offertes met de criteria uit "${translation.title}".`],
      include: "Wat beïnvloedt de prijs het meest?",
      includeAnswer: "Scope, pagina's, content, design, SEO, tracking, integraties, talen en onderhoud.",
      compare: "Hoe vergelijk ik offertes?",
      compareAnswer: "Vergelijk deliverables, eigendom, contenthulp, SEO, analytics, lancering, onderhoud en uitsluitingen.",
    },
    ja: {
      summary: "最終費用は、範囲、コンテンツ、技術設定、連携、保守によって変わります。",
      takeaways: ["価格だけでなく範囲を比較する。", "所有権、SEO、計測、フォーム、サポートを確認する。", "公開後の保守費を見込む。", "成長できるパッケージを選ぶ。"],
      prompts: [`「${translation.title}」をもとにサイト予算を見積もってください。`, `「${translation.title}」をもとに制作会社へ聞く質問を作ってください。`, `「${translation.title}」の基準で2つの見積もりを比較してください。`],
      include: "費用に最も影響するものは何ですか。",
      includeAnswer: "範囲、ページ数、コンテンツ、デザイン、SEO、計測、連携、多言語、保守です。",
      compare: "見積もりはどう比較しますか。",
      compareAnswer: "納品物、所有権、コンテンツ支援、SEO、分析、公開支援、保守、含まれない項目を比べます。",
    },
  }[translation.language];

  return {
    ...translation,
    summary: [translation.description, translation.excerpt, copy.summary],
    keyTakeaways: copy.takeaways,
    chatGptPrompts: copy.prompts,
    faqs: [
      {
        question: translation.title,
        answer: translation.excerpt,
      },
      {
        question: copy.include,
        answer: copy.includeAnswer,
      },
      {
        question: copy.compare,
        answer: copy.compareAnswer,
      },
    ],
  };
}

export default {
  slug: "website-cost-switzerland",
  title: "How Much Does a Business Website Cost in Switzerland?",
  language: "en",
  description: "A practical Swiss website cost guide for small businesses, including what affects price, what to budget for, and how to compare offers.",
  tags: ["website cost switzerland", "website price", "affordable website", "business website cost", "Swiss website pricing", "website cost guide"],
  published: true,
  status: "published",
  image: "/assets/blog/website-cost-switzerland.png",
  imageAlt: "Swiss business website pricing guide showing package scope, CHF starting prices, and maintenance factors.",
  author: "Websiteli",
  date: "2026-07-03",
  publishDate: "2026-07-03",
  updated: "2026-07-06",
  related: [
    "/en/services-pricing/",
    "/en/blog/business-website-features/",
    "/en/blog/small-business-website/",
    "/en/contact/",
  ],
  translations,
} satisfies BlogPostSource;
