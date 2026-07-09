import type { BlogPostSource, BlogPostTranslation } from "../types";

const references = [
  {
    publisher: "Netcraft",
    title: "June 2026 Web Server Survey",
    href: "https://www.netcraft.com/blog/june-2026-web-server-survey",
  },
  {
    publisher: "Netcraft",
    title: "January 2026 Web Server Survey",
    href: "https://www.netcraft.com/blog/january-2026-web-server-survey",
  },
  {
    publisher: "Pew Research Center",
    title: "When Online Content Disappears",
    href: "https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/",
  },
  {
    publisher: "DataReportal",
    title: "Digital Around the World",
    href: "https://datareportal.com/global-digital-overview",
  },
  {
    publisher: "HTTP Archive Web Almanac",
    title: "Page Weight 2025",
    href: "https://almanac.httparchive.org/en/2025/page-weight",
  },
  {
    publisher: "HTTP Archive Web Almanac",
    title: "CMS 2025",
    href: "https://almanac.httparchive.org/en/2025/cms",
  },
  {
    publisher: "W3Techs",
    title: "Usage Statistics and Market Share of WordPress, July 2026",
    href: "https://w3techs.com/technologies/details/cm-wordpress",
  },
  {
    publisher: "StatCounter",
    title: "Search Engine Market Share Worldwide",
    href: "https://gs.statcounter.com/search-engine-market-share",
  },
  {
    publisher: "WebAIM",
    title: "The WebAIM Million 2026",
    href: "https://webaim.org/projects/million/",
  },
  {
    publisher: "Ahrefs",
    title: "96.55% of Content Gets No Traffic From Google",
    href: "https://ahrefs.com/blog/search-traffic-study/",
  },
];

type WebsiteLifecycleCopy = Omit<BlogPostTranslation, "summary" | "keyTakeaways" | "chatGptPrompts" | "faqs" | "references" | "body"> & {
  summary: string[];
  takeaways: string[];
  prompts: string[];
  faq: {
    daily: string;
    dailyAnswer: string;
    abandoned: string;
    abandonedAnswer: string;
    lifespan: string;
    lifespanAnswer: string;
    update: string;
    updateAnswer: string;
    business: string;
    businessAnswer: string;
  };
};

const enCopy: WebsiteLifecycleCopy = {
  title: "How Many Websites Are Launched Every Day? The Lifecycle of the Modern Web",
  description: "A research-backed guide to website growth, inactive websites, web decay, and what small businesses can learn from the lifecycle of the modern web.",
  category: "Website Strategy",
  tags: [
    "website statistics",
    "web design statistics",
    "website lifecycle",
    "abandoned websites",
    "small business website",
    "website maintenance",
    "digital decay",
    "SEO statistics",
    "website strategy",
  ],
  language: "en",
  readingTime: "9 min read",
  audience: "Small business owners who want to understand why launching a website is only the beginning",
  excerpt: "The web grows by millions of sites each month, but many pages disappear, decay, or never get traffic. The lesson for businesses is simple: launch is not the finish line.",
  summary: [
    "Netcraft counted 1.489 billion sites across 304.1 million domains in its June 2026 Web Server Survey.",
    "Between Netcraft's January and June 2026 surveys, the number of sites increased by about 112.4 million, or roughly 865,000 net additional sites per day across that period.",
    "There is no single authoritative count of abandoned websites, so the best evidence comes from proxy measures such as inactive sites, missing pages, broken links, and pages with no search traffic.",
    "Pew Research Center found that 25% of webpages that existed at one point between 2013 and 2023 were no longer accessible as of October 2023, and 38% of pages from 2013 had disappeared after a decade.",
    "For businesses, the main risk is not only failing to launch. It is launching once and then letting the site become outdated, slow, inaccessible, invisible, or untrusted.",
  ],
  takeaways: [
    "Treat website launch as day one, not the end of the project.",
    "Separate total websites from active, maintained, useful websites; those are not the same thing.",
    "Update key pages at least quarterly, especially services, prices, contact details, proof, and FAQs.",
    "Monitor broken links, outdated claims, page speed, accessibility issues, and search visibility.",
    "A small, well-maintained website can beat a larger abandoned one.",
  ],
  prompts: [
    "Audit my website and tell me which pages look outdated, abandoned, or low-trust.",
    "Create a quarterly website maintenance checklist for my small business.",
    "Rewrite my homepage so it feels current, trustworthy, and clear for first-time visitors.",
    "Find which pages on my website should be updated first based on business impact.",
  ],
  faq: {
    daily: "How many websites are launched every day?",
    dailyAnswer: "There is no perfect live counter for new websites. A careful way to estimate growth is to compare large-scale surveys. Netcraft counted 1,376,952,390 sites in January 2026 and 1,489,396,284 in June 2026, a net increase of about 112.4 million sites across roughly 130 days, or about 865,000 net additional sites per day during that period.",
    abandoned: "How many abandoned websites exist?",
    abandonedAnswer: "There is no authoritative global count of abandoned websites because abandonment is hard to define. A parked domain, an unchanged brochure site, a broken blog, and a site with no traffic are different things. The safest approach is to talk about proxies: inactive sites, disappearing pages, broken links, outdated content, and pages with no search traffic.",
    lifespan: "What is the average lifecycle of a website?",
    lifespanAnswer: "Reliable global lifecycle data is limited, but the evidence shows that web content decays over time. Pew Research Center found that 25% of webpages that existed at one point between 2013 and 2023 were no longer accessible by October 2023, and 38% of pages from 2013 were gone after a decade.",
    update: "How often should a business update its website?",
    updateAnswer: "At minimum, review key business pages quarterly and update urgent information immediately. Service pages, pricing, contact details, photos, testimonials, opening hours, staff, portfolio, and FAQs should not look forgotten.",
    business: "Why does this matter for small businesses?",
    businessAnswer: "Because many competitors launch websites and then neglect them. A maintained website with current information, fast pages, working links, clear CTAs, and trustworthy proof can stand out even in a crowded web.",
  },
};

const translations: BlogPostSource["translations"] = {
  en: makeWebsiteLifecycleTranslation(enCopy),
};

function makeWebsiteLifecycleTranslation(copy: WebsiteLifecycleCopy): BlogPostTranslation {
  const body = `## The short answer

Hundreds of thousands of websites can be added to the web on a net basis on an average day, but that number needs context. A new website going online does not mean it is useful, maintained, visible in search, or trusted by customers.

Netcraft's June 2026 Web Server Survey received responses from 1,489,396,284 sites across 304,146,307 domains and 14,653,771 web-facing computers. In January 2026, Netcraft counted 1,376,952,390 sites. That means the web grew by about 112.4 million sites between those two surveys, or roughly 865,000 net additional sites per day across that period. ([Netcraft June 2026](https://www.netcraft.com/blog/june-2026-web-server-survey), [Netcraft January 2026](https://www.netcraft.com/blog/january-2026-web-server-survey)).

But this is not the same as saying every one of those sites is a real, active business website. The web is full of parked domains, automatically generated pages, old blogs, forgotten landing pages, test projects, broken pages, and sites that technically exist but no longer help anyone.

## The web is huge, but useful attention is scarce

The internet keeps growing. DataReportal reports that 5.83 billion people used a mobile phone in April 2026, equal to 70.4% of the world's population. That helps explain why businesses still need a professional web presence: customers are online, searching, comparing, checking trust, and deciding whether to contact you. ([DataReportal](https://datareportal.com/global-digital-overview)).

At the same time, being online is no longer special. If there are more than 1.4 billion measured sites, your business is not competing only with direct local competitors. You are competing with every other tab, search result, directory listing, marketplace, review site, AI answer, and social profile your customer sees.

That is why the question is not only: "Do we have a website?" A better question is: "Is our website alive, useful, findable, trustworthy, and easy to act on?"

## Website launch is only the first lifecycle stage

A business website usually goes through five stages:

1. **Launch:** the domain, design, pages, analytics, and contact paths go live.
2. **Discovery:** search engines, directories, social posts, ads, referrals, and customers start finding it.
3. **Use:** visitors read, compare, click, call, book, buy, or leave.
4. **Maintenance:** the business updates offers, proof, photos, speed, security, accessibility, and content.
5. **Decay or renewal:** the website either stays useful through updates or slowly becomes outdated.

Most website problems happen after launch. The first version may look fine, but over time opening hours change, team members leave, services evolve, photos look old, plugins slow down, links break, legal pages age, testimonials become stale, and competitors publish better answers.

## How many abandoned websites exist?

There is no reliable global number for abandoned websites. The problem is definition. Is a website abandoned if it has not been updated for one year? If the contact form is broken? If it gets no traffic? If the business closed but the domain still resolves? If it is a parked domain? Different studies measure different things.

So the honest answer is: **we cannot give one precise global abandoned-website count.** What we can measure is web decay.

Pew Research Center found that a quarter of webpages that existed at one point between 2013 and 2023 were no longer accessible as of October 2023. For older pages, the decay was stronger: 38% of webpages that existed in 2013 were no longer accessible a decade later. Pew also found that 23% of sampled news webpages contained at least one broken link. ([Pew Research Center](https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/)).

For a small business, this matters because customers experience decay as doubt. A broken link, an old copyright year, a missing HTTPS setup, an outdated service page, or a dead contact form can make the business feel inactive even if it is still open.

## Many pages exist but receive no search traffic

A website can be live and still invisible. Ahrefs analysed pages in its index and reported that 96.55% of pages get no organic traffic from Google. This does not mean those pages have no value at all, but it does show how difficult it is to publish a page and expect traffic automatically. ([Ahrefs](https://ahrefs.com/blog/search-traffic-study/)).

The lesson is simple: publishing is not enough. A page needs a purpose, a clear search or customer intent, internal links, useful content, technical health, and a reason for people to trust it.

For a business, the pages most worth maintaining are usually:

- the homepage;
- service pages;
- location pages;
- contact and booking pages;
- pricing or package pages;
- portfolio, case study, or testimonial pages;
- FAQ pages that answer real sales questions.

## The modern website is heavier than before

Websites have also become technically heavier. HTTP Archive's 2025 Web Almanac reported that the median desktop home page was 2,862 KB and the median mobile home page was 2,559 KB in July 2025. It also reported that the median mobile home page grew from 845 KB in July 2015 to 2,362 KB in July 2025. ([HTTP Archive Web Almanac](https://almanac.httparchive.org/en/2025/page-weight)).

This matters because a neglected website often becomes slower over time. Large images, unused scripts, old themes, heavy plugins, tracking tags, and uncompressed assets can turn a simple business site into a slow experience.

Speed is not just a developer metric. It affects whether customers stay long enough to understand your offer.

## CMS tools are everywhere, but maintenance still matters

The web is easier to publish on than ever. HTTP Archive's 2025 Web Almanac found that CMS-driven sites accounted for over 54% of observed websites in 2025. W3Techs reported in July 2026 that WordPress was used by 41.5% of all websites and 59.2% of websites with a known CMS. ([HTTP Archive Web Almanac](https://almanac.httparchive.org/en/2025/cms), [W3Techs](https://w3techs.com/technologies/details/cm-wordpress)).

This is good news for small businesses because websites are more accessible than before. But it also creates a trap: because publishing is easy, many websites are launched without a long-term plan.

A builder, theme, or CMS can help you publish. It cannot automatically keep your offer clear, your proof current, your images optimized, your forms tested, or your content aligned with what customers search for now.

## Search visibility is still a major part of the lifecycle

Search is changing because of AI answers, social discovery, maps, directories, and marketplaces. But traditional search still matters. StatCounter reported Google at 91.27% worldwide search engine market share in June 2026. ([StatCounter](https://gs.statcounter.com/search-engine-market-share)).

For a small business, this means your website should still be built for clear discovery:

- one page per important service;
- clear headings that match customer language;
- local signals where relevant;
- useful FAQs;
- descriptive titles and meta descriptions;
- internal links between related services;
- proof that the business is real and active.

AI search makes this even more important, not less. If your website does not clearly explain who you help, what you offer, where you work, and why customers should trust you, it is harder for both humans and machines to understand it.

## Accessibility problems are also part of website decay

A website can look modern and still be difficult to use. WebAIM's 2026 Million found detectable WCAG 2 failures on 95.9% of the top one million home pages. Because WebAIM only counted automatically detectable issues, the real rate of full accessibility problems is likely higher. ([WebAIM](https://webaim.org/projects/million/)).

Common issues include low contrast, missing alternative text, empty links, unlabeled forms, unclear buttons, and keyboard navigation problems. These are not only compliance concerns. They are customer-experience problems.

If people cannot read, navigate, submit, or understand your website comfortably, the website is losing potential customers.

## What this means for small businesses

The web is crowded, fast-moving, and full of decay. That sounds negative, but it creates a practical opportunity.

Many businesses launch a website and then forget it. They do not update services, test forms, improve speed, fix broken links, add proof, answer new customer questions, or adapt to search changes. Over time, the site becomes a digital business card that says: "We existed once."

A maintained website sends a different message: "We are active, reachable, trustworthy, and ready to help."

## The Websiteli website lifecycle checklist

Use this checklist every quarter:

- Check that your contact form works.
- Check that phone, email, opening hours, location, and booking links are correct.
- Update services, prices, packages, and availability.
- Replace outdated photos or old portfolio examples.
- Add recent testimonials, reviews, or case studies.
- Fix broken links and redirects.
- Compress large images and remove unnecessary scripts.
- Review your homepage on mobile.
- Test your main call to action.
- Refresh pages that are important for search.
- Add answers to questions customers asked recently.
- Check basic accessibility: contrast, alt text, labels, and button clarity.

## Conclusion

The web does not only grow. It also decays.

Netcraft's surveys show a web with more than 1.4 billion measured sites. Pew Research Center shows that large parts of the web disappear over time. Ahrefs shows that most indexed pages get no organic traffic from Google. HTTP Archive shows that pages have become heavier. WebAIM shows that accessibility failures are still widespread.

For small businesses, the lesson is clear: launching a website is not enough. A website needs a lifecycle. It needs maintenance, updates, measurement, and improvement.

In a web full of forgotten pages, a clear and well-maintained business website can stand out.`;

  return {
    title: copy.title,
    description: copy.description,
    category: copy.category,
    tags: copy.tags,
    language: copy.language,
    readingTime: copy.readingTime,
    audience: copy.audience,
    excerpt: copy.excerpt,
    summary: copy.summary,
    keyTakeaways: copy.takeaways,
    chatGptPrompts: copy.prompts,
    references,
    faqs: [
      { question: copy.faq.daily, answer: copy.faq.dailyAnswer },
      { question: copy.faq.abandoned, answer: copy.faq.abandonedAnswer },
      { question: copy.faq.lifespan, answer: copy.faq.lifespanAnswer },
      { question: copy.faq.update, answer: copy.faq.updateAnswer },
      { question: copy.faq.business, answer: copy.faq.businessAnswer },
    ],
    body,
  };
}

export default {
  slug: "website-life-cycle-statistics",
  title: "How Many Websites Are Launched Every Day? The Lifecycle of the Modern Web",
  language: "en",
  description: "A research-backed guide to website growth, inactive websites, web decay, and what small businesses can learn from the lifecycle of the modern web.",
  tags: [
    "website statistics",
    "web design statistics",
    "website lifecycle",
    "abandoned websites",
    "small business website",
    "website maintenance",
    "digital decay",
    "SEO statistics",
    "website strategy",
  ],
  published: true,
  status: "published",
  image: "/assets/blog/website-life-cycle-statistics.png",
  imageAlt: "Infographic showing the lifecycle of a website from launch to discovery, maintenance, decay, and renewal.",
  author: "Websiteli",
  date: "2026-07-09",
  publishDate: "2026-07-09",
  updated: "2026-07-09",
  related: [
    "/en/services-pricing/",
    "/en/blog/why-business-websites-get-customers/",
    "/en/blog/business-website-features/",
    "/en/blog/small-business-website/",
    "/en/contact/",
  ],
  translations,
} satisfies BlogPostSource;
