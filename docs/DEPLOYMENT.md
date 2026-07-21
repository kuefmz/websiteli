# Deployment

The site builds to static files and deploys to GitHub Pages with the custom domain `https://websiteli.ch`.

## Development Environment

Requirements:

- Node.js compatible with Astro 5.
- npm.

Install:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Test:

```bash
npm run test:pricing
```

## Build Output

Astro writes static output to:

```text
dist/
```

Sitemap integration writes sitemap files during build.

## Hosting

Current production hosting uses GitHub Pages:

- Workflow: `.github/workflows/deploy.yml`
- Source in GitHub settings: `GitHub Actions`
- Custom domain: `websiteli.ch`
- Build output deployed: `dist/`

`public/CNAME` records the intended custom domain in the generated artifact, but the GitHub repository Pages setting still needs to be configured.

The repository still contains the older Hostpoint SFTP script as a fallback, but it is no longer the primary deployment path.

## Environment Variables

Required only by the legacy Hostpoint script:

- `HOSTPOINT_HOST`
- `HOSTPOINT_USERNAME`
- `HOSTPOINT_PASSWORD`
- `HOSTPOINT_TARGET_PATH`

The script loads `.env` if present. Do not commit secrets.

## GitHub Pages Setup

In GitHub, open:

```text
Settings -> Pages
```

Set:

```text
Source: GitHub Actions
Custom domain: websiteli.ch
```

At the DNS provider for `websiteli.ch`, point the apex domain to GitHub Pages using GitHub's current apex `A` records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Add GitHub's `AAAA` records too if your DNS provider supports IPv6:

```text
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

For `www.websiteli.ch`, add a CNAME record pointing to:

```text
kuefmz.github.io
```

After DNS is working in GitHub Pages, enable:

```text
Enforce HTTPS
```

## Release Checklist

Before deploying:

- `npm run test:pricing` passes.
- Important routes were manually checked in `dist/` or local preview.
- UTM redirect behavior still preserves query strings.
- Contact/newsletter forms still point to the expected Google Apps Script endpoint.
- Sitemap generated.
- No secrets are in git.
- Documentation updated if behavior changed.

## Rollback Process

There is no automated rollback script.

Manual rollback options:

- Re-deploy a previous known-good commit by reverting or pushing that commit to `main`.
- Revert the problematic commit and redeploy.

## Deployment Verification

After deployment:

- Open `https://websiteli.ch/` and confirm redirect to `/en/`.
- Open one non-English homepage.
- Open `/en/services-pricing/`, `/en/portfolio/`, `/en/blog/`, one blog article, `/privacy/`, `/impressum/`.
- Check `https://websiteli.ch/sitemap-index.xml`.
- Check `https://websiteli.ch/rss.xml`.
- Test GA DebugView with `debug_mode=true`.
- Test contact form only with a clearly marked test submission.

## CI/CD

The GitHub Pages workflow runs on pushes to `main` and manual `workflow_dispatch` runs.
