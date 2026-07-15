# Analytics And Attribution

This document describes GA4, campaign attribution, conversion events, form metadata, and validation.

## Google Analytics

GA4 Measurement ID:

```text
G-TGZY875FGJ
```

Initialization is in `src/layouts/Layout.astro`.

Important ordering:

1. `AttributionRuntime.astro` renders before the GA snippet.
2. Attribution is read into `gtagConfig`.
3. `gtag('set', attributionParams)` is called.
4. `gtag('config', 'G-TGZY875FGJ', gtagConfig)` is called.

Do not move GA above attribution initialization.

## Google Tag Manager

There is no GTM container snippet currently. The implementation uses direct `gtag.js`.

If GTM is added later, document the container ID here and make sure it does not duplicate GA page_view events.

## Page Views

`Layout.astro` relies on GA4's automatic page_view from `gtag('config', ...)`.

Important behavior:

- No separate explicit `gtag('event', 'page_view')` should be added.
- Home pages use GA `page_path="/"` so `/en/` can be considered homepage in GA path reporting.
- Home `page_location` preserves query string and hash.
- Non-home pages use `window.location.href` as `page_location`.

## UTM And Click-ID Tracking

Implemented in `src/components/AttributionRuntime.astro`.

Stored in localStorage:

```text
websiteli_attribution
```

Redirect context stored in sessionStorage:

```text
websiteli_redirect_context
```

Supported UTM keys:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `utm_id`

Supported click IDs:

- `gclid`
- `gbraid`
- `wbraid`
- `fbclid`
- `msclkid`
- `ttclid`
- `li_fat_id`

Attribution stores first-touch and last-touch. Conversion events and form payloads include both active and first-touch fields where available.

## Public Debug Helpers

Available in browser console:

- `window.websiteliGetAttribution()`
- `window.websiteliGetCurrentAttribution()`
- `window.websiteliGetAnalyticsAttributionParams()`
- `window.websiteliShowAttribution()`
- `window.websiteliInitialAttribution`

Use `?debug_mode=true` to pass GA4 `debug_mode` to config/events.

## Tracked Events

Event names currently emitted:

- `utm_detected`
- `campaign_landing`
- `market_change`
- `package_view`
- `package_cta_click`
- `pricing_section_view`
- `contact_form_start`
- `contact_form_submit`
- `newsletter_subscribe`
- `quote_button_click`
- `demo_nav_click`
- `demo_opened`
- `demo_request_click`
- `hero_engine_module_click`
- `hero_engine_detail_open`
- `service_viewed`
- `automation_page_viewed`
- `service_cta_click`
- `industry_page_viewed`
- `industry_cta_click`
- `blog_consultation_click`
- `blog_newsletter_click`
- `blog_share_click`
- `email_click`
- `whatsapp_click`

Generic click tracking is implemented through `[data-track-event]` in `Layout.astro`.

## Event Sources

| Event | Source |
| --- | --- |
| `utm_detected` | `PricingRuntime.astro` on DOMContentLoaded when current URL has attribution |
| `campaign_landing` | `PricingRuntime.astro` on DOMContentLoaded when current URL has attribution |
| `market_change` | `PricingRuntime.astro` after country/pricing detection |
| `package_view` | `PricingRuntime.astro` IntersectionObserver on package cards |
| `package_cta_click` | `PricingRuntime.astro` package CTA listener |
| `pricing_section_view` | `Layout.astro` IntersectionObserver on `#pricing` |
| `contact_form_start` | `CTASection.astro` first form input |
| `contact_form_submit` | `CTASection.astro` successful post attempt |
| `newsletter_subscribe` | `Footer.astro` successful post attempt |
| `quote_button_click` | Header tracked contact CTA |
| `demo_nav_click` | Header/mobile demo CTA |
| `demo_opened` | Portfolio demo gallery live-demo links |
| `demo_request_click` | Portfolio demo gallery request-similar CTA |
| `hero_engine_module_click` | Homepage Business Growth Engine module links |
| `hero_engine_detail_open` | Homepage Business Growth Engine detail popover |
| `service_viewed` | Generated service detail pages |
| `automation_page_viewed` | Generated automation service detail pages |
| `service_cta_click` | Generated service page CTAs |
| `industry_page_viewed` | Generated industry detail pages |
| `industry_cta_click` | Generated industry page CTAs |
| `blog_consultation_click` | `ArticleCTA.astro` primary CTA |
| `blog_newsletter_click` | `ArticleCTA.astro` newsletter CTA |
| `blog_share_click` | `ArticleShare.astro` share/copy controls |
| `email_click` | Footer email link |
| `whatsapp_click` | Footer WhatsApp link |

## Conversion Metadata

Lead form payload includes:

- type: `form`
- name, email, phone, company, need, message
- language, country, currency, market
- page URL, referrer, user agent
- UTM fields and click IDs
- landing page and first-touch fields
- source, package key, related demo/project
- source page/path, inquiry intent, price shown
- privacy policy accepted/version/URL
- timestamp

Newsletter payload includes:

- type: `newsletter`
- email
- language, country, currency, market
- page URL, referrer, user agent
- UTM fields and click IDs
- landing page and first-touch fields
- privacy policy accepted/version/URL
- timestamp

## Cookies And Storage

Project code does not set custom cookies.

Storage used:

- `localStorage.theme`
- `localStorage.websiteli_attribution`
- `sessionStorage.websiteli_redirect_context`

GA4 may set its own cookies.

## Privacy Considerations

- Forms require privacy consent.
- Honeypot fields reduce bot spam.
- Payloads include user agent and campaign metadata; privacy policy must disclose analytics/contact processing.
- No custom cookie consent banner exists currently.

## Expected GA4 Dashboards

Useful realtime dimensions:

- Event name
- Page path and screen class
- First user source/medium
- Session source/medium
- Event parameters: `utm_source`, `utm_medium`, `utm_campaign`, `landing_page`, `source_path`, `pricing_market`, `package_key`

Important caveat: GA4 "First user source" is not rewritten for an existing browser/client. Test attribution with a fresh browser profile, incognito window, or cleared GA cookies.

## Validation Procedure

1. Open a fresh browser profile or incognito window.
2. Visit:

   ```text
   https://websiteli.ch/?utm_source=test&utm_medium=email&utm_campaign=utm_test&debug_mode=true
   ```

3. In console, run:

   ```js
   websiteliShowAttribution()
   ```

4. Confirm GA4 DebugView shows page activity.
5. Submit a test form only if the Google Apps Script destination can receive test data.
6. Confirm events include UTM parameters.

## Regression Rules

- Never add duplicate `page_view` events.
- Never strip query strings before attribution and GA config run.
- Never remove hidden attribution fields from forms.
- Never remove first-touch persistence without replacement.
- Never change GA path normalization for home without documenting the reporting impact.
