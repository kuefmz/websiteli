import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localizedPackage = z.object({
  name: z.string(),
  description: z.string(),
  cta: z.string(),
  highlight: z.boolean().optional(),
  features: z.array(z.string()),
});

const localeSchema = z.object({
  locale: z.string(),
  language: z.string(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
  nav: z.record(z.string()),
  hero: z.record(z.string()),
  badges: z.array(z.string()),
  intro: z.string(),
  packagesIntro: z.record(z.string()),
  packages: z.array(localizedPackage),
  services: z.object({
    eyebrow: z.string(),
    title: z.string(),
    text: z.string(),
    items: z.array(z.record(z.string())),
  }),
  demos: z.object({
    eyebrow: z.string(),
    title: z.string(),
    text: z.string(),
    items: z.array(z.record(z.string())),
  }),
  caseStudies: z.record(z.string()),
  about: z.record(z.string()),
  outreach: z.object({
    headline: z.string(),
    pitch: z.string(),
    painPoints: z.array(z.string()),
    benefits: z.array(z.string()),
    cta: z.string(),
    emailSubject: z.string(),
    emailDraft: z.string(),
  }),
  contact: z.record(z.string()),
});

const locales = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/locales" }),
  schema: localeSchema,
});

export const collections = { locales };
