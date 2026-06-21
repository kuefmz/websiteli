# websiteli.ch

Astro website for **websiteli.ch**, a Swiss web development service for small businesses.

The site is built as a static Astro project and can be deployed to Hostpoint shared hosting by uploading the generated `dist/` folder.

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
  deploy.sh          Hostpoint SFTP deployment script
.github/
  workflows/         GitHub Actions deployment workflow
  DEPLOYMENT.md      Hostpoint deployment instructions
```

Most homepage text, service items, prices, process steps, and FAQs can be edited in:

```text
src/content/site.ts
```

## Build

Create a production build:

```bash
npm run build
```

The static website is generated in:

```text
dist/
```

Hostpoint should serve the files from `dist/`; it does not need Astro or Node.js on the server.

## Preview Production Build

After building, preview the production output locally:

```bash
npm run preview
```

## Deployment

Deployment is configured through GitHub Actions in:

```text
.github/workflows/deploy.yml
```

On every push to the `main` branch, GitHub Actions will:

1. Install dependencies.
2. Build the Astro project.
3. Verify that `dist/` exists.
4. Upload `dist/` to Hostpoint over SFTP.
5. Remove remote files that no longer exist locally.

Required GitHub secrets:

```text
HOSTPOINT_HOST
HOSTPOINT_USERNAME
HOSTPOINT_PASSWORD
HOSTPOINT_TARGET_PATH
```

Full deployment instructions are in:

```text
.github/DEPLOYMENT.md
```

## Local Deployment Test

Only run this when the Hostpoint environment variables are configured locally:

```bash
export HOSTPOINT_HOST="your-hostpoint-sftp-host"
export HOSTPOINT_USERNAME="your-hostpoint-main-account"
export HOSTPOINT_PASSWORD="your-hosting-login-password"
export HOSTPOINT_TARGET_PATH="/home/your-username/www/websiteli.ch"

npm run build
npm run deploy:hostpoint
```

Be careful: deployment fully synchronizes the target folder. Remote files not present in `dist/` will be deleted.

## Useful Commands

```bash
npm install              # Install dependencies
npm run dev              # Start local development
npm run build            # Build static site into dist/
npm run preview          # Preview production build
npm run deploy:hostpoint # Deploy dist/ to Hostpoint with configured env vars
```
