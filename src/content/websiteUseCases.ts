import type { PackageKey } from "../config/pricing";
import type { PortfolioProject, PortfolioUseCaseKey } from "./portfolio";

export type WebsiteUseCasePackageKey = Extract<PackageKey, "digitalFoundation" | "growthSetup" | "aiDataUpgrade">;

export type WebsiteUseCase = {
  slug: PortfolioUseCaseKey;
  eyebrow: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  heroText: string;
  projectIntro: string;
  needsTitle: string;
  needs: string[];
  buildsTitle: string;
  builds: string[];
  process: {
    title: string;
    description: string;
  }[];
  packageKey: WebsiteUseCasePackageKey;
  pricingText: string;
  relatedServices: string[];
  relatedUseCases: PortfolioUseCaseKey[];
  faqs: {
    question: string;
    answer: string;
  }[];
  formIntent: string;
};

export const websiteUseCases: WebsiteUseCase[] = [
  {
    slug: "healthcare",
    eyebrow: "Healthcare websites",
    title: "Healthcare Websites for Clinics and Patient Services",
    shortTitle: "Healthcare",
    metaTitle: "Healthcare Website Design for Clinics - Websiteli",
    metaDescription:
      "See a real healthcare website project and how Websiteli builds clinic websites with trust, treatment information, patient enquiries and SEO basics.",
    heroText:
      "Clinic websites need to feel calm, credible and easy to navigate. This use case is anchored in the real Movere Clinic website, then explains how a similar structure can support other healthcare practices.",
    projectIntro:
      "Movere Clinic shows how a healthcare website can introduce the practice, make services easier to understand and guide patients toward the next step without relying on invented claims.",
    needsTitle: "What clinics and healthcare providers need online",
    needs: [
      "A trustworthy first impression before a patient calls or books.",
      "Clear treatment, service and practitioner information.",
      "Fast mobile pages for people searching from their phone.",
      "Careful wording that avoids unsupported medical promises.",
    ],
    buildsTitle: "What Websiteli can build for a healthcare website",
    builds: [
      "Clinic homepages, service pages and treatment overview pages.",
      "Patient enquiry paths, booking links and contact forms.",
      "Local SEO foundations for clinic names, locations and services.",
      "Maintenance support for changing hours, staff, services and compliance-sensitive copy.",
    ],
    process: [
      {
        title: "Clarify the patient journey",
        description: "We map how visitors search, compare services, build trust and decide whether to contact the practice.",
      },
      {
        title: "Structure the clinic content",
        description: "We organize services, practitioner details, FAQs and contact paths around plain-language decisions.",
      },
      {
        title: "Launch and maintain",
        description: "We connect forms, SEO basics and analytics, then keep the site current as clinic details change.",
      },
    ],
    packageKey: "growthSetup",
    pricingText: "Healthcare websites usually fit Growth Setup when service pages, booking paths and local SEO are part of the launch.",
    relatedServices: ["business-websites", "seo-optimization", "website-maintenance", "booking-systems"],
    relatedUseCases: ["small-business", "associations", "portfolio"],
    faqs: [
      {
        question: "Can Websiteli build clinic websites without inventing medical claims?",
        answer:
          "Yes. The page structure can explain services clearly while leaving clinical claims, medical wording and compliance-sensitive copy under the practice owner's review.",
      },
      {
        question: "Can a clinic website start small?",
        answer:
          "Yes. A first version can focus on the homepage, service information, contact path and SEO basics, then expand into deeper treatment pages or booking workflows.",
      },
      {
        question: "Do healthcare websites need ongoing maintenance?",
        answer:
          "Usually yes. Hours, staff, services, forms and technical dependencies should stay current so the website remains reliable for patients.",
      },
    ],
    formIntent: "healthcare_website_consultation",
  },
  {
    slug: "startups",
    eyebrow: "Startup websites",
    title: "Startup Marketing Launch Setup",
    shortTitle: "Startups",
    metaTitle: "Startup Marketing Launch Setup - Websiteli",
    metaDescription:
      "See the real Slap AI project and how Websiteli builds startup marketing launch setups with a logo direction, website, design, GA4, Meta Business and ad-ready tracking.",
    heroText:
      "Startup launches need more than a page. Websiteli can create the marketing foundation: logo direction, website, visual design, GA4, Meta Business setup and the tracking needed before ads go live.",
    projectIntro:
      "Slap AI shows how a product launch can turn a specific offer into a sharp visual story with a clear call to action, then use that website as the base for campaigns and advertising.",
    needsTitle: "What startups and product teams need online",
    needs: [
      "A clear product promise that visitors understand in seconds.",
      "A landing page or website that can support outreach, ads and launch posts.",
      "A basic brand direction, logo usage and visual design that feel credible enough to advertise.",
      "GA4, Meta Business and conversion events prepared before campaign spend starts.",
    ],
    buildsTitle: "What Websiteli can build for a startup marketing launch",
    builds: [
      "Logo direction, visual design, website pages, launch landing pages and campaign pages.",
      "Product positioning, benefits, FAQs, CTAs and conversion sections.",
      "GA4 setup, key events, conversion tracking and traffic-source measurement.",
      "Meta Business setup support, pixel/event planning and ad-ready destination pages.",
      "Follow-up forms, lead capture, automation or dashboards when the launch starts generating demand.",
    ],
    process: [
      {
        title: "Shape the launch foundation",
        description: "We define the audience, product promise, visual direction, logo usage and first conversion goal.",
      },
      {
        title: "Build the marketing setup",
        description: "We create the website, campaign pages, forms, GA4 setup, Meta Business support and tracking plan.",
      },
      {
        title: "Prepare for advertising",
        description: "We verify the main events, CTA paths and source tracking so campaigns can start with cleaner data.",
      },
    ],
    packageKey: "growthSetup",
    pricingText: "Startup marketing launch setups usually fit Growth Setup when website design, GA4, Meta Business support, conversion tracking and campaign structure are part of the scope.",
    relatedServices: ["landing-pages", "lead-generation", "ecommerce-websites", "data-dashboards"],
    relatedUseCases: ["small-business", "portfolio", "associations"],
    faqs: [
      {
        question: "Is a startup launch page different from a normal business website?",
        answer:
          "Yes. A startup launch setup is narrower and more campaign-oriented: one audience, one product story, one conversion goal, and tracking prepared before traffic or ads start.",
      },
      {
        question: "Can Websiteli set up GA4 and Meta Business for a startup launch?",
        answer:
          "Yes. Websiteli can help configure GA4, key conversion events, Meta Business setup support and pixel/event planning. The startup should own the accounts and access.",
      },
      {
        question: "Can Websiteli add a logo, design direction and lead capture forms?",
        answer:
          "Yes. The setup can include logo direction, website design, campaign visuals, lead capture, source tracking and simple follow-up workflows depending on the tools you already use.",
      },
      {
        question: "Can the page change after launch feedback?",
        answer:
          "Yes. Startup pages are often built to evolve as messaging, product details and proof become clearer.",
      },
    ],
    formIntent: "startup_website_consultation",
  },
  {
    slug: "portfolio",
    eyebrow: "Portfolio websites",
    title: "Personal Portfolio and Professional Websites",
    shortTitle: "Portfolio",
    metaTitle: "Personal Portfolio Website Design - Websiteli",
    metaDescription:
      "See a real personal website project and how Websiteli builds portfolio websites for specialists, consultants and professionals.",
    heroText:
      "A personal website gives your work, background and credibility a permanent home beyond social profiles and PDFs. This use case is anchored in a real professional portfolio project.",
    projectIntro:
      "The personal website project shows how experience, selected work and contact paths can be organized into one owned professional profile.",
    needsTitle: "What professionals need from a personal website",
    needs: [
      "A clear introduction that explains who you are and what you do.",
      "Project, experience or publication sections that are easy to scan.",
      "A contact path that supports applications, outreach and referrals.",
      "An owned web presence that is not limited by social platforms.",
    ],
    buildsTitle: "What Websiteli can build for a portfolio website",
    builds: [
      "Personal websites for specialists, consultants, researchers and creators.",
      "Portfolio sections, project summaries, bio pages and contact forms.",
      "SEO metadata for your name, profession and core expertise.",
      "Fast responsive layouts that are easy to share in applications and outreach.",
    ],
    process: [
      {
        title: "Choose the positioning",
        description: "We define what the site should make obvious about your work, strengths and next step.",
      },
      {
        title: "Shape the proof",
        description: "We turn projects, experience and links into a page structure visitors can scan quickly.",
      },
      {
        title: "Publish and refine",
        description: "We launch the site with SEO basics and keep it ready for future projects or profile updates.",
      },
    ],
    packageKey: "digitalFoundation",
    pricingText: "Personal portfolio websites often fit Digital Foundation when the goal is a polished professional presence with clear contact paths.",
    relatedServices: ["portfolio-websites", "business-websites", "seo-optimization", "website-maintenance"],
    relatedUseCases: ["small-business", "startups", "associations"],
    faqs: [
      {
        question: "Can the landing page use a generic label instead of a personal name?",
        answer:
          "Yes. On Websiteli's own landing page this project can be shown as a personal website while the portfolio data keeps the real project name and URL.",
      },
      {
        question: "Can Websiteli help organize projects and experience?",
        answer:
          "Yes. A portfolio build can include content structure, project summaries, contact paths and metadata so the site is useful for outreach.",
      },
      {
        question: "Is a portfolio website useful for consultants as well as job seekers?",
        answer:
          "Yes. The same structure can support consulting, speaking, applications, collaborations or a more complete professional profile.",
      },
    ],
    formIntent: "portfolio_website_consultation",
  },
  {
    slug: "associations",
    eyebrow: "Association websites",
    title: "Association, Academic and Community Websites",
    shortTitle: "Associations",
    metaTitle: "Association and Academic Website Design - Websiteli",
    metaDescription:
      "See a real academic association website and how Websiteli structures public websites for associations, communities and research organizations.",
    heroText:
      "Association websites have to serve members, visitors, partners and searchers without turning into a maze. This use case is based on the Semantic Web Science Association website.",
    projectIntro:
      "The Semantic Web Science Association website shows how a public organization can present community information, events and resources in a structured way.",
    needsTitle: "What associations and academic groups need online",
    needs: [
      "A clear explanation of the organization and its purpose.",
      "Structured content for members, events, resources and public updates.",
      "Navigation that works for both new visitors and returning community members.",
      "A maintainable site that can support changing information over time.",
    ],
    buildsTitle: "What Websiteli can build for an association website",
    builds: [
      "Association homepages, about pages, resource hubs and event sections.",
      "Information architecture for community, academic or nonprofit content.",
      "Multilingual or multi-audience structures when the organization serves more than one group.",
      "Maintenance workflows for updates, announcements and recurring content.",
    ],
    process: [
      {
        title: "Audit the information structure",
        description: "We identify the audiences, recurring content types and pages that need to be easy to find.",
      },
      {
        title: "Build reusable sections",
        description: "We create a structure for resources, updates, community information and calls to action.",
      },
      {
        title: "Support updates",
        description: "We make the website easier to maintain as events, people and public information change.",
      },
    ],
    packageKey: "growthSetup",
    pricingText: "Association websites usually fit Growth Setup when information architecture, multiple content types or multilingual structure are needed.",
    relatedServices: ["business-websites", "multilingual-websites", "website-maintenance", "client-portals"],
    relatedUseCases: ["healthcare", "small-business", "portfolio"],
    faqs: [
      {
        question: "Can Websiteli handle content-heavy association sites?",
        answer:
          "Yes. The work starts with information architecture so public pages, resources and updates are organized before design details are finalized.",
      },
      {
        question: "Can an association website include events or member resources?",
        answer:
          "Yes. Event pages, resource sections, announcements and member-oriented paths can be included depending on the scope.",
      },
      {
        question: "Can an older association website be redesigned instead of replaced all at once?",
        answer:
          "Yes. A redesign can preserve important public URLs, migrate useful content and improve structure in planned stages.",
      },
    ],
    formIntent: "association_website_consultation",
  },
  {
    slug: "small-business",
    eyebrow: "Small-business websites",
    title: "Small Business and Digital Agency Websites",
    shortTitle: "Small business",
    metaTitle: "Small Business Website Design - Websiteli",
    metaDescription:
      "See Websiteli's own website as a real example of a small-business website system with services, pricing, portfolio proof, SEO and contact paths.",
    heroText:
      "A small-business website should explain the offer, build trust and turn interested visitors into useful conversations. Websiteli's own website is the real project behind this use case.",
    projectIntro:
      "Websiteli shows how a service business can combine clear positioning, portfolio proof, pricing signals, SEO content and contact paths into one owned website.",
    needsTitle: "What small businesses need from a website",
    needs: [
      "A homepage that explains the offer without forcing visitors to guess.",
      "Service pages, pricing signals and proof that reduce friction before contact.",
      "SEO foundations and internal links that help the right pages get discovered.",
      "Forms, analytics and maintenance so the website keeps supporting the business.",
    ],
    buildsTitle: "What Websiteli can build for a small business",
    builds: [
      "Business websites, service pages, portfolio sections and contact flows.",
      "SEO metadata, schema, sitemap structure and analytics foundations.",
      "Lead-generation pages, Google Business support and simple follow-up automation.",
      "Maintenance plans for updates, monitoring and continuous improvement.",
    ],
    process: [
      {
        title: "Clarify the offer",
        description: "We define the services, audience, proof and website pages needed for qualified enquiries.",
      },
      {
        title: "Build the website system",
        description: "We create the pages, CTAs, forms, tracking and SEO foundations around the business goal.",
      },
      {
        title: "Improve after launch",
        description: "We monitor performance, add content where useful and maintain the site as the business changes.",
      },
    ],
    packageKey: "digitalFoundation",
    pricingText: "Small-business websites often start with Digital Foundation, then move into Growth Setup when more SEO pages, bookings or lead capture are needed.",
    relatedServices: ["business-websites", "seo-optimization", "lead-generation", "website-maintenance"],
    relatedUseCases: ["healthcare", "startups", "portfolio"],
    faqs: [
      {
        question: "What should a small-business website include first?",
        answer:
          "Start with the homepage, core services, proof, contact path, analytics and SEO basics. Extra pages can come after the first useful structure is live.",
      },
      {
        question: "Can Websiteli show pricing before a consultation?",
        answer:
          "Yes. Starting prices are visible, while the final quote depends on pages, languages, content, integrations and launch support.",
      },
      {
        question: "Can the same website later support automation or AI tools?",
        answer:
          "Yes. The website can become the foundation for lead follow-up, dashboards, document workflows or AI-assisted internal tools later.",
      },
    ],
    formIntent: "small_business_website_consultation",
  },
];

export const websiteUseCaseSlugs = websiteUseCases.map((useCase) => useCase.slug);

export function getWebsiteUseCaseBySlug(slug: string | undefined) {
  return websiteUseCases.find((useCase) => useCase.slug === slug);
}

export function getRelatedWebsiteUseCases(useCase: WebsiteUseCase, limit = 3) {
  return useCase.relatedUseCases
    .map((slug) => getWebsiteUseCaseBySlug(slug))
    .filter((item): item is WebsiteUseCase => Boolean(item))
    .slice(0, limit);
}

export function getWebsiteUseCaseForProject(project: Pick<PortfolioProject, "useCases">) {
  return getWebsiteUseCaseBySlug(project.useCases?.[0]);
}
