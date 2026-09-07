import type { LocaleCode } from "../../locales";
import type { BlogPostSource, BlogPostTranslation } from "../types";

type LocalizedCopy = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  readingTime: string;
  audience: string;
  excerpt: string;
  summary: string[];
  takeaways: string[];
  prompts: string[];
  headings: [string, string, string, string, string, string, string];
  paragraphs: [string, string, string, string, string, string, string];
  faqs: { question: string; answer: string }[];
};

function makeTranslation(language: LocaleCode, copy: LocalizedCopy): BlogPostTranslation {
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
    chatGptPrompts: copy.prompts,
    faqs: copy.faqs,
    body:
      copy.headings.map((heading, index) => `## ${heading}\n\n${copy.paragraphs[index]}`).join("\n\n") +
      `\n\n[Lead generation](/en/services/lead-generation/) · [Landing pages](/en/services/landing-pages/) · [Business websites](/en/services/business-websites/) · [Services and pricing](/en/services-pricing/) · [Contact Websiteli](/en/contact/)`,
  };
}

const translations = {
  en: makeTranslation("en", {
    title: "UTM Tracking for Small Businesses: Know Which Marketing Brings Enquiries",
    description: "A practical UTM tracking guide for Swiss and European small businesses that want to connect campaigns, website visits and real enquiries without building a complicated analytics stack.",
    category: "Analytics & Lead Generation",
    tags: ["UTM tracking", "small business analytics", "campaign attribution", "lead tracking", "lead generation"],
    readingTime: "11 min read",
    audience: "Swiss and European small-business owners who use search, social, email, partnerships or paid campaigns and want clearer attribution",
    excerpt: "UTM parameters give small businesses a simple way to label campaign links and understand which marketing sources lead to meaningful website actions.",
    summary: [
      "UTM parameters label campaign links so analytics can distinguish sources, channels and individual campaigns.",
      "A small business usually needs a simple naming convention more than a complex attribution platform.",
      "Campaign tracking is useful only when it is connected to meaningful actions such as enquiries, bookings or quote requests.",
      "Consistent naming matters because variations such as linkedin, LinkedIn and linkedin.com can fragment reporting.",
      "UTMs should not contain personal or sensitive information because they can appear in URLs, analytics and shared links.",
    ],
    takeaways: [
      "Choose a short naming convention before publishing campaign links.",
      "Use source, medium and campaign consistently; add extra parameters only when they answer a real question.",
      "Test the complete journey from campaign link to conversion event before relying on reports.",
      "Measure qualified actions, not campaign clicks alone.",
      "Keep attribution simple enough that the team will actually maintain it.",
    ],
    prompts: [
      "Create a simple UTM naming convention for my small business using the channels I currently use.",
      "Review these campaign URLs for inconsistent UTM parameters and propose a cleaner structure.",
      "Help me define which website conversions should be connected to my campaign tracking.",
    ],
    headings: [
      "What UTM tracking does for a small business",
      "Use a simple five-part naming convention",
      "Choose source, medium and campaign names before publishing",
      "Connect campaign visits to real website conversions",
      "Avoid the tracking mistakes that make reports unreliable",
      "Use UTMs across search, social, email and partnerships",
      "Build a monthly review habit instead of a bigger dashboard",
    ],
    paragraphs: [
      "A UTM is a short set of parameters added to a link. When someone clicks that link, analytics tools can record how the visit was labelled. For a small business, the value is practical: you can separate traffic from a LinkedIn post, an email newsletter, a partner referral or a specific paid campaign instead of seeing all visits as one vague pool. UTMs do not prove that marketing caused a sale, but they give you a cleaner record of how a visitor reached the website and which campaigns are associated with useful actions.",
      "The common parameters are utm_source, utm_medium, utm_campaign, utm_content and utm_term. Most small businesses can start with the first three. Source identifies where the traffic came from, such as linkedin or newsletter. Medium describes the channel type, such as social, email or cpc. Campaign groups links around one initiative, such as spring-consultation-2026. Content can distinguish two creatives or buttons when you genuinely need that comparison. Term is mainly useful when you deliberately track keyword-level information. Keep values lowercase, short and readable.",
      "Decide the naming rules before links are distributed. A simple convention might use lowercase words separated by hyphens and a fixed list of approved source and medium values. This avoids reports splitting one channel into several labels because one person used linkedin, another used LinkedIn and another used linkedin.com. Put the convention in a small shared document or spreadsheet. The best system is not the most sophisticated one; it is the one people can repeat correctly without asking for help every time.",
      "UTM reports become useful when they are connected to the actions that matter to the business. A campaign visit is context; an enquiry, booked consultation, reservation, download or quote request is the event you can act on. Before launching a campaign, open the tagged link yourself, complete the intended action and verify that both the campaign information and conversion event appear as expected. If you use a CRM, carry the source information forward where practical so later follow-up can be reviewed alongside the original campaign.",
      "Do not place names, email addresses, customer identifiers or other sensitive information in UTM values. URLs can be copied, logged and shared. Avoid changing naming conventions mid-campaign without a clear reason, and do not tag ordinary internal website navigation with UTMs because that can overwrite the visitor's original acquisition context. Also avoid creating dozens of parameters that nobody reviews. Tracking should reduce uncertainty, not create a second administrative job.",
      "UTMs are useful beyond paid ads. A LinkedIn post can use source=linkedin and medium=social; a newsletter can use source=newsletter and medium=email; a partner link can use the partner name as source and referral as medium. For paid campaigns, keep the naming aligned with the advertising platform and your own reporting needs. The important part is consistency across channels so the same business question can be answered each month: which sources brought relevant visitors, and which of those visitors completed useful actions?",
      "Review a small set of questions every month: which campaigns produced enquiries or bookings, which landing pages received those visits, where did people leave the path, and were leads followed up correctly? Use the answers to improve the weakest part of the journey before adding more channels or more reporting layers. Websiteli can connect [lead-generation systems](/en/services/lead-generation/), [landing pages](/en/services/landing-pages/) and website analytics into a maintainable setup that focuses on business actions rather than vanity metrics.",
    ],
    faqs: [
      { question: "What does UTM stand for?", answer: "UTM parameters are labels added to a URL so analytics tools can identify campaign source, medium, campaign and optional details such as content or term." },
      { question: "Which UTM parameters should a small business use?", answer: "Start with utm_source, utm_medium and utm_campaign. Add utm_content or utm_term only when they answer a specific reporting question." },
      { question: "Should I use UTMs on internal website links?", answer: "Usually no. Internal UTMs can overwrite acquisition information and make it harder to understand how a visitor originally reached the site." },
      { question: "Can I put customer names or emails in UTM parameters?", answer: "No. Avoid personal, confidential or sensitive information because UTM values can appear in browser addresses, analytics logs and copied links." },
      { question: "Are UTMs enough to measure marketing ROI?", answer: "No. UTMs help with campaign attribution, but meaningful evaluation also needs reliable conversion tracking and, where relevant, later business outcomes such as qualified enquiries or completed sales." },
    ],
  }),

  de: makeTranslation("de", {
    title: "UTM-Tracking für KMU: Welche Marketingmassnahmen bringen Anfragen?",
    description: "Praxisleitfaden für Schweizer und europäische KMU: Kampagnen mit UTM-Parametern sauber kennzeichnen und Website-Besuche mit echten Anfragen verbinden.",
    category: "Analytics & Leadgenerierung",
    tags: ["UTM Tracking", "KMU Analytics", "Kampagnen Attribution", "Lead Tracking", "Leadgenerierung"],
    readingTime: "12 Min. Lesezeit",
    audience: "Schweizer und europäische KMU, die Suchmaschinen, Social Media, Newsletter, Partnerschaften oder bezahlte Kampagnen nutzen",
    excerpt: "UTM-Parameter helfen KMU, Kampagnenlinks einheitlich zu kennzeichnen und zu erkennen, welche Quellen zu relevanten Website-Aktionen führen.",
    summary: [
      "UTM-Parameter kennzeichnen Kampagnenlinks und machen Quelle, Kanal und Kampagne in Analytics unterscheidbar.",
      "Für KMU ist eine einfache, konsequent gepflegte Namenskonvention meist wichtiger als ein komplexes Attributionstool.",
      "Kampagnendaten werden erst wertvoll, wenn sie mit Anfragen, Buchungen oder Offertanfragen verbunden werden.",
      "Uneinheitliche Schreibweisen fragmentieren Berichte und erschweren Vergleiche.",
      "Personenbezogene oder vertrauliche Informationen gehören nicht in UTM-Parameter.",
    ],
    takeaways: [
      "Vor Veröffentlichung der Links eine kurze Namenskonvention festlegen.",
      "Source, Medium und Campaign konsequent verwenden und zusätzliche Parameter nur bei echtem Analysebedarf ergänzen.",
      "Den gesamten Weg vom Kampagnenlink bis zur Conversion vor dem Start testen.",
      "Qualifizierte Aktionen statt nur Klicks bewerten.",
      "Das Tracking so einfach halten, dass es im Alltag zuverlässig gepflegt wird.",
    ],
    prompts: [
      "Erstelle eine einfache UTM-Namenskonvention für die Marketingkanäle meines KMU.",
      "Prüfe diese Kampagnen-URLs auf uneinheitliche UTM-Parameter und schlage eine saubere Struktur vor.",
      "Hilf mir festzulegen, welche Website-Conversions ich mit meinen Kampagnendaten verbinden sollte.",
    ],
    headings: [
      "Was UTM-Tracking einem KMU tatsächlich bringt",
      "Eine einfache Konvention mit fünf möglichen Parametern nutzen",
      "Source, Medium und Campaign vor der Veröffentlichung festlegen",
      "Kampagnenbesuche mit echten Website-Conversions verbinden",
      "Tracking-Fehler vermeiden, die Berichte unzuverlässig machen",
      "UTMs für Suche, Social Media, E-Mail und Partnerschaften einsetzen",
      "Monatlich die richtigen Fragen prüfen statt ein grösseres Dashboard zu bauen",
    ],
    paragraphs: [
      "UTM-Parameter sind kurze Kennzeichnungen, die an einen Link angehängt werden. Nach dem Klick kann ein Analytics-System erfassen, wie dieser Besuch markiert war. Für ein KMU ist der Nutzen sehr konkret: Ein LinkedIn-Beitrag, ein Newsletter, ein Partnerlink oder eine einzelne Werbekampagne lassen sich voneinander unterscheiden. UTMs beweisen nicht, dass eine Kampagne einen Verkauf verursacht hat. Sie schaffen aber eine sauberere Grundlage, um Herkunft und nachfolgende Website-Aktionen gemeinsam zu beurteilen.",
      "Üblich sind utm_source, utm_medium, utm_campaign, utm_content und utm_term. Für viele KMU reichen zunächst die ersten drei. Source beschreibt die Herkunft, beispielsweise linkedin oder newsletter. Medium bezeichnet den Kanaltyp wie social, email oder cpc. Campaign bündelt Links zu einer konkreten Initiative, zum Beispiel fruehling-beratung-2026. Content kann zwei Varianten unterscheiden. Term sollte nur genutzt werden, wenn Keyword-Informationen bewusst benötigt werden. Verwenden Sie kurze, kleingeschriebene und verständliche Werte.",
      "Definieren Sie die Schreibweise, bevor Kampagnenlinks verteilt werden. Eine einfache Regel kann Kleinbuchstaben, Bindestriche und eine feste Liste erlaubter Source- und Medium-Werte vorsehen. So wird derselbe Kanal nicht als linkedin, LinkedIn und linkedin.com in drei Zeilen aufgeteilt. Dokumentieren Sie die Regeln in einer kleinen gemeinsamen Datei oder Tabelle. Entscheidend ist nicht maximale Raffinesse, sondern Wiederholbarkeit im Alltag.",
      "Kampagnenberichte werden erst geschäftlich relevant, wenn sie mit den gewünschten Aktionen verbunden sind. Ein Besuch liefert Kontext; eine Anfrage, Terminbuchung, Reservation, ein Download oder eine Offertanfrage ist eine Aktion, die bewertet werden kann. Öffnen Sie vor Kampagnenstart den markierten Link selbst, führen Sie die gewünschte Aktion aus und kontrollieren Sie, ob Kampagneninformation und Conversion korrekt erscheinen. Wenn ein CRM genutzt wird, kann die Herkunft dort weitergeführt werden, sofern dies sauber und verhältnismässig umsetzbar ist.",
      "Verwenden Sie in UTM-Werten keine Namen, E-Mail-Adressen, Kundennummern oder vertraulichen Informationen. URLs können kopiert, protokolliert und weitergegeben werden. Ändern Sie Namensregeln nicht mitten in einer Kampagne ohne klaren Grund. Kennzeichnen Sie ausserdem normale interne Website-Links nicht mit UTMs, weil dadurch die ursprüngliche Besucherquelle überschrieben werden kann. Vermeiden Sie auch Dutzende Parameter, die später niemand auswertet.",
      "UTMs sind nicht nur für bezahlte Werbung sinnvoll. Ein LinkedIn-Beitrag kann source=linkedin und medium=social nutzen, ein Newsletter source=newsletter und medium=email, ein Partnerlink den Partnernamen als source und referral als medium. Bei bezahlten Kampagnen sollten Plattformbezeichnungen und interne Auswertung sinnvoll zusammenpassen. Wichtig ist, dass dieselbe Frage kanalübergreifend beantwortbar bleibt: Welche Quellen brachten relevante Besucher und welche davon führten zu nützlichen Aktionen?",
      "Prüfen Sie monatlich wenige, aber geschäftsnahe Fragen: Welche Kampagnen brachten Anfragen oder Buchungen? Auf welchen Landingpages kamen diese Besucher an? Wo brach der Weg ab? Wurden Leads zuverlässig weiterbearbeitet? Verbessern Sie zuerst die schwächste Stufe, bevor Sie zusätzliche Kanäle oder komplexere Reports ergänzen. Websiteli kann [Leadgenerierung](/en/services/lead-generation/), [Landingpages](/en/services/landing-pages/) und Website-Analytics zu einem wartbaren Messaufbau verbinden.",
    ],
    faqs: [
      { question: "Wofür stehen UTM-Parameter?", answer: "UTM-Parameter sind URL-Kennzeichnungen, mit denen Analytics-Systeme Quelle, Medium, Kampagne und optional weitere Kampagnendetails unterscheiden können." },
      { question: "Welche UTM-Parameter braucht ein KMU?", answer: "Beginnen Sie mit utm_source, utm_medium und utm_campaign. utm_content und utm_term sollten nur ergänzt werden, wenn damit eine konkrete Analysefrage beantwortet wird." },
      { question: "Soll ich interne Website-Links mit UTMs versehen?", answer: "In der Regel nicht. Interne UTMs können die ursprüngliche Herkunft des Besuchers überschreiben und Attribution verschlechtern." },
      { question: "Dürfen Kundennamen oder E-Mail-Adressen in UTM-Parametern stehen?", answer: "Nein. Personenbezogene, vertrauliche oder sensible Daten sollten nicht in URL-Parametern stehen, da diese in Browsern, Logs und geteilten Links sichtbar werden können." },
      { question: "Reichen UTMs zur Messung des Marketing-ROI?", answer: "Nein. UTMs unterstützen die Attribution. Für eine sinnvolle Bewertung braucht es zusätzlich zuverlässige Conversion-Messung und, wenn relevant, spätere Geschäftsergebnisse wie qualifizierte Anfragen oder abgeschlossene Verkäufe." },
    ],
  }),

  hu: makeTranslation("hu", {
    title: "UTM-követés kisvállalkozásoknak: melyik marketing hoz érdeklődőket?",
    description: "Gyakorlati útmutató svájci és európai kkv-knak UTM-paraméterekhez, kampányok követéséhez és az érdeklődések forrásának jobb megértéséhez.",
    category: "Analitika és leadgenerálás",
    tags: ["UTM követés", "kisvállalati analitika", "kampány attribúció", "lead követés", "leadgenerálás"],
    readingTime: "9 perc olvasás",
    audience: "Svájci és európai kkv-k, amelyek keresést, közösségi médiát, e-mailt, partneri linkeket vagy fizetett kampányokat használnak",
    excerpt: "Az UTM-paraméterek egyszerűen megjelölik a kampánylinkeket, így könnyebb látni, mely források vezetnek valódi weboldali műveletekhez.",
    summary: ["Az UTM-ek forrás, csatorna és kampány szerint címkézik a linkeket.", "Egy egyszerű, következetes névszabály fontosabb lehet, mint egy bonyolult attribúciós rendszer.", "A kampányadatokat érdemes űrlapbeküldésekhez, foglalásokhoz vagy ajánlatkérésekhez kapcsolni.", "Az eltérő elnevezések széttördelik a riportokat.", "Személyes vagy bizalmas adat ne kerüljön UTM-paraméterbe."],
    takeaways: ["Előre rögzítsd az elnevezési szabályokat.", "A source, medium és campaign mezőket használd következetesen.", "Indulás előtt teszteld a teljes utat a linktől a konverzióig.", "Ne csak kattintásokat, hanem hasznos üzleti műveleteket mérj.", "Tartsd egyszerűen fenntarthatónak a rendszert."],
    prompts: ["Készíts egyszerű UTM-névszabályt a vállalkozásom csatornáihoz.", "Ellenőrizd ezeket a kampánylinkeket következetlen UTM-paraméterek szempontjából.", "Segíts kiválasztani, mely weboldali konverziókat kövessem kampányonként."],
    headings: ["Mire jó az UTM-követés egy kisvállalkozásnak", "Használj egyszerű ötparaméteres keretet", "A source, medium és campaign neveket előre határozd meg", "Kapcsold a kampánylátogatásokat valódi konverziókhoz", "Kerüld a riportokat elrontó követési hibákat", "Használj UTM-eket kereséshez, közösségi médiához, e-mailhez és partnerekhez", "Havi áttekintést építs, ne nagyobb dashboardot"],
    paragraphs: ["Az UTM a link végéhez adott rövid jelölés. Segít megkülönböztetni például egy LinkedIn-poszt, hírlevél, partnerlink vagy fizetett kampány forgalmát. Nem bizonyítja önmagában, hogy a marketing okozott egy eladást, de tisztább képet ad arról, honnan érkezett a látogató.", "A leggyakoribb mezők: utm_source, utm_medium, utm_campaign, utm_content és utm_term. A legtöbb kkv a source, medium és campaign hármassal el tud indulni. Használj rövid, kisbetűs, könnyen érthető értékeket.", "Még a linkek publikálása előtt döntsd el a névszabályokat. Ha ugyanaz a csatorna linkedin, LinkedIn és linkedin.com néven szerepel, a riport feleslegesen széttöredezik. Tarts egy közös listát az engedélyezett elnevezésekről.", "A kampányadat akkor hasznos, ha a fontos műveletekkel együtt látod: űrlapbeküldés, időpontfoglalás, ajánlatkérés vagy más releváns konverzió. Indulás előtt kattints a címkézett linkre, végezd el a műveletet, és ellenőrizd a mérést.", "Ne tegyél neveket, e-mail-címeket vagy érzékeny adatokat UTM-ekbe. Ne címkézd UTM-mel a weboldalon belüli normál linkeket, mert felülírhatják az eredeti forrást. Ne gyárts több paramétert annál, mint amit ténylegesen elemezni fogsz.", "Az UTM-ek organikus közösségi posztokhoz, hírlevelekhez, partneri linkekhez és fizetett kampányokhoz egyaránt használhatók. A lényeg a következetesség, hogy minden csatornán ugyanazokra az üzleti kérdésekre tudj válaszolni.", "Havonta nézd meg, mely kampányok hoztak érdeklődést, mely oldalakon landoltak a látogatók, hol szakadt meg a folyamat és megtörtént-e az utánkövetés. Először a leggyengébb lépést javítsd, ne a dashboardot bővítsd."],
    faqs: [{ question: "Mi az UTM?", answer: "A kampánylinkhez adott URL-paraméter, amely segít a forrás, médium és kampány azonosításában." }, { question: "Mely mezőkkel kezdjek?", answer: "Általában az utm_source, utm_medium és utm_campaign elég a kezdéshez." }, { question: "Használjak UTM-et belső linkeken?", answer: "Általában ne, mert felülírhatja az eredeti forgalmi forrást." }, { question: "Kerülhet személyes adat UTM-be?", answer: "Nem. Az URL-ek másolhatók, naplózhatók és megoszthatók." }, { question: "Az UTM önmagában elég a ROI méréséhez?", answer: "Nem. Konverziómérésre és az üzleti eredmények követésére is szükség van." }],
  }),

  pl: makeTranslation("pl", {
    title: "Śledzenie UTM dla małych firm: które działania marketingowe przynoszą zapytania?",
    description: "Praktyczny przewodnik dla małych firm w Szwajcarii i Europie: UTM, spójne nazewnictwo kampanii i łączenie ruchu z realnymi zapytaniami.",
    category: "Analityka i lead generation",
    tags: ["UTM", "analityka małej firmy", "atrybucja kampanii", "śledzenie leadów", "lead generation"],
    readingTime: "9 min czytania",
    audience: "Małe firmy korzystające z wyszukiwania, social mediów, e-maili, partnerstw lub reklam",
    excerpt: "Parametry UTM pomagają oznaczać linki kampanii i sprawdzać, które źródła prowadzą do wartościowych działań na stronie.",
    summary: ["UTM oznacza źródło, medium i kampanię w linku.", "Prosta konwencja nazw jest ważniejsza niż rozbudowane narzędzie atrybucji.", "Dane kampanii powinny być połączone z formularzami, rezerwacjami i innymi konwersjami.", "Niespójne nazwy rozbijają raporty.", "Danych osobowych nie należy umieszczać w UTM."],
    takeaways: ["Ustal nazewnictwo przed publikacją linków.", "Konsekwentnie stosuj source, medium i campaign.", "Testuj pełną ścieżkę do konwersji.", "Mierz wartościowe działania, nie tylko kliknięcia.", "Utrzymuj system na tyle prosty, by był regularnie używany."],
    prompts: ["Stwórz prostą konwencję UTM dla kanałów mojej firmy.", "Sprawdź te linki kampanii pod kątem niespójnych UTM.", "Pomóż mi wybrać konwersje, które warto łączyć z kampaniami."],
    headings: ["Co UTM daje małej firmie", "Zacznij od prostego zestawu parametrów", "Ustal nazwy source, medium i campaign przed publikacją", "Połącz ruch z rzeczywistymi konwersjami", "Unikaj błędów psujących raporty", "Stosuj UTM w social mediach, e-mailu, wyszukiwarce i partnerstwach", "Rób miesięczny przegląd zamiast rozbudowywać dashboard"],
    paragraphs: ["UTM to krótkie parametry dopisane do linku. Pozwalają rozróżnić ruch z posta LinkedIn, newslettera, partnera czy płatnej kampanii. Nie dowodzą same w sobie wpływu na sprzedaż, ale porządkują informację o źródle wizyty.", "Najczęściej używa się utm_source, utm_medium, utm_campaign, utm_content i utm_term. Większość małych firm może zacząć od pierwszych trzech, używając krótkich i konsekwentnych wartości.", "Nazwy warto ustalić przed dystrybucją linków. linkedin, LinkedIn i linkedin.com mogą zostać pokazane jako trzy różne źródła. Prosta wspólna lista nazw ogranicza ten problem.", "Raport jest przydatny, gdy kampanię można powiązać z wysłanym formularzem, rezerwacją, prośbą o ofertę lub innym ważnym działaniem. Przetestuj link i konwersję przed startem.", "Nie umieszczaj w UTM nazwisk, adresów e-mail ani informacji poufnych. Nie używaj UTM na zwykłych linkach wewnętrznych, bo mogą nadpisać pierwotne źródło ruchu.", "UTM sprawdza się w social mediach, newsletterach, linkach partnerskich i płatnych kampaniach. Kluczowe jest wspólne nazewnictwo, które pozwala porównywać kanały.", "Co miesiąc sprawdź, które kampanie przyniosły zapytania, dokąd trafiali użytkownicy, gdzie ścieżka się urywała i czy leady były obsługiwane. Najpierw napraw najsłabszy etap."],
    faqs: [{ question: "Czym jest UTM?", answer: "To parametr URL opisujący źródło, medium, kampanię i opcjonalne szczegóły kampanii." }, { question: "Od których parametrów zacząć?", answer: "Najczęściej wystarczą utm_source, utm_medium i utm_campaign." }, { question: "Czy stosować UTM na linkach wewnętrznych?", answer: "Zwykle nie, ponieważ może to nadpisać pierwotne źródło wizyty." }, { question: "Czy można wpisywać dane klienta w UTM?", answer: "Nie. Parametry URL mogą być widoczne w logach i udostępnianych linkach." }, { question: "Czy UTM wystarczy do oceny ROI?", answer: "Nie. Potrzebne jest również śledzenie konwersji i późniejszych wyników biznesowych." }],
  }),

  es: makeTranslation("es", {
    title: "Seguimiento UTM para pequeñas empresas: qué marketing genera consultas",
    description: "Guía práctica para pymes suizas y europeas sobre parámetros UTM, nomenclatura de campañas y conexión entre tráfico web y consultas reales.",
    category: "Analítica y captación de leads",
    tags: ["UTM", "analítica para pymes", "atribución de campañas", "seguimiento de leads", "captación de leads"],
    readingTime: "9 min de lectura",
    audience: "Pymes que usan buscadores, redes sociales, email, colaboraciones o publicidad",
    excerpt: "Los parámetros UTM permiten etiquetar enlaces y entender qué fuentes de marketing conducen a acciones útiles en la web.",
    summary: ["Los UTM identifican fuente, medio y campaña.", "Una convención sencilla y constante suele ser suficiente para una pyme.", "El tráfico debe relacionarse con formularios, reservas u otras conversiones.", "Los nombres inconsistentes fragmentan los informes.", "No se deben incluir datos personales en los UTM."],
    takeaways: ["Define la nomenclatura antes de publicar enlaces.", "Usa source, medium y campaign de forma consistente.", "Prueba el recorrido completo hasta la conversión.", "Mide acciones de negocio, no solo clics.", "Mantén un sistema que el equipo pueda sostener."],
    prompts: ["Crea una convención UTM sencilla para mis canales de marketing.", "Revisa estos enlaces y detecta UTM inconsistentes.", "Ayúdame a elegir las conversiones que debo asociar a cada campaña."],
    headings: ["Qué aporta el seguimiento UTM a una pyme", "Empieza con un esquema sencillo", "Define source, medium y campaign antes de publicar", "Conecta las visitas con conversiones reales", "Evita errores que vuelven poco fiables los informes", "Usa UTM en redes, email, buscadores y colaboraciones", "Haz una revisión mensual en lugar de ampliar el dashboard"],
    paragraphs: ["Un UTM es un conjunto de parámetros añadido a un enlace. Permite distinguir una visita procedente de LinkedIn, un boletín, un socio o una campaña de pago. No demuestra por sí solo que una campaña haya causado una venta, pero ordena la información sobre el origen de la visita.", "Los parámetros habituales son utm_source, utm_medium, utm_campaign, utm_content y utm_term. Muchas pymes pueden empezar solo con los tres primeros y valores cortos, en minúsculas y fáciles de entender.", "Acordad los nombres antes de distribuir los enlaces. linkedin, LinkedIn y linkedin.com pueden aparecer como fuentes distintas. Una lista compartida de valores aprobados mantiene los informes limpios.", "La atribución es útil cuando se conecta con formularios enviados, reservas, solicitudes de presupuesto u otras acciones importantes. Prueba el enlace etiquetado y completa la conversión antes de lanzar la campaña.", "No pongas nombres, emails ni información sensible en los UTM. Tampoco etiquetes la navegación interna normal, porque puede sobrescribir el origen original del visitante.", "Los UTM sirven para publicaciones sociales, newsletters, enlaces de socios y campañas de pago. La consistencia permite responder la misma pregunta en todos los canales: cuáles atraen visitas relevantes y cuáles generan acciones útiles.", "Cada mes revisa qué campañas produjeron consultas o reservas, qué páginas recibieron esas visitas, dónde se rompió el recorrido y cómo se gestionaron los leads. Mejora primero el punto más débil."],
    faqs: [{ question: "¿Qué es un UTM?", answer: "Es un parámetro de URL que identifica fuente, medio, campaña y, opcionalmente, otros detalles." }, { question: "¿Qué parámetros necesito?", answer: "Empieza con utm_source, utm_medium y utm_campaign." }, { question: "¿Debo usar UTM en enlaces internos?", answer: "Normalmente no, porque pueden sobrescribir la fuente original de adquisición." }, { question: "¿Puedo incluir emails o nombres?", answer: "No. Los parámetros de URL pueden quedar registrados o compartirse." }, { question: "¿Los UTM bastan para medir el ROI?", answer: "No. También necesitas conversiones fiables y, cuando proceda, resultados comerciales posteriores." }],
  }),

  fr: makeTranslation("fr", {
    title: "Suivi UTM pour petites entreprises : quel marketing génère des demandes ?",
    description: "Guide pratique pour PME suisses et européennes : paramètres UTM, conventions de campagne et lien entre trafic web et demandes réelles.",
    category: "Analytics et génération de leads",
    tags: ["UTM", "analytics PME", "attribution marketing", "suivi des leads", "génération de leads"],
    readingTime: "9 min de lecture",
    audience: "PME utilisant recherche, réseaux sociaux, e-mail, partenariats ou campagnes payantes",
    excerpt: "Les paramètres UTM permettent d'étiqueter les liens de campagne et de mieux comprendre quelles sources mènent à des actions utiles sur le site.",
    summary: ["Les UTM identifient source, medium et campagne.", "Une convention simple et cohérente suffit souvent pour une PME.", "Les données de campagne doivent être reliées aux formulaires, réservations ou autres conversions.", "Les noms incohérents fragmentent les rapports.", "Les UTM ne doivent pas contenir de données personnelles."],
    takeaways: ["Fixer les règles de nommage avant publication.", "Utiliser source, medium et campaign de façon cohérente.", "Tester le parcours complet jusqu'à la conversion.", "Mesurer les actions utiles plutôt que les clics seuls.", "Garder un système réellement maintenable."],
    prompts: ["Crée une convention UTM simple pour mes canaux marketing.", "Vérifie ces URL de campagne et repère les UTM incohérents.", "Aide-moi à choisir les conversions à relier à mes campagnes."],
    headings: ["Ce que le suivi UTM apporte à une PME", "Commencer par un cadre simple", "Définir source, medium et campaign avant publication", "Relier les visites aux vraies conversions", "Éviter les erreurs qui faussent les rapports", "Utiliser les UTM sur les réseaux, l'e-mail, la recherche et les partenariats", "Faire une revue mensuelle plutôt qu'agrandir le tableau de bord"],
    paragraphs: ["Un UTM est un ensemble de paramètres ajouté à une URL. Il permet de distinguer une visite provenant de LinkedIn, d'une newsletter, d'un partenaire ou d'une campagne payante. Il ne prouve pas à lui seul qu'une campagne a causé une vente, mais clarifie l'origine de la visite.", "Les paramètres courants sont utm_source, utm_medium, utm_campaign, utm_content et utm_term. De nombreuses PME peuvent commencer avec les trois premiers et des valeurs courtes, en minuscules et lisibles.", "Définissez les noms avant de diffuser les liens. linkedin, LinkedIn et linkedin.com risquent d'apparaître comme trois sources distinctes. Une courte liste commune évite cette fragmentation.", "Les rapports deviennent utiles lorsqu'ils sont reliés à un formulaire envoyé, une réservation, une demande de devis ou une autre conversion importante. Testez le lien et l'événement avant le lancement.", "N'insérez jamais de noms, e-mails ou informations sensibles dans les UTM. Évitez aussi les UTM sur les liens internes ordinaires, car ils peuvent écraser la source d'acquisition initiale.", "Les UTM sont utiles pour les posts sociaux, newsletters, partenaires et campagnes payantes. La cohérence permet de comparer les canaux avec la même logique.", "Chaque mois, regardez quelles campagnes ont généré des demandes, quelles pages les visiteurs ont vues, où le parcours s'est interrompu et si les leads ont été suivis. Corrigez d'abord l'étape la plus faible."],
    faqs: [{ question: "Qu'est-ce qu'un UTM ?", answer: "C'est un paramètre d'URL permettant d'identifier source, medium, campagne et éventuellement d'autres détails." }, { question: "Quels paramètres utiliser au début ?", answer: "utm_source, utm_medium et utm_campaign suffisent généralement pour commencer." }, { question: "Faut-il mettre des UTM sur les liens internes ?", answer: "En général non, car cela peut écraser la source d'acquisition d'origine." }, { question: "Peut-on y mettre des données clients ?", answer: "Non. Les paramètres d'URL peuvent être enregistrés ou partagés." }, { question: "Les UTM suffisent-ils pour mesurer le ROI ?", answer: "Non. Il faut aussi mesurer les conversions et, si pertinent, les résultats commerciaux ultérieurs." }],
  }),

  it: makeTranslation("it", {
    title: "Tracking UTM per piccole imprese: quale marketing porta richieste?",
    description: "Guida pratica per PMI svizzere ed europee: parametri UTM, nomi coerenti delle campagne e collegamento tra visite e richieste reali.",
    category: "Analytics e lead generation",
    tags: ["UTM", "analytics PMI", "attribuzione campagne", "tracking lead", "lead generation"],
    readingTime: "9 min di lettura",
    audience: "PMI che usano ricerca, social, email, partnership o campagne a pagamento",
    excerpt: "I parametri UTM etichettano i link delle campagne e aiutano a capire quali fonti portano ad azioni utili sul sito.",
    summary: ["Gli UTM identificano fonte, mezzo e campagna.", "Una convenzione semplice e coerente è spesso sufficiente per una PMI.", "Il traffico va collegato a moduli, prenotazioni o altre conversioni.", "Nomi incoerenti frammentano i report.", "I parametri UTM non devono contenere dati personali."],
    takeaways: ["Definisci le regole prima di pubblicare i link.", "Usa source, medium e campaign in modo coerente.", "Testa il percorso completo fino alla conversione.", "Misura azioni utili, non solo clic.", "Mantieni il sistema facile da gestire."],
    prompts: ["Crea una convenzione UTM semplice per i miei canali marketing.", "Controlla questi link e individua UTM incoerenti.", "Aiutami a scegliere le conversioni da collegare alle campagne."],
    headings: ["Cosa offre il tracking UTM a una piccola impresa", "Parti da uno schema semplice", "Definisci source, medium e campaign prima della pubblicazione", "Collega le visite alle conversioni reali", "Evita gli errori che rendono inaffidabili i report", "Usa gli UTM su social, email, ricerca e partnership", "Fai una revisione mensile invece di ampliare il dashboard"],
    paragraphs: ["Un UTM è un insieme di parametri aggiunto a un link. Permette di distinguere una visita da LinkedIn, una newsletter, un partner o una campagna a pagamento. Non dimostra da solo che il marketing abbia causato una vendita, ma rende più chiara l'origine della visita.", "I parametri comuni sono utm_source, utm_medium, utm_campaign, utm_content e utm_term. Molte PMI possono iniziare con i primi tre e valori brevi, in minuscolo e leggibili.", "Stabilisci i nomi prima di distribuire i link. linkedin, LinkedIn e linkedin.com possono diventare tre fonti diverse nei report. Una piccola lista condivisa evita il problema.", "I dati sono utili quando vengono collegati a moduli inviati, prenotazioni, richieste di preventivo o altre azioni importanti. Prima del lancio prova il link e completa la conversione.", "Non inserire nomi, email o informazioni sensibili negli UTM. Evita anche UTM sui normali link interni perché possono sovrascrivere la fonte originale del visitatore.", "Gli UTM funzionano per post social, newsletter, partner e campagne a pagamento. La coerenza consente di confrontare i canali con la stessa logica.", "Ogni mese verifica quali campagne hanno generato richieste, quali pagine hanno ricevuto le visite, dove il percorso si è interrotto e come sono stati gestiti i lead. Migliora prima il punto più debole."],
    faqs: [{ question: "Che cos'è un UTM?", answer: "È un parametro URL che identifica fonte, mezzo, campagna e dettagli opzionali." }, { question: "Quali parametri servono all'inizio?", answer: "Di solito utm_source, utm_medium e utm_campaign." }, { question: "Devo usare UTM sui link interni?", answer: "In genere no, perché possono sovrascrivere la fonte originaria." }, { question: "Posso inserire email o nomi?", answer: "No. I parametri URL possono essere registrati e condivisi." }, { question: "Gli UTM bastano per misurare il ROI?", answer: "No. Servono anche conversioni affidabili e, quando rilevante, risultati commerciali successivi." }],
  }),

  cz: makeTranslation("cz", {
    title: "UTM sledování pro malé firmy: který marketing přináší poptávky?",
    description: "Praktický průvodce pro švýcarské a evropské malé firmy: UTM parametry, konzistentní názvy kampaní a propojení návštěv s reálnými poptávkami.",
    category: "Analytika a získávání leadů",
    tags: ["UTM", "analytika malé firmy", "atribuce kampaní", "sledování leadů", "lead generation"],
    readingTime: "9 min čtení",
    audience: "Malé firmy využívající vyhledávání, sociální sítě, e-mail, partnerství nebo placené kampaně",
    excerpt: "UTM parametry označují kampanové odkazy a pomáhají zjistit, které zdroje vedou k důležitým akcím na webu.",
    summary: ["UTM označuje zdroj, médium a kampaň.", "Jednoduchá konzistentní pravidla jsou pro malou firmu často dostačující.", "Návštěvy je potřeba spojit s formuláři, rezervacemi a dalšími konverzemi.", "Nekonzistentní názvy rozdělují reporty.", "Do UTM nepatří osobní ani citlivé údaje."],
    takeaways: ["Názvy určete před publikací odkazů.", "Source, medium a campaign používejte konzistentně.", "Otestujte cestu až ke konverzi.", "Měřte důležité akce, ne jen kliknutí.", "Systém musí být snadno udržovatelný."],
    prompts: ["Navrhni jednoduchou UTM konvenci pro marketingové kanály mé firmy.", "Zkontroluj tyto kampanové odkazy a najdi nekonzistentní UTM.", "Pomoz mi vybrat konverze, které mám spojit s kampaněmi."],
    headings: ["Co UTM sledování přináší malé firmě", "Začněte jednoduchou sadou parametrů", "Source, medium a campaign stanovte předem", "Propojte návštěvy s reálnými konverzemi", "Vyhněte se chybám, které kazí reporty", "Používejte UTM na sociálních sítích, v e-mailu, vyhledávání a partnerstvích", "Měsíčně vyhodnocujte místo stavby většího dashboardu"],
    paragraphs: ["UTM jsou krátké parametry přidané k odkazu. Pomohou odlišit návštěvu z LinkedInu, newsletteru, partnera nebo placené kampaně. Samy o sobě nedokazují vliv na prodej, ale zpřehledňují původ návštěvy.", "Běžné jsou utm_source, utm_medium, utm_campaign, utm_content a utm_term. Většina malých firem může začít prvními třemi a krátkými hodnotami psanými malými písmeny.", "Názvy určete ještě před distribucí odkazů. linkedin, LinkedIn a linkedin.com mohou být v reportu tři různé zdroje. Sdílený seznam povolených názvů tomu zabrání.", "Kampanová data dávají smysl, když jsou propojena s odeslaným formulářem, rezervací nebo poptávkou. Před spuštěním klikněte na označený odkaz a ověřte celou konverzi.", "Do UTM nedávejte jména, e-maily ani citlivé údaje. Nepoužívejte je ani na běžných interních odkazech, protože mohou přepsat původní zdroj návštěvy.", "UTM využijete pro sociální sítě, newslettery, partnerské odkazy i placené kampaně. Konzistence umožní porovnat kanály stejným způsobem.", "Každý měsíc zkontrolujte, které kampaně přinesly poptávky, na jaké stránky návštěvníci přišli, kde cestu opustili a zda proběhl follow-up. Nejprve opravte nejslabší místo."],
    faqs: [{ question: "Co je UTM?", answer: "Parametr URL popisující zdroj, médium, kampaň a volitelné detaily." }, { question: "Které parametry použít jako první?", answer: "Obvykle stačí utm_source, utm_medium a utm_campaign." }, { question: "Používat UTM na interních odkazech?", answer: "Většinou ne, protože mohou přepsat původní zdroj návštěvy." }, { question: "Mohou UTM obsahovat osobní údaje?", answer: "Ne. URL mohou být logovány a sdíleny." }, { question: "Stačí UTM k měření ROI?", answer: "Ne. Potřebujete také spolehlivé měření konverzí a případně následných obchodních výsledků." }],
  }),

  sk: makeTranslation("sk", {
    title: "UTM sledovanie pre malé firmy: ktorý marketing prináša dopyty?",
    description: "Praktický sprievodca pre švajčiarske a európske malé firmy: UTM parametre, konzistentné názvy kampaní a prepojenie návštev s reálnymi dopytmi.",
    category: "Analytika a získavanie leadov",
    tags: ["UTM", "analytika malej firmy", "atribúcia kampaní", "sledovanie leadov", "lead generation"],
    readingTime: "9 min čítania",
    audience: "Malé firmy využívajúce vyhľadávanie, sociálne siete, e-mail, partnerstvá alebo platené kampane",
    excerpt: "UTM parametre označujú kampanové odkazy a pomáhajú zistiť, ktoré zdroje vedú k dôležitým akciám na webe.",
    summary: ["UTM označuje zdroj, médium a kampaň.", "Jednoduché a konzistentné pravidlá sú pre malú firmu často dostačujúce.", "Návštevy treba prepájať s formulármi, rezerváciami a konverziami.", "Nekonzistentné názvy rozdeľujú reporty.", "Do UTM nepatria osobné ani citlivé údaje."],
    takeaways: ["Názvy určte pred zverejnením odkazov.", "Source, medium a campaign používajte konzistentne.", "Otestujte cestu až po konverziu.", "Merajte dôležité akcie, nie iba kliknutia.", "Systém musí zostať jednoducho udržateľný."],
    prompts: ["Navrhni jednoduchú UTM konvenciu pre marketingové kanály mojej firmy.", "Skontroluj tieto kampanové odkazy a nájdi nekonzistentné UTM.", "Pomôž mi vybrať konverzie, ktoré mám spájať s kampaňami."],
    headings: ["Čo UTM sledovanie prináša malej firme", "Začnite jednoduchou sadou parametrov", "Source, medium a campaign určte vopred", "Prepojte návštevy s reálnymi konverziami", "Vyhnite sa chybám, ktoré kazia reporty", "Používajte UTM na sociálnych sieťach, v e-maile, vyhľadávaní a partnerstvách", "Mesačne vyhodnocujte namiesto budovania väčšieho dashboardu"],
    paragraphs: ["UTM sú krátke parametre pridané k odkazu. Pomáhajú odlíšiť návštevu z LinkedInu, newslettera, partnera alebo platenej kampane. Samy nedokazujú vplyv na predaj, ale sprehľadňujú pôvod návštevy.", "Bežné sú utm_source, utm_medium, utm_campaign, utm_content a utm_term. Väčšina malých firiem môže začať prvými tromi a krátkymi hodnotami písanými malými písmenami.", "Názvy určte pred distribúciou odkazov. linkedin, LinkedIn a linkedin.com môžu byť v reporte tri rôzne zdroje. Zdieľaný zoznam povolených názvov tomu zabráni.", "Kampanové dáta dávajú zmysel, keď sa prepoja s odoslaným formulárom, rezerváciou alebo dopytom. Pred spustením kliknite na označený odkaz a overte celú konverziu.", "Do UTM nedávajte mená, e-maily ani citlivé údaje. Nepoužívajte ich ani na bežných interných odkazoch, pretože môžu prepísať pôvodný zdroj návštevy.", "UTM využijete pre sociálne siete, newslettery, partnerské odkazy aj platené kampane. Konzistentnosť umožní porovnať kanály rovnakou logikou.", "Každý mesiac skontrolujte, ktoré kampane priniesli dopyty, na aké stránky ľudia prišli, kde cestu opustili a či prebehol follow-up. Najprv opravte najslabšie miesto."],
    faqs: [{ question: "Čo je UTM?", answer: "Parameter URL opisujúci zdroj, médium, kampaň a voliteľné detaily." }, { question: "Ktoré parametre použiť na začiatku?", answer: "Zvyčajne stačia utm_source, utm_medium a utm_campaign." }, { question: "Používať UTM na interných odkazoch?", answer: "Väčšinou nie, pretože môžu prepísať pôvodný zdroj návštevy." }, { question: "Môžu UTM obsahovať osobné údaje?", answer: "Nie. URL môžu byť zaznamenané a zdieľané." }, { question: "Stačí UTM na meranie ROI?", answer: "Nie. Potrebujete aj spoľahlivé meranie konverzií a prípadne následných obchodných výsledkov." }],
  }),

  pt: makeTranslation("pt", {
    title: "Tracking UTM para pequenas empresas: que marketing gera contactos?",
    description: "Guia prático para pequenas empresas suíças e europeias: parâmetros UTM, nomes consistentes de campanhas e ligação entre visitas e contactos reais.",
    category: "Analytics e geração de leads",
    tags: ["UTM", "analytics para pequenas empresas", "atribuição de campanhas", "tracking de leads", "geração de leads"],
    readingTime: "9 min de leitura",
    audience: "Pequenas empresas que usam pesquisa, redes sociais, email, parcerias ou campanhas pagas",
    excerpt: "Os parâmetros UTM etiquetam links de campanhas e ajudam a perceber que fontes levam a ações úteis no website.",
    summary: ["UTM identifica origem, meio e campanha.", "Uma convenção simples e consistente é normalmente suficiente para uma pequena empresa.", "As visitas devem ser ligadas a formulários, reservas e outras conversões.", "Nomes inconsistentes fragmentam os relatórios.", "Dados pessoais não devem ser colocados em UTM."],
    takeaways: ["Define os nomes antes de publicar links.", "Usa source, medium e campaign de forma consistente.", "Testa todo o percurso até à conversão.", "Mede ações relevantes, não apenas cliques.", "Mantém o sistema simples de operar."],
    prompts: ["Cria uma convenção UTM simples para os meus canais de marketing.", "Revê estes links e identifica UTM inconsistentes.", "Ajuda-me a escolher as conversões que devo ligar às campanhas."],
    headings: ["O que o tracking UTM oferece a uma pequena empresa", "Começa com uma estrutura simples", "Define source, medium e campaign antes de publicar", "Liga visitas a conversões reais", "Evita erros que tornam os relatórios pouco fiáveis", "Usa UTM em redes sociais, email, pesquisa e parcerias", "Faz uma revisão mensal em vez de aumentar o dashboard"],
    paragraphs: ["Um UTM é um conjunto de parâmetros adicionado a um link. Permite distinguir uma visita vinda do LinkedIn, newsletter, parceiro ou campanha paga. Não prova por si só que o marketing causou uma venda, mas clarifica a origem da visita.", "Os parâmetros comuns são utm_source, utm_medium, utm_campaign, utm_content e utm_term. Muitas pequenas empresas podem começar apenas com os três primeiros e valores curtos, em minúsculas e legíveis.", "Define os nomes antes de distribuir os links. linkedin, LinkedIn e linkedin.com podem aparecer como três fontes diferentes. Uma lista partilhada evita esta fragmentação.", "Os dados tornam-se úteis quando se ligam a formulários enviados, reservas, pedidos de proposta ou outras conversões importantes. Testa o link e conclui a conversão antes do lançamento.", "Não coloques nomes, emails ou informação sensível em UTM. Evita também UTM em links internos normais, pois podem substituir a origem inicial do visitante.", "UTM funciona em posts sociais, newsletters, links de parceiros e campanhas pagas. A consistência permite comparar canais com a mesma lógica.", "Todos os meses revê que campanhas geraram contactos, que páginas receberam essas visitas, onde o percurso falhou e se houve follow-up. Corrige primeiro o ponto mais fraco."],
    faqs: [{ question: "O que é UTM?", answer: "É um parâmetro de URL que identifica origem, meio, campanha e detalhes opcionais." }, { question: "Que parâmetros devo usar primeiro?", answer: "Normalmente utm_source, utm_medium e utm_campaign." }, { question: "Devo usar UTM em links internos?", answer: "Geralmente não, porque podem substituir a origem original da visita." }, { question: "Posso incluir nomes ou emails?", answer: "Não. Os parâmetros de URL podem ser registados e partilhados." }, { question: "UTM chega para medir ROI?", answer: "Não. Também precisas de conversões fiáveis e, quando relevante, resultados comerciais posteriores." }],
  }),

  da: makeTranslation("da", {
    title: "UTM-sporing for små virksomheder: hvilken markedsføring giver henvendelser?",
    description: "Praktisk guide til schweiziske og europæiske små virksomheder om UTM-parametre, ensartede kampagnenavne og kobling mellem besøg og henvendelser.",
    category: "Analyse og leadgenerering",
    tags: ["UTM", "analyse for små virksomheder", "kampagneattribuering", "lead tracking", "leadgenerering"],
    readingTime: "9 min læsning",
    audience: "Små virksomheder, der bruger søgning, sociale medier, e-mail, partnerskaber eller betalte kampagner",
    excerpt: "UTM-parametre mærker kampagnelinks og gør det lettere at se, hvilke kilder der fører til nyttige handlinger på websitet.",
    summary: ["UTM identificerer kilde, medie og kampagne.", "En enkel og konsekvent navnestandard er ofte nok for en mindre virksomhed.", "Kampagnedata bør kobles til formularer, bookinger og andre konverteringer.", "Uens navne splitter rapporterne.", "Personlige data bør ikke stå i UTM-parametre."],
    takeaways: ["Fastlæg navne før links publiceres.", "Brug source, medium og campaign konsekvent.", "Test hele rejsen til konverteringen.", "Mål nyttige handlinger, ikke kun klik.", "Hold systemet enkelt nok til at vedligeholde."],
    prompts: ["Lav en enkel UTM-standard til mine marketingkanaler.", "Gennemgå disse kampagnelinks og find inkonsistente UTM-parametre.", "Hjælp mig med at vælge de konverteringer, der skal kobles til kampagnerne."],
    headings: ["Hvad UTM-sporing giver en lille virksomhed", "Start med en enkel struktur", "Fastlæg source, medium og campaign før publicering", "Kobl besøg til reelle konverteringer", "Undgå fejl der gør rapporter upålidelige", "Brug UTM på sociale medier, e-mail, søgning og partnerskaber", "Lav en månedlig gennemgang i stedet for et større dashboard"],
    paragraphs: ["UTM er korte parametre, der tilføjes til et link. De kan skelne besøg fra LinkedIn, et nyhedsbrev, en partner eller en betalt kampagne. De beviser ikke alene, at marketing skabte et salg, men gør trafikkilden tydeligere.", "De almindelige parametre er utm_source, utm_medium, utm_campaign, utm_content og utm_term. Mange små virksomheder kan begynde med de første tre og korte, ensartede værdier med små bogstaver.", "Aftal navnene før links deles. linkedin, LinkedIn og linkedin.com kan ende som tre forskellige kilder. En fælles liste over godkendte værdier holder rapporterne renere.", "Data bliver nyttige, når de kobles til formularindsendelser, bookinger, tilbudsforespørgsler eller andre vigtige handlinger. Test link og konvertering før kampagnen starter.", "Brug ikke navne, e-mails eller følsomme oplysninger i UTM. Undgå også UTM på almindelige interne links, da de kan overskrive den oprindelige trafikkilde.", "UTM kan bruges til sociale opslag, nyhedsbreve, partnerlinks og betalte kampagner. Konsistens gør kanaler sammenlignelige.", "Gennemgå hver måned hvilke kampagner der gav henvendelser, hvilke sider de landede på, hvor rejsen brød sammen, og om leads blev fulgt op. Forbedr det svageste trin først."],
    faqs: [{ question: "Hvad er UTM?", answer: "Et URL-parameter, der identificerer kilde, medie, kampagne og eventuelle ekstra detaljer." }, { question: "Hvilke parametre skal jeg starte med?", answer: "Normalt utm_source, utm_medium og utm_campaign." }, { question: "Skal jeg bruge UTM på interne links?", answer: "Som regel nej, fordi de kan overskrive den oprindelige trafikkilde." }, { question: "Kan UTM indeholde kundedata?", answer: "Nej. URL-parametre kan blive logget og delt." }, { question: "Er UTM nok til at måle ROI?", answer: "Nej. Du skal også have pålidelig konverteringsmåling og eventuelt senere forretningsresultater." }],
  }),

  nl: makeTranslation("nl", {
    title: "UTM-tracking voor kleine bedrijven: welke marketing levert aanvragen op?",
    description: "Praktische gids voor Zwitserse en Europese kleine bedrijven over UTM-parameters, consistente campagnenamen en het koppelen van bezoeken aan echte aanvragen.",
    category: "Analytics en leadgeneratie",
    tags: ["UTM", "analytics voor kleine bedrijven", "campagne-attributie", "lead tracking", "leadgeneratie"],
    readingTime: "9 min leestijd",
    audience: "Kleine bedrijven die zoekverkeer, social media, e-mail, partnerships of betaalde campagnes gebruiken",
    excerpt: "UTM-parameters labelen campagnelinks en helpen bepalen welke marketingbronnen tot nuttige acties op de website leiden.",
    summary: ["UTM identificeert bron, medium en campagne.", "Een eenvoudige consistente naamgeving is vaak voldoende voor een klein bedrijf.", "Campagnebezoeken moeten worden gekoppeld aan formulieren, boekingen en andere conversies.", "Inconsistente namen versnipperen rapportages.", "Persoonsgegevens horen niet in UTM-parameters."],
    takeaways: ["Bepaal naamgeving vóór publicatie.", "Gebruik source, medium en campaign consequent.", "Test de volledige route tot conversie.", "Meet zakelijke acties, niet alleen klikken.", "Houd het systeem eenvoudig genoeg om te onderhouden."],
    prompts: ["Maak een eenvoudige UTM-naamconventie voor mijn marketingkanalen.", "Controleer deze campagnelinks op inconsistente UTM-parameters.", "Help me kiezen welke websiteconversies ik aan campagnes moet koppelen."],
    headings: ["Wat UTM-tracking een klein bedrijf oplevert", "Begin met een eenvoudig raamwerk", "Bepaal source, medium en campaign vóór publicatie", "Koppel bezoeken aan echte conversies", "Vermijd fouten die rapportages onbetrouwbaar maken", "Gebruik UTM voor social, e-mail, zoekverkeer en partnerships", "Doe maandelijks een review in plaats van een groter dashboard te bouwen"],
    paragraphs: ["UTM bestaat uit korte parameters die aan een link worden toegevoegd. Daarmee kun je verkeer uit LinkedIn, een nieuwsbrief, een partner of een betaalde campagne onderscheiden. Het bewijst niet op zichzelf dat marketing een verkoop veroorzaakte, maar maakt de herkomst van een bezoek duidelijker.", "Veelgebruikte parameters zijn utm_source, utm_medium, utm_campaign, utm_content en utm_term. Veel kleine bedrijven kunnen beginnen met de eerste drie en korte, leesbare waarden in kleine letters.", "Leg de naamgeving vast voordat links worden gedeeld. linkedin, LinkedIn en linkedin.com kunnen als drie verschillende bronnen verschijnen. Een gedeelde lijst met toegestane waarden voorkomt dat.", "Campagnedata wordt waardevol wanneer die gekoppeld is aan formulieren, boekingen, offerteaanvragen of andere belangrijke acties. Test de getagde link en de conversie vóór de lancering.", "Zet geen namen, e-mailadressen of gevoelige informatie in UTM. Gebruik UTM ook niet op gewone interne links, omdat die de oorspronkelijke acquisitiebron kunnen overschrijven.", "UTM werkt voor social posts, nieuwsbrieven, partnerlinks en betaalde campagnes. Consistente naamgeving maakt kanalen op dezelfde manier vergelijkbaar.", "Bekijk maandelijks welke campagnes aanvragen opleverden, op welke pagina's bezoekers kwamen, waar de route afbrak en of leads goed zijn opgevolgd. Verbeter eerst de zwakste stap."],
    faqs: [{ question: "Wat is UTM?", answer: "Een URL-parameter waarmee bron, medium, campagne en optionele details worden geïdentificeerd." }, { question: "Met welke parameters begin ik?", answer: "Meestal met utm_source, utm_medium en utm_campaign." }, { question: "Moet ik UTM op interne links gebruiken?", answer: "Meestal niet, omdat dit de oorspronkelijke verkeersbron kan overschrijven." }, { question: "Mag ik klantgegevens in UTM zetten?", answer: "Nee. URL-parameters kunnen worden gelogd en gedeeld." }, { question: "Is UTM genoeg om ROI te meten?", answer: "Nee. Betrouwbare conversiemeting en eventueel latere bedrijfsresultaten zijn ook nodig." }],
  }),

  ja: makeTranslation("ja", {
    title: "小規模企業のUTMトラッキング：どのマーケティングが問い合わせにつながるか",
    description: "スイスと欧州の小規模企業向けに、UTMパラメータ、キャンペーン命名ルール、訪問と実際の問い合わせを結び付ける方法を解説します。",
    category: "アナリティクスとリード獲得",
    tags: ["UTM", "小規模企業アナリティクス", "キャンペーンアトリビューション", "リード追跡", "リード獲得"],
    readingTime: "9分で読めます",
    audience: "検索、SNS、メール、パートナー施策、有料広告を利用するスイス・欧州の小規模企業",
    excerpt: "UTMパラメータでキャンペーンリンクを整理すると、どの流入元が有効なウェブサイト行動につながったか確認しやすくなります。",
    summary: ["UTMは流入元、メディア、キャンペーンをURLで識別します。", "小規模企業では複雑な仕組みより一貫した命名ルールが重要です。", "キャンペーン訪問は問い合わせや予約などのコンバージョンと結び付けます。", "表記揺れはレポートを分断します。", "個人情報や機密情報をUTMに入れてはいけません。"],
    takeaways: ["リンク公開前に命名ルールを決める。", "source、medium、campaignを一貫して使う。", "リンクからコンバージョンまで実際にテストする。", "クリック数だけでなく重要な行動を測る。", "運用できるシンプルさを保つ。"],
    prompts: ["私のマーケティングチャネル向けに簡単なUTM命名ルールを作ってください。", "これらのキャンペーンURLのUTM表記揺れを確認してください。", "キャンペーンと結び付けるべきウェブサイトコンバージョンを整理してください。"],
    headings: ["小規模企業にUTMトラッキングが役立つ理由", "シンプルなパラメータ構成から始める", "公開前にsource・medium・campaignを決める", "訪問を実際のコンバージョンにつなげる", "レポートを壊すトラッキングミスを避ける", "SNS・メール・検索・パートナー施策でUTMを使う", "大きなダッシュボードより月次レビューを習慣化する"],
    paragraphs: ["UTMはリンク末尾に追加する短いパラメータです。LinkedIn投稿、ニュースレター、パートナー、有料キャンペーンなどの流入を区別できます。UTMだけで売上への因果関係を証明することはできませんが、訪問元を整理できます。", "一般的な項目はutm_source、utm_medium、utm_campaign、utm_content、utm_termです。多くの小規模企業は最初の3つから始め、短く分かりやすい小文字の値を使えば十分です。", "リンクを配布する前に命名ルールを決めます。linkedin、LinkedIn、linkedin.comが別の流入元として表示されると比較しにくくなります。承認済みの表記を共有しておきましょう。", "キャンペーンデータは、フォーム送信、予約、見積依頼などの重要な行動と結び付けると役立ちます。公開前にタグ付きリンクをクリックし、実際にコンバージョンまで完了して計測を確認します。", "氏名、メールアドレス、機密情報をUTMに入れないでください。また通常のサイト内リンクにUTMを付けると、元の流入情報を上書きする可能性があります。", "UTMはSNS投稿、ニュースレター、パートナーリンク、有料キャンペーンで利用できます。チャネル間で命名をそろえることが比較の前提です。", "毎月、どのキャンペーンが問い合わせにつながったか、どのページに着地したか、どこで離脱したか、フォローアップされたかを確認します。まず最も弱い段階を改善しましょう。"],
    faqs: [{ question: "UTMとは何ですか？", answer: "流入元、メディア、キャンペーンなどを識別するURLパラメータです。" }, { question: "最初に使うべき項目は？", answer: "通常はutm_source、utm_medium、utm_campaignから始めます。" }, { question: "サイト内リンクにもUTMを付けますか？", answer: "通常は付けません。元の流入元情報を上書きする可能性があります。" }, { question: "顧客名やメールを入れてよいですか？", answer: "いいえ。URLパラメータは記録・共有される可能性があります。" }, { question: "UTMだけでROIを測れますか？", answer: "いいえ。信頼できるコンバージョン計測と、必要に応じて後続の事業成果も確認する必要があります。" }],
  }),
} satisfies BlogPostSource["translations"];

export default {
  slug: "utm-tracking-small-business",
  published: true,
  status: "published",
  publishDate: "2026-08-23",
  image: "/assets/blog/utm-tracking-small-business.webp",
  socialImage: "/assets/blog/utm-tracking-small-business-linkedin.jpg",
  imageAlt: "UTM tracking for small business graphic showing campaign channels, tagged links, analytics reports and enquiry attribution.",
  author: "Websiteli",
  date: "2026-08-23",
  updated: "2026-08-23",
  related: [
    "/en/blog/small-business-lead-generation-funnel/",
    "/en/blog/website-before-paid-ads-checklist/",
    "/en/services/lead-generation/",
    "/en/services/landing-pages/",
    "/en/services-pricing/",
    "/en/contact/",
  ],
  translations,
} satisfies BlogPostSource;
