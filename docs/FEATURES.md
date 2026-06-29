# Feature Inventory

This file documents implemented behavior and regression risks. It is intentionally practical: future changes should use these entries as QA prompts.

## Homepage

- Purpose: introduce Websiteli and route users to services, demos, and contact.
- Files: `src/pages/[locale]/index.astro`, `src/components/LocalizedHero.astro`, `src/components/OutreachBlock.astro`, `src/components/CTASection.astro`.
- Dependencies: locale JSON, demo content, layout metadata, pricing runtime, attribution runtime.
- Expected behavior: every supported locale builds a homepage at `/:locale/`; root `/` redirects to `/en/`.
- Manual test: open `/en/`, switch languages, click Services & Pricing, Portfolio, Contact, submit form validation.
- Regression risks: broken language switcher, missing pricing runtime, broken root redirect, UTM stripped during redirect.

## Services And Pricing

- Purpose: explain services, process, packages, pricing, FAQ, and consultation CTA.
- Files: `src/components/PageSections.astro`, `src/components/PackageCard.astro`, `src/config/pricing.json`, `src/config/pricing.ts`, `src/components/PricingRuntime.astro`.
- Expected behavior: package prices update based on detected market; user-facing manual market selector does not exist.
- Manual test: build `/en/services-pricing/`, inspect package cards, confirm hidden form fields update after pricing detection.
- Edge cases: country lookup APIs fail; site should fall back to `DEFAULT` EUR.
- Regression risks: adding a market selector, breaking package key mapping, breaking hidden form metadata.

## Portfolio And Live Demo

- Purpose: show published demos and illustrative case-study style analyses.
- Files: `src/components/PageSections.astro`, `src/content/demos/index.ts`, `src/content/example-projects/index.ts`, `src/pages/[locale]/demos/[demo]/index.astro`, `src/pages/[locale]/example-projects/[project]/index.astro`.
- Expected behavior: only `demoSlugs` are published on portfolio; current published demo is `shopify-consultant-portfolio`.
- Manual test: open `/en/portfolio/`, visit live demo link, click case study anchors, open example-project detail routes.
- Regression risks: accidentally exposing unpublished demos, breaking case-study anchors, losing localized demo labels.

## Blog Index

- Purpose: publish practical website, SEO, analytics, ownership, and automation articles.
- Files: `src/content/blog/index.ts`, `src/content/blog/posts/{slug}.ts`, `src/components/PageSections.astro`.
- Expected behavior: localized blog index at `/:locale/blog/`; search filters visible blog cards client-side; post files contain all locale translations for that post.
- Manual test: type a matching/non-matching query in the search box.
- Regression risks: public roadmap returning, blog search text missing tags/title, missing locale keys inside a post file.

## Blog Article

- Purpose: SEO content plus conversion path.
- Files: `src/pages/[locale]/blog/[slug]/index.astro`, `src/components/ArticleCTA.astro`, `src/components/ArticleShare.astro`, `src/content/blog/index.ts`, `src/content/blog/posts/{slug}.ts`.
- Expected behavior: article uses the requested locale entry from the post's `translations` object; includes canonical URL, hreflang alternates, article OG type, BlogPosting/Breadcrumb/FAQ schema, progress bar, sticky TOC, tags, bottom CTA, sidebar/mobile CTA, related links, and compact sharing.
- Manual test: open `/de/blog/why-ai-generated-websites-are-not-enough-for-a-real-business/`, verify German title/copy, LinkedIn share opens, copy link works, contact/newsletter CTAs work.
- Regression risks: duplicate CTAs that feel spammy, share URLs not encoded, TOC anchors broken for accented/non-Latin headings.

## Contact Form

- Purpose: primary lead conversion.
- Files: `src/components/CTASection.astro`, `src/components/PricingRuntime.astro`, `src/components/AttributionRuntime.astro`.
- Expected behavior: validates name/email/message/privacy consent, blocks honeypot bots, posts JSON to Google Apps Script, emits `contact_form_start` and `contact_form_submit`.
- Metadata collected: locale, country, market, currency, package, price, demo/project context, source page, inquiry intent, UTM/click IDs, landing page, referrer, user agent, timestamp, privacy policy version.
- Manual test: submit without privacy consent, submit with invalid email, submit valid form in GA debug mode.
- Regression risks: losing privacy consent, breaking Apps Script endpoint, not populating pricing/attribution fields.

## Newsletter

- Purpose: secondary conversion.
- Files: `src/components/Footer.astro`.
- Expected behavior: footer newsletter form on all layout pages, anchored at `#newsletter`, validates email/privacy, posts to Google Apps Script, emits `newsletter_subscribe`.
- Manual test: click article newsletter CTA, confirm it jumps to footer form.
- Regression risks: duplicate `id="newsletter"`, missing privacy consent, attribution lost in payload.

## Navigation And Language Switcher

- Purpose: localized navigation across pages.
- Files: `src/components/Header.astro`, `src/content/locales.ts`.
- Expected behavior: desktop and mobile nav link to current locale; language switcher maps current page where supported.
- Manual test: open `/fr/blog/`, switch to `DE`, verify `/de/blog/`.
- Edge case: article pages use `page="blog"` in header, so language switcher routes to blog index, not equivalent article.
- Regression risks: adding page slugs without updating `pageNavKeys` or localized nav labels.

## Theme Toggle

- Purpose: light/dark preference.
- Files: `src/components/ThemeToggle.astro`, `src/layouts/Layout.astro`, `src/styles/global.css`.
- Expected behavior: initial theme from `localStorage` or `prefers-color-scheme`; toggle persists.
- Manual test: toggle theme, reload page.

## Pricing Detection

- Purpose: show localized price ranges automatically.
- Files: `src/components/PricingRuntime.astro`, `src/config/pricing.json`, `src/config/pricing.ts`.
- Expected behavior: deployment country metadata first, then parallel lookup APIs, then fallback.
- Events: `market_change`, `package_view`, `package_cta_click`.
- Manual test: run build, inspect generated scripts, simulate `window.websiteliGetPricingForCountry("CH")`.

## Analytics And Attribution

- Purpose: GA4 page/session/event tracking with campaign context.
- Files: `src/layouts/Layout.astro`, `src/components/AttributionRuntime.astro`, `src/components/PricingRuntime.astro`, `CTASection.astro`, `Footer.astro`.
- Expected behavior: GA config receives attribution before config call; no duplicate explicit page_view; events include attribution params via `window.trackWebsiteliEvent`.
- Manual test: visit `/?utm_source=test&utm_medium=email&utm_campaign=utm_test&debug_mode=true` in a fresh browser profile and inspect DebugView.
- Regression risks: moving GA before attribution runtime, stripping query params before GA, adding duplicate page_view events.

## SEO Metadata

- Purpose: organic visibility and share previews.
- Files: `src/layouts/Layout.astro`, page files, content registries.
- Expected behavior: canonical, robots, theme/icon metadata, hreflang alternates, OG/Twitter tags, structured data.
- Manual test: inspect generated HTML for `/en/`, `/en/blog/`, and an article.

## RSS

- Purpose: syndicate blog posts.
- Files: `src/pages/rss.xml.ts`.
- Expected behavior: English blog RSS at `/rss.xml`.
- Known limitation: RSS is English-only.

## Sitemap And Robots

- Files: `astro.config.mjs`, `public/robots.txt`.
- Expected behavior: sitemap generated at build; legacy service/package/demo/example-project paths filtered out by sitemap integration.
- Manual test: run build and inspect `dist/sitemap-index.xml`.

## Redirects

- Purpose: preserve legacy URLs and attribution.
- Files: `src/pages/index.astro`, `src/pages/blog.astro`, `src/pages/about.astro`, `src/pages/portfolio.astro`, `src/pages/[locale]/[page]/index.astro`.
- Expected behavior: JavaScript redirects preserve search/hash and store redirect context in `sessionStorage`.
- Regression risks: replacing with meta refresh or serverless redirects that drop UTMs.

## Static Assets And Icons

- Files: `public/assets/*`, `public/favicon*`, `public/site.webmanifest`, `public/browserconfig.xml`.
- Expected behavior: OG image, blog hero image, demo preview, icons, and manifests are publicly available.

## Legal Pages

- Files: `src/pages/privacy.astro`, `src/pages/impressum.astro`.
- Expected behavior: accessible static pages linked from footer and consent text.
