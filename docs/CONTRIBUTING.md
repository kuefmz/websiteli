# Contributing Rules For Humans And AI Agents

This is the first file future Codex sessions should read after `PROJECT.md`.

## Before Modifying Anything

1. Read every file in `/docs`.
2. Check `git status --short`.
3. Do not delete or revert user changes unless explicitly asked.
4. Understand the existing component/content architecture before editing.
5. Search with `rg` before assuming a feature does not exist.
6. Prefer extending existing components and registries over creating parallel systems.
7. Identify whether the change touches analytics, SEO, localization, pricing, forms, routing, or deployment.

## Never Break

- GA4 initialization and event tracking.
- UTM/click-ID capture and persistence.
- Root and legacy redirects preserving query strings.
- Pricing detection and hidden form pricing fields.
- Lead form payload metadata.
- Newsletter payload metadata.
- Privacy consent requirements.
- Localized routes and `hreflang` alternates.
- Canonical URLs.
- Sitemap and robots behavior.
- RSS generation.
- Structured data.
- Mobile navigation and language switcher.
- Theme toggle.
- Public performance/accessibility basics.

## Every Pull Request Must

- Build successfully with `npm run build`.
- Pass `npm run test:pricing`.
- Update `/docs` if behavior changes.
- Avoid unnecessary dependencies.
- Preserve existing functionality.
- Preserve or improve localization.
- Preserve or improve SEO metadata.
- Preserve or improve analytics attribution.
- Include tests where the project has a practical test surface.
- Document anything that cannot be verified locally.

## Every New Feature Must

- Be localized for every supported locale or intentionally hidden until it is.
- Be responsive.
- Be accessible enough for keyboard/screen-reader basics.
- Include SEO metadata where it creates a page.
- Include analytics for important interactions.
- Preserve attribution in conversion flows.
- Use existing design tokens and layout conventions.
- Avoid duplicating forms, pricing logic, attribution logic, or content registries.

## File Ownership Guidance

- Page shell/metadata: `src/layouts/Layout.astro`.
- Main localized page content: `src/content/locales/*.json`.
- Locale registry/routing: `src/content/locales.ts`.
- Subpage sections: `src/components/PageSections.astro`.
- Lead form: `src/components/CTASection.astro`.
- Newsletter/footer: `src/components/Footer.astro`.
- Pricing: `src/config/pricing.*`, `src/config/packageLabels.ts`, `src/components/PricingRuntime.astro`.
- Attribution: `src/components/AttributionRuntime.astro`.
- Blog: `src/content/blog/index.ts`, `src/content/blog/types.ts`, `src/content/blog/posts/{slug}.ts`, `src/pages/[locale]/blog/[slug]/index.astro`, `ArticleCTA.astro`, `ArticleShare.astro`.
- Demos/projects: `src/content/demos/index.ts`, `src/content/example-projects/index.ts`.
- Global styles: `src/styles/global.css`.
- Tests: `scripts/test-pricing.mjs`.

## Analytics Rules

- Do not add explicit duplicate `page_view` events.
- Do not move GA before `AttributionRuntime`.
- Do not remove `debug_mode` support.
- Do not strip URL search params before GA and attribution can read them.
- All important conversion events should include attribution via `window.trackWebsiteliEvent`.

## Localization Rules

- Add content for all `localeCodes`.
- Never silently fall back to English for production blog articles.
- Stable internal values like package keys should remain English/camelCase.
- User-facing package labels should be localized.
- Update tests if a localization-sensitive behavior is important.

## SEO Rules

- Keep canonical URLs clean.
- Add hreflang alternates for localized pages.
- Article pages should use `og:type=article`.
- New public pages need title, description, canonical, OG/Twitter tags via `Layout.astro`.
- Structured data should be truthful; do not invent client results.
- Do not expose unpublished roadmap content.

## Form Rules

- Keep honeypot fields.
- Keep privacy consent.
- Keep Google Apps Script endpoint unless intentionally migrated.
- Keep pricing, source, UTM, click ID, landing page, referrer, user agent, and timestamp metadata.
- If endpoint behavior changes, update `ANALYTICS.md`, `FEATURES.md`, and tests.

## Pricing Rules

- `src/config/pricing.json` is source of truth for numeric prices.
- `packageKeys` in `src/config/pricing.ts` define stable package keys.
- No user-facing market selector unless product strategy changes.
- If adding a new market, update pricing config and tests.

## Documentation Rules

Update docs when:

- A route is added/removed.
- An event is added/removed.
- Form metadata changes.
- Pricing markets or package keys change.
- Supported locales change.
- Deployment process changes.
- A known limitation is fixed or discovered.

## Safe Workflow

```bash
rg "thing-to-change" src docs scripts
npm run test:pricing
git diff --stat
```

If browser behavior changed, also run manual QA from `TESTING.md`.
