export type ServiceDetail = {
  seoTitle?: string;
  intro?: string;
  examples?: Array<{
    title: string;
    description: string;
  }>;
  considerations?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "ai-content-pipelines": {
    seoTitle: "AI Content Pipeline for Small Businesses | Websiteli",
    intro:
      "An AI content pipeline is a controlled workflow that turns approved business inputs into reviewable content. It can connect research, briefs, drafting, repurposing, quality checks and publishing tasks while keeping a person responsible for final approval.",
    examples: [
      {
        title: "Turn one expert article into a reusable content set",
        description:
          "Start with an approved long-form article, then prepare a newsletter summary, LinkedIn post, short social captions and internal linking suggestions. The source article remains the reference, and each derivative item is reviewed before publication.",
      },
      {
        title: "Create structured drafts from a content calendar",
        description:
          "Use a calendar entry, target audience, keyword and CTA to generate a consistent first draft. The workflow can check required sections, metadata, FAQs and links before handing the draft to an editor.",
      },
      {
        title: "Refresh existing pages using search data",
        description:
          "Combine Search Console opportunities with the current page to propose clearer headings, missing questions, internal links and replacement copy. The pipeline should preserve accurate business information instead of rewriting everything blindly.",
      },
    ],
    considerations: [
      "Define which sources are approved and which claims require manual verification.",
      "Keep human approval before public publishing, especially for prices, legal topics and client claims.",
      "Use templates and structured fields so output fits the website or CMS reliably.",
      "Track revisions, rejected drafts and recurring errors instead of measuring only output volume.",
      "Start with one repeatable format before connecting multiple channels and publishing systems.",
    ],
    faqs: [
      {
        question: "What is an AI content pipeline?",
        answer:
          "It is a repeatable workflow that uses approved inputs, automation and AI to help plan, draft, review, repurpose and prepare content for publishing. It is more structured than using a chatbot for one-off prompts.",
      },
      {
        question: "Can an AI content pipeline publish automatically?",
        answer:
          "It can, but most small businesses should begin with human approval before publication. This reduces the risk of inaccurate claims, broken links, unsuitable tone or outdated information reaching customers.",
      },
      {
        question: "What should a small business automate first?",
        answer:
          "Choose one frequent, clearly defined format such as a blog draft, newsletter summary or social-media repurposing workflow. A narrow first version is easier to evaluate and improve than a fully automated multi-channel system.",
      },
      {
        question: "Does the pipeline replace a content strategist or editor?",
        answer:
          "No. It reduces repetitive preparation and formatting work, but people still need to choose useful topics, verify facts, protect the brand voice and decide what should be published.",
      },
      {
        question: "What information is needed to scope the project?",
        answer:
          "Useful inputs include the content formats, publishing frequency, approved source material, review process, target channels, CMS or website setup, languages and any claims that require additional approval.",
      },
    ],
  },
};

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}
