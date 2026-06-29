import type { LocaleCode } from "../locales";

export type BlogPostTranslation = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  language: LocaleCode;
  readingTime: string;
  audience: string;
  excerpt: string;
  summary?: string[];
  keyTakeaways?: string[];
  chatGptPrompts?: string[];
  references?: { title: string; publisher: string; href: string }[];
  faqs: { question: string; answer: string }[];
  body: string;
};

export type BlogPostSource = {
  slug: string;
  published: boolean;
  image: string;
  author: string;
  date: string;
  updated?: string;
  related: string[];
  translations: Partial<Record<LocaleCode, BlogPostTranslation>> & { en: BlogPostTranslation };
};
