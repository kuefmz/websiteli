# Documentation Coverage Report

This report was generated during the documentation audit and should be updated after major architectural changes.

## Documented Features

- Project vision, goals, audience, positioning, branding, markets, currencies, languages, roadmap, and non-goals.
- Repository structure and Astro architecture.
- Build scripts and deployment script.
- Static routing and legacy redirects.
- Localization architecture and workflow.
- Component architecture.
- Blog architecture and localized article requirements.
- Lead form and newsletter data flows.
- GA4 setup, attribution persistence, events, storage, validation, and privacy considerations.
- Pricing source of truth and browser market detection.
- Portfolio demos and illustrative example projects.
- SEO metadata, canonical URLs, hreflang, schema, OpenGraph, Twitter Cards, sitemap, robots, and RSS.
- Manual and automated testing procedures.
- Known limitations and technical debt.
- Contribution rules for future human and AI sessions.

## Undocumented Or Lightly Documented Areas

- Exact visual design token catalog is only summarized; detailed CSS component-by-component documentation is not included.
- Legal/privacy policy text is not deeply audited in these docs.
- The external Google Apps Script implementation is outside this repository and cannot be documented beyond payload assumptions.
- Hostpoint server configuration outside `scripts/deploy.sh` is not documented.
- Any external analytics dashboards or GA4 custom dimensions configured in Google Analytics are not visible from the repo.

## Potential Technical Debt

- No lint script.
- No browser E2E tests.
- No automated Lighthouse checks.
- RSS is English-only.
- Blog article slugs are shared across languages.
- Demo/example content can inherit English through localized overrides.
- Article language switcher routes to blog index rather than same article.
- Form submissions use `mode: no-cors`.
- No explicit cookie consent/consent mode implementation.
- Country detection relies on third-party browser calls.
- No custom 404 page was found.

## Recommendations

1. Add a lightweight lint command and document it in `TESTING.md`.
2. Add Playwright smoke tests for routing, forms, language switcher, article sharing, and mobile menu.
3. Add Lighthouse CI or a repeatable local audit script.
4. Add a build-time localization coverage check for blog/demo/example content.
5. Consider localized RSS feeds.
6. Consider article-specific language switcher alternates.
7. Review privacy/consent requirements for GA4 and country lookup APIs with legal guidance.
8. Ensure `content-agents/` local files are ignored or intentionally documented before any commit.

## Verification Performed

The repository was reviewed through:

- Source file inventory with `rg --files`.
- Inspection of package scripts and Astro config.
- Inspection of layout, routing, header/footer, forms, attribution, pricing, blog, demo, example-project, RSS, robots, and deployment files.
- Inspection of existing automated test coverage in `scripts/test-pricing.mjs`.

After creating docs, run `npm run test:pricing` before considering the documentation baseline complete.
