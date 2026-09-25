# Websiteli Market Scan API

Python/FastAPI backend for the Websiteli Market Scan lead-generation tool.

## Product flow

A visitor enters one public website URL on `/{locale}/market-scan/`. The Astro frontend calls this API and renders the complete detailed report for a 90-second free preview. The interface then locks the report and asks for an email address so the same full report can be delivered by email. The report remains cached server-side for up to one hour for email delivery.

The same submission uses Websiteli’s existing Google Apps Script endpoint with a dedicated `type: "market-scan-report"` payload and campaign `market-scan-report`. Because the report is intentionally visible during the timed preview, its data is returned to the browser during that preview; the lock is a conversion/UI gate rather than a security boundary.

## Stack

- Python 3.12+
- FastAPI
- Uvicorn
- httpx
- BeautifulSoup + lxml
- Pydantic
- Existing Websiteli Google Apps Script newsletter API for report delivery
- Existing Websiteli Google Apps Script + Google Sheets for persistent execution history

The frontend API contract remains unchanged from the original Node implementation:
- `GET /health`
- `POST /api/scan`
- `POST /api/email-report`

## What the MVP analyses

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

## Security protections

The Python rewrite hardens the crawler before public deployment:

- only HTTP/HTTPS URLs are accepted;
- localhost and local hostnames are rejected;
- DNS targets are resolved and private, loopback, link-local, reserved, multicast and other non-public IPs are rejected;
- redirect destinations are validated again and redirect count is capped;
- response bodies are capped at 2 MB;
- unexpected response content types are rejected;
- scan concurrency is bounded;
- per-IP scan and email rate limits are enabled.

These controls substantially reduce SSRF and abuse risk, although a public crawler should still be monitored and periodically security-reviewed.

## Run locally

Terminal 1:

```bash
cd market-scan-api

python3 -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8787
```

Terminal 2, from the repository root:

```bash
PUBLIC_MARKET_SCAN_API_URL=http://localhost:8787 npm run dev
```

Open:

```text
http://localhost:4321/en/market-scan/
```

or:

```text
http://localhost:4321/de/market-scan/
```

Health check:

```bash
curl http://localhost:8787/health
```

Test a scan directly:

```bash
curl -X POST http://localhost:8787/api/scan \
  -H "content-type: application/json" \
  -d '{"url":"https://websiteli.ch"}'
```

Without email delivery configuration, scanning works but `/api/email-report` returns a 503. This is expected for local preview testing.

## Test report email locally

Report delivery uses the same Google Apps Script endpoint as the existing Websiteli newsletter flow. The backend sends a dedicated `market-scan-report` payload together with the generated Market Scan report to that API, and the API is responsible for delivering the email.

The current production endpoint is used by default. To override it for development/testing:

```bash
export NEWSLETTER_API_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

The frontend does not call the Apps Script endpoint directly for Market Scan submissions; it calls `/api/email-report` once, and the backend forwards the complete payload server-side. This avoids duplicate newsletter submissions and keeps report delivery in one place.

## Production environment

- `PORT` — supplied by the host.
- `ALLOWED_ORIGINS` — comma-separated frontend origins, normally `https://websiteli.ch`.
- `NEWSLETTER_API_URL` — optional override for the existing Websiteli Google Apps Script newsletter/report endpoint. The production endpoint is the default.
- `SCAN_CONCURRENCY` — maximum simultaneous scan jobs; defaults to `3`.
- `SCAN_RATE_LIMIT_PER_HOUR` — per-IP scan limit; defaults to `12`.
- `EMAIL_RATE_LIMIT_PER_HOUR` — per-IP report-email limit; defaults to `12`.
- `NEWSLETTER_API_URL` — Google Apps Script endpoint used for both report delivery and Market Scan execution persistence.
- `SCAN_CONCURRENCY` — maximum simultaneous scan jobs; defaults to `3`.
- `SCAN_RATE_LIMIT_PER_HOUR` — per-IP scan limit; defaults to `12`.
- `EMAIL_RATE_LIMIT_PER_HOUR` — per-IP report-email limit; defaults to `12`.

For a Python web-service deployment, use the `market-scan-api` directory and start with:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Then set the GitHub Actions repository variable `PUBLIC_MARKET_SCAN_API_URL` to the deployed HTTPS API origin, for example `https://YOUR-API-HOST`. The Pages deployment workflow injects that value into the Astro build and intentionally fails if it is missing, non-HTTPS or points to localhost.

## Accuracy and persistence notes

The scanner never fabricates large counts. Metrics are the number of records actually returned during that scan.

Public search providers can rate-limit automated requests. A zero-result section can therefore mean that a provider returned no usable results, not that the market contains no discussions. For a commercial/high-volume version, replace the fallback public-search adapters with supported search/review APIs.

The website fundamentals score is a diagnostic heuristic, not a prediction of revenue or conversion rate.

### Persistent execution history

Every completed or failed Market Scan is posted to the existing Websiteli Google Apps Script endpoint using `type: "market-scan-execution"`.

The Apps Script upserts the corresponding row in the `Market Scan Executions` sheet using `scanId`. The row stores scan metadata, marketing attribution, email status, errors, and the full report JSON split across multiple cells. Research queries are preserved inside the stored report JSON.

When a visitor requests the report by email, the backend posts `type: "market-scan-report"` to the same endpoint. Apps Script sends the email and updates the matching execution row.

This means the production API does not require PostgreSQL, SQLite, SQLAlchemy, a persistent disk, or backend admin-history endpoints. The Google Sheet is the operational execution-history view.

The in-process report cache still exists for the one-hour email window. It is only used to support the preview/email flow; durable execution history lives in Google Sheets.
