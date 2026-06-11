// Verificación post-CSP: carga home + radar, dispara Crisp con una interacción,
// chequea que el globo levante el topojson local y junta toda violación de CSP
// o error de consola. Correr con el server de prod arriba (npm start).
import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const problems = [];
const requests = [];
page.on("console", (msg) => {
  if (msg.type() === "error" || msg.text().includes("Content Security Policy"))
    problems.push(`[console:${msg.type()}] ${msg.text()}`);
});
page.on("pageerror", (err) => problems.push(`[pageerror] ${err.message}`));
page.on("requestfailed", (req) =>
  problems.push(`[requestfailed] ${req.url()} → ${req.failure()?.errorText}`),
);
page.on("response", (res) => requests.push(`${res.status()} ${res.url()}`));

await page.goto(URL, { waitUntil: "networkidle" });

// interacción → dispara la carga diferida de Crisp
await page.mouse.move(700, 400);
await page.mouse.wheel(0, 600);
await page.keyboard.press("ArrowDown");
await page.waitForTimeout(4000);

const crisp = requests.filter((r) => r.includes("crisp.chat"));
const topo = requests.filter((r) => r.includes("countries-110m"));

console.log("— topojson:", topo.length ? topo.join(" | ") : "NO CARGÓ");
console.log("— crisp:", crisp.length ? `${crisp.length} requests (${crisp[0]})` : "NO CARGÓ");

// radar también (página con data de la DB)
await page.goto(`${URL}/oportunidades`, { waitUntil: "networkidle" });
const radarHtml = await page.content();
console.log(
  "— medida nueva en feed:",
  radarHtml.includes("reforma-laboral-convenios-colectivos-2026") ? "SÍ" : "NO",
);
console.log(
  "— big bang vigente:",
  radarHtml.includes("1145 a 1150") || radarHtml.includes("1145") ? "SÍ" : "NO",
);
await page.waitForTimeout(1500);

if (problems.length) {
  console.log("\nPROBLEMAS:");
  for (const p of [...new Set(problems)]) console.log(" ", p);
} else {
  console.log("\nSIN ERRORES DE CONSOLA NI CSP ✓");
}

await browser.close();
