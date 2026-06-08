// ============================================================
// Inteligenci·AR — copy / i18n
// EN is the source. ES fully translated; DE covers layout-critical
// headlines (to prove longer strings don't break layout).
// PT / ZH / JA fall back to EN for now (picker stays functional).
// ============================================================

export type Lang = "en" | "es" | "pt" | "de" | "zh" | "ja";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "zh", label: "中文", short: "ZH" },
  { code: "ja", label: "日本語", short: "JA" },
];

export const LANG_CODE: Record<Lang, string> = {
  en: "EN", es: "ES", pt: "PT", de: "DE", zh: "ZH", ja: "JA",
};

type Dict = Record<string, string>;

const en: Dict = {
  "nav.problem": "The problem", "nav.services": "What we do", "nav.how": "How it works",
  "nav.why": "Why us", "nav.ai": "AI-entity", "nav.cta": "Get in touch",

  "hero.h1": "Set up your <em>AI-entity</em> in Argentina.",
  "hero.sub": "Be among the first to register an AI-run company — with one partner to land, operate and export from Buenos Aires.",
  "hero.m1": "AI-entity", "hero.m2": "Land & operate", "hero.m3": "Export to the world",
  "hero.cta1": "Book a 30-min call", "hero.cta2": "See how it works",
  "hero.status": "Now onboarding pilot clients",

  "path.eyebrow": "Check your path",
  "path.h2": "See how fast you could be operating.",
  "path.ph": "Where are you expanding from?",
  "path.cta": "Check my path",

  "problem.eyebrow": "The problem",
  "problem.h2": "Five vendors who don't talk to each other.",
  "problem.lede": "Entity, bank, accountant, payroll, compliance — each on its own timeline, in its own language.",
  "problem.v1": "Entity & legal counsel", "problem.f1": "Weeks of back-and-forth",
  "problem.v2": "A bank that will onboard you", "problem.f2": "Opaque requirements",
  "problem.v3": "A local accountant", "problem.f3": "Spanish-only filings",
  "problem.v4": "Payroll & social security", "problem.f4": "Strict deadlines",
  "problem.v5": "Ongoing compliance", "problem.f5": "Rules that shift",
  "problem.note": "Months lost to coordination — and no one to hold accountable.",

  "services.eyebrow": "What we do",
  "services.h2": "Four things. One partner.",
  "services.p1.t": "Entity & legal", "services.p1.d": "The right structure, compliant from day one.",
  "services.p2.t": "Banking readiness", "services.p2.d": "A complete, bank-ready file. Readiness, not promises.",
  "services.p3.t": "Tax & accounting", "services.p3.d": "AFIP, monthly books and filings — in English.",
  "services.p4.t": "Hiring & payroll", "services.p4.d": "Contracts, payroll and social security, end to end.",

  "stats.s1": "days to operating, not months",
  "stats.s2": "services, one point of contact",
  "stats.s3": "trade-partner markets reachable",
  "stats.s4": "languages, one local team",

  "network.eyebrow": "Export from Argentina",
  "network.h2": "One base.<br>50+ markets within reach.",
  "network.lede": "Set up once and sell to the world — plug into Mercosur and Argentina's trade agreements to reach the region and beyond from a single operating base.",

  "faro.eyebrow": "El Faro · the lighthouse",
  "faro.h2": "A steady light through unfamiliar waters.",
  "faro.lede": "A fixed point on the shore, guiding every stage until you're operating.",
  "faro.s1.t": "Chart the route", "faro.s1.d": "Structure, timeline and obligations, mapped first.",
  "faro.s2.t": "Clear the harbour", "faro.s2.d": "Entity, tax IDs and banking file — in parallel.",
  "faro.s3.t": "Make landfall", "faro.s3.d": "Transact, hire and pay. Operating-ready.",
  "faro.s4.t": "Keep the light on", "faro.s4.d": "Accounting, payroll and compliance, same team.",

  "how.eyebrow": "How it works",
  "how.h2": "Three steps. One team. Roughly six weeks.",
  "how.s1.t": "Discovery & plan", "how.s1.d": "A 30-minute call, then a written plan.",
  "how.s2.t": "We set it up", "how.s2.d": "Entity, tax and banking — in parallel, one lead.",
  "how.s3.t": "You operate; we run it", "how.s3.d": "Accounting, payroll and compliance, every month.",
  "how.tl.title": "An indicative timeline", "how.tl.days": "days to operating",
  "how.tl.n1": "Kickoff & plan", "how.tl.n2": "Entity filed", "how.tl.n3": "Tax registered",
  "how.tl.n4": "Banking file ready", "how.tl.n5": "Operating",
  "how.tl.note": "Indicative only — we give you a specific estimate on the first call.",

  "why.eyebrow": "Why us",
  "why.h2": "A local operator, not a directory of vendors.",
  "why.c1.t": "One point of contact", "why.c1.d": "One project lead who owns your launch.",
  "why.c2.t": "A vetted network, one roof", "why.c2.d": "Lawyers, accountants and bankers we coordinate ourselves.",
  "why.c3.t": "End-to-end accountability", "why.c3.d": "The team that launches you keeps you compliant.",
  "why.t1": "Bilingual team — EN · ES · PT · DE", "why.t2": "Based in Buenos Aires", "why.t3": "Fixed-scope proposals",

  "trust.eyebrow": "Trust", "trust.h2": "How we work, in the open.",
  "trust.k1": "Methodology", "trust.c1.t": "Written plan, fixed scope", "trust.c1.d": "Documented scope, timeline and price. No open-ended billing.",
  "trust.k2": "Team", "trust.c2.t": "People, not a call centre", "trust.c2.d": "Named operators in Buenos Aires, in your language.",
  "trust.k3": "Pilot cases", "trust.c3.t": "Early, and honest about it", "trust.c3.d": "First cohort onboarding. Anonymized cases coming soon.",
  "trust.note": "This section grows as real cases close — it stays hidden until there's something true to show.",

  "ai.badge": "AI-entity · built in",
  "ai.h3": "How ready are you to register as an AI-entity?",
  "ai.d": "Argentina is opening the door to AI-run entities. We structure your company — entity, records and governance — so you're ready to register and operate as one the day it's live.",
  "ai.cta": "Get your readiness plan",
  "ai.note": "An emerging framework — we keep your structure current as it finalizes. Readiness, not guarantees.",
  "ai.hint": "Tick what's already true for you",
  "ai.c1": "Registered legal entity (SA / SRL)",
  "ai.c2": "Clean, up-to-date corporate records",
  "ai.c3": "Defined governance & signatories",
  "ai.c4": "Tax & compliance in good standing",
  "ai.s0": "Just getting started", "ai.s2": "On your way", "ai.s3": "Almost there", "ai.s4": "File-day ready",
  "ai.gap": "We close the rest — usually in weeks.",
  "ai.gapDone": "You're file-day ready. Let's confirm the details.",

  "contact.eyebrow": "Start here", "contact.h2": "Tell us where you're landing from.",
  "contact.lede": "Four questions. A tailored plan, not a sales pitch.",
  "contact.ws1": "Where you're based", "contact.ws2": "What you need", "contact.ws3": "Your timeline", "contact.ws4": "How to reach you",
  "contact.q1": "Where is your company based?", "contact.q1h": "So we know which treaties and banking routes apply.",
  "contact.country": "Country / region", "contact.countryph": "e.g. United States, Spain, Germany…",
  "contact.q2": "What do you need help with?", "contact.q2h": "Pick all that apply — you can change this later.",
  "contact.q3": "When do you want to be operating?", "contact.q3h": "An honest estimate is fine.",
  "contact.t1": "As soon as possible", "contact.t2": "Within 1–3 months", "contact.t3": "3–6 months", "contact.t4": "Just exploring",
  "contact.q4": "How should we reach you?", "contact.q4h": "We'll reply within one business day.",
  "contact.name": "Name", "contact.nameph": "Your name", "contact.email": "Work email", "contact.emailph": "you@company.com",
  "contact.back": "Back", "contact.next": "Continue", "contact.send": "Send", "contact.sending": "Sending…",
  "contact.doneT": "Thank you — we'll be in touch.", "contact.doneD": "Prefer to talk now? Book a 30-minute call and we'll bring your plan to it.",
  "contact.error": "Something went wrong — please email us or try again.",

  "final.eyebrow": "Ready when you are",
  "final.h2": "Let's make your Argentina launch painless.",
  "final.lede": "Book a 30-minute call. We'll walk your situation and send a written plan within a day.",
  "final.cta1": "Book a 30-min call", "final.cta2": "Review what we do",

  "footer.tag": "Operating-ready in Argentina. Entity, banking, accounting and hiring — coordinated from Buenos Aires through one point of contact.",
  "footer.h1": "Company", "footer.h2": "Resources", "footer.h3": "Get started",
  "footer.ai": "AI readiness", "footer.blog": "Journal", "footer.contact": "Contact",
  "footer.rights": "Pilot stage — building in Buenos Aires.",
};

const es: Dict = {
  "nav.problem": "El problema", "nav.services": "Qué hacemos", "nav.how": "Cómo funciona",
  "nav.why": "Por qué nosotros", "nav.ai": "Entidad de IA", "nav.cta": "Hablemos",

  "hero.h1": "Constituí tu <em>entidad de IA</em> en Argentina.",
  "hero.sub": "Sé de los primeros en registrar una empresa gestionada por IA — con un solo socio para aterrizar, operar y exportar desde Buenos Aires.",
  "hero.m1": "Entidad de IA", "hero.m2": "Aterrizar y operar", "hero.m3": "Exportar al mundo",
  "hero.cta1": "Agendar una llamada de 30 min", "hero.cta2": "Ver cómo funciona",
  "hero.status": "Incorporando clientes piloto",

  "path.eyebrow": "Verificá tu camino",
  "path.h2": "Mirá qué tan rápido podrías estar operando.",
  "path.ph": "¿Desde dónde te expandís?",
  "path.cta": "Ver mi camino",

  "problem.eyebrow": "El problema",
  "problem.h2": "Cinco proveedores que no se hablan entre sí.",
  "problem.lede": "Sociedad, banco, contador, nómina, cumplimiento — cada uno con su ritmo y su idioma.",
  "problem.v1": "Abogado y constitución", "problem.f1": "Semanas de ida y vuelta",
  "problem.v2": "Un banco que te abra cuenta", "problem.f2": "Requisitos opacos",
  "problem.v3": "Un contador local", "problem.f3": "Trámites sólo en español",
  "problem.v4": "Nómina y seguridad social", "problem.f4": "Plazos estrictos",
  "problem.v5": "Cumplimiento continuo", "problem.f5": "Reglas que cambian",
  "problem.note": "Meses perdidos en coordinar — y nadie a quien responsabilizar.",

  "services.eyebrow": "Qué hacemos",
  "services.h2": "Cuatro cosas. Un socio.",
  "services.p1.t": "Sociedad y legal", "services.p1.d": "La estructura correcta, en regla desde el primer día.",
  "services.p2.t": "Preparación bancaria", "services.p2.d": "Un legajo completo, listo para el banco. Preparación, no promesas.",
  "services.p3.t": "Impuestos y contabilidad", "services.p3.d": "AFIP, libros y presentaciones mensuales — en inglés.",
  "services.p4.t": "Contratación y nómina", "services.p4.d": "Contratos, nómina y seguridad social, de punta a punta.",

  "stats.s1": "días para operar, no meses",
  "stats.s2": "servicios, un punto de contacto",
  "stats.s3": "mercados socios alcanzables",
  "stats.s4": "idiomas, un equipo local",

  "network.eyebrow": "Exportar desde Argentina",
  "network.h2": "Una base.<br>50+ mercados al alcance.",
  "network.lede": "Constituite una vez y vendé al mundo — conectate al Mercosur y a la red de acuerdos comerciales de Argentina para llegar a la región y más allá desde una sola base operativa.",

  "faro.eyebrow": "El Faro · the lighthouse",
  "faro.h2": "Una luz firme en aguas desconocidas.",
  "faro.lede": "Un punto fijo en la costa, guiando cada etapa hasta que estés operando.",
  "faro.s1.t": "Trazar la ruta", "faro.s1.d": "Estructura, plazos y obligaciones, mapeados primero.",
  "faro.s2.t": "Despejar el puerto", "faro.s2.d": "Sociedad, CUIT y legajo bancario — en paralelo.",
  "faro.s3.t": "Tocar tierra", "faro.s3.d": "Transaccionar, contratar y pagar. Listo para operar.",
  "faro.s4.t": "Mantener la luz encendida", "faro.s4.d": "Contabilidad, nómina y cumplimiento, mismo equipo.",

  "how.eyebrow": "Cómo funciona",
  "how.h2": "Tres pasos. Un equipo. Seis semanas.",
  "how.s1.t": "Diagnóstico y plan", "how.s1.d": "Una llamada de 30 minutos y un plan escrito.",
  "how.s2.t": "Lo montamos", "how.s2.d": "Sociedad, fiscal y banca — en paralelo, un líder.",
  "how.s3.t": "Vos operás; nosotros lo corremos", "how.s3.d": "Contabilidad, nómina y cumplimiento, cada mes.",
  "how.tl.title": "Un cronograma indicativo", "how.tl.days": "días hasta operar",
  "how.tl.n1": "Arranque y plan", "how.tl.n2": "Sociedad presentada", "how.tl.n3": "Inscripción fiscal",
  "how.tl.n4": "Legajo bancario listo", "how.tl.n5": "Operando",
  "how.tl.note": "Sólo indicativo — te damos una estimación concreta en la primera llamada.",

  "why.eyebrow": "Por qué nosotros",
  "why.h2": "Un operador local, no un directorio de proveedores.",
  "why.c1.t": "Un solo punto de contacto", "why.c1.d": "Un líder de proyecto que es dueño de tu lanzamiento.",
  "why.c2.t": "Una red vetada, bajo un techo", "why.c2.d": "Abogados, contadores y bancos que coordinamos nosotros.",
  "why.c3.t": "Responsabilidad de punta a punta", "why.c3.d": "El equipo que te lanza te mantiene en regla.",
  "why.t1": "Equipo bilingüe — EN · ES · PT · DE", "why.t2": "Con base en Buenos Aires", "why.t3": "Propuestas de alcance fijo",

  "trust.eyebrow": "Confianza", "trust.h2": "Cómo trabajamos, a la vista.",
  "trust.k1": "Metodología", "trust.c1.t": "Plan escrito, alcance fijo", "trust.c1.d": "Alcance, plazo y precio documentados. Sin facturación abierta.",
  "trust.k2": "Equipo", "trust.c2.t": "Personas, no un call center", "trust.c2.d": "Operadores con nombre en Buenos Aires, en tu idioma.",
  "trust.k3": "Casos piloto", "trust.c3.t": "Tempranos, y honestos al respecto", "trust.c3.d": "Primera cohorte en marcha. Casos anonimizados pronto.",
  "trust.note": "Esta sección crece a medida que cierran casos reales — permanece oculta hasta que haya algo verdadero para mostrar.",

  "ai.badge": "Entidad de IA · incluido",
  "ai.h3": "¿Qué tan listo estás para registrar una entidad de IA?",
  "ai.d": "Argentina está abriendo la puerta a las entidades gestionadas por IA. Estructuramos tu empresa — sociedad, registros y gobernanza — para que estés listo para registrarte y operar como una el día que sea ley.",
  "ai.cta": "Obtené tu plan de preparación",
  "ai.note": "Un marco emergente — mantenemos tu estructura al día a medida que se define. Preparación, no garantías.",
  "ai.hint": "Marcá lo que ya es cierto para vos",
  "ai.c1": "Sociedad registrada (SA / SRL)",
  "ai.c2": "Registros societarios limpios y al día",
  "ai.c3": "Gobernanza y firmantes definidos",
  "ai.c4": "Impuestos y cumplimiento en regla",
  "ai.s0": "Recién empezando", "ai.s2": "En camino", "ai.s3": "Casi listo", "ai.s4": "Listo para presentar",
  "ai.gap": "Cerramos el resto — normalmente en semanas.",
  "ai.gapDone": "Estás listo para presentar. Confirmemos los detalles.",

  "contact.eyebrow": "Empezá acá", "contact.h2": "Contanos desde dónde aterrizás.",
  "contact.lede": "Cuatro preguntas. Un plan a medida, no un discurso de ventas.",
  "contact.ws1": "Dónde estás", "contact.ws2": "Qué necesitás", "contact.ws3": "Tu plazo", "contact.ws4": "Cómo contactarte",
  "contact.q1": "¿Dónde está tu empresa?", "contact.q1h": "Para saber qué tratados y rutas bancarias aplican.",
  "contact.country": "País / región", "contact.countryph": "ej. Estados Unidos, España, Alemania…",
  "contact.q2": "¿Con qué necesitás ayuda?", "contact.q2h": "Elegí todo lo que aplique — podés cambiarlo después.",
  "contact.q3": "¿Cuándo querés estar operando?", "contact.q3h": "Una estimación honesta está bien.",
  "contact.t1": "Lo antes posible", "contact.t2": "En 1–3 meses", "contact.t3": "3–6 meses", "contact.t4": "Sólo explorando",
  "contact.q4": "¿Cómo te contactamos?", "contact.q4h": "Respondemos dentro de un día hábil.",
  "contact.name": "Nombre", "contact.nameph": "Tu nombre", "contact.email": "Email de trabajo", "contact.emailph": "vos@empresa.com",
  "contact.back": "Atrás", "contact.next": "Continuar", "contact.send": "Enviar", "contact.sending": "Enviando…",
  "contact.doneT": "Gracias — te contactamos.", "contact.doneD": "¿Preferís hablar ahora? Agendá una llamada de 30 minutos y llevamos tu plan.",
  "contact.error": "Algo salió mal — escribinos o probá de nuevo.",

  "final.eyebrow": "Cuando estés listo",
  "final.h2": "Tu llegada a Argentina, sin dolores de cabeza.",
  "final.lede": "Una llamada de 30 minutos. Te enviamos un plan escrito en un día.",
  "final.cta1": "Agendar una llamada de 30 min", "final.cta2": "Ver qué hacemos",

  "footer.tag": "Listo para operar en Argentina. Sociedad, banca, contabilidad y contratación — coordinado desde Buenos Aires por un solo punto de contacto.",
  "footer.h1": "Empresa", "footer.h2": "Recursos", "footer.h3": "Empezar",
  "footer.ai": "Preparación IA", "footer.blog": "Blog", "footer.contact": "Contacto",
  "footer.rights": "Etapa piloto — construyendo en Buenos Aires.",
};

// German — headlines & nav only (longest strings; proves the layout stretches).
const de: Dict = {
  "nav.problem": "Das Problem", "nav.services": "Was wir tun", "nav.how": "So funktioniert's",
  "nav.why": "Warum wir", "nav.ai": "KI-Entität", "nav.cta": "Sprechen wir",
  "hero.h1": "Gründen Sie Ihre <em>KI-Entität</em> in Argentinien.",
  "hero.sub": "Gehören Sie zu den Ersten, die ein KI-geführtes Unternehmen registrieren — mit einem Partner zum Ankommen, Betreiben und Exportieren aus Buenos Aires.",
  "hero.m1": "KI-Entität", "hero.m2": "Ankommen & betreiben", "hero.m3": "In die Welt exportieren",
  "hero.cta1": "30-Minuten-Gespräch buchen", "hero.cta2": "So funktioniert es",
  "hero.status": "Wir nehmen Pilotkunden auf",
  "problem.eyebrow": "Das Problem",
  "problem.h2": "In Argentinien zu operieren heißt, fünf Dienstleister zu jonglieren, die nicht miteinander reden.",
  "services.eyebrow": "Was wir tun",
  "services.h2": "Ein Partner für die vier Dinge, die Sie tatsächlich betriebsbereit machen.",
  "faro.h2": "Ein ruhiges Licht in unbekannten Gewässern.",
  "how.eyebrow": "So funktioniert's",
  "how.h2": "Drei Schritte. Ein Team. Etwa sechs Wochen.",
  "why.eyebrow": "Warum wir",
  "why.h2": "Ein lokaler Betreiber, kein Verzeichnis von Dienstleistern.",
  "final.h2": "Machen wir Ihren Argentinien-Start mühelos.",
};

const DICT: Partial<Record<Lang, Dict>> = { en, es, de };

export function t(lang: Lang, key: string): string {
  const d = DICT[lang];
  return (d && d[key]) ?? en[key] ?? key;
}
