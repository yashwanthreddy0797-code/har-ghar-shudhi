import { chromium, devices } from "playwright";
import { homedir } from "os";
import { existsSync } from "fs";

const URL = process.argv[2] || "http://localhost:3210";
const MOBILE = process.argv.includes("--mobile");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const execPath = `${homedir()}/.cache/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const browser = await chromium.launch(
  existsSync(execPath) ? { executablePath: execPath } : {}
);
const context = await browser.newContext(
  MOBILE ? { ...devices["iPhone 13"] } : { viewport: { width: 1440, height: 900 } }
);
const page = await context.newPage();
console.log("Profile:", MOBILE ? "iPhone 13" : "desktop");
page.on("console", (m) => {
  if (m.type() === "error" || m.text().includes("HONEYDBG"))
    console.log(`[console.${m.type()}] ${m.text()}`);
});
page.on("pageerror", (e) => console.log(`[pageerror] ${e.message}`));

await page.goto(URL, { waitUntil: "load", timeout: 60000 });
for (let i = 0; i < 40; i++) {
  const ready = await page.evaluate(() =>
    document.documentElement.classList.contains("scroll-ready")
  );
  if (ready) break;
  await sleep(400);
}
await sleep(800);

// Inspect ScrollTrigger state for honey
const stInfo = await page.evaluate(() => {
  const ST = window.__ST || window.ScrollTrigger;
  const out = { hasST: !!ST, triggers: [] };
  if (ST) {
    for (const t of ST.getAll()) {
      out.triggers.push({
        id: t.vars?.id || "(no id)",
        progress: +t.progress.toFixed(3),
        isActive: t.isActive,
        start: Math.round(t.start),
        end: Math.round(t.end),
      });
    }
  }
  return out;
});
console.log("ScrollTrigger:", JSON.stringify(stInfo, null, 2));

// Watch trigger ids over time to see if honey ever gets created
for (let i = 0; i < 8; i++) {
  const ids = await page.evaluate(() => {
    const ST = window.__ST;
    return ST ? ST.getAll().map((t) => t.vars?.id || "?") : [];
  });
  console.log(`t+${i * 500}ms triggers: [${ids.join(", ")}]`);
  await sleep(500);
}

const honeyAt = async (y) => {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await sleep(180);
  return page.evaluate(() => {
    const v = document.querySelector("video");
    const ST = window.__ST || window.ScrollTrigger;
    let honeyProg = null;
    let honeyActive = null;
    if (ST) {
      const all = ST.getAll();
      const h = all.find((t) => (t.vars?.id || "").includes("honey")) || all[0];
      if (h) {
        honeyProg = +h.progress.toFixed(3);
        honeyActive = h.isActive;
      }
    }
    return {
      y: window.scrollY,
      t: v ? +v.currentTime.toFixed(3) : null,
      rs: v ? v.readyState : null,
      paused: v ? v.paused : null,
      honeyProg,
      honeyActive,
    };
  });
};

console.log("\nFine scroll through honey range:");
const times = new Set();
for (let y = 0; y <= 2400; y += 80) {
  const d = await honeyAt(y);
  times.add(d.t);
    console.log(
      `y=${String(d.y).padStart(4)} honeyProg=${d.honeyProg} active=${d.honeyActive} video.t=${d.t} rs=${d.rs} paused=${d.paused}`
    );
}
console.log(`\nhoney distinct currentTimes in range: ${times.size}`);

await browser.close();
