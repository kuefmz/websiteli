# Websiteli Market Scan API

Backend for the Websiteli Market Scan lead-generation tool.

## Product flow

A visitor enters one public website URL on `/{locale}/market-scan/`. The frontend calls this API, renders the live report, offers an explicit newsletter/report opt-in through Websiteli's existing Google Apps Script newsletter endpoint, and finishes with a Calendly implementation CTA.

No email is required to run or view the scan. Newsletter consent remains explicit.

## What the MVP now analyses

Given one public website URL, it:

- prioritises and crawls up to 8 same-domain pages;
- extracts title/meta/H1/CTA/form/contact/analytics/schema/mobile signals;
- calculates a transparent website opportunity score from 9 observable checks;
- extracts repeated topical keywords;
- searches Reddit and public web results for buyer-intent and pain language;
- discovers competitor candidates;
- discovers public review mentions;
- creates decision-focused content opportunities;
- creates ad/message angles based on observed signals;
- produces up to 7 prioritised website/growth actions;
- returns source URLs for external findings so the report is auditable.

The UI intentionally says **review mentions** and **competitor candidates**. These are discovery signals, not complete platform datasets.

## Lead capture

The Market Scan uses the **same newsletter endpoint and payload shape as the existing Websiteli newsletter**:

- `type: "newsletter"`
- `campaign: "market-scan-report"`
- privacy consent + policy version
- source URL, referrer and attribution/UTM metadata
- scanned domain and scan summary metadata

This lets Market Scan subscriptions enter the existing newsletter workflow without introducing another lead endpoint.

## Run locally

Terminal 1:

```bash
cd market-scan-api
npm install
npm run dev
```

Terminal 2, from the repository root:

```bash
PUBLIC_MARKET_SCAN_API_URL=http://localhost:8787 npm run dev
```

Test the API directly:

```bash
curl -X POST http://localhost:8787/api/scan \
  -H "content-type: application/json" \
  -d '{"url":"https://websiteli.ch"}'
```

Health check:

```bash
curl http://localhost:8787/health
```

## Production environment

- `PORT` — supplied by the host.
- `ALLOWED_ORIGINS` — comma-separated frontend origins, normally `https://websiteli.ch`.

Deploy `market-scan-api/` as a Node web service. Then build/deploy the existing static Astro frontend with:

```bash
PUBLIC_MARKET_SCAN_API_URL=https://YOUR-API-HOST npm run build
```

Suggested free MVP deployment: connect the existing GitHub repository to a Node-capable host and set the service root directory to `market-scan-api`.

## Accuracy and production notes

The scanner never fabricates large counts. Metrics are the number of records actually returned during that scan.

Public search providers can rate-limit automated requests. A zero-result section can therefore mean that a provider returned no usable results, not that the market contains no discussions. For a commercial/high-volume version, replace the fallback public-search adapters with supported search/review APIs.

The website opportunity score is a diagnostic heuristic, not a prediction of revenue or conversion rate.
