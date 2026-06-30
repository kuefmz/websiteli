import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const rootDir = process.env.GITHUB_WORKSPACE || process.env.INIT_CWD || process.cwd();
const blogDir = join(rootDir, "src", "content", "blog", "posts");
const siteBaseUrl = process.env.SITE_BASE_URL || "https://websiteli.ch";

function getZurichDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(date)
    .reduce((acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    }, {});

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hour: parts.hour,
  };
}

function getStringField(source, field) {
  return source.match(new RegExp(`"${field}"\\s*:\\s*"([^"]+)"`))?.[1] || "";
}

function getSocialCaption(source, network) {
  return source.match(new RegExp(`"${network}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`))?.[1]?.replace(/\\"/g, "\"") || "";
}

function withUtm(slug, source) {
  const url = new URL(`/en/blog/${slug}/`, siteBaseUrl);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", "social");
  url.searchParams.set("utm_campaign", "daily_blog_publish");
  return url.toString();
}

async function maybePostToMeta(post) {
  const hasCredentials = process.env.META_ACCESS_TOKEN && process.env.FACEBOOK_PAGE_ID && process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID && process.env.SITE_BASE_URL;
  if (!hasCredentials) {
    console.log("Meta posting skipped because credentials are not configured.");
    return;
  }

  console.log(`Meta credentials detected for ${post.slug}. Auto-posting is prepared but not enabled in this repository script yet.`);
}

function updatePostSource(source) {
  let next = source.replace(/"status"\s*:\s*"scheduled"/, "\"status\": \"published\"");

  if (/"published"\s*:\s*false/.test(next)) {
    next = next.replace(/"published"\s*:\s*false/, "\"published\": true");
  } else if (!/"published"\s*:/.test(next)) {
    next = next.replace(/("slug"\s*:\s*"[^"]+",)/, "$1\n  \"published\": true,");
  }

  return next;
}

function commitChangesIfRequested(files) {
  if (process.env.PUBLISH_DAILY_BLOG_COMMIT !== "true" || files.length === 0) return;

  execFileSync("git", ["add", ...files], { cwd: rootDir, stdio: "inherit" });
  try {
    execFileSync("git", ["diff", "--cached", "--quiet"], { cwd: rootDir, stdio: "inherit" });
    return;
  } catch {}
  execFileSync("git", ["commit", "-m", "Publish daily blog post"], { cwd: rootDir, stdio: "inherit" });
}

async function main() {
  if (!existsSync(blogDir)) {
    console.error(`Blog post directory not found: ${blogDir}`);
    process.exitCode = 1;
    return;
  }

  const { date: today, hour } = getZurichDateParts();
  if (process.env.REQUIRE_ZURICH_10 === "true" && hour !== "10") {
    console.log(`Not publishing because Europe/Zurich local hour is ${hour}, not 10.`);
    return;
  }

  const changedFiles = [];
  const publishedPosts = [];

  for (const fileName of readdirSync(blogDir).filter((file) => file.endsWith(".ts")).sort()) {
    const filePath = join(blogDir, fileName);
    const source = readFileSync(filePath, "utf8");
    const status = getStringField(source, "status") || (/"published"\s*:\s*true/.test(source) ? "published" : "draft");
    const publishDate = getStringField(source, "publishDate") || getStringField(source, "date");

    if (status !== "scheduled" || !publishDate || publishDate > today) continue;

    const next = updatePostSource(source);
    if (next === source) continue;

    writeFileSync(filePath, next);
    changedFiles.push(filePath);
    publishedPosts.push({
      file: basename(filePath),
      slug: getStringField(source, "slug"),
      title: getStringField(source, "title"),
      publishDate,
      social: {
        linkedin: getSocialCaption(source, "linkedin"),
        facebook: getSocialCaption(source, "facebook"),
        instagram: getSocialCaption(source, "instagram"),
      },
    });
  }

  if (publishedPosts.length === 0) {
    console.log(`No scheduled blog posts are due for ${today}.`);
    return;
  }

  console.log(`Published ${publishedPosts.length} blog post(s) for ${today}:`);
  for (const post of publishedPosts) {
    console.log(`- ${post.title || post.slug} (${post.file})`);
    console.log(`  URL: ${withUtm(post.slug, "daily_blog")}`);
    console.log(`  LinkedIn: ${post.social.linkedin || withUtm(post.slug, "linkedin")}`);
    console.log(`  Facebook: ${post.social.facebook || withUtm(post.slug, "facebook")}`);
    console.log(`  Instagram: ${(post.social.instagram || post.title || post.slug)} ${withUtm(post.slug, "instagram")}`);
    await maybePostToMeta(post);
  }

  commitChangesIfRequested(changedFiles);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
