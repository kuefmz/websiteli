# websiteli.ch

Astro website for **websiteli.ch**, a Swiss digital agency for AI-powered websites, business automation, AI integrations, internal tools, dashboards, and custom web applications.

The site builds as static Astro pages for Hostpoint. Language routes and pricing are intentionally separate: `/en`, `/de`, `/hu`, `/pl`, `/es`, and `/fr` control copy, while the browser pricing runtime resolves the visitor's market/currency from their IP location.

## Requirements

- Node.js 20 or newer for local builds
- npm

This project currently uses Astro 5, which builds successfully with Node 20.

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the local development server:

```bash
npm run dev
```

Astro will print the local preview URL, usually:

```text
http://localhost:4321/
```

## Project Structure

```text
src/
  components/        Reusable Astro components
  config/pricing.json Market-based pricing data
  content/locales/   Editable localized website content
  layouts/           Shared page layout
  pages/             Astro pages
  styles/            Global CSS
public/
  assets/            Static images and public files
scripts/
  deploy.sh          Hostpoint static deployment script
.github/
  workflows/         GitHub Actions build workflow
  DEPLOYMENT.md      Hostpoint deployment notes
```

Localized homepage, package, demo, about, contact, and outreach copy can be edited in:

```text
src/content/locales/
```

Service SEO pages are generated from:

```text
src/content/services.ts
src/pages/[locale]/services/[service]/index.astro
```

Industry SEO pages are generated from:

```text
src/content/industries.ts
src/pages/[locale]/industries/[industry]/index.astro
```

Market pricing is configured separately from language content:

```text
src/config/pricing.json
```

## Build

Create the Hostpoint static production build:

```bash
npm run build
```

The deployable output is generated in:

```text
dist/
```

Deploy `dist/` to Hostpoint. No backend or server runtime is required for pricing.

## Location-Based Pricing

Pricing is resolved in the browser from `src/config/pricing.json`.

Resolution order:

1. Deployment-provided country metadata if exposed to the page.
2. Browser-side IP country lookup services.
3. `DEFAULT` pricing, which currently uses EUR.

EU countries fall back to the `EU` pricing config unless a dedicated country config exists. Visitors cannot manually change currency; language route and pricing market remain separate.

## Inquiry Tracking

The contact form posts JSON to `PUBLIC_CONTACT_FORM_ENDPOINT` or `PUBLIC_LEAD_FORM_ENDPOINT`. This is expected to be the Google Apps Script / Google Sheets bridge; keep credentials and sheet access inside that backend, not in this repo.

New submissions include the original fields plus metadata columns/keys such as:

```text
packageKey, locale, country, pricingMarket, currency, priceShown,
sourcePath, currentUrl, referrer, utm_source, utm_medium, utm_campaign,
utm_term, utm_content, timestamp, userAgent
```

If the Google Sheet has fixed columns, add these columns there. Older submissions still work because the frontend still sends the previous core fields.

## Adding Services

Add a service entry in `src/content/services.ts`. Each service should include:

- slug, title, category, description
- problem and solution copy
- benefits and ideal clients
- technologies
- pricing guidance through a package key
- related services for internal links

The dynamic route automatically adds canonical metadata, hreflang alternates, Service schema, FAQ schema, breadcrumbs, CTAs, and analytics events.

## Adding Industries

Add an industry entry in `src/content/industries.ts`. Each industry should include:

- challenges
- website recommendations
- automation opportunities
- AI opportunities
- SEO strategy
- related service slugs
- one fictional or generic demo idea

Do not invent testimonials, reviews, performance metrics, or completed client projects.

## Automation Showcases

Homepage automation chips come from `automationShowcaseTasks` in `src/content/services.ts`. Use plain business-language task names such as invoice sending, PDF processing, CRM updates, report generation, or Google Workspace automation.

## Demo Gallery

Demo content lives in `src/content/demos/index.ts`.

- `demoSlugs` controls redirect-compatible published demo routes.
- The portfolio gallery shows generic or fictional concepts, plus public Websiteli-owned demos.
- Personalized prospect demos should not be exposed publicly.
- Add `websiteUrl` only when there is a real public demo to open.
- Do not label a concept as a completed client project unless it is real and approved for publication.

## Blog Posts

Blog posts live in `src/content/blog/posts/` and are registered in `src/content/blog/index.ts`.

Use one TypeScript file per post, with all locale translations inside the post file's `translations` object. Blog article pages automatically render metadata, article schema, FAQ schema, breadcrumbs, CTAs, sharing, related links, and newsletter conversion paths.

## SEO

The site uses:

- clean canonicals
- hreflang alternates
- generated sitemap
- OpenGraph and Twitter metadata
- Organization, WebSite, LocalBusiness, Service, FAQ, Breadcrumb, BlogPosting and SoftwareApplication schema where appropriate
- static Astro output for performance

When adding SEO-sensitive pages, run:

```bash
npm run build
```

Then inspect generated HTML under `dist/` for canonical, title, description, structured data and sitemap inclusion.

## Deployment

Build verification is configured through GitHub Actions in:

```text
.github/workflows/deploy.yml
```

This workflow verifies the static build. Deployment to Hostpoint still uses the SFTP script.

On every push to the `main` branch, GitHub Actions will:

1. Install dependencies.
2. Run the pricing tests.
3. Verify that `dist/index.html` exists.

## Useful Commands

```bash
npm install              # Install dependencies
npm run dev              # Start local development
npm run build            # Build static output into dist/
npm run test:pricing     # Build and verify frontend pricing behavior
npm run deploy:hostpoint # Deploy dist/ to Hostpoint
```
