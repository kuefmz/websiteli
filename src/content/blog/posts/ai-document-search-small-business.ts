import type { BlogPostSource, BlogPostTranslation } from "../types";
import type { LocaleCode } from "../../locales";

type TranslationInput = {
  title: string;
  description: string;
  category: string;
  readingTime: string;
  audience: string;
  excerpt: string;
  summary: string[];
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
  body: string;
};

function makeTranslation(language: LocaleCode, input: TranslationInput): BlogPostTranslation {
  return {
    ...input,
    tags: ["AI document search", "RAG", "internal AI assistant", "business automation"],
    language,
    chatGptPrompts: [
      `Design a narrow AI document-search pilot for my business based on "${input.title}".`,
      `Create a permissions and source-citation checklist for an internal AI assistant.`,
      `Help me decide whether ordinary search or retrieval-based AI is more appropriate.`,
    ],
  };
}

const sharedRelated = [
  "/en/services/ai-assistants/",
  "/en/services/business-automation/",
  "/en/services-pricing/",
  "/en/contact/",
];

const translations = {
  en: makeTranslation("en", {
    title: "AI Document Search for Small Businesses: A Practical RAG Guide",
    description: "Learn how retrieval-based AI document search can help small businesses find approved information with permissions, citations and human review.",
    category: "AI Automation",
    readingTime: "9 min read",
    audience: "Swiss and European small-business owners evaluating internal AI search",
    excerpt: "A practical guide to AI document search, retrieval-augmented generation, permissions, source citations, risks and a sensible first implementation.",
    summary: [
      "AI document search retrieves relevant passages from approved sources before generating an answer.",
      "Retrieval-augmented generation can be more practical than model training when company information changes regularly.",
      "Permissions, source citations, content ownership and human escalation are core design requirements.",
      "A narrow first use case is easier to test, maintain and improve than a broad company-wide assistant.",
    ],
    keyTakeaways: [
      "Start with one document collection and one repeated employee question.",
      "Preserve the access rights of the original systems.",
      "Require source links for answers that influence business decisions.",
      "Measure usefulness, unsupported answers and maintenance effort.",
    ],
    faqs: [
      { question: "What is RAG?", answer: "Retrieval-augmented generation is a pattern in which a system retrieves relevant information from approved sources and gives that context to a language model before it answers." },
      { question: "Is RAG the same as training a model?", answer: "No. RAG retrieves current information at request time. Model training changes model behaviour and is usually not necessary for a first internal document-search project." },
      { question: "Can an AI assistant access every company document?", answer: "It should not. Access should follow existing permissions, data sensitivity and a clearly approved scope." },
      { question: "How should a small business start?", answer: "Choose one stable document set, define a small group of users, require citations and review unanswered or low-confidence questions." },
    ],
    body: `## What AI document search actually does

AI document search helps employees ask a question in natural language and receive an answer based on approved company sources. A useful system does not simply rely on a model's general knowledge. It first finds relevant passages, then uses those passages to prepare an answer.

This pattern is often called retrieval-augmented generation, or RAG.

## RAG versus model training

Small businesses often assume they need to train a model on their documents. In many cases, that is unnecessary.

With RAG, documents remain in a controlled knowledge source. At request time, the system retrieves the most relevant sections and provides them as context. This makes updates easier because a changed policy or service description can be replaced in the source without retraining a model.

Model training may be useful for specialised behaviour or classification, but it is not the default answer to document search.

## Good first use cases

A practical first project focuses on one repeated task, such as:

- finding the latest internal process;
- locating an approved service description;
- summarising a policy for an employee;
- comparing information across a small document collection;
- preparing a first draft with links to the source.

The first version should avoid changing records, sending messages or taking business actions automatically.

## Permissions and privacy

An internal assistant must respect the access rights of the original systems. A user should not receive a document or passage they could not open directly.

The design should define which repositories are included, which folders are excluded, who may ask questions, how sensitive data is handled, how access is logged and who owns document updates.

For Swiss and European businesses, privacy responsibilities depend on the data, purpose, providers and contracts involved. A technical assistant does not remove the need for proper governance or legal review.

## Source citations and human review

Important answers should show where the information came from. A source link, file name, section or page reference lets the employee verify the result.

The assistant should say when it cannot find enough evidence. It should not fill gaps with confident language.

> [!BEST PRACTICE] Treat an unsupported answer as a workflow failure to review, not as a reason to hide source uncertainty.

## A sensible first architecture

A small first version can include:

1. one approved document collection;
2. document parsing and indexing;
3. permission-aware retrieval;
4. an answer with source references;
5. feedback and escalation;
6. regular content review.

Websiteli's [AI assistant services](/en/services/ai-assistants/) and [business automation services](/en/services/business-automation/) can support this type of controlled implementation. Broader options are available on the [services and pricing page](/en/services-pricing/), and a specific use case can be discussed through the [contact page](/en/contact/).

## How to measure value

Measure the defined task rather than the novelty of the interface. Useful indicators include whether employees find the correct source, how often answers are supported, how many questions require escalation, whether access controls work, how much maintenance the content requires and whether the task becomes faster or more consistent.

## When simpler search is enough

Do not build a RAG assistant when the document collection is tiny, keywords already work well, information is outdated or nobody owns the source content.

A clear folder structure, better naming and a simple search page may solve the problem with less cost and risk.

## The practical decision

Use retrieval-based AI when employees repeatedly need answers across a controlled body of information and ordinary search does not provide enough context.

Start narrow, preserve permissions, show sources and keep a person responsible for the knowledge base.`,
  }),
  de: makeTranslation("de", {
    title: "KI-Dokumentensuche für KMU: Ein praxisnaher RAG-Leitfaden",
    description: "So nutzen KMU eine KI-Dokumentensuche mit freigegebenen Quellen, Berechtigungen, Quellenangaben und menschlicher Prüfung.",
    category: "KI-Automation",
    readingTime: "10 Min. Lesezeit",
    audience: "Schweizer und europäische KMU, die eine interne KI-Suche prüfen",
    excerpt: "Praxisleitfaden zu KI-Dokumentensuche, Retrieval-Augmented Generation, Berechtigungen, Quellenangaben, Risiken und einem sinnvollen ersten Projekt.",
    summary: [
      "Eine KI-Dokumentensuche findet zuerst relevante Passagen in freigegebenen Quellen und erstellt danach eine Antwort.",
      "Retrieval-Augmented Generation ist bei häufig aktualisierten Unternehmensinformationen oft praktischer als ein Modelltraining.",
      "Berechtigungen, Quellenangaben, klare Verantwortlichkeiten und menschliche Eskalation gehören zur Grundarchitektur.",
      "Ein enger erster Anwendungsfall lässt sich besser testen und pflegen als ein unternehmensweiter Assistent.",
    ],
    keyTakeaways: [
      "Mit einer Dokumentensammlung und einer häufigen Mitarbeiterfrage beginnen.",
      "Die Zugriffsrechte der ursprünglichen Systeme beibehalten.",
      "Bei geschäftlich relevanten Antworten Quellenlinks verlangen.",
      "Nützlichkeit, unbelegte Antworten und Pflegeaufwand messen.",
    ],
    faqs: [
      { question: "Was ist RAG?", answer: "Retrieval-Augmented Generation ist ein Ansatz, bei dem ein System relevante Informationen aus freigegebenen Quellen abruft und sie einem Sprachmodell vor der Antwort als Kontext bereitstellt." },
      { question: "Ist RAG dasselbe wie Modelltraining?", answer: "Nein. RAG ruft aktuelle Informationen zum Anfragezeitpunkt ab. Ein Modelltraining verändert das Verhalten des Modells und ist für ein erstes internes Suchprojekt meist nicht nötig." },
      { question: "Darf ein KI-Assistent auf alle Firmendokumente zugreifen?", answer: "Nein. Der Zugriff sollte den bestehenden Berechtigungen, der Datensensibilität und einem klar freigegebenen Umfang folgen." },
      { question: "Wie sollten KMU starten?", answer: "Mit einer stabilen Dokumentensammlung, einer kleinen Nutzergruppe, verpflichtenden Quellenangaben und einer Prüfung unbeantworteter oder unsicherer Fragen." },
    ],
    body: `## Was eine KI-Dokumentensuche tatsächlich macht

Eine KI-Dokumentensuche ermöglicht Mitarbeitenden, Fragen in natürlicher Sprache zu stellen und Antworten auf Basis freigegebener Unternehmensquellen zu erhalten. Ein verlässliches System nutzt nicht nur das allgemeine Wissen eines Modells. Es sucht zuerst relevante Textstellen und formuliert die Antwort danach auf dieser Grundlage.

Dieses Muster wird häufig Retrieval-Augmented Generation oder RAG genannt.

## RAG im Vergleich zum Modelltraining

Viele KMU gehen davon aus, dass ein Modell mit den eigenen Dokumenten trainiert werden muss. In vielen Fällen ist das nicht notwendig.

Bei RAG bleiben die Dokumente in einer kontrollierten Wissensquelle. Für jede Anfrage werden passende Abschnitte abgerufen und als Kontext verwendet. Ändert sich eine Richtlinie oder Leistungsbeschreibung, kann die Quelle aktualisiert werden, ohne ein Modell neu zu trainieren.

Modelltraining kann für spezielle Verhaltensweisen oder Klassifikationen sinnvoll sein, ist aber nicht die Standardlösung für Dokumentensuche.

## Gute erste Anwendungsfälle

Ein sinnvoller Einstieg konzentriert sich auf eine wiederkehrende Aufgabe:

- den aktuellen internen Prozess finden;
- eine freigegebene Leistungsbeschreibung abrufen;
- eine Richtlinie für Mitarbeitende zusammenfassen;
- Angaben aus einer kleinen Dokumentensammlung vergleichen;
- einen ersten Entwurf mit Quellenlinks vorbereiten.

Die erste Version sollte keine Datensätze ändern, Nachrichten versenden oder Geschäftsaktionen automatisch auslösen.

## Berechtigungen und Datenschutz

Ein interner Assistent muss die Zugriffsrechte der ursprünglichen Systeme respektieren. Nutzer dürfen keine Dokumente oder Passagen erhalten, die sie direkt nicht öffnen könnten.

Definiert werden sollten die einbezogenen Ablagen, ausgeschlossene sensible Bereiche, zugelassene Nutzergruppen, die Behandlung vertraulicher Daten, die Protokollierung und die Verantwortung für Aktualisierungen.

Für Schweizer und europäische Unternehmen hängen Datenschutzpflichten von Daten, Zweck, Anbietern und Verträgen ab. Eine technische Lösung ersetzt keine Governance oder rechtliche Prüfung.

## Quellenangaben und menschliche Kontrolle

Wichtige Antworten sollten zeigen, woher die Information stammt. Dateiname, Abschnitt, Seite oder direkter Link ermöglichen eine schnelle Überprüfung.

Wenn keine ausreichende Grundlage gefunden wird, muss der Assistent dies klar sagen. Unsicherheit darf nicht durch selbstbewusste Formulierungen verdeckt werden.

> [!BEST PRACTICE] Eine unbelegte Antwort ist ein zu prüfender Prozessfehler und kein Grund, die Unsicherheit der Quelle zu verbergen.

## Eine sinnvolle erste Architektur

Ein kleines erstes System kann aus einer freigegebenen Dokumentensammlung, Dokumentenaufbereitung, berechtigungsabhängiger Suche, Antworten mit Quellenverweisen, Feedback und regelmässiger Inhaltsprüfung bestehen.

Websitelis [KI-Assistenten](/en/services/ai-assistants/) und [Business-Automation](/en/services/business-automation/) können eine kontrollierte Umsetzung unterstützen. Weitere Optionen finden Sie auf der [Seite Leistungen und Preise](/en/services-pricing/). Ein konkreter Anwendungsfall kann über die [Kontaktseite](/en/contact/) besprochen werden.

## Erfolg sinnvoll messen

Sinnvolle Kennzahlen sind, ob Mitarbeitende die richtige Quelle finden, wie häufig Antworten belegt sind, wie viele Fragen eskaliert werden, ob Berechtigungen korrekt funktionieren und welcher Pflegeaufwand entsteht.

## Wann eine einfachere Suche genügt

Ein RAG-Assistent ist unnötig, wenn die Dokumentensammlung sehr klein ist, Stichwortsuche gut funktioniert, Inhalte veraltet sind oder niemand die Quellen verantwortet.

Eine klare Ordnerstruktur, bessere Dateinamen und eine einfache Suchseite können das Problem günstiger und risikoärmer lösen.

## Die praktische Entscheidung

Retrieval-basierte KI ist sinnvoll, wenn Mitarbeitende wiederholt Antworten aus einem kontrollierten Informationsbestand benötigen und klassische Suche zu wenig Kontext liefert.

Beginnen Sie eng, erhalten Sie Berechtigungen, zeigen Sie Quellen und benennen Sie eine verantwortliche Person für die Wissensbasis.`,
  }),
  hu: makeTranslation("hu", {
    title: "AI-alapú dokumentumkeresés kisvállalkozásoknak: gyakorlati RAG-útmutató",
    description: "Gyakorlati útmutató jóváhagyott forrásokra, jogosultságokra, hivatkozásokra és emberi ellenőrzésre épülő AI-dokumentumkereséshez.",
    category: "AI-automatizálás",
    readingTime: "8 perc olvasás",
    audience: "Belső AI-keresést mérlegelő svájci és európai kisvállalkozások",
    excerpt: "Hogyan épül fel egy kontrollált AI-dokumentumkereső, mikor hasznos a RAG, és mikor elég egy egyszerűbb keresés.",
    summary: ["A rendszer jóváhagyott dokumentumokból keres releváns részleteket a válasz előtt.", "A RAG gyakran praktikusabb a változó céges tudás kezelésére, mint a modell tanítása.", "A jogosultságok és a forráshivatkozások alapkövetelmények.", "Érdemes egy szűk, mérhető feladattal kezdeni."],
    keyTakeaways: ["Egy dokumentumgyűjteménnyel indulj.", "Őrizd meg az eredeti hozzáférési jogokat.", "Kérj forrást minden fontos válaszhoz.", "Mérd a hasznosságot és a hibákat."],
    faqs: [
      { question: "Mi a RAG?", answer: "Olyan megközelítés, amely a válasz előtt releváns információt keres jóváhagyott forrásokban, majd ezt adja kontextusként a nyelvi modellnek." },
      { question: "Ugyanaz, mint a modell tanítása?", answer: "Nem. A RAG kéréskor keres aktuális információt, míg a tanítás a modell viselkedését módosítja." },
      { question: "Minden céges dokumentumhoz hozzáférhet?", answer: "Nem. A hozzáférésnek a meglévő jogosultságokat és az engedélyezett hatókört kell követnie." },
      { question: "Hogyan érdemes kezdeni?", answer: "Egy stabil dokumentumkészlettel, kevés felhasználóval, kötelező forráshivatkozással és emberi ellenőrzéssel." },
    ],
    body: `## Mit csinál az AI-dokumentumkeresés?

A munkatársak természetes nyelven kérdezhetnek, a rendszer pedig jóváhagyott céges forrásokból keres választ. Először releváns részleteket talál, majd ezek alapján fogalmaz.

## RAG vagy modell-tanítás?

A RAG kéréskor keresi ki az aktuális információt. Ez általában könnyebben frissíthető, mint egy modell újratanítása, amikor változik egy folyamat vagy szolgáltatásleírás.

## Jó első feladatok

Érdemes egy ismétlődő feladattal kezdeni: aktuális folyamat megtalálása, szabályzat összefoglalása, jóváhagyott szolgáltatásleírás keresése vagy forrással ellátott első vázlat készítése.

## Jogosultságok és adatvédelem

A rendszer nem mutathat olyan dokumentumot, amelyhez a felhasználó eredetileg sem férne hozzá. Előre meg kell határozni a forrásokat, a kizárt mappákat, a felhasználókat, a naplózást és a tartalomgazdát.

## Források és emberi ellenőrzés

A fontos válaszoknál jelenjen meg fájlnév, oldal, szakasz vagy link. Ha nincs elég bizonyíték, a rendszer mondja ki egyértelműen.

## Gyakorlati első verzió

Egy első megoldás tartalmazhat egy jóváhagyott dokumentumkészletet, jogosultság-alapú keresést, forrásos válaszokat, visszajelzést és rendszeres tartalomellenőrzést. A [Websiteli AI-asszisztens szolgáltatásai](/en/services/ai-assistants/), az [üzleti automatizálás](/en/services/business-automation/) és a [kapcsolatfelvétel](/en/contact/) segíthetnek a tervezésben.

## Mikor elég az egyszerű keresés?

Ha kevés dokumentum van, a kulcsszavas keresés jól működik vagy a tartalom elavult, előbb a mappastruktúrát és a tartalomgazdákat érdemes rendbe tenni.`,
  }),
  pl: makeTranslation("pl", {
    title: "Wyszukiwanie dokumentów z AI dla małych firm: praktyczny przewodnik RAG",
    description: "Jak zbudować wyszukiwanie dokumentów oparte na zatwierdzonych źródłach, uprawnieniach, cytowaniach i kontroli człowieka.",
    category: "Automatyzacja AI",
    readingTime: "8 min czytania",
    audience: "Małe firmy w Szwajcarii i Europie rozważające wewnętrzne wyszukiwanie AI",
    excerpt: "Praktyczne wyjaśnienie RAG, uprawnień, cytowań źródeł, ryzyk i rozsądnego pierwszego wdrożenia.",
    summary: ["System najpierw wyszukuje odpowiednie fragmenty w zatwierdzonych źródłach.", "RAG ułatwia aktualizację zmiennej wiedzy firmowej.", "Uprawnienia i cytowania są podstawą bezpiecznego rozwiązania.", "Najlepiej zacząć od jednego wąskiego zadania."],
    keyTakeaways: ["Zacznij od jednego zbioru dokumentów.", "Zachowaj istniejące prawa dostępu.", "Wymagaj źródeł przy ważnych odpowiedziach.", "Mierz użyteczność i błędy."],
    faqs: [
      { question: "Co to jest RAG?", answer: "To podejście, w którym system wyszukuje informacje w zatwierdzonych źródłach i przekazuje je modelowi jako kontekst przed odpowiedzią." },
      { question: "Czy RAG to trenowanie modelu?", answer: "Nie. RAG pobiera aktualne informacje w chwili zapytania, a trening zmienia zachowanie modelu." },
      { question: "Czy asystent może czytać wszystkie dokumenty?", answer: "Nie. Dostęp powinien odzwierciedlać istniejące uprawnienia i zatwierdzony zakres." },
      { question: "Jak zacząć?", answer: "Od stabilnego zbioru dokumentów, małej grupy użytkowników, obowiązkowych cytowań i przeglądu niepewnych odpowiedzi." },
    ],
    body: `## Jak działa wyszukiwanie dokumentów z AI

Pracownicy zadają pytania naturalnym językiem, a system wyszukuje odpowiednie fragmenty w zatwierdzonych źródłach. Dopiero potem przygotowuje odpowiedź.

## RAG a trenowanie modelu

RAG pobiera informacje podczas zapytania, dlatego aktualizacja polityki lub opisu usługi nie wymaga ponownego trenowania modelu.

## Dobry pierwszy przypadek użycia

Warto zacząć od powtarzalnego zadania: znalezienia aktualnej procedury, podsumowania polityki, porównania zatwierdzonych dokumentów lub przygotowania szkicu ze źródłami.

## Uprawnienia i prywatność

Użytkownik nie powinien otrzymać dokumentu, do którego nie ma dostępu w systemie źródłowym. Trzeba określić repozytoria, wykluczenia, użytkowników, logowanie i właściciela treści.

## Cytowania i kontrola człowieka

Ważne odpowiedzi powinny wskazywać plik, sekcję, stronę lub link. Brak wystarczających danych powinien być jasno komunikowany.

## Rozsądna pierwsza wersja

Pierwszy system może obejmować jeden zatwierdzony zbiór dokumentów, wyszukiwanie zgodne z uprawnieniami, odpowiedzi ze źródłami, feedback i regularny przegląd. Zobacz [usługi asystentów AI](/en/services/ai-assistants/), [automatyzację biznesową](/en/services/business-automation/) i [kontakt](/en/contact/).

## Kiedy wystarczy zwykłe wyszukiwanie

Jeśli dokumentów jest mało, słowa kluczowe działają dobrze albo treści są nieaktualne, najpierw uporządkuj źródła i odpowiedzialność za ich utrzymanie.`,
  }),
  es: makeTranslation("es", {
    title: "Búsqueda de documentos con IA para pequeñas empresas: guía práctica de RAG",
    description: "Cómo usar fuentes aprobadas, permisos, citas y revisión humana en un sistema interno de búsqueda documental con IA.",
    category: "Automatización con IA",
    readingTime: "8 min de lectura",
    audience: "Pequeñas empresas suizas y europeas que evalúan una búsqueda interna con IA",
    excerpt: "Guía práctica sobre RAG, permisos, citas de fuentes, riesgos y una primera implementación sensata.",
    summary: ["El sistema recupera fragmentos relevantes de fuentes aprobadas antes de responder.", "RAG facilita mantener información empresarial cambiante.", "Los permisos y las citas son requisitos básicos.", "Conviene empezar con un caso de uso limitado."],
    keyTakeaways: ["Empieza con una colección documental.", "Conserva los permisos existentes.", "Exige fuentes para respuestas importantes.", "Mide utilidad y errores."],
    faqs: [
      { question: "¿Qué es RAG?", answer: "Es un enfoque que recupera información relevante de fuentes aprobadas y la entrega al modelo como contexto antes de responder." },
      { question: "¿Es lo mismo que entrenar un modelo?", answer: "No. RAG consulta información actual en cada petición; el entrenamiento modifica el comportamiento del modelo." },
      { question: "¿Puede acceder a todos los documentos?", answer: "No. Debe respetar permisos existentes, sensibilidad de datos y un alcance aprobado." },
      { question: "¿Cómo empezar?", answer: "Con un conjunto estable de documentos, pocos usuarios, citas obligatorias y revisión de respuestas inciertas." },
    ],
    body: `## Qué hace la búsqueda documental con IA

Los empleados preguntan en lenguaje natural y el sistema busca fragmentos relevantes en fuentes empresariales aprobadas antes de redactar una respuesta.

## RAG frente a entrenamiento

RAG recupera información en el momento de la consulta. Una política actualizada puede sustituirse en la fuente sin volver a entrenar un modelo.

## Primeros casos de uso

Empieza con una tarea repetitiva: localizar el proceso vigente, resumir una política, comparar documentos aprobados o preparar un borrador con enlaces a las fuentes.

## Permisos y privacidad

Un usuario no debe recibir contenido que no podría abrir en el sistema original. Define repositorios incluidos, exclusiones, usuarios, registros y responsables de actualización.

## Citas y revisión humana

Las respuestas importantes deben mostrar archivo, sección, página o enlace. Si faltan pruebas, el asistente debe decirlo claramente.

## Una primera versión razonable

Puede incluir una colección aprobada, indexación, recuperación según permisos, respuestas con fuentes, feedback y revisión periódica. Consulta los [servicios de asistentes de IA](/en/services/ai-assistants/), la [automatización empresarial](/en/services/business-automation/) y la [página de contacto](/en/contact/).

## Cuándo basta una búsqueda simple

Si hay pocos documentos, las palabras clave funcionan o nadie mantiene el contenido, primero mejora la estructura y la propiedad de la información.`,
  }),
  fr: makeTranslation("fr", {
    title: "Recherche documentaire par IA pour les petites entreprises : guide pratique du RAG",
    description: "Comment utiliser des sources approuvées, des droits d'accès, des citations et une validation humaine pour la recherche documentaire interne.",
    category: "Automatisation IA",
    readingTime: "8 min de lecture",
    audience: "Petites entreprises suisses et européennes évaluant une recherche interne par IA",
    excerpt: "Guide pratique du RAG, des permissions, des citations, des risques et d'un premier déploiement raisonnable.",
    summary: ["Le système retrouve des passages pertinents dans des sources approuvées avant de répondre.", "Le RAG simplifie la mise à jour des connaissances d'entreprise.", "Les droits d'accès et les citations sont essentiels.", "Il faut commencer par un cas d'usage limité."],
    keyTakeaways: ["Commencez par une collection documentaire.", "Conservez les droits d'accès existants.", "Exigez des sources pour les réponses importantes.", "Mesurez l'utilité et les erreurs."],
    faqs: [
      { question: "Qu'est-ce que le RAG ?", answer: "C'est une approche qui récupère des informations pertinentes dans des sources approuvées et les fournit au modèle comme contexte avant sa réponse." },
      { question: "Est-ce un entraînement du modèle ?", answer: "Non. Le RAG récupère des informations actuelles à chaque demande, tandis que l'entraînement modifie le comportement du modèle." },
      { question: "L'assistant peut-il lire tous les documents ?", answer: "Non. L'accès doit suivre les permissions existantes, la sensibilité des données et un périmètre approuvé." },
      { question: "Comment commencer ?", answer: "Avec un ensemble stable de documents, peu d'utilisateurs, des citations obligatoires et la revue des réponses incertaines." },
    ],
    body: `## Ce que fait la recherche documentaire par IA

Les collaborateurs posent une question en langage naturel. Le système recherche d'abord des passages pertinents dans des sources approuvées, puis prépare sa réponse.

## RAG ou entraînement du modèle

Le RAG récupère l'information au moment de la demande. Une procédure modifiée peut être mise à jour dans la source sans réentraîner un modèle.

## Bons premiers cas d'usage

Commencez par une tâche répétitive : trouver la procédure actuelle, résumer une politique, comparer des documents approuvés ou préparer un brouillon avec ses sources.

## Permissions et confidentialité

L'utilisateur ne doit pas recevoir un document auquel il n'aurait pas accès dans le système d'origine. Définissez les dépôts, exclusions, utilisateurs, journaux et responsables du contenu.

## Citations et validation humaine

Les réponses importantes doivent indiquer le fichier, la section, la page ou le lien. L'absence de preuve suffisante doit être signalée clairement.

## Une première version raisonnable

Elle peut réunir une collection approuvée, l'indexation, une recherche respectant les droits, des réponses sourcées, du feedback et une revue régulière. Consultez les [services d'assistants IA](/en/services/ai-assistants/), l'[automatisation métier](/en/services/business-automation/) et la [page contact](/en/contact/).

## Quand une recherche simple suffit

Si les documents sont peu nombreux, si les mots-clés fonctionnent ou si personne ne maintient le contenu, commencez par organiser les sources.`,
  }),
  it: makeTranslation("it", {
    title: "Ricerca documentale con IA per piccole imprese: guida pratica al RAG",
    description: "Come usare fonti approvate, permessi, citazioni e revisione umana in un sistema interno di ricerca documentale con IA.",
    category: "Automazione IA",
    readingTime: "8 min di lettura",
    audience: "Piccole imprese svizzere ed europee che valutano una ricerca interna con IA",
    excerpt: "Guida pratica a RAG, autorizzazioni, citazioni, rischi e a una prima implementazione sensata.",
    summary: ["Il sistema recupera passaggi pertinenti da fonti approvate prima di rispondere.", "RAG semplifica l'aggiornamento delle conoscenze aziendali.", "Permessi e citazioni sono requisiti fondamentali.", "È meglio iniziare con un caso d'uso ristretto."],
    keyTakeaways: ["Inizia con una raccolta di documenti.", "Mantieni i permessi esistenti.", "Richiedi fonti per le risposte importanti.", "Misura utilità ed errori."],
    faqs: [
      { question: "Che cos'è RAG?", answer: "È un approccio che recupera informazioni da fonti approvate e le fornisce al modello come contesto prima della risposta." },
      { question: "È uguale ad addestrare un modello?", answer: "No. RAG recupera informazioni aggiornate durante la richiesta; l'addestramento modifica il comportamento del modello." },
      { question: "Può accedere a tutti i documenti?", answer: "No. Deve rispettare permessi esistenti, sensibilità dei dati e ambito approvato." },
      { question: "Come iniziare?", answer: "Con documenti stabili, pochi utenti, citazioni obbligatorie e revisione delle risposte incerte." },
    ],
    body: `## Come funziona la ricerca documentale con IA

I dipendenti fanno domande in linguaggio naturale e il sistema cerca passaggi pertinenti nelle fonti aziendali approvate prima di preparare la risposta.

## RAG e addestramento

RAG recupera informazioni al momento della richiesta. Una procedura aggiornata può essere sostituita nella fonte senza riaddestrare il modello.

## Primi casi d'uso

Inizia da un'attività ripetitiva: trovare il processo corrente, riassumere una policy, confrontare documenti approvati o preparare una bozza con fonti.

## Permessi e privacy

Un utente non deve ricevere contenuti che non potrebbe aprire nel sistema originale. Definisci archivi, esclusioni, utenti, registri e responsabilità di aggiornamento.

## Citazioni e revisione umana

Le risposte importanti devono mostrare file, sezione, pagina o link. Se le prove non bastano, il sistema deve dichiararlo.

## Una prima versione sensata

Può includere una raccolta approvata, indicizzazione, recupero basato sui permessi, risposte con fonti, feedback e revisione periodica. Vedi [assistenti IA](/en/services/ai-assistants/), [automazione aziendale](/en/services/business-automation/) e [contatti](/en/contact/).

## Quando basta una ricerca semplice

Se i documenti sono pochi, le parole chiave funzionano o nessuno mantiene i contenuti, prima migliora l'organizzazione delle fonti.`,
  }),
  cz: makeTranslation("cz", {
    title: "AI vyhledávání v dokumentech pro malé firmy: praktický průvodce RAG",
    description: "Jak využít schválené zdroje, oprávnění, citace a lidskou kontrolu při interním AI vyhledávání v dokumentech.",
    category: "AI automatizace",
    readingTime: "8 min čtení",
    audience: "Švýcarské a evropské malé firmy zvažující interní AI vyhledávání",
    excerpt: "Praktický průvodce RAG, oprávněními, citacemi zdrojů, riziky a rozumnou první implementací.",
    summary: ["Systém před odpovědí vyhledá relevantní části schválených zdrojů.", "RAG usnadňuje aktualizaci měnících se firemních informací.", "Oprávnění a citace jsou základní požadavky.", "Začněte jedním úzkým případem použití."],
    keyTakeaways: ["Začněte jednou sbírkou dokumentů.", "Zachovejte původní přístupová práva.", "U důležitých odpovědí vyžadujte zdroje.", "Měřte užitečnost a chyby."],
    faqs: [
      { question: "Co je RAG?", answer: "Je to přístup, který vyhledá informace ve schválených zdrojích a předá je modelu jako kontext před odpovědí." },
      { question: "Je RAG trénování modelu?", answer: "Ne. RAG získává aktuální informace při dotazu, zatímco trénování mění chování modelu." },
      { question: "Může asistent číst všechny dokumenty?", answer: "Ne. Přístup musí odpovídat existujícím oprávněním a schválenému rozsahu." },
      { question: "Jak začít?", answer: "Stabilní sadou dokumentů, malou skupinou uživatelů, povinnými citacemi a kontrolou nejistých odpovědí." },
    ],
    body: `## Jak AI vyhledávání v dokumentech funguje

Zaměstnanci položí otázku běžným jazykem a systém nejprve vyhledá relevantní pasáže ve schválených zdrojích. Až potom připraví odpověď.

## RAG a trénování modelu

RAG získává informace při každém dotazu. Aktualizovaný proces lze změnit ve zdroji bez opětovného trénování modelu.

## Dobré první použití

Začněte opakovaným úkolem: nalezením aktuálního postupu, shrnutím směrnice, porovnáním schválených dokumentů nebo návrhem se zdroji.

## Oprávnění a soukromí

Uživatel nesmí získat dokument, který by nemohl otevřít v původním systému. Určete zdroje, výjimky, uživatele, protokoly a vlastníka obsahu.

## Citace a lidská kontrola

Důležité odpovědi mají uvádět soubor, sekci, stránku nebo odkaz. Nedostatek důkazů musí být jasně přiznán.

## Rozumná první verze

Může obsahovat jednu schválenou sbírku, indexaci, vyhledávání podle oprávnění, odpovědi se zdroji, zpětnou vazbu a pravidelnou kontrolu. Viz [AI asistenti](/en/services/ai-assistants/), [firemní automatizace](/en/services/business-automation/) a [kontakt](/en/contact/).

## Kdy stačí běžné vyhledávání

Pokud je dokumentů málo, klíčová slova fungují nebo obsah nikdo nespravuje, nejprve zlepšete organizaci zdrojů.`,
  }),
  sk: makeTranslation("sk", {
    title: "AI vyhľadávanie v dokumentoch pre malé firmy: praktický sprievodca RAG",
    description: "Ako použiť schválené zdroje, oprávnenia, citácie a ľudskú kontrolu pri internom AI vyhľadávaní.",
    category: "AI automatizácia",
    readingTime: "8 min čítania",
    audience: "Švajčiarske a európske malé firmy zvažujúce interné AI vyhľadávanie",
    excerpt: "Praktický sprievodca RAG, oprávneniami, citáciami zdrojov, rizikami a rozumnou prvou implementáciou.",
    summary: ["Systém pred odpoveďou vyhľadá relevantné časti schválených zdrojov.", "RAG uľahčuje aktualizáciu meniacich sa firemných informácií.", "Oprávnenia a citácie sú základné požiadavky.", "Začnite jedným úzkym prípadom použitia."],
    keyTakeaways: ["Začnite jednou zbierkou dokumentov.", "Zachovajte pôvodné prístupové práva.", "Pri dôležitých odpovediach vyžadujte zdroje.", "Merajte užitočnosť a chyby."],
    faqs: [
      { question: "Čo je RAG?", answer: "Je to prístup, ktorý vyhľadá informácie v schválených zdrojoch a poskytne ich modelu ako kontext pred odpoveďou." },
      { question: "Je RAG trénovanie modelu?", answer: "Nie. RAG získava aktuálne informácie pri otázke, zatiaľ čo trénovanie mení správanie modelu." },
      { question: "Môže asistent čítať všetky dokumenty?", answer: "Nie. Prístup musí zodpovedať existujúcim oprávneniam a schválenému rozsahu." },
      { question: "Ako začať?", answer: "Stabilnou sadou dokumentov, malou skupinou používateľov, povinnými citáciami a kontrolou neistých odpovedí." },
    ],
    body: `## Ako AI vyhľadávanie v dokumentoch funguje

Zamestnanci položia otázku prirodzeným jazykom a systém najprv vyhľadá relevantné pasáže v schválených zdrojoch. Potom pripraví odpoveď.

## RAG a trénovanie modelu

RAG získava informácie pri každej otázke. Aktualizovaný postup možno zmeniť v zdroji bez opätovného trénovania modelu.

## Dobré prvé použitie

Začnite opakovanou úlohou: nájdením aktuálneho procesu, zhrnutím smernice, porovnaním dokumentov alebo návrhom s odkazmi na zdroje.

## Oprávnenia a súkromie

Používateľ nesmie dostať dokument, ktorý by nemohol otvoriť v pôvodnom systéme. Určite zdroje, výnimky, používateľov, záznamy a vlastníka obsahu.

## Citácie a ľudská kontrola

Dôležité odpovede majú uvádzať súbor, sekciu, stranu alebo odkaz. Nedostatok dôkazov musí byť jasne priznaný.

## Rozumná prvá verzia

Môže obsahovať jednu schválenú zbierku, indexovanie, vyhľadávanie podľa oprávnení, odpovede so zdrojmi, spätnú väzbu a pravidelnú kontrolu. Pozrite si [AI asistentov](/en/services/ai-assistants/), [firemnú automatizáciu](/en/services/business-automation/) a [kontakt](/en/contact/).

## Kedy stačí bežné vyhľadávanie

Ak je dokumentov málo, kľúčové slová fungujú alebo obsah nikto nespravuje, najprv zlepšite organizáciu zdrojov.`,
  }),
  pt: makeTranslation("pt", {
    title: "Pesquisa de documentos com IA para pequenas empresas: guia prático de RAG",
    description: "Como usar fontes aprovadas, permissões, citações e revisão humana numa pesquisa documental interna com IA.",
    category: "Automação com IA",
    readingTime: "8 min de leitura",
    audience: "Pequenas empresas suíças e europeias que avaliam pesquisa interna com IA",
    excerpt: "Guia prático sobre RAG, permissões, citações, riscos e uma primeira implementação sensata.",
    summary: ["O sistema recupera passagens relevantes de fontes aprovadas antes de responder.", "RAG facilita a atualização de conhecimento empresarial variável.", "Permissões e citações são requisitos fundamentais.", "É melhor começar com um caso de uso limitado."],
    keyTakeaways: ["Começa com uma coleção documental.", "Mantém as permissões existentes.", "Exige fontes nas respostas importantes.", "Mede utilidade e erros."],
    faqs: [
      { question: "O que é RAG?", answer: "É uma abordagem que recupera informação relevante de fontes aprovadas e a fornece ao modelo como contexto antes da resposta." },
      { question: "É o mesmo que treinar um modelo?", answer: "Não. RAG consulta informação atual a cada pedido; o treino altera o comportamento do modelo." },
      { question: "Pode aceder a todos os documentos?", answer: "Não. Deve respeitar permissões existentes, sensibilidade dos dados e âmbito aprovado." },
      { question: "Como começar?", answer: "Com documentos estáveis, poucos utilizadores, citações obrigatórias e revisão de respostas incertas." },
    ],
    body: `## Como funciona a pesquisa documental com IA

Os colaboradores fazem perguntas em linguagem natural e o sistema procura primeiro passagens relevantes em fontes empresariais aprovadas.

## RAG e treino do modelo

RAG recupera informação no momento do pedido. Uma política atualizada pode ser substituída na fonte sem voltar a treinar um modelo.

## Bons primeiros casos de uso

Começa por uma tarefa repetitiva: encontrar o processo atual, resumir uma política, comparar documentos aprovados ou preparar um rascunho com fontes.

## Permissões e privacidade

O utilizador não deve receber conteúdo que não poderia abrir no sistema original. Define repositórios, exclusões, utilizadores, registos e responsabilidade de atualização.

## Citações e revisão humana

Respostas importantes devem mostrar ficheiro, secção, página ou ligação. Se faltarem provas, o sistema deve indicá-lo claramente.

## Uma primeira versão sensata

Pode incluir uma coleção aprovada, indexação, recuperação baseada em permissões, respostas com fontes, feedback e revisão regular. Consulta [assistentes de IA](/en/services/ai-assistants/), [automação empresarial](/en/services/business-automation/) e [contacto](/en/contact/).

## Quando uma pesquisa simples basta

Se há poucos documentos, palavras-chave funcionam ou ninguém mantém o conteúdo, melhora primeiro a organização das fontes.`,
  }),
  da: makeTranslation("da", {
    title: "AI-dokumentsøgning for små virksomheder: en praktisk RAG-guide",
    description: "Sådan bruger små virksomheder godkendte kilder, adgangsrettigheder, kildehenvisninger og menneskelig kontrol i intern AI-søgning.",
    category: "AI-automatisering",
    readingTime: "8 min. læsning",
    audience: "Schweiziske og europæiske små virksomheder, der overvejer intern AI-søgning",
    excerpt: "Praktisk guide til RAG, adgangsrettigheder, kilder, risici og en fornuftig første implementering.",
    summary: ["Systemet finder relevante passager i godkendte kilder før svaret.", "RAG gør skiftende virksomhedsviden lettere at opdatere.", "Adgangsrettigheder og kildehenvisninger er grundkrav.", "Start med ét afgrænset brugsscenarie."],
    keyTakeaways: ["Start med én dokumentsamling.", "Bevar eksisterende adgangsrettigheder.", "Kræv kilder til vigtige svar.", "Mål nytte og fejl."],
    faqs: [
      { question: "Hvad er RAG?", answer: "Det er en metode, hvor systemet henter relevant information fra godkendte kilder og giver den til modellen som kontekst før svaret." },
      { question: "Er RAG det samme som modeltræning?", answer: "Nej. RAG henter aktuelle oplysninger ved hver forespørgsel, mens træning ændrer modellens adfærd." },
      { question: "Må assistenten læse alle dokumenter?", answer: "Nej. Adgangen skal følge eksisterende rettigheder og et godkendt omfang." },
      { question: "Hvordan starter man?", answer: "Med et stabilt dokumentsæt, få brugere, obligatoriske kilder og gennemgang af usikre svar." },
    ],
    body: `## Sådan virker AI-dokumentsøgning

Medarbejdere stiller spørgsmål i naturligt sprog, og systemet finder først relevante passager i godkendte virksomhedskilder.

## RAG og modeltræning

RAG henter information ved forespørgslen. En opdateret proces kan ændres i kilden uden at træne modellen igen.

## Gode første opgaver

Start med en gentagen opgave: find den aktuelle proces, opsummer en politik, sammenlign godkendte dokumenter eller lav et udkast med kilder.

## Adgang og privatliv

En bruger må ikke få dokumenter, som vedkommende ikke kunne åbne i det oprindelige system. Definér kilder, undtagelser, brugere, logning og indholdsansvar.

## Kilder og menneskelig kontrol

Vigtige svar bør vise fil, afsnit, side eller link. Manglende dokumentation skal fremgå tydeligt.

## En fornuftig første version

Den kan omfatte én godkendt samling, indeksering, rettighedsbaseret søgning, svar med kilder, feedback og regelmæssig gennemgang. Se [AI-assistenter](/en/services/ai-assistants/), [virksomhedsautomatisering](/en/services/business-automation/) og [kontakt](/en/contact/).

## Hvornår almindelig søgning er nok

Hvis der er få dokumenter, nøgleord virker, eller ingen vedligeholder indholdet, bør kilderne organiseres først.`,
  }),
  nl: makeTranslation("nl", {
    title: "AI-documentzoeken voor kleine bedrijven: een praktische RAG-gids",
    description: "Zo gebruikt een klein bedrijf goedgekeurde bronnen, rechten, bronverwijzingen en menselijke controle bij interne AI-documentzoekopdrachten.",
    category: "AI-automatisering",
    readingTime: "8 min. leestijd",
    audience: "Zwitserse en Europese kleine bedrijven die interne AI-zoekfuncties beoordelen",
    excerpt: "Praktische gids over RAG, toegangsrechten, bronverwijzingen, risico's en een verstandige eerste implementatie.",
    summary: ["Het systeem haalt relevante passages uit goedgekeurde bronnen voordat het antwoordt.", "RAG maakt veranderende bedrijfskennis eenvoudiger bij te werken.", "Rechten en bronverwijzingen zijn basisvoorwaarden.", "Begin met één afgebakende toepassing."],
    keyTakeaways: ["Start met één documentverzameling.", "Behoud bestaande toegangsrechten.", "Eis bronnen bij belangrijke antwoorden.", "Meet bruikbaarheid en fouten."],
    faqs: [
      { question: "Wat is RAG?", answer: "Een aanpak waarbij relevante informatie uit goedgekeurde bronnen wordt opgehaald en als context aan het model wordt gegeven vóór het antwoord." },
      { question: "Is RAG hetzelfde als modeltraining?", answer: "Nee. RAG haalt actuele informatie op bij elke vraag; training verandert het gedrag van het model." },
      { question: "Mag de assistent alle documenten lezen?", answer: "Nee. Toegang moet bestaande rechten en een goedgekeurd bereik volgen." },
      { question: "Hoe begin je?", answer: "Met een stabiele documentset, weinig gebruikers, verplichte bronnen en beoordeling van onzekere antwoorden." },
    ],
    body: `## Hoe AI-documentzoeken werkt

Medewerkers stellen vragen in gewone taal en het systeem zoekt eerst relevante passages in goedgekeurde bedrijfsbronnen.

## RAG en modeltraining

RAG haalt informatie op tijdens de vraag. Een gewijzigd proces kan in de bron worden bijgewerkt zonder het model opnieuw te trainen.

## Goede eerste toepassingen

Begin met een herhaalde taak: de actuele procedure vinden, een beleid samenvatten, documenten vergelijken of een concept met bronnen voorbereiden.

## Rechten en privacy

Een gebruiker mag geen document ontvangen dat hij in het oorspronkelijke systeem niet kan openen. Leg bronnen, uitzonderingen, gebruikers, logging en inhoudseigenaarschap vast.

## Bronnen en menselijke controle

Belangrijke antwoorden moeten bestand, sectie, pagina of link tonen. Onvoldoende bewijs moet duidelijk worden gemeld.

## Een verstandige eerste versie

Deze kan één goedgekeurde verzameling, indexering, zoeken op basis van rechten, antwoorden met bronnen, feedback en periodieke controle bevatten. Bekijk [AI-assistenten](/en/services/ai-assistants/), [bedrijfsautomatisering](/en/services/business-automation/) en [contact](/en/contact/).

## Wanneer gewone zoekfuncties genoeg zijn

Als er weinig documenten zijn, trefwoorden goed werken of niemand de inhoud beheert, organiseer dan eerst de bronnen.`,
  }),
  ja: makeTranslation("ja", {
    title: "中小企業向けAI文書検索：実践的なRAGガイド",
    description: "承認済み情報源、アクセス権、出典表示、人による確認を備えた社内AI文書検索の考え方を解説します。",
    category: "AI自動化",
    readingTime: "約8分",
    audience: "社内AI検索を検討するスイスおよび欧州の中小企業",
    excerpt: "RAG、権限管理、出典、リスク、現実的な初期導入をわかりやすく整理した実践ガイドです。",
    summary: ["回答前に承認済み情報源から関連箇所を検索します。", "RAGは変化する社内知識を更新しやすい方法です。", "権限管理と出典表示が基本要件です。", "最初は限定された用途から始めます。"],
    keyTakeaways: ["一つの文書群から始める。", "既存のアクセス権を維持する。", "重要な回答には出典を必須にする。", "有用性と誤りを測定する。"],
    faqs: [
      { question: "RAGとは何ですか？", answer: "承認済み情報源から関連情報を取得し、回答前に言語モデルへ文脈として渡す手法です。" },
      { question: "モデル学習と同じですか？", answer: "いいえ。RAGは質問時に最新情報を取得し、学習はモデルの振る舞いを変更します。" },
      { question: "すべての社内文書を読めますか？", answer: "読むべきではありません。既存権限、データ機密性、承認済み範囲に従います。" },
      { question: "どう始めるべきですか？", answer: "安定した文書群、少人数の利用者、必須の出典表示、不確かな回答の確認から始めます。" },
    ],
    body: `## AI文書検索の仕組み

従業員が自然な言葉で質問すると、システムは承認済みの社内情報源から関連箇所を検索し、その内容をもとに回答します。

## RAGとモデル学習

RAGは質問のたびに情報を取得します。手順やサービス説明が変わった場合も、情報源を更新すればよく、モデルを再学習する必要はありません。

## 最初に適した用途

最新手順の検索、規程の要約、承認済み文書の比較、出典付き下書きの作成など、繰り返し発生する一つの作業から始めます。

## 権限とプライバシー

元のシステムで閲覧できない文書を利用者に見せてはいけません。対象情報源、除外範囲、利用者、ログ、更新責任者を明確にします。

## 出典と人による確認

重要な回答にはファイル名、節、ページ、リンクを表示します。十分な根拠がない場合は、そのことを明確に伝える必要があります。

## 現実的な初期版

承認済み文書群、索引化、権限対応検索、出典付き回答、フィードバック、定期レビューで構成できます。[AIアシスタント](/en/services/ai-assistants/)、[業務自動化](/en/services/business-automation/)、[お問い合わせ](/en/contact/)もご覧ください。

## 通常の検索で十分な場合

文書が少ない、キーワード検索で十分、または情報の管理者がいない場合は、まず情報源の整理を優先します。`,
  }),
} satisfies Record<LocaleCode, BlogPostTranslation>;

export default {
  slug: "ai-document-search-small-business",
  title: translations.en.title,
  language: "en",
  published: true,
  publishDate: "2026-08-01",
  status: "published",
  description: translations.en.description,
  image: "/assets/swiss-ai-websites-hero.png",
  imageAlt: "Diagram-style illustration of secure AI document search connecting approved business documents to cited answers",
  author: "Websiteli",
  date: "2026-08-01",
  updated: "2026-08-01",
  translationFallback: false,
  tags: translations.en.tags,
  related: sharedRelated,
  translations,
} satisfies BlogPostSource;
