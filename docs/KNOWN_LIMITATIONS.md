# Known Limitations

Do not fix these simply because they are documented. Treat this file as a backlog and risk register.

## No Lint Script

- Description: `package.json` has no `lint` script.
- Impact: style and some static quality issues rely on review/build.
- Priority: Medium.
- Possible solution: add a lightweight lint/format setup compatible with Astro.

## No Browser E2E Tests

- Description: There are no Playwright/Cypress tests.
- Impact: mobile menu, language menu, share copy button, form UX, and analytics runtime are not browser-tested.
- Priority: High.
- Possible solution: add Playwright smoke tests for core pages and interactions.

## No Automated Lighthouse

- Description: Lighthouse targets are documented but not enforced.
- Impact: performance/accessibility regressions could slip in.
- Priority: Medium.
- Possible solution: add Lighthouse CI or a repeatable local script.

## RSS Is English-Only

- Description: `src/pages/rss.xml.ts` uses `getBlogPosts("en")`.
- Impact: localized blog readers cannot subscribe to localized RSS feeds.
- Priority: Low/Medium.
- Possible solution: add per-locale RSS routes or include alternate language metadata.

## Blog Slug Is Shared Across Locales

- Description: localized blog articles use the same English slug.
- Impact: URLs are localized by prefix but not by slug wording.
- Priority: Low.
- Possible solution: add localized slugs and a canonical slug mapping. This needs careful redirect handling.

## Demo And Example Content Use Partial English Base

- Description: demo/example registries use English base content plus localized overrides.
- Impact: missing localized fields can silently inherit English.
- Priority: Medium.
- Possible solution: enforce complete localized schemas or build-time missing-translation reports.

## Header Language Switcher On Article Pages Goes To Blog Index

- Description: article layout passes `page="blog"`, so header switcher maps language changes to `/:locale/blog/`, not equivalent article URL.
- Impact: user loses exact article page when switching language from article header.
- Priority: Low/Medium.
- Possible solution: extend Header props to accept explicit localized alternate links.

## Form Submissions Use `mode: no-cors`

- Description: Google Apps Script posts cannot inspect response success.
- Impact: UI assumes success if fetch resolves; server-side errors may be hidden.
- Priority: Medium.
- Possible solution: configure Apps Script/CORS or use a server endpoint.

## No Cookie Consent Banner

- Description: GA4 loads immediately and may set cookies.
- Impact: privacy/compliance risk depending on target jurisdiction and legal advice.
- Priority: Medium/High.
- Possible solution: add consent mode and a localized privacy/cookie banner after legal review.

## Country Pricing Depends On External Lookup APIs

- Description: pricing detection calls third-party APIs from the browser.
- Impact: users with blockers/network failures get fallback pricing; privacy implications should remain disclosed.
- Priority: Medium.
- Possible solution: server/CDN country header or consent-aware detection.

## Untracked `content-agents/` Directory Exists Locally

- Description: current working tree contains untracked `content-agents/.env` and `.venv` files.
- Impact: local-only files could accidentally be committed if not ignored.
- Priority: Medium.
- Possible solution: verify `.gitignore` coverage before committing.

## No Formal 404 Page Found

- Description: repository does not currently include `src/pages/404.astro`.
- Impact: hosting default 404 may not match brand/localization.
- Priority: Low/Medium.
- Possible solution: add static localized-aware 404 page.
