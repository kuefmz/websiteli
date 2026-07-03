# websiteli.ch

Astro website for **websiteli.ch**, a Swiss digital setup, automation, and AI service for small businesses.

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

Localized homepage, service, package, demo, about, contact, and outreach copy can be edited in:

```text
src/content/locales/
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

The contact form posts JSON to `PUBLIC_CONTACT_FORM_ENDPOINT` or `PUBLIC_LEAD_FORM_ENDPOINT`. The reservation form posts JSON to `PUBLIC_RESERVATION_FORM_ENDPOINT`, with `PUBLIC_CONTACT_FORM_ENDPOINT` as a fallback when both forms share the same Google Apps Script web app. Keep credentials and sheet access inside that backend, not in this repo.

New submissions include the original fields plus metadata columns/keys such as:

```text
packageKey, locale, country, pricingMarket, currency, priceShown,
sourcePath, currentUrl, referrer, utm_source, utm_medium, utm_campaign,
utm_term, utm_content, timestamp, userAgent
```

If the Google Sheet has fixed columns, add these columns there. Older submissions still work because the frontend still sends the previous core fields.

Reservation submissions send `type: "reservation"` with:

```text
fullName, businessName, email, phone, country, websiteOrSocial,
projectType, projectTypeKey, preferredLanguage, description,
consentAccepted, sourceUrl, referrer, submittedAt, userAgent
```

The matching Apps Script handler is documented in:

```text
docs/GOOGLE_APPS_SCRIPT_RESERVATIONS.md
```

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
