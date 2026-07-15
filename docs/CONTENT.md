# Content Strategy

Websiteli content should educate small businesses while moving qualified readers toward consultation or newsletter signup.

## Core Themes

- Business website ownership.
- Professional websites versus social-only or AI-only presence.
- SEO and Google visibility.
- Analytics and measurable lead generation.
- Practical AI and automation for small businesses.
- Website maintenance and long-term reliability.
- Local business conversion paths: reservations, quote requests, booked calls, forms, newsletters.

## Tone Of Voice

- Practical and direct.
- Calmly authoritative, not buzzword-heavy.
- Business-result oriented.
- Avoid framing Websiteli as merely an AI website generator.
- Emphasize ownership, maintainability, analytics, SEO, and conversion.

## Blog Strategy

Source files:

- Blog loader/helpers: `src/content/blog/index.ts`
- Blog post files: `src/content/blog/posts/{post-slug}.ts`
- Blog types: `src/content/blog/types.ts`

AI/SEO article architecture is documented in `docs/AI_BLOG_OPTIMIZATION.md`.

Current published article:

- `why-ai-generated-websites-are-not-enough-for-a-real-business`
- `small-business-website`
- `business-website-features`

Every blog post must:

- Exist as one post file under `src/content/blog/posts/{slug}.ts`.
- Keep all locale versions inside that file's `translations` object.
- Have localized title, description, category, tags, reading time, excerpt, body, and FAQs for every supported locale.
- Include CTAs through the article template, not by duplicating markup in post content.
- Include related links to internal conversion pages.
- Prefer hand-written `summary`, `keyTakeaways`, and `chatGptPrompts` for important posts; otherwise they are generated automatically.
- Avoid public future-roadmap sections.

English remains the source/default language for writing. Current published posts should include every supported locale in the same post file, so public localized routes render translated content rather than falling back.

## Demo Sites

Source: `src/content/demos/index.ts`.

- `allDemoSlugs` contains possible/demo model entries.
- `demoSlugs` controls published demos.
- Current published demo: `shopify-consultant-portfolio`.

Do not publish a demo by adding content alone; add it to `demoSlugs` only when the demo is ready and QA'd.

## Service SEO Pages

Source: `src/content/services.ts`.

Service pages are generated at `/:locale/services/:service/`. Each service entry should include a category, problem, solution, benefits, ideal clients, technologies, pricing guidance, and related service slugs. The route adds canonical metadata, hreflang alternates, Service schema, FAQ schema, Breadcrumb schema, internal links, and conversion CTAs.

Current service categories:

- Websites
- Automation
- AI
- Custom software

Use the registry for homepage service cards, Services & Pricing links, and footer links. Avoid creating one-off service pages outside the registry.

## Industry SEO Pages

Source: `src/content/industries.ts`.

Industry pages are generated at `/:locale/industries/:industry/`. Each industry entry should include challenges, website recommendations, automation opportunities, AI opportunities, SEO strategy, related services, and a fictional or generic demo idea. Do not invent testimonials, reviews, rankings, revenue impact, or completed client results.

## Automation Showcase

Homepage automation chips come from `automationShowcaseTasks` in `src/content/services.ts`. Keep entries non-technical and outcome-oriented so business owners immediately understand the task being automated.

## Example Projects

Source: `src/content/example-projects/index.ts`.

Example projects are illustrative business opportunity analyses, not real client case studies. Keep disclaimers visible and accurate.

Current project slugs:

- `restaurant-visibility`
- `consultant-lead-generation`
- `cold-outreach-verifiable-brand`
- `ai-customer-assistant`
- `analytics-visibility`

## Calls To Action

Primary CTAs:

- Contact/consultation request.
- Package CTAs from pricing cards.

Secondary CTAs:

- Newsletter signup.
- Demo visits.
- WhatsApp/email.
- Blog sharing.

Blog CTA implementation is centralized in `ArticleCTA.astro`. Lead form implementation is centralized in `CTASection.astro`.

## Newsletter

Newsletter form lives in the footer and is present on pages using `Layout.astro`. Article CTAs link to `#newsletter`. Keep newsletter copy localized in `Footer.astro` unless it is refactored into a content registry.

## Internal Linking Strategy

- Homepage links to services/pricing, portfolio, contact, and demos.
- Services/pricing links to portfolio and contact.
- Portfolio links demos to illustrative analyses and contact.
- Blog articles link to services/pricing, portfolio, contact, and newsletter.
- Article related links should use `/en/` in content and be localized by article template replacement unless more robust per-locale links are introduced.

## Adding A Blog Post

Create a new post source file:

`src/content/blog/posts/my-post-slug.ts`

Use this structure:

```ts
import type { BlogPostSource } from "../types";

export default {
  slug: "my-post-slug",
  published: true,
  image: "/assets/swiss-ai-websites-hero.png",
  author: "Websiteli",
  date: "2026-06-29",
  updated: "2026-06-29",
  related: ["/en/services-pricing/", "/en/contact/"],
  translations: {
    en: {
      title: "My English Blog Post",
      description: "A short SEO description for search and social previews.",
      category: "Website Strategy",
      tags: ["website", "SEO"],
      language: "en",
      readingTime: "7 min read",
      audience: "Small business owners",
      excerpt: "Short summary used on the blog listing card.",
      faqs: [{ question: "Example question?", answer: "Example answer." }],
      body: `## First section

Write the article body here.`,
    },
  },
} satisfies BlogPostSource;
```

To add translations, add more locale keys to the same `translations` object. Keep the top-level `slug` shared across all languages.

Demo content fields are defined by `DemoContent` in `src/content/demos/index.ts`.

Example project fields are defined by `ExampleProjectContent` in `src/content/example-projects/index.ts`.

## Writing Guidelines

- Use one clear H1 per page.
- Use H2s to answer concrete business questions.
- Put value proposition in supporting copy, not vague headlines.
- Avoid unsupported promises about rankings or revenue.
- Do not invent client results; use illustrative language unless real proof is available.
- Include a next step in every major page.
- Maintain local-market wording where relevant.

## Content QA

Before publishing new content:

- Verify the English source post exists and has required frontmatter.
- Verify the post file includes every supported locale key in `translations`.
- Verify metadata and schema use localized values.
- Verify links resolve.
- Verify CTAs work and are not visually overpowering.
- Verify no unpublished roadmap/future ideas are shown to visitors.
