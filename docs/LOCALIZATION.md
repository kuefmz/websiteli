# Localization

Localization is central to the site. Every new user-facing feature must be planned across all supported locales.

## Supported Languages

Canonical list in `src/content/locales.ts`:

```ts
["en", "de", "hu", "pl", "es", "fr", "it", "cz", "sk", "pt", "da", "nl", "ja"]
```

## Routing

- Home: `/:locale/`
- Main pages: `/:locale/:page/`
- Blog article: `/:locale/blog/:slug/`
- Demo detail: `/:locale/demos/:demo/`
- Example project detail: `/:locale/example-projects/:project/`

Root `/` redirects to `/en/`.

## Translation Sources

Main site copy:

- `src/content/locales/*.json`

Localization registry:

- `src/content/locales.ts`

Specialized content:

- Blog: `src/content/blog.ts`
- Demos: `src/content/demos/index.ts`
- Example projects: `src/content/example-projects/index.ts`
- Package labels: `src/config/packageLabels.ts`
- Footer/newsletter UI currently lives in `src/components/Footer.astro`
- Header ARIA labels currently live in `src/components/Header.astro`
- Article CTA copy currently lives in `src/components/ArticleCTA.astro`

## Fallback Strategy

Main locale content is loaded by exact locale key.

Blog posts should not silently fall back to English. `getBlogPosts(locale)` returns the locale's post list. If adding a new post, add localized post copy for every supported locale before publishing.

Some demo/example content uses English base plus localized overrides. This is a known architectural compromise; see `KNOWN_LIMITATIONS.md`.

## Localized Metadata

Page title/description sources:

- Home: locale JSON `seo`
- Services/pricing: locale JSON package intro/nav copy
- Portfolio: demo page SEO content
- Blog index: `getBlogIndexContent(locale)`
- Blog article: localized `BlogPost`
- About/contact: locale JSON

`Layout.astro` renders metadata and alternates.

## Localized Blog Posts

Blog architecture requires:

- localized article title
- localized description
- localized category/tags
- localized reading time
- localized excerpt
- localized headings/body
- localized FAQ if FAQ schema is used
- localized index card through `getBlogPosts(locale)`

The current slug is shared across locales. This keeps routing simple but means slugs are not language-specific.

## Localized Structured Data

Article schema uses localized post fields. Breadcrumb schema uses localized nav/blog labels. Global schema description comes from the localized page description.

## Images

Images are currently not localized. They live in `public/assets/`. If localized imagery is introduced, document naming conventions and alt text rules here.

## Adding A New Language

1. Add locale JSON file in `src/content/locales/{code}.json`.
2. Import it in `src/content/locales.ts`.
3. Add the code to `localeCodes`.
4. Add header labels in `Header.astro`.
5. Add footer legal/newsletter copy in `Footer.astro`.
6. Add package labels in `src/config/packageLabels.ts`.
7. Add blog index and post copy in `src/content/blog.ts`.
8. Add demo/example-project localized overrides if needed.
9. Add article CTA copy in `ArticleCTA.astro`.
10. Run `npm run test:pricing`.
11. Manually inspect generated routes.

## Adding A New Page

1. Add page slug to `pageSlugs` in `src/content/locales.ts`.
2. Add nav key mapping if it appears in navigation.
3. Add localized nav/page content to every locale JSON.
4. Add page rendering branch or dedicated page route.
5. Add metadata/canonical/hreflang.
6. Add tests if it affects navigation, SEO, analytics, forms, or pricing.

## Localization QA

- Build all routes.
- Verify no English package labels leak into non-English form options.
- Verify language switcher URLs.
- Verify localized title/description in generated HTML.
- Verify blog articles exist for all locales.
- Verify forms submit localized package labels but stable package keys.
