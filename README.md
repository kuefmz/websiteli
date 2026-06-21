# websiteli.ch

Astro website for **websiteli.ch**, a Swiss web development service for small businesses.

The site uses Astro server output so pricing and contact submissions can be resolved on the backend.

## Requirements

- Node.js 20 or newer
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
  content/site.ts    Editable website content and pricing data
  layouts/           Shared page layout
  pages/             Astro pages
  styles/            Global CSS
public/
  assets/            Static images and public files
scripts/
  deploy.sh          Legacy static-host deployment script
.github/
  workflows/         GitHub Actions build workflow
  DEPLOYMENT.md      Hostpoint Node deployment notes
```

Most homepage text, service items, plan names, process steps, and FAQs can be edited in:

```text
src/content/site.ts
```

Country pricing lives in the server-only module:

```text
src/lib/pricing.server.ts
```

## Build

Create the Hostpoint Node production build:

```bash
npm run build:node
```

The standalone Node server build is generated in:

```text
dist/
```

Deploy this project only on Hostpoint if your plan can run a Node.js app/runtime. Static shared hosting cannot run `/api/pricing` or `/api/contact`.
The live domain must return JSON from:

```text
https://websiteli.ch/api/pricing
```

If that URL returns a Hostpoint/Apache 404 page, the site is still deployed as static files and geographic pricing cannot work.

## Geographic Pricing

`/api/pricing` resolves country pricing from these headers, in order:

```text
x-vercel-ip-country
cf-ipcountry
x-country-code
x-forwarded-country
```

Unsupported or missing countries fall back to Switzerland (`CH`). In local development only, add `?market=HU` or another supported country code to test a market.

Contact form submissions go through `/api/contact`, which resolves the market again on the backend before forwarding the payload. Configure one of these server environment variables for the forwarding endpoint:

```text
CONTACT_FORM_ENDPOINT
LEAD_FORM_ENDPOINT
```

## Deployment

Build verification is configured through GitHub Actions in:

```text
.github/workflows/deploy.yml
```

This workflow verifies the Node server build. It does not upload to Hostpoint automatically because Hostpoint must first confirm a Node.js app/runtime exists for the plan.

On every push to the `main` branch, GitHub Actions will:

1. Install dependencies.
2. Run the pricing tests.
3. Build the standalone Node server.
4. Verify that `dist/server/entry.mjs` exists.

## Useful Commands

```bash
npm install              # Install dependencies
npm run dev              # Start local development
npm run build:node       # Build standalone Node server output into dist/
npm run start:node       # Run the standalone Node server locally
npm run test:pricing     # Build and verify backend pricing behavior
npm run verify:live      # Verify the deployed domain is running the pricing API
```
