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
- Brevo HTTPS API for production report delivery, with SMTP as a local/paid-host fallback
- SQLAlchemy + SQLite locally / PostgreSQL in production for persistent execution history

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

Production should use Brevo's HTTPS API. Export these values before starting Uvicorn:

```bash
export BREVO_API_KEY="YOUR_BREVO_API_KEY"
export REPORT_FROM_EMAIL="YOUR_VERIFIED_SENDER"
export REPORT_FROM_NAME="Websiteli"
export REPORT_REPLY_TO="YOUR_REPLY_TO_EMAIL"

uvicorn main:app --reload --host 127.0.0.1 --port 8787
```

SMTP remains available as a fallback for local development or hosts that allow outbound SMTP:

```bash
export SMTP_HOST="YOUR_SMTP_HOST"
export SMTP_PORT="587"
export SMTP_USER="YOUR_EMAIL"
export SMTP_PASS="YOUR_PASSWORD"
export REPORT_FROM_EMAIL="YOUR_EMAIL"
```

Never commit API keys, SMTP passwords or app passwords.

## Production environment

- `PORT` — supplied by the host.
- `ALLOWED_ORIGINS` — comma-separated frontend origins, normally `https://websiteli.ch`.
- `BREVO_API_KEY` — recommended production email credential. Report delivery uses Brevo over HTTPS, including on Render Free.
- `REPORT_FROM_EMAIL` — verified Brevo sender address. Required when using Brevo.
- `REPORT_FROM_NAME` — optional sender name; defaults to `Websiteli`.
- `REPORT_REPLY_TO` — optional reply-to address.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — optional SMTP fallback for local development or hosts that permit SMTP.
- `SCAN_CONCURRENCY` — maximum simultaneous scan jobs; defaults to `3`.
- `SCAN_RATE_LIMIT_PER_HOUR` — per-IP scan limit; defaults to `12`.
- `EMAIL_RATE_LIMIT_PER_HOUR` — per-IP report-email limit; defaults to `12`.
- `DATABASE_URL` — persistent PostgreSQL connection. It is optional only in local development, where SQLite is used. On Render or when `APP_ENV=production`, startup fails if `DATABASE_URL` is missing or points to SQLite, preventing accidental data loss on an ephemeral filesystem.
- `ADMIN_API_TOKEN` — required secret/password for the private execution-history API. If unset, the admin API returns 503 instead of becoming public.
- `ADMIN_API_USERNAME` — optional HTTP Basic username; defaults to `websiteli`.

For a Python web-service deployment, use the `market-scan-api` directory and start with:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Then set the GitHub Actions repository variable `PUBLIC_MARKET_SCAN_API_URL` to the deployed HTTPS API origin, for example `https://YOUR-API-HOST`. The Pages deployment workflow injects that value into the Astro build and intentionally fails if it is missing, non-HTTPS or points to localhost.

## Accuracy and persistence notes

The scanner never fabricates large counts. Metrics are the number of records actually returned during that scan.

Public search providers can rate-limit automated requests. A zero-result section can therefore mean that a provider returned no usable results, not that the market contains no discussions. For a commercial/high-volume version, replace the fallback public-search adapters with supported search/review APIs.

The website fundamentals score is a diagnostic heuristic, not a prediction of revenue or conversion rate.

### Password-protected execution-history API

The stored scan history is available through two private endpoints:

```text
GET /api/admin/executions
GET /api/admin/executions/{execution_id}
GET /api/admin/executions/{execution_id}/report
```

The list endpoint returns metadata, status, summary, market profile and research information without the full report payload by default. Each list item includes a `report_url`. The detail endpoint returns the complete persisted execution, including the full generated report. The `/report` endpoint returns exactly the stored report object that the frontend renders.

If you explicitly want all reports embedded in the list response, add `?include_report=true` (use this carefully because the response can become large).

Set a strong secret before starting the API:

```bash
export ADMIN_API_USERNAME="jenifer"
export ADMIN_API_TOKEN="use-a-long-random-secret"
```

You can then use HTTP Basic authentication:

```bash
curl -u 'jenifer:use-a-long-random-secret' \
  'http://127.0.0.1:8787/api/admin/executions?limit=50'
```

or a Bearer token:

```bash
curl -H 'Authorization: Bearer use-a-long-random-secret' \
  'http://127.0.0.1:8787/api/admin/executions'
```

Useful filters:

```text
/api/admin/executions?limit=100
/api/admin/executions?status=completed
/api/admin/executions?domain=orgelia.com
/api/admin/executions?include_report=true
```

To retrieve one complete report, copy its `id` from the list and call:

```bash
curl -u 'jenifer:use-a-long-random-secret' \
  'http://127.0.0.1:8787/api/admin/executions/EXECUTION_ID'

# Exact report JSON used by the frontend:
curl -u 'jenifer:use-a-long-random-secret' \
  'http://127.0.0.1:8787/api/admin/executions/EXECUTION_ID/report'
```

When opened directly in a browser, the endpoint also supports HTTP Basic authentication, so the browser can show a username/password prompt.

### Persistent execution history

Every `POST /api/scan` trigger is now written to the database before scanning starts. The history keeps:

- execution/scan ID;
- submitted and normalized URL;
- start/completion timestamps;
- status (`started`, `completed`, `failed` or `rejected`);
- elapsed time and error text when relevant;
- brand, summary, market profile and research provenance;
- the complete generated report JSON;
- whether/when the report email was successfully sent.

The email address itself is **not** stored in the execution table.

For local development, execution history is stored in:

```text
market-scan-api/data/market_scan.db
```

That directory is ignored by Git. To inspect/export the local history:

```bash
cd market-scan-api
source .venv/bin/activate

python scripts/export_executions.py --limit 100
python scripts/export_executions.py --format csv --output executions.csv
```

For production, set `DATABASE_URL` to a persistent PostgreSQL database whose lifecycle is independent of the Render Free web service. The application intentionally refuses to start on Render/production without it, so it cannot silently lose execution history by falling back to local SQLite.

The report used by the 90-second preview/email gate is still cached in API process memory for one hour and removed after a successful email send. The permanent execution record and full generated report remain in the database.
