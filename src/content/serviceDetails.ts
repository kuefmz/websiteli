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
  "business-websites": {
    seoTitle: "Business Website Design in Switzerland | Websiteli",
    intro:
      "Websiteli builds fast, professional business websites for small companies and SMEs that need clearer positioning, stronger trust and more qualified enquiries. Each project includes responsive implementation, SEO foundations, analytics and a clear contact path, with automation available when it supports the business.",
    considerations: [
      "Make the offer and ideal customer clear within the first screen.",
      "Build service pages around real customer questions and search intent rather than generic company language.",
      "Connect forms, analytics and Search Console from launch so enquiries and visibility can be measured.",
      "Keep domain, website, analytics and search accounts under client ownership.",
      "Add automation only when it removes a real follow-up or operational bottleneck.",
    ],
    faqs: [
      {
        question: "What is included in a Websiteli business website?",
        answer:
          "A typical business website includes responsive design and development, core page structure, clear contact paths, forms, SEO foundations, analytics setup and launch support. The exact scope depends on the business, content and required integrations.",
      },
      {
        question: "How much does a business website cost in Switzerland?",
        answer:
          "Websiteli's Digital Foundation starts at CHF 990. The final price depends on the number of pages, content work, forms, multilingual requirements, integrations, tracking and any automation needed for the project.",
      },
      {
        question: "Do you build websites for small businesses and SMEs?",
        answer:
          "Yes. Websiteli is designed around small businesses and SMEs that need a credible, owned website without unnecessary complexity. Projects can start with a focused website and expand later as the business grows.",
      },
      {
        question: "Will the website be ready for SEO and analytics?",
        answer:
          "Yes. Websiteli includes technical SEO foundations such as metadata, structured page hierarchy and indexable implementation, plus analytics and Search Console setup where included in scope. Ongoing rankings still depend on content, competition and authority over time.",
      },
    ],
  },
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
