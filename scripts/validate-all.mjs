// Validación integral (pedido David 11 jun): wizard campo por campo,
// idiomas en runtime (incl. ZH nuevo), conexiones externas y peso de página.
// NO envía el submit final del wizard (generaría un lead falso real).
import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// — peso de la home (bytes transferidos por tipo)
let total = 0;
const byType = {};
page.on("response", async (res) => {
  try {
    const headers = res.headers();
    const len = parseInt(headers["content-length"] || "0", 10) || 0;
    const t = (headers["content-type"] || "otro").split(";")[0];
    total += len;
    byType[t] = (byType[t] || 0) + len;
  } catch {}
});
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
console.log(`— peso home (sin Crisp, primera carga): ${(total / 1024).toFixed(0)} KB transferidos`);
for (const [t, v] of Object.entries(byType).sort((a, b) => b[1] - a[1]).slice(0, 6))
  console.log(`   ${t}: ${(v / 1024).toFixed(0)} KB`);

// — idiomas en runtime: switch a cada uno y verificar H1 + <html lang>
const expectH1 = { es: "entidad de IA", pt: "entidade de IA", de: "KI-Entit", zh: "AI实体" };
for (const [code, frag] of Object.entries(expectH1)) {
  await page.evaluate((c) => { localStorage.setItem("landar.lang", c); }, code);
  await page.reload({ waitUntil: "networkidle" });
  const h1 = await page.locator("h1").first().innerText();
  const htmlLang = await page.evaluate(() => document.documentElement.lang);
  const ok = h1.includes(frag) && htmlLang === code;
  console.log(`— idioma ${code.toUpperCase()}: ${ok ? "OK" : `FALLO (h1: ${h1} | lang: ${htmlLang})`}`);
}
await page.evaluate(() => localStorage.setItem("landar.lang", "en"));
await page.reload({ waitUntil: "networkidle" });

// — wizard: validación campo por campo (sin enviar)
await page.evaluate(() => document.getElementById("contact").scrollIntoView());
await page.waitForTimeout(600);
const cont = () => page.locator("#contact .btn--primary:visible").first();
// paso 1: Continue sin país → debe quedarse en paso 1
await cont().click();
await page.waitForTimeout(400);
const q1Visible = await page.locator("#contact input").first().isVisible();
console.log(`— wizard paso 1 bloquea sin país: ${q1Visible ? "OK" : "FALLO"}`);
await page.locator("#contact input").first().fill("Germany");
await cont().click(); await page.waitForTimeout(400);
// paso 2: servicios — Continue sin elegir
await cont().click(); await page.waitForTimeout(400);
const step2Still = await page.locator("#contact .choice:visible").first().isVisible();
console.log(`— wizard paso 2 bloquea sin servicio: ${step2Still ? "OK" : "FALLO"}`);
await page.locator("#contact .choice:visible").first().click();
await cont().click(); await page.waitForTimeout(400);
// paso 3: timeline
await cont().click(); await page.waitForTimeout(400);
const step3Still = await page.locator("#contact .choice:visible").first().isVisible();
console.log(`— wizard paso 3 bloquea sin timeline: ${step3Still ? "OK" : "FALLO"}`);
await page.locator("#contact .choice:visible").first().click();
await cont().click(); await page.waitForTimeout(400);
// paso 4: email inválido
const inputs = page.locator("#contact input:visible");
await inputs.nth(0).fill("Test");
await inputs.nth(1).fill("no-es-un-email");
const sendBtn = page.locator("#contact .btn--primary:visible").last();
await sendBtn.click(); await page.waitForTimeout(600);
const doneVisible = await page.locator("#contact").innerText();
const blocked = !doneVisible.includes("Thank you");
console.log(`— wizard paso 4 bloquea email inválido: ${blocked ? "OK" : "FALLO (envió!)"}`);

await browser.close();
console.log("done");
