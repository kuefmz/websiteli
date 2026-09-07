export type BlogImageMeta = {
  width: number;
  height: number;
  format: "jpg" | "png" | "webp" | "svg";
};

const DEFAULT_BLOG_IMAGE_META: BlogImageMeta = {
  width: 1536,
  height: 1024,
  format: "webp",
};

const blogImageMeta: Record<string, BlogImageMeta> = {
  "/assets/blog/10-features-business-website-needs.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/ai-chatbot-vs-internal-ai-assistant.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/ai-content-workflow-small-business.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/become-a-websiteli-partner.svg": { width: 1536, height: 1024, format: "svg" },
  "/assets/blog/business-websites-get-customers-statistics.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/ceo-website-business-asset-title.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/internal-ai-assistant-small-business.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/local-business-website.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/multilingual-website-switzerland.svg": { width: 1600, height: 900, format: "svg" },
  "/assets/blog/prepare-company-documents-internal-ai-assistant.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/private-ai-assistant-privacy-checklist-social.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/scope-internal-ai-assistant-pilot.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/scope-internal-ai-assistant-pilot-linkedin.jpg": { width: 1200, height: 627, format: "jpg" },
  "/assets/blog/small-business-lead-generation-funnel.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/small-business-lead-generation-funnel-linkedin.jpg": { width: 1200, height: 627, format: "jpg" },
  "/assets/blog/small-business-website.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/test-internal-ai-assistant-before-launch.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/utm-tracking-small-business.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/utm-tracking-small-business-linkedin.jpg": { width: 1200, height: 627, format: "jpg" },
  "/assets/blog/website-accessibility-small-business.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/website-accessibility-small-business-linkedin.jpg": { width: 1200, height: 627, format: "jpg" },
  "/assets/blog/website-backup-recovery-small-business.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/website-backup-recovery-small-business-linkedin.jpg": { width: 1200, height: 627, format: "jpg" },
  "/assets/blog/website-before-paid-ads-checklist.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/website-before-paid-ads-checklist-linkedin.jpg": { width: 1200, height: 627, format: "jpg" },
  "/assets/blog/website-cost-switzerland.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/website-first-impression.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/website-lead-qualification.svg": { width: 1600, height: 900, format: "svg" },
  "/assets/blog/website-life-cycle-statistics.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/website-maintenance-checklist.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/website-vs-facebook.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/what-should-small-business-automate-first.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/why-ai-generated-websites-are-not-enough.webp": { width: 1536, height: 1024, format: "webp" },
  "/assets/blog/your-website-shouldnt-end-at-contact-us.webp": { width: 1536, height: 1024, format: "webp" },
};

export function getBlogImageMeta(image: string): BlogImageMeta {
  return blogImageMeta[image] ?? DEFAULT_BLOG_IMAGE_META;
}
