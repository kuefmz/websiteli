import type { BlogPostSource, BlogPostTranslation } from "../types";

const references = [
  {
    publisher: "Google Business Profile",
    title: "Get Listed on Google",
    href: "https://business.google.com/us/business-profile/",
  },
  {
    publisher: "Google Business Profile Help",
    title: "Tips to improve your local ranking on Google",
    href: "https://support.google.com/business/answer/7091",
  },
  {
    publisher: "Google Search Central",
    title: "Search Engine Optimization Starter Guide",
    href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
  },
  {
    publisher: "Stanford Web Credibility Research",
    title: "Web Credibility Guidelines",
    href: "https://credibility.stanford.edu/guidelines/index.html",
  },
];

const translations: BlogPostSource["translations"] = {
  en: {
    title: "Why Every Local Business Needs a Website",
    description: "Learn why every local business needs a website, what it should include, and how it supports local marketing and customer trust.",
    category: "Local Business",
    tags: ["local business website", "website for local business", "local marketing", "small business website", "local SEO", "online presence"],
    language: "en",
    readingTime: "7 min read",
    audience: "Local business owners, service providers, and independent shops",
    excerpt: "A local business website gives customers one reliable place to understand your offer, verify your details, trust your business, and contact you.",
    summary: [
      "A website gives a local business a stable online home for services, opening hours, service area, proof, and contact details.",
      "Google Business Profile, directories, and social pages are useful, but they work best when they point back to a website the business controls.",
      "The strongest local websites are clear, mobile-friendly, easy to update, and focused on the questions customers ask before contacting you.",
    ],
    keyTakeaways: [
      "Use your website as the main online home for local customers.",
      "Keep contact details, opening hours, service areas, and offers current.",
      "Connect Google Business Profile, social posts, referrals, and print materials back to useful website pages.",
      "Build trust with reviews, real photos, service details, legal pages, and clear next steps.",
    ],
    chatGptPrompts: [
      "Turn this article into a launch checklist for my local business website.",
      "Suggest the most important pages for my local service business.",
      "Review my local online presence and tell me where a website would help most.",
    ],
    references,
    faqs: [
      {
        question: "Does every local business need a website?",
        answer: "Most local businesses benefit from a website because it gives customers one reliable place to check services, opening hours, location or service area, reviews, and contact options.",
      },
      {
        question: "Is a social profile enough for a local business?",
        answer: "A social profile can support updates and community contact, but it does not provide the same control, structure, SEO foundation, or credibility as a website.",
      },
      {
        question: "What should a local business website include?",
        answer: "Start with a clear homepage, service or product details, opening hours, service area, reviews or proof, FAQs, contact options, privacy/legal pages, and basic local SEO.",
      },
    ],
    body: `## Why a local business website still matters

A local business website is one of the simplest ways to make your business easier to find and easier to trust. It gives customers a stable place to check what you offer, where you work, when you are open, and how to contact you.

Google Business Profile can help a business appear on Google Search and Maps, and Google recommends complete, detailed business information for local relevance ([Google Business Profile Help](https://support.google.com/business/answer/7091)). Your website supports that presence with deeper service information, proof, and a clear contact path.

## Customers check online before they contact you

Even when a business is local, customers still check online. They want to know whether the business looks active, professional, and relevant to their need.

A website helps answer:

- What exactly do you offer?
- Are you open today?
- Do you serve my area?
- Can I see examples, reviews, or prices?
- How do I contact you?
- Can I trust this business?

## Your website is the online home you control

Social platforms and directories are useful, but your website is the place where you control the structure, message, design, and customer journey.

Stanford's credibility guidelines recommend making contact information easy to find and making it easy to verify the organization behind a site ([Stanford Web Credibility Research](https://credibility.stanford.edu/guidelines/index.html)). A local website is where those details can be presented clearly.

## What a local business website should include

The best local business websites are practical. Start with:

- A clear homepage that says what you do and who you help
- Service or product details
- Location, service area, and opening hours
- Reviews, testimonials, real photos, or proof of work
- A contact page with form, phone, email, and map if relevant
- FAQ answers for common questions
- Privacy and legal pages where needed
- Mobile-friendly design, fast loading, and basic SEO metadata

## How a website supports local marketing

Local marketing works best when every channel has a clear next step. Google Business Profile, social posts, flyers, QR codes, referrals, and email campaigns can point people to pages that explain the offer and encourage contact.

Google's SEO starter guide recommends useful, people-first content and clear page structure for search visibility ([Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)). A focused local website gives search engines and customers more context than a profile listing alone.

## Website vs listings and social profiles

Listings help people discover that you exist. Social profiles help people see activity and updates. Your website helps people understand, trust, and contact you.

The strongest setup uses all three, with the website as the central point.

## Local business website checklist

Review your website against this checklist:

- Can a visitor understand your offer quickly?
- Are opening hours and contact details current?
- Does the homepage mention your location or service area?
- Is the site easy to use on a phone?
- Are reviews or trust signals visible?
- Is every key service explained clearly?
- Is there a clear contact button near important content?
- Are page titles and headings specific?

## Conclusion

Every local business needs a reliable online home. A website strengthens trust, supports local marketing, improves clarity, and gives the business a digital asset it controls.

Start simple, keep the information accurate, and make contact easy.`,
  },
  de: makeTranslation({
    language: "de",
    title: "Warum jedes lokale Unternehmen eine Website braucht",
    description: "Warum lokale Unternehmen eine Website brauchen, welche Inhalte wichtig sind und wie sie lokales Marketing und Vertrauen stärkt.",
    category: "Lokales Unternehmen",
    tags: ["lokale Unternehmenswebsite", "Website für lokale Unternehmen", "lokales Marketing", "KMU-Website", "lokales SEO", "Online-Präsenz"],
    readingTime: "7 Min. Lesezeit",
    audience: "Lokale Unternehmen, Dienstleister und unabhängige Geschäfte",
    excerpt: "Eine lokale Unternehmenswebsite bündelt Angebot, Öffnungszeiten, Einsatzgebiet, Vertrauen und Kontakt in einem Ort.",
    body: `## Warum eine lokale Website wichtig bleibt

Eine lokale Unternehmenswebsite macht Ihr Unternehmen leichter auffindbar und leichter überprüfbar. Kunden sehen dort, was Sie anbieten, wo Sie arbeiten, wann Sie geöffnet haben und wie sie Kontakt aufnehmen können.

## Kunden prüfen online vor dem Kontakt

Auch lokale Kunden recherchieren zuerst online. Sie wollen schnell verstehen, ob Ihr Angebot passt und ob Ihr Unternehmen aktiv und vertrauenswürdig wirkt.

## Ihr eigener digitaler Ort

Social Media und Verzeichnisse helfen, aber die Website gehört zu Ihrer eigenen Struktur. Dort bestimmen Sie Reihenfolge, Inhalte, Design und Kontaktweg.

## Was enthalten sein sollte

- klare Startseite
- Leistungen oder Produkte
- Standort, Einzugsgebiet und Öffnungszeiten
- Bewertungen, echte Fotos oder Arbeitsbeispiele
- Kontaktformular, Telefon, E-Mail und Karte
- FAQ und rechtliche Seiten
- mobile Darstellung und SEO-Grundlagen

## Wie sie lokales Marketing unterstützt

Google Business Profile, Social Posts, Flyer, QR-Codes und Empfehlungen brauchen ein Ziel. Die Website erklärt das Angebot ausführlicher und macht den nächsten Schritt einfach.

## Checkliste

Prüfen Sie: Versteht man das Angebot schnell? Sind Kontaktdaten aktuell? Ist die mobile Nutzung gut? Sind Vertrauenssignale sichtbar? Hat jede wichtige Leistung klare Informationen?

## Fazit

Eine lokale Website ist kein Luxus. Sie ist der stabile Online-Ort, an dem Kunden verstehen, vertrauen und Kontakt aufnehmen können.`,
  }),
  hu: makeTranslation({
    language: "hu",
    title: "Miért kell minden helyi vállalkozásnak weboldal",
    description: "Mire jó egy helyi vállalkozói weboldal, mit tartalmazzon, és hogyan segíti a helyi marketinget és a bizalmat.",
    category: "Helyi vállalkozás",
    tags: ["helyi vállalkozás weboldal", "weboldal helyi cégnek", "helyi marketing", "kisvállalkozói weboldal", "helyi SEO", "online jelenlét"],
    readingTime: "7 perc olvasás",
    audience: "Helyi vállalkozók, szolgáltatók és független üzletek",
    excerpt: "Egy helyi vállalkozás weboldala egy helyre gyűjti az ajánlatot, nyitvatartást, elérhetőséget és bizalmi elemeket.",
    body: `## Miért fontos még mindig a helyi weboldal

Egy helyi vállalkozói weboldal segít, hogy az ügyfelek könnyebben megtaláljanak és megbízzanak benned. Megmutatja, mit kínálsz, hol dolgozol, mikor vagy elérhető és hogyan lehet kapcsolatba lépni.

## Az ügyfelek online ellenőriznek

Még ismerős helyi cégek esetén is sokan először online nézik meg az információkat. Gyors választ keresnek: nekik szól-e az ajánlat, aktív-e a cég, könnyű-e kapcsolatba lépni.

## A weboldal a saját online otthonod

A közösségi oldalak és katalógusok hasznosak, de a weboldalon te irányítod a szerkezetet, a szöveget, a megjelenést és az ügyfélutat.

## Mit tartalmazzon

- egyértelmű főoldal
- szolgáltatások vagy termékek
- helyszín, szolgáltatási terület és nyitvatartás
- vélemények, valódi fotók vagy referenciák
- kapcsolat űrlappal, telefonnal és e-maillel
- GYIK, adatvédelem és jogi oldalak
- mobilbarát kialakítás és SEO alapok

## Hogyan segíti a helyi marketinget

A Google Business Profile, social posztok, szórólapok, QR-kódok és ajánlások mind egy világos céloldalra vezethetnek. Ez a weboldal.

## Ellenőrzőlista

Érthető gyorsan az ajánlat? Frissek az adatok? Jó mobilon? Láthatóak a bizalmi jelek? Minden fontos szolgáltatás világosan le van írva?

## Összegzés

Egy helyi vállalkozásnak stabil online helyre van szüksége. A weboldal bizalmat épít, támogatja a marketinget és megkönnyíti a kapcsolatfelvételt.`,
  }),
  pl: makeTranslation({
    language: "pl",
    title: "Dlaczego każda lokalna firma potrzebuje strony internetowej",
    description: "Dlaczego lokalna firma potrzebuje strony, co powinna zawierać i jak wspiera lokalny marketing oraz zaufanie klientów.",
    category: "Firma lokalna",
    tags: ["strona lokalnej firmy", "strona dla lokalnego biznesu", "marketing lokalny", "strona małej firmy", "lokalne SEO", "obecność online"],
    readingTime: "7 min czytania",
    audience: "Właściciele lokalnych firm, usługodawcy i niezależne sklepy",
    excerpt: "Strona lokalnej firmy daje klientom jedno wiarygodne miejsce na ofertę, godziny, obszar działania, dowody zaufania i kontakt.",
    body: `## Dlaczego lokalna strona nadal ma znaczenie

Strona internetowa pomaga lokalnej firmie być łatwiejszą do znalezienia i sprawdzenia. Klient widzi, co oferujesz, gdzie działasz, kiedy jesteś dostępny i jak się skontaktować.

## Klienci sprawdzają online

Nawet lokalni klienci często zaczynają od internetu. Chcą zobaczyć, czy firma jest aktywna, profesjonalna i pasuje do ich potrzeby.

## To miejsce, które kontrolujesz

Media społecznościowe i katalogi pomagają, ale to na stronie kontrolujesz treść, układ, markę i ścieżkę kontaktu.

## Co powinna zawierać

- jasną stronę główną
- usługi lub produkty
- lokalizację, obszar działania i godziny
- opinie, zdjęcia lub przykłady pracy
- formularz, telefon, e-mail i mapę
- FAQ oraz strony prawne
- wersję mobilną i podstawy SEO

## Jak wspiera marketing lokalny

Profil Firmy w Google, posty, ulotki, kody QR i polecenia powinny prowadzić do miejsca, które wyjaśnia ofertę. Strona jest takim miejscem.

## Checklista

Czy oferta jest jasna od razu? Czy dane są aktualne? Czy strona działa na telefonie? Czy widać sygnały zaufania? Czy każda ważna usługa jest opisana?

## Wniosek

Lokalna firma potrzebuje stabilnego domu online. Strona buduje zaufanie, wspiera marketing i ułatwia kontakt.`,
  }),
  es: makeTranslation({
    language: "es",
    title: "Por qué todo negocio local necesita una web",
    description: "Por qué un negocio local necesita una web, qué debe incluir y cómo apoya el marketing local y la confianza.",
    category: "Negocio local",
    tags: ["web de negocio local", "web para negocio local", "marketing local", "web de pequeña empresa", "SEO local", "presencia online"],
    readingTime: "7 min de lectura",
    audience: "Negocios locales, proveedores de servicios y tiendas independientes",
    excerpt: "Una web de negocio local reúne oferta, horarios, zona de servicio, pruebas de confianza y contacto en un lugar fiable.",
    body: `## Por qué una web local sigue importando

Una web hace que un negocio local sea más fácil de encontrar y de comprobar. El cliente ve qué ofreces, dónde trabajas, cuándo estás disponible y cómo contactar.

## Los clientes revisan online antes de contactar

Aunque el negocio sea cercano, muchas personas miran primero en internet. Quieren saber si la empresa está activa, si parece profesional y si resuelve su necesidad.

## Tu espacio digital propio

Las redes sociales y directorios ayudan, pero la web es el lugar donde controlas estructura, mensaje, diseño y camino hacia el contacto.

## Qué debe incluir

- portada clara
- servicios o productos
- ubicación, zona y horarios
- reseñas, fotos reales o ejemplos
- formulario, teléfono, email y mapa
- FAQ y páginas legales
- diseño móvil y SEO básico

## Cómo apoya el marketing local

Google Business Profile, publicaciones sociales, folletos, códigos QR y recomendaciones necesitan un destino claro. La web explica la oferta y facilita el siguiente paso.

## Checklist

¿Se entiende la oferta rápido? ¿Los datos están actualizados? ¿Funciona en móvil? ¿Hay señales de confianza? ¿Cada servicio importante está explicado?

## Conclusión

Todo negocio local necesita una base online estable. La web aumenta la confianza, apoya el marketing y hace más fácil contactar.`,
  }),
  fr: makeTranslation({
    language: "fr",
    title: "Pourquoi chaque entreprise locale a besoin d'un site web",
    description: "Pourquoi une entreprise locale a besoin d'un site, ce qu'il doit contenir et comment il soutient le marketing local et la confiance.",
    category: "Entreprise locale",
    tags: ["site d'entreprise locale", "site pour commerce local", "marketing local", "site de petite entreprise", "SEO local", "présence en ligne"],
    readingTime: "7 min de lecture",
    audience: "Entreprises locales, prestataires et commerces indépendants",
    excerpt: "Un site d'entreprise locale rassemble l'offre, les horaires, la zone de service, les preuves de confiance et le contact au même endroit.",
    body: `## Pourquoi un site local reste important

Un site web rend une entreprise locale plus facile à trouver et à vérifier. Les clients y voient ce que vous proposez, où vous intervenez, quand vous êtes ouvert et comment vous contacter.

## Les clients vérifient en ligne

Même pour une entreprise de proximité, beaucoup de clients consultent internet avant de prendre contact. Ils cherchent une entreprise active, professionnelle et pertinente.

## Votre espace numérique contrôlé

Les réseaux sociaux et annuaires sont utiles, mais le site est l'endroit où vous contrôlez la structure, le message, l'image et le parcours de contact.

## Ce qu'il doit inclure

- page d'accueil claire
- services ou produits
- localisation, zone et horaires
- avis, photos réelles ou exemples
- formulaire, téléphone, e-mail et carte
- FAQ et pages légales
- mobile et bases SEO

## Comment il soutient le marketing local

Google Business Profile, posts sociaux, flyers, QR codes et recommandations ont besoin d'une destination claire. Le site explique l'offre et facilite l'action.

## Checklist

L'offre est-elle claire rapidement ? Les informations sont-elles à jour ? Le mobile fonctionne-t-il bien ? Les preuves de confiance sont-elles visibles ? Les services clés sont-ils expliqués ?

## Conclusion

Une entreprise locale a besoin d'un point d'ancrage en ligne. Un site renforce la confiance, soutient le marketing et facilite le contact.`,
  }),
  it: makeTranslation({
    language: "it",
    title: "Perché ogni attività locale ha bisogno di un sito web",
    description: "Perché un'attività locale ha bisogno di un sito, cosa deve includere e come sostiene marketing locale e fiducia.",
    category: "Attività locale",
    tags: ["sito per attività locale", "sito per business locale", "marketing locale", "sito piccola impresa", "SEO locale", "presenza online"],
    readingTime: "7 min di lettura",
    audience: "Attività locali, fornitori di servizi e negozi indipendenti",
    excerpt: "Un sito per attività locale raccoglie offerta, orari, area servita, prove di fiducia e contatti in un luogo affidabile.",
    body: `## Perché un sito locale conta ancora

Un sito rende un'attività locale più facile da trovare e verificare. I clienti vedono cosa offri, dove lavori, quando sei aperto e come contattarti.

## I clienti controllano online

Anche per un'attività vicina, molte persone cercano prima online. Vogliono capire se l'azienda è attiva, professionale e adatta al loro bisogno.

## Il tuo spazio digitale

Social e directory sono utili, ma il sito è il luogo in cui controlli struttura, messaggio, design e percorso di contatto.

## Cosa deve includere

- homepage chiara
- servizi o prodotti
- posizione, area e orari
- recensioni, foto reali o lavori
- form, telefono, email e mappa
- FAQ e pagine legali
- mobile e basi SEO

## Come sostiene il marketing locale

Google Business Profile, post social, volantini, QR code e passaparola hanno bisogno di una destinazione chiara. Il sito spiega l'offerta e facilita il passo successivo.

## Checklist

L'offerta si capisce subito? I dati sono aggiornati? Il sito funziona su mobile? Ci sono segnali di fiducia? Ogni servizio importante è spiegato?

## Conclusione

Ogni attività locale ha bisogno di una base online stabile. Il sito crea fiducia, sostiene il marketing e rende più semplice il contatto.`,
  }),
  cz: makeTranslation({
    language: "cz",
    title: "Proč každá lokální firma potřebuje web",
    description: "Proč lokální firma potřebuje web, co má obsahovat a jak podporuje místní marketing a důvěru zákazníků.",
    category: "Lokální firma",
    tags: ["web lokální firmy", "web pro místní podnikání", "místní marketing", "web malé firmy", "lokální SEO", "online prezentace"],
    readingTime: "7 min čtení",
    audience: "Lokální firmy, poskytovatelé služeb a nezávislé obchody",
    excerpt: "Web lokální firmy dává zákazníkům jedno spolehlivé místo pro nabídku, otevírací dobu, oblast působení, důvěru a kontakt.",
    body: `## Proč lokální web stále dává smysl

Web pomáhá místní firmě být lépe dohledatelná a důvěryhodná. Zákazník zjistí, co nabízíte, kde působíte, kdy máte otevřeno a jak vás kontaktovat.

## Zákazníci kontrolují informace online

I u místních firem lidé často začínají na internetu. Chtějí rychle poznat, zda firma působí aktivně, profesionálně a relevantně.

## Váš vlastní online prostor

Sociální sítě a katalogy pomáhají, ale web je místo, kde ovládáte strukturu, sdělení, vzhled a cestu ke kontaktu.

## Co má obsahovat

- jasnou úvodní stránku
- služby nebo produkty
- lokalitu, oblast a otevírací dobu
- recenze, reálné fotky nebo ukázky práce
- formulář, telefon, e-mail a mapu
- FAQ a právní stránky
- mobilní zobrazení a SEO základy

## Jak podporuje místní marketing

Google Business Profile, sociální příspěvky, letáky, QR kódy a doporučení potřebují jasný cíl. Web vysvětluje nabídku a usnadňuje další krok.

## Checklist

Je nabídka rychle pochopitelná? Jsou údaje aktuální? Funguje web na mobilu? Jsou vidět signály důvěry? Jsou hlavní služby popsané?

## Závěr

Lokální firma potřebuje stabilní online základ. Web posiluje důvěru, podporuje marketing a usnadňuje kontakt.`,
  }),
  sk: makeTranslation({
    language: "sk",
    title: "Prečo každá lokálna firma potrebuje web",
    description: "Prečo lokálna firma potrebuje web, čo má obsahovať a ako podporuje miestny marketing a dôveru zákazníkov.",
    category: "Lokálna firma",
    tags: ["web lokálnej firmy", "web pre miestne podnikanie", "miestny marketing", "web malej firmy", "lokálne SEO", "online prezentácia"],
    readingTime: "7 min čítania",
    audience: "Lokálne firmy, poskytovatelia služieb a nezávislé obchody",
    excerpt: "Web lokálnej firmy dáva zákazníkom jedno spoľahlivé miesto pre ponuku, otváracie hodiny, oblasť pôsobenia, dôveru a kontakt.",
    body: `## Prečo lokálny web stále dáva zmysel

Web pomáha miestnej firme byť lepšie nájdená a overená. Zákazník zistí, čo ponúkate, kde pôsobíte, kedy máte otvorené a ako vás kontaktovať.

## Zákazníci kontrolujú online

Aj pri lokálnych firmách ľudia často začínajú na internete. Chcú rýchlo zistiť, či firma pôsobí aktívne, profesionálne a relevantne.

## Váš vlastný online priestor

Sociálne siete a katalógy pomáhajú, ale web je miesto, kde ovládate štruktúru, správu, vzhľad a cestu ku kontaktu.

## Čo má obsahovať

- jasnú úvodnú stránku
- služby alebo produkty
- lokalitu, oblasť a otváracie hodiny
- recenzie, reálne fotky alebo ukážky práce
- formulár, telefón, e-mail a mapu
- FAQ a právne stránky
- mobilné zobrazenie a SEO základy

## Ako podporuje miestny marketing

Google Business Profile, sociálne príspevky, letáky, QR kódy a odporúčania potrebujú jasný cieľ. Web vysvetľuje ponuku a uľahčuje ďalší krok.

## Checklist

Je ponuka rýchlo pochopiteľná? Sú údaje aktuálne? Funguje web na mobile? Sú viditeľné signály dôvery? Sú hlavné služby opísané?

## Záver

Lokálna firma potrebuje stabilný online základ. Web posilňuje dôveru, podporuje marketing a zjednodušuje kontakt.`,
  }),
  pt: makeTranslation({
    language: "pt",
    title: "Porque todos os negócios locais precisam de um site",
    description: "Porque um negócio local precisa de um site, o que deve incluir e como apoia o marketing local e a confiança.",
    category: "Negócio local",
    tags: ["site para negócio local", "site de empresa local", "marketing local", "site para pequena empresa", "SEO local", "presença online"],
    readingTime: "7 min de leitura",
    audience: "Negócios locais, prestadores de serviços e lojas independentes",
    excerpt: "Um site de negócio local reúne oferta, horários, área de serviço, confiança e contactos num lugar fiável.",
    body: `## Porque um site local ainda importa

Um site torna o negócio local mais fácil de encontrar e confirmar. O cliente vê o que oferece, onde trabalha, quando está aberto e como entrar em contacto.

## Os clientes verificam online

Mesmo em negócios locais, muitas pessoas pesquisam primeiro na internet. Querem perceber se a empresa está ativa, profissional e adequada à sua necessidade.

## O seu espaço digital próprio

Redes sociais e diretórios ajudam, mas o site é o lugar onde controla a estrutura, a mensagem, o design e o caminho de contacto.

## O que deve incluir

- página inicial clara
- serviços ou produtos
- localização, área e horários
- avaliações, fotos reais ou exemplos
- formulário, telefone, email e mapa
- FAQ e páginas legais
- versão mobile e bases de SEO

## Como apoia o marketing local

Google Business Profile, posts sociais, flyers, QR codes e recomendações precisam de um destino claro. O site explica a oferta e facilita o próximo passo.

## Checklist

A oferta percebe-se depressa? Os dados estão atualizados? Funciona bem no telemóvel? Há sinais de confiança? Os serviços principais estão explicados?

## Conclusão

Todo negócio local precisa de uma base online estável. O site cria confiança, apoia o marketing e facilita o contacto.`,
  }),
  da: makeTranslation({
    language: "da",
    title: "Hvorfor enhver lokal virksomhed har brug for et website",
    description: "Hvorfor lokale virksomheder har brug for et website, hvad det bør indeholde, og hvordan det støtter lokal markedsføring og tillid.",
    category: "Lokal virksomhed",
    tags: ["lokal virksomhedswebsite", "website til lokal virksomhed", "lokal markedsføring", "website til mindre virksomhed", "lokal SEO", "online tilstedeværelse"],
    readingTime: "7 min læsning",
    audience: "Lokale virksomheder, serviceudbydere og uafhængige butikker",
    excerpt: "Et lokalt website samler tilbud, åbningstider, serviceområde, tillidssignaler og kontakt på et pålideligt sted.",
    body: `## Hvorfor et lokalt website stadig betyder noget

Et website gør en lokal virksomhed lettere at finde og kontrollere. Kunden kan se, hvad du tilbyder, hvor du arbejder, hvornår du har åbent, og hvordan man kontakter dig.

## Kunder tjekker online

Selv lokale kunder starter ofte online. De vil se, om virksomheden virker aktiv, professionel og relevant.

## Dit eget digitale sted

Sociale medier og kataloger hjælper, men websitet er stedet, hvor du styrer struktur, budskab, design og kontaktvej.

## Hvad det bør indeholde

- klar forside
- ydelser eller produkter
- placering, område og åbningstider
- anmeldelser, rigtige billeder eller eksempler
- formular, telefon, e-mail og kort
- FAQ og juridiske sider
- mobilvenligt design og SEO-basics

## Hvordan det støtter lokal markedsføring

Google Business Profile, sociale opslag, flyers, QR-koder og anbefalinger har brug for et klart mål. Websitet forklarer tilbuddet og gør næste skridt nemt.

## Tjekliste

Er tilbuddet hurtigt forståeligt? Er oplysningerne aktuelle? Fungerer siden på mobil? Er tillidssignaler synlige? Er de vigtigste ydelser forklaret?

## Konklusion

En lokal virksomhed har brug for en stabil online base. Et website skaber tillid, støtter markedsføring og gør kontakt lettere.`,
  }),
  nl: makeTranslation({
    language: "nl",
    title: "Waarom elk lokaal bedrijf een website nodig heeft",
    description: "Waarom lokale bedrijven een website nodig hebben, wat erop moet staan en hoe die lokale marketing en vertrouwen ondersteunt.",
    category: "Lokaal bedrijf",
    tags: ["website lokaal bedrijf", "website voor lokale onderneming", "lokale marketing", "website klein bedrijf", "lokale SEO", "online aanwezigheid"],
    readingTime: "7 min lezen",
    audience: "Lokale ondernemers, dienstverleners en zelfstandige winkels",
    excerpt: "Een lokale bedrijfswebsite bundelt aanbod, openingstijden, werkgebied, vertrouwen en contact op een betrouwbare plek.",
    body: `## Waarom een lokale website nog steeds belangrijk is

Een website maakt een lokaal bedrijf makkelijker vindbaar en betrouwbaarder. Klanten zien wat je aanbiedt, waar je werkt, wanneer je open bent en hoe ze contact opnemen.

## Klanten controleren online

Ook lokale klanten kijken vaak eerst online. Ze willen snel zien of het bedrijf actief, professioneel en relevant is.

## Je eigen digitale plek

Social media en vermeldingen helpen, maar de website is de plek waar je structuur, boodschap, ontwerp en contactroute beheert.

## Wat erop moet staan

- duidelijke homepage
- diensten of producten
- locatie, werkgebied en openingstijden
- reviews, echte foto's of voorbeelden
- formulier, telefoon, e-mail en kaart
- FAQ en juridische pagina's
- mobiel ontwerp en SEO-basis

## Hoe het lokale marketing ondersteunt

Google Business Profile, social posts, flyers, QR-codes en verwijzingen hebben een duidelijke bestemming nodig. De website legt het aanbod uit en maakt de volgende stap makkelijk.

## Checklist

Is het aanbod snel duidelijk? Zijn gegevens actueel? Werkt de site op mobiel? Zijn vertrouwenssignalen zichtbaar? Zijn belangrijke diensten uitgelegd?

## Conclusie

Een lokaal bedrijf heeft een stabiele online basis nodig. Een website bouwt vertrouwen op, ondersteunt marketing en maakt contact eenvoudiger.`,
  }),
  ja: makeTranslation({
    language: "ja",
    title: "地域ビジネスにウェブサイトが必要な理由",
    description: "地域ビジネスにウェブサイトが必要な理由、載せるべき内容、地域マーケティングと信頼づくりへの効果を解説します。",
    category: "地域ビジネス",
    tags: ["地域ビジネスのウェブサイト", "地域企業向けサイト", "地域マーケティング", "小規模事業サイト", "ローカルSEO", "オンラインプレゼンス"],
    readingTime: "7分で読めます",
    audience: "地域の事業者、サービス業、個人店舗",
    excerpt: "地域ビジネスのウェブサイトは、サービス、営業時間、対応エリア、信頼材料、連絡先を一か所にまとめる場所です。",
    body: `## 地域ビジネスのサイトが今も重要な理由

ウェブサイトは、地域ビジネスを見つけやすく、確認しやすくします。顧客は、何を提供しているか、どこで対応しているか、いつ営業しているか、どう連絡すればよいかを確認できます。

## 顧客は問い合わせ前にオンラインで確認する

身近な事業でも、多くの人はまずオンラインで調べます。営業中か、信頼できそうか、自分の必要に合うかを知りたいからです。

## 自分で管理できるオンライン拠点

SNSやディレクトリも役立ちますが、構成、文章、デザイン、問い合わせ導線を管理できるのは自社サイトです。

## 載せるべき内容

- わかりやすいトップページ
- サービスや商品
- 所在地、対応エリア、営業時間
- 口コミ、実写真、実績
- フォーム、電話、メール、地図
- FAQと法務ページ
- モバイル対応とSEOの基本

## 地域マーケティングをどう支えるか

Google Business Profile、SNS投稿、チラシ、QRコード、紹介には明確な受け皿が必要です。ウェブサイトはサービスを説明し、次の行動をわかりやすくします。

## チェックリスト

サービス内容はすぐ伝わりますか。情報は最新ですか。スマホで使いやすいですか。信頼材料は見えますか。主要サービスは説明されていますか。

## まとめ

地域ビジネスには安定したオンライン拠点が必要です。ウェブサイトは信頼を作り、マーケティングを支え、問い合わせをしやすくします。`,
  }),
};

function makeTranslation(
  translation: Omit<BlogPostTranslation, "summary" | "keyTakeaways" | "chatGptPrompts" | "faqs">,
): BlogPostTranslation {
  const generated = {
    en: {
      summary: "The website should make the offer, location, trust signals, and contact path clear.",
      takeaways: ["Keep business information accurate and easy to find.", "Use the website as the central destination for local marketing.", "Show proof, contact options, and clear service details.", "Review the mobile experience regularly."],
      prompts: [`Create a local business website checklist based on "${translation.title}".`, `Suggest the first five improvements for my local business website after reading "${translation.title}".`, `Turn "${translation.title}" into a homepage content outline.`],
      include: "What should the website include?",
      includeAnswer: "It should include clear services, current contact details, location or service area, trust signals, FAQs, legal pages, and a simple mobile contact path.",
      social: "Can social media replace it?",
      socialAnswer: "Social media can support updates, but the website gives more control over content, structure, search visibility, and the customer journey.",
    },
    de: {
      summary: "Die Website sollte Angebot, Standort, Vertrauenssignale und Kontaktweg klar machen.",
      takeaways: ["Halten Sie Geschäftsinformationen aktuell und leicht auffindbar.", "Nutzen Sie die Website als zentrales Ziel für lokales Marketing.", "Zeigen Sie Belege, Kontaktoptionen und klare Leistungsdetails.", "Prüfen Sie die mobile Nutzung regelmäßig."],
      prompts: [`Erstelle eine Checkliste für eine lokale Unternehmenswebsite auf Basis von "${translation.title}".`, `Nenne die ersten fünf Verbesserungen nach dem Lesen von "${translation.title}".`, `Mache aus "${translation.title}" eine Struktur für die Startseite.`],
      include: "Was sollte die Website enthalten?",
      includeAnswer: "Sie sollte klare Leistungen, aktuelle Kontaktdaten, Standort oder Einzugsgebiet, Vertrauenssignale, FAQ, rechtliche Seiten und einen einfachen mobilen Kontaktweg enthalten.",
      social: "Kann Social Media sie ersetzen?",
      socialAnswer: "Social Media kann Updates unterstützen, aber die Website bietet mehr Kontrolle über Inhalte, Struktur, Suche und Kundenweg.",
    },
    hu: {
      summary: "A weboldal tegye világossá az ajánlatot, helyszínt, bizalmi jeleket és kapcsolatfelvételt.",
      takeaways: ["Legyenek pontosak és könnyen megtalálhatók az üzleti adatok.", "A weboldal legyen a helyi marketing központi célja.", "Mutass bizonyítékot, elérhetőséget és világos szolgáltatásleírást.", "Rendszeresen ellenőrizd a mobilélményt."],
      prompts: [`Készíts helyi vállalkozói weboldal checklistát a(z) "${translation.title}" alapján.`, `Javasold az első öt javítást a(z) "${translation.title}" elolvasása után.`, `Alakítsd a(z) "${translation.title}" cikket főoldal-vázlattá.`],
      include: "Mit tartalmazzon a weboldal?",
      includeAnswer: "Világos szolgáltatásokat, friss elérhetőséget, helyszínt vagy területet, bizalmi jeleket, GYIK-et, jogi oldalakat és egyszerű mobil kapcsolatfelvételt.",
      social: "Kiválthatja a közösségi média?",
      socialAnswer: "A közösségi média segíti a frissítéseket, de a weboldal több kontrollt ad a tartalom, szerkezet, kereshetőség és ügyfélút felett.",
    },
    pl: {
      summary: "Strona powinna jasno pokazywać ofertę, lokalizację, sygnały zaufania i ścieżkę kontaktu.",
      takeaways: ["Dbaj o aktualne i łatwo dostępne dane firmy.", "Traktuj stronę jako główne miejsce dla lokalnego marketingu.", "Pokaż dowody, kontakt i jasne opisy usług.", "Regularnie sprawdzaj wersję mobilną."],
      prompts: [`Stwórz checklistę strony lokalnej firmy na podstawie "${translation.title}".`, `Podaj pierwsze pięć poprawek po lekturze "${translation.title}".`, `Zmień "${translation.title}" w szkic treści strony głównej.`],
      include: "Co powinna zawierać strona?",
      includeAnswer: "Jasne usługi, aktualne dane kontaktowe, lokalizację lub obszar działania, sygnały zaufania, FAQ, strony prawne i prostą ścieżkę kontaktu na telefonie.",
      social: "Czy social media mogą ją zastąpić?",
      socialAnswer: "Social media wspierają aktualności, ale strona daje większą kontrolę nad treścią, strukturą, widocznością w wyszukiwarce i ścieżką klienta.",
    },
    es: {
      summary: "La web debe aclarar la oferta, ubicación, señales de confianza y camino de contacto.",
      takeaways: ["Mantén la información del negocio actualizada y fácil de encontrar.", "Usa la web como destino central del marketing local.", "Muestra pruebas, contacto y servicios claros.", "Revisa la experiencia móvil con regularidad."],
      prompts: [`Crea una checklist de web local basada en "${translation.title}".`, `Sugiere las cinco primeras mejoras tras leer "${translation.title}".`, `Convierte "${translation.title}" en un esquema de portada.`],
      include: "¿Qué debe incluir la web?",
      includeAnswer: "Servicios claros, datos de contacto actuales, ubicación o zona, señales de confianza, FAQ, páginas legales y contacto sencillo en móvil.",
      social: "¿Pueden sustituirla las redes sociales?",
      socialAnswer: "Las redes ayudan con actualizaciones, pero la web da más control sobre contenido, estructura, búsqueda y recorrido del cliente.",
    },
    fr: {
      summary: "Le site doit clarifier l'offre, la zone, les preuves de confiance et le chemin de contact.",
      takeaways: ["Gardez les informations de l'entreprise à jour et faciles à trouver.", "Utilisez le site comme destination centrale du marketing local.", "Montrez des preuves, des contacts et des services clairs.", "Vérifiez régulièrement l'expérience mobile."],
      prompts: [`Crée une checklist de site local à partir de "${translation.title}".`, `Propose les cinq premières améliorations après "${translation.title}".`, `Transforme "${translation.title}" en plan de page d'accueil.`],
      include: "Que doit contenir le site ?",
      includeAnswer: "Des services clairs, des contacts à jour, une localisation ou zone, des preuves de confiance, une FAQ, des pages légales et un contact mobile simple.",
      social: "Les réseaux sociaux peuvent-ils le remplacer ?",
      socialAnswer: "Les réseaux aident pour les mises à jour, mais le site donne plus de contrôle sur le contenu, la structure, la recherche et le parcours client.",
    },
    it: {
      summary: "Il sito deve chiarire offerta, area, segnali di fiducia e percorso di contatto.",
      takeaways: ["Mantieni le informazioni aziendali aggiornate e facili da trovare.", "Usa il sito come destinazione centrale del marketing locale.", "Mostra prove, contatti e servizi chiari.", "Controlla regolarmente l'esperienza mobile."],
      prompts: [`Crea una checklist per sito locale basata su "${translation.title}".`, `Suggerisci i primi cinque miglioramenti dopo "${translation.title}".`, `Trasforma "${translation.title}" in una struttura per homepage.`],
      include: "Cosa deve includere il sito?",
      includeAnswer: "Servizi chiari, contatti aggiornati, posizione o area servita, segnali di fiducia, FAQ, pagine legali e contatto mobile semplice.",
      social: "I social possono sostituirlo?",
      socialAnswer: "I social aiutano con gli aggiornamenti, ma il sito offre più controllo su contenuto, struttura, ricerca e percorso cliente.",
    },
    cz: {
      summary: "Web má jasně ukázat nabídku, lokalitu, důvěryhodné signály a cestu ke kontaktu.",
      takeaways: ["Udržujte firemní informace přesné a snadno dostupné.", "Používejte web jako hlavní cíl místního marketingu.", "Ukažte důkazy, kontakt a jasné služby.", "Pravidelně kontrolujte mobilní zkušenost."],
      prompts: [`Vytvoř checklist lokálního webu podle "${translation.title}".`, `Navrhni prvních pět zlepšení po přečtení "${translation.title}".`, `Převeď "${translation.title}" na osnovu domovské stránky.`],
      include: "Co má web obsahovat?",
      includeAnswer: "Jasné služby, aktuální kontakty, lokalitu nebo oblast, důvěryhodné signály, FAQ, právní stránky a jednoduchý mobilní kontakt.",
      social: "Mohou ho nahradit sociální sítě?",
      socialAnswer: "Sociální sítě pomáhají s aktualitami, ale web dává větší kontrolu nad obsahem, strukturou, vyhledáváním a zákaznickou cestou.",
    },
    sk: {
      summary: "Web má jasne ukázať ponuku, lokalitu, signály dôvery a cestu ku kontaktu.",
      takeaways: ["Udržiavajte firemné informácie presné a ľahko dostupné.", "Používajte web ako hlavný cieľ miestneho marketingu.", "Ukážte dôkazy, kontakt a jasné služby.", "Pravidelne kontrolujte mobilnú skúsenosť."],
      prompts: [`Vytvor checklist lokálneho webu podľa "${translation.title}".`, `Navrhni prvých päť zlepšení po prečítaní "${translation.title}".`, `Premeň "${translation.title}" na osnovu domovskej stránky.`],
      include: "Čo má web obsahovať?",
      includeAnswer: "Jasné služby, aktuálne kontakty, lokalitu alebo oblasť, signály dôvery, FAQ, právne stránky a jednoduchý mobilný kontakt.",
      social: "Môžu ho nahradiť sociálne siete?",
      socialAnswer: "Sociálne siete pomáhajú s aktualitami, ale web dáva väčšiu kontrolu nad obsahom, štruktúrou, vyhľadávaním a zákazníckou cestou.",
    },
    pt: {
      summary: "O site deve clarificar oferta, localização, sinais de confiança e caminho de contacto.",
      takeaways: ["Mantenha a informação do negócio atualizada e fácil de encontrar.", "Use o site como destino central do marketing local.", "Mostre provas, contactos e serviços claros.", "Reveja regularmente a experiência mobile."],
      prompts: [`Cria uma checklist de site local baseada em "${translation.title}".`, `Sugere as primeiras cinco melhorias depois de ler "${translation.title}".`, `Transforma "${translation.title}" num esboço de página inicial.`],
      include: "O que deve incluir o site?",
      includeAnswer: "Serviços claros, contactos atuais, localização ou área, sinais de confiança, FAQ, páginas legais e contacto simples no telemóvel.",
      social: "As redes sociais podem substituí-lo?",
      socialAnswer: "As redes ajudam com atualizações, mas o site dá mais controlo sobre conteúdo, estrutura, pesquisa e jornada do cliente.",
    },
    da: {
      summary: "Websitet skal gøre tilbud, område, tillidssignaler og kontaktvej tydelige.",
      takeaways: ["Hold virksomhedsoplysninger korrekte og lette at finde.", "Brug websitet som centrum for lokal markedsføring.", "Vis beviser, kontaktmuligheder og klare ydelser.", "Tjek mobiloplevelsen regelmæssigt."],
      prompts: [`Lav en tjekliste for lokalt website baseret på "${translation.title}".`, `Foreslå de første fem forbedringer efter "${translation.title}".`, `Gør "${translation.title}" til en struktur for forsiden.`],
      include: "Hvad bør websitet indeholde?",
      includeAnswer: "Klare ydelser, aktuelle kontaktoplysninger, placering eller område, tillidssignaler, FAQ, juridiske sider og enkel mobil kontakt.",
      social: "Kan sociale medier erstatte det?",
      socialAnswer: "Sociale medier kan støtte opdateringer, men websitet giver mere kontrol over indhold, struktur, søgning og kunderejse.",
    },
    nl: {
      summary: "De website moet aanbod, locatie, vertrouwenssignalen en contactroute duidelijk maken.",
      takeaways: ["Houd bedrijfsinformatie actueel en makkelijk vindbaar.", "Gebruik de website als centrale bestemming voor lokale marketing.", "Toon bewijs, contactopties en duidelijke diensten.", "Controleer de mobiele ervaring regelmatig."],
      prompts: [`Maak een checklist voor een lokale bedrijfswebsite op basis van "${translation.title}".`, `Stel de eerste vijf verbeteringen voor na "${translation.title}".`, `Maak van "${translation.title}" een homepage-outline.`],
      include: "Wat moet de website bevatten?",
      includeAnswer: "Duidelijke diensten, actuele contactgegevens, locatie of werkgebied, vertrouwenssignalen, FAQ, juridische pagina's en eenvoudige mobiele contactroute.",
      social: "Kan social media dit vervangen?",
      socialAnswer: "Social media helpt met updates, maar de website geeft meer controle over inhoud, structuur, zoekbaarheid en klantreis.",
    },
    ja: {
      summary: "サイトは、サービス内容、地域、信頼材料、連絡導線を明確にする必要があります。",
      takeaways: ["事業情報を正確で見つけやすく保つ。", "地域マーケティングの中心にウェブサイトを置く。", "実績、連絡先、サービス内容を明確に示す。", "スマホでの使いやすさを定期的に確認する。"],
      prompts: [`「${translation.title}」をもとに地域ビジネスサイトのチェックリストを作ってください。`, `「${translation.title}」を読んだ後の最初の5つの改善案を出してください。`, `「${translation.title}」をトップページ構成にしてください。`],
      include: "サイトには何を載せるべきですか。",
      includeAnswer: "明確なサービス、最新の連絡先、所在地または対応エリア、信頼材料、FAQ、法務ページ、スマホで簡単な連絡導線が必要です。",
      social: "SNSで代用できますか。",
      socialAnswer: "SNSは更新には役立ちますが、ウェブサイトのほうが内容、構成、検索性、顧客導線を管理しやすくなります。",
    },
  }[translation.language];

  return {
    ...translation,
    summary: [
      translation.description,
      translation.excerpt,
      generated.summary,
    ],
    keyTakeaways: generated.takeaways,
    chatGptPrompts: generated.prompts,
    faqs: [
      {
        question: translation.title,
        answer: translation.excerpt,
      },
      {
        question: generated.include,
        answer: generated.includeAnswer,
      },
      {
        question: generated.social,
        answer: generated.socialAnswer,
      },
    ],
  };
}

export default {
  slug: "local-business-website",
  title: "Why Every Local Business Needs a Website",
  language: "en",
  description: "Learn why every local business needs a website, what it should include, and how it supports local marketing and customer trust.",
  tags: ["local business website", "website for local business", "local marketing", "small business website", "local SEO", "online presence"],
  published: true,
  status: "published",
  image: "/assets/blog/local-business-website.png",
  imageAlt: "Local business website checklist showing services, location, reviews, mobile usability, and contact options.",
  author: "Websiteli",
  date: "2026-07-02",
  publishDate: "2026-07-02",
  updated: "2026-07-06",
  related: [
    "/en/services-pricing/",
    "/en/portfolio/#live-demos",
    "/en/blog/website-vs-facebook/",
    "/en/blog/small-business-website/",
    "/en/contact/",
  ],
  translations,
} satisfies BlogPostSource;
