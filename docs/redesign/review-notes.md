# Premium consultancy redesign review

The work stays on a feature branch. The existing `main` deployment workflow must not run until the owner approves publication and the change is merged deliberately.

## Design and content

- Warm ivory, stone, charcoal and restrained bronze; Cormorant Garamond and Inter, self-hosted with their licenses.
- English homepage follows the consultancy brief, with original architectural CSS artwork and real portfolio screenshots.
- Shared design tokens, typography, navigation, forms, editorial grids and footer styling cover existing routes.
- Founder-led copy uses the existing verified two-founder description, with direct access as a benefit. No clients, awards, results or credentials have been invented.
- All genuine portfolio projects, concepts, service pages, blog URLs, language routes and legal pages remain. Concepts retain their labels.
- Existing translations are retained. Only price-bearing copy and service navigation labels were changed outside English; a professional editorial review of those targeted localized changes remains required.
- Public service prices, Offer price schema and the discount popup offer are removed. Newsletter signup and its consent/submission behavior remain.
- The existing CHF 100 referral commission is retained as an existing partnership term, distinct from service pricing; changing partner compensation was not requested.

## Preserved integrations

The contact and newsletter Apps Script endpoints, privacy version/consent fields, honeypot, attribution runtime, consent-managed analytics, feedback, market-scan UI/API configuration and production build environment requirements remain. The old browser pricing runtime is replaced by inquiry metadata handling, without shipping rate tables or making geolocation requests for price personalization.

The optional business website and timeline are appended to the existing message field so notifications receive them without assuming a backend schema change. Existing package query links are accepted as context while visitors can choose a different service.

## Verification limits

Static builds and source-level/compiled-handler checks do not prove visual layout, real browser accessibility, production scan availability or notification delivery. The managed preview daemon was unavailable (`sites-previewd mailbox is unavailable`), so desktop/mobile browser inspection is outstanding. No live contact or newsletter message has been submitted. The existing contact endpoint uses `no-cors`; an opaque response proves dispatch only, not server acceptance or notification receipt.

Before approval: inspect desktop and mobile layouts, language navigation, keyboard/focus and reduced-motion behavior; run a real enquiry and newsletter signup against the production endpoint with the owner's intended test data and verify their receipt; verify Market Scan using its configured production API. Preserve the deployment environment variable `PUBLIC_MARKET_SCAN_API_URL`.

## Completed checks

- `npm run test:redesign`: all 1,466 pages build; public-copy, structured-data, duplicate-ID and internal-link audits pass; intercepted contact-handler contract tests pass.
- `node scripts/test-pricing.mjs`: all 12 regression checks pass, including internal rate configuration, newsletter, lead magnet, localized content, redirects, sitemap and links.
- Compared the built route set against the unmodified source: no routes added or removed.
- Checked public SVG assets for service prices and the existing PDF download for monetary or discount copy.
- Fixed duplicate Japanese article fragments while retaining the first historical ASCII fragment as an alias.
