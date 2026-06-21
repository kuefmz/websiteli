import type { APIRoute } from "astro";
import { getResolvedPricing } from "../../lib/pricing.server";

const contactFormEndpoint =
  import.meta.env.CONTACT_FORM_ENDPOINT ||
  import.meta.env.LEAD_FORM_ENDPOINT ||
  import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT ||
  import.meta.env.PUBLIC_LEAD_FORM_ENDPOINT ||
  "";

const projectLabels: Record<string, string> = {
  landingPage: "Starter Page",
  businessWebsite: "Business Website",
  premiumWebsite: "Larger Website",
  maintenanceMonthly: "Website Care",
  seoSetup: "Online visibility setup",
  custom: "Custom request",
};

function cleanValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = cleanValue("name" in body ? body.name : "");
  const email = cleanValue("email" in body ? body.email : "");
  const message = cleanValue("message" in body ? body.message : "");
  const honeypot = cleanValue("website" in body ? body.website : "");

  if (honeypot) {
    return Response.json({ ok: true });
  }

  if (!name || !email || !message) {
    return Response.json({ message: "Name, email, and message are required." }, { status: 400 });
  }

  if (!contactFormEndpoint) {
    return Response.json({ message: "Contact form endpoint is not configured." }, { status: 503 });
  }

  const pricing = getResolvedPricing(request);
  const project = cleanValue("project" in body ? body.project : "");
  const projectLabel = projectLabels[project] || project || "Custom request";
  const selectedPlan = project ? pricing.plans[project as keyof typeof pricing.plans] || "Request a quote" : "";

  const payload = {
    name,
    email,
    phone: cleanValue("phone" in body ? body.phone : ""),
    company: cleanValue("company" in body ? body.company : ""),
    message: [message, projectLabel ? `Project: ${projectLabel}` : ""].filter(Boolean).join("\n\n"),
    source: cleanValue("source" in body ? body.source : "") || "websiteli.ch",
    market: pricing.market,
    country: pricing.country,
    currency: pricing.currency,
    pricingPlan: projectLabel,
    pricingPlanPrice: selectedPlan,
    pricing: pricing.plans,
  };

  const response = await fetch(contactFormEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return Response.json({ message: "Contact form endpoint rejected the request." }, { status: 502 });
  }

  return Response.json({ ok: true });
};
