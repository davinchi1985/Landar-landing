"use client";

import { useState, useEffect, useRef } from "react";
import { t, Lang, LANGS, LANG_CODE } from "../translations";
import { HUBSPOT_ENDPOINT } from "../lib/site";
import Globe from "./Globe";

const SERVICE_OPTIONS = [
  { id: "entity", key: "services.p1.t" },
  { id: "banking", key: "services.p2.t" },
  { id: "tax", key: "services.p3.t" },
  { id: "hiring", key: "services.p4.t" },
];
const TIMELINE_OPTIONS = [
  { id: "asap", key: "contact.t1" },
  { id: "1-3m", key: "contact.t2" },
  { id: "3-6m", key: "contact.t3" },
  { id: "exploring", key: "contact.t4" },
];
const AI_WEIGHTS = [30, 25, 20, 25];
const AI_KEYS = ["ai.c1", "ai.c2", "ai.c3", "ai.c4"];
const RING_LEN = 2 * Math.PI * 35;

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
    <path d="M5 12l5 5L20 6" />
  </svg>
);

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const tr = (k: string) => t(lang, k);

  // nav
  const [stuck, setStuck] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [langFooterOpen, setLangFooterOpen] = useState(false);

  // ai-check
  const [aiOn, setAiOn] = useState<boolean[]>([false, false, false, false]);
  const aiScore = Math.min(100, aiOn.reduce((s, on, i) => s + (on ? AI_WEIGHTS[i] : 0), 0));
  const aiStatusKey = aiScore >= 100 ? "ai.s4" : aiScore >= 71 ? "ai.s3" : aiScore >= 41 ? "ai.s2" : "ai.s0";

  // wizard
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [country, setCountry] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  // boot language from storage + keep <html lang> in sync
  useEffect(() => {
    try {
      const s = localStorage.getItem("landar.lang") as Lang | null;
      if (s && s !== lang) setLang(s);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("landar.lang", lang); } catch {}
  }, [lang]);

  // sticky nav
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdowns on outside click / escape
  useEffect(() => {
    const close = () => { setLangOpen(false); setLangFooterOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", onKey); };
  }, []);

  // scroll reveal + timeline + faro (DOM-driven; classes persist across re-renders
  // because the className prop of these nodes never changes)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const armed: HTMLElement[] = [];
    const vh = () => window.innerHeight || document.documentElement.clientHeight;
    let faroLit = false;

    function animateTimeline() {
      const fill = document.getElementById("trackFill");
      const nodes = document.querySelectorAll("#track .tnode");
      if (fill) requestAnimationFrame(() => { (fill as HTMLElement).style.width = "100%"; });
      nodes.forEach((n, i) => setTimeout(() => n.classList.add("is-on"), reduce ? 0 : 220 + i * 260));
    }
    function lightFaro() {
      if (faroLit) return; faroLit = true;
      const steps = Array.from(document.querySelectorAll<HTMLElement>(".faro-step"));
      steps.forEach((s, i) => setTimeout(() => {
        steps.forEach((x) => x.classList.remove("is-lit"));
        s.classList.add("is-lit");
        if (i === steps.length - 1) setTimeout(() => steps.forEach((x) => x.classList.add("is-lit")), 650);
      }, reduce ? 0 : 350 + i * 700));
    }
    function handleTrigger(el: HTMLElement) {
      if (el.id === "timeline") animateTimeline();
      if (el.querySelector && el.querySelector(".faro-step")) lightFaro();
    }
    reveals.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top >= vh() * 0.88) { el.classList.add("is-armed"); armed.push(el); }
      else handleTrigger(el);
    });
    function check() {
      for (let i = armed.length - 1; i >= 0; i--) {
        const el = armed[i], r = el.getBoundingClientRect();
        if (r.top < vh() * 0.88 && r.bottom > 0) {
          el.classList.remove("is-armed");
          handleTrigger(el);
          armed.splice(i, 1);
        }
      }
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const ti = setTimeout(check, 120);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearTimeout(ti);
    };
  }, []);

  // draggable order box (desktop only)
  useEffect(() => {
    const box = document.getElementById("tradeBox");
    if (!box) return;
    const hero = box.closest("section");
    if (!hero) return;
    const KEY = "landar.tradebox";
    const big = () => !window.matchMedia("(max-width: 920px)").matches;
    const clampN = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

    if (big()) {
      try {
        const s = JSON.parse(localStorage.getItem(KEY) || "null");
        if (s && typeof s.left === "number") {
          box.style.left = s.left + "px"; box.style.top = s.top + "px";
          box.style.right = "auto"; box.style.bottom = "auto";
        }
      } catch {}
    }

    let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
    const down = (e: PointerEvent) => {
      if (!big()) return;
      dragging = true; box.classList.add("is-dragging");
      const r = box.getBoundingClientRect(), hr = hero.getBoundingClientRect();
      ox = r.left - hr.left; oy = r.top - hr.top;
      box.style.left = ox + "px"; box.style.top = oy + "px"; box.style.right = "auto"; box.style.bottom = "auto";
      sx = e.clientX; sy = e.clientY;
      try { box.setPointerCapture(e.pointerId); } catch {}
      e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const hr = hero.getBoundingClientRect();
      const nx = clampN(ox + (e.clientX - sx), 0, hr.width - box.offsetWidth);
      const ny = clampN(oy + (e.clientY - sy), 0, hr.height - box.offsetHeight);
      box.style.left = nx + "px"; box.style.top = ny + "px";
    };
    const end = () => {
      if (!dragging) return;
      dragging = false; box.classList.remove("is-dragging");
      try { localStorage.setItem(KEY, JSON.stringify({ left: parseFloat(box.style.left), top: parseFloat(box.style.top) })); } catch {}
    };
    box.addEventListener("pointerdown", down);
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerup", end);
    box.addEventListener("pointercancel", end);
    return () => {
      box.removeEventListener("pointerdown", down);
      box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerup", end);
      box.removeEventListener("pointercancel", end);
    };
  }, []);

  function chooseLang(l: Lang) { setLang(l); setLangOpen(false); setLangFooterOpen(false); }

  function pathSubmit(e: React.FormEvent) {
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const contact = document.getElementById("contact");
    if (contact) {
      const y = contact.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
      setTimeout(() => countryRef.current?.focus(), reduce ? 0 : 600);
    }
  }

  function validateStep(): boolean {
    if (step === 0 && !country.trim()) { setErr("country"); return false; }
    if (step === 1 && services.length === 0) { setErr("services"); return false; }
    if (step === 2 && !timeline) { setErr("timeline"); return false; }
    if (step === 3) {
      if (!name.trim()) { setErr("name"); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr("email"); return false; }
    }
    return true;
  }

  async function next() {
    if (!validateStep()) return;
    if (step < 3) { setStep(step + 1); return; }
    // submit
    setStatus("sending");
    const summary = `Services: ${services.join(", ") || "—"} · Timeline: ${timeline || "—"} · Country: ${country || "—"}`;
    const hubspot = fetch(HUBSPOT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          { name: "email", value: email },
          { name: "firstname", value: name },
          { name: "country", value: country },
          { name: "message", value: summary },
        ],
        context: { pageUri: typeof window !== "undefined" ? window.location.href : "", pageName: "Inteligenci·AR — Contact" },
      }),
    }).then((r) => r.ok).catch(() => false);
    const formspree = fetch("https://formspree.io/f/xdajgyzo", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ country, services: services.join(", "), timeline, name, email }),
    }).then((r) => r.ok).catch(() => false);
    const [hs, fs] = await Promise.all([hubspot, formspree]);
    if (hs || fs) { setDone(true); setStatus("idle"); }
    else setStatus("error");
  }

  const errStyle = { borderColor: "var(--accent)", boxShadow: "0 0 0 3px var(--accent-soft)" } as const;
  const progress = done ? 100 : ((step + 1) / 4) * 100;

  const GlobeIcon = () => (
    <svg className="globe-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
    </svg>
  );
  const Logo = () => (
    <a className="logo" href="#top" aria-label="Inteligenci·AR — home">
      <svg viewBox="0 0 26 26" className="logo__mark" aria-hidden="true">
        <rect width="26" height="26" rx="7" fill="#1C1B17" />
        <path d="M5.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#C9613D" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
        <path d="M20.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#C9613D" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
        <path d="M13 4.6 Q13 11 13 17.8" fill="none" stroke="#C9613D" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        <circle cx="13" cy="18" r="2.1" fill="#C9613D" />
      </svg>
      <span className="logo__word">Inteligenci<span className="ar">·AR</span></span>
    </a>
  );

  function LangMenu({ open, setOpen, idSuffix }: { open: boolean; setOpen: (v: boolean) => void; idSuffix: string }) {
    return (
      <div className={"lang" + (open ? " is-open" : "")} onClick={(e) => e.stopPropagation()}>
        <button className="lang__btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
          <GlobeIcon />
          <span className="code">{LANG_CODE[lang]}</span>
          <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        <div className="lang__menu" role="listbox" aria-label="Language" id={"langMenu" + idSuffix}>
          {LANGS.map((l) => (
            <button key={l.code} role="option" aria-selected={l.code === lang} className={l.code === lang ? "is-active" : ""} onClick={() => chooseLang(l.code)}>
              <span>{l.label}</span><span className="code">{l.short}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* NAV */}
      <header className={"nav" + (stuck ? " is-stuck" : "") + (navOpen ? " is-open" : "")}>
        <div className="nav__inner">
          <Logo />
          <nav className="nav__links" aria-label="Primary">
            <a href="#problem">{tr("nav.problem")}</a>
            <a href="#services">{tr("nav.services")}</a>
            <a href="#how">{tr("nav.how")}</a>
            <a href="#why">{tr("nav.why")}</a>
            <a href="#ai">{tr("nav.ai")}</a>
          </nav>
          <div className="nav__right">
            <LangMenu open={langOpen} setOpen={setLangOpen} idSuffix="" />
            <a className="btn btn--primary" href="#contact">{tr("nav.cta")}</a>
            <button className="nav__burger" aria-label="Menu" aria-expanded={navOpen} onClick={(e) => { e.stopPropagation(); setNavOpen(!navOpen); }}>
              <span></span><span></span>
            </button>
          </div>
        </div>
        <div className="nav__mobile">
          <a href="#problem" onClick={() => setNavOpen(false)}>{tr("nav.problem")}</a>
          <a href="#services" onClick={() => setNavOpen(false)}>{tr("nav.services")}</a>
          <a href="#how" onClick={() => setNavOpen(false)}>{tr("nav.how")}</a>
          <a href="#why" onClick={() => setNavOpen(false)}>{tr("nav.why")}</a>
          <a href="#ai" onClick={() => setNavOpen(false)}>{tr("nav.ai")}</a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero wrap" id="hero">
          <div className="hero__grid">
            <div className="hero__copy">
              <h1 className="reveal" dangerouslySetInnerHTML={{ __html: tr("hero.h1") }} />
              <p className="hero__sub lede reveal" style={{ ["--reveal-delay" as string]: ".12s" }} dangerouslySetInnerHTML={{ __html: tr("hero.sub") }} />
              <div className="hero-modes reveal" style={{ ["--reveal-delay" as string]: ".16s" }}>
                <a className="hero-mode is-lead" href="#ai"><span className="hm-no">01</span><span className="hm-label">{tr("hero.m1")}</span></a>
                <a className="hero-mode" href="#services"><span className="hm-no">02</span><span className="hm-label">{tr("hero.m2")}</span></a>
                <a className="hero-mode" href="#network"><span className="hm-no">03</span><span className="hm-label">{tr("hero.m3")}</span></a>
              </div>
              <div className="hero__cta reveal" style={{ ["--reveal-delay" as string]: ".2s" }}>
                <a className="btn btn--primary btn--lg" href="#contact">{tr("hero.cta1")} <span className="arrow">→</span></a>
                <a className="btn btn--ghost btn--lg" href="#how">{tr("hero.cta2")}</a>
              </div>
              <div className="hero__status reveal" style={{ ["--reveal-delay" as string]: ".26s" }}>
                <span className="pill"><span className="dot"></span><span>{tr("hero.status")}</span></span>
              </div>
            </div>

            <Globe />
          </div>

          <div className="trade-box is-out" id="tradeBox" role="button" tabIndex={0} aria-label="Live Argentina trade — drag to move">
            <span className="tb-grip" aria-hidden="true"><i></i><i></i></span>
            <div className="tb-top">
              <span className="tb-live"><span className="tb-dot"></span>Live · Argentina</span>
              <span className="tb-badge"><span className="tb-arrow" id="tbArrow">↗</span><span id="tbMode">Export</span></span>
            </div>
            <div className="tb-product" id="tbProduct">Oil &amp; gas</div>
            <div className="tb-route" id="tbRoute">Neuquén → world markets</div>
          </div>

          <a className="scroll-cue" href="#path" aria-label="Scroll down"><span className="scroll-cue__line"></span></a>
        </section>

        {/* AI-ENTITY */}
        <section className="section section--tight" id="ai">
          <div className="wrap">
            <div className="ai-module reveal">
              <div>
                <span className="ai-badge">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" /><circle cx="12" cy="12" r="3" /></svg>
                  <span>{tr("ai.badge")}</span>
                </span>
                <h3>{tr("ai.h3")}</h3>
                <p className="muted">{tr("ai.d")}</p>
                <a className="btn btn--primary" href="#contact" style={{ marginTop: "1.4rem" }}>{tr("ai.cta")} <span className="arrow">→</span></a>
                <p className="ai-disclaimer">{tr("ai.note")}</p>
              </div>
              <div className="ai-check">
                <div className="ai-check__head">
                  <span className="ai-ring-wrap">
                    <svg className="ai-ring" viewBox="0 0 80 80" aria-hidden="true">
                      <circle className="ai-ring__track" cx="40" cy="40" r="35" />
                      <circle className="ai-ring__bar" cx="40" cy="40" r="35" style={{ strokeDasharray: RING_LEN, strokeDashoffset: RING_LEN * (1 - aiScore / 100) }} />
                    </svg>
                    <span className="ai-ring-pct">{aiScore}%</span>
                  </span>
                  <div>
                    <div className="ai-check__status">{tr(aiStatusKey)}</div>
                    <div className="ai-check__hint">{tr("ai.hint")}</div>
                  </div>
                </div>
                <div className="ai-check__list">
                  {AI_KEYS.map((k, i) => (
                    <button key={k} type="button" className={"ai-toggle" + (aiOn[i] ? " is-on" : "")} aria-pressed={aiOn[i]}
                      onClick={() => setAiOn((prev) => prev.map((v, j) => (j === i ? !v : v)))}>
                      <span className="ai-toggle__box"><Check /></span>
                      <span>{tr(k)}</span>
                    </button>
                  ))}
                </div>
                <div className="ai-check__foot">
                  <span className="ai-check__gap">{aiScore >= 100 ? tr("ai.gapDone") : tr("ai.gap")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AVAILABILITY CHECKER */}
        <section className="section--tight wrap" id="path">
          <div className="checker reveal">
            <div className="checker__copy">
              <span className="eyebrow">{tr("path.eyebrow")}</span>
              <h2 style={{ marginTop: "0.8rem" }}>{tr("path.h2")}</h2>
            </div>
            <form className="checker__form" onSubmit={pathSubmit} noValidate>
              <label className="checker__field">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" /></svg>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder={tr("path.ph")} aria-label="Country or region" />
              </label>
              <button className="btn btn--primary btn--lg" type="submit"><span>{tr("path.cta")}</span> <span className="arrow">→</span></button>
            </form>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section" id="problem">
          <div className="wrap">
            <div className="split">
              <div className="s-head reveal">
                <span className="eyebrow"><span className="num">01</span> <span>{tr("problem.eyebrow")}</span></span>
                <h2 style={{ marginTop: "1.2rem" }}>{tr("problem.h2")}</h2>
                <p className="lede">{tr("problem.lede")}</p>
              </div>
              <div className="reveal" style={{ ["--reveal-delay" as string]: ".1s" }}>
                <ul className="vendor-list">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <li className="vendor-row" key={n}>
                      <span className="v-idx">{n}</span>
                      <span className="v-name">{tr("problem.v" + n)}</span>
                      <span className="v-friction">{tr("problem.f" + n)}</span>
                    </li>
                  ))}
                </ul>
                <p className="tangle-note">{tr("problem.note")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="wrap">
            <div className="s-head reveal">
              <span className="eyebrow"><span className="num">02</span> <span>{tr("services.eyebrow")}</span></span>
              <h2 style={{ marginTop: "1.2rem" }}>{tr("services.h2")}</h2>
            </div>
            <div className="pillars">
              {[
                { no: "01", d: ".0s", icon: <path d="M6 3h9l3 3v15H6z" />, extra: <path d="M9 9h6M9 13h6M9 17h3" /> },
                { no: "02", d: ".06s", icon: <path d="M3 10l9-5 9 5" />, extra: <path d="M5 10v8M19 10v8M9 10v8M15 10v8M3 21h18" /> },
                { no: "03", d: ".12s", icon: <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />, extra: <path d="M9 8h6M9 12h6" /> },
                { no: "04", d: ".18s", icon: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /></>, extra: <path d="M16 5.5a3 3 0 010 5M18 14c2.2.7 3.5 2.6 3.5 4.8" /> },
              ].map((p, i) => (
                <article className="card pillar reveal" key={p.no} style={{ ["--reveal-delay" as string]: p.d }}>
                  <span className="pillar__no">{p.no}</span>
                  <div className="pillar__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>{p.icon}{p.extra}</svg></div>
                  <h3>{tr(`services.p${i + 1}.t`)}</h3>
                  <p>{tr(`services.p${i + 1}.d`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SPEC NUMBERS */}
        <section className="section--tight" id="stats">
          <div className="wrap">
            <div className="stats">
              {[{ n: "~45", k: "stats.s1" }, { n: "4 → 1", k: "stats.s2" }, { n: "15+", k: "stats.s3" }, { n: "6", k: "stats.s4" }].map((s, i) => (
                <div className="stat reveal" key={s.k} style={{ ["--reveal-delay" as string]: `.${i * 6}s` }}>
                  <div className="stat__n">{s.n}</div>
                  <div className="stat__l">{tr(s.k)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NETWORK / EXPORT */}
        <section className="section" id="network">
          <div className="wrap">
            <div className="netband reveal">
              <span className="eyebrow">{tr("network.eyebrow")}</span>
              <h2 dangerouslySetInnerHTML={{ __html: tr("network.h2") }} />
              <p className="lede">{tr("network.lede")}</p>
              <div className="net-chips">
                {["Brazil", "Uruguay", "Paraguay"].map((c) => <span className="net-chip is-core" key={c}>{c}</span>)}
                {["Chile", "Bolivia", "Peru", "Colombia", "Mexico", "EU (pending)", "Israel", "Egypt", "South Africa", "India", "Singapore"].map((c) => <span className="net-chip" key={c}>{c}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* EL FARO */}
        <section className="section" id="faro">
          <div className="wrap">
            <div className="faro reveal">
              <div className="faro__grid">
                <div className="lighthouse-stage" aria-hidden="true">
                  <svg viewBox="0 0 220 300" width="100%" style={{ maxWidth: "300px" }} fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#C9613D" stopOpacity="0.55" />
                        <stop offset="1" stopColor="#C9613D" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g className="lh-beams" style={{ transformOrigin: "110px 78px" }}>
                      <path d="M110 78 L228 36 L228 120 Z" fill="url(#beam)" />
                      <path d="M110 78 L-8 36 L-8 120 Z" fill="url(#beam)" opacity="0.6" />
                    </g>
                    <circle cx="110" cy="78" r="13" fill="#C9613D" opacity="0.9" />
                    <circle cx="110" cy="78" r="22" fill="#C9613D" opacity="0.18" />
                    <path d="M98 62 h24 v18 h-24 z" fill="#2A2823" stroke="rgba(239,235,226,0.35)" strokeWidth="1.2" />
                    <path d="M94 80 h32 l-4 8 h-24 z" fill="#1f1d19" stroke="rgba(239,235,226,0.3)" strokeWidth="1" />
                    <path d="M98 88 L96 250 h28 L122 88 Z" fill="#EFEbe2" />
                    <path d="M98 88 L96 250 h28 L122 88 Z" fill="none" stroke="rgba(28,27,23,0.25)" strokeWidth="1" />
                    <path d="M97.4 130 h25.2 l-0.4 22 h-24.4 z" fill="#C9613D" opacity="0.9" />
                    <path d="M96.7 186 h26.6 l-0.4 22 h-25.8 z" fill="#C9613D" opacity="0.9" />
                    <path d="M88 250 h44 l6 16 h-56 z" fill="#2A2823" />
                    <path d="M40 268 q30 -16 70 -14 q44 -2 72 14 q-72 14 -142 0 z" fill="#211f1b" />
                  </svg>
                </div>
                <div>
                  <span className="eyebrow"><span className="num">03</span> <span>{tr("faro.eyebrow")}</span></span>
                  <h2 style={{ marginTop: "1.1rem" }}>{tr("faro.h2")}</h2>
                  <p className="lede" style={{ marginTop: "1rem" }}>{tr("faro.lede")}</p>
                  <div className="faro-steps">
                    {[1, 2, 3, 4].map((n) => (
                      <div className={"faro-step" + (n === 1 ? " is-lit" : "")} key={n}>
                        <span className="s-no">0{n}</span>
                        <div><h4>{tr(`faro.s${n}.t`)}</h4><p>{tr(`faro.s${n}.d`)}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section" id="how">
          <div className="wrap">
            <div className="s-head reveal">
              <span className="eyebrow"><span className="num">04</span> <span>{tr("how.eyebrow")}</span></span>
              <h2 style={{ marginTop: "1.2rem" }}>{tr("how.h2")}</h2>
            </div>
            <div className="steps3">
              {[1, 2, 3].map((n) => (
                <div className="step reveal" key={n} style={{ ["--reveal-delay" as string]: `.${(n - 1) * 8}s` }}>
                  <h3>{tr(`how.s${n}.t`)}</h3><p>{tr(`how.s${n}.d`)}</p>
                </div>
              ))}
            </div>
            <div className="timeline reveal" id="timeline">
              <div className="timeline__head">
                <h3>{tr("how.tl.title")}</h3>
                <div className="days">~45 <small>{tr("how.tl.days")}</small></div>
              </div>
              <div className="track" id="track">
                <div className="track__line"></div>
                <div className="track__fill" id="trackFill"></div>
                <div className="track__nodes">
                  {[{ d: "Day 0", k: "how.tl.n1" }, { d: "Day ~10", k: "how.tl.n2" }, { d: "Day ~25", k: "how.tl.n3" }, { d: "Day ~40", k: "how.tl.n4" }, { d: "Day ~45", k: "how.tl.n5" }].map((nd) => (
                    <div className="tnode" key={nd.k}><div className="t-day">{nd.d}</div><div className="t-label">{tr(nd.k)}</div></div>
                  ))}
                </div>
              </div>
              <p className="muted" style={{ fontSize: "var(--fs-body-s)", marginTop: "1.6rem" }}>{tr("how.tl.note")}</p>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="section" id="why">
          <div className="wrap">
            <div className="s-head reveal">
              <span className="eyebrow"><span className="num">05</span> <span>{tr("why.eyebrow")}</span></span>
              <h2 style={{ marginTop: "1.2rem" }}>{tr("why.h2")}</h2>
            </div>
            <div className="why-grid">
              {[
                { icon: <><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" /></> },
                { icon: <><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="12" cy="18" r="2.4" /><path d="M7.5 7.5L11 15.5M16.5 7.5L13 15.5M8 6h8" /></> },
                { icon: <><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></> },
              ].map((c, i) => (
                <article className="card why-card reveal" key={i} style={{ ["--reveal-delay" as string]: `.${i * 8}s` }}>
                  <div className="why-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>{c.icon}</svg></div>
                  <h3>{tr(`why.c${i + 1}.t`)}</h3><p>{tr(`why.c${i + 1}.d`)}</p>
                </article>
              ))}
            </div>
            <div className="reveal" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              <span className="pill">{tr("why.t1")}</span>
              <span className="pill">{tr("why.t2")}</span>
              <span className="pill">{tr("why.t3")}</span>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="section trust" id="trust">
          <div className="wrap">
            <div className="s-head reveal">
              <span className="eyebrow"><span className="num">06</span> <span>{tr("trust.eyebrow")}</span></span>
              <h2 style={{ marginTop: "1.2rem" }}>{tr("trust.h2")}</h2>
            </div>
            <div className="trust-grid">
              {[1, 2, 3].map((n) => (
                <article className="card trust-card reveal" key={n} style={{ ["--reveal-delay" as string]: `.${(n - 1) * 8}s` }}>
                  <span className="t-kicker">{tr(`trust.k${n}`)}</span>
                  <h4>{tr(`trust.c${n}.t`)}</h4>
                  <p>{tr(`trust.c${n}.d`)}</p>
                </article>
              ))}
            </div>
            <p className="trust-empty-note muted">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.6}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
              <span>{tr("trust.note")}</span>
            </p>
          </div>
        </section>

        {/* CONTACT WIZARD */}
        <section className="section" id="contact">
          <div className="wrap">
            <div className="contact-shell reveal">
              <aside className="contact-aside">
                <div>
                  <span className="eyebrow" style={{ color: "rgba(239,235,226,0.6)" }}><span className="num">07</span> <span>{tr("contact.eyebrow")}</span></span>
                  <h2 style={{ marginTop: "1rem" }}>{tr("contact.h2")}</h2>
                  <p className="lede" style={{ marginTop: "0.9rem" }}>{tr("contact.lede")}</p>
                </div>
                <div className="wizard-steps">
                  {["contact.ws1", "contact.ws2", "contact.ws3", "contact.ws4"].map((k, i) => (
                    <div className={"ws-item" + (!done && i === step ? " is-active" : "") + (done || i < step ? " is-done" : "")} key={k}>
                      <span className="ws-dot">{i + 1}</span><span>{tr(k)}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
                <div className="form-progress"><span className="form-progress__fill" style={{ width: progress + "%" }} /></div>

                {!done && (
                  <>
                    <div className={"fstep" + (step === 0 ? " is-active" : "")}>
                      <h3 className="fstep__q">{tr("contact.q1")}</h3>
                      <p className="fstep__hint">{tr("contact.q1h")}</p>
                      <label className="field-label" htmlFor="country">{tr("contact.country")}</label>
                      <input className="field" id="country" ref={countryRef} type="text" placeholder={tr("contact.countryph")}
                        value={country} onChange={(e) => { setCountry(e.target.value); setErr(null); }} style={err === "country" ? errStyle : undefined} />
                    </div>

                    <div className={"fstep" + (step === 1 ? " is-active" : "")}>
                      <h3 className="fstep__q">{tr("contact.q2")}</h3>
                      <p className="fstep__hint">{tr("contact.q2h")}</p>
                      <div className="choices">
                        {SERVICE_OPTIONS.map((o) => {
                          const sel = services.includes(o.id);
                          return (
                            <button type="button" key={o.id} className={"choice" + (sel ? " is-sel" : "")}
                              onClick={() => { setServices((p) => (sel ? p.filter((x) => x !== o.id) : [...p, o.id])); setErr(null); }}>
                              <span className="ck"><Check /></span><span className="c-label">{tr(o.key)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className={"fstep" + (step === 2 ? " is-active" : "")}>
                      <h3 className="fstep__q">{tr("contact.q3")}</h3>
                      <p className="fstep__hint">{tr("contact.q3h")}</p>
                      <div className="choices">
                        {TIMELINE_OPTIONS.map((o) => (
                          <button type="button" key={o.id} className={"choice is-radio" + (timeline === o.id ? " is-sel" : "")}
                            onClick={() => { setTimeline(o.id); setErr(null); }}>
                            <span className="ck"><Check /></span><span className="c-label">{tr(o.key)}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={"fstep" + (step === 3 ? " is-active" : "")}>
                      <h3 className="fstep__q">{tr("contact.q4")}</h3>
                      <p className="fstep__hint">{tr("contact.q4h")}</p>
                      <div className="field-row">
                        <div>
                          <label className="field-label" htmlFor="name">{tr("contact.name")}</label>
                          <input className="field" id="name" type="text" placeholder={tr("contact.nameph")}
                            value={name} onChange={(e) => { setName(e.target.value); setErr(null); }} style={err === "name" ? errStyle : undefined} />
                        </div>
                        <div>
                          <label className="field-label" htmlFor="email">{tr("contact.email")}</label>
                          <input className="field" id="email" type="email" placeholder={tr("contact.emailph")}
                            value={email} onChange={(e) => { setEmail(e.target.value); setErr(null); }} style={err === "email" ? errStyle : undefined} />
                        </div>
                      </div>
                      {status === "error" && <p className="muted" style={{ color: "var(--accent)", marginTop: "1rem", fontSize: "var(--fs-body-s)" }}>{tr("contact.error")}</p>}
                    </div>

                    <div className="form-nav">
                      <button type="button" className="form-back" hidden={step === 0} onClick={() => { setStep(Math.max(0, step - 1)); setErr(null); }}>
                        <span>←</span> <span>{tr("contact.back")}</span>
                      </button>
                      <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
                        <span>{status === "sending" ? tr("contact.sending") : step === 3 ? tr("contact.send") : tr("contact.next")}</span> <span className="arrow">→</span>
                      </button>
                    </div>
                  </>
                )}

                {done && (
                  <div className="fstep is-active">
                    <div className="form-done">
                      <div className="check-ring"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}><path d="M5 12l5 5L20 6" /></svg></div>
                      <h3 className="fstep__q">{tr("contact.doneT")}</h3>
                      <p className="fstep__hint">{tr("contact.doneD")}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section" id="final">
          <div className="wrap">
            <div className="final-cta reveal">
              <div className="final-glow" aria-hidden="true"></div>
              <span className="eyebrow" style={{ color: "rgba(251,247,238,0.6)", position: "relative" }}>{tr("final.eyebrow")}</span>
              <h2 style={{ marginTop: "1.2rem", position: "relative" }}>{tr("final.h2")}</h2>
              <p className="lede">{tr("final.lede")}</p>
              <div className="hero__cta">
                <a className="btn btn--primary btn--lg" href="#contact">{tr("final.cta1")} <span className="arrow">→</span></a>
                <a className="btn btn--ghost btn--lg" href="#services">{tr("final.cta2")}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer__top">
            <div className="footer__brand">
              <Logo />
              <p>{tr("footer.tag")}</p>
            </div>
            <div className="footer-col">
              <h5>{tr("footer.h1")}</h5>
              <ul>
                <li><a href="#problem">{tr("nav.problem")}</a></li>
                <li><a href="#services">{tr("nav.services")}</a></li>
                <li><a href="#why">{tr("nav.why")}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>{tr("footer.h2")}</h5>
              <ul>
                <li><a href="#how">{tr("nav.how")}</a></li>
                <li><a href="#ai">{tr("footer.ai")}</a></li>
                <li><a href="/blog">{tr("footer.blog")}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>{tr("footer.h3")}</h5>
              <ul>
                <li><a href="#contact">{tr("footer.contact")}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Inteligenci·AR. {tr("footer.rights")}</span>
            <LangMenu open={langFooterOpen} setOpen={setLangFooterOpen} idSuffix="Footer" />
          </div>
        </div>
      </footer>
    </>
  );
}
