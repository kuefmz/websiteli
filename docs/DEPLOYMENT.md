# Deployment

The site builds to static files and deploys to Hostpoint over SFTP.

## Development Environment

Requirements:

- Node.js compatible with Astro 5.
- npm.
- For deployment only: `lftp`.

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

Current deployment script targets Hostpoint via SFTP:

- Script: `scripts/deploy.sh`
- Command: `npm run deploy:hostpoint`
- Remote sync: `lftp mirror --reverse --delete --parallel=4 dist/ HOSTPOINT_TARGET_PATH`

Warning: deployment deletes remote files not present in `dist/`.

## Environment Variables

Required by `scripts/deploy.sh`:

- `HOSTPOINT_HOST`
- `HOSTPOINT_USERNAME`
- `HOSTPOINT_PASSWORD`
- `HOSTPOINT_TARGET_PATH`

The script loads `.env` if present. Do not commit secrets.

## Deployment Check

Before real deployment:

```bash
npm run build
bash scripts/deploy.sh --check
```

`--check` verifies required env vars and whether `lftp` is installed.

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

- Re-deploy a previous known-good commit after running build.
- Restore Hostpoint files from hosting backup if available.
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

No CI/CD configuration is currently present in the repository. Builds and deployment are local/manual unless external hosting automation exists outside this repo.
