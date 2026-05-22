"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { t, Lang } from "../translations";

const LANGS: { flag: string; code: Lang; label: string }[] = [
  { flag: "🇺🇸", code: "EN", label: "English" },
  { flag: "🇪🇸", code: "ES", label: "Español" },
  { flag: "🇧🇷", code: "PT", label: "Português" },
  { flag: "🇩🇪", code: "DE", label: "Deutsch" },
  { flag: "🇨🇳", code: "ZH", label: "中文" },
  { flag: "🇯🇵", code: "JA", label: "日本語" },
];

const FORM_COUNTRIES = [
  "United States", "Germany", "United Kingdom", "France", "Spain",
  "Italy", "Netherlands", "Switzerland", "Sweden", "Norway", "Denmark",
  "Canada", "Australia", "Japan", "China", "South Korea", "Singapore",
  "Brazil", "Mexico", "Colombia", "Chile", "Other",
];
const FORM_SERVICES = ["Entity setup", "Banking", "Hiring & payroll", "Full setup"];

const ICONS = {
  entity: (
    <svg viewBox="0 0 18 18" fill="none"><path d="M3 7l6-4 6 4v8H3V7z M7 15v-4h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /></svg>
  ),
  banking: (
    <svg viewBox="0 0 18 18" fill="none"><path d="M2.5 6h13v7h-13z M2.5 8.5h13 M5.5 11h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /></svg>
  ),
  accounting: (
    <svg viewBox="0 0 18 18" fill="none"><path d="M4.5 3h6l2.5 2.5V15h-8.5z M4.5 7.5h8.5 M6.5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /></svg>
  ),
  hiring: (
    <svg viewBox="0 0 18 18" fill="none"><path d="M6 8a3 3 0 106 0 3 3 0 00-6 0z M3 15.5c0-2.2 2.5-4 6-4s6 1.8 6 4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /></svg>
  ),
};

function animateHeading(el: HTMLElement, text: string) {
  const lines = text.split("\n");
  const charDelay = 30;
  const initialDelay = 100;
  el.innerHTML = "";
  el.classList.remove("animate");
  let globalCharIdx = 0;
  lines.forEach((line) => {
    const lineEl = document.createElement("span");
    lineEl.style.display = "block";
    const words = line.split(" ");
    words.forEach((word, wordIdx) => {
      const wordEl = document.createElement("span");
      const isLast = wordIdx === words.length - 1;
      wordEl.style.cssText = `display:inline-block; white-space:nowrap;${isLast ? "" : " margin-right:0.28em;"}`;
      [...word].forEach((ch) => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch;
        span.style.transitionDelay = (initialDelay + globalCharIdx * charDelay) + "ms";
        globalCharIdx++;
        wordEl.appendChild(span);
      });
      lineEl.appendChild(wordEl);
    });
    el.appendChild(lineEl);
  });
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("animate")));
}

const sectorIcons: Record<string, React.ReactNode> = {
  oil: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V10l8-7 8 7v11"/><path d="M9 21v-6h6v6"/><circle cx="12" cy="11" r="1.5"/></svg>,
  energy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  mining: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="m6 20 6-16 6 16"/><path d="M8 13h8"/></svg>,
  agro: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 12C5 7 8 4 12 4c4 0 7 3 7 8"/><path d="M5 12c0-3 2-5 4-5"/><path d="M19 12c0-3-2-5-4-5"/></svg>,
  tech: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m8 21 4-4 4 4"/><path d="M12 17v4"/></svg>,
  infra: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4h6v4"/><path d="M9 11h6"/></svg>,
  pharma: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16.5 9.4-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></svg>,
  media: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 10 4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.894L15 14"/><rect x="2" y="6" width="13" height="12" rx="2"/></svg>,
  fintech: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M7 15h.01M11 15h2"/></svg>,
  retail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
};

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("EN");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pickerRef = useRef<HTMLDivElement>(null);
  const tr = t[lang];

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next === "light" ? "light" : "");
  };

  // Form state
  const [formStep, setFormStep] = useState(1);
  const [formCountry, setFormCountry] = useState("");
  const [formServices, setFormServices] = useState<string[]>([]);
  const [formTimeline, setFormTimeline] = useState("");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  // Faro hover
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xdajgyzo", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          country: formCountry,
          services: formServices.join(", "),
          timeline: formTimeline,
          name: formName,
          email: formEmail,
        }),
      });
      setFormStatus(res.ok ? "done" : "error");
    } catch {
      setFormStatus("error");
    }
  }

  // Close picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Hero slideshow
  const slides = [
    { src: "/bg/iguazu-boat.png",        caption: "Cataratas del Iguazú" },
    { src: "/bg/perito-moreno.png",      caption: "Glaciar Perito Moreno · Patagonia" },
    { src: "/bg/fitzroy-pink.png",       caption: "Monte Fitz Roy · Patagonia" },
    { src: "/bg/iguazu-rainbow.png",     caption: "Cataratas del Iguazú" },
    { src: "/bg/fitzroy-road.png",       caption: "Ruta Patagónica" },
    { src: "/bg/obelisco.jpg",         caption: "Obelisco · Buenos Aires" },
    { src: "/bg/puerto-madero.jpg",    caption: "Puerto Madero · Buenos Aires" },
    { src: "/bg/paneles-solares.jpg",  caption: "Energías Renovables · Argentina" },
    { src: "/bg/iguazu-falls.jpg",     caption: "Cataratas del Iguazú" },
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(i => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Slow video (legacy — kept for fallback)
  useEffect(() => {
    const v = document.querySelector<HTMLVideoElement>(".bg-video");
    if (!v) return;
    const setRate = () => { try { v.playbackRate = 0.5; } catch (_) {} };
    setRate();
    v.addEventListener("loadedmetadata", setRate);
    v.addEventListener("play", setRate);
  }, []);

  // Heading animation — re-runs when language changes
  useEffect(() => {
    const el = document.getElementById("heading");
    if (!el) return;
    animateHeading(el, tr.hero.heading);
    const t1 = setTimeout(() => document.getElementById("lead")?.classList.add("in"), 600);
    const t2 = setTimeout(() => document.getElementById("ctas")?.classList.add("in"), 900);
    const t3 = setTimeout(() => document.getElementById("tagCol")?.classList.add("in"), 1100);
    const t4 = setTimeout(() => document.getElementById("meta")?.classList.add("in"), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [lang, tr.hero.heading]);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [lang]);

  // Sticky nav
  useEffect(() => {
    const shell = document.getElementById("navShell");
    if (!shell) return;
    const heroEl = document.querySelector<HTMLElement>(".hero");
    const onScroll = () => {
      const heroBottom = (heroEl?.offsetHeight ?? 0) - 120;
      shell.classList.toggle("fixed", window.scrollY > heroBottom);
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  const currentLang = LANGS.find((l) => l.code === lang)!;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" id="top">
        <div className="bg" aria-hidden="true">
          {slides.map((s, i) => (
            <div key={s.src} className={`slide${i === slideIndex ? " active" : ""}`}>
              <Image
                src={s.src}
                alt={s.caption}
                fill
                priority={i === 0}
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center 40%" }}
              />
            </div>
          ))}
          <div className="slide-caption">{slides[slideIndex].caption}</div>
        </div>

        {/* NAV */}
        <div className="nav-shell" id="navShell">
          <div className="wrap">
            <div className="nav liquid-glass">
              <a className="brand" href="#top" aria-label="Landar">
                <span className="brand-mark" aria-hidden="true" />
                <span>Land<span className="dim">·AR</span></span>
              </a>

              <nav className="nav-links" aria-label="Primary">
                <a href="#problem">{tr.nav.approach}</a>
                <a href="#what">{tr.nav.services}</a>
                <a href="#how">{tr.nav.process}</a>
                <a href="#why">{tr.nav.why}</a>
              </nav>

              <div className="nav-right">
                <button className="theme-btn" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
                  {theme === "dark"
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  }
                </button>
                <div className={`lang${pickerOpen ? " open" : ""}`} ref={pickerRef}>
                  <button
                    className="lang-btn"
                    aria-haspopup="listbox"
                    aria-expanded={pickerOpen}
                    aria-label="Select language"
                    onClick={(e) => { e.stopPropagation(); setPickerOpen((o) => !o); }}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{opacity:0.7}}>
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/>
                      <ellipse cx="7" cy="7" rx="2.8" ry="6" stroke="currentColor" strokeWidth="1.3"/>
                      <line x1="1.2" y1="5" x2="12.8" y2="5" stroke="currentColor" strokeWidth="1.3"/>
                      <line x1="1.2" y1="9" x2="12.8" y2="9" stroke="currentColor" strokeWidth="1.3"/>
                    </svg>
                    <span className="lang-code">{currentLang.code}</span>
                    <svg className="lang-caret" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="lang-menu liquid-glass" role="listbox" aria-label="Languages">
                    {LANGS.map(({ code, label }) => (
                      <button
                        key={code}
                        className="lang-item"
                        role="option"
                        aria-current={code === lang ? "true" : undefined}
                        onClick={() => { setLang(code); setPickerOpen(false); }}
                      >
                        <span className="lang-code-pill">{code}</span>
                        <span className="label">{label}</span>
                        <svg className="check" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7.5L6 11L11.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <a className="btn btn-primary btn-sm" href={tr.calendly} target="_blank" rel="noopener">
                  {tr.nav.cta}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="hero-inner">
          <div className="hero-grid">
            <div>
              <h1 className="h1" id="heading" />

              <p className="lead" id="lead">{tr.hero.lead}</p>

              <div className="hero-ctas" id="ctas">
                <a className="btn btn-primary btn-lg" href={tr.calendly} target="_blank" rel="noopener">
                  {tr.hero.ctaPrimary}
                  <svg className="arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a className="btn btn-glass btn-lg liquid-glass" href="#what">
                  {tr.hero.ctaSecondary}
                </a>
              </div>

              <div className="hero-meta" id="meta">
                <span className="live" aria-hidden="true" />
                <span>{tr.hero.badge}</span>
                <span className="dot" aria-hidden="true" />
                <span>{tr.hero.locations}</span>
              </div>
            </div>

            <div className="hero-tag-col" id="tagCol">
              <div className="hero-tag liquid-glass">
                {tr.hero.tag.map((word, i) => (
                  <span key={i}>
                    {i > 0 && <span className="sep">·</span>}
                    <b>{word}</b>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="body">

        {/* ===== PROBLEM ===== */}
        <section className="block" id="problem">
          <div className="wrap">
            <div className="block-head">
              <div className="section-label reveal">{tr.problem.label}</div>
              <p className="problem-body reveal reveal-d1" dangerouslySetInnerHTML={{ __html: tr.problem.body }} />
            </div>
            <div className="frag-grid">
              {tr.problem.frags.map(({ num, name, vendor }, i) => (
                <div key={num} className={`frag reveal reveal-d${i + 1}`}>
                  <span className="num">{num}</span>
                  <div>
                    <div className="name">{name}</div>
                    <div className="vendor">{vendor}</div>
                    <div className="pulse-x" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHAT WE DO ===== */}
        <section className="block" id="what">
          <div className="wrap">
            <div className="block-head">
              <div className="section-label reveal">{tr.what.label}</div>
              <div>
                <h2 className="h2 reveal reveal-d1">{tr.what.h2}</h2>
                <p className="body-text reveal reveal-d2" style={{ marginTop: 18 }}>{tr.what.body}</p>
              </div>
            </div>
            <div className="features">
              {[ICONS.entity, ICONS.banking, ICONS.accounting, ICONS.hiring].map((icon, i) => (
                <article key={i} className={`feature reveal reveal-d${i + 1}`}>
                  <div className="ic">{icon}</div>
                  <h3>{tr.what.features[i].title}</h3>
                  <p>{tr.what.features[i].desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== EL FARO ===== */}
        <section className="block faro-section" id="faro">
          <div className="wrap">
            <div className="faro-intro">
              <div className="section-label" style={{ marginBottom: 16 }}>{tr.faro.label}</div>
              <h2 className="h2" style={{ marginBottom: 12 }}>{tr.faro.h2.split("\n").map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}</h2>
              <p className="body-text" style={{ marginBottom: 40 }}>{tr.faro.body}</p>
            </div>
            <div className="faro-grid">

              {/* Lighthouse SVG */}
              <div className="faro-left">
                <svg viewBox="0 0 160 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="faro-svg" aria-hidden="true">
                  {/* Light beam cones */}
                  <path d="M108 62 L160 18 L160 108 Z" fill="rgba(116,172,223,0.07)" className="faro-beam" />
                  <path d="M108 62 L160 36 L160 90 Z" fill="rgba(116,172,223,0.10)" className="faro-beam2" />

                  {/* Dome cap */}
                  <path d="M52 98 Q80 68 108 98" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />

                  {/* Lantern glow */}
                  <circle cx="80" cy="84" r="18" fill="rgba(116,172,223,0.12)" className="faro-glow" />
                  <circle cx="80" cy="84" r="9" fill="rgba(116,172,223,0.6)" />
                  <circle cx="80" cy="84" r="4" fill="#fff" />

                  {/* Lantern room (Section 4 — Full setup / Compliance) */}
                  <rect x="52" y="98" width="56" height="62" stroke="rgba(116,172,223,0.65)" strokeWidth="1.5" fill="rgba(116,172,223,0.04)" />
                  <line x1="69" y1="98" x2="69" y2="160" stroke="rgba(116,172,223,0.25)" strokeWidth="0.8" />
                  <line x1="80" y1="98" x2="80" y2="160" stroke="rgba(116,172,223,0.25)" strokeWidth="0.8" />
                  <line x1="91" y1="98" x2="91" y2="160" stroke="rgba(116,172,223,0.25)" strokeWidth="0.8" />
                  <line x1="52" y1="129" x2="108" y2="129" stroke="rgba(116,172,223,0.2)" strokeWidth="0.8" />
                  {/* dot + connector */}
                  <circle cx="108" cy="129" r="3.5" fill="#74ACDF" />
                  <line x1="108" y1="129" x2="160" y2="129" stroke="rgba(116,172,223,0.35)" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Gallery ledge */}
                  <rect x="42" y="160" width="76" height="11" stroke="rgba(255,255,255,0.32)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />

                  {/* Section 3 — Hiring & payroll */}
                  <path d="M46 171 L114 171 L118 252 L42 252 Z" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                  <rect x="72" y="197" width="16" height="20" rx="8" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="none" />
                  <line x1="47" y1="212" x2="113" y2="212" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                  {/* dot + connector */}
                  <circle cx="116" cy="211" r="3" fill="rgba(255,255,255,0.5)" />
                  <line x1="116" y1="211" x2="160" y2="211" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Section 2 — Banking & treasury */}
                  <path d="M42 252 L118 252 L124 334 L36 334 Z" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
                  <rect x="70" y="278" width="20" height="22" rx="10" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="none" />
                  <line x1="43" y1="293" x2="117" y2="293" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                  {/* dot + connector */}
                  <circle cx="121" cy="293" r="3" fill="rgba(255,255,255,0.5)" />
                  <line x1="121" y1="293" x2="160" y2="293" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Section 1 — Entity & legal setup */}
                  <path d="M36 334 L124 334 L130 408 L30 408 Z" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" fill="rgba(255,255,255,0.025)" />
                  <rect x="70" y="368" width="20" height="32" rx="2" stroke="rgba(255,255,255,0.28)" strokeWidth="1" fill="rgba(255,255,255,0.04)" />
                  <rect x="55" y="348" width="13" height="14" rx="2" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="none" />
                  <rect x="92" y="348" width="13" height="14" rx="2" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="none" />
                  <line x1="37" y1="371" x2="123" y2="371" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                  {/* dot + connector */}
                  <circle cx="127" cy="371" r="3" fill="rgba(255,255,255,0.5)" />
                  <line x1="127" y1="371" x2="160" y2="371" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Foundation */}
                  <path d="M30 408 L130 408 L140 440 L20 440 Z" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />

                  {/* Ground */}
                  <line x1="0" y1="440" x2="160" y2="440" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
                  <line x1="0" y1="445" x2="160" y2="445" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                  {/* Hover beams — light ray from lantern to active section dot */}
                  {([
                    { dx: 108, dy: 129 },
                    { dx: 116, dy: 211 },
                    { dx: 121, dy: 293 },
                    { dx: 127, dy: 371 },
                  ] as { dx: number; dy: number }[]).map(({ dx, dy }, i) => (
                    <g key={`beam-${i}`} style={{ opacity: hoveredItem === i ? 1 : 0, transition: "opacity 0.22s ease" }} aria-hidden="true" pointerEvents="none">
                      <line x1="80" y1="84" x2={dx} y2={dy} stroke="#74ACDF" strokeWidth="14" strokeLinecap="round" opacity="0.06" />
                      <line x1="80" y1="84" x2={dx} y2={dy} stroke="#74ACDF" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
                      <line x1={dx} y1={dy} x2="160" y2={dy} stroke="#74ACDF" strokeWidth="1.2" opacity="0.85" />
                      <circle cx={dx} cy={dy} r="10" fill="rgba(116,172,223,0.18)" />
                      <circle cx={dx} cy={dy} r="4" fill="#74ACDF" />
                    </g>
                  ))}
                </svg>
              </div>

              {/* Service items */}
              <div className="faro-right">
                {tr.what.features.map((feat, i) => {
                  const levels = [371, 293, 211, 129];
                  return (
                    <div
                      key={i}
                      className={`faro-item${hoveredItem === i ? " active" : ""}`}
                      style={{ "--faro-dot-y": `${levels[i]}px` } as React.CSSProperties}
                      onMouseEnter={() => setHoveredItem(i)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="faro-num">0{i + 1}</div>
                      <div>
                        <h3>{feat.title}</h3>
                        <p>{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="block" id="how">
          <div className="wrap">
            <div className="block-head">
              <div className="section-label reveal">{tr.how.label}</div>
              <h2 className="h2 reveal reveal-d1">{tr.how.h2}</h2>
            </div>
            <div className="steps">
              {tr.how.steps.map((step, i) => (
                <article key={i} className={`step reveal reveal-d${i + 1}`}>
                  <span className="step-num">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <div className="step-meta">{step.meta}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY US ===== */}
        <section className="block" id="why">
          <div className="wrap">
            <div className="block-head">
              <div className="section-label reveal">{tr.why.label}</div>
              <h2 className="h2 reveal reveal-d1">{tr.why.h2}</h2>
            </div>
            <div className="why">
              <div className="reveal reveal-d2">
                <div className="why-card">
                  <span className="pill"><i />{tr.why.pill}</span>
                  <h3>{tr.why.cardTitle}</h3>
                  <p>{tr.why.cardBody}</p>
                  <div className="why-facts">
                    {tr.why.facts.map(({ k, l }, i) => (
                      <div key={i} className="why-fact">
                        <div className="k">{k}</div>
                        <div className="l">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="reveal reveal-d3">
                <p className="body-text" style={{ margin: "0 0 24px" }}>{tr.why.sectorsIntro}</p>
                <div className="sectors-grid">
                  {tr.why.sectors.map(({ icon, tag, desc }: { icon: string; tag: string; desc: string }, i: number) => (
                    <div className="sector-card" key={i}>
                      <div className="sector-icon">{sectorIcons[icon]}</div>
                      <div className="sector-tag">{tag}</div>
                      <div className="sector-desc">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section className="block" id="about">
          <div className="wrap">
            <div className="block-head">
              <div className="section-label reveal">{tr.about.label}</div>
              <div />
            </div>
            <div className="about-grid">
              <div>
                <h2 className="h2 reveal">{tr.about.h2.split("\n").map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}</h2>
                <p className="about-body reveal reveal-d1">{tr.about.body}</p>
              </div>
              <div className="about-stats reveal reveal-d2">
                {tr.about.stats.map((s, i) => (
                  <div key={i} className="about-stat">
                    <div className="about-val">{s.val}</div>
                    <div className="about-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT FORM ===== */}
        <section className="block" id="contact">
          <div className="wrap">
            <div className="section-label reveal" style={{ marginBottom: 40 }}>{tr.contact.label}</div>
            <div className="contact-layout">
              <div className="contact-intro reveal reveal-d1">
                <h2 className="h2">{tr.contact.h2.split("\n").map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}</h2>
                <p>{tr.contact.body}</p>
                <div className="contact-reassurance">
                  {tr.contact.reassurance.map((text, i) => (
                    <div key={i} className="contact-reassurance-item">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
                        <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="contact-wrap reveal reveal-d2">
              <div className="wizard">
                <div className="wizard-progress">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className={`wizard-bar${formStep >= s || formStatus === "done" ? " done" : ""}`} />
                  ))}
                </div>

                {formStatus === "done" ? (
                  <div className="wizard-success">
                    <div className="check-circle">
                      <svg viewBox="0 0 20 20" fill="none" width="22" height="22" aria-hidden="true">
                        <path d="M4 10l5 5 7-7" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3>{tr.contact.successTitle}</h3>
                    <p>{tr.contact.successBody}</p>
                  </div>
                ) : (
                  <>
                    {formStep === 1 && (
                      <div className="wizard-step">
                        <div className="wiz-label">{tr.contact.step1Label}</div>
                        <h3 className="wiz-question">{tr.contact.step1Q}</h3>
                        <div className="field">
                          <select
                            className="country-select"
                            value={formCountry}
                            onChange={(e) => setFormCountry(e.target.value)}
                          >
                            <option value="">{tr.contact.selectPlaceholder}</option>
                            {FORM_COUNTRIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <div style={{ marginTop: 32 }}>
                          <div className="wiz-label" style={{ marginBottom: 12 }}>{tr.contact.step1b}</div>
                          <div className="service-pills">
                            {FORM_SERVICES.map((s) => (
                              <button
                                key={s}
                                type="button"
                                className={`service-pill${formServices.includes(s) ? " selected" : ""}`}
                                onClick={() =>
                                  setFormServices((prev) =>
                                    prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                                  )
                                }
                              >
                                <span className="check-dot" aria-hidden="true" />
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="wizard-nav" style={{ justifyContent: "flex-end" }}>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            disabled={!formCountry || formServices.length === 0}
                            style={{ opacity: !formCountry || formServices.length === 0 ? 0.38 : 1 }}
                            onClick={() => setFormStep(2)}
                          >
                            {tr.contact.continue}
                          </button>
                        </div>
                      </div>
                    )}

                    {formStep === 2 && (
                      <div className="wizard-step">
                        <div className="wiz-label">{tr.contact.step2Label}</div>
                        <h3 className="wiz-question">{tr.contact.step2Q}</h3>
                        <div className="timeline-pills">
                          {tr.contact.timelines.map(({ label, val }) => (
                            <button
                              key={val}
                              type="button"
                              className={`timeline-pill${formTimeline === val ? " selected" : ""}`}
                              onClick={() => setFormTimeline(val)}
                            >
                              <span>{label}</span>
                              {formTimeline === val && (
                                <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                                  <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                        <div className="wizard-nav">
                          <button type="button" className="wizard-back" onClick={() => setFormStep(1)}>{tr.contact.back}</button>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            disabled={!formTimeline}
                            style={{ opacity: !formTimeline ? 0.38 : 1 }}
                            onClick={() => setFormStep(3)}
                          >
                            {tr.contact.continue}
                          </button>
                        </div>
                      </div>
                    )}

                    {formStep === 3 && (
                      <form className="wizard-step" onSubmit={handleFormSubmit}>
                        <div className="wiz-label">{tr.contact.step3Label}</div>
                        <h3 className="wiz-question">{tr.contact.step3Q}</h3>
                        <div className="field-group">
                          <div className="field">
                            <label htmlFor="wf-name">{tr.contact.nameLabel}</label>
                            <input
                              id="wf-name"
                              type="text"
                              placeholder={tr.contact.namePlaceholder}
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="field">
                            <label htmlFor="wf-email">{tr.contact.emailLabel}</label>
                            <input
                              id="wf-email"
                              type="email"
                              placeholder={tr.contact.emailPlaceholder}
                              value={formEmail}
                              onChange={(e) => setFormEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="wizard-nav">
                          <button type="button" className="wizard-back" onClick={() => setFormStep(2)}>{tr.contact.back}</button>
                          <button type="submit" className="btn btn-primary btn-sm" disabled={formStatus === "sending"}>
                            {formStatus === "sending" ? tr.contact.sending : tr.contact.send}
                          </button>
                        </div>
                        {formStatus === "error" && (
                          <p style={{ color: "#F87171", fontSize: 13, marginTop: 14, textAlign: "center" }}>
                            {tr.contact.errorMsg}
                          </p>
                        )}
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <div className="final-wrap">
          <section className="final reveal">
            <div className="final-bg" aria-hidden="true" />
            <div className="final-content">
              <div className="section-label">{tr.cta.label}</div>
              <h2>{tr.cta.h2}</h2>
              <p>{tr.cta.body}</p>
              <div className="hero-ctas">
                <a className="btn btn-primary btn-lg" href={tr.calendly} target="_blank" rel="noopener">
                  {tr.cta.ctaPrimary}
                  <svg className="arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a className="btn btn-glass btn-lg liquid-glass" href="mailto:hello@landar.com">
                  hello@landar.com
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* ===== FOOTER ===== */}
        <footer>
          <div className="wrap foot-row">
            <div className="foot-left">
              <span className="brand-mark" aria-hidden="true" />
              <span>{tr.footer.tagline}</span>
            </div>
            <div className="foot-right">{tr.footer.copy}</div>
          </div>
        </footer>

      </main>
    </>
  );
}
