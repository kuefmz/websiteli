import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const assetDir = fileURLToPath(new URL("../public/assets/blog/", import.meta.url));

const posts = [
  {
    slug: "scope-internal-ai-assistant-pilot",
    category: "AI IMPLEMENTATION",
    label: "Small-business AI guide",
    titleLines: ["Scope an Internal", "AI Assistant Pilot"],
    subtitle: "One use case. Trusted sources. Clear criteria.",
    bullets: ["Choose the right first workflow", "Set permissions before indexing", "Measure go / stop signals"],
    accent: "#e32635",
    secondary: "#0f9f94",
    visual: "aiPilot",
  },
  {
    slug: "website-before-paid-ads-checklist",
    category: "WEBSITE STRATEGY",
    label: "Pre-ads checklist",
    titleLines: ["Before You", "Spend on Ads"],
    subtitle: "Fix the page before buying traffic",
    bullets: ["Clear offer + matching landing page", "Mobile, trust, forms and tracking", "Follow up every qualified lead"],
    accent: "#e32635",
    secondary: "#f59e0b",
    visual: "paidAds",
  },
  {
    slug: "small-business-lead-generation-funnel",
    category: "LEAD GENERATION",
    label: "Conversion path guide",
    titleLines: ["Small-Business", "Lead Generation Funnel"],
    subtitle: "Turn visits into qualified enquiries",
    bullets: ["Search/social traffic to relevant pages", "Short forms and measurable actions", "CRM follow-up with an owner"],
    accent: "#e32635",
    secondary: "#2563eb",
    visual: "leadFunnel",
  },
  {
    slug: "utm-tracking-small-business",
    category: "ANALYTICS",
    label: "Campaign tracking guide",
    titleLines: ["UTM Tracking", "for Small Businesses"],
    subtitle: "Know which campaigns bring enquiries",
    bullets: ["Name source, medium and campaign", "Connect visits to forms and bookings", "Review real outcomes monthly"],
    accent: "#e32635",
    secondary: "#7c3aed",
    visual: "utm",
  },
  {
    slug: "website-accessibility-small-business",
    category: "WEBSITE QUALITY",
    label: "Accessibility checklist",
    titleLines: ["Website Accessibility", "Checklist"],
    subtitle: "Make the customer path usable for more people",
    bullets: ["Keyboard, contrast and form labels", "Alt text and readable mobile pages", "Fix blockers before they cost leads"],
    accent: "#e32635",
    secondary: "#16a34a",
    visual: "accessibility",
  },
  {
    slug: "website-backup-recovery-small-business",
    category: "WEBSITE RELIABILITY",
    label: "Continuity guide",
    titleLines: ["Website Backups", "+ Recovery"],
    subtitle: "Recover quickly when something breaks",
    bullets: ["Back up files, data and settings", "Store one copy away from live hosting", "Test restore before an outage"],
    accent: "#e32635",
    secondary: "#0284c7",
    visual: "backup",
  },
];

const outputs = [
  { suffix: ".webp", width: 1536, height: 1024, format: "webp" },
  { suffix: "-linkedin.jpg", width: 1200, height: 627, format: "jpeg" },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function textLines(lines, { x, y, fontSize, lineHeight, fill = "#111827", weight = 800, opacity = 1, anchor = "start", letterSpacing = 0 }) {
  const tspans = lines
    .map((line, index) => `<tspan x="${x}" y="${y + index * lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");
  return `<text font-family="Inter, Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="${weight}" fill="${fill}" opacity="${opacity}" text-anchor="${anchor}" letter-spacing="${letterSpacing}">${tspans}</text>`;
}

function pill({ x, y, width, height, fill, stroke = "#d9dde6", radius = 18, label, labelFill = "#111827", fontSize = 18, weight = 800 }) {
  return `
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" />
    <text x="${x + width / 2}" y="${y + height / 2 + fontSize * 0.36}" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="${weight}" fill="${labelFill}">${escapeXml(label)}</text>
  `;
}

function checkIcon(x, y, size, accent) {
  const r = size / 2;
  return `
    <circle cx="${x + r}" cy="${y + r}" r="${r}" fill="${accent}" />
    <path d="M ${x + size * 0.28} ${y + size * 0.52} L ${x + size * 0.44} ${y + size * 0.68} L ${x + size * 0.74} ${y + size * 0.34}" fill="none" stroke="#ffffff" stroke-width="${size * 0.1}" stroke-linecap="round" stroke-linejoin="round" />
  `;
}

function panel(x, y, width, height, radius = 28, fill = "#ffffff") {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="#d9dde6" filter="url(#softShadow)" />`;
}

function browserPanel(x, y, width, height, title, accent, secondary) {
  return `
    ${panel(x, y, width, height)}
    <rect x="${x}" y="${y}" width="${width}" height="${Math.max(42, height * 0.13)}" rx="28" fill="#111827" />
    <circle cx="${x + 30}" cy="${y + 25}" r="6" fill="${accent}" />
    <circle cx="${x + 52}" cy="${y + 25}" r="6" fill="${secondary}" />
    <circle cx="${x + 74}" cy="${y + 25}" r="6" fill="#f8fafc" opacity="0.72" />
    <text x="${x + 104}" y="${y + 31}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${Math.max(17, width * 0.04)}" font-weight="800" fill="#ffffff">${escapeXml(title)}</text>
  `;
}

function renderAiPilot(x, y, w, h, post) {
  const accent = post.accent;
  const secondary = post.secondary;
  return `
    ${browserPanel(x + w * 0.04, y + h * 0.06, w * 0.75, h * 0.62, "Assistant pilot", accent, secondary)}
    <rect x="${x + w * 0.11}" y="${y + h * 0.2}" width="${w * 0.38}" height="${h * 0.08}" rx="14" fill="#f3f6fb" />
    <text x="${x + w * 0.14}" y="${y + h * 0.25}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.042}" font-weight="850" fill="#111827">One use case</text>
    <rect x="${x + w * 0.11}" y="${y + h * 0.33}" width="${w * 0.52}" height="${h * 0.07}" rx="13" fill="#f9fafb" stroke="#d9dde6" />
    <text x="${x + w * 0.15}" y="${y + h * 0.375}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.034}" font-weight="750" fill="#5b6575">Trusted sources</text>
    ${checkIcon(x + w * 0.57, y + h * 0.345, w * 0.05, secondary)}
    <rect x="${x + w * 0.11}" y="${y + h * 0.44}" width="${w * 0.52}" height="${h * 0.07}" rx="13" fill="#f9fafb" stroke="#d9dde6" />
    <text x="${x + w * 0.15}" y="${y + h * 0.485}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.034}" font-weight="750" fill="#5b6575">Permissions</text>
    ${checkIcon(x + w * 0.57, y + h * 0.455, w * 0.05, secondary)}
    <rect x="${x + w * 0.62}" y="${y + h * 0.52}" width="${w * 0.28}" height="${h * 0.22}" rx="24" fill="#ffffff" stroke="#d9dde6" filter="url(#softShadow)" />
    <path d="M ${x + w * 0.7} ${y + h * 0.57} h ${w * 0.12} v ${h * 0.1} h ${-w * 0.12} z" fill="#eef2ff" stroke="${secondary}" />
    <path d="M ${x + w * 0.735} ${y + h * 0.56} v ${h * 0.13}" stroke="${secondary}" stroke-width="${w * 0.012}" />
    <text x="${x + w * 0.76}" y="${y + h * 0.69}" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.035}" font-weight="850" fill="#111827">GO?</text>
    <path d="M ${x + w * 0.46} ${y + h * 0.68} C ${x + w * 0.58} ${y + h * 0.83}, ${x + w * 0.75} ${y + h * 0.86}, ${x + w * 0.88} ${y + h * 0.75}" fill="none" stroke="${accent}" stroke-width="${w * 0.014}" stroke-linecap="round" stroke-dasharray="${w * 0.03} ${w * 0.022}" />
  `;
}

function renderPaidAds(x, y, w, h, post) {
  const accent = post.accent;
  const secondary = post.secondary;
  return `
    <rect x="${x + w * 0.02}" y="${y + h * 0.16}" width="${w * 0.26}" height="${h * 0.32}" rx="24" fill="#ffffff" stroke="#d9dde6" filter="url(#softShadow)" />
    <text x="${x + w * 0.08}" y="${y + h * 0.26}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.06}" font-weight="900" fill="${accent}">AD</text>
    <rect x="${x + w * 0.08}" y="${y + h * 0.31}" width="${w * 0.13}" height="${h * 0.035}" rx="7" fill="${secondary}" opacity="0.75" />
    <rect x="${x + w * 0.08}" y="${y + h * 0.37}" width="${w * 0.16}" height="${h * 0.026}" rx="6" fill="#d9dde6" />
    <path d="M ${x + w * 0.31} ${y + h * 0.33} C ${x + w * 0.42} ${y + h * 0.24}, ${x + w * 0.47} ${y + h * 0.28}, ${x + w * 0.57} ${y + h * 0.35}" fill="none" stroke="${accent}" stroke-width="${w * 0.016}" stroke-linecap="round" />
    <path d="M ${x + w * 0.55} ${y + h * 0.28} L ${x + w * 0.62} ${y + h * 0.37} L ${x + w * 0.51} ${y + h * 0.38} Z" fill="${accent}" />
    ${browserPanel(x + w * 0.43, y + h * 0.08, w * 0.5, h * 0.58, "Landing page", accent, secondary)}
    <rect x="${x + w * 0.5}" y="${y + h * 0.23}" width="${w * 0.32}" height="${h * 0.055}" rx="9" fill="#f3f6fb" />
    <text x="${x + w * 0.53}" y="${y + h * 0.268}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.033}" font-weight="850" fill="#111827">Clear offer</text>
    ${checkIcon(x + w * 0.79, y + h * 0.235, w * 0.046, secondary)}
    <rect x="${x + w * 0.5}" y="${y + h * 0.34}" width="${w * 0.32}" height="${h * 0.055}" rx="9" fill="#f3f6fb" />
    <text x="${x + w * 0.53}" y="${y + h * 0.378}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.033}" font-weight="850" fill="#111827">Mobile tested</text>
    ${checkIcon(x + w * 0.79, y + h * 0.345, w * 0.046, secondary)}
    <rect x="${x + w * 0.54}" y="${y + h * 0.72}" width="${w * 0.32}" height="${h * 0.18}" rx="20" fill="#ffffff" stroke="#d9dde6" filter="url(#softShadow)" />
    <polyline points="${x + w * 0.59},${y + h * 0.84} ${x + w * 0.65},${y + h * 0.8} ${x + w * 0.71},${y + h * 0.83} ${x + w * 0.79},${y + h * 0.75}" fill="none" stroke="${secondary}" stroke-width="${w * 0.012}" stroke-linecap="round" stroke-linejoin="round" />
    <text x="${x + w * 0.7}" y="${y + h * 0.79}" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.035}" font-weight="850" fill="#111827">Tracking</text>
  `;
}

function renderLeadFunnel(x, y, w, h, post) {
  const accent = post.accent;
  const secondary = post.secondary;
  const nodes = [
    ["Search", 0.08, 0.12, "standard"],
    ["Social", 0.08, 0.35, "standard"],
    ["Landing page", 0.38, 0.24, "landing"],
    ["Form", 0.76, 0.24, "standard"],
    ["CRM", 0.76, 0.52, "standard"],
    ["Qualified lead", 0.36, 0.7, "qualified"],
  ];
  const node = (label, px, py, variant = "standard") => {
    const nw = w * (variant === "landing" ? 0.32 : variant === "qualified" ? 0.34 : 0.22);
    const nh = h * 0.13;
    const nx = x + w * px;
    const ny = y + h * py;
    return `
      <rect x="${nx}" y="${ny}" width="${nw}" height="${nh}" rx="20" fill="#ffffff" stroke="#d9dde6" filter="url(#softShadow)" />
      <text x="${nx + nw / 2}" y="${ny + nh * 0.58}" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.035}" font-weight="850" fill="#111827">${escapeXml(label)}</text>
    `;
  };
  return `
    <path d="M ${x + w * 0.28} ${y + h * 0.2} C ${x + w * 0.36} ${y + h * 0.2}, ${x + w * 0.38} ${y + h * 0.3}, ${x + w * 0.42} ${y + h * 0.31}" fill="none" stroke="${accent}" stroke-width="${w * 0.012}" stroke-linecap="round" />
    <path d="M ${x + w * 0.28} ${y + h * 0.42} C ${x + w * 0.36} ${y + h * 0.42}, ${x + w * 0.38} ${y + h * 0.34}, ${x + w * 0.42} ${y + h * 0.31}" fill="none" stroke="${accent}" stroke-width="${w * 0.012}" stroke-linecap="round" />
    <path d="M ${x + w * 0.62} ${y + h * 0.31} L ${x + w * 0.7} ${y + h * 0.31}" stroke="${accent}" stroke-width="${w * 0.012}" stroke-linecap="round" />
    <path d="M ${x + w * 0.8} ${y + h * 0.37} L ${x + w * 0.8} ${y + h * 0.52}" stroke="${secondary}" stroke-width="${w * 0.012}" stroke-linecap="round" />
    <path d="M ${x + w * 0.72} ${y + h * 0.6} C ${x + w * 0.64} ${y + h * 0.72}, ${x + w * 0.55} ${y + h * 0.76}, ${x + w * 0.42} ${y + h * 0.76}" fill="none" stroke="${secondary}" stroke-width="${w * 0.012}" stroke-linecap="round" />
    ${nodes.map(([label, px, py, variant]) => node(label, px, py, variant)).join("")}
    ${checkIcon(x + w * 0.69, y + h * 0.73, w * 0.07, secondary)}
  `;
}

function renderUtm(x, y, w, h, post) {
  const accent = post.accent;
  const secondary = post.secondary;
  return `
    ${pill({ x: x + w * 0.02, y: y + h * 0.12, width: w * 0.24, height: h * 0.09, fill: "#ffffff", label: "LinkedIn", fontSize: w * 0.035 })}
    ${pill({ x: x + w * 0.02, y: y + h * 0.27, width: w * 0.24, height: h * 0.09, fill: "#ffffff", label: "Email", fontSize: w * 0.035 })}
    ${pill({ x: x + w * 0.02, y: y + h * 0.42, width: w * 0.24, height: h * 0.09, fill: "#ffffff", label: "Partners", fontSize: w * 0.035 })}
    <path d="M ${x + w * 0.28} ${y + h * 0.17} C ${x + w * 0.36} ${y + h * 0.2}, ${x + w * 0.4} ${y + h * 0.31}, ${x + w * 0.48} ${y + h * 0.34}" fill="none" stroke="${accent}" stroke-width="${w * 0.012}" stroke-linecap="round" />
    <path d="M ${x + w * 0.28} ${y + h * 0.32} L ${x + w * 0.48} ${y + h * 0.34}" stroke="${accent}" stroke-width="${w * 0.012}" stroke-linecap="round" />
    <path d="M ${x + w * 0.28} ${y + h * 0.47} C ${x + w * 0.36} ${y + h * 0.45}, ${x + w * 0.4} ${y + h * 0.36}, ${x + w * 0.48} ${y + h * 0.34}" fill="none" stroke="${accent}" stroke-width="${w * 0.012}" stroke-linecap="round" />
    <rect x="${x + w * 0.42}" y="${y + h * 0.24}" width="${w * 0.32}" height="${h * 0.18}" rx="20" fill="#111827" filter="url(#softShadow)" />
    <text x="${x + w * 0.46}" y="${y + h * 0.32}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.036}" font-weight="850" fill="#ffffff">utm_campaign</text>
    <text x="${x + w * 0.46}" y="${y + h * 0.38}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.028}" font-weight="750" fill="#cbd5e1">source / medium</text>
    ${browserPanel(x + w * 0.52, y + h * 0.5, w * 0.42, h * 0.34, "Analytics", accent, secondary)}
    <rect x="${x + w * 0.59}" y="${y + h * 0.68}" width="${w * 0.055}" height="${h * 0.08}" rx="7" fill="${secondary}" />
    <rect x="${x + w * 0.68}" y="${y + h * 0.62}" width="${w * 0.055}" height="${h * 0.14}" rx="7" fill="${accent}" />
    <rect x="${x + w * 0.77}" y="${y + h * 0.58}" width="${w * 0.055}" height="${h * 0.18}" rx="7" fill="#111827" opacity="0.86" />
    <text x="${x + w * 0.74}" y="${y + h * 0.82}" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.033}" font-weight="850" fill="#111827">Enquiries</text>
  `;
}

function renderAccessibility(x, y, w, h, post) {
  const accent = post.accent;
  const secondary = post.secondary;
  const checks = ["Keyboard", "Contrast", "Labels", "Alt text"];
  return `
    ${browserPanel(x + w * 0.08, y + h * 0.08, w * 0.72, h * 0.62, "Accessible page", accent, secondary)}
    ${checks
      .map((label, index) => {
        const cy = y + h * (0.24 + index * 0.105);
        return `
          ${checkIcon(x + w * 0.15, cy - w * 0.022, w * 0.048, secondary)}
          <rect x="${x + w * 0.23}" y="${cy - h * 0.036}" width="${w * 0.34}" height="${h * 0.055}" rx="9" fill="#f3f6fb" />
          <text x="${x + w * 0.26}" y="${cy + h * 0.005}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.034}" font-weight="850" fill="#111827">${escapeXml(label)}</text>
        `;
      })
      .join("")}
    <circle cx="${x + w * 0.76}" cy="${y + h * 0.72}" r="${w * 0.12}" fill="#ffffff" stroke="#d9dde6" filter="url(#softShadow)" />
    <circle cx="${x + w * 0.76}" cy="${y + h * 0.67}" r="${w * 0.03}" fill="${accent}" />
    <path d="M ${x + w * 0.66} ${y + h * 0.72} H ${x + w * 0.86}" stroke="${accent}" stroke-width="${w * 0.016}" stroke-linecap="round" />
    <path d="M ${x + w * 0.76} ${y + h * 0.7} V ${y + h * 0.82}" stroke="${accent}" stroke-width="${w * 0.016}" stroke-linecap="round" />
    <path d="M ${x + w * 0.72} ${y + h * 0.8} L ${x + w * 0.68} ${y + h * 0.88}" stroke="${accent}" stroke-width="${w * 0.014}" stroke-linecap="round" />
    <path d="M ${x + w * 0.8} ${y + h * 0.8} L ${x + w * 0.84} ${y + h * 0.88}" stroke="${accent}" stroke-width="${w * 0.014}" stroke-linecap="round" />
  `;
}

function renderBackup(x, y, w, h, post) {
  const accent = post.accent;
  const secondary = post.secondary;
  return `
    ${browserPanel(x + w * 0.05, y + h * 0.1, w * 0.42, h * 0.34, "Live site", accent, secondary)}
    <rect x="${x + w * 0.17}" y="${y + h * 0.3}" width="${w * 0.18}" height="${h * 0.05}" rx="8" fill="#f3f6fb" />
    <ellipse cx="${x + w * 0.25}" cy="${y + h * 0.6}" rx="${w * 0.12}" ry="${h * 0.035}" fill="#ffffff" stroke="${secondary}" stroke-width="${w * 0.012}" />
    <rect x="${x + w * 0.13}" y="${y + h * 0.52}" width="${w * 0.24}" height="${h * 0.08}" fill="#ffffff" stroke="${secondary}" stroke-width="${w * 0.012}" />
    <ellipse cx="${x + w * 0.25}" cy="${y + h * 0.52}" rx="${w * 0.12}" ry="${h * 0.035}" fill="#f3f6fb" stroke="${secondary}" stroke-width="${w * 0.012}" />
    <text x="${x + w * 0.25}" y="${y + h * 0.7}" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.034}" font-weight="850" fill="#111827">Database</text>
    <path d="M ${x + w * 0.42} ${y + h * 0.55} C ${x + w * 0.5} ${y + h * 0.42}, ${x + w * 0.58} ${y + h * 0.42}, ${x + w * 0.66} ${y + h * 0.53}" fill="none" stroke="${accent}" stroke-width="${w * 0.014}" stroke-linecap="round" stroke-dasharray="${w * 0.03} ${w * 0.02}" />
    <path d="M ${x + w * 0.62} ${y + h * 0.5} C ${x + w * 0.64} ${y + h * 0.42}, ${x + w * 0.72} ${y + h * 0.42}, ${x + w * 0.75} ${y + h * 0.49} C ${x + w * 0.83} ${y + h * 0.49}, ${x + w * 0.88} ${y + h * 0.55}, ${x + w * 0.88} ${y + h * 0.63} C ${x + w * 0.88} ${y + h * 0.72}, ${x + w * 0.81} ${y + h * 0.76}, ${x + w * 0.73} ${y + h * 0.76} H ${x + w * 0.6} C ${x + w * 0.52} ${y + h * 0.76}, ${x + w * 0.48} ${y + h * 0.71}, ${x + w * 0.48} ${y + h * 0.64} C ${x + w * 0.48} ${y + h * 0.56}, ${x + w * 0.54} ${y + h * 0.51}, ${x + w * 0.62} ${y + h * 0.5} Z" fill="#ffffff" stroke="${secondary}" stroke-width="${w * 0.012}" filter="url(#softShadow)" />
    <text x="${x + w * 0.68}" y="${y + h * 0.65}" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${w * 0.04}" font-weight="900" fill="#111827">Backup</text>
    ${checkIcon(x + w * 0.78, y + h * 0.68, w * 0.07, secondary)}
  `;
}

const visualRenderers = {
  aiPilot: renderAiPilot,
  paidAds: renderPaidAds,
  leadFunnel: renderLeadFunnel,
  utm: renderUtm,
  accessibility: renderAccessibility,
  backup: renderBackup,
};

function renderCard(post, width, height) {
  const social = width === 1200;
  const scale = width / 1200;
  const leftX = social ? 64 : 82;
  const topY = social ? 48 : 70;
  const titleY = social ? 208 : 296;
  const titleFont = social ? 56 : 78;
  const titleLineHeight = social ? 64 : 88;
  const subtitleY = titleY + post.titleLines.length * titleLineHeight + (social ? 18 : 28);
  const bulletStartY = subtitleY + (social ? 64 : 86);
  const bulletGap = social ? 48 : 64;
  const bulletFont = social ? 24 : 33;
  const visualX = social ? 678 : 850;
  const visualY = social ? 110 : 250;
  const visualW = social ? 460 : 590;
  const visualH = social ? 430 : 600;
  const renderer = visualRenderers[post.visual];

  const bullets = post.bullets
    .map((bullet, index) => {
      const y = bulletStartY + index * bulletGap;
      return `
        ${checkIcon(leftX, y - bulletFont * 0.9, bulletFont * 1.15, post.accent)}
        <text x="${leftX + bulletFont * 1.7}" y="${y}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${bulletFont}" font-weight="750" fill="#334155">${escapeXml(bullet)}</text>
      `;
    })
    .join("");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="${14 * scale}" stdDeviation="${18 * scale}" flood-color="#111827" flood-opacity="0.14" />
        </filter>
        <pattern id="grid" width="${72 * scale}" height="${72 * scale}" patternUnits="userSpaceOnUse">
          <path d="M ${72 * scale} 0 L 0 0 0 ${72 * scale}" fill="none" stroke="#d9dde6" stroke-width="1" opacity="0.36" />
        </pattern>
        <linearGradient id="accentFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${post.accent}" stop-opacity="0.16" />
          <stop offset="1" stop-color="${post.secondary}" stop-opacity="0.18" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#f8fafc" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      <path d="M ${width * 0.68} 0 H ${width} V ${height} H ${width * 0.78} C ${width * 0.68} ${height * 0.76}, ${width * 0.7} ${height * 0.32}, ${width * 0.68} 0 Z" fill="url(#accentFade)" />
      <rect x="${leftX - 22 * scale}" y="${topY - 12 * scale}" width="${social ? 420 : 540}" height="${social ? 64 : 82}" rx="${social ? 32 : 41}" fill="#ffffff" opacity="0.86" stroke="#e5e7eb" />
      <rect x="${leftX}" y="${topY}" width="${social ? 38 : 52}" height="${social ? 38 : 52}" rx="${social ? 12 : 16}" fill="#ffffff" stroke="#eef2f7" />
      <text x="${leftX + (social ? 19 : 26)}" y="${topY + (social ? 25 : 34)}" text-anchor="middle" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${social ? 19 : 26}" font-weight="950" fill="#111827">w</text>
      <text x="${leftX + (social ? 31 : 42)}" y="${topY + (social ? 15 : 20)}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${social ? 18 : 24}" font-weight="950" fill="${post.accent}">+</text>
      <text x="${leftX + (social ? 60 : 78)}" y="${topY + (social ? 27 : 36)}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${social ? 20 : 27}" font-weight="900" fill="#111827">websiteli.ch</text>
      <text x="${leftX}" y="${topY + (social ? 96 : 120)}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${social ? 19 : 27}" font-weight="900" fill="${post.accent}" letter-spacing="1.8">${escapeXml(post.category)}</text>
      ${textLines(post.titleLines, { x: leftX, y: titleY, fontSize: titleFont, lineHeight: titleLineHeight, fill: "#111827", weight: 950 })}
      <text x="${leftX}" y="${subtitleY}" font-family="Inter, Arial, Helvetica, sans-serif" font-size="${social ? 25 : 35}" font-weight="760" fill="#5b6575">${escapeXml(post.subtitle)}</text>
      ${bullets}
      ${pill({
        x: leftX,
        y: height - (social ? 86 : 138),
        width: social ? 190 : 255,
        height: social ? 44 : 60,
        fill: post.accent,
        stroke: post.accent,
        radius: social ? 22 : 30,
        label: "Read the guide",
        labelFill: "#ffffff",
        fontSize: social ? 20 : 28,
        weight: 900,
      })}
      ${pill({
        x: leftX + (social ? 208 : 278),
        y: height - (social ? 86 : 138),
        width: social ? 225 : 305,
        height: social ? 44 : 60,
        fill: "#ffffff",
        stroke: "#d9dde6",
        radius: social ? 22 : 30,
        label: post.label,
        labelFill: "#334155",
        fontSize: social ? 18 : 25,
        weight: 850,
      })}
      <g>
        ${renderer(visualX, visualY, visualW, visualH, post)}
      </g>
    </svg>
  `;
}

await mkdir(assetDir, { recursive: true });

for (const post of posts) {
  for (const output of outputs) {
    const svg = renderCard(post, output.width, output.height);
    const filename = `${post.slug}${output.suffix}`;
    const outputPath = path.join(assetDir, filename);
    const pipeline = sharp(Buffer.from(svg));

    if (output.format === "webp") {
      await pipeline.webp({ quality: 84, effort: 6 }).toFile(outputPath);
    } else {
      await pipeline.jpeg({ quality: 86, mozjpeg: true }).toFile(outputPath);
    }

    const metadata = await sharp(outputPath).metadata();
    const file = await stat(outputPath);
    console.log(`${filename} ${metadata.width}x${metadata.height} ${Math.round(file.size / 1024)}KB`);
  }
}
