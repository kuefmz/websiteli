import type { BlogPostSource, BlogPostTranslation } from "../types";
import type { LocaleCode } from "../../locales";

function makeTranslation(
  language: LocaleCode,
  title: string,
  description: string,
  category: string,
  tags: string[],
  readingTime: string,
  audience: string,
  excerpt: string,
  summary: string[],
  keyTakeaways: string[],
  faqs: { question: string; answer: string }[],
  body: string,
): BlogPostTranslation {
  return {
    title,
    description,
    category,
    tags,
    language,
    readingTime,
    audience,
    excerpt,
    summary,
    keyTakeaways,
    chatGptPrompts: [
      `Turn this article into a pre-advertising website audit for my business.`,
      `Review my landing page against the checklist in "${title}".`,
      `Help me prioritise the website fixes I should make before buying traffic.`,
    ],
    faqs,
    body,
  };
}

const translations = {
  en: makeTranslation(
    "en",
    "10 Things Your Small-Business Website Needs Before You Spend Money on Ads",
    "A practical pre-advertising website checklist covering your offer, landing page, mobile experience, trust, forms, analytics, privacy and follow-up.",
    "Website Strategy",
    ["small business website checklist", "website before Google Ads", "landing page before advertising", "lead generation"],
    "10 min read",
    "Swiss and European small-business owners preparing to invest in Google Ads, social ads or other paid traffic",
    "Paid traffic cannot fix a confusing website. Check these ten foundations before sending more visitors to your site.",
    [
      "Paid advertising amplifies the strengths and weaknesses of the page receiving the traffic.",
      "A campaign needs one clear offer, a relevant landing page and an easy next step for the visitor.",
      "Mobile usability, trust signals, working forms and fast loading should be checked before increasing traffic.",
      "Conversion tracking and a defined follow-up process are necessary if you want to know whether ads produce useful enquiries.",
    ],
    [
      "Fix the conversion path before increasing the number of visitors.",
      "Send each campaign to the most relevant page instead of automatically using the homepage.",
      "Test the complete journey on a real phone, including the form and confirmation step.",
      "Measure meaningful actions such as qualified enquiries, bookings or quote requests rather than clicks alone.",
    ],
    [
      { question: "Should I run ads if my website is not finished?", answer: "Usually only if the page receiving the traffic already has a clear offer, works well on mobile, has a tested conversion action and can be measured. Otherwise you risk paying to discover problems you could have fixed first." },
      { question: "Do I need a separate landing page for every ad campaign?", answer: "Not always, but the destination should closely match the promise, audience and intent of the ad. A focused service or campaign page often performs the job better than a generic homepage." },
      { question: "What should I track before starting ads?", answer: "At minimum track the important action you want visitors to take, such as a submitted enquiry, booked call, purchase or quote request, and verify that the event fires correctly." },
      { question: "What is the most important thing to fix first?", answer: "Start with the offer and conversion path. Visitors should immediately understand what you provide, who it is for and what they should do next." },
    ],
    `## Advertising amplifies the website you already have

Paid traffic can bring the right people to your site faster, but it does not automatically make the site persuasive. If the offer is unclear, the form is broken or the page is difficult to use on a phone, buying more visits simply exposes those problems to more people.

Before increasing traffic, make sure the page can turn a relevant visitor into a useful business action.

## 1. A clear offer for a specific audience

A visitor should be able to understand three things within a few seconds: **what you offer, who it is for and why the next step is worth taking**.

Avoid sending ad traffic to a page dominated by vague claims such as “quality solutions” or “we care about our customers”. Use concrete service wording, useful scope information and a visible next action.

## 2. A landing page that matches the ad

The destination should continue the promise made in the ad. If someone clicks an ad about a specific service, do not make them search through the homepage to find it.

A relevant service or landing page should repeat the core promise, answer the most likely questions and remove unrelated distractions.

> [!BEST PRACTICE] The ad and landing page should feel like two parts of the same conversation.

## 3. A strong mobile experience

Many ad clicks happen on phones. Test the real page on a normal mobile connection, not only in a desktop preview.

Check that text is readable, buttons are easy to tap, navigation does not cover the page, forms do not require excessive typing and important information appears before long decorative sections.

## 4. Fast, stable loading

A page does not need to be technically perfect, but it should feel responsive and stable. Compress oversized media, avoid unnecessary scripts and check that layout shifts do not move buttons while the visitor is trying to use them.

If the campaign page feels slow before the campaign starts, more traffic will not improve it.

## 5. Trust signals that support the decision

Visitors arriving from an ad may know little about the business. Give them enough evidence to judge whether contacting you feels safe and worthwhile.

Useful trust signals can include clear business information, real contact details, transparent service scope, portfolio examples, credentials when relevant, understandable policies and honest explanations of what happens after an enquiry.

Do not invent reviews, rankings, customer results or guarantees.

## 6. One obvious conversion action

Decide what success means before you launch the campaign. It may be a quote request, booked call, purchase, reservation or qualified contact form.

The primary action should be visible, easy to understand and usable without unnecessary steps. Avoid asking for information you do not need at the first contact.

## 7. A form that has been tested end to end

Submit the form yourself from desktop and mobile. Check validation, confirmation messages, email delivery and where the lead is stored.

Also check the failure path. A visitor should not lose everything they typed because one field is invalid or a service is temporarily unavailable.

## 8. Analytics and conversion tracking

Campaign dashboards can tell you how many people clicked. Your own measurement should tell you whether those visitors completed the business action you care about.

Verify analytics before launch and test the actual conversion event. Use consistent campaign parameters and make sure internal navigation does not destroy attribution unnecessarily.

The goal is not to collect every possible metric. It is to understand which traffic produces useful outcomes.

## 9. Privacy and cookie handling appropriate to your setup

Advertising often adds tracking technologies. Review your privacy information, consent setup and any analytics or advertising tags you use. Requirements depend on your business, audience and technology, so do not treat a generic banner as legal advice.

At a practical level, visitors should be able to understand what is collected and your tracking setup should behave the way your published choices say it behaves.

## 10. A follow-up process after the conversion

A form submission is not the end of the funnel. Decide who receives the enquiry, how quickly it is reviewed, what information is sent automatically and when a human follows up.

A campaign can appear unsuccessful when the real problem is slow or inconsistent lead handling.

> [!IMPORTANT] Measure the complete path: ad → landing page → conversion → follow-up → qualified opportunity.

## Run a five-minute preflight test

Before spending money, open the campaign page on a phone and complete the journey as if you were a new customer. Ask someone unfamiliar with the page to do the same.

Can they explain the offer? Can they find the next step? Does the form work? Does the confirmation arrive? Can you see the conversion in analytics?

If the answer is yes, you have a much better foundation for learning from paid traffic.

## Improve the website before buying more traffic

Websiteli builds and improves small-business websites around clear offers, measurable conversion paths and maintainable content. Explore [services and pricing](/en/services-pricing/), see the [portfolio](/en/portfolio/) or [contact Websiteli](/en/contact/) if you want a campaign page or website reviewed before you increase advertising spend.`,
  ),

  de: makeTranslation(
    "de",
    "10 Dinge, die Ihre KMU-Website braucht, bevor Sie Geld für Werbung ausgeben",
    "Praktische Website-Checkliste vor bezahlter Werbung: Angebot, Landingpage, Mobile UX, Vertrauen, Formulare, Analytics, Datenschutz und Follow-up.",
    "Website-Strategie",
    ["KMU Website Checkliste", "Website vor Google Ads", "Landingpage vor Werbung", "Leadgenerierung"],
    "11 Min. Lesezeit",
    "Schweizer und europäische KMU, die Google Ads, Social Ads oder anderen bezahlten Traffic planen",
    "Bezahlter Traffic kann eine unklare Website nicht reparieren. Prüfen Sie diese zehn Grundlagen, bevor Sie mehr Besucher einkaufen.",
    [
      "Bezahlte Werbung verstärkt die Stärken und Schwächen der Zielseite.",
      "Eine Kampagne braucht ein klares Angebot, eine passende Landingpage und einen einfachen nächsten Schritt.",
      "Mobile Nutzung, Vertrauen, funktionierende Formulare und Ladeverhalten sollten vor dem Traffic-Anstieg geprüft werden.",
      "Conversion-Tracking und ein definierter Follow-up-Prozess zeigen, ob Werbung tatsächlich wertvolle Anfragen erzeugt.",
    ],
    [
      "Zuerst den Conversion-Pfad verbessern, dann den Traffic erhöhen.",
      "Kampagnen auf die relevanteste Zielseite statt automatisch auf die Startseite schicken.",
      "Den kompletten Ablauf auf einem echten Smartphone testen.",
      "Qualifizierte Anfragen, Buchungen oder Offertanfragen messen und nicht nur Klicks.",
    ],
    [
      { question: "Soll ich Werbung schalten, wenn meine Website noch nicht fertig ist?", answer: "Nur wenn die konkrete Zielseite bereits ein klares Angebot, gute mobile Nutzbarkeit, eine getestete Conversion-Aktion und funktionierende Messung bietet. Sonst bezahlen Sie möglicherweise für Probleme, die vorher lösbar wären." },
      { question: "Brauche ich für jede Kampagne eine eigene Landingpage?", answer: "Nicht zwingend. Die Zielseite sollte aber sehr gut zu Versprechen, Zielgruppe und Suchintention der Anzeige passen. Eine fokussierte Leistungs- oder Kampagnenseite ist oft sinnvoller als eine allgemeine Startseite." },
      { question: "Was sollte ich vor dem Kampagnenstart messen?", answer: "Mindestens die wichtigste Aktion wie Anfrage, Terminbuchung, Kauf oder Offertanfrage. Testen Sie vor dem Start, ob das Conversion-Ereignis korrekt ausgelöst wird." },
      { question: "Was sollte ich zuerst verbessern?", answer: "Beginnen Sie mit Angebot und Conversion-Pfad. Besucher müssen sofort verstehen, was Sie anbieten, für wen und was der nächste Schritt ist." },
    ],
    `## Werbung verstärkt die Website, die bereits da ist

Bezahlter Traffic bringt potenzielle Kunden schneller auf Ihre Website. Er macht eine unklare Seite aber nicht automatisch überzeugend. Ein schwaches Angebot, ein fehlerhaftes Formular oder schlechte mobile Bedienung werden durch mehr Besucher nur sichtbarer.

## 1. Ein klares Angebot für eine konkrete Zielgruppe

Innerhalb weniger Sekunden sollte klar sein: **Was bieten Sie an, für wen und warum lohnt sich der nächste Schritt?** Vermeiden Sie austauschbare Aussagen und nennen Sie Leistung, Nutzen und nächsten Schritt konkret.

## 2. Eine Landingpage, die zur Anzeige passt

Die Zielseite muss das Versprechen der Anzeige fortsetzen. Wer wegen einer bestimmten Leistung klickt, sollte diese nicht erst auf der Startseite suchen müssen.

> [!BEST PRACTICE] Anzeige und Landingpage sollten wie zwei Teile desselben Gesprächs wirken.

## 3. Gute mobile Nutzung

Testen Sie die echte Seite auf einem Smartphone. Schrift, Buttons, Navigation und Formular müssen ohne Zoomen oder unnötiges Tippen funktionieren. Wichtige Informationen gehören vor lange dekorative Abschnitte.

## 4. Schnelles und stabiles Laden

Komprimieren Sie übergrosse Medien, vermeiden Sie unnötige Skripte und prüfen Sie Layout-Sprünge. Die Seite muss nicht perfekt sein, sollte sich aber reaktionsschnell und stabil anfühlen.

## 5. Vertrauenssignale

Menschen aus Anzeigen kennen Ihr Unternehmen oft noch nicht. Helfen Sie ihnen mit klaren Unternehmens- und Kontaktdaten, nachvollziehbarem Leistungsumfang, echten Beispielen, relevanten Qualifikationen und verständlichen Abläufen.

Erfinden Sie keine Bewertungen, Rankings, Resultate oder Garantien.

## 6. Eine eindeutige Conversion-Aktion

Definieren Sie vor dem Start, was Erfolg bedeutet: Offertanfrage, Termin, Kauf, Reservation oder qualifizierte Kontaktanfrage. Diese Aktion sollte sichtbar und einfach sein.

## 7. Ein vollständig getestetes Formular

Senden Sie das Formular selbst über Desktop und Smartphone ab. Prüfen Sie Validierung, Bestätigung, E-Mail-Zustellung und Ablage der Anfrage. Testen Sie auch Fehlerfälle.

## 8. Analytics und Conversion-Tracking

Klicks allein reichen nicht. Prüfen Sie vor dem Start, ob die wichtigste Conversion tatsächlich gemessen wird und ob Kampagnenparameter konsistent ankommen.

## 9. Passender Datenschutz und Cookie-Umgang

Werbung bringt häufig zusätzliche Tracking-Technologien mit. Prüfen Sie Datenschutzhinweise, Einwilligung und verwendete Tags passend zu Ihrem Setup. Eine generische Cookie-Lösung ersetzt keine rechtliche Beurteilung.

## 10. Ein Follow-up nach der Anfrage

Legen Sie fest, wer neue Leads erhält, wie schnell sie geprüft werden, welche Bestätigung automatisch verschickt wird und wann eine Person übernimmt.

> [!IMPORTANT] Messen Sie den gesamten Weg: Anzeige → Landingpage → Conversion → Follow-up → qualifizierte Chance.

## Fünf-Minuten-Preflight

Öffnen Sie die Zielseite auf dem Smartphone und durchlaufen Sie den Prozess wie ein neuer Kunde. Versteht eine unbeteiligte Person das Angebot? Funktioniert das Formular? Kommt die Bestätigung an? Sehen Sie die Conversion in Analytics?

## Website zuerst, Traffic danach

Websiteli entwickelt und verbessert KMU-Websites mit klaren Angeboten, messbaren Conversion-Pfaden und wartbaren Inhalten. Sehen Sie [Leistungen und Preise](/en/services-pricing/), das [Portfolio](/en/portfolio/) oder [kontaktieren Sie Websiteli](/en/contact/), wenn Sie Ihre Website vor höheren Werbeausgaben prüfen möchten.`,
  ),

  hu: makeTranslation(
    "hu",
    "10 dolog, amire a kisvállalkozás weboldalának szüksége van, mielőtt hirdetésre költ",
    "Gyakorlati ellenőrzőlista fizetett hirdetések előtt: ajánlat, landing oldal, mobil használat, bizalom, űrlapok, analitika, adatvédelem és utánkövetés.",
    "Weboldal-stratégia",
    ["kisvállalati weboldal ellenőrzőlista", "weboldal Google Ads előtt", "landing oldal hirdetés előtt", "lead generálás"],
    "9 perc olvasás",
    "Svájci és európai kisvállalkozások, amelyek fizetett forgalmat terveznek",
    "A fizetett forgalom nem javít meg egy zavaros weboldalt. Ezt a tíz alapot ellenőrizd, mielőtt több látogatót vásárolsz.",
    ["A hirdetés felerősíti a céloldal erősségeit és hibáit.", "Kell egy világos ajánlat, releváns oldal és egyszerű következő lépés.", "Mobilon is tesztelni kell az oldalt és az űrlapot.", "A konverziómérés és az utánkövetés nélkül nem tudod, mi hoz valódi érdeklődőt."],
    ["Előbb javítsd a konverziós útvonalat.", "A kampányt a legrelevánsabb oldalra küldd.", "Teszteld végig valódi telefonon.", "A hasznos érdeklődéseket mérd, ne csak a kattintást."],
    [
      { question: "Hirdethetek, ha még nincs kész a weboldal?", answer: "Akkor érdemes, ha a kampány céloldala már világos, mobilon jól működik, a konverzió tesztelt és mérhető." },
      { question: "Minden kampányhoz külön landing oldal kell?", answer: "Nem feltétlenül, de a céloldalnak szorosan illeszkednie kell a hirdetés ígéretéhez és közönségéhez." },
      { question: "Mit mérjek indulás előtt?", answer: "A legfontosabb üzleti műveletet, például kapcsolatfelvételt, foglalást, vásárlást vagy ajánlatkérést." },
      { question: "Mit javítsak először?", answer: "Az ajánlatot és a következő lépést: azonnal legyen világos, mit kínálsz, kinek és mit tegyen a látogató." },
    ],
    `## A hirdetés felerősíti a meglévő weboldalt

A fizetett forgalom gyorsabban hoz látogatókat, de nem tesz egy zavaros oldalt meggyőzővé. Előbb javítsd a konverziós útvonalat.

## 1. Világos ajánlat

Néhány másodperc alatt derüljön ki, mit kínálsz, kinek és mi a következő lépés.

## 2. A hirdetéshez illő landing oldal

A céloldal folytassa ugyanazt az ígéretet. Ne kényszerítsd a látogatót arra, hogy a kezdőlapon keresse meg a hirdetett szolgáltatást.

## 3. Mobil használhatóság

Teszteld valódi telefonon a szöveget, gombokat, navigációt és űrlapot.

## 4. Gyors, stabil betöltés

Csökkentsd a túl nagy médiafájlokat és a fölösleges szkripteket. A fontos elemek ne ugráljanak betöltés közben.

## 5. Bizalom

Legyenek egyértelmű cég- és kapcsolati adatok, valós példák és érthető szolgáltatási információk. Ne találj ki értékeléseket vagy eredményeket.

## 6. Egyértelmű konverzió

Döntsd el előre, mi számít sikernek: ajánlatkérés, időpont, vásárlás vagy kapcsolatfelvétel.

## 7. Végigtesztelt űrlap

Küldd be saját magad mobilról és asztali gépről, és ellenőrizd a visszaigazolást is.

## 8. Analitika és konverziómérés

A kattintás nem üzleti eredmény. Teszteld, hogy a fontos esemény valóban mérődik.

## 9. Adatvédelem és sütik

A hirdetési tagekhez igazítsd a tájékoztatást és a hozzájárulási beállításokat. Általános sablon nem helyettesít jogi tanácsot.

## 10. Utánkövetés

Határozd meg, ki kapja meg az érdeklődést, mikor válaszol és milyen automatikus visszaigazolás megy ki.

## Indulás előtti gyors teszt

Menj végig az egész úton: hirdetés → oldal → űrlap → visszaigazolás → analitika. Ha ez működik, sokkal jobb alapod van a fizetett forgalomhoz.

A [Websiteli szolgáltatásai és árai](/en/services-pricing/), [portfóliója](/en/portfolio/) és [kapcsolati oldala](/en/contact/) segít a következő lépésben.`,
  ),

  pl: makeTranslation(
    "pl",
    "10 rzeczy, których potrzebuje strona małej firmy, zanim wydasz pieniądze na reklamy",
    "Praktyczna lista kontrolna przed płatną reklamą: oferta, landing page, mobile, zaufanie, formularze, analityka, prywatność i follow-up.",
    "Strategia strony",
    ["checklista strony małej firmy", "strona przed Google Ads", "landing page przed reklamą", "generowanie leadów"],
    "9 min czytania",
    "Małe firmy w Szwajcarii i Europie planujące płatny ruch",
    "Płatny ruch nie naprawi niejasnej strony. Sprawdź te dziesięć podstaw, zanim zaczniesz kupować więcej wejść.",
    ["Reklama wzmacnia mocne i słabe strony strony docelowej.", "Potrzebujesz jasnej oferty, dopasowanej strony i prostego następnego kroku.", "Przetestuj mobile, formularze i szybkość przed zwiększeniem ruchu.", "Mierz konwersje i zaplanuj obsługę leadów."],
    ["Najpierw napraw ścieżkę konwersji.", "Kieruj kampanię na najbardziej trafną stronę.", "Przetestuj całą ścieżkę na telefonie.", "Mierz wartościowe zapytania, nie tylko kliknięcia."],
    [
      { question: "Czy mogę reklamować niedokończoną stronę?", answer: "Tylko jeśli strona docelowa ma już jasną ofertę, działa na telefonie, ma przetestowaną konwersję i poprawny pomiar." },
      { question: "Czy każda kampania wymaga osobnego landing page?", answer: "Nie zawsze, ale strona docelowa powinna dokładnie odpowiadać obietnicy i odbiorcy reklamy." },
      { question: "Co mierzyć przed startem?", answer: "Najważniejsze działanie biznesowe: wysłane zapytanie, rezerwację, zakup lub prośbę o wycenę." },
      { question: "Co poprawić najpierw?", answer: "Ofertę i ścieżkę konwersji, aby od razu było wiadomo co oferujesz, dla kogo i jaki jest następny krok." },
    ],
    `## Reklama wzmacnia to, co już masz

Więcej płatnego ruchu nie naprawia niejasnej strony. Najpierw upewnij się, że trafny użytkownik może łatwo wykonać wartościowe działanie.

## 1. Jasna oferta

W kilka sekund użytkownik powinien wiedzieć, co oferujesz, dla kogo i co ma zrobić dalej.

## 2. Dopasowany landing page

Strona docelowa powinna kontynuować obietnicę reklamy zamiast odsyłać wszystkich na ogólną stronę główną.

## 3. Mobile

Sprawdź tekst, przyciski, nawigację i formularz na prawdziwym telefonie.

## 4. Szybkość i stabilność

Ogranicz ciężkie media i zbędne skrypty. Unikaj przesuwania się elementów podczas ładowania.

## 5. Zaufanie

Pokaż prawdziwe dane firmy, kontakt, zakres usługi i wiarygodne przykłady. Nie wymyślaj opinii ani wyników.

## 6. Jedna główna konwersja

Zdecyduj, czy celem jest zapytanie, rezerwacja, zakup czy wycena, i ułatw wykonanie tej akcji.

## 7. Przetestowany formularz

Wyślij formularz samodzielnie z komputera i telefonu. Sprawdź walidację, potwierdzenie oraz dostarczenie leada.

## 8. Analityka i konwersje

Kliknięcia nie wystarczą. Przetestuj zdarzenie reprezentujące realny cel biznesowy.

## 9. Prywatność i cookies

Dopasuj informacje i mechanizm zgody do używanych narzędzi śledzących. Szablon nie jest poradą prawną.

## 10. Follow-up

Ustal, kto otrzymuje lead i jak szybko następuje odpowiedź.

## Test przed startem

Przejdź całą ścieżkę jak klient i sprawdź, czy konwersję widać w analityce. Potem dopiero zwiększaj ruch.

Sprawdź [usługi i ceny](/en/services-pricing/), [portfolio](/en/portfolio/) lub [kontakt](/en/contact/).`,
  ),

  es: makeTranslation(
    "es",
    "10 cosas que necesita la web de una pequeña empresa antes de gastar en anuncios",
    "Checklist práctica antes de invertir en publicidad: oferta, landing page, móvil, confianza, formularios, analítica, privacidad y seguimiento.",
    "Estrategia web",
    ["checklist web pequeña empresa", "web antes de Google Ads", "landing page antes de publicidad", "generación de leads"],
    "9 min de lectura",
    "Pequeñas empresas suizas y europeas que preparan campañas de pago",
    "El tráfico de pago no arregla una web confusa. Revisa estas diez bases antes de comprar más visitas.",
    ["La publicidad amplifica las fortalezas y debilidades de la página de destino.", "Necesitas una oferta clara, una página relevante y un siguiente paso sencillo.", "Prueba móvil, formularios y velocidad antes de aumentar el tráfico.", "Mide conversiones y define el seguimiento de cada lead."],
    ["Arregla primero la ruta de conversión.", "Envía cada campaña a la página más relevante.", "Prueba el proceso completo en un móvil real.", "Mide consultas y reservas útiles, no solo clics."],
    [
      { question: "¿Puedo hacer anuncios con una web sin terminar?", answer: "Solo si la página de destino ya tiene una oferta clara, funciona bien en móvil, dispone de una conversión probada y se puede medir." },
      { question: "¿Necesito una landing page por campaña?", answer: "No siempre, pero el destino debe coincidir estrechamente con la promesa, el público y la intención del anuncio." },
      { question: "¿Qué debo medir antes de empezar?", answer: "La acción de negocio principal: formulario enviado, reserva, compra o solicitud de presupuesto." },
      { question: "¿Qué debo arreglar primero?", answer: "La oferta y la ruta de conversión para que quede claro qué ofreces, para quién y qué debe hacer el visitante." },
    ],
    `## La publicidad amplifica la web que ya tienes

Comprar tráfico no convierte automáticamente una página confusa en una buena página. Primero asegúrate de que un visitante relevante pueda completar una acción útil.

## 1. Oferta clara

En pocos segundos debe entenderse qué ofreces, para quién y cuál es el siguiente paso.

## 2. Landing page alineada con el anuncio

La página debe continuar la promesa del anuncio. Evita mandar a todo el mundo a una home genérica.

## 3. Experiencia móvil

Prueba texto, botones, navegación y formulario en un teléfono real.

## 4. Carga rápida y estable

Reduce archivos pesados y scripts innecesarios. Evita saltos de diseño que muevan botones.

## 5. Confianza

Incluye datos reales del negocio, contacto, alcance del servicio y ejemplos honestos. No inventes reseñas ni resultados.

## 6. Una conversión principal

Define si el objetivo es contacto, reserva, compra o presupuesto y haz esa acción evidente.

## 7. Formulario probado

Envíalo tú mismo desde móvil y escritorio y comprueba validación, confirmación y entrega.

## 8. Analítica y conversiones

Los clics no son el resultado final. Comprueba que el evento importante se registra correctamente.

## 9. Privacidad y cookies

Alinea la información y el consentimiento con las herramientas de seguimiento que realmente utilizas. Una plantilla genérica no sustituye asesoramiento legal.

## 10. Seguimiento

Define quién recibe el lead, cuándo responde y qué confirmación automática se envía.

## Prueba final

Recorre todo el camino como un cliente y confirma que la conversión aparece en analítica antes de aumentar el presupuesto.

Consulta [servicios y precios](/en/services-pricing/), [portfolio](/en/portfolio/) o [contacto](/en/contact/).`,
  ),

  fr: makeTranslation(
    "fr",
    "10 éléments indispensables à votre site de petite entreprise avant de payer de la publicité",
    "Checklist pratique avant la publicité payante : offre, landing page, mobile, confiance, formulaires, analytics, confidentialité et suivi.",
    "Stratégie web",
    ["checklist site petite entreprise", "site avant Google Ads", "landing page avant publicité", "génération de leads"],
    "9 min de lecture",
    "Petites entreprises suisses et européennes qui préparent des campagnes payantes",
    "Le trafic payant ne corrige pas un site confus. Vérifiez ces dix bases avant d'acheter davantage de visites.",
    ["La publicité amplifie les qualités et défauts de la page d'arrivée.", "Il faut une offre claire, une page pertinente et une prochaine étape simple.", "Testez mobile, formulaires et vitesse avant d'augmenter le trafic.", "Mesurez les conversions et organisez le suivi des prospects."],
    ["Corrigez d'abord le parcours de conversion.", "Envoyez chaque campagne vers la page la plus pertinente.", "Testez tout le parcours sur un vrai téléphone.", "Mesurez les demandes utiles plutôt que les clics seuls."],
    [
      { question: "Puis-je lancer des annonces avec un site inachevé ?", answer: "Seulement si la page d'arrivée présente déjà une offre claire, fonctionne correctement sur mobile, possède une conversion testée et peut être mesurée." },
      { question: "Faut-il une landing page pour chaque campagne ?", answer: "Pas toujours, mais la destination doit correspondre étroitement à la promesse, au public et à l'intention de l'annonce." },
      { question: "Que faut-il mesurer avant le lancement ?", answer: "L'action commerciale principale : demande envoyée, réservation, achat ou demande de devis." },
      { question: "Que faut-il corriger en premier ?", answer: "L'offre et le parcours de conversion afin que le visiteur comprenne immédiatement ce que vous proposez, pour qui et quoi faire ensuite." },
    ],
    `## La publicité amplifie le site existant

Acheter du trafic ne rend pas automatiquement une page convaincante. Commencez par vérifier qu'un visiteur pertinent peut facilement réaliser une action utile.

## 1. Une offre claire

En quelques secondes, il faut comprendre l'offre, le public visé et l'étape suivante.

## 2. Une landing page cohérente

La page d'arrivée doit poursuivre la promesse de l'annonce au lieu de renvoyer systématiquement vers une page d'accueil générale.

## 3. Une bonne expérience mobile

Testez texte, boutons, navigation et formulaire sur un vrai téléphone.

## 4. Un chargement rapide et stable

Réduisez les médias trop lourds et les scripts inutiles. Évitez les déplacements d'éléments pendant le chargement.

## 5. Des signaux de confiance

Affichez des informations réelles sur l'entreprise, des coordonnées, un périmètre clair et des exemples honnêtes. N'inventez ni avis ni résultats.

## 6. Une conversion principale

Choisissez l'objectif : contact, réservation, achat ou devis, puis rendez cette action évidente.

## 7. Un formulaire testé

Envoyez-le vous-même depuis mobile et ordinateur et vérifiez validation, confirmation et réception.

## 8. Analytics et conversions

Les clics ne suffisent pas. Vérifiez que l'événement représentant l'objectif réel est correctement enregistré.

## 9. Confidentialité et cookies

Adaptez l'information et le consentement aux outils de suivi réellement utilisés. Un modèle générique ne remplace pas un conseil juridique.

## 10. Le suivi après conversion

Définissez qui reçoit le prospect, dans quel délai il est traité et quelle confirmation est envoyée.

## Test final

Parcourez l'ensemble du parcours comme un client et confirmez que la conversion apparaît dans vos outils de mesure.

Voir [services et tarifs](/en/services-pricing/), [portfolio](/en/portfolio/) ou [contact](/en/contact/).`,
  ),

  it: makeTranslation(
    "it",
    "10 cose che il sito di una piccola impresa deve avere prima di spendere in pubblicità",
    "Checklist pratica prima della pubblicità a pagamento: offerta, landing page, mobile, fiducia, moduli, analytics, privacy e follow-up.",
    "Strategia web",
    ["checklist sito piccola impresa", "sito prima di Google Ads", "landing page prima della pubblicità", "lead generation"],
    "9 min di lettura",
    "Piccole imprese svizzere ed europee che preparano campagne a pagamento",
    "Il traffico a pagamento non ripara un sito confuso. Controlla queste dieci basi prima di acquistare più visite.",
    ["La pubblicità amplifica pregi e difetti della pagina di destinazione.", "Servono un'offerta chiara, una pagina pertinente e un passo successivo semplice.", "Testa mobile, moduli e velocità prima di aumentare il traffico.", "Misura le conversioni e definisci il follow-up dei lead."],
    ["Sistema prima il percorso di conversione.", "Invia ogni campagna alla pagina più pertinente.", "Testa tutto su un telefono reale.", "Misura richieste utili e prenotazioni, non solo clic."],
    [
      { question: "Posso fare pubblicità con un sito non finito?", answer: "Solo se la pagina di destinazione ha già un'offerta chiara, funziona bene da mobile, ha una conversione testata e può essere misurata." },
      { question: "Serve una landing page per ogni campagna?", answer: "Non sempre, ma la destinazione deve corrispondere bene a promessa, pubblico e intento dell'annuncio." },
      { question: "Cosa devo misurare prima di partire?", answer: "L'azione commerciale principale: richiesta, prenotazione, acquisto o preventivo." },
      { question: "Cosa devo correggere per primo?", answer: "L'offerta e il percorso di conversione, così il visitatore capisce subito cosa offri, a chi e cosa fare dopo." },
    ],
    `## La pubblicità amplifica il sito che hai già

Comprare traffico non rende automaticamente convincente una pagina confusa. Prima verifica che un visitatore pertinente possa completare facilmente un'azione utile.

## 1. Offerta chiara

In pochi secondi devono essere chiari servizio, pubblico e passo successivo.

## 2. Landing page coerente

La destinazione deve continuare la promessa dell'annuncio invece di mandare sempre tutti alla homepage.

## 3. Esperienza mobile

Testa testo, pulsanti, navigazione e modulo su un telefono reale.

## 4. Caricamento rapido e stabile

Riduci media pesanti e script non necessari. Evita spostamenti degli elementi durante il caricamento.

## 5. Fiducia

Mostra informazioni reali sull'azienda, contatti, ambito del servizio ed esempi onesti. Non inventare recensioni o risultati.

## 6. Una conversione principale

Definisci se l'obiettivo è contatto, prenotazione, acquisto o preventivo e rendilo evidente.

## 7. Modulo testato

Invialo tu stesso da mobile e desktop e verifica validazione, conferma e consegna.

## 8. Analytics e conversioni

I clic non bastano. Controlla che l'evento importante venga registrato correttamente.

## 9. Privacy e cookie

Allinea informativa e consenso agli strumenti di tracciamento realmente usati. Un modello generico non sostituisce consulenza legale.

## 10. Follow-up

Definisci chi riceve il lead, quando risponde e quale conferma viene inviata.

## Test finale

Percorri tutto il funnel come un cliente e verifica che la conversione sia visibile in analytics prima di aumentare il budget.

Consulta [servizi e prezzi](/en/services-pricing/), [portfolio](/en/portfolio/) o [contatti](/en/contact/).`,
  ),

  cz: makeTranslation(
    "cz",
    "10 věcí, které web malé firmy potřebuje, než začnete platit za reklamu",
    "Praktický checklist před placenou reklamou: nabídka, landing page, mobil, důvěra, formuláře, analytika, soukromí a follow-up.",
    "Webová strategie",
    ["checklist webu malé firmy", "web před Google Ads", "landing page před reklamou", "generování leadů"],
    "9 min čtení",
    "Malé firmy ve Švýcarsku a Evropě plánující placenou návštěvnost",
    "Placená návštěvnost neopraví nejasný web. Než začnete kupovat více návštěv, zkontrolujte těchto deset základů.",
    ["Reklama zesiluje silné i slabé stránky cílové stránky.", "Potřebujete jasnou nabídku, relevantní stránku a jednoduchý další krok.", "Před zvýšením návštěvnosti otestujte mobil, formuláře a rychlost.", "Měřte konverze a nastavte follow-up leadů."],
    ["Nejdřív opravte konverzní cestu.", "Každou kampaň směrujte na nejrelevantnější stránku.", "Otestujte celý proces na skutečném telefonu.", "Měřte užitečné poptávky, ne jen kliknutí."],
    [
      { question: "Mohu spustit reklamu na nedokončený web?", answer: "Pouze pokud cílová stránka už má jasnou nabídku, dobře funguje na mobilu, má otestovanou konverzi a lze ji měřit." },
      { question: "Potřebuji pro každou kampaň vlastní landing page?", answer: "Ne vždy, ale cílová stránka musí dobře odpovídat slibu, publiku a záměru reklamy." },
      { question: "Co mám měřit před spuštěním?", answer: "Hlavní obchodní akci, například odeslanou poptávku, rezervaci, nákup nebo žádost o nabídku." },
      { question: "Co opravit jako první?", answer: "Nabídku a konverzní cestu, aby bylo okamžitě jasné, co nabízíte, komu a jaký je další krok." },
    ],
    `## Reklama zesiluje web, který už máte

Placená návštěvnost sama neudělá z nejasné stránky přesvědčivou stránku. Nejprve ověřte, že relevantní návštěvník snadno dokončí užitečnou akci.

## 1. Jasná nabídka

Během několika sekund musí být jasné, co nabízíte, pro koho a co má návštěvník udělat dál.

## 2. Relevantní landing page

Cílová stránka má pokračovat ve slibu reklamy, ne automaticky posílat všechny na obecnou domovskou stránku.

## 3. Mobilní použitelnost

Otestujte text, tlačítka, navigaci a formulář na skutečném telefonu.

## 4. Rychlé a stabilní načítání

Omezte velká média a zbytečné skripty. Důležité prvky by se při načítání neměly posouvat.

## 5. Důvěra

Uveďte skutečné firemní a kontaktní údaje, jasný rozsah služeb a pravdivé příklady. Nevymýšlejte recenze ani výsledky.

## 6. Jedna hlavní konverze

Určete, zda cílem je poptávka, rezervace, nákup nebo nabídka, a tuto akci zvýrazněte.

## 7. Otestovaný formulář

Odešlete jej z mobilu i počítače a zkontrolujte validaci, potvrzení a doručení.

## 8. Analytika a konverze

Kliknutí nestačí. Ověřte, že se správně zaznamenává důležitá obchodní událost.

## 9. Soukromí a cookies

Nastavte informace a souhlas podle skutečně používaných nástrojů. Obecná šablona není právní rada.

## 10. Follow-up

Určete, kdo lead dostane, kdy odpoví a jaké potvrzení se odešle.

## Závěrečný test

Projít celou cestu jako zákazník a ověřit konverzi v analytice je levnější než odhalovat chyby až placeným provozem.

Viz [služby a ceny](/en/services-pricing/), [portfolio](/en/portfolio/) nebo [kontakt](/en/contact/).`,
  ),

  sk: makeTranslation(
    "sk",
    "10 vecí, ktoré web malej firmy potrebuje predtým, než začnete platiť za reklamu",
    "Praktický checklist pred platenou reklamou: ponuka, landing page, mobil, dôvera, formuláre, analytika, súkromie a follow-up.",
    "Webová stratégia",
    ["checklist webu malej firmy", "web pred Google Ads", "landing page pred reklamou", "generovanie leadov"],
    "9 min čítania",
    "Malé firmy vo Švajčiarsku a Európe plánujúce platenú návštevnosť",
    "Platená návštevnosť neopraví nejasný web. Pred nákupom ďalších návštev skontrolujte týchto desať základov.",
    ["Reklama zosilňuje silné aj slabé stránky cieľovej stránky.", "Potrebujete jasnú ponuku, relevantnú stránku a jednoduchý ďalší krok.", "Pred zvýšením návštevnosti otestujte mobil, formuláre a rýchlosť.", "Merajte konverzie a nastavte follow-up leadov."],
    ["Najprv opravte konverznú cestu.", "Každú kampaň smerujte na najrelevantnejšiu stránku.", "Otestujte celý proces na reálnom telefóne.", "Merajte užitočné dopyty, nie iba kliknutia."],
    [
      { question: "Môžem spustiť reklamu na nedokončený web?", answer: "Iba ak cieľová stránka už má jasnú ponuku, dobre funguje na mobile, má otestovanú konverziu a dá sa merať." },
      { question: "Potrebujem pre každú kampaň vlastnú landing page?", answer: "Nie vždy, ale cieľová stránka musí dobre zodpovedať prísľubu, publiku a zámeru reklamy." },
      { question: "Čo mám merať pred spustením?", answer: "Hlavnú obchodnú akciu, napríklad odoslaný dopyt, rezerváciu, nákup alebo žiadosť o ponuku." },
      { question: "Čo opraviť ako prvé?", answer: "Ponuku a konverznú cestu, aby bolo okamžite jasné, čo ponúkate, komu a aký je ďalší krok." },
    ],
    `## Reklama zosilňuje web, ktorý už máte

Platená návštevnosť sama neurobí z nejasnej stránky presvedčivú stránku. Najprv overte, že relevantný návštevník ľahko dokončí užitočnú akciu.

## 1. Jasná ponuka

Za pár sekúnd musí byť jasné, čo ponúkate, pre koho a čo má návštevník urobiť ďalej.

## 2. Relevantná landing page

Cieľová stránka má pokračovať v prísľube reklamy, nie automaticky posielať všetkých na všeobecnú domovskú stránku.

## 3. Mobilná použiteľnosť

Otestujte text, tlačidlá, navigáciu a formulár na skutočnom telefóne.

## 4. Rýchle a stabilné načítanie

Obmedzte veľké médiá a zbytočné skripty. Dôležité prvky sa počas načítania nemajú posúvať.

## 5. Dôvera

Uveďte skutočné firemné a kontaktné údaje, jasný rozsah služieb a pravdivé príklady. Nevymýšľajte recenzie ani výsledky.

## 6. Jedna hlavná konverzia

Určte, či cieľom je dopyt, rezervácia, nákup alebo ponuka, a túto akciu zvýraznite.

## 7. Otestovaný formulár

Odošlite ho z mobilu aj počítača a skontrolujte validáciu, potvrdenie a doručenie.

## 8. Analytika a konverzie

Kliknutia nestačia. Overte, že sa správne zaznamenáva dôležitá obchodná udalosť.

## 9. Súkromie a cookies

Nastavte informácie a súhlas podľa skutočne používaných nástrojov. Všeobecná šablóna nie je právna rada.

## 10. Follow-up

Určte, kto lead dostane, kedy odpovie a aké potvrdenie sa odošle.

## Záverečný test

Prejdite celú cestu ako zákazník a overte konverziu v analytike skôr, než zvýšite rozpočet.

Pozrite [služby a ceny](/en/services-pricing/), [portfolio](/en/portfolio/) alebo [kontakt](/en/contact/).`,
  ),

  pt: makeTranslation(
    "pt",
    "10 coisas de que o site de uma pequena empresa precisa antes de gastar em anúncios",
    "Checklist prática antes de publicidade paga: oferta, landing page, mobile, confiança, formulários, analytics, privacidade e follow-up.",
    "Estratégia de website",
    ["checklist site pequena empresa", "site antes de Google Ads", "landing page antes de publicidade", "geração de leads"],
    "9 min de leitura",
    "Pequenas empresas suíças e europeias que preparam tráfego pago",
    "O tráfego pago não corrige um site confuso. Verifica estas dez bases antes de comprares mais visitas.",
    ["A publicidade amplifica os pontos fortes e fracos da página de destino.", "Precisas de uma oferta clara, página relevante e próximo passo simples.", "Testa mobile, formulários e velocidade antes de aumentar o tráfego.", "Mede conversões e define o follow-up dos leads."],
    ["Corrige primeiro o caminho de conversão.", "Envia cada campanha para a página mais relevante.", "Testa toda a experiência num telemóvel real.", "Mede pedidos úteis e reservas, não apenas cliques."],
    [
      { question: "Posso anunciar com um site ainda incompleto?", answer: "Apenas se a página de destino já tiver uma oferta clara, funcionar bem em mobile, possuir uma conversão testada e puder ser medida." },
      { question: "Preciso de uma landing page para cada campanha?", answer: "Nem sempre, mas o destino deve corresponder de perto à promessa, público e intenção do anúncio." },
      { question: "O que devo medir antes de começar?", answer: "A principal ação de negócio, como pedido enviado, reserva, compra ou solicitação de proposta." },
      { question: "O que devo corrigir primeiro?", answer: "A oferta e o caminho de conversão, para ficar claro o que ofereces, a quem e qual é o próximo passo." },
    ],
    `## A publicidade amplifica o site que já tens

Comprar tráfego não transforma automaticamente uma página confusa numa página convincente. Primeiro garante que um visitante relevante consegue completar uma ação útil.

## 1. Oferta clara

Em poucos segundos deve ser claro o que ofereces, para quem e o que fazer a seguir.

## 2. Landing page alinhada

A página de destino deve continuar a promessa do anúncio em vez de enviar toda a gente para uma homepage genérica.

## 3. Experiência mobile

Testa texto, botões, navegação e formulário num telemóvel real.

## 4. Carregamento rápido e estável

Reduz ficheiros pesados e scripts desnecessários. Evita movimentos de layout durante o carregamento.

## 5. Confiança

Mostra dados reais da empresa, contacto, âmbito do serviço e exemplos honestos. Não inventes avaliações ou resultados.

## 6. Uma conversão principal

Define se o objetivo é contacto, reserva, compra ou proposta e torna essa ação evidente.

## 7. Formulário testado

Envia-o em mobile e desktop e verifica validação, confirmação e entrega.

## 8. Analytics e conversões

Cliques não bastam. Confirma que o evento que representa o objetivo real é registado corretamente.

## 9. Privacidade e cookies

Alinha informação e consentimento com as ferramentas de tracking realmente utilizadas. Um modelo genérico não é aconselhamento jurídico.

## 10. Follow-up

Define quem recebe o lead, quando responde e que confirmação é enviada.

## Teste final

Percorre todo o caminho como cliente e confirma a conversão em analytics antes de aumentar o orçamento.

Consulta [serviços e preços](/en/services-pricing/), [portfolio](/en/portfolio/) ou [contacto](/en/contact/).`,
  ),

  da: makeTranslation(
    "da",
    "10 ting din lille virksomheds website skal have, før du bruger penge på annoncer",
    "Praktisk tjekliste før betalt annoncering: tilbud, landingsside, mobil, tillid, formularer, analytics, privatliv og opfølgning.",
    "Websitestrategi",
    ["website tjekliste lille virksomhed", "website før Google Ads", "landingsside før annoncering", "leadgenerering"],
    "9 min læsning",
    "Små virksomheder i Schweiz og Europa, der planlægger betalt trafik",
    "Betalt trafik reparerer ikke et uklart website. Tjek disse ti grundelementer, før du køber flere besøg.",
    ["Annoncering forstærker landingssidens styrker og svagheder.", "Du behøver et klart tilbud, en relevant side og et enkelt næste skridt.", "Test mobil, formularer og hastighed før mere trafik.", "Mål konverteringer og planlæg opfølgning på leads."],
    ["Ret konverteringsvejen først.", "Send kampagnen til den mest relevante side.", "Test hele forløbet på en rigtig telefon.", "Mål værdifulde henvendelser, ikke kun klik."],
    [
      { question: "Kan jeg annoncere med et ufærdigt website?", answer: "Kun hvis landingssiden allerede har et klart tilbud, fungerer godt på mobil, har en testet konvertering og kan måles." },
      { question: "Skal hver kampagne have sin egen landingsside?", answer: "Ikke altid, men destinationen skal passe tæt til annoncens løfte, målgruppe og intention." },
      { question: "Hvad skal jeg måle før start?", answer: "Den vigtigste forretningshandling, fx indsendt henvendelse, booking, køb eller tilbudsanmodning." },
      { question: "Hvad skal jeg rette først?", answer: "Tilbuddet og konverteringsvejen, så det straks er tydeligt, hvad du tilbyder, til hvem og hvad næste skridt er." },
    ],
    `## Annoncering forstærker det website, du allerede har

Betalt trafik gør ikke automatisk en uklar side overbevisende. Sørg først for, at en relevant besøgende nemt kan gennemføre en nyttig handling.

## 1. Et klart tilbud

Det skal på få sekunder være tydeligt, hvad du tilbyder, til hvem og hvad næste skridt er.

## 2. En relevant landingsside

Siden skal fortsætte annoncens løfte i stedet for automatisk at sende alle til en generel forside.

## 3. Mobiloplevelsen

Test tekst, knapper, navigation og formular på en rigtig telefon.

## 4. Hurtig og stabil indlæsning

Reducer tunge medier og unødvendige scripts. Undgå at vigtige elementer flytter sig under indlæsning.

## 5. Tillid

Vis reelle virksomhedsoplysninger, kontakt, tydeligt serviceomfang og ærlige eksempler. Opfind ikke anmeldelser eller resultater.

## 6. Én primær konvertering

Beslut om målet er kontakt, booking, køb eller tilbud, og gør handlingen tydelig.

## 7. En testet formular

Indsend den selv fra mobil og desktop og kontroller validering, bekræftelse og levering.

## 8. Analytics og konverteringer

Klik er ikke nok. Kontroller at den vigtige forretningshændelse faktisk registreres.

## 9. Privatliv og cookies

Tilpas information og samtykke til de trackingværktøjer, du faktisk bruger. En standardskabelon er ikke juridisk rådgivning.

## 10. Opfølgning

Aftal hvem der modtager leadet, hvornår der svares, og hvilken bekræftelse der sendes.

## Sidste test

Gennemfør hele rejsen som kunde og bekræft konverteringen i analytics før budgettet øges.

Se [services og priser](/en/services-pricing/), [portfolio](/en/portfolio/) eller [kontakt](/en/contact/).`,
  ),

  nl: makeTranslation(
    "nl",
    "10 dingen die je kleine-bedrijfswebsite nodig heeft voordat je geld aan advertenties uitgeeft",
    "Praktische checklist vóór betaalde advertenties: aanbod, landingspagina, mobiel, vertrouwen, formulieren, analytics, privacy en opvolging.",
    "Websitestrategie",
    ["website checklist klein bedrijf", "website voor Google Ads", "landingspagina voor advertenties", "leadgeneratie"],
    "9 min leestijd",
    "Kleine bedrijven in Zwitserland en Europa die betaalde traffic voorbereiden",
    "Betaald verkeer repareert geen onduidelijke website. Controleer deze tien fundamenten voordat je meer bezoeken inkoopt.",
    ["Advertenties versterken de sterke en zwakke punten van de bestemmingspagina.", "Je hebt een duidelijk aanbod, relevante pagina en eenvoudige volgende stap nodig.", "Test mobiel, formulieren en snelheid vóór meer traffic.", "Meet conversies en organiseer de opvolging van leads."],
    ["Herstel eerst het conversiepad.", "Stuur campagnes naar de meest relevante pagina.", "Test de volledige route op een echte telefoon.", "Meet waardevolle aanvragen, niet alleen klikken."],
    [
      { question: "Kan ik adverteren met een onvoltooide website?", answer: "Alleen als de bestemmingspagina al een duidelijk aanbod heeft, goed werkt op mobiel, een geteste conversie heeft en meetbaar is." },
      { question: "Heeft elke campagne een aparte landingspagina nodig?", answer: "Niet altijd, maar de bestemming moet nauw aansluiten bij de belofte, doelgroep en intentie van de advertentie." },
      { question: "Wat moet ik meten vóór de start?", answer: "De belangrijkste bedrijfsactie, zoals een verzonden aanvraag, boeking, aankoop of offerteverzoek." },
      { question: "Wat moet ik eerst verbeteren?", answer: "Het aanbod en conversiepad, zodat direct duidelijk is wat je aanbiedt, voor wie en wat de volgende stap is." },
    ],
    `## Advertenties versterken de website die je al hebt

Betaald verkeer maakt een onduidelijke pagina niet vanzelf overtuigend. Zorg eerst dat een relevante bezoeker gemakkelijk een nuttige actie kan voltooien.

## 1. Een duidelijk aanbod

Binnen enkele seconden moet duidelijk zijn wat je aanbiedt, voor wie en wat de volgende stap is.

## 2. Een passende landingspagina

De bestemming moet de belofte van de advertentie voortzetten in plaats van iedereen automatisch naar een algemene homepage te sturen.

## 3. Mobiele ervaring

Test tekst, knoppen, navigatie en formulier op een echte telefoon.

## 4. Snel en stabiel laden

Beperk zware media en onnodige scripts. Voorkom dat belangrijke elementen verschuiven tijdens het laden.

## 5. Vertrouwen

Toon echte bedrijfsgegevens, contactinformatie, duidelijke scope en eerlijke voorbeelden. Verzin geen reviews of resultaten.

## 6. Eén primaire conversie

Bepaal of het doel contact, boeking, aankoop of offerte is en maak die actie duidelijk.

## 7. Een getest formulier

Verstuur het zelf op mobiel en desktop en controleer validatie, bevestiging en aflevering.

## 8. Analytics en conversies

Klikken zijn niet genoeg. Controleer of de belangrijke bedrijfsactie correct wordt geregistreerd.

## 9. Privacy en cookies

Stem informatie en toestemming af op de trackingtools die je werkelijk gebruikt. Een generiek sjabloon is geen juridisch advies.

## 10. Opvolging

Leg vast wie de lead ontvangt, wanneer er wordt gereageerd en welke bevestiging wordt verstuurd.

## Laatste test

Doorloop het hele traject als klant en controleer de conversie in analytics vóór je het budget verhoogt.

Bekijk [diensten en prijzen](/en/services-pricing/), [portfolio](/en/portfolio/) of [contact](/en/contact/).`,
  ),

  ja: makeTranslation(
    "ja",
    "広告費を使う前に小規模事業のWebサイトに必要な10項目",
    "有料広告を始める前の実践チェックリスト。オファー、ランディングページ、モバイル、信頼性、フォーム、分析、プライバシー、フォローアップを確認します。",
    "Webサイト戦略",
    ["小規模事業 Webサイト チェックリスト", "Google広告 前 Webサイト", "広告前 ランディングページ", "リード獲得"],
    "9分で読めます",
    "有料トラフィックを検討しているスイスおよび欧州の小規模事業者",
    "有料トラフィックだけでは分かりにくいWebサイトは改善しません。広告費を増やす前に10の基礎を確認しましょう。",
    ["広告はランディングページの長所と短所の両方を拡大します。", "明確なオファー、関連性の高いページ、簡単な次の行動が必要です。", "トラフィックを増やす前にモバイル、フォーム、速度をテストします。", "コンバージョン計測と問い合わせ後の対応を決めておきます。"],
    ["先にコンバージョン導線を改善する。", "各キャンペーンを最も関連性の高いページへ送る。", "実機のスマートフォンで最後までテストする。", "クリックだけでなく有効な問い合わせを計測する。"],
    [
      { question: "Webサイトが未完成でも広告を出せますか？", answer: "広告の遷移先に明確なオファーがあり、モバイルで正常に使え、コンバージョンがテスト済みで計測できる場合に限って検討するのが安全です。" },
      { question: "キャンペーンごとに専用ランディングページが必要ですか？", answer: "必須ではありませんが、遷移先は広告の約束、対象者、意図に密接に合っている必要があります。" },
      { question: "開始前に何を計測すべきですか？", answer: "問い合わせ送信、予約、購入、見積依頼など、最も重要な事業上の行動を計測します。" },
      { question: "最初に直すべきことは何ですか？", answer: "オファーとコンバージョン導線です。何を誰に提供し、次に何をしてほしいかがすぐ分かる状態にします。" },
    ],
    `## 広告は今あるWebサイトをそのまま拡大する

有料トラフィックを増やしても、分かりにくいページが自動的に良くなるわけではありません。まず、適切な訪問者が価値のある行動を簡単に完了できるか確認します。

## 1. 明確なオファー

数秒で、何を提供し、誰向けで、次に何をすべきか分かるようにします。

## 2. 広告と一致するランディングページ

広告の約束をページでも継続します。すべての広告を一般的なトップページへ送る必要はありません。

## 3. モバイル体験

実際のスマートフォンで文章、ボタン、ナビゲーション、フォームをテストします。

## 4. 速く安定した表示

大きすぎる画像や不要なスクリプトを減らし、読み込み中に重要な要素が動かないようにします。

## 5. 信頼材料

実在する会社情報、連絡先、サービス範囲、正確な事例を示します。レビューや成果を作り上げてはいけません。

## 6. 一つの主要コンバージョン

問い合わせ、予約、購入、見積依頼など、キャンペーンの成功条件を一つ明確にします。

## 7. テスト済みフォーム

モバイルとPCの両方から自分で送信し、入力チェック、確認表示、通知の到着まで確認します。

## 8. Analyticsとコンバージョン計測

クリック数だけでは十分ではありません。重要な事業行動が正しく記録されるかテストします。

## 9. プライバシーとCookie

実際に使うトラッキングツールに合わせて説明と同意設定を確認します。一般的なテンプレートは法的助言ではありません。

## 10. 問い合わせ後のフォローアップ

誰がリードを受け取り、いつ返信し、どの確認メッセージを送るかを決めます。

## 最終テスト

顧客になったつもりで全工程を進み、Analyticsでコンバージョンを確認してから予算を増やします。

[サービスと料金](/en/services-pricing/)、[ポートフォリオ](/en/portfolio/)、[お問い合わせ](/en/contact/)もご覧ください。`,
  ),
} satisfies Record<LocaleCode, BlogPostTranslation>;

export default {
  slug: "website-before-paid-ads-checklist",
  title: "10 Things Your Small-Business Website Needs Before You Spend Money on Ads",
  language: "en",
  description: "A practical pre-advertising website checklist covering your offer, landing page, mobile experience, trust, forms, analytics, privacy and follow-up.",
  published: true,
  status: "published",
  publishDate: "2026-08-21",
  image: "/assets/blog/10-features-business-website-needs.png",
  imageAlt: "Small-business website checklist visual used behind the article title for a guide to preparing a website before paid advertising.",
  author: "Websiteli",
  date: "2026-08-21",
  updated: "2026-08-21",
  translationFallback: false,
  tags: ["small business website checklist", "website before Google Ads", "landing page before advertising", "lead generation"],
  related: [
    "/en/services-pricing/",
    "/en/portfolio/",
    "/en/contact/",
    "/en/blog/business-website-features/",
  ],
  translations,
} satisfies BlogPostSource;
