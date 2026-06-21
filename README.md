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
  DEPLOYMENT.md      Legacy Hostpoint notes
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

Create a production build:

```bash
npm run build
```

The server build is generated in:

```text
.vercel/output/
```

Deploy this project to a server-capable Astro host such as Vercel. Static shared hosting cannot run `/api/pricing` or `/api/contact`.

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

## Preview Production Build

The Vercel adapter does not support `astro preview`. Use the Vercel CLI or `npm run dev` for local server testing.

## Deployment

Build verification is configured through GitHub Actions in:

```text
.github/workflows/deploy.yml
```

On every push to the `main` branch, GitHub Actions will:

1. Install dependencies.
2. Build the Astro project.
3. Verify that `.vercel/output/` exists.

## Useful Commands

```bash
npm install              # Install dependencies
npm run dev              # Start local development
npm run build            # Build server output into .vercel/output/
```
