export const onboardingPaths = {
  reserve: "/reserve/",
  reserveThankYou: "/reserve/thank-you/",
  onboarding: "/onboarding/",
  adminProjects: "/admin/projects/",
} as const;

type OnboardingSettingsOptions = {
  contactFallbackPath?: string;
};

function readEnvValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getPublicUrl(value: string) {
  if (!value) return "";

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "";
  } catch {
    return "";
  }
}

export function getOnboardingSettings(options: OnboardingSettingsOptions = {}) {
  const contactEmail = readEnvValue(import.meta.env.CONTACT_EMAIL);
  const reservationFormEndpoint = getPublicUrl(readEnvValue(import.meta.env.PUBLIC_RESERVATION_FORM_ENDPOINT)) || getPublicUrl(readEnvValue(import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT));
  const onboardingFormUrl = getPublicUrl(readEnvValue(import.meta.env.ONBOARDING_FORM_URL));
  const calendlyUrl = getPublicUrl(readEnvValue(import.meta.env.CALENDLY_URL));
  const contactFallbackPath = options.contactFallbackPath ?? "/en/contact/";

  return {
    contactEmail,
    reservationFormEndpoint,
    onboardingFormUrl,
    calendlyUrl,
    contactFallbackPath,
    contactHref: contactEmail ? `mailto:${contactEmail}` : contactFallbackPath,
    hasContactEmail: Boolean(contactEmail),
    hasReservationFormEndpoint: Boolean(reservationFormEndpoint),
    hasOnboardingFormUrl: Boolean(onboardingFormUrl),
    hasCalendlyUrl: Boolean(calendlyUrl),
    paths: onboardingPaths,
  };
}

export type OnboardingSettings = ReturnType<typeof getOnboardingSettings>;
