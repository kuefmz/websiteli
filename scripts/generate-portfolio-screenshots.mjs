import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const viewport = { width: 1440, height: 1000 };
const outputSize = { width: 1200, height: 760 };
const outputDir = path.resolve("public/images/portfolio");

const targets = [
  {
    slug: "jenifer-ciuciu-kiss",
    title: "Jenifer Ciuciu-Kiss - Personal Portfolio",
    url: "https://jeniferciuciukiss.com",
    output: "jenifer-ciuciu-kiss-portfolio.webp",
  },
  {
    slug: "shopify-consultant-portfolio",
    title: "Shopify Consultant Portfolio Website",
    url: "https://kuefmz.github.io/websiteli-portfolio-demo/",
    output: "shopify-consultant-portfolio-demo.webp",
  },
];

const browserCandidates = [
  process.env.CHROMIUM_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
  "/snap/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

function findBrowser() {
  const browser = browserCandidates.find((candidate) => existsSync(candidate));
  if (!browser) {
    throw new Error(
      "Could not find a Chromium-compatible browser. Set CHROMIUM_PATH to the browser binary and rerun npm run portfolio:screenshots.",
    );
  }
  return browser;
}

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    throw new Error("Sharp is required to write WebP screenshots. Run npm install in this project and rerun npm run portfolio:screenshots.");
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(stderr.trim() || `${command} exited with code ${code}`));
    });
  });
}

async function assertUrlAvailable(target) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);

  try {
    const response = await fetch(target.url, {
      headers: {
        "user-agent": "Websiteli portfolio screenshot generator",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    await response.body?.cancel();
  } catch (error) {
    throw new Error(`Cannot reach ${target.title} (${target.url}): ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }
}

async function captureTarget(browser, sharp, target) {
  await assertUrlAvailable(target);

  const tempPng = path.join(os.tmpdir(), `websiteli-${target.slug}-${Date.now()}.png`);
  const outputPath = path.join(outputDir, target.output);

  const args = [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-sandbox",
    "--run-all-compositor-stages-before-draw",
    "--force-device-scale-factor=1",
    `--window-size=${viewport.width},${viewport.height}`,
    "--virtual-time-budget=5000",
    `--screenshot=${tempPng}`,
    target.url,
  ];

  await run(browser, args);

  if (!existsSync(tempPng)) {
    throw new Error(`Chromium did not create a screenshot for ${target.title}.`);
  }

  await sharp(tempPng)
    .resize({
      width: outputSize.width,
      height: outputSize.height,
      fit: "cover",
      position: "top",
    })
    .webp({ quality: 84, effort: 5 })
    .toFile(outputPath);

  await rm(tempPng, { force: true });
  console.log(`Saved ${path.relative(process.cwd(), outputPath)} from ${target.url}`);
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = findBrowser();
  const sharp = await loadSharp();
  console.log(`Using ${browser}`);

  for (const target of targets) {
    await captureTarget(browser, sharp, target);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
