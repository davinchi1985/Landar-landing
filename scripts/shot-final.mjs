// Capturas de verificación del feedback de David (11 jun):
// faro grande, checker con ring dorado (3 ticks), fullpage para el ritmo.
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "shots/final";
mkdirSync(OUT, { recursive: true });
const URL = process.env.URL || "http://localhost:3000";

const browser = await chromium.launch({ channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

// 1. checker con 3 toggles activos → ring dorado al 75%
await page.evaluate(() => document.getElementById("ai").scrollIntoView({ block: "center" }));
await page.waitForTimeout(700);
const toggles = await page.$$(".ai-toggle");
for (let i = 0; i < 3; i++) { await toggles[i].click(); await page.waitForTimeout(250); }
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/checker-dorado-75.png` });
console.log("✓ checker 75%");
await toggles[3].click();
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/checker-dorado-100.png` });
console.log("✓ checker 100%");

// 2. faro grande
await page.evaluate(() => document.getElementById("faro").scrollIntoView({ block: "start" }));
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/faro.png` });
console.log("✓ faro");

// 3. fullpage (ritmo general)
const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p2 = await ctx2.newPage();
await p2.goto(URL, { waitUntil: "networkidle" });
await p2.evaluate(async () => {
  const step = window.innerHeight * 0.7;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 110));
  }
  window.scrollTo(0, 0);
  // artefacto conocido de fullPage + reveals: des-armar lo que quede oculto
  document.querySelectorAll(".reveal.is-armed").forEach((el) => el.classList.remove("is-armed"));
  await new Promise((r) => setTimeout(r, 400));
});
await p2.waitForTimeout(600);
console.log("scrollHeight:", await p2.evaluate(() => document.body.scrollHeight));
await p2.screenshot({ path: `${OUT}/fullpage.png`, fullPage: true });
console.log("✓ fullpage");

await browser.close();
console.log("done");
