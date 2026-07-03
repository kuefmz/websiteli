export const projectStatusStages = [
  {
    key: "reserved",
    label: "Reservation received",
    owner: "Websiteli",
    description: "Reservation details arrived by email and the project is waiting for manual review.",
    nextAction: "Confirm scope and prepare the invoice.",
  },
  {
    key: "invoice_sent",
    label: "Invoice sent",
    owner: "Websiteli",
    description: "Manual invoice has been emailed to the client with bank transfer instructions.",
    nextAction: "Wait for payment or send a friendly reminder.",
  },
  {
    key: "payment_pending",
    label: "Payment pending",
    owner: "Client",
    description: "The client has the invoice and the project starts after payment is received.",
    nextAction: "Check bank transfer status.",
  },
  {
    key: "paid",
    label: "Paid",
    owner: "Websiteli",
    description: "Payment has been confirmed manually.",
    nextAction: "Send the onboarding questionnaire and strategy call link.",
  },
  {
    key: "onboarding_sent",
    label: "Onboarding form sent",
    owner: "Client",
    description: "The client has the questionnaire link and can prepare website details.",
    nextAction: "Wait for questionnaire submission.",
  },
  {
    key: "questionnaire_received",
    label: "Questionnaire received",
    owner: "Websiteli",
    description: "Business details, content needs and assets have been received.",
    nextAction: "Review answers and prepare the strategy call.",
  },
  {
    key: "strategy_call_booked",
    label: "Strategy call booked",
    owner: "Client",
    description: "The Calendly strategy call is scheduled.",
    nextAction: "Run the call and confirm the build plan.",
  },
  {
    key: "build_in_progress",
    label: "Build in progress",
    owner: "Websiteli",
    description: "Website structure, copy, design, SEO basics and integrations are being built.",
    nextAction: "Prepare the first draft for review.",
  },
  {
    key: "review_ready",
    label: "Review ready",
    owner: "Client",
    description: "The first draft is ready and the client has been invited to review it.",
    nextAction: "Collect feedback and apply agreed revisions.",
  },
  {
    key: "launched",
    label: "Launched",
    owner: "Websiteli",
    description: "The website is live, checked and handed over.",
    nextAction: "Send launch email and maintenance recommendations.",
  },
] as const;

export type ProjectStatusKey = (typeof projectStatusStages)[number]["key"];

export type ProjectRecord = {
  id: string;
  packageKey: "digitalFoundation" | "growthSetup" | "aiDataUpgrade" | "websiteMaintenance" | "custom";
  status: ProjectStatusKey;
  invoiceStatus: "not_sent" | "sent" | "paid";
  onboardingStatus: "not_sent" | "sent" | "received";
  strategyCallStatus: "not_booked" | "booked" | "completed";
  updatedAt: string;
  privateRecordLocation: string;
};

export const emptyProjectTemplate: ProjectRecord = {
  id: "PROJECT-YYYY-001",
  packageKey: "digitalFoundation",
  status: "reserved",
  invoiceStatus: "not_sent",
  onboardingStatus: "not_sent",
  strategyCallStatus: "not_booked",
  updatedAt: "YYYY-MM-DD",
  privateRecordLocation: "Private spreadsheet, CRM, or local project folder",
};

export const projectFieldDefinitions = [
  { field: "id", purpose: "Internal project reference only. Avoid client names in static output." },
  { field: "packageKey", purpose: "The reserved package or custom scope." },
  { field: "status", purpose: "Current stage from the projectStatusStages list." },
  { field: "invoiceStatus", purpose: "Manual invoice state: not sent, sent, or paid." },
  { field: "onboardingStatus", purpose: "Questionnaire state: not sent, sent, or received." },
  { field: "strategyCallStatus", purpose: "Calendly call state: not booked, booked, or completed." },
  { field: "updatedAt", purpose: "Last manual status update date." },
  { field: "privateRecordLocation", purpose: "Pointer to the private system where client details are stored." },
] as const;
