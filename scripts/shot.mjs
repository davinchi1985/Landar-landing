import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "shots";
mkdirSync(OUT, { recursive: true });
const URL = process.env.URL || "http://localhost:3000";

const browser = await chromium.launch({ channel: "msedge" });

async function shoot(name, { width, height, full = true, lang } = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  if (lang) await ctx.addInitScript((l) => localStorage.setItem("landar.lang", l), lang);
  await page.goto(URL, { waitUntil: "networkidle" });
  // scroll through to trigger reveal animations, then back to top
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  console.log("✓", name);
  await ctx.close();
}

await shoot("desktop-en", { width: 1440, height: 900 });
await shoot("desktop-es", { width: 1440, height: 900, lang: "es" });
await shoot("desktop-de", { width: 1440, height: 900, lang: "de" });
await shoot("mobile-en", { width: 390, height: 844 });

await browser.close();
console.log("done");
