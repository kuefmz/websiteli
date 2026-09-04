export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  description: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  expectedImage?: string;
  tags: string[];
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
    slug: "movere-clinic",
    name: "Movere Clinic",
    category: "Healthcare website",
    description: "A clean healthcare website designed around trust, treatment information and patient enquiries.",
    url: "https://movereclinic.com/",
    image: "/images/portfolio/movere-clinic.webp",
    imageAlt: "Movere Clinic homepage screenshot showing the hero section and healthcare service positioning.",
    tags: ["Healthcare", "Responsive", "SEO"],
    featured: true,
    verifiedUrl: true,
  },
  {
    slug: "slap-ai",
    name: "Slap AI",
    category: "Product / ecommerce website",
    description: "A bold product landing page designed to introduce the Slap AI physical product and capture early demand.",
    url: "https://slap-ai.com/",
    image: "/images/portfolio/slap-ai.webp",
    imageAlt: "Slap AI product landing page screenshot with bold physical product positioning and early demand messaging.",
    tags: ["AI", "Landing page", "Conversion"],
    featured: true,
    verifiedUrl: true,
  },
  {
    slug: "jenifer-ciuciu-kiss",
    name: "Jenifer Ciuciu-Kiss",
    category: "Personal portfolio",
    description: "A professional portfolio presenting experience, projects and technical expertise.",
    url: "https://jeniferciuciukiss.com/",
    image: "/images/portfolio/jenifer-ciuciu-kiss.webp",
    imageAlt: "Jenifer Ciuciu-Kiss personal portfolio homepage screenshot with professional positioning and project links.",
    tags: ["Portfolio", "Personal brand", "Responsive"],
    featured: true,
    verifiedUrl: true,
  },
  {
    slug: "before-you-trust",
    name: "Before You Trust",
    category: "Trust research web application",
    description: "A public-web research tool designed to help people review identity-related findings before deciding who or what to trust.",
    url: "https://beforeyoutrust.org/",
    expectedImage: "/images/portfolio/before-you-trust.webp",
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
    expectedImage: "/images/portfolio/orgelia.webp",
    tags: ["Marketplace", "Discovery", "Maps", "Multilingual"],
    featured: true,
    verifiedUrl: true,
  },
  {
    slug: "semantic-web-science-association",
    name: "Semantic Web Science Association",
    category: "Academic association website",
    description: "A structured public website for the Semantic Web Science Association and its community activities.",
    url: "https://swsa.semanticweb.org/",
    image: "/images/portfolio/swsa.webp",
    imageAlt: "Semantic Web Science Association homepage screenshot with association content and event information.",
    tags: ["Association", "Information architecture", "Content"],
    verifiedUrl: true,
  },
  {
    slug: "websiteli",
    name: "Websiteli",
    category: "Agency website",
    description: "Websiteli's own multilingual website for small-business websites, automation and digital services.",
    url: "https://websiteli.ch/en/",
    image: "/images/portfolio/websiteli.webp",
    imageAlt: "Websiteli agency homepage screenshot showing the website-first hero and service positioning.",
    tags: ["Multilingual", "SEO", "Forms"],
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
