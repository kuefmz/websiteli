# Testing

Automated coverage is limited but important. Manual QA is required for browser behavior, forms, analytics, responsive design, and Lighthouse.

## Automated Tests

Run:

```bash
npm run test:pricing
```

This runs:

```bash
npm run build && node scripts/test-pricing.mjs
```

The test script verifies:

- Attribution runtime is present.
- Root and legacy redirects preserve query strings and redirect context.
- Pricing source contains supported markets/currencies.
- Pricing fallback logic exists.
- No user-facing market selector exists.
- Lead forms include pricing/source/demo/project/UTM metadata.
- Newsletter form posts to Google Apps Script and includes attribution/privacy fields.
- Localized blog articles include conversion/share UX.
- Public blog roadmap does not return.
- Blog articles render translated entries from the one-file-per-post registry and keep localized canonical URLs.
- Hungarian package labels do not leak English package names.

## Manual QA Checklist

Core pages:

- `/en/`
- `/de/`
- `/en/services-pricing/`
- `/en/services/business-websites/`
- `/en/services/business-automation/`
- `/en/services/ai-chatbots/`
- `/en/industries/restaurants/`
- `/en/portfolio/`
- `/en/blog/`
- `/en/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/`
- `/en/contact/`
- `/privacy/`
- `/impressum/`

Redirects:

- `/`
- `/blog/`
- `/about/`
- `/portfolio/`
- `/en/services/`
- `/en/packages/`

Forms:

- Contact form validation.
- Contact form privacy consent.
- Newsletter validation.
- Honeypot does not show visually.
- Hidden pricing and UTM fields populate.

Navigation:

- Desktop nav.
- Mobile nav.
- Language switcher.
- Header hide/show on scroll.
- Theme toggle persistence.

## Analytics Validation

Use a fresh browser profile/incognito session.

1. Visit:

   ```text
   /?utm_source=test&utm_medium=email&utm_campaign=utm_test&debug_mode=true
   ```

2. Confirm redirect to `/en/` preserves query.
3. Run `websiteliShowAttribution()` in console.
4. Open GA4 DebugView.
5. Trigger events: package CTA, article CTA, newsletter CTA, form start.
6. Trigger generated-page events: open a service page, open an automation service page, open an industry page, click a demo-gallery live link where available.

Expected: event parameters include UTM fields. "First user source" may still show direct for an existing GA client; use a fresh profile.

## SEO Checklist

- Canonical URL is clean.
- Hreflang alternates exist.
- OG/Twitter tags use localized title/description.
- Article pages use `og:type=article`.
- Structured data exists and is valid in shape.
- Sitemap builds.
- Generated `/services/:service/` and `/industries/:industry/` pages are included in the sitemap.
- Redirect-only `/demos/...` and `/example-projects/...` pages are not included in the sitemap.
- Robots points to sitemap and RSS.

## Accessibility Checklist

- Labels exist for form inputs.
- Form status messages use `aria-live`.
- Mobile menu button has `aria-expanded`.
- Language switcher has accessible label.
- Color contrast should be checked in browser tooling.
- Keyboard navigation should reach nav, language menu, theme toggle, CTAs, forms.

## Responsive Checklist

Check at:

- 360px mobile width.
- 768px tablet width.
- 1024px small desktop.
- 1440px desktop.

Focus areas:

- Header/mobile menu.
- Pricing cards.
- Contact form.
- Portfolio cards.
- Blog article sticky/mobile CTA.
- Footer newsletter.

## Performance Checklist

- Run Lighthouse when browser tooling is available.
- Confirm no layout shifts from dynamic pricing text.
- Confirm no heavy dependencies were added.
- Confirm images have dimensions.
- Confirm build output remains static.

## Localization Checklist

- Every locale homepage builds.
- Every locale blog article builds.
- Non-English package labels appear in forms.
- Language switcher links are valid.
- Metadata is localized.

## Test Gaps

- No Playwright/browser tests.
- No Lighthouse automation.
- No static typecheck script separate from Astro build.
- No lint script.
- No automated form endpoint integration test.
