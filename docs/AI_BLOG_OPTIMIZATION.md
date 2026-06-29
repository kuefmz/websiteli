# AI Blog Optimization

Websiteli blog articles are designed for traditional search engines and AI assistants that extract concise, structured answers.

## Architecture

Core files:

- `src/content/blog/posts/{slug}.ts`: one source file per blog post, with all languages in `translations`.
- `src/content/blog/types.ts`: optional and required post fields.
- `src/content/blog/index.ts`: blog loading, fallback handling, derived summaries, takeaways, ChatGPT prompts, heading IDs and Markdown rendering.
- `src/pages/[locale]/blog/[slug]/index.astro`: article layout, schema, next-article navigation and CTA placement.
- `src/components/ArticleCTA.astro`: newsletter and consultation CTA.
- `src/components/ArticleShare.astro`: social sharing buttons.

## Article Layout

Every published article automatically renders:

- H1 title, category, reading time, publication date and last updated date.
- Table of contents from H2 headings.
- Featured image with descriptive alt text and caption.
- Article summary with concise bullets for AI extraction.
- Key takeaways.
- Article body with semantic H2/H3 headings, paragraphs, lists and safe internal links.
- A consultation/newsletter CTA in the sidebar.
- A consultation/newsletter CTA after the article.
- Social sharing buttons.
- Next article navigation when another post exists.
- References when provided.

## Structured Data

Article pages pass schema objects to `Layout.astro`, which also adds global `Organization`, `WebSite`, `LocalBusiness`, `Service` and site FAQ schema.

Article-specific schema includes:

- `BlogPosting`
- `BreadcrumbList`
- `ImageObject`
- `Person`
- `FAQPage` when FAQs exist

The regression test parses the generated JSON-LD to ensure the expected article schema types remain present.

## Summaries And Takeaways

Post translations may define:

```ts
summary: ["Concise AI-friendly fact.", "..."],
keyTakeaways: ["Practical takeaway.", "..."],
chatGptPrompts: ["Explain this in simpler terms.", "..."],
references: [{ label: "Reference name", href: "/en/blog/example/" }],
```

If summary and takeaways are omitted, `src/content/blog/index.ts` derives them from the description, excerpt, audience, lead paragraphs, headings and bullet lists.

For best quality, add hand-written `summary` and `keyTakeaways` to important posts. Keep summary bullets factual, self-contained and short.

## Markdown Rendering

The blog renderer supports:

- `##` headings as H2
- `###` headings as H3
- paragraphs
- unordered lists
- bold text with `**text**`
- safe internal links with `[label](/en/path/)`
- fenced code blocks with copy buttons
- callouts with `> [!TIP]`, `> [!BEST PRACTICE]`, `> [!IMPORTANT]`, `> [!WARNING]`, and `> [!EXAMPLE]`

Internal `/en/` links are localized to the active article locale at render time.

## Adding Future Blog Posts

Create a new file:

`src/content/blog/posts/my-post-slug.ts`

Required fields:

- `slug`
- `published`
- `image`
- `author`
- `date`
- `updated`
- `related`
- `translations.en`

Each translation should include:

- `title`
- `description`
- `category`
- `tags`
- `language`
- `readingTime`
- `audience`
- `excerpt`
- `faqs`
- `body`

Optional but recommended:

- `summary`
- `keyTakeaways`
- `chatGptPrompts`
- `references`

After adding or editing posts, run:

```sh
npm run test:pricing
```

This builds the site, checks localized blog pages, validates expected schema objects and crawls built internal links and anchors.
