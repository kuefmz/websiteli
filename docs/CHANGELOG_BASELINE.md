# Changelog Baseline

This is a snapshot of the project as documented after the repository audit. It is not a release changelog; it is a baseline for future changes.

## Current Implemented Features

- Static Astro website.
- Localized routing for 13 locales.
- Localized homepage, services/pricing, portfolio, blog, about, and contact pages.
- Legacy redirects preserving query strings and redirect attribution context.
- Dynamic client-side market/currency pricing detection.
- Packages: Digital Foundation, Growth Setup, AI/Data Upgrade, Website Maintenance labels.
- Lead form with metadata, privacy consent, honeypot, Google Apps Script submission.
- Footer newsletter with metadata, privacy consent, honeypot, Google Apps Script submission.
- GA4 direct `gtag.js` integration.
- UTM/click-ID first-touch and last-touch persistence.
- GA event helper with attribution parameters.
- Header navigation, mobile nav, language switcher, theme toggle.
- Portfolio live demo listing and illustrative case-study cards.
- Blog index with client-side search/filter.
- Localized blog article with CTAs, sharing, progress bar, TOC, related links, schema.
- Sitemap generation.
- English RSS feed.
- Robots and LLM metadata files.
- Hostpoint SFTP deployment script.
- Node test script validating build output and key regressions.

## Architecture Decisions

- Use Astro static generation for speed and SEO.
- Keep runtime JS small and scoped to needed browser behavior.
- Use direct GA4 `gtag.js`, not GTM.
- Preserve UTM query strings through redirects.
- Keep canonical URLs clean while analytics page_location can include query strings.
- Detect pricing automatically; no user-facing market selector.
- Submit forms to Google Apps Script without a server backend.
- Keep published content explicit; do not show future roadmap ideas.

## Dependencies

- `astro`
- `@astrojs/sitemap`
- Node built-in test/assert/fs/path modules for tests.
- Runtime browser APIs: localStorage, sessionStorage, fetch, IntersectionObserver, Intl.NumberFormat.
- Third-party runtime services: GA4, Google Apps Script, country lookup APIs.

## Known Behavior

- `/` redirects to `/en/`.
- `/en/services/` redirects to `/en/services-pricing/`.
- `/en/packages/` redirects to `/en/services-pricing/`.
- `/en/demos/...` legacy path redirects toward portfolio/current routes.
- `/en/` is reported to GA as page path `/`.
- UTM attribution persists in localStorage.
- GA4 first-user attribution in the UI may remain direct for returning browser clients.
- Blog RSS is English-only.

## Technical Debt

See `KNOWN_LIMITATIONS.md` for details. Highest-value debt:

- Add linting.
- Add browser smoke tests.
- Add Lighthouse automation.
- Improve localized slug/language switching for article pages.
- Formalize complete translation coverage checks.
- Consider consent mode/cookie consent.

## Baseline Test Command

```bash
npm run test:pricing
```

At the time of this baseline, the expected result is all Node tests passing after a successful Astro build.
