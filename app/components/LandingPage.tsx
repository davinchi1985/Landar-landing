"use client";

import { useState, useEffect, useRef } from "react";
import { t, Lang } from "../translations";

const LANGS: { flag: string; code: Lang; label: string }[] = [
  { flag: "🇺🇸", code: "EN", label: "English" },
  { flag: "🇪🇸", code: "ES", label: "Español" },
  { flag: "🇧🇷", code: "PT", label: "Português" },
  { flag: "🇩🇪", code: "DE", label: "Deutsch" },
  { flag: "🇨🇳", code: "ZH", label: "中文" },
  { flag: "🇯🇵", code: "JA", label: "日本語" },
];

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

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("EN");
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const tr = t[lang];

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

  // Slow video
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
          <video className="bg-video" autoPlay loop muted playsInline preload="auto" poster="/bg/perito-moreno.png">
            <source src="/patagonia.mp4" type="video/mp4" />
          </video>
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
                <div className="lang" ref={pickerRef}>
                  <button
                    className="lang-btn"
                    aria-haspopup="listbox"
                    aria-expanded={pickerOpen}
                    aria-label="Select language"
                    onClick={(e) => { e.stopPropagation(); setPickerOpen((o) => !o); }}
                  >
                    <span className="lang-flag">{currentLang.flag}</span>
                    <span className="lang-code">{currentLang.code}</span>
                    <svg className="lang-caret" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {pickerOpen && (
                    <div className="lang-menu liquid-glass" role="listbox" aria-label="Languages">
                      {LANGS.map(({ flag, code, label }) => (
                        <button
                          key={code}
                          className="lang-item"
                          role="option"
                          aria-current={code === lang ? "true" : undefined}
                          onClick={() => { setLang(code); setPickerOpen(false); }}
                        >
                          <span className="lang-flag">{flag}</span>
                          <span className="label">{label}</span>
                          {code === lang && (
                            <svg className="check" viewBox="0 0 14 14" fill="none">
                              <path d="M2.5 7.5L6 11L11.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
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
                <p className="body-text" style={{ margin: "0 0 18px" }}>{tr.why.sectorsIntro}</p>
                <ul className="sectors">
                  {tr.why.sectors.map(({ tag, bold, rest }, i) => (
                    <li key={i}>
                      <span className="tag">{tag}</span>
                      <span className="desc"><b>{bold}</b><span>{rest}</span></span>
                    </li>
                  ))}
                </ul>
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
