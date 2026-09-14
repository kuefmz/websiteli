import fs from "node:fs";
import path from "node:path";

const DIST_DIR = path.resolve("dist");
const SITE_ORIGIN = "https://websiteli.ch";
const SITE_HOSTNAME = "websiteli.ch";
const NON_ENGLISH_LOCALES = new Set(["de", "hu", "pl", "es", "fr", "it", "cz", "sk", "pt", "da", "nl", "ja"]);
const ENGLISH_ONLY_DETAIL_NAMESPACES = new Set(["services", "industries", "websites"]);

if (!fs.existsSync(DIST_DIR)) {
  throw new Error("dist/ does not exist. Run npm run build before the SEO checks.");
}

function walkFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function pathForUrl(urlValue) {
  const url = new URL(urlValue, SITE_ORIGIN);
  if (url.hostname !== SITE_HOSTNAME) return null;

  const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  if (!relativePath) return path.join(DIST_DIR, "index.html");

  const direct = path.join(DIST_DIR, relativePath);
  const candidates = url.pathname.endsWith("/")
    ? [path.join(direct, "index.html")]
    : [direct, `${direct}.html`, path.join(direct, "index.html")];

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];
}

function routeForHtmlFile(filePath) {
  const relative = path.relative(DIST_DIR, filePath).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

function getCanonical(html) {
  const canonicalTag =
    html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0] ??
    html.match(/<link\b[^>]*\bhref=["'][^"']+["'][^>]*\brel=["']canonical["'][^>]*>/i)?.[0];
  return canonicalTag?.match(/\bhref=["']([^"']+)["']/i)?.[1];
}

function isNoindex(html) {
  const robotsTag = html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/i)?.[0];
  const content = robotsTag?.match(/\bcontent=["']([^"']+)["']/i)?.[1] ?? "";
  return /(^|[,\s])noindex([,\s]|$)/i.test(content);
}

function normalizeUrl(value) {
  return new URL(value, SITE_ORIGIN).toString();
}

const allFiles = walkFiles(DIST_DIR);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const pageSitemaps = allFiles.filter((file) => /^sitemap-\d+\.xml$/.test(path.basename(file)));
const errors = [];

if (pageSitemaps.length === 0) {
  errors.push("No page sitemap (sitemap-N.xml) was generated.");
}

const sitemapUrls = [];
for (const sitemapFile of pageSitemaps) {
  const xml = fs.readFileSync(sitemapFile, "utf8");
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    sitemapUrls.push(match[1]);
  }
}

for (const loc of sitemapUrls) {
  const url = new URL(loc);
  const segments = url.pathname.split("/").filter(Boolean);
  const [locale, namespace] = segments;

  if (NON_ENGLISH_LOCALES.has(locale) && ENGLISH_ONLY_DETAIL_NAMESPACES.has(namespace) && segments.length >= 3) {
    errors.push(`Non-canonical untranslated detail URL is present in the sitemap: ${loc}`);
  }

  const outputPath = pathForUrl(loc);
  if (!outputPath || !fs.existsSync(outputPath)) {
    errors.push(`Sitemap URL has no generated output: ${loc}`);
    continue;
  }
  if (!outputPath.endsWith(".html")) continue;

  const html = fs.readFileSync(outputPath, "utf8");
  if (isNoindex(html)) {
    errors.push(`Sitemap URL is noindex: ${loc}`);
  }

  const canonical = getCanonical(html);
  if (!canonical) {
    errors.push(`Sitemap URL has no canonical tag: ${loc}`);
  } else if (normalizeUrl(canonical) !== normalizeUrl(loc)) {
    errors.push(`Sitemap URL is not self-canonical: ${loc} -> ${canonical}`);
  }
}

let internalHrefCount = 0;
for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const sourceRoute = routeForHtmlFile(htmlFile);
  const sourceUrl = new URL(sourceRoute, SITE_ORIGIN);

  for (const match of html.matchAll(/\bhref=["']([^"']*)["']/gi)) {
    let href = match[1].replaceAll("&amp;", "&").trim();
    if (!href || href.startsWith("#")) continue;
    if (/^(?:mailto:|tel:|javascript:|data:)/i.test(href)) continue;

    let targetUrl;
    try {
      targetUrl = new URL(href, sourceUrl);
    } catch {
      errors.push(`Invalid href in ${sourceRoute}: ${href}`);
      continue;
    }

    if (targetUrl.hostname !== SITE_HOSTNAME) continue;
    internalHrefCount += 1;

    const targetPath = pathForUrl(targetUrl.toString());
    if (!targetPath || !fs.existsSync(targetPath)) {
      errors.push(`Broken internal href in ${sourceRoute}: ${href}`);
    }
  }
}

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const route = routeForHtmlFile(htmlFile);

  if (/<html lang="cz">/i.test(html) || /hreflang="cz"/i.test(html) || /"inLanguage":"cz"/i.test(html)) {
    errors.push(`Invalid Czech language code remains in generated HTML: ${route}`);
  }
}

if (errors.length > 0) {
  const uniqueErrors = [...new Set(errors)];
  console.error(`SEO checks failed with ${uniqueErrors.length} issue(s):`);
  for (const error of uniqueErrors.slice(0, 100)) console.error(`- ${error}`);
  if (uniqueErrors.length > 100) console.error(`- ...and ${uniqueErrors.length - 100} more`);
  process.exit(1);
}

console.log(
  `SEO checks passed: ${htmlFiles.length} HTML files, ${sitemapUrls.length} sitemap URLs, ${internalHrefCount} internal hrefs checked.`,
);
