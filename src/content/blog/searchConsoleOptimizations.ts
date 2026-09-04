import type { LocaleCode } from "../locales";
import type { BlogPost } from "./index-base";

type SearchConsoleOptimization = {
  title?: string;
  description?: string;
  tags?: string[];
  related?: string[];
  appendBody?: string;
};

const updatedAt = "2026-09-04";

const optimizations: Partial<Record<LocaleCode, Record<string, SearchConsoleOptimization>>> = {
  en: {
    "internal-ai-assistant-small-business": {
      title: "Internal AI Assistant for Small Businesses: What It Is & How to Build One",
      description:
        "Learn what an internal AI assistant is, how it differs from a public chatbot, what data it needs, and how a small business can pilot one safely.",
      tags: ["internal AI assistant", "internal AI", "small business AI", "RAG", "AI assistant"],
      related: ["ai-chatbot-vs-internal-ai-assistant", "scope-internal-ai-assistant-pilot", "prepare-company-documents-internal-ai-assistant"],
      appendBody: `## From idea to a useful internal AI assistant\n\nThe strongest first version answers a narrow set of repeated internal questions from approved company material. Start with one team, one document set and a small evaluation set before expanding access.\n\nIf you want to turn the idea into a controlled pilot, see Websiteli's [internal AI assistant service](/en/services/internal-ai-assistants/) and the practical guide to [scoping an internal AI assistant pilot](/en/blog/scope-internal-ai-assistant-pilot/).`,
    },
    "ai-content-workflow-small-business": {
      title: "AI Content Workflow for Small Businesses: A Practical Pipeline",
      description:
        "Build a practical AI content workflow for a small business: approved inputs, structured briefs, drafting, checks, human review, publishing and measurement.",
      tags: ["AI content workflow", "AI content pipeline", "content workflow", "small business AI", "content automation"],
      related: ["what-should-small-business-automate-first", "utm-tracking-small-business", "website-before-paid-ads-checklist"],
      appendBody: `## Turn the workflow into a repeatable content pipeline\n\nA useful content workflow is more than prompting a chatbot. It connects approved sources, a structured brief, drafting, checks, human approval and publishing so the team can repeat the process without losing quality.\n\nSee the [AI content pipeline service](/en/services/ai-content-pipelines/) if you want this workflow connected to your website, analytics or publishing process.`,
    },
    "website-life-cycle-statistics": {
      title: "Website Lifespan Statistics 2026: When Should You Redesign?",
      description:
        "Website lifespan statistics and practical redesign signals for 2026. Learn when age matters, what to measure, and when a business website actually needs rebuilding.",
      tags: ["website lifespan statistics", "website redesign", "website lifecycle", "website statistics", "website maintenance"],
      appendBody: `## Do you need a redesign or just focused improvements?\n\nWebsite age alone is not a reason to rebuild. A redesign becomes more defensible when the site is difficult to update, performs poorly, no longer matches the offer, loses search visibility or makes enquiries harder than they should be.\n\nIf you are deciding between incremental fixes and a rebuild, compare Websiteli's [business website service](/en/services/business-websites/) and [website pricing](/en/services-pricing/).`,
    },
    "scope-internal-ai-assistant-pilot": {
      title: "How to Scope an Internal AI Assistant Pilot for a Small Business",
      description:
        "A practical framework for scoping an internal AI assistant pilot: users, documents, permissions, evaluation questions, safeguards and success criteria.",
      tags: ["internal AI assistant pilot", "AI pilot", "internal AI assistant", "RAG pilot", "AI evaluation"],
      related: ["internal-ai-assistant-small-business", "prepare-company-documents-internal-ai-assistant", "test-internal-ai-assistant-before-launch"],
      appendBody: `## Keep the pilot deliberately small\n\nA good pilot should prove one useful workflow before the project expands. Define the users, approved sources, permission boundaries, evaluation questions and failure conditions before adding more documents or teams.\n\nWebsiteli can help scope and build a controlled [internal AI assistant](/en/services/internal-ai-assistants/) around a real business use case.`,
    },
    "website-lead-qualification": {
      title: "Website Lead Qualification: Ask Better Questions, Get Better Leads",
      description:
        "Improve website lead qualification with better forms, routing and follow-up. Learn what to ask without creating friction for potential customers.",
      tags: ["website lead qualification", "website leads", "lead qualification", "lead generation", "website forms"],
      appendBody: `## Qualification should improve the conversation, not block it\n\nThe goal is to collect just enough context to route the enquiry and prepare a useful response. Every extra required field should earn its place by changing what happens next.\n\nFor a website that connects forms, tracking and follow-up, see Websiteli's [business website service](/en/services/business-websites/) and [lead generation automation](/en/services/lead-generation/).`,
    },
    "website-first-impression": {
      title: "Website First Impressions: How Fast Visitors Judge Your Business",
      description:
        "Learn what shapes a website first impression, why clarity and trust matter immediately, and what small businesses should improve first on their homepage.",
      tags: ["website first impression", "business website", "website trust", "homepage design", "website conversion"],
      appendBody: `## Improve the first screen before adding more pages\n\nA strong first impression usually comes from a clear offer, obvious audience, visible proof and a next step that does not require detective work. Fix those before adding decorative sections or more navigation choices.\n\nSee examples in the [Websiteli portfolio](/en/portfolio/) or compare the [business website service](/en/services/business-websites/).`,
    },
    "why-ai-generated-websites-are-not-enough-for-a-real-business": {
      title: "Why AI Website Builders Aren't Enough for a Serious Business",
      description:
        "AI website builders can speed up prototypes, but serious businesses still need ownership, SEO, analytics, integrations, performance and maintainable implementation.",
      tags: ["AI website builder", "AI generated website", "business website", "website ownership", "web development"],
      appendBody: `## Use AI for speed, not as a substitute for the business system\n\nAI can accelerate copy drafts, layouts and repetitive implementation. The final website still needs accurate business information, analytics, search foundations, reliable forms, ownership and a structure that can evolve with the company.\n\nWebsiteli's [business website service](/en/services/business-websites/) combines those foundations with automation and AI only where they add real value.`,
    },
    "website-cost-switzerland": {
      title: "Website Cost in Switzerland 2026: What Small Businesses Should Budget",
      description:
        "What does a website cost in Switzerland in 2026? See the main cost drivers for small-business websites, what should be included, and how to compare quotes.",
      tags: ["website cost Switzerland", "web design Switzerland", "website price Switzerland", "small business website", "Swiss web design"],
      appendBody: `## Compare scope, not only the headline price\n\nA useful quote should make ownership, page scope, forms, analytics, SEO foundations, launch support and ongoing costs explicit. A cheaper starting number can become more expensive if essential work is excluded.\n\nFor a concrete reference point, see [Websiteli website packages and pricing](/en/services-pricing/) and examples of [websites we've built](/en/portfolio/).`,
    },
  },
  de: {
    "ai-chatbot-vs-internal-ai-assistant": {
      title: "AI-Chatbot vs. interner KI-Assistent: Unterschiede für Unternehmen",
      description:
        "AI-Chatbot oder interner KI-Assistent? Erfahren Sie die Unterschiede bei Zielgruppe, Daten, Zugriffsrechten, Datenschutz und typischen Unternehmensanwendungen.",
      tags: ["interner KI-Assistent", "AI Chatbot", "KI Assistent Unternehmen", "RAG", "Unternehmens-KI"],
      related: ["internal-ai-assistant-small-business", "scope-internal-ai-assistant-pilot", "prepare-company-documents-internal-ai-assistant"],
      appendBody: `## Welche Lösung passt zu Ihrem Unternehmen?\n\nEin öffentlicher Chatbot hilft typischerweise Kunden oder Website-Besuchern. Ein interner KI-Assistent arbeitet dagegen mit freigegebenem Unternehmenswissen und braucht deshalb klarere Regeln für Quellen, Berechtigungen und Qualität.\n\nWenn Sie einen internen Anwendungsfall testen möchten, sehen Sie sich die [Websiteli-Lösung für interne KI-Assistenten](/de/services/internal-ai-assistants/) an.`,
    },
    "website-vs-facebook": {
      title: "Website oder Facebook-Seite? Was Unternehmen wirklich brauchen",
      description:
        "Website oder Facebook-Seite für ein Unternehmen? Vergleichen Sie Eigentum, Sichtbarkeit, Vertrauen, SEO, Leadgenerierung und langfristige Kontrolle.",
      tags: ["Website oder Facebook", "Unternehmenswebsite", "Facebook Seite", "Website für kleine Unternehmen", "Online Präsenz"],
      appendBody: `## Social Media ergänzt die Website, ersetzt sie aber nicht vollständig\n\nEine Facebook-Seite kann Reichweite und Kommunikation unterstützen. Die eigene Website bleibt jedoch der Ort, an dem Sie Angebot, Inhalte, Tracking, Suchmaschinenoptimierung und Conversion-Pfade selbst kontrollieren.\n\nWenn Ihre Website der zentrale Vertriebskanal werden soll, sehen Sie sich [Business-Websites von Websiteli](/de/services/business-websites/) und die [Pakete & Preise](/de/services-pricing/) an.`,
    },
    "why-business-websites-get-customers": {
      title: "Wie eine Website Kunden gewinnt: 7 Faktoren für mehr Anfragen",
      description:
        "Wie gewinnt eine Website Kunden? Die wichtigsten Faktoren für mehr Anfragen: klare Positionierung, Vertrauen, SEO, schnelle Ladezeit, gute CTAs und weniger Reibung.",
      tags: ["Kunden gewinnen Website", "mehr Anfragen Website", "Unternehmenswebsite", "Leadgenerierung", "Website Conversion"],
      appendBody: `## Mehr Besucher sind nicht automatisch mehr Kunden\n\nEine Website gewinnt Kunden, wenn die richtige Person schnell versteht, was angeboten wird, warum sie dem Unternehmen vertrauen kann und welcher nächste Schritt sinnvoll ist. Reichweite ohne diese Klarheit erzeugt oft nur mehr Absprünge.\n\nWebsiteli verbindet diese Grundlagen in [Business-Websites für Unternehmen](/de/services/business-websites/) mit Analytics, SEO und klaren Kontaktwegen.`,
    },
  },
};

export function applySearchConsoleOptimization(post: BlogPost): BlogPost {
  const optimization = optimizations[post.locale]?.[post.slug];
  if (!optimization) return post;

  return {
    ...post,
    title: optimization.title ?? post.title,
    description: optimization.description ?? post.description,
    tags: optimization.tags ? Array.from(new Set([...optimization.tags, ...post.tags])) : post.tags,
    related: optimization.related ?? post.related,
    body: optimization.appendBody ? `${post.body}\n\n${optimization.appendBody}` : post.body,
    updatedAt,
  };
}
