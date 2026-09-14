import fs from "node:fs";
import path from "node:path";

const DIST_DIR = path.resolve("dist");
const SITE_ORIGIN = "https://websiteli.ch";
const NON_ENGLISH_LOCALES = ["de", "hu", "pl", "es", "fr", "it", "cz", "sk", "pt", "da", "nl", "ja"];
const ENGLISH_ONLY_DETAIL_NAMESPACES = ["services", "industries", "websites"];

if (!fs.existsSync(DIST_DIR)) {
  throw new Error("dist/ does not exist. Run the Astro build before postbuild SEO processing.");
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

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function makeRedirectDocument(targetPath) {
  const canonicalUrl = `${SITE_ORIGIN}${targetPath}`;
  const targetLiteral = JSON.stringify(targetPath);
  const escapedTarget = escapeHtml(targetPath);
  const escapedCanonical = escapeHtml(canonicalUrl);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${escapedCanonical}" />
    <meta http-equiv="refresh" content="0; url=${escapedTarget}" />
    <script>
      const target = new URL(${targetLiteral}, window.location.origin);
      target.search = window.location.search;
      target.hash = window.location.hash;
      window.location.replace(target.toString());
    </script>
    <title>Continue to Websiteli</title>
  </head>
  <body>
    <a href="${escapedTarget}">Continue to Websiteli</a>
  </body>
</html>
`;
}

function removeUnavailableLanguageAlternates(html) {
  return html.replace(
    /<link\b[^>]*\brel=["']alternate["'][^>]*\bhreflang=["']([^"']+)["'][^>]*>\s*/gi,
    (tag, language) => (language === "en" || language === "x-default" ? tag : ""),
  );
}

function normalizeCzechLanguageTags(html) {
  return html
    .replace(/<html lang="cz">/g, '<html lang="cs">')
    .replace(/hreflang="cz"/g, 'hreflang="cs"')
    .replace(/content="cz_CH"/g, 'content="cs_CH"')
    .replace(/"inLanguage":"cz"/g, '"inLanguage":"cs"');
}

let redirectedDetailPages = 0;
let canonicalDetailPages = 0;

for (const namespace of ENGLISH_ONLY_DETAIL_NAMESPACES) {
  const englishNamespaceDirectory = path.join(DIST_DIR, "en", namespace);
  if (!fs.existsSync(englishNamespaceDirectory)) continue;

  const slugs = fs
    .readdirSync(englishNamespaceDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const slug of slugs) {
    const englishFile = path.join(englishNamespaceDirectory, slug, "index.html");
    if (!fs.existsSync(englishFile)) continue;

    const englishHtml = removeUnavailableLanguageAlternates(fs.readFileSync(englishFile, "utf8"));
    fs.writeFileSync(englishFile, englishHtml);
    canonicalDetailPages += 1;

    const targetPath = `/en/${namespace}/${slug}/`;
    for (const locale of NON_ENGLISH_LOCALES) {
      const localizedFile = path.join(DIST_DIR, locale, namespace, slug, "index.html");
      if (!fs.existsSync(localizedFile)) continue;

      fs.writeFileSync(localizedFile, makeRedirectDocument(targetPath));
      redirectedDetailPages += 1;
    }
  }
}

let normalizedLanguageFiles = 0;
for (const htmlFile of walkFiles(DIST_DIR).filter((file) => file.endsWith(".html"))) {
  const original = fs.readFileSync(htmlFile, "utf8");
  const normalized = normalizeCzechLanguageTags(original);
  if (normalized !== original) {
    fs.writeFileSync(htmlFile, normalized);
    normalizedLanguageFiles += 1;
  }
}

console.log(
  `Postbuild SEO: kept ${canonicalDetailPages} English detail pages canonical, converted ${redirectedDetailPages} untranslated localized detail pages to redirect shims, and normalized Czech language tags in ${normalizedLanguageFiles} files.`,
);
