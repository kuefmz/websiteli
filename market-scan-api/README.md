# Websiteli Market Scan API

Python/FastAPI backend for the Websiteli Market Scan lead-generation tool.

## Product flow

A visitor enters one public website URL on `/{locale}/market-scan/`. The Astro frontend calls this API and renders the complete detailed report for a 90-second free preview. The interface then locks the report and asks for an email address so the same full report can be delivered by email. The report remains cached server-side for up to one hour for email delivery.

The same submission also uses Websiteli’s existing Google Apps Script newsletter endpoint (`type: "newsletter"`, campaign `market-scan-report`). Because the report is intentionally visible during the timed preview, its data is returned to the browser during that preview; the lock is a conversion/UI gate rather than a security boundary.

## Stack

- Python 3.12+
- FastAPI
- Uvicorn
- httpx
- BeautifulSoup + lxml
- Pydantic
- Python standard-library SMTP for report delivery

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

Without SMTP configuration, scanning works but `/api/email-report` returns a 503. This is expected for local preview testing.

## Test report email locally

Export SMTP values in the backend terminal before starting Uvicorn:

```bash
export SMTP_HOST="YOUR_SMTP_HOST"
export SMTP_PORT="587"
export SMTP_USER="YOUR_EMAIL"
export SMTP_PASS="YOUR_PASSWORD"
export REPORT_FROM_EMAIL="YOUR_EMAIL"
export REPORT_REPLY_TO="YOUR_EMAIL"

uvicorn main:app --reload --host 127.0.0.1 --port 8787
```

Never commit SMTP passwords or app passwords.

## Production environment

- `PORT` — supplied by the host.
- `ALLOWED_ORIGINS` — comma-separated frontend origins, normally `https://websiteli.ch`.
- `SMTP_HOST` — SMTP server used to deliver generated reports.
- `SMTP_PORT` — normally `587` (STARTTLS) or `465` (TLS).
- `SMTP_USER` — SMTP username.
- `SMTP_PASS` — SMTP password/app password.
- `REPORT_FROM_EMAIL` — optional sender address; defaults to `SMTP_USER`.
- `REPORT_REPLY_TO` — optional reply-to address.
- `SCAN_CONCURRENCY` — maximum simultaneous scan jobs; defaults to `3`.
- `SCAN_RATE_LIMIT_PER_HOUR` — per-IP scan limit; defaults to `12`.
- `EMAIL_RATE_LIMIT_PER_HOUR` — per-IP report-email limit; defaults to `12`.

For a Python web-service deployment, use the `market-scan-api` directory and start with:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Then build/deploy the existing static Astro frontend with:

```bash
PUBLIC_MARKET_SCAN_API_URL=https://YOUR-API-HOST npm run build
```

## Accuracy and persistence notes

The scanner never fabricates large counts. Metrics are the number of records actually returned during that scan.

Public search providers can rate-limit automated requests. A zero-result section can therefore mean that a provider returned no usable results, not that the market contains no discussions. For a commercial/high-volume version, replace the fallback public-search adapters with supported search/review APIs.

The website opportunity score is a diagnostic heuristic, not a prediction of revenue or conversion rate.

Generated reports are stored only in API process memory and expire after one hour. A successful email send deletes the cached report immediately. This is suitable for local testing and a single-instance MVP, but a multi-instance production deployment should use a shared TTL store.
