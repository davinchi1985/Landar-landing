import { chromium } from "playwright";
import { mkdirSync } from "fs";
mkdirSync("shots", { recursive: true });
const browser = await chromium.launch({ channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

// --- language switching ---
const h1En = (await page.locator("h1").innerText()).trim();
await page.locator(".nav__right .lang__btn").click();
await page.locator('.nav__right .lang__menu button:has-text("Español")').click();
await page.waitForTimeout(300);
const h1Es = (await page.locator("h1").innerText()).trim();
const navEs = await page.locator('.nav__links a').first().innerText();
const htmlLang = await page.evaluate(() => document.documentElement.lang);
console.log("H1 EN:", h1En);
console.log("H1 ES:", h1Es);
console.log("nav[0] ES:", navEs, "| <html lang>:", htmlLang);
console.log("LANG SWITCH:", h1En !== h1Es && htmlLang === "es" ? "OK ✓" : "FAIL ✗");

// persists on reload?
await page.reload({ waitUntil: "networkidle" });
const h1Reload = (await page.locator("h1").innerText()).trim();
console.log("PERSIST reload:", h1Reload === h1Es ? "OK ✓" : "FAIL ✗");

// --- trade box mouse shortcut still scrolls to #network ---
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.locator("#tradeBox").click();
await page.waitForTimeout(900);
const scrolled = await page.evaluate(() => {
  const r = document.getElementById("network").getBoundingClientRect();
  return Math.abs(r.top) < window.innerHeight; // network roughly in view
});
console.log("TRADE BOX shortcut:", scrolled ? "OK ✓" : "FAIL ✗");

// --- hero hm-no contrast (capture hero) + faro render ---
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.locator(".hero").screenshot({ path: "shots/v-hero.png" });
await page.locator("#faro").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.locator("#faro").screenshot({ path: "shots/v-faro.png" });
console.log("shots saved");
await browser.close();
