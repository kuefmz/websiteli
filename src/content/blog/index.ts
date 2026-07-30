import { localeCodes, type LocaleCode } from "../locales";
import aiContentWorkflowSmallBusiness from "./posts/ai-content-workflow-small-business";
import * as base from "./index-base";
import type { BlogPost } from "./index-base";

export type { BlogPost } from "./index-base";
export const getHeadingId = base.getHeadingId;
export const renderBlogMarkdown = base.renderBlogMarkdown;
export const getBlogIndexContent = base.getBlogIndexContent;
export const getMarketKeywords = base.getMarketKeywords;

function getNewPost(locale: LocaleCode): BlogPost {
  const translation = aiContentWorkflowSmallBusiness.translations[locale];
  const source = aiContentWorkflowSmallBusiness;

  return {
    slug: source.slug,
    status: source.status ?? "published",
    title: translation.title,
    description: translation.description,
    category: translation.category,
    tags: Array.from(new Set([...translation.tags, ...base.getMarketKeywords()])),
    featuredImage: source.image,
    imageAlt: source.imageAlt ?? translation.title,
    author: source.author,
    publishedAt: source.date,
    publishDate: source.publishDate ?? source.date,
    updatedAt: source.updated ?? source.date,
    readingTime: translation.readingTime,
    audience: translation.audience,
    excerpt: translation.excerpt,
    summary: translation.summary ?? [],
    keyTakeaways: translation.keyTakeaways ?? [],
    chatGptPrompts: translation.chatGptPrompts ?? [],
    references: translation.references ?? [],
    headings: translation.body
      .split("\n")
      .map((line) => line.match(/^##\s+(.+)$/)?.[1]?.trim())
      .filter((heading): heading is string => Boolean(heading)),
    body: translation.body,
    related: source.related,
    social: {
      linkedin: source.social?.linkedin ?? `${translation.title}\n\n${translation.description}`,
      facebook: source.social?.facebook ?? `${translation.title}\n\n${translation.description}`,
      instagram: source.social?.instagram ?? `${translation.title}\n\n${translation.excerpt}`,
    },
    faqs: translation.faqs,
    locale,
    sourceLocale: locale,
    isFallback: false,
  };
}

export function getBlogPosts(locale: LocaleCode = "en"): BlogPost[] {
  return [getNewPost(locale), ...base.getBlogPosts(locale)].sort(
    (a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate),
  );
}

export function getBlogPost(slug: string, locale: LocaleCode = "en") {
  if (slug === aiContentWorkflowSmallBusiness.slug) return getNewPost(locale);
  return base.getBlogPost(slug, locale);
}

export function getBlogStaticPaths() {
  return localeCodes.flatMap((locale) =>
    getBlogPosts(locale).map((post) => ({
      params: { locale, slug: post.slug },
      props: { post },
    })),
  );
}

export function getBlogAlternates(slug: string) {
  return localeCodes.flatMap((locale) => {
    const post = getBlogPost(slug, locale);
    return post ? [{ locale: post.locale, href: `/${post.locale}/blog/${post.slug}/` }] : [];
  });
}
