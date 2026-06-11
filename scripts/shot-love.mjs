// Verificación de la ronda "menos es más + amor": hero compacto (overlap
// trade box EN/DE), gap hero→problem, final CTA con manifesto, footer con
// firma + hairline albiceleste, fullpage de ritmo.
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "shots/love";
mkdirSync(OUT, { recursive: true });
const URL = process.env.URL || "http://localhost:3000";

const browser = await chromium.launch({ channel: "msedge" });

// 1. overlap del trade box en EN y DE + screenshot hero
for (const lang of ["en", "de"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  if (lang !== "en") await ctx.addInitScript((l) => localStorage.setItem("landar.lang", l), lang);
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  const r = await p.evaluate(() => {
    const tb = document.getElementById("tradeBox").getBoundingClientRect();
    const ghost = document.querySelector(".hero__cta .btn--ghost").getBoundingClientRect();
    const status = document.querySelector(".hero__status").getBoundingClientRect();
    const hero = document.getElementById("hero").getBoundingClientRect();
    const ov = (a, c) => !(a.right < c.left || c.right < a.left || a.bottom < c.top || c.bottom < a.top);
    return { heroH: Math.round(hero.height), overlapGhost: ov(tb, ghost), overlapStatus: ov(tb, status) };
  });
  console.log(lang, JSON.stringify(r));
  if (lang === "en") await p.screenshot({ path: `${OUT}/hero.png` });
  await ctx.close();
}

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// 2. final CTA + footer (amor)
await page.evaluate(() => document.querySelector(".footer").scrollIntoView({ block: "end" }));
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/footer-final.png` });
console.log("✓ footer-final");

// 3. fullpage
await page.evaluate(async () => {
  const step = window.innerHeight * 0.7;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 110));
  }
  window.scrollTo(0, 0);
  document.querySelectorAll(".reveal.is-armed").forEach((el) => el.classList.remove("is-armed"));
  await new Promise((r) => setTimeout(r, 400));
});
console.log("scrollHeight:", await page.evaluate(() => document.body.scrollHeight));
await page.screenshot({ path: `${OUT}/fullpage.png`, fullPage: true });
console.log("✓ fullpage");

await browser.close();
console.log("done");
