import type { OnboardingSettings } from "../../config/onboarding";

export type EmailTemplate = {
  key: string;
  title: string;
  when: string;
  subject: string;
  body: string;
};

function getContactLine(settings: OnboardingSettings) {
  return settings.contactEmail ? `Questions: ${settings.contactEmail}` : "Questions: reply to this email or use the Websiteli contact page.";
}

function getOnboardingLine(settings: OnboardingSettings) {
  return settings.onboardingFormUrl
    ? `Onboarding questionnaire: ${settings.onboardingFormUrl}`
    : "Onboarding questionnaire: I will send the questionnaire link separately.";
}

function getCalendlyLine(settings: OnboardingSettings) {
  return settings.calendlyUrl
    ? `Strategy call booking: ${settings.calendlyUrl}`
    : "Strategy call booking: I will send the Calendly link separately.";
}

export function getEmailTemplates(settings: OnboardingSettings): EmailTemplate[] {
  const contactLine = getContactLine(settings);
  const onboardingLine = getOnboardingLine(settings);
  const calendlyLine = getCalendlyLine(settings);

  return [
    {
      key: "invoice",
      title: "Invoice",
      when: "Send after reviewing the reservation details.",
      subject: "Your Websiteli project reservation invoice",
      body: `Hi {{client_name}},

Thank you for reserving your Websiteli project.

I attached the manual invoice for {{project_name}}. The project starts after the payment arrives by bank transfer.

Once payment is confirmed, I will send the onboarding questionnaire and the strategy call booking link.

${contactLine}

Best,
Websiteli`,
    },
    {
      key: "payment_received",
      title: "Payment Received",
      when: "Send after manually confirming the bank transfer.",
      subject: "Payment received - next onboarding steps",
      body: `Hi {{client_name}},

Thank you. Your payment for {{project_name}} has been received.

Please complete the onboarding questionnaire and book your strategy call:

${onboardingLine}
${calendlyLine}

After we receive the questionnaire and complete the strategy call, we will confirm the build plan and timeline.

Best,
Websiteli`,
    },
    {
      key: "reminder",
      title: "Payment Reminder",
      when: "Send if the invoice is still unpaid after the agreed waiting period.",
      subject: "Friendly reminder: Websiteli project invoice",
      body: `Hi {{client_name}},

A quick friendly reminder that your Websiteli project is reserved, and the build starts after the invoice payment arrives by bank transfer.

If you already paid, thank you. I will confirm as soon as the transfer appears.

${contactLine}

Best,
Websiteli`,
    },
    {
      key: "review_ready",
      title: "Review Ready",
      when: "Send when the first website draft is ready.",
      subject: "Your first Websiteli website draft is ready",
      body: `Hi {{client_name}},

Your first website draft is ready for review:

Review link: {{review_url}}

Please check the main pages, contact details, service information, images and calls to action. Send your feedback in one message where possible so we can review it clearly.

Best,
Websiteli`,
    },
    {
      key: "launch",
      title: "Launch",
      when: "Send after the website is live and checked.",
      subject: "Your Websiteli website is live",
      body: `Hi {{client_name}},

Congratulations, your website is live:

Website: {{live_url}}

We have checked the launch basics and will share any maintenance or next-step recommendations separately.

Thank you for building with Websiteli.

Best,
Websiteli`,
    },
  ];
}
