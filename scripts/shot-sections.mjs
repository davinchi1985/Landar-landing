// Capturas por sección a tamaño real (viewport), para auditoría visual fina.
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "shots/sections";
mkdirSync(OUT, { recursive: true });
const URL = process.env.URL || "http://localhost:3000";

const browser = await chromium.launch({ channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2500); // intro del globo

for (const id of ["hero", "problem", "ai", "services", "stats", "network", "faro", "how", "why", "contact", "final"]) {
  await page.evaluate((s) => {
    const el = document.getElementById(s);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 40);
  }, id);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${id}.png` });
  console.log("✓", id);
}

// radar
await page.goto(`${URL}/oportunidades`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/radar-top.png` });
console.log("✓ radar-top");

// detalle de la medida nueva
await page.goto(`${URL}/oportunidades/reforma-laboral-convenios-colectivos-2026`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/radar-medida-nueva.png`, fullPage: true });
console.log("✓ radar-medida-nueva");

await browser.close();
console.log("done");
