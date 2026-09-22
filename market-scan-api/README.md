# Websiteli Market Scan API

Backend for the Websiteli Market Scan lead-generation tool.

## What the MVP does

Given one public website URL, it:

- crawls up to 6 same-domain pages;
- extracts positioning, headings, CTA text, forms and repeated keywords;
- searches Reddit for related discussions;
- detects buyer-intent and pain-point language;
- searches the public web for competitor candidates and review mentions;
- derives content opportunities and ad angles;
- returns every source URL it used so the report stays auditable.

The MVP intentionally labels review data as **review mentions** and competitors as **competitor candidates**. We should only promote stronger claims once a dedicated review/search provider is connected.

## Run locally

```bash
cd market-scan-api
npm install
npm run dev
```

The API starts at `http://localhost:8787`.

Test it:

```bash
curl -X POST http://localhost:8787/api/scan \
  -H "content-type: application/json" \
  -d '{"url":"https://websiteli.ch"}'
```

## Production environment

- `PORT` — supplied by the host
- `ALLOWED_ORIGINS` — comma-separated frontend origins, e.g. `https://websiteli.ch`

Deploy this folder as a small Node service (Render, Railway, Fly.io, AWS, etc.). Then build the Astro frontend with:

```bash
PUBLIC_MARKET_SCAN_API_URL=https://YOUR-API-HOST npm run build
```

No API keys are required for this first version. Public search providers may rate-limit automated requests, so the next production step should replace fallback search adapters with a supported search API.
