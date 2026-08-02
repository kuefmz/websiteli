import type { BlogPostSource, BlogPostTranslation } from "../types";
import type { LocaleCode } from "../../locales";

type LocalizedCopy = {
  title: string;
  description: string;
  category: string;
  readingTime: string;
  audience: string;
  excerpt: string;
  headings: [string, string, string, string, string, string];
  paragraphs: [string, string, string, string, string, string];
};

function makeTranslation(language: LocaleCode, copy: LocalizedCopy): BlogPostTranslation {
  const body = copy.headings
    .map((heading, index) => `## ${heading}\n\n${copy.paragraphs[index]}`)
    .join("\n\n");

  return {
    title: copy.title,
    description: copy.description,
    category: copy.category,
    tags: ["internal AI assistant", "AI assistant for small business", "private AI assistant", "AI for company documents"],
    language,
    readingTime: copy.readingTime,
    audience: copy.audience,
    excerpt: copy.excerpt,
    summary: [copy.excerpt, copy.paragraphs[0], copy.paragraphs[2], copy.paragraphs[4]],
    keyTakeaways: [
      "Start with one narrow and measurable workflow.",
      "Use approved-source retrieval before considering custom model training.",
      "Preserve existing access rights and escalate uncertain cases.",
      "Plan for testing, content ownership and maintenance.",
    ],
    chatGptPrompts: [
      "Help me choose a narrow first use case for an internal AI assistant.",
      "Create a permissions and source-governance checklist for an internal AI assistant.",
      "Compare RAG with model training for my company documents.",
    ],
    faqs: [
      { question: copy.headings[0], answer: copy.paragraphs[0] },
      { question: copy.headings[2], answer: copy.paragraphs[2] },
      { question: copy.headings[3], answer: copy.paragraphs[3] },
      { question: copy.headings[4], answer: copy.paragraphs[4] },
    ],
    body: `${body}\n\n[AI assistants](/en/services/ai-assistants/) · [Business automation](/en/services/business-automation/) · [Services and pricing](/en/services-pricing/) · [Contact](/en/contact/)`,
  };
}

const translations = {
  en: makeTranslation("en", {
    title: "Internal AI Assistant for Small Businesses: Use Cases, Costs and Risks",
    description: "A practical guide for Swiss and European small businesses evaluating a private internal AI assistant, including use cases, complexity, privacy, permissions and risks.",
    category: "AI Strategy",
    readingTime: "11 min read",
    audience: "Swiss and European small-business owners evaluating an internal AI assistant",
    excerpt: "Understand what an internal AI assistant can do, what affects project cost, how permissions should work and when a simpler solution is better.",
    headings: ["What is an internal AI assistant?", "Which use cases are practical?", "RAG or model training?", "What affects project cost?", "How should privacy and permissions work?", "What are the risks and the best first step?"],
    paragraphs: [
      "An internal AI assistant is a private employee-facing tool that finds, summarises and prepares information from approved company documents and systems. It differs from a public website chatbot because the users, data, permissions and consequences of mistakes are different.",
      "Strong first use cases are narrow and easy to verify: finding the latest approved procedure, summarising a document, preparing a meeting brief, drafting an internal response from controlled sources, comparing approved information or routing an uncertain question to the right owner. The assistant should support work, not silently make binding decisions.",
      "Many assistants use retrieval-augmented generation, or RAG. The system searches approved sources at request time and supplies relevant context to the language model. This often removes the need to train a custom model, makes knowledge easier to update and allows answers to show source citations.",
      "There is no responsible universal price. Complexity depends on data quality, document formats, integrations, user roles, permission rules, hosting, security, testing, monitoring and ongoing ownership. A pilot using one clean source is much simpler than a company-wide assistant connected to several systems.",
      "The assistant should preserve the access rights of the original systems. A user must not receive information they could not open directly. Important controls include identity verification, role-based access, source filtering, encrypted connections, logging, retention rules and a process for removing obsolete content.",
      "Typical failures include confident but unsupported answers, outdated sources, missing citations, permission leakage and unclear ownership. Reduce risk with real-question testing, confidence thresholds and human escalation. Start with one team, one source collection and one measurable task; use simpler search or better document organisation when that already solves the problem.",
    ],
  }),
  de: makeTranslation("de", {
    title: "Interner KI-Assistent für KMU: Einsatzbereiche, Kosten und Risiken",
    description: "Praxisleitfaden für Schweizer und europäische KMU zu internen KI-Assistenten: Einsatzbereiche, Projektaufwand, Datenschutz, Berechtigungen und Risiken.",
    category: "KI-Strategie",
    readingTime: "12 Min. Lesezeit",
    audience: "Schweizer und europäische KMU, die einen internen KI-Assistenten prüfen",
    excerpt: "Erfahren Sie, wofür ein interner KI-Assistent sinnvoll ist, welche Faktoren die Kosten bestimmen und wie Datenschutz und Berechtigungen umgesetzt werden sollten.",
    headings: ["Was ist ein interner KI-Assistent?", "Welche Einsatzbereiche sind sinnvoll?", "RAG oder Modelltraining?", "Welche Faktoren bestimmen die Kosten?", "Wie funktionieren Datenschutz und Berechtigungen?", "Welche Risiken bestehen und wie beginnt man sinnvoll?"],
    paragraphs: [
      "Ein interner KI-Assistent ist ein privates Werkzeug für Mitarbeitende. Er findet, fasst zusammen und bereitet Informationen aus freigegebenen Unternehmensdokumenten und Systemen auf. Im Unterschied zu einem öffentlichen Website-Chatbot gelten andere Benutzerkreise, Daten, Berechtigungen und Folgen bei Fehlern.",
      "Gute erste Anwendungsfälle sind klar begrenzt und überprüfbar: die aktuell gültige Prozessbeschreibung finden, Dokumente zusammenfassen, Besprechungsunterlagen vorbereiten, interne Antwortentwürfe aus kontrollierten Quellen erstellen oder unsichere Fragen an die zuständige Person weiterleiten. Der Assistent soll unterstützen, aber keine verbindlichen Entscheidungen unbemerkt übernehmen.",
      "Viele Systeme nutzen Retrieval-Augmented Generation, kurz RAG. Bei jeder Anfrage werden passende Inhalte aus freigegebenen Quellen gesucht und dem Sprachmodell als Kontext bereitgestellt. Ein eigenes Modelltraining ist deshalb oft nicht nötig; Wissen lässt sich leichter aktualisieren und Antworten können Quellen nennen.",
      "Ein seriöser Einheitspreis ist nicht möglich. Der Aufwand hängt von Datenqualität, Dokumentformaten, Integrationen, Benutzerrollen, Berechtigungen, Hosting, Sicherheit, Tests, Monitoring und laufender Verantwortung ab. Ein Pilot mit einer sauberen Quelle ist deutlich einfacher als ein unternehmensweiter Assistent mit mehreren Systemen.",
      "Der Assistent muss die Zugriffsrechte der Ursprungssysteme übernehmen. Mitarbeitende dürfen keine Informationen erhalten, die sie dort nicht direkt öffnen könnten. Wichtige Kontrollen sind Identitätsprüfung, rollenbasierter Zugriff, Quellenfilter, verschlüsselte Verbindungen, Protokollierung und Regeln zum Entfernen veralteter Inhalte.",
      "Häufige Probleme sind überzeugend formulierte, aber unbelegte Antworten, veraltete Quellen, fehlende Belege, zu breite Zugriffe und unklare Verantwortung. Tests mit realen Fragen, definierte Grenzen und menschliche Eskalation reduzieren Risiken. Beginnen Sie mit einem Team, einer Quellensammlung und einer messbaren Aufgabe; eine bessere Dokumentenstruktur kann manchmal bereits genügen.",
    ],
  }),
  hu: makeTranslation("hu", { title: "Belső AI-asszisztens kisvállalkozásoknak: felhasználás, költségek és kockázatok", description: "Gyakorlati útmutató belső AI-asszisztenshez kisvállalkozások számára, jogosultságokkal, adatvédelemmel és projektkockázatokkal.", category: "AI-stratégia", readingTime: "10 perc olvasás", audience: "Svájci és európai kisvállalkozók", excerpt: "Ismerje meg a belső AI-asszisztens fő felhasználási területeit, költségtényezőit és kockázatait.", headings: ["Mi a belső AI-asszisztens?", "Gyakorlati felhasználás", "RAG vagy modelltréning?", "Költségek és összetettség", "Adatvédelem és jogosultságok", "Kockázatok és első lépés"], paragraphs: ["A belső AI-asszisztens jóváhagyott vállalati dokumentumokból segíti a munkatársakat.", "Jó első feladat a szabályzatok keresése, dokumentumok összefoglalása vagy belső választervezetek készítése.", "A RAG kérdésenként jóváhagyott forrásokat keres, ezért gyakran nincs szükség saját modell tanítására.", "A költséget az adatminőség, integrációk, jogosultságok, hosting, tesztelés és karbantartás határozza meg.", "A rendszernek meg kell őriznie az eredeti hozzáférési jogokat és naplóznia kell a használatot.", "Kezdjen egy csapattal, egy forrásgyűjteménnyel és egy mérhető feladattal. Bizonytalan esetben legyen emberi ellenőrzés."] }),
  pl: makeTranslation("pl", { title: "Wewnętrzny asystent AI dla małej firmy: zastosowania, koszty i ryzyka", description: "Praktyczny przewodnik po wewnętrznych asystentach AI dla małych firm, z uwzględnieniem danych, uprawnień, kosztów i ryzyk.", category: "Strategia AI", readingTime: "10 min czytania", audience: "Małe firmy w Szwajcarii i Europie", excerpt: "Zobacz, kiedy wewnętrzny asystent AI ma sens i jak bezpiecznie rozpocząć projekt.", headings: ["Czym jest wewnętrzny asystent AI?", "Praktyczne zastosowania", "Źródła danych i RAG", "Koszty i złożoność", "Prywatność i uprawnienia", "Ryzyka i pierwszy krok"], paragraphs: ["Wewnętrzny asystent AI to prywatne narzędzie korzystające z zatwierdzonych dokumentów i systemów firmy.", "Dobry pierwszy zakres to wyszukiwanie procedur, podsumowania dokumentów i szkice odpowiedzi wewnętrznych.", "RAG wyszukuje zatwierdzone źródła przy każdym pytaniu, więc własny trening modelu zwykle nie jest konieczny.", "Koszt zależy od jakości danych, integracji, uprawnień, hostingu, testów i utrzymania.", "System powinien respektować istniejące prawa dostępu, prowadzić logi i usuwać nieaktualne treści.", "Zacznij od jednego zespołu, jednego zbioru źródeł i mierzalnego zadania. Niepewne przypadki kieruj do człowieka."] }),
  es: makeTranslation("es", { title: "Asistente de IA interno para pymes: usos, costes y riesgos", description: "Guía práctica para pymes sobre asistentes internos de IA, fuentes de datos, permisos, complejidad y riesgos.", category: "Estrategia de IA", readingTime: "10 min de lectura", audience: "Pymes suizas y europeas", excerpt: "Comprende los casos de uso, factores de coste y controles necesarios para un asistente interno de IA.", headings: ["Qué es un asistente interno de IA", "Casos de uso prácticos", "Fuentes de datos y RAG", "Costes y complejidad", "Privacidad y permisos", "Riesgos y primer paso"], paragraphs: ["Es una herramienta privada para empleados que trabaja con documentos y sistemas aprobados.", "Un buen primer alcance es localizar procedimientos, resumir documentos o redactar respuestas internas.", "RAG recupera fuentes aprobadas en cada consulta, por lo que normalmente no hace falta entrenar un modelo propio.", "El coste depende de calidad de datos, integraciones, permisos, alojamiento, pruebas y mantenimiento.", "El sistema debe respetar los derechos de acceso existentes, registrar el uso y retirar contenido obsoleto.", "Empieza con un equipo, una colección de fuentes y una tarea medible. Los casos inciertos deben escalarse a una persona."] }),
  fr: makeTranslation("fr", { title: "Assistant IA interne pour PME : usages, coûts et risques", description: "Guide pratique pour les PME sur les assistants IA internes, les données, les droits d'accès, les coûts et les risques.", category: "Stratégie IA", readingTime: "10 min de lecture", audience: "PME suisses et européennes", excerpt: "Découvrez les usages pertinents, les facteurs de coût et les contrôles nécessaires.", headings: ["Qu'est-ce qu'un assistant IA interne ?", "Usages pratiques", "Sources de données et RAG", "Coûts et complexité", "Confidentialité et droits d'accès", "Risques et première étape"], paragraphs: ["C'est un outil privé pour les collaborateurs qui utilise des documents et systèmes approuvés.", "Un bon premier périmètre consiste à retrouver des procédures, résumer des documents ou rédiger une réponse interne.", "Le RAG recherche des sources approuvées à chaque question, sans nécessiter généralement l'entraînement d'un modèle spécifique.", "Le coût dépend de la qualité des données, des intégrations, des droits, de l'hébergement, des tests et de la maintenance.", "Le système doit respecter les droits existants, journaliser l'utilisation et retirer les contenus obsolètes.", "Commencez avec une équipe, un ensemble de sources et une tâche mesurable. Les cas incertains doivent être transmis à une personne."] }),
  it: makeTranslation("it", { title: "Assistente AI interno per PMI: casi d'uso, costi e rischi", description: "Guida pratica per PMI su assistenti AI interni, fonti dati, permessi, costi e rischi.", category: "Strategia AI", readingTime: "10 min di lettura", audience: "PMI svizzere ed europee", excerpt: "Scopri quando un assistente AI interno è utile e come avviare un progetto controllato.", headings: ["Che cos'è un assistente AI interno", "Casi d'uso pratici", "Fonti dati e RAG", "Costi e complessità", "Privacy e permessi", "Rischi e primo passo"], paragraphs: ["È uno strumento privato per i dipendenti che usa documenti e sistemi approvati.", "Un buon primo ambito è trovare procedure, riassumere documenti o creare bozze interne.", "Il RAG recupera fonti approvate per ogni domanda, quindi in genere non serve addestrare un modello proprietario.", "Il costo dipende da qualità dei dati, integrazioni, permessi, hosting, test e manutenzione.", "Il sistema deve rispettare i diritti di accesso, registrare l'uso e rimuovere contenuti obsoleti.", "Inizia con un team, una raccolta di fonti e un compito misurabile. I casi incerti vanno affidati a una persona."] }),
  cz: makeTranslation("cz", { title: "Interní AI asistent pro malé firmy: využití, náklady a rizika", description: "Praktický průvodce interními AI asistenty pro malé firmy, včetně dat, oprávnění, nákladů a rizik.", category: "AI strategie", readingTime: "10 min čtení", audience: "Švýcarské a evropské malé firmy", excerpt: "Zjistěte, kdy interní AI asistent dává smysl a jak bezpečně začít.", headings: ["Co je interní AI asistent", "Praktické využití", "Datové zdroje a RAG", "Náklady a složitost", "Soukromí a oprávnění", "Rizika a první krok"], paragraphs: ["Je to soukromý nástroj pro zaměstnance pracující se schválenými dokumenty a systémy.", "Vhodným prvním úkolem je hledání postupů, shrnutí dokumentů nebo interní návrhy odpovědí.", "RAG při každém dotazu vyhledá schválené zdroje, takže vlastní trénování modelu obvykle není nutné.", "Náklady určují kvalita dat, integrace, oprávnění, hosting, testování a údržba.", "Systém musí respektovat stávající přístupová práva, vést záznamy a odstranit zastaralý obsah.", "Začněte jedním týmem, jednou sadou zdrojů a měřitelným úkolem. Nejisté případy předejte člověku."] }),
  sk: makeTranslation("sk", { title: "Interný AI asistent pre malé firmy: využitie, náklady a riziká", description: "Praktický sprievodca internými AI asistentmi pre malé firmy vrátane dát, oprávnení, nákladov a rizík.", category: "AI stratégia", readingTime: "10 min čítania", audience: "Švajčiarske a európske malé firmy", excerpt: "Zistite, kedy interný AI asistent dáva zmysel a ako bezpečne začať.", headings: ["Čo je interný AI asistent", "Praktické využitie", "Dátové zdroje a RAG", "Náklady a zložitosť", "Súkromie a oprávnenia", "Riziká a prvý krok"], paragraphs: ["Je to súkromný nástroj pre zamestnancov pracujúci so schválenými dokumentmi a systémami.", "Vhodným prvým využitím je hľadanie postupov, sumarizácia dokumentov alebo interné návrhy odpovedí.", "RAG pri každej otázke vyhľadá schválené zdroje, takže vlastné trénovanie modelu zvyčajne nie je potrebné.", "Náklady určujú kvalita dát, integrácie, oprávnenia, hosting, testovanie a údržba.", "Systém musí rešpektovať existujúce prístupové práva, viesť záznamy a odstrániť zastaraný obsah.", "Začnite jedným tímom, jednou sadou zdrojov a merateľnou úlohou. Neisté prípady odovzdajte človeku."] }),
  pt: makeTranslation("pt", { title: "Assistente interno de IA para pequenas empresas: usos, custos e riscos", description: "Guia prático sobre assistentes internos de IA, fontes de dados, permissões, custos e riscos.", category: "Estratégia de IA", readingTime: "10 min de leitura", audience: "Pequenas empresas suíças e europeias", excerpt: "Percebe os casos de uso, fatores de custo e controlos necessários.", headings: ["O que é um assistente interno de IA", "Casos de uso práticos", "Fontes de dados e RAG", "Custos e complexidade", "Privacidade e permissões", "Riscos e primeiro passo"], paragraphs: ["É uma ferramenta privada para colaboradores que usa documentos e sistemas aprovados.", "Um bom primeiro âmbito é encontrar procedimentos, resumir documentos ou criar rascunhos internos.", "O RAG recupera fontes aprovadas em cada pergunta, por isso normalmente não é necessário treinar um modelo próprio.", "O custo depende da qualidade dos dados, integrações, permissões, alojamento, testes e manutenção.", "O sistema deve respeitar os acessos existentes, registar a utilização e remover conteúdo desatualizado.", "Começa com uma equipa, uma coleção de fontes e uma tarefa mensurável. Casos incertos devem passar para uma pessoa."] }),
  da: makeTranslation("da", { title: "Intern AI-assistent til små virksomheder: brug, omkostninger og risici", description: "Praktisk guide til interne AI-assistenter, datakilder, adgangsrettigheder, omkostninger og risici.", category: "AI-strategi", readingTime: "10 min læsning", audience: "Schweiziske og europæiske små virksomheder", excerpt: "Se hvornår en intern AI-assistent giver mening, og hvordan projektet afgrænses sikkert.", headings: ["Hvad er en intern AI-assistent?", "Praktiske anvendelser", "Datakilder og RAG", "Omkostninger og kompleksitet", "Privatliv og adgang", "Risici og første skridt"], paragraphs: ["Det er et privat værktøj til medarbejdere, som bruger godkendte dokumenter og systemer.", "Et godt første område er at finde procedurer, opsummere dokumenter eller lave interne udkast.", "RAG henter godkendte kilder ved hvert spørgsmål, så det er normalt ikke nødvendigt at træne en egen model.", "Omkostninger afhænger af datakvalitet, integrationer, adgangsregler, hosting, test og vedligeholdelse.", "Systemet skal respektere eksisterende rettigheder, logge brug og fjerne forældet indhold.", "Start med ét team, én kildesamling og én målbar opgave. Usikre sager skal eskaleres til en person."] }),
  nl: makeTranslation("nl", { title: "Interne AI-assistent voor kleine bedrijven: toepassingen, kosten en risico's", description: "Praktische gids over interne AI-assistenten, databronnen, toegangsrechten, kosten en risico's.", category: "AI-strategie", readingTime: "10 min leestijd", audience: "Zwitserse en Europese kleine bedrijven", excerpt: "Lees wanneer een interne AI-assistent zinvol is en hoe je gecontroleerd begint.", headings: ["Wat is een interne AI-assistent?", "Praktische toepassingen", "Databronnen en RAG", "Kosten en complexiteit", "Privacy en rechten", "Risico's en eerste stap"], paragraphs: ["Het is een privétool voor medewerkers die werkt met goedgekeurde documenten en systemen.", "Een goede eerste toepassing is procedures vinden, documenten samenvatten of interne concepten maken.", "RAG haalt bij elke vraag goedgekeurde bronnen op, waardoor een eigen model trainen meestal niet nodig is.", "Kosten hangen af van datakwaliteit, integraties, rechten, hosting, testen en onderhoud.", "Het systeem moet bestaande toegangsrechten respecteren, gebruik loggen en verouderde inhoud verwijderen.", "Begin met één team, één bronverzameling en één meetbare taak. Onzekere gevallen gaan naar een mens."] }),
  ja: makeTranslation("ja", { title: "中小企業向け社内AIアシスタント：活用例・コスト・リスク", description: "社内AIアシスタントの用途、データ、権限、コスト要因、リスクを中小企業向けに解説します。", category: "AI戦略", readingTime: "10分で読めます", audience: "スイスおよび欧州の中小企業", excerpt: "社内AIアシスタントが役立つ場面と、安全な導入方法を理解できます。", headings: ["社内AIアシスタントとは", "実用的な活用例", "データソースとRAG", "コストと複雑さ", "プライバシーと権限", "リスクと最初の一歩"], paragraphs: ["承認済みの社内文書やシステムを利用する従業員向けの非公開ツールです。", "最初の用途には、手順検索、文書要約、社内回答の下書きなどが適しています。", "RAGは質問ごとに承認済みソースを検索するため、独自モデルの学習が不要な場合が多くあります。", "コストはデータ品質、連携、権限、ホスティング、テスト、保守によって決まります。", "既存のアクセス権を維持し、利用を記録し、古い情報を削除できる設計が必要です。", "1チーム、1つの情報源、1つの測定可能な業務から始め、不確実なケースは人に引き継ぎます。"] }),
} satisfies Record<LocaleCode, BlogPostTranslation>;

export default {
  slug: "internal-ai-assistant-small-business",
  title: translations.en.title,
  language: "en",
  description: translations.en.description,
  tags: translations.en.tags,
  published: true,
  status: "published",
  image: "/assets/swiss-ai-websites-hero.png",
  imageAlt: "Illustration of a secure internal AI assistant connecting employees with approved company documents and permission-controlled systems.",
  author: "Websiteli",
  date: "2026-08-02",
  publishDate: "2026-08-02",
  updated: "2026-08-02",
  translationFallback: false,
  social: {
    linkedin: "What can an internal AI assistant do for a small business? A practical guide to use cases, project complexity, privacy, permissions and risks.",
    facebook: "New guide: internal AI assistants for small businesses, including use cases, cost factors and risk controls.",
    instagram: "Internal AI assistant: start with one controlled source, one measurable task and clear human escalation.",
  },
  related: ["/en/services/ai-assistants/", "/en/services/business-automation/", "/en/services/ai-integrations/", "/en/services-pricing/", "/en/contact/"],
  translations,
} satisfies BlogPostSource;
