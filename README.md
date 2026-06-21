# websiteli.ch

Astro website for **websiteli.ch**, a Swiss web development service for small businesses.

The site builds as static Astro pages for Hostpoint, with a PHP pricing endpoint for server-side market resolution.

## Requirements

- Node.js 20 or newer for local builds
- PHP support on the Hostpoint server for `/api/pricing.php`
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
  deploy.sh          Hostpoint static/PHP deployment script
.github/
  workflows/         GitHub Actions build workflow
  DEPLOYMENT.md      Hostpoint PHP deployment notes
```

Most homepage text, service items, plan names, process steps, and FAQs can be edited in:

```text
src/content/site.ts
```

Country pricing for the live Hostpoint site lives in the PHP endpoint:

```text
public/api/pricing.php
```

## Build

Create the Hostpoint static/PHP production build:

```bash
npm run build
```

The deployable output is generated in:

```text
dist/
```

Deploy `dist/` to Hostpoint. Hostpoint must execute PHP files for `/api/pricing.php`; otherwise pricing will stay on the Swiss fallback.
The live domain must return JSON from:

```text
https://websiteli.ch/api/pricing.php
```

If that URL downloads PHP source, returns a 404 page, or returns HTML, PHP is not running for that path.

## Geographic Pricing

`/api/pricing.php` resolves country pricing from these headers first:

```text
x-vercel-ip-country
cf-ipcountry
x-country-code
x-forwarded-country
```

Unsupported or missing countries fall back to Switzerland (`CH`). In local development only, add `?market=HU` or another supported country code to test a market.

If no country header is available, the PHP endpoint tries a short server-side IP country lookup using the visitor IP. If that lookup fails or outbound HTTP is blocked, it falls back to Switzerland.

## Deployment

Build verification is configured through GitHub Actions in:

```text
.github/workflows/deploy.yml
```

This workflow verifies the static build and PHP endpoint file. Deployment to Hostpoint still uses the SFTP script.

On every push to the `main` branch, GitHub Actions will:

1. Install dependencies.
2. Run the pricing tests.
3. Verify that `dist/index.html` and `dist/api/pricing.php` exist.

## Useful Commands

```bash
npm install              # Install dependencies
npm run dev              # Start local development
npm run build            # Build static/PHP output into dist/
npm run test:pricing     # Build and verify backend pricing behavior
npm run verify:live      # Verify the deployed domain is running the pricing API
```
