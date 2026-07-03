# Google Apps Script Reservations Handler

Use this Apps Script for the website form endpoint. It supports:

- `Newsletter` sheet for newsletter signups
- `Form` sheet for the existing contact form
- `Reservations` sheet for `/reserve`
- automatic notification email to Websiteli
- automatic confirmation email to the client

Recommended `Reservations` sheet headers:

```text
Timestamp
Full name
Business name
Email
Phone
Country
Website/social
Project type
Project type key
Preferred language
Description
Consent accepted
Source URL
Referrer
Submitted at
User agent
```

Paste this into Google Apps Script and deploy it as a web app. Then set the web app URL as `PUBLIC_RESERVATION_FORM_ENDPOINT` or reuse `PUBLIC_CONTACT_FORM_ENDPOINT`.

```js
const ADMIN_EMAIL = "jenifer.girl.98@gmail.com";

function doGet(e) {
  return jsonResponse({
    ok: true,
    message: "Website form endpoint is running",
  });
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);

    if (data.website) {
      return jsonResponse({ ok: true });
    }

    if (data.type === "newsletter") {
      return handleNewsletter(ss, data);
    }

    if (data.type === "reservation") {
      return handleReservation(ss, data);
    }

    if (data.type === "form") {
      return handleForm(ss, data);
    }

    return jsonResponse({ ok: false, error: "Unknown request type" });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function handleNewsletter(ss, data) {
  const sheet = getRequiredSheet(ss, "Newsletter");
  const email = String(data.email || "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return jsonResponse({ ok: false, error: "Invalid email" });
  }

  const existingEmails = sheet
    .getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1)
    .getValues()
    .flat()
    .map(String)
    .map((value) => value.toLowerCase());

  if (!existingEmails.includes(email)) {
    sheet.appendRow([email]);

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: "New newsletter subscriber",
      htmlBody: `
        <p>You have a new newsletter subscriber:</p>
        <p><strong>${escapeHtml(email)}</strong></p>
      `,
    });
  }

  return jsonResponse({ ok: true });
}

function handleReservation(ss, data) {
  const sheet = getRequiredSheet(ss, "Reservations");
  const email = String(data.email || "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return jsonResponse({ ok: false, error: "Invalid reservation email" });
  }

  sheet.appendRow([
    new Date(),
    data.fullName || "",
    data.businessName || "",
    data.email || "",
    data.phone || "",
    data.country || "",
    data.websiteOrSocial || "",
    data.projectType || "",
    data.projectTypeKey || "",
    data.preferredLanguage || "",
    data.description || "",
    data.consentAccepted ? "yes" : "no",
    data.sourceUrl || "",
    data.referrer || "",
    data.submittedAt || "",
    data.userAgent || "",
  ]);

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Websiteli reservation from ${data.fullName || "someone"}`,
    htmlBody: `
      <h2>New Websiteli reservation</h2>
      ${reservationHtml(data)}
    `,
  });

  MailApp.sendEmail({
    to: email,
    replyTo: ADMIN_EMAIL,
    subject: "We received your Websiteli project reservation",
    htmlBody: `
      <p>Hi ${escapeHtml(data.fullName || "there")},</p>
      <p>Thank you for reserving your Websiteli project. We received your details and will review them shortly.</p>
      <p>The next step is manual: Websiteli will confirm the scope and send an invoice by email. The project starts after payment arrives by bank transfer.</p>
      <h3>Your reservation details</h3>
      ${reservationHtml(data)}
      <p>You can reply to this email if you want to add context or correct anything.</p>
      <p>Best,<br>Websiteli</p>
    `,
  });

  return jsonResponse({ ok: true });
}

function handleForm(ss, data) {
  const sheet = getRequiredSheet(ss, "Form");

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.company || "",
    data.projectStage || "",
    data.automationGoal || "",
    data.currentTools || "",
    data.timeline || "",
  ]);

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: `New website inquiry from ${data.name || "someone"}`,
    htmlBody: `
      <p><strong>Name:</strong> ${escapeHtml(data.name || "")}</p>
      <p><strong>Work email:</strong> ${escapeHtml(data.email || "")}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company || "")}</p>
      <p><strong>Project stage:</strong> ${escapeHtml(data.projectStage || "")}</p>
      <p><strong>What would they like to automate?</strong></p>
      <p>${escapeHtml(data.automationGoal || "")}</p>
      <p><strong>Current tools or systems:</strong></p>
      <p>${escapeHtml(data.currentTools || "")}</p>
      <p><strong>Target timeline:</strong> ${escapeHtml(data.timeline || "")}</p>
    `,
  });

  return jsonResponse({ ok: true });
}

function reservationHtml(data) {
  return `
    <p><strong>Full name:</strong> ${escapeHtml(data.fullName || "")}</p>
    <p><strong>Business name:</strong> ${escapeHtml(data.businessName || "")}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email || "")}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone || "")}</p>
    <p><strong>Country:</strong> ${escapeHtml(data.country || "")}</p>
    <p><strong>Website/social:</strong> ${escapeHtml(data.websiteOrSocial || "")}</p>
    <p><strong>Project type:</strong> ${escapeHtml(data.projectType || "")}</p>
    <p><strong>Preferred language:</strong> ${escapeHtml(data.preferredLanguage || "")}</p>
    <p><strong>Description:</strong></p>
    <p>${escapeHtml(data.description || "")}</p>
    <p><strong>Source URL:</strong> ${escapeHtml(data.sourceUrl || "")}</p>
  `;
}

function getRequiredSheet(ss, name) {
  const sheet = ss.getSheetByName(name);
  if (!sheet) {
    throw new Error(`${name} sheet not found`);
  }

  return sheet;
}

function testEmail() {
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: "Test email from Apps Script",
    htmlBody: "<p>If you received this, MailApp works.</p>",
  });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
```
