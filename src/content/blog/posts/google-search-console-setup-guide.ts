import type { BlogPostSource } from "../types";

const post: BlogPostSource = {
  slug: "google-search-console-setup-guide",
  status: "scheduled",
  publishDate: "2026-10-07",
  image: "/assets/blog/website-maintenance-checklist.webp",
  imageAlt: "Google Search Console setup workflow for a business website",
  author: "Websiteli",
  date: "2026-10-07",
  updated: "2026-10-07",
  related: ["free-website-market-scan", "website-before-paid-ads-checklist", "utm-tracking-small-business"],
  translations: {
    en: {
      title: "How to Set Up Google Search Console for Your Website",
      description: "A practical step-by-step guide to adding a website to Google Search Console, verifying ownership, submitting a sitemap and checking indexing.",
      category: "Website Setup",
      tags: ["Google Search Console setup", "Search Console verification", "submit sitemap Google", "website indexing", "technical SEO setup"],
      language: "en",
      readingTime: "8 min read",
      audience: "Business owners, founders and small teams launching or taking over a website",
      excerpt: "Search Console is one of the first tools I set up after launching a website because it shows whether Google can find, index and understand the site.",
      summary: [
        "Use a Domain property if you want one Search Console property to cover protocols and subdomains.",
        "Domain properties are verified through DNS; URL-prefix properties support more verification methods.",
        "After verification, submit the sitemap and inspect important URLs.",
        "Use Search Console to monitor indexing, queries, pages and technical issues."
      ],
      keyTakeaways: [
        "Verify ownership as early as possible.",
        "Prefer a Domain property when DNS access is available.",
        "Submit the sitemap after verification.",
        "Inspect your homepage and important commercial pages.",
        "Do not expect performance data immediately after setup."
      ],
      chatGptPrompts: [],
      references: [
        { title: "Add a website property to Search Console", publisher: "Google Search Console Help", href: "https://support.google.com/webmasters/answer/34592?hl=en" }
      ],
      faqs: [
        { question: "Should I use a Domain property or URL-prefix property?", answer: "A Domain property covers subdomains and protocols and is verified through DNS. A URL-prefix property only covers the specified prefix but supports additional verification methods." },
        { question: "Do I need a sitemap for Search Console?", answer: "A sitemap is not mandatory for every website, but submitting one can help Google discover and monitor the URLs you want indexed." },
        { question: "How long does Search Console take to show data?", answer: "Verification can be immediate once Google sees the required record, but search-performance and indexing data can take time to appear." }
      ],
      body: `## Why I set up Search Console immediately after launch

Google Search Console is one of the first tools I add when I launch or take over a business website. It does not improve rankings by itself. What it gives you is visibility: whether Google can discover the site, which pages are indexed, which queries already create impressions, and whether there are technical problems.

If you plan to do SEO later, setting this up early means you start collecting useful data immediately.

## Step 1: Add the website

Open Google Search Console and add a property.

Google currently offers two main property types:

- **Domain property** — covers the domain across protocols and subdomains
- **URL-prefix property** — covers only the exact prefix you enter

If I control the DNS, I normally prefer a Domain property because it gives a cleaner view of the whole domain. Google requires DNS verification for Domain properties. citeturn845926search7

## Step 2: Verify ownership with DNS

For a Domain property, Search Console gives you a TXT record.

Go to the DNS provider where the domain is managed and add that TXT record exactly as Google provides it. The host/name field differs by DNS provider; many providers use the root domain or `@`.

Save the record and return to Search Console to verify.

DNS changes can appear quickly, but sometimes propagation takes longer. If verification fails immediately, double-check the exact TXT value before repeatedly changing records.

## Step 3: Submit the sitemap

Once ownership is verified, open the **Sitemaps** section.

For most websites the sitemap is available at something like:

`https://example.com/sitemap.xml`

Paste the sitemap URL into Search Console and submit it.

For Websiteli projects I also check the sitemap manually before submission to make sure the important language versions, service pages and blog posts are actually present.

## Step 4: Inspect the important pages

Use **URL Inspection** for the homepage and the pages that matter commercially.

Typical examples:

- homepage
- service pages
- pricing page
- contact page
- important landing pages
- new blog posts

The point is to confirm that Google can access the URL and whether it is indexed.

## Step 5: Check indexing over the next days

Do not stop after the green verification message.

Return to Search Console and monitor:

- indexed vs non-indexed pages
- sitemap processing
- page-level indexing problems
- mobile and structured-data issues when available
- new search queries

A new website can take time to build search visibility. Search Console is useful because it lets you see the first signs before meaningful click volume arrives.

## Step 6: Use the Performance report for content ideas

This is one of the most useful parts.

Look for queries with:

- impressions but zero clicks
- average positions roughly between 10 and 40
- strong commercial relevance
- several related keyword variations

Those queries often make better content ideas than guessing what people might search for.

That is the same logic I use when deciding which Websiteli blog posts to write next.

## Common mistakes

The mistakes I see most often are:

- verifying only `www` while the live site uses the root domain
- submitting an outdated or incomplete sitemap
- forgetting multilingual URLs
- blocking important pages in robots rules
- expecting data immediately
- never checking Search Console again after setup

## What I do after Search Console

After Search Console, I normally set up analytics, conversion events and the business social accounts so the website can be measured and promoted properly.

You can also run the [free Websiteli Market Scan](/en/market-scan/) to check the visible SEO and conversion fundamentals of the website itself.`
    }
  }
};

export default post;
