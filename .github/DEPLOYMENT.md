# Deployment

This project uses static Astro output plus a PHP endpoint so Hostpoint can run pricing code without a Node.js backend.

Deploy it to Hostpoint only if PHP execution is enabled for the website. Static file serving alone cannot run the geographic pricing endpoint.

Upload the full `dist/` folder, including `dist/api/pricing.php`.

## Hostpoint PHP Pricing

Build the site:

```bash
npm run build
```

Deploy with the existing SFTP script:

```bash
npm run deploy:hostpoint
```

The success test is:

```text
https://websiteli.ch/api/pricing.php
```

That URL must return JSON. If it returns PHP source, HTML, or a 404 page, PHP is not running for that path.

The page starts with Swiss fallback prices and updates visible prices after fetching `/api/pricing.php`.
