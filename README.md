# websiteli.ch

Astro website for **websiteli.ch**, a Swiss web development service for small businesses.

The site builds as static Astro pages for Hostpoint. Pricing is resolved in the browser from an obfuscated frontend table and the visitor's browser IP country.

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
  content/site.ts    Editable website content and pricing data
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

Most homepage text, service items, plan names, process steps, and FAQs can be edited in:

```text
src/content/site.ts
```

Country pricing is embedded in the homepage script in an obfuscated form:

```text
src/pages/index.astro
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

## Geographic Pricing

The browser calls `ipwho.is` to detect the visitor's country from their current IP/VPN. Unsupported or missing countries fall back to Switzerland (`CH`). Add `?market=HU` or another supported country code to test a market manually.

The selected market code is stored in a `websiteli_market` cookie so repeat visits do not need another lookup.

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
