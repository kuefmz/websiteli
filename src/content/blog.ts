import type { LocaleCode } from "./locales";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  audience: string;
  excerpt: string;
  headings: string[];
  related: string[];
  body: { heading: string; paragraphs: string[]; list?: string[] }[];
};

export type BlogRoadmapItem = {
  title: string;
  primaryKeyword: string;
  intent: "Informational" | "Commercial" | "Transactional";
  audience: string;
  competition: "Low" | "Medium" | "High";
  why: string;
  links: string[];
};

const marketKeywords = [
  "website creation Switzerland",
  "KMU website erstellen Schweiz",
  "website erstellen Deutschland",
  "Website Agentur Österreich",
  "tvorba webových stránek pro firmy",
  "tvorba web stránok pre firmy",
  "céges weboldal készítés",
  "small business website design",
  "restaurant website booking",
  "AI automation for small business",
  "Google Business Profile optimization",
  "website redesign checklist",
  "local SEO website",
  "lead generation landing page",
  "website maintenance audit",
];

const enPost: BlogPost = {
  slug: "why-ai-generated-websites-are-not-enough-for-a-real-business",
  title: "Why AI-generated websites are not enough for a real business",
  description:
    "AI can speed up website planning and prototypes, but real businesses still need ownership, SEO foundations, analytics, performance, integrations and maintainable code.",
  category: "Website Strategy",
  tags: ["AI websites", "business website", "SEO", "ownership", "automation"],
  featuredImage: "/assets/swiss-ai-websites-hero.png",
  author: "Websiteli",
  publishedAt: "2026-06-26",
  updatedAt: "2026-06-26",
  readingTime: "8 min read",
  audience: "Small business owners, consultants, restaurants and local service providers",
  excerpt:
    "AI is useful for speed, ideas and prototypes. The risk starts when a business does not own the domain, hosting, source code, analytics or search setup behind the website.",
  headings: [
    "AI is a tool, not a business foundation",
    "Where AI-generated websites help",
    "Where they fall short",
    "What every business should own",
    "How Websiteli uses AI responsibly",
  ],
  related: ["/en/services-pricing/", "/en/services-pricing/", "/en/portfolio/#live-demos", "/en/contact/"],
  body: [
    {
      heading: "AI is a tool, not a business foundation",
      paragraphs: [
        "AI-generated websites are useful. They can turn a blank page into a draft, help structure a landing page, suggest copy, generate layout ideas and speed up early prototypes. For a small business owner, that can feel like magic because the first visible version appears quickly.",
        "The problem is not AI. The problem is treating a fast draft as a finished business asset. A real business website has to be owned, measurable, searchable, maintainable and connected to the way customers actually contact you.",
      ],
    },
    {
      heading: "Where AI-generated websites help",
      paragraphs: [
        "AI is strongest at speed and exploration. It can help you compare page structures, write a first service description, generate image ideas, test headlines and clarify what a visitor needs to understand in the first few seconds.",
        "It is also excellent for prototypes. If you need to show a restaurant booking flow, a consultant portfolio, a local service quote form or a dashboard concept, AI can shorten the distance from idea to first version.",
      ],
      list: ["Fast first drafts", "Visual inspiration", "Prototype pages", "Content outlines", "Alternative headlines and calls to action"],
    },
    {
      heading: "Where they fall short",
      paragraphs: [
        "Most business risk appears after the first draft. Who owns the domain? Where is the site hosted? Can you move it later? Can a developer edit the source code? Is the site fast on mobile? Is Google Search Console connected? Are contact forms tracked? Can the website integrate with booking, newsletter, CRM, analytics or automation tools?",
        "A website that looks acceptable but is hard to maintain can become expensive later. Vendor lock-in, weak SEO structure, poor Core Web Vitals, limited analytics and difficult customization all reduce the value of the website as a long-term business asset.",
      ],
      list: [
        "Unclear domain, hosting or code ownership",
        "Vendor lock-in",
        "Thin SEO metadata and weak heading structure",
        "Poor performance on mobile",
        "Difficult maintenance and customization",
        "Limited analytics and conversion tracking",
        "Hard integrations with booking, CRM, newsletter or ads",
      ],
    },
    {
      heading: "What every business should own",
      paragraphs: [
        "A serious website should belong to the business, not to a tool account that is hard to leave. Ownership gives you leverage: you can change providers, improve SEO, add integrations, keep analytics history and continue developing the asset over time.",
      ],
      list: [
        "Domain ownership",
        "Hosting ownership",
        "Source code ownership",
        "Google Analytics and Google Search Console access",
        "Google Business Profile access",
        "Website images, copy and brand assets",
        "Form submissions, lead data and conversion events",
      ],
    },
    {
      heading: "How Websiteli uses AI responsibly",
      paragraphs: [
        "Websiteli uses AI to work faster, explore options and reduce unnecessary manual work. We do not use it as a substitute for ownership, technical setup, SEO foundations or business reasoning.",
        "The goal is simple: every website should be practical, search-friendly, fast, measurable and 100% owned by the client. AI helps us move faster, but the final website remains a real business asset.",
      ],
    },
    {
      heading: "A better next step",
      paragraphs: [
        "If you already have an AI-generated website, the next question is not whether it looks good. The question is whether it can bring customers, prove results and grow with your business. A short website audit can reveal missing ownership, SEO, analytics, performance and conversion foundations before they become expensive problems.",
      ],
    },
  ],
};

const roadmap: BlogRoadmapItem[] = [
  ["How much does a business website cost in Switzerland?", "business website cost Switzerland", "Commercial", "Swiss small businesses", "Medium", "Pricing searches are close to buying and need transparent expectations.", ["/en/services-pricing/", "/en/contact/"]],
  ["Why your restaurant website is not getting bookings", "restaurant website bookings", "Commercial", "Restaurants and cafes", "Medium", "Connects website quality directly to reservation revenue.", ["/en/portfolio/#case-studies", "/en/services-pricing/"]],
  ["Website vs Facebook page for small businesses", "website vs Facebook page small business", "Commercial", "Local business owners", "Medium", "Explains why owned web presence matters beyond social media.", ["/en/services-pricing/", "/en/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/"]],
  ["How Google Business Profile brings local customers", "Google Business Profile local customers", "Informational", "Local services", "High", "Supports local SEO and GBP optimization demand.", ["/en/services-pricing/", "/en/services-pricing/"]],
  ["AI automation for restaurants: practical examples", "AI automation for restaurants", "Commercial", "Restaurants", "Low", "Builds authority around automation for operational pain.", ["/en/portfolio/#case-studies", "/en/services-pricing/"]],
  ["Signs your website is costing you customers", "website costing customers", "Commercial", "Small business owners", "Medium", "High-friction pain point that naturally leads to audit CTA.", ["/en/contact/", "/en/services-pricing/"]],
  ["Website redesign checklist for small businesses", "website redesign checklist", "Commercial", "Businesses with old websites", "High", "Captures redesign intent and frames Websiteli process.", ["/en/services-pricing/", "/en/contact/"]],
  ["Landing page vs full website: what does your business need?", "landing page vs website", "Commercial", "Advertisers and startups", "Medium", "Helps package selection and reduces sales friction.", ["/en/services-pricing/", "/en/contact/"]],
  ["How to rank on Google Maps as a local business", "rank on Google Maps local business", "Informational", "Local service businesses", "High", "Strong local SEO topic tied to GBP services.", ["/en/services-pricing/", "/en/services-pricing/"]],
  ["Why slow websites lose customers", "slow website loses customers", "Commercial", "All small businesses", "Medium", "Performance topic with clear conversion impact.", ["/en/contact/", "/en/services-pricing/"]],
  ["Best website structure for consultants", "website for consultants", "Commercial", "Consultants and coaches", "Medium", "Matches consultant demo and portfolio positioning.", ["/en/portfolio/#case-studies", "/en/portfolio/#live-demos"]],
  ["Shopify vs custom website for service businesses", "Shopify vs custom website", "Commercial", "Consultants and ecommerce service providers", "High", "Captures comparison intent and supports Shopify demo.", ["/en/portfolio/#live-demos", "/en/contact/"]],
  ["How to collect leads from your website", "website lead generation", "Commercial", "Service businesses", "High", "Core CRO topic that leads to Growth Setup.", ["/en/services-pricing/", "/en/services-pricing/"]],
  ["What every local business website should include", "local business website checklist", "Commercial", "Local businesses", "Medium", "Broad but high-value checklist topic.", ["/en/services-pricing/", "/en/portfolio/#case-studies"]],
  ["How to prepare your business for AI search", "AI search optimization for business", "Informational", "Forward-looking SMEs", "Low", "Positions Websiteli around future search behavior.", ["/en/services-pricing/", "/en/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/"]],
  ["Website developer or website agency: which should you hire?", "website developer vs agency", "Commercial", "Buyers comparing vendors", "Medium", "Answers procurement friction before contact.", ["/en/about/", "/en/contact/"]],
  ["Professional website checklist for restaurants", "professional restaurant website checklist", "Commercial", "Restaurants", "Low", "Niche page supporting restaurant demo.", ["/en/portfolio/#case-studies", "/en/services-pricing/"]],
  ["How booking integrations increase restaurant reservations", "booking integration restaurant website", "Commercial", "Restaurants", "Low", "Connects feature to measurable outcome.", ["/en/portfolio/#case-studies", "/en/contact/"]],
  ["Website audit: what should be checked?", "website audit checklist", "Commercial", "Businesses considering audit", "High", "Directly supports free audit CTA.", ["/en/contact/", "/en/services-pricing/"]],
  ["Google Analytics for small business websites", "Google Analytics small business website", "Informational", "Small business owners", "Medium", "Explains included analytics setup.", ["/en/services-pricing/", "/en/services-pricing/"]],
  ["Google Search Console basics for business owners", "Google Search Console business website", "Informational", "Small business owners", "Medium", "Builds trust around technical SEO basics.", ["/en/services-pricing/", "/en/contact/"]],
  ["Website maintenance: what small businesses actually need", "website maintenance small business", "Commercial", "Existing website owners", "Medium", "Future recurring service angle without overselling.", ["/en/services-pricing/", "/en/contact/"]],
  ["How landing pages improve Google Ads results", "landing page Google Ads small business", "Commercial", "Advertisers", "High", "Connects ads readiness to conversion pages.", ["/en/services-pricing/", "/en/contact/"]],
  ["Lead generation website for consultants", "lead generation website consultant", "Commercial", "Consultants", "Medium", "High-fit service niche.", ["/en/portfolio/#case-studies", "/en/services-pricing/"]],
  ["Why LinkedIn is not enough for consultants", "consultant website LinkedIn", "Commercial", "Consultants", "Low", "Matches pain point in demo content.", ["/en/portfolio/#case-studies", "/en/contact/"]],
  ["Website ownership: domain, hosting and code explained", "website ownership domain hosting code", "Commercial", "Business owners", "Low", "Extends first AI ownership article.", ["/en/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/", "/en/contact/"]],
  ["AI chatbot for customer questions: when it makes sense", "AI chatbot customer questions small business", "Commercial", "Service businesses", "Medium", "Supports AI assistant demo.", ["/en/portfolio/#case-studies", "/en/services-pricing/"]],
  ["How automated reports save management time", "automated reports small business", "Commercial", "Growing SMEs", "Low", "Supports analytics and automation packages.", ["/en/portfolio/#case-studies", "/en/services-pricing/"]],
  ["Digital transformation for small businesses without enterprise complexity", "digital transformation small business", "Commercial", "SMEs", "High", "Frames Websiteli as pragmatic and approachable.", ["/en/services-pricing/", "/en/about/"]],
  ["Business automation examples for local companies", "business automation examples small business", "Commercial", "Local companies", "Medium", "Shows practical automation use cases.", ["/en/services-pricing/", "/en/portfolio/#case-studies"]],
  ["How to improve website conversion rate", "website conversion rate small business", "Commercial", "Website owners", "High", "Core CRO topic tied to audit.", ["/en/contact/", "/en/services-pricing/"]],
  ["Homepage copy that turns visitors into leads", "homepage copy lead generation", "Informational", "Service businesses", "Medium", "Supports CRO and content positioning.", ["/en/services-pricing/", "/en/contact/"]],
  ["What is technical SEO for a business website?", "technical SEO business website", "Informational", "Business owners", "High", "Explains invisible value in packages.", ["/en/services-pricing/", "/en/services-pricing/"]],
  ["How schema markup helps small business SEO", "schema markup small business SEO", "Informational", "SEO-aware owners", "Medium", "Supports technical SEO trust.", ["/en/services-pricing/", "/en/contact/"]],
  ["Restaurant website SEO: practical local steps", "restaurant website SEO", "Commercial", "Restaurants", "High", "Niche commercial SEO topic.", ["/en/portfolio/#case-studies", "/en/services-pricing/"]],
  ["Small business website design in Switzerland: what matters", "small business website design Switzerland", "Commercial", "Swiss SMEs", "Medium", "Local market service page support.", ["/en/services-pricing/", "/en/about/"]],
  ["Website erstellen Schweiz: guide for KMU owners", "Website erstellen Schweiz KMU", "Commercial", "German-speaking Swiss SMEs", "High", "German-language opportunity for Switzerland.", ["/de/services-pricing/", "/de/contact/"]],
  ["Website erstellen Deutschland: checklist before hiring", "Website erstellen Deutschland", "Commercial", "German SMEs", "High", "DACH keyword expansion.", ["/de/services-pricing/", "/de/contact/"]],
  ["Website Agentur Österreich: how to choose the right partner", "Website Agentur Österreich", "Commercial", "Austrian SMEs", "High", "DACH commercial comparison topic.", ["/de/services-pricing/", "/de/contact/"]],
  ["Tvorba webových stránek pro malé firmy", "tvorba webových stránek malé firmy", "Commercial", "Czech SMEs", "Medium", "Czech market entry topic.", ["/cz/services-pricing/", "/cz/contact/"]],
  ["Tvorba web stránok pre malé firmy", "tvorba web stránok malé firmy", "Commercial", "Slovak SMEs", "Medium", "Slovak market entry topic.", ["/sk/services-pricing/", "/sk/contact/"]],
  ["Céges weboldal készítés: mit tartalmazzon?", "céges weboldal készítés", "Commercial", "Hungarian SMEs", "High", "Hungarian commercial keyword cluster.", ["/hu/services-pricing/", "/hu/contact/"]],
  ["How to make a website look trustworthy", "trustworthy business website", "Informational", "All service businesses", "Medium", "Directly supports trust and CRO improvements.", ["/en/services-pricing/", "/en/about/"]],
  ["Why transparent website pricing builds trust", "transparent website pricing", "Commercial", "Price-sensitive buyers", "Low", "Differentiates packages.", ["/en/services-pricing/", "/en/contact/"]],
  ["No-subscription websites: when they are better", "website no monthly subscription", "Commercial", "Small businesses", "Low", "Addresses ownership and pricing concerns.", ["/en/services-pricing/", "/en/contact/"]],
  ["How to brief a website developer", "website developer brief", "Informational", "Ready-to-buy clients", "Medium", "Reduces sales friction before inquiry.", ["/en/contact/", "/en/services-pricing/"]],
  ["Website performance audit for small businesses", "website performance audit", "Commercial", "Existing website owners", "Medium", "Performance-focused audit funnel.", ["/en/contact/", "/en/services-pricing/"]],
  ["How to connect website forms to business workflows", "website form automation", "Commercial", "Service teams", "Medium", "Automation intent with practical value.", ["/en/services-pricing/", "/en/portfolio/#case-studies"]],
  ["How analytics turns website traffic into better decisions", "website analytics decisions", "Informational", "Growing SMEs", "Medium", "Supports analytics dashboard demo.", ["/en/portfolio/#case-studies", "/en/contact/"]],
  ["The small business guide to owning your digital assets", "own digital assets business", "Commercial", "Business owners", "Low", "Reinforces ownership and trust message.", ["/en/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/", "/en/about/"]],
].map(([title, primaryKeyword, intent, audience, competition, why, links]) => ({
  title,
  primaryKeyword,
  intent: intent as BlogRoadmapItem["intent"],
  audience,
  competition: competition as BlogRoadmapItem["competition"],
  why,
  links,
}));

export function getBlogIndexContent(locale: LocaleCode) {
  const localized = {
    sk: {
      seo: {
        title: "Blog o weboch, SEO a automatizácii - Websiteli",
        description: "Praktické články Websiteli pre slovenské firmy o weboch, SEO, lokálnej viditeľnosti, lead generation a AI automatizácii.",
      },
      eyebrow: "Blog",
      title: "Praktické návody pre firmy, ktoré chcú viac dopytov.",
      text: "Články o webových stránkach, SEO, lokálnej viditeľnosti, analytike, automatizácii a vlastníctve digitálnych aktív.",
      featured: "Odporúčaný článok",
      roadmap: "Plán budúcich článkov",
      searchLabel: "Hľadať články",
      categoriesLabel: "Kategórie",
      readArticle: "Čítať článok",
      roadmapIntro: "SEO roadmapa prioritizuje témy s obchodným zámerom pre Švajčiarsko, DACH, Česko, Slovensko, Maďarsko a anglický trh.",
    },
  };

  return (
    localized[locale as keyof typeof localized] ?? {
      seo: {
        title: "Website, SEO and AI Automation Blog - Websiteli",
        description: "Practical Websiteli guides about business websites, SEO, local visibility, lead generation, analytics, ownership and AI automation.",
      },
      eyebrow: "Blog",
      title: "Practical guides for businesses that want more leads.",
      text: "Articles about websites, SEO, local visibility, analytics, automation and owning the digital assets behind your business.",
      featured: "Featured article",
      roadmap: "Future content roadmap",
      searchLabel: "Search articles",
      categoriesLabel: "Categories",
      readArticle: "Read article",
      roadmapIntro: "The SEO roadmap prioritizes commercial-intent topics across Switzerland, DACH, Czech Republic, Slovakia, Hungary and English-language markets.",
    }
  );
}

export function getBlogPosts(_locale: LocaleCode) {
  return [enPost];
}

export function getBlogPost(_locale: LocaleCode, slug: string) {
  return slug === enPost.slug ? enPost : undefined;
}

export function getBlogRoadmap() {
  return roadmap;
}

export function getMarketKeywords() {
  return marketKeywords;
}
