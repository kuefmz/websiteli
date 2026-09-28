import type { BlogPostSource } from "../types";

const post: BlogPostSource = {
  slug: "meta-business-instagram-facebook-setup-guide",
  status: "scheduled",
  publishDate: "2026-10-11",
  image: "/assets/blog/website-vs-facebook.webp",
  imageAlt: "Meta Business Suite with Facebook and Instagram business accounts",
  author: "Websiteli",
  date: "2026-10-11",
  updated: "2026-10-11",
  related: ["website-vs-facebook", "utm-tracking-small-business", "free-website-market-scan"],
  translations: {
    en: {
      title: "How to Set Up Facebook and Instagram for a Business Properly",
      description: "A practical launch guide for creating the business Facebook Page, professional Instagram account and Meta Business setup without mixing business assets with personal ownership.",
      category: "Website Setup",
      tags: ["Meta Business Suite setup", "Facebook business page setup", "Instagram business account setup", "connect Instagram to Facebook", "business social media setup"],
      language: "en",
      readingTime: "8 min read",
      audience: "Founders and small businesses creating Facebook and Instagram accounts for a new brand",
      excerpt: "The important part is not only creating the profiles. It is making sure the business owns the assets, the right people have access, and Facebook and Instagram are connected correctly.",
      summary: [
        "Create business social assets separately from personal profiles while using personal accounts only for administration.",
        "Create the Facebook Page and Instagram professional account with consistent business information.",
        "Connect the assets through Meta's business tools.",
        "Give people the minimum access they need and keep ownership with the business."
      ],
      keyTakeaways: [
        "Keep business asset ownership clear.",
        "Use consistent branding and contact details.",
        "Connect Instagram and Facebook in the Meta business setup.",
        "Review administrator access regularly.",
        "Add tracked website links rather than unlabelled URLs."
      ],
      chatGptPrompts: [],
      references: [
        { title: "Meta Business Suite", publisher: "Meta", href: "https://business.facebook.com/" }
      ],
      faqs: [
        { question: "Do I need a personal Facebook account to manage a business Page?", answer: "Meta business assets are administered by real user accounts, but the public business Page remains separate from the administrator's personal profile." },
        { question: "Should my Instagram account be professional?", answer: "For a business, a professional account provides business features and is the appropriate format for connecting the brand to Meta's business tools." },
        { question: "Why should Facebook and Instagram be connected?", answer: "Connecting them simplifies asset management, messaging, publishing and advertising workflows inside Meta's business tools." }
      ],
      body: `## The goal is business ownership, not just two profiles

When I set up social accounts for a new website or brand, I do not treat Facebook and Instagram as two unrelated accounts.

The real goal is to create a small business asset structure:

- a Facebook Page
- an Instagram professional account
- a Meta business workspace
- clear administrator access
- consistent branding and links

This matters later when someone else needs access, when advertising starts, or when the founder no longer wants every business asset tied informally to one personal login.

## Step 1: Create the Facebook Page

Create a Page for the business using the real business name.

Before promoting it, complete the basics:

- profile image/logo
- cover image
- business category
- description
- website
- contact details
- username if available

The website and social profiles should use consistent naming and branding so customers can recognise the same business across channels.

## Step 2: Create or convert the Instagram account

Use an Instagram account dedicated to the business.

Set the profile up with:

- business name
- recognisable username
- logo/profile image
- short positioning statement
- website link
- contact details where appropriate

For a company, use a professional account rather than leaving it as a personal profile.

## Step 3: Set up Meta Business Suite

Use Meta Business Suite or the current Meta business settings interface to organise the business assets.

Meta's business tools are the place where Pages, Instagram accounts, access and advertising-related assets can be managed centrally. Meta still provides Business Suite through its business platform.

Because Meta changes the exact names and locations of settings regularly, focus on the structure rather than memorising one menu path.

## Step 4: Connect Facebook and Instagram

Add the Facebook Page and Instagram professional account to the same business setup and connect them.

After connecting, verify that:

- the correct Page is attached
- the correct Instagram account is attached
- messages and notifications are appearing in the expected inbox
- the correct people have access

Do not assume the connection worked just because both accounts exist.

## Step 5: Review access

Only give people the permissions they need.

Keep at least one reliable administrator with full business access, and avoid sharing passwords between team members.

When contractors or agencies help, grant access rather than handing over the owner's login credentials.

## Step 6: Add the website with tracking

Do not just paste the website URL everywhere.

For campaigns and specific posts, use UTM parameters so GA4 can tell you whether traffic came from Instagram, Facebook, a specific campaign or a particular post.

For example:

'?utm_source=instagram&utm_medium=social&utm_campaign=launch'

The exact convention matters less than using it consistently.

## Step 7: Prepare the accounts before posting heavily

Before launching content, I usually make sure the profiles do not look empty.

Prepare:

- a clear introduction post
- a product/service explanation
- one proof or portfolio example
- one useful educational post
- contact/website information

A profile with basic context feels much more legitimate when the first visitors arrive from the website or search.

## The setup I use around a new website

For a new business launch, the social accounts are only one part of the stack.

I normally combine them with:

- Google Search Console
- GA4
- conversion tracking
- sitemap/indexing checks
- business email
- social business accounts
- UTM tracking
- a basic reporting view

This creates a system that can actually be measured instead of just a collection of accounts.

You can use the [free Websiteli Market Scan](/en/market-scan/) to check whether the website itself is ready before sending social traffic to it.`
    }
  }
};

export default post;
