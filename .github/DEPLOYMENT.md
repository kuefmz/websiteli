# Deployment

This project builds a static Astro site and deploys it to GitHub Pages.

Production domain:

```text
https://websiteli.ch/
```

The Astro config already uses `site: "https://websiteli.ch"`. Because the site will be served from the custom domain root, do not add an Astro `base` value for the GitHub repository path.

## GitHub Pages Deployment

The GitHub Action in `.github/workflows/deploy.yml` runs on pushes to `main` and can also be started manually from the Actions tab.

The workflow:

1. Installs dependencies with `npm ci`.
2. Runs `npm run test:pricing`, which builds the static site and verifies pricing/link behavior.
3. Verifies the generated `dist/` output.
4. Uploads `dist/` as a GitHub Pages artifact.
5. Deploys the artifact with `actions/deploy-pages`.

`public/CNAME` contains `websiteli.ch` so the generated artifact records the intended custom domain. The GitHub repository Pages setting still needs to be configured; the file alone does not attach the domain when using GitHub Actions.

## Repository Settings

In GitHub, open the repository settings:

```text
Settings -> Pages
```

Set:

```text
Source: GitHub Actions
Custom domain: websiteli.ch
```

After DNS resolves, enable:

```text
Enforce HTTPS
```

## DNS

At the DNS provider for `websiteli.ch`, point the apex domain to GitHub Pages.

Use GitHub's current Pages IP addresses for apex `A` records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

If available in your DNS panel, also add GitHub's `AAAA` records for IPv6:

```text
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

If you also want `www.websiteli.ch`, add a `CNAME` record for `www` that points to:

```text
kuefmz.github.io
```

Then decide whether `www` should redirect to the apex domain or be configured as an additional domain in GitHub Pages.

## Verification

Before pushing:

```bash
npm run build
npm run test:pricing
```

After deployment:

- Open `https://websiteli.ch/` and confirm it redirects to `/en/`.
- Open one non-English homepage.
- Open `/en/services-pricing/`, `/en/portfolio/`, `/en/blog/`, one blog article, `/privacy/`, and `/impressum/`.
- Check `https://websiteli.ch/sitemap-index.xml`.
- Check `https://websiteli.ch/rss.xml`.
- Test GA DebugView with `debug_mode=true`.
- Test the contact form only with a clearly marked test submission.
