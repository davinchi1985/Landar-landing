// Auditoría i18n: compara las keys de cada idioma contra EN y contra las
// keys realmente usadas en los componentes (incluye templates expandidos).
import { readFileSync } from "fs";

const src = readFileSync("app/translations.ts", "utf8");

function dictKeys(name) {
  const m = src.match(new RegExp(`const ${name}: Dict = \\{([\\s\\S]*?)\\n\\};`));
  if (!m) throw new Error(`dict ${name} no encontrado`);
  return new Set([...m[1].matchAll(/"([^"]+)":\s/g)].map((x) => x[1]));
}

const dicts = { en: dictKeys("en"), es: dictKeys("es"), pt: dictKeys("pt"), de: dictKeys("de"), zh: dictKeys("zh") };

// keys usadas en los componentes
const tsx = readFileSync("app/components/LandingPage.tsx", "utf8");
const used = new Set([...tsx.matchAll(/\btr\("([^"]+)"\)/g)].map((x) => x[1]));
// templates dinámicos conocidos
for (let i = 1; i <= 5; i++) { used.add(`problem.v${i}`); used.add(`problem.f${i}`); used.add(`how.tl.n${i}`); }
for (let i = 1; i <= 4; i++) { used.add(`services.p${i}.t`); used.add(`services.p${i}.d`); }
for (let i = 1; i <= 3; i++) { used.add(`how.s${i}.t`); used.add(`how.s${i}.d`); }
// arrays de keys (AI_KEYS, wizard, status del checker)
for (const m of tsx.matchAll(/"((?:ai|wiz|w\d|contact|why|net|faro)\.[\w.]+)"/g)) used.add(m[1]);

let problems = 0;
for (const [lang, keys] of Object.entries(dicts)) {
  if (lang === "en") continue;
  const missing = [...dicts.en].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !dicts.en.has(k));
  if (missing.length) { console.log(`${lang.toUpperCase()} FALTAN (${missing.length}):`, missing.join(", ")); problems++; }
  if (extra.length) { console.log(`${lang.toUpperCase()} SOBRAN (${extra.length}):`, extra.join(", ")); problems++; }
}

const usedMissing = [...used].filter((k) => !dicts.en.has(k));
if (usedMissing.length) { console.log("USADAS SIN DEFINIR EN EN:", usedMissing.join(", ")); problems++; }

const enUnused = [...dicts.en].filter((k) => !used.has(k));
console.log(`\nEN total: ${dicts.en.size} keys · usadas detectadas: ${used.size}`);
if (enUnused.length) console.log(`Posiblemente huérfanas en EN (no detectadas en uso): ${enUnused.join(", ")}`);
console.log(problems ? `\n✗ ${problems} problema(s)` : "\n✓ ES/PT/DE completos vs EN; todas las keys usadas existen");
