(() => {
  if (window.websiteliAnalyticsInitialized) return;
  window.websiteliAnalyticsInitialized = true;
  const measurementId = 'G-TGZY875FGJ';
  const consentKey = 'websiteli_analytics_consent_v1';
  const leadEvents = new Set(['generate_lead', 'website_review_request', 'contact_form_submit', 'consultation_booking']);
  const completed = new Set();
  const safePath = () => window.location.pathname;
  let landingPage = safePath();
  let granted = false;
  let loaded = false;
  try {
    granted = localStorage.getItem(consentKey) === 'granted';
    landingPage = sessionStorage.getItem('websiteli_analytics_landing') || landingPage;
  } catch {}
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  function start() {
    if (!granted || loaded) return;
    loaded = true;
    try { sessionStorage.setItem('websiteli_analytics_landing', landingPage); } catch {}
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    const config = {
      page_location: window.location.origin + safePath(),
      page_referrer: '',
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      // Automatic form interactions do not confirm delivery and can expose field context.
      enhanced_measurement: false,
    };
    if (new URLSearchParams(window.location.search).get('debug_mode') === 'true') config.debug_mode = true;
    window.gtag('config', measurementId, config);
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
    // Session recording remains disabled until form masking is verified.

  }
  function send(name, params = {}) {
    if (!granted || !/^[a-z][a-z0-9_]{0,39}$/.test(name)) return;
    // An allowlist excludes arbitrary form text, URLs, campaign parameters and identifiers.
    const values = { landing_page: landingPage, page_path: safePath(), page_location: window.location.origin + safePath() };
    for (const key of ['form_type', 'service_category', 'locale']) {
      const value = params[key];
      if (typeof value === 'string' && /^[a-z][a-z_-]{0,40}$/.test(value)) values[key] = value;
    }
    if (new URLSearchParams(window.location.search).get('debug_mode') === 'true') values.debug_mode = true;
    window.gtag('event', name, values);
  }
  window.trackWebsiteliEvent = (name, params) => { if (!leadEvents.has(name)) send(name, params); };
  window.websiteliTrackConfirmedLead = (name, params = {}, submissionKey) => {
    if (!leadEvents.has(name) || !submissionKey || completed.has(submissionKey)) return;
    completed.add(submissionKey);
    send(name, params);
  };
  // Only a readable, explicitly successful application acknowledgement confirms an enquiry.
  window.websiteliConfirmEnquiry = async (response, { formType, serviceCategory = 'websites', submissionKey } = {}) => {
    if (!response || response.type === 'opaque' || !response.ok) return false;
    const result = await response.clone().json().catch(() => null);
    if (result?.success !== true) return false;
    const name = formType === 'website_quote' ? 'generate_lead' : formType === 'website_review' ? 'website_review_request' : 'contact_form_submit';
    window.websiteliTrackConfirmedLead(name, { form_type: formType, service_category: serviceCategory, locale: document.documentElement.lang }, submissionKey);
    return true;
  };
  window.websiteliSetAnalyticsConsent = (allow) => {
    granted = allow === true;
    try { localStorage.setItem(consentKey, granted ? 'granted' : 'denied'); } catch {}
    window.gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
    if (granted) start();
    else {
      try { localStorage.removeItem('websiteli_attribution'); sessionStorage.removeItem('websiteli_analytics_landing'); } catch {}
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.trim().split('=')[0];
        if (/^(_ga|_gid|_gat|_cs_)/.test(name)) {
          for (const domain of ['', '; domain=' + window.location.hostname, '; domain=.websiteli.ch']) document.cookie = name + '=; Max-Age=0; path=/' + domain;
        }
      }
      // Stop already loaded optional scripts after withdrawal.
      if (loaded) window.location.reload();
    }
    document.querySelector('[data-analytics-consent]')?.setAttribute('hidden', '');
  };
  start();
  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('[data-analytics-consent]');
    let choice = null;
    try { choice = localStorage.getItem(consentKey); } catch {}
    if (!choice) banner?.removeAttribute('hidden');
    document.querySelector('[data-analytics-accept]')?.addEventListener('click', () => window.websiteliSetAnalyticsConsent(true));
    document.querySelector('[data-analytics-decline]')?.addEventListener('click', () => window.websiteliSetAnalyticsConsent(false));
    document.querySelector('[data-analytics-settings]')?.addEventListener('click', () => banner?.removeAttribute('hidden'));
    document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target.closest('[data-track-event]') : null;
      if (target) window.trackWebsiteliEvent(target.dataset.trackEvent);
    });
  });
})();
