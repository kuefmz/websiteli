import type { LocaleCode } from "../../locales";
import type { BlogPostSource, BlogPostTranslation } from "../types";
type Copy = {
  title: string;
  description: string;
  category: string;
  readingTime: string;
  audience: string;
  excerpt: string;
  headings: [string, string, string, string, string, string, string];
  paragraphs: [string, string, string, string, string, string, string];
};

function makeTranslation(language: LocaleCode, copy: Copy): BlogPostTranslation {
  const body = copy.headings.map((heading, index) => `## ${heading}\n\n${copy.paragraphs[index]}`).join("\n\n");
  return {
    title: copy.title,
    description: copy.description,
    category: copy.category,
    tags: ["internal AI assistant testing", "AI quality assurance", "permission-aware AI", "AI implementation for SMEs"],
    language,
    readingTime: copy.readingTime,
    audience: copy.audience,
    excerpt: copy.excerpt,
    summary: [copy.excerpt, copy.paragraphs[1], copy.paragraphs[3], copy.paragraphs[6]],
    keyTakeaways: [copy.paragraphs[0], copy.paragraphs[2], copy.paragraphs[4], copy.paragraphs[6]],
    chatGptPrompts: [
      `${copy.headings[0]}: create acceptance criteria for my internal AI assistant.`,
      `${copy.headings[1]}: create a realistic test set for my company documents.`,
      `${copy.headings[6]}: create a launch decision checklist and monitoring plan.`,
    ],
    faqs: [
      { question: copy.headings[0], answer: copy.paragraphs[0] },
      { question: copy.headings[2], answer: copy.paragraphs[2] },
      { question: copy.headings[3], answer: copy.paragraphs[3] },
      { question: copy.headings[6], answer: copy.paragraphs[6] },
    ],
    body: `${body}\n\n[Internal AI assistants](/en/services/ai-assistants/) · [AI integrations](/en/services/ai-integrations/) · [Business automation](/en/services/business-automation/) · [Services and pricing](/en/services-pricing/) · [Contact](/en/contact/)`,
  };
}

const translations = {
  en: makeTranslation("en", {
    title: "How to Test an Internal AI Assistant Before Launch",
    description: "A practical quality-assurance guide for Swiss and European SMEs testing internal AI assistants for accuracy, permissions, citations and safe escalation.",
    category: "AI Implementation",
    readingTime: "11 min read",
    audience: "Swiss and European SMEs preparing an internal AI assistant for launch",
    excerpt: "A useful internal AI assistant needs more than fluent answers: it must find the right source, respect permissions, show uncertainty and fail safely.",
    headings: ["Define acceptance criteria before testing", "Build a representative question set", "Measure source and answer quality separately", "Test permissions and restricted information", "Check uncertainty, citations and escalation", "Run workflow tests with real users", "Create a launch and monitoring decision"],
    paragraphs: ["Start by defining what the assistant must do, what it must never do and which errors are unacceptable. For a policy assistant, a correct answer may require the current approved document, a clear citation and a refusal when evidence is missing. Separate useful behaviour from pleasant wording.", "Create questions from real work rather than polished demonstrations. Include straightforward requests, vague wording, outdated terminology, multilingual queries, conflicting documents and questions whose answer is not available. Record the expected source, expected answer and required escalation for each case.", "Evaluate retrieval before judging the final response. First ask whether the system found the correct, current and permitted source. Then assess whether the answer accurately reflects that evidence. This distinction helps teams fix indexing, document quality, retrieval rules or prompting instead of treating every failure as a model problem.", "Test with users who have different roles. A person must not receive information through the assistant that they cannot access in the source system. Include deliberately restricted documents, departed-user scenarios and role changes. Retrieval rights should be checked before content is sent to the model.", "The assistant should cite important answers, distinguish facts from suggestions and state when evidence is incomplete. Test questions with no answer, contradictory sources and sensitive implications. Define when the assistant must stop, ask for clarification or hand the task to a named person.", "Let intended users complete real tasks in a controlled pilot. Observe whether the assistant reduces searching, creates extra verification work or changes how decisions are made. Capture failed queries, misleading answers and confusing interface behaviour. Do not expand the scope until recurring failures have owners and fixes.", "Launch only when the agreed critical tests pass and remaining limitations are documented. Keep a regression set for future document, prompt and integration changes. Monitor failures, permission incidents, source freshness and user feedback after release. A small reliable scope is more valuable than a broad assistant nobody can trust."],
  }),
  de: makeTranslation("de", {
    title: "Internen KI-Assistenten vor dem Start testen: Praxisleitfaden für KMU",
    description: "Praxisleitfaden für Schweizer und europäische KMU zur Qualitätsprüfung interner KI-Assistenten: Antworten, Quellen, Berechtigungen und Eskalation.",
    category: "KI-Implementierung",
    readingTime: "12 Min. Lesezeit",
    audience: "Schweizer und europäische KMU vor der Einführung eines internen KI-Assistenten",
    excerpt: "Ein interner KI-Assistent braucht mehr als überzeugende Formulierungen: Er muss richtige Quellen finden, Berechtigungen respektieren und sicher scheitern.",
    headings: ["Abnahmekriterien vor dem Test festlegen", "Einen realistischen Fragenkatalog aufbauen", "Quellenqualität und Antwortqualität getrennt messen", "Berechtigungen und gesperrte Informationen prüfen", "Unsicherheit, Quellenangaben und Eskalation testen", "Arbeitsabläufe mit echten Nutzenden prüfen", "Eine klare Start- und Monitoringentscheidung treffen"],
    paragraphs: ["Definieren Sie zuerst, was der Assistent leisten muss, was er niemals tun darf und welche Fehler nicht akzeptabel sind. Bei Richtlinienfragen kann eine korrekte Antwort die aktuell freigegebene Version, eine eindeutige Quellenangabe und eine Ablehnung bei fehlenden Belegen erfordern. Freundliche Formulierungen ersetzen keine fachliche Richtigkeit.", "Verwenden Sie Fragen aus dem tatsächlichen Arbeitsalltag statt nur vorbereitete Demonstrationen. Testen Sie klare und unklare Anfragen, alte Begriffe, mehrsprachige Fragen, widersprüchliche Dokumente und Fälle ohne vorhandene Antwort. Halten Sie erwartete Quelle, Soll-Antwort und erforderliche Eskalation fest.", "Bewerten Sie zuerst, ob das System die richtige, aktuelle und zulässige Quelle gefunden hat. Prüfen Sie danach, ob die Antwort diese Quelle korrekt wiedergibt. So wird sichtbar, ob Dokumentqualität, Indexierung, Suchlogik oder Antwortgenerierung verbessert werden muss.", "Testen Sie mit unterschiedlichen Rollen. Mitarbeitende dürfen über den Assistenten keine Informationen erhalten, die ihnen im Ursprungssystem nicht zugänglich sind. Nutzen Sie bewusst gesperrte Dokumente, Rollenwechsel und Austrittsszenarien. Berechtigungen müssen vor der Übergabe von Inhalten an das Modell greifen.", "Der Assistent sollte wichtige Aussagen belegen, Fakten von Vorschlägen trennen und fehlende Evidenz offenlegen. Testen Sie unbeantwortbare Fragen, widersprüchliche Quellen und sensible Konsequenzen. Legen Sie fest, wann Rückfragen nötig sind und wann an eine benannte Person übergeben werden muss.", "Lassen Sie die vorgesehenen Nutzerinnen und Nutzer reale Aufgaben in einem kontrollierten Pilot erledigen. Beobachten Sie, ob Suchaufwand sinkt oder zusätzliche Prüfarbeit entsteht. Dokumentieren Sie Fehlanfragen, irreführende Antworten und unklare Bedienung. Erweitern Sie den Umfang erst, wenn wiederkehrende Fehler Verantwortliche und Lösungen haben.", "Starten Sie nur, wenn die kritischen Abnahmetests bestanden und verbleibende Grenzen dokumentiert sind. Bewahren Sie einen Regressionstest für spätere Änderungen an Dokumenten, Prompts und Integrationen auf. Nach dem Start sollten Fehler, Berechtigungsvorfälle, Aktualität der Quellen und Nutzerfeedback laufend geprüft werden."],
  }),
  hu: makeTranslation("hu", {
    title: "Belső AI-asszisztens tesztelése indulás előtt",
    description: "Gyakorlati minőségbiztosítási útmutató kkv-knak pontosság, források, jogosultságok és biztonságos eszkaláció ellenőrzéséhez.",
    category: "AI-bevezetés",
    readingTime: "10 perc olvasás",
    audience: "Belső AI-asszisztenst bevezető svájci és európai kkv-k",
    excerpt: "A jó asszisztens nemcsak szépen válaszol: helyes forrást használ, tiszteletben tartja a jogokat és jelzi a bizonytalanságot.",
    headings: ["Határozza meg az elfogadási feltételeket", "Készítsen valós kérdéskészletet", "Mérje külön a keresést és a választ", "Tesztelje a jogosultságokat", "Vizsgálja a bizonytalanságot és eszkalációt", "Futtasson felhasználói pilotot", "Döntsön az indulásról és monitorozásról"],
    paragraphs: ["A tesztelés előtt rögzítse az elvárt működést, a tiltott műveleteket és a kritikus hibákat.", "Valós kérdéseket, homályos megfogalmazásokat, régi kifejezéseket, ellentmondó forrásokat és megválaszolhatatlan eseteket is használjon.", "Először azt vizsgálja, hogy a rendszer a helyes és aktuális forrást találta-e meg, majd az abból készített választ.", "Különböző szerepkörökkel és szándékosan korlátozott dokumentumokkal ellenőrizze az eredeti jogosultságokat.", "Fontos válaszoknál kérjen forrást, hiányos vagy érzékeny esetben pedig egyértelmű emberi átadást.", "A célfelhasználók valós feladatokat végezzenek, a félrevezető válaszokat és ismétlődő hibákat pedig rögzítsék.", "Csak a kritikus tesztek teljesülése után induljon el; tartson fenn regressziós teszteket és folyamatos ellenőrzést."],
  }),
  pl: makeTranslation("pl", {
    title: "Jak przetestować wewnętrznego asystenta AI przed wdrożeniem",
    description: "Praktyczny przewodnik QA dla MŚP: dokładność, źródła, uprawnienia, cytowania i bezpieczna eskalacja.",
    category: "Wdrożenie AI",
    readingTime: "10 min czytania",
    audience: "Szwajcarskie i europejskie MŚP przed uruchomieniem asystenta AI",
    excerpt: "Dobry asystent musi znajdować właściwe źródła, respektować uprawnienia i bezpiecznie obsługiwać brak pewności.",
    headings: ["Ustal kryteria akceptacji", "Zbuduj realistyczny zestaw pytań", "Mierz osobno wyszukiwanie i odpowiedzi", "Testuj uprawnienia", "Sprawdzaj niepewność i eskalację", "Przeprowadź pilotaż z użytkownikami", "Podejmij decyzję o uruchomieniu"],
    paragraphs: ["Przed testami określ wymagane zachowanie, zakazane działania i błędy krytyczne.", "Użyj prawdziwych pytań, niejasnych sformułowań, starych pojęć, sprzecznych źródeł i pytań bez odpowiedzi.", "Najpierw sprawdź, czy znaleziono właściwe i aktualne źródło, a potem czy odpowiedź wiernie je odzwierciedla.", "Testuj różne role i celowo ograniczone dokumenty, aby zachować prawa systemów źródłowych.", "Wymagaj cytowań przy ważnych odpowiedziach oraz jasnej eskalacji przy braku danych lub ryzyku.", "Pozwól użytkownikom wykonywać realne zadania i zapisuj mylące odpowiedzi oraz powtarzalne błędy.", "Uruchom system dopiero po przejściu testów krytycznych; zachowaj testy regresji i monitoring."],
  }),
  es: makeTranslation("es", {
    title: "Cómo probar un asistente interno de IA antes de lanzarlo",
    description: "Guía práctica para pymes sobre precisión, fuentes, permisos, citas y escalado seguro antes del lanzamiento.",
    category: "Implementación de IA",
    readingTime: "10 min de lectura",
    audience: "Pymes suizas y europeas que preparan un asistente interno de IA",
    excerpt: "Un buen asistente debe encontrar la fuente correcta, respetar permisos y reconocer cuándo no tiene evidencia.",
    headings: ["Define criterios de aceptación", "Crea un conjunto realista de preguntas", "Mide por separado recuperación y respuesta", "Prueba los permisos", "Comprueba incertidumbre y escalado", "Haz un piloto con usuarios", "Decide lanzamiento y seguimiento"],
    paragraphs: ["Antes de probar, define el comportamiento obligatorio, las acciones prohibidas y los fallos críticos.", "Incluye preguntas reales, frases ambiguas, términos antiguos, fuentes contradictorias y casos sin respuesta disponible.", "Comprueba primero si se encontró la fuente correcta y vigente; después evalúa si la respuesta la representa con precisión.", "Prueba distintos roles y documentos restringidos para conservar los permisos del sistema de origen.", "Exige citas en respuestas importantes y una escalada clara cuando falte evidencia o el caso sea sensible.", "Permite que usuarios reales completen tareas y registra respuestas engañosas, fricción y fallos repetidos.", "Lanza solo cuando pasen las pruebas críticas; conserva pruebas de regresión y supervisa fuentes, incidentes y feedback."],
  }),
  fr: makeTranslation("fr", {
    title: "Comment tester un assistant IA interne avant son lancement",
    description: "Guide pratique pour PME sur la précision, les sources, les droits, les citations et l’escalade avant mise en service.",
    category: "Mise en œuvre de l’IA",
    readingTime: "10 min de lecture",
    audience: "PME suisses et européennes préparant un assistant IA interne",
    excerpt: "Un assistant fiable doit trouver la bonne source, respecter les droits et reconnaître l’incertitude.",
    headings: ["Définir les critères d’acceptation", "Créer un jeu de questions réaliste", "Mesurer séparément recherche et réponse", "Tester les droits d’accès", "Vérifier incertitude et escalade", "Mener un pilote utilisateur", "Décider du lancement et du suivi"],
    paragraphs: ["Avant les tests, définissez le comportement requis, les actions interdites et les échecs critiques.", "Utilisez des questions réelles, des formulations vagues, d’anciens termes, des sources contradictoires et des cas sans réponse.", "Vérifiez d’abord si la bonne source actuelle a été trouvée, puis si la réponse la reflète correctement.", "Testez plusieurs rôles et des documents volontairement restreints afin de préserver les droits des systèmes sources.", "Exigez des citations pour les réponses importantes et une escalade claire lorsque les preuves manquent.", "Faites réaliser des tâches réelles aux utilisateurs et consignez les réponses trompeuses et les échecs récurrents.", "Lancez uniquement après réussite des tests critiques; conservez des tests de régression et un suivi continu."],
  }),
  it: makeTranslation("it", {
    title: "Come testare un assistente AI interno prima del lancio",
    description: "Guida pratica per PMI su accuratezza, fonti, permessi, citazioni ed escalation sicura.",
    category: "Implementazione AI",
    readingTime: "10 min di lettura",
    audience: "PMI svizzere ed europee prima del lancio di un assistente AI",
    excerpt: "Un assistente affidabile deve trovare la fonte corretta, rispettare i permessi e gestire l’incertezza.",
    headings: ["Definire i criteri di accettazione", "Creare domande realistiche", "Misurare separatamente ricerca e risposta", "Testare i permessi", "Verificare incertezza ed escalation", "Eseguire un pilota con utenti", "Decidere lancio e monitoraggio"],
    paragraphs: ["Prima dei test definisci comportamento richiesto, azioni vietate ed errori critici.", "Usa domande reali, formulazioni vaghe, termini obsoleti, fonti contraddittorie e casi senza risposta.", "Verifica prima se è stata trovata la fonte corretta e aggiornata, poi se la risposta la rappresenta accuratamente.", "Prova ruoli diversi e documenti volutamente riservati per mantenere i permessi dei sistemi di origine.", "Richiedi citazioni per le risposte importanti ed escalation chiare quando mancano prove.", "Fai svolgere attività reali agli utenti e registra risposte fuorvianti e problemi ricorrenti.", "Avvia solo dopo i test critici; conserva test di regressione e monitora fonti, incidenti e feedback."],
  }),
  cz: makeTranslation("cz", {
    title: "Jak otestovat interního AI asistenta před spuštěním",
    description: "Praktický průvodce pro malé firmy: přesnost, zdroje, oprávnění, citace a bezpečné předání člověku.",
    category: "Implementace AI",
    readingTime: "10 min čtení",
    audience: "Švýcarské a evropské malé firmy před spuštěním AI asistenta",
    excerpt: "Spolehlivý asistent musí najít správný zdroj, respektovat oprávnění a přiznat nejistotu.",
    headings: ["Stanovte kritéria přijetí", "Vytvořte realistické otázky", "Měřte zvlášť vyhledání a odpověď", "Otestujte oprávnění", "Prověřte nejistotu a eskalaci", "Spusťte uživatelský pilot", "Rozhodněte o spuštění a monitoringu"],
    paragraphs: ["Před testováním určete požadované chování, zakázané akce a kritická selhání.", "Použijte skutečné dotazy, nejasné formulace, staré pojmy, rozporné zdroje a případy bez odpovědi.", "Nejprve ověřte správnost a aktuálnost nalezeného zdroje, potom přesnost odpovědi.", "Testujte různé role a záměrně omezené dokumenty, aby zůstala zachována původní oprávnění.", "U důležitých odpovědí vyžadujte citace a při chybějících důkazech jasné předání člověku.", "Nechte uživatele plnit reálné úkoly a zaznamenávejte zavádějící odpovědi a opakované chyby.", "Spusťte až po splnění kritických testů; udržujte regresní testy a průběžný monitoring."],
  }),
  sk: makeTranslation("sk", {
    title: "Ako otestovať interného AI asistenta pred spustením",
    description: "Praktický sprievodca pre malé firmy: presnosť, zdroje, oprávnenia, citácie a bezpečné odovzdanie človeku.",
    category: "Implementácia AI",
    readingTime: "10 min čítania",
    audience: "Švajčiarske a európske malé firmy pred spustením AI asistenta",
    excerpt: "Spoľahlivý asistent musí nájsť správny zdroj, rešpektovať oprávnenia a priznať neistotu.",
    headings: ["Stanovte kritériá prijatia", "Vytvorte realistické otázky", "Merajte zvlášť vyhľadanie a odpoveď", "Otestujte oprávnenia", "Preverte neistotu a eskaláciu", "Spustite používateľský pilot", "Rozhodnite o spustení a monitoringu"],
    paragraphs: ["Pred testovaním určte požadované správanie, zakázané akcie a kritické zlyhania.", "Použite skutočné otázky, nejasné formulácie, staré pojmy, rozporné zdroje a prípady bez odpovede.", "Najprv overte správnosť a aktuálnosť nájdeného zdroja, potom presnosť odpovede.", "Testujte rôzne roly a zámerne obmedzené dokumenty, aby zostali zachované pôvodné oprávnenia.", "Pri dôležitých odpovediach vyžadujte citácie a pri chýbajúcich dôkazoch jasné odovzdanie človeku.", "Nechajte používateľov plniť reálne úlohy a zaznamenávajte zavádzajúce odpovede a opakované chyby.", "Spustite až po splnení kritických testov; udržujte regresné testy a priebežný monitoring."],
  }),
  pt: makeTranslation("pt", {
    title: "Como testar um assistente interno de IA antes do lançamento",
    description: "Guia prático para PME sobre precisão, fontes, permissões, citações e escalamento seguro.",
    category: "Implementação de IA",
    readingTime: "10 min de leitura",
    audience: "PME suíças e europeias antes do lançamento de um assistente interno",
    excerpt: "Um assistente fiável deve encontrar a fonte certa, respeitar permissões e reconhecer incerteza.",
    headings: ["Definir critérios de aceitação", "Criar perguntas realistas", "Medir pesquisa e resposta separadamente", "Testar permissões", "Verificar incerteza e escalamento", "Executar um piloto com utilizadores", "Decidir lançamento e monitorização"],
    paragraphs: ["Antes dos testes, define o comportamento obrigatório, ações proibidas e falhas críticas.", "Usa perguntas reais, formulações vagas, termos antigos, fontes contraditórias e casos sem resposta.", "Verifica primeiro se foi encontrada a fonte correta e atual; depois avalia a precisão da resposta.", "Testa diferentes funções e documentos restritos para preservar as permissões dos sistemas de origem.", "Exige citações nas respostas importantes e escalamento claro quando faltam provas.", "Permite que utilizadores reais executem tarefas e regista respostas enganadoras e falhas repetidas.", "Lança apenas após passar os testes críticos; mantém testes de regressão e monitorização contínua."],
  }),
  da: makeTranslation("da", {
    title: "Sådan tester du en intern AI-assistent før lancering",
    description: "Praktisk kvalitetssikringsguide til SMV’er om nøjagtighed, kilder, adgang, citater og sikker eskalering.",
    category: "AI-implementering",
    readingTime: "10 min læsning",
    audience: "Schweiziske og europæiske SMV’er før lancering",
    excerpt: "En pålidelig assistent skal finde den rigtige kilde, respektere adgang og håndtere usikkerhed sikkert.",
    headings: ["Fastlæg acceptkriterier", "Byg et realistisk spørgesæt", "Mål søgning og svar separat", "Test adgangsrettigheder", "Kontrollér usikkerhed og eskalering", "Kør en brugerpilot", "Beslut lancering og overvågning"],
    paragraphs: ["Definér krav, forbudte handlinger og kritiske fejl før test.", "Brug virkelige spørgsmål, uklare formuleringer, gamle begreber, modstridende kilder og tilfælde uden svar.", "Kontrollér først om den korrekte aktuelle kilde blev fundet, og derefter om svaret gengiver den præcist.", "Test forskellige roller og bevidst begrænsede dokumenter, så kildesystemernes rettigheder bevares.", "Kræv kilder til vigtige svar og tydelig eskalering, når dokumentation mangler.", "Lad de tiltænkte brugere udføre virkelige opgaver og registrér misvisende svar og gentagne fejl.", "Lancér først når kritiske test består; behold regressionstest og løbende overvågning."],
  }),
  nl: makeTranslation("nl", {
    title: "Een interne AI-assistent testen vóór de lancering",
    description: "Praktische QA-gids voor mkb-bedrijven over nauwkeurigheid, bronnen, rechten, citaten en veilige escalatie.",
    category: "AI-implementatie",
    readingTime: "10 min leestijd",
    audience: "Zwitserse en Europese mkb-bedrijven vóór lancering",
    excerpt: "Een betrouwbare assistent vindt de juiste bron, respecteert rechten en benoemt onzekerheid.",
    headings: ["Leg acceptatiecriteria vast", "Maak een realistische vragenset", "Meet zoeken en antwoorden apart", "Test toegangsrechten", "Controleer onzekerheid en escalatie", "Voer een gebruikerspilot uit", "Beslis over lancering en monitoring"],
    paragraphs: ["Bepaal vóór het testen verplicht gedrag, verboden acties en kritieke fouten.", "Gebruik echte vragen, vage formuleringen, oude termen, tegenstrijdige bronnen en gevallen zonder antwoord.", "Controleer eerst of de juiste actuele bron is gevonden en daarna of het antwoord die bron correct weergeeft.", "Test verschillende rollen en bewust afgeschermde documenten zodat bronrechten behouden blijven.", "Eis bronverwijzingen bij belangrijke antwoorden en duidelijke escalatie bij ontbrekend bewijs.", "Laat gebruikers echte taken uitvoeren en registreer misleidende antwoorden en terugkerende fouten.", "Ga pas live na kritieke tests; behoud regressietests en monitor bronnen, incidenten en feedback."],
  }),
  ja: makeTranslation("ja", {
    title: "社内AIアシスタントを公開前にテストする方法",
    description: "中小企業向けに、正確性、情報源、権限、引用、安全なエスカレーションを確認する実践ガイド。",
    category: "AI導入",
    readingTime: "10分で読めます",
    audience: "社内AIアシスタント導入前のスイス・欧州中小企業",
    excerpt: "信頼できるアシスタントには、正しい情報源、権限管理、不確実性への安全な対応が必要です。",
    headings: ["受入基準を定める", "現実的な質問セットを作る", "検索と回答を分けて評価する", "権限をテストする", "不確実性とエスカレーションを確認する", "利用者パイロットを行う", "公開と監視を判断する"],
    paragraphs: ["テスト前に、必須動作、禁止操作、重大な失敗条件を定義します。", "実際の質問、曖昧な表現、古い用語、矛盾する情報源、答えがないケースを含めます。", "まず正しい最新版の情報源を取得したかを確認し、その後に回答の正確性を評価します。", "異なる役割と意図的に制限した文書で、元システムの権限が維持されるか確認します。", "重要な回答には引用を求め、根拠不足や機密性がある場合は人へ明確に引き継ぎます。", "対象利用者が実業務を行い、誤解を招く回答や繰り返す失敗を記録します。", "重大テスト合格後のみ公開し、回帰テストと継続監視を維持します。"],
  }),
} satisfies Record<LocaleCode, BlogPostTranslation>;

export default {
  slug: "test-internal-ai-assistant-before-launch",
  published: true,
  status: "published",
  publishDate: "2026-08-05",
  image: "/assets/blog/prepare-company-documents-internal-ai-assistant.png",
  imageAlt: "Websiteli guide to testing an internal AI assistant with acceptance criteria, source checks, permissions, citations and launch monitoring.",
  author: "Websiteli",
  date: "2026-08-05",
  updated: "2026-08-05",
  related: ["internal-ai-assistant-small-business", "prepare-company-documents-internal-ai-assistant", "private-ai-assistant-privacy-checklist"],
  translations,
} satisfies BlogPostSource;
