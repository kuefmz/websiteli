export const portfolioUseCaseKeys = ["healthcare", "startups", "portfolio", "associations", "small-business"] as const;
export type PortfolioUseCaseKey = (typeof portfolioUseCaseKeys)[number];

export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  description: string;
  useCases?: PortfolioUseCaseKey[];
  url?: string;
  image?: string;
  imageAlt?: string;
  expectedImage?: string;
  tags: string[];
  projectFeatures: string[];
  businessOutcomes: string[];
  featured?: boolean;
  verifiedUrl: boolean;
  verificationNote?: string;
};

export type PortfolioConcept = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  tags: string[];
  requestIntent: string;
};

export const realPortfolioProjects: PortfolioProject[] = [
  {
    slug: "slap-ai",
    name: "Slap AI",
    category: "Product / ecommerce website",
    description: "A bold product landing page designed to introduce the Slap AI physical product and capture early demand.",
    useCases: ["startups"],
    url: "https://slap-ai.com/",
    image: "/images/portfolio/slap-ai.webp",
    imageAlt: "Slap AI product landing page screenshot with bold physical product positioning and early demand messaging.",
    tags: ["AI", "Landing page", "Conversion"],
    projectFeatures: ["High-contrast launch page", "Product-first messaging", "Ad-ready CTA structure", "Responsive product story", "Marketing setup foundation"],
    businessOutcomes: [
      "Visitors can quickly understand the product promise.",
      "Campaigns, launch posts and ads have one focused destination.",
      "The marketing setup can support GA4, Meta Business and conversion tracking before advertising starts.",
      "The page supports product validation conversations before a larger build.",
    ],
    featured: true,
    verifiedUrl: true,
  },
  {
    slug: "movere-clinic",
    name: "Movere Clinic",
    category: "Healthcare website",
    description: "A clean healthcare website designed around trust, treatment information and patient enquiries.",
    useCases: ["healthcare"],
    url: "https://movereclinic.com/",
    image: "/images/portfolio/movere-clinic.webp",
    imageAlt: "Movere Clinic homepage screenshot showing the hero section and healthcare service positioning.",
    tags: ["Healthcare", "Responsive", "SEO"],
    projectFeatures: ["Patient-focused service structure", "Trust-led visual direction", "Responsive clinic information pages", "Clear enquiry path"],
    businessOutcomes: [
      "Patients can understand the clinic offer before contacting the practice.",
      "Treatment information is easier to scan on mobile and desktop.",
      "The public website supports trust, discovery and patient enquiries.",
    ],
    featured: true,
    verifiedUrl: true,
  },
  {
    slug: "jenifer-ciuciu-kiss",
    name: "Jenifer Ciuciu-Kiss",
    category: "Personal portfolio",
    description: "A professional portfolio presenting experience, projects and technical expertise.",
    useCases: ["portfolio"],
    url: "https://jeniferciuciukiss.com/",
    image: "/images/portfolio/jenifer-ciuciu-kiss.webp",
    imageAlt: "Jenifer Ciuciu-Kiss personal portfolio homepage screenshot with professional positioning and project links.",
    tags: ["Portfolio", "Personal brand", "Responsive"],
    projectFeatures: ["Personal positioning", "Project and experience sections", "Owned professional profile", "Responsive portfolio layout"],
    businessOutcomes: [
      "Experience and proof live in one branded place.",
      "The website supports applications, outreach and direct references.",
      "Visitors can scan background, skills and projects quickly.",
    ],
    featured: true,
    verifiedUrl: true,
  },
  {
    slug: "before-you-trust",
    name: "Before You Trust",
    category: "Trust research web application",
    description: "A public-web research tool designed to help people review identity-related findings before deciding who or what to trust.",
    url: "https://beforeyoutrust.org/",
    image: "/images/portfolio/before-you-trust.webp",
    imageAlt: "Before You Trust project preview showing the public-web identity research search experience.",
    tags: ["Web application", "Search", "Trust", "Privacy"],
    featured: true,
    verifiedUrl: true,
  },
  {
    slug: "orgelia",
    name: "Orgelia",
    category: "Product discovery platform",
    description: "A multilingual intimate-product and shop discovery platform with structured listings, maps and comparison-focused experiences.",
    url: "https://orgelia.com/",
    image: "/images/portfolio/orgelia.webp",
    imageAlt: "Orgelia project preview showing the multilingual shop and intimate-product discovery experience.",
    tags: ["Marketplace", "Discovery", "Maps", "Multilingual"],
    featured: true,
    verifiedUrl: true,
  },
  {
    slug: "semantic-web-science-association",
    name: "Semantic Web Science Association",
    category: "Academic association website",
    description: "A structured public website for the Semantic Web Science Association and its community activities.",
    useCases: ["associations"],
    url: "https://swsa.semanticweb.org/",
    image: "/images/portfolio/swsa.webp",
    imageAlt: "Semantic Web Science Association homepage screenshot with association content and event information.",
    tags: ["Association", "Information architecture", "Content"],
    projectFeatures: ["Clear association information architecture", "Community and event content paths", "Academic audience-oriented structure", "Public resource presentation"],
    businessOutcomes: [
      "Members and researchers can find association information.",
      "Community activities have a public home.",
      "The site supports credibility for an academic organization.",
    ],
    verifiedUrl: true,
  },
  {
    slug: "websiteli",
    name: "Websiteli",
    category: "Agency website",
    description: "Websiteli's own multilingual website for small-business websites, automation and digital services.",
    useCases: ["small-business"],
    url: "https://websiteli.ch/en/",
    image: "/images/portfolio/websiteli.webp",
    imageAlt: "Websiteli agency homepage screenshot showing the website-first hero and service positioning.",
    tags: ["Multilingual", "SEO", "Forms"],
    projectFeatures: ["Multilingual service structure", "Portfolio-led trust sections", "Pricing and package signals", "Contact and attribution flow"],
    businessOutcomes: [
      "Visitors can compare services and pricing before contacting.",
      "Small-business website requests route into clearer conversations.",
      "The website supports ongoing content, SEO and service expansion.",
    ],
    verifiedUrl: true,
  },
];

export const portfolioConcepts: PortfolioConcept[] = [
  {
    slug: "shopify-consultant-portfolio",
    name: "Shopify Consultant Portfolio",
    category: "Demo website",
    description: "A public demo showing how a service portfolio can support cold outreach and lead capture.",
    image: "/images/portfolio/shopify-consultant-portfolio-demo.webp",
    tags: ["Portfolio", "Lead capture", "SEO"],
    requestIntent: "request_shopify_portfolio_demo",
  },
  {
    slug: "restaurant-cafe-website",
    name: "Restaurant / Cafe Website",
    category: "Concept",
    description: "A reusable concept for menus, opening hours, reservations and local search.",
    tags: ["Restaurant", "Bookings", "Local SEO"],
    requestIntent: "request_restaurant_concept",
  },
  {
    slug: "local-service-website",
    name: "Local Service Website",
    category: "Concept",
    description: "A practical local business structure for trust, service areas and quote requests.",
    tags: ["Local business", "Quote forms", "Trust"],
    requestIntent: "request_local_service_concept",
  },
];

export function getFeaturedPortfolioProjects(limit = 5) {
  return realPortfolioProjects.filter((project) => project.featured || project.verifiedUrl).slice(0, limit);
}

export function getRealPortfolioProjectBySlug(slug: string | undefined) {
  return realPortfolioProjects.find((project) => project.slug === slug);
}

export function getProjectsByUseCase(useCase: PortfolioUseCaseKey) {
  return realPortfolioProjects.filter((project) => project.useCases?.includes(useCase));
}
