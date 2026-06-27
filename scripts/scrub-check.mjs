import { chromium, devices } from "playwright";
import { homedir } from "os";
import { existsSync } from "fs";

const URL = process.argv[2] || "https://hargharshudhi.com";
const MOBILE = process.argv.includes("--mobile");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const execPath = `${homedir()}/.cache/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const browser = await chromium.launch(
  existsSync(execPath) ? { executablePath: execPath } : {}
);
const context = await browser.newContext(
  MOBILE
    ? { ...devices["iPhone 13"] }
    : { viewport: { width: 1440, height: 900 } }
);
const page = await context.newPage();
console.log("Profile:", MOBILE ? "iPhone 13 (touch)" : "desktop 1440x900");

const logs = [];
const failed = [];
page.on("console", (m) => logs.push(`[console.${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
page.on("requestfailed", (r) =>
  failed.push(`[failed] ${r.url()} ${r.failure()?.errorText || ""}`)
);
page.on("response", (r) => {
  if (r.status() >= 400) failed.push(`[${r.status()}] ${r.url()}`);
});

console.log("Loading", URL);
await page.goto(URL, { waitUntil: "load", timeout: 60000 });

// Wait for the intro to clear (scroll-ready class on <html>)
let scrollReady = false;
for (let i = 0; i < 40; i++) {
  scrollReady = await page.evaluate(() =>
    document.documentElement.classList.contains("scroll-ready")
  );
  if (scrollReady) break;
  await sleep(500);
}
console.log("scroll-ready:", scrollReady, "after wait");

const snapshot = async (label) => {
  const data = await page.evaluate(() => {
    const vids = Array.from(document.querySelectorAll("video"));
    return {
      scrollY: window.scrollY,
      docHeight: document.documentElement.scrollHeight,
      html: document.documentElement.className,
      videos: vids.map((v) => ({
        src: (v.currentSrc || v.src).split("/").slice(-1)[0],
        readyState: v.readyState,
        duration: Number.isFinite(v.duration) ? +v.duration.toFixed(2) : v.duration,
        currentTime: +v.currentTime.toFixed(3),
        paused: v.paused,
        w: v.videoWidth,
        h: v.videoHeight,
      })),
    };
  });
  console.log(`\n== ${label} == scrollY=${data.scrollY} html="${data.html}"`);
  for (const v of data.videos) {
    console.log(
      `  ${v.src} rs=${v.readyState} dur=${v.duration} t=${v.currentTime} dim=${v.w}x${v.h}`
    );
  }
  return data;
};

await snapshot("initial");

// Scroll down in steps and watch each video's currentTime
const stepCount = 60;
const totalHeight = await page.evaluate(
  () => document.documentElement.scrollHeight - window.innerHeight
);
const seen = {};
for (let i = 1; i <= stepCount; i++) {
  const y = Math.round((totalHeight * i) / stepCount);
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await sleep(220);
  const data = await page.evaluate(() => {
    const vids = Array.from(document.querySelectorAll("video"));
    return vids.map((v) => ({
      src: (v.currentSrc || v.src).split("/").slice(-1)[0],
      t: +v.currentTime.toFixed(3),
      rs: v.readyState,
    }));
  });
  for (const v of data) {
    seen[v.src] = seen[v.src] || new Set();
    seen[v.src].add(v.t);
  }
  console.log(
    `scrollY=${y}  ` +
      data.map((v) => `${v.src.slice(0, 14)}:t=${v.t}(rs${v.rs})`).join("  ")
  );
}

console.log("\n== DISTINCT currentTime values seen while scrolling (scrub working = many) ==");
for (const [src, set] of Object.entries(seen)) {
  console.log(`  ${src}: ${set.size} distinct times -> ${set.size > 3 ? "SCRUBBING" : "STUCK"}`);
}

console.log("\n== failed/4xx requests ==");
console.log([...new Set(failed)].slice(0, 30).join("\n") || "(none)");

console.log("\n== console/page logs ==");
console.log([...new Set(logs)].slice(0, 40).join("\n") || "(none)");

await browser.close();
