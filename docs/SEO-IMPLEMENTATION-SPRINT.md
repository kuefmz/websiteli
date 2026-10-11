# Websiteli SEO implementation sprint

Status: implemented in the local `seo/swiss-commercial-sprint` branch. Nothing has been deployed or pushed. Repository: `kuefmz/websiteli` (Astro 5, static HTML, JSON locale content). Live-site observations and repository copy differed; before/after comparisons below use the checked-out repository as the implementation baseline.

## 1. Implemented improvements

- Rebuilt the German Business Websites page in Swiss Standard German, with commercial intent, one H1, buyer-oriented sections, explicit scope, four-step process, genuine existing portfolio references, FAQs, pricing and quote/review CTAs.
- Localized every homepage content section through the existing content system, including portfolio descriptions and image alternatives. Added a prominent quote CTA and direct free-review path. Existing assets, responsive classes, forms, header/footer, theme and pricing data are reused.
- Replaced German pricing-page English fallback with clear package descriptions and existing deliverables, CHF starting prices, running-cost questions, exclusions and quotation guidance. No new packages, discounts, VAT assertions, deadlines or guarantees were introduced. Maintenance remains individually quoted because the public package copy does not establish a universally applicable fee; a separate configuration contains CHF 50/month, which requires owner confirmation before making it an unconditional promise.
- Added Service, BreadcrumbList and visible FAQ structured data for the German service; visible cost FAQs drive German pricing FAQ schema. No reviews, ratings or fabricated addresses were added.
- Corrected Czech HTML language and hreflang identifiers to `cs` while keeping `/cz/` URLs; corrected Open Graph locale mapping and the main Twitter card value. Added reciprocal English/German alternates to audit funnel pages. Existing self-canonicals and other alternates remain intact.
- Kept German browser pricing in the Swiss market, preventing an IP lookup from replacing CHF with another currency. Other language pricing behaviour is retained. No language/location redirects were added.
- Added German portfolio-to-service links and stable project anchors; localized project descriptions. Added website-related article links to Business Websites and automation-related links to Business Automation. Website-topic articles take priority over incidental “AI” wording.
- Repaired 39 rendered links from three article sources pointing to missing `ai-assistants` routes, using the existing `internal-ai-assistants` service.
- Consolidated the two GA4 loaders into one consent-aware runtime using the existing ID `G-TGZY875FGJ`. No GTM ID was found or invented. Added an accessible allow/decline/settings control, default denied storage, query-free page URLs, no arbitrary attribution/form-text analytics parameters, and deduplication for confirmed leads.
- Removed false completed-enquiry events from opaque Apps Script submissions. Existing requests still use their existing workflow; they emit only non-conversion dispatch events. Session recording is disabled pending verification of field masking.

## 2. Changed files and URLs

See [changed-files.txt](changed-files.txt) for the complete file list. Principal routes:

| URL | Implemented change |
|---|---|
| `/de/services/business-websites/` | Complete German service copy, metadata, CTAs, schema and contextual links |
| `/de/` | German section copy, hero, quote/review CTAs, metadata and portfolio descriptions |
| `/de/services-pricing/` | German pricing copy, existing packages, CHF, FAQs and schema |
| `/de/portfolio/` | Project descriptions, anchors and Business Websites links |
| `/de/blog/*/` | Contextual website/automation service links in reusable article CTA |
| `/{locale}/blog/ai-document-search-small-business/` | Broken service destination repaired |
| `/{locale}/blog/scope-internal-ai-assistant-pilot/` | Broken service destination repaired |
| `/{locale}/blog/test-internal-ai-assistant-before-launch/` | Broken service destination repaired |
| `/en/audit/`, `/de/audit/` | Reciprocal language alternatives; truthful enquiry tracking |
| All shared-layout pages | Consent-gated analytics, safe parameters and corrected social/language metadata |
| `/cz/*/` shared-layout pages | `lang=cs`, `hreflang=cs`, existing Czech route paths retained |
| `/de/*/` shared pricing-runtime pages | Stable CHF pricing without geolocation calls |
| Supported Market Scan pages | Review-report request after accepted HTTP response, once per scan |

## 3. Before-and-after SEO fields

### `/de/services/business-websites/`

| Field | Before | After |
|---|---|---|
| Title | Business Website Design in Switzerland \| Websiteli | Website erstellen lassen Schweiz – für KMU \| Websiteli |
| Description | Complete websites that explain your business, build trust and generate qualified inquiries. | Professionelle Website für Ihr KMU in der Schweiz: responsives Webdesign, Kontaktformular und SEO-Grundlagen ab CHF 990. Kostenlose Offerte anfragen. |
| H1 | Business Websites | Website erstellen lassen in der Schweiz – passend zu Ihrem KMU |

### `/de/`

| Field | Before | After |
|---|---|---|
| Title | Webdesign, Automation & KI für KMU in der Schweiz \| Websiteli | Webdesign Schweiz für KMU & Kleinunternehmen \| Websiteli |
| Description | Webdesign und technische Umsetzung für KMU in der Schweiz: Websites, SEO, Analytics, Automation, KI-Assistenten und individuelle Web-Apps. Websites ab CHF 990. | Webdesign für Schweizer KMU und Selbstständige: professionelle Websites mit Kontaktformular und SEO-Grundlagen ab CHF 990. Projekte ansehen und Offerte anfragen. |
| H1 | Websites, die Besucher zu Kunden machen. | Professionelle Websites für KMU in der Schweiz |

### `/de/services-pricing/`

| Field | Before | After |
|---|---|---|
| Title | Website-Services & Preise in der Schweiz \| Websiteli | Website erstellen: Kosten Schweiz & Preise \| Websiteli |
| Description | Vergleichen Sie Websiteli-Services und Preise für Business-Websites, SEO, Wartung, Leadgenerierung, Automation und KI-Projekte in der Schweiz. | Was kostet eine Website in der Schweiz? Websiteli-Pakete ab CHF 990: Leistungen, laufende Kosten und individuelle Offerten für KMU verständlich erklärt. |
| H1 | Drei klare Pakete für typische KMU-Phasen. | Website erstellen: Kosten und Leistungen in der Schweiz |

## 4. Keyword-to-page mapping

| Page | Primary intent | Secondary queries |
|---|---|---|
| `/de/` | webdesign schweiz | webdesign KMU schweiz, website für KMU |
| `/de/services/business-websites/` | website erstellen lassen schweiz | website erstellen lassen, webdesign für KMU, professionelle website erstellen lassen, website für kleinunternehmen, website für selbstständige |
| `/de/services-pricing/` | website erstellen kosten schweiz | website kosten schweiz, webdesign preise schweiz |
| `/de/portfolio/` | Portfolio and evaluation | webdesign referenzen, website beispiele |
| `/de/contact/` | Conversion destination | Quote/review requests; no competing primary commercial keyword |

## 5. Technical SEO audit

| Area | Evidence, action and limit |
|---|---|
| Canonicals | Priority pages retain absolute self-canonicals. Existing English article fallbacks are not automatically rewritten or removed. |
| Hreflang | Generated-site audit checks destination existence and reciprocal canonicals. Invalid Czech `cz` became `cs`, preserving route identity. Audit funnels gained en/de/x-default links. Generic `de`, `fr`, `it` remain valid; regional targeting was not invented. |
| Sitemaps | Existing Astro sitemap integration excludes legacy redirects. No sitemap overhaul was justified. Existing robots declarations, including its RSS feed, are preserved. |
| Indexability | Existing index/follow pages and noindex/follow legacy stubs retained. No unsupported noindex policy introduced. |
| Redirects | Existing static JS redirect stubs remain; server-level 301/308 behaviour requires host inspection. No automatic location/language redirect introduced. |
| Broken links | Final generated audit reports no broken internal links or fragments; 39 pre-existing article links repaired. Stable portfolio fragment IDs and pricing `#problems` anchor prevent dead navigation. External project reachability is not guaranteed by this local check. |
| Duplicate content/localization | 78 duplicate-title groups remain, mainly shared English fallback content. Some German use-case pages also link through English navigation; these are recorded in the full linking map and need a separate localization pass. Many other service/industry pages still use English source copy. These need genuine translations, not arbitrary canonical consolidation or deletion. Three priority German pages are localized. |
| Metadata/headings | Priority pages have descriptions and one H1. Audit parses metadata, language annotations and JSON-LD across generated pages. Parsing is not a Google rich-results eligibility test. |
| Structured data | German service and cost FAQs match visible content. Existing broader Organization/ProfessionalService fields were not independently verified against legal records. No invented testimonials or ratings. |
| Mobile/performance | Existing grid classes and media queries reused; no new dependencies. Consent-gating removes third-party scripts before choice and German pricing avoids geolocation calls. Visual/device QA was attempted but browser installation failed (truncated download). No Lighthouse score, mobile pass or CWV result is claimed. |
| URL consistency | Existing slash-based URLs retained. Czech route key separated from ISO language code. No URL migration. |

Google guidance used: [localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [basic consent mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic). Consent implementation is a technical privacy control, not a legal-compliance certification.

## 6. Internal linking map

The full rendered German linking map is in [internal-linking-map.csv](internal-linking-map.csv), with exact source URL, destination URL, anchor and purpose. Representative links:

| Source | Destination | Anchor | Purpose |
|---|---|---|---|
| `/de/` | `/de/services/business-websites/` | Leistung ansehen (inside Business-Websites card) | Homepage discovery of main commercial service |
| `/de/` | `/de/services-pricing/#pricing` | Pakete und Website-Kosten vergleichen | Budget qualification |
| `/de/` | `/de/contact/?package=digitalFoundation&intent=website_quote` | Kostenlose Offerte anfragen | Primary enquiry path |
| `/de/` | `/de/portfolio/` | Ganzes Portfolio ansehen | Genuine project evaluation |
| `/de/portfolio/` project cards | `/de/services/business-websites/` | Business-Website für Ihr Unternehmen planen | Connect references to service |
| `/de/services/business-websites/` | `/de/portfolio/#movere-clinic` | Praxisprojekt im Portfolio ansehen | Relevant healthcare proof |
| `/de/services/business-websites/` | `/de/portfolio/#semantic-web-science-association` | Verbandswebsite im Portfolio ansehen | Genuine association project |
| `/de/services/business-websites/` | `/de/services-pricing/` | Website-Kosten und Paketumfang ansehen | Price and scope clarity |
| `/de/services/business-websites/` | `/de/blog/small-business-website/` | Ratgeber zur Website-Planung lesen | Buyer preparation |
| Website-related German articles | `/de/services/business-websites/` | Professionelle Business-Website planen | Match educational intent to commercial service |
| Automation-related German articles | `/de/services/business-automation/` | Passende Automationsleistung ansehen | Match topic to relevant service |
| `/de/services-pricing/` | `/de/services/business-websites/` | Leistungsumfang einer Business-Website ansehen | Connect budget to deliverables |

## 7. Conversion tracking specification

Transport: direct existing GA4 Google tag, single loader. GTM is absent; do not install duplicate GA4 tags in a new container.

| Event | Trigger | Implemented state |
|---|---|---|
| `generate_lead` | Readable successful HTTP response with JSON `{success:true}` for `website_quote` form | Helper and classification implemented; real firing blocked by existing opaque no-cors backend |
| `website_review_request` | Same confirmation for `website_review`, or successful Market Scan report-request HTTP response with no application error | Market Scan path implemented; contact/audit review paths blocked by opaque backend |
| `contact_form_submit` | Same confirmation for general contact | Helper implemented; real firing blocked by opaque backend |
| `consultation_booking` | Confirmed booking from authoritative provider integration | Reserved name only; no confirmed booking hook added. Existing external Calendly clicks remain engagement events |

Safe event parameters: `form_type`, `service_category`, `locale`, `landing_page`, `page_path`, and query-free `page_location`. Names/emails/phone numbers/messages, scanned domains, query strings, full referrers, arbitrary campaign text and submission keys are not sent by the runtime. Submission keys are used only for in-memory deduplication. Landing page is session-local after consent. Lead events are not replayed retrospectively after consent. `enquiry_dispatched`, `audit_email_dispatched`, `booking_click` and CTA clicks must never be marked as completed enquiries.

Consent is separate from a form's privacy-policy checkbox. Analytics stays blocked until allow; settings permit withdrawal; advertising storage remains denied. Attribution persistence is consent-gated. Existing form payload and backend workflow remain intact. Session recording is disabled until masking can be verified.

### Local verification

- `npm run build`: passes, 1,466 generated pages.
- `node scripts/test-analytics.mjs`: passes consent/no-consent, query stripping, click-lead suppression, opaque/HTTP/application failure rejection, success classification, repeated-response deduplication, PII exclusion and withdrawal tests.
- `python scripts/audit-seo.py`: generates the auditable result JSON; checks internal destinations/fragments, H1 count, descriptions, reciprocal alternate targets and JSON-LD parsing. Final result: zero reported issues.
- `git diff --check`: passes.
- Existing pricing regression suite: 12/12 tests pass. See [verification-results.txt](verification-results.txt) for final outcome. Obsolete article-title/image/event assertions were refreshed to the repository's current content where identified.
- Browser screenshots/mobile inspection: unavailable after browser installation failed. No fabricated visual pass.
- Real submissions, GA4 DebugView/GTM Preview: not tested; no production enquiries sent.

### Google-account and backend verification

1. Review GA4 stream `G-TGZY875FGJ`; disable Enhanced Measurement form interactions and confirm there are no create-event rules that transform clicks/dispatches into these four lead names. The runtime parameter is not a substitute for checking the stream settings.
2. Review Google-account event rules for duplicate `contact_form_submit` or `generate_lead` conversions. Keep one source of truth. Do not mark newsletter events or generic dispatches as equivalent website quote leads.
3. Enable a CORS-capable, acknowledged submission endpoint or same-origin proxy returning `{success:true}` only after the enquiry has actually been stored. Then change fetch from `no-cors` to a readable request and verify the helper against the backend contract. Do not do that request-mode change before the endpoint supports it.
4. On an approved staging host, use `?debug_mode=true`, allow analytics, and inspect GA4 DebugView/Tag Assistant. Test accepted, rejected, network-error and double-submit cases. Ensure denied consent emits no GA requests, and inspect payloads for PII.
5. Confirm landing-page persistence across navigation, accurate form type, one successful event per submission, and no success event on a click or failed submission. Market Scan email-report is a free report/review request, not a quote; verify delivery separately.
6. Mark `generate_lead` and `website_review_request` as appropriate key events once their production paths have been verified. Decide separately whether general contact is a qualified lead. Add safe custom dimensions for form type/service category/landing page if useful.
7. GTM Preview is not applicable to the current direct-gtag architecture. If GTM is adopted later, migrate the loader rather than adding a second one and test consent in Preview.
8. Confirm Calendly bookings via an approved provider embed or backend/webhook integration. A plain external link cannot prove a booking. No credentials were invented and no unverified cross-window callback was installed.

## 8. Remaining access/approval items

- Production deployment needs explicit approval, followed by staging/device review and post-release indexing checks.
- Backend ownership/access is needed to confirm quote, general-contact and audit requests. Current success UI still reflects the existing dispatch workflow; it is not proof that the backend stored a lead.
- GA4 account access is needed for key events, enhanced measurement, duplication audit and DebugView. The code ID is verified from source; account configuration is not.
- Calendly account or webhook access is needed for confirmed consultation tracking.
- Browser/mobile and Lighthouse QA remain outstanding. Real CWV data needs Search Console/CrUX field checks.
- Confirm hosting/domain/license fees, maintenance terms, VAT presentation and project-specific deliverables before making more precise cost promises.
- Translate remaining German and other-language fallback pages. Check all existing business/legal/social-profile fields against owner records before expanding business schema or claims.
- Server redirect status codes, public sitemap delivery and external project links need post-release/live-host verification.

## 9. Next 30 days

| Time | Action | Measure |
|---|---|---|
| Days 1–7 | Review copy and staging on mobile/desktop; resolve acknowledged submission endpoint; verify GA4 settings, consent, response paths and booking integration; approve deployment | Real delivered enquiries match single safe conversion events |
| Days 8–14 | Inspect released priority URLs in Search Console; validate canonicals/hreflang/sitemap and rich-results syntax; assess mobile Lighthouse and CWV; translate remaining German commercial fallbacks | Indexing/coverage, user-visible defects, mobile metrics |
| Days 15–21 | Improve a small set of high-impression relevant German articles with service links and verified project evidence; expand case studies only with client-approved facts | Article-to-service visits, relevant queries and quote quality |
| Days 22–30 | Compare Swiss commercial query impressions/positions/CTR and qualified enquiries against baseline; refine snippets and CTA copy based on data | Relevant organic leads and qualified enquiries; clicks/CTR as supporting measures |

Baseline supplied by owner: previous three months, 24 organic clicks, 6,875 impressions, 0.35% CTR, average position 44.3. No ranking or lead-growth outcome is claimed before release and measurement.
