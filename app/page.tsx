import LandingClient from "./components/LandingClient";

const CALENDLY = "https://calendly.com/softlanding-ar/15min";

export default function Home() {
  return (
    <>
      <LandingClient />

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
                <a href="#problem">Approach</a>
                <a href="#what">Services</a>
                <a href="#how">Process</a>
                <a href="#why">Why us</a>
              </nav>

              <div className="nav-right">
                <div className="lang" id="lang">
                  <button className="lang-btn" id="langBtn" aria-haspopup="listbox" aria-expanded="false" aria-label="Select language">
                    <span className="lang-flag" id="langFlag">🇺🇸</span>
                    <span className="lang-code" id="langCode">EN</span>
                    <svg className="lang-caret" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="lang-menu liquid-glass" role="listbox" aria-label="Languages">
                    {[
                      { flag: "🇺🇸", code: "EN", label: "English", current: true },
                      { flag: "🇪🇸", code: "ES", label: "Español" },
                      { flag: "🇧🇷", code: "PT", label: "Português" },
                      { flag: "🇩🇪", code: "DE", label: "Deutsch" },
                      { flag: "🇨🇳", code: "ZH", label: "中文" },
                      { flag: "🇯🇵", code: "JA", label: "日本語" },
                    ].map(({ flag, code, label, current }) => (
                      <button key={code} className="lang-item" role="option" data-flag={flag} data-code={code} aria-current={current ? "true" : undefined}>
                        <span className="lang-flag">{flag}</span>
                        <span className="label">{label}</span>
                        <svg className="check" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7.5L6 11L11.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <a className="btn btn-primary btn-sm" href={CALENDLY} target="_blank" rel="noopener">
                  Book a 15-min call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="hero-inner">
          <div className="hero-grid">
            <div>
              <h1 className="h1" id="heading" data-text="Land your\noperation in Argentina." />

              <p className="lead" id="lead">
                One point of contact for entity setup, banking, accounting, and hiring — handled from day one by a team on the ground.
              </p>

              <div className="hero-ctas" id="ctas">
                <a className="btn btn-primary btn-lg" href={CALENDLY} target="_blank" rel="noopener">
                  Book a 15-min call
                  <svg className="arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a className="btn btn-glass btn-lg liquid-glass" href="#what">
                  Explore Now
                </a>
              </div>

              <div className="hero-meta" id="meta">
                <span className="live" aria-hidden="true" />
                <span>Now onboarding pilot clients</span>
                <span className="dot" aria-hidden="true" />
                <span>Buenos Aires · Mendoza · Neuquén</span>
              </div>
            </div>

            <div className="hero-tag-col" id="tagCol">
              <div className="hero-tag liquid-glass">
                <b>Entity.</b><span className="sep">·</span><b>Banking.</b><span className="sep">·</span><b>Hiring.</b>
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
              <div className="section-label reveal">01 — The problem</div>
              <p className="problem-body reveal reveal-d1">
                Operating in Argentina means juggling <em>five different vendors</em> before you can issue a single invoice — entity setup, banking, accountants, payroll, and compliance. Each on its own timeline, in its own language.
              </p>
            </div>
            <div className="frag-grid">
              {[
                { num: "01", name: "Entity setup", vendor: "law firm" },
                { num: "02", name: "Local banking", vendor: "bank relationship" },
                { num: "03", name: "Accounting & tax", vendor: "estudio contable" },
                { num: "04", name: "Hiring & payroll", vendor: "HR consultant" },
              ].map(({ num, name, vendor }, i) => (
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
              <div className="section-label reveal">02 — What we do</div>
              <div>
                <h2 className="h2 reveal reveal-d1">A single point of contact for everything you need on the ground.</h2>
                <p className="body-text reveal reveal-d2" style={{ marginTop: 18 }}>
                  We replace the chain of vendors with one team. You get one project lead, one timeline, one bill — and a clear path from incorporation to your first local hire.
                </p>
              </div>
            </div>

            <div className="features">
              <article className="feature reveal reveal-d1">
                <div className="ic">
                  <svg viewBox="0 0 18 18" fill="none"><path d="M3 7l6-4 6 4v8H3V7z M7 15v-4h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /></svg>
                </div>
                <h3>Entity &amp; legal setup</h3>
                <p>SRL or SA formation, IGJ registration, statutes, CUIT, beneficial-ownership filings. Operating-ready, not just on paper.</p>
              </article>
              <article className="feature reveal reveal-d2">
                <div className="ic">
                  <svg viewBox="0 0 18 18" fill="none"><path d="M2.5 6h13v7h-13z M2.5 8.5h13 M5.5 11h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /></svg>
                </div>
                <h3>Banking &amp; treasury</h3>
                <p>Local ARS and USD accounts with banks that actually answer. FX guidance, cross-border flows, and treasury structuring.</p>
              </article>
              <article className="feature reveal reveal-d3">
                <div className="ic">
                  <svg viewBox="0 0 18 18" fill="none"><path d="M4.5 3h6l2.5 2.5V15h-8.5z M4.5 7.5h8.5 M6.5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /></svg>
                </div>
                <h3>Accounting, tax &amp; compliance</h3>
                <p>Monthly closings, AFIP filings, transfer-pricing reviews, and audit-ready books from month one. No surprises.</p>
              </article>
              <article className="feature reveal reveal-d4">
                <div className="ic">
                  <svg viewBox="0 0 18 18" fill="none"><path d="M6 8a3 3 0 106 0 3 3 0 00-6 0z M3 15.5c0-2.2 2.5-4 6-4s6 1.8 6 4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /></svg>
                </div>
                <h3>Hiring &amp; payroll</h3>
                <p>Employer of Record for early hires, then transition to your own entity. Compliant contracts, payroll, benefits, onboarding.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="block" id="how">
          <div className="wrap">
            <div className="block-head">
              <div className="section-label reveal">03 — How it works</div>
              <h2 className="h2 reveal reveal-d1">Three steps. No theatrics.</h2>
            </div>
            <div className="steps">
              <article className="step reveal reveal-d1">
                <span className="step-num">1</span>
                <h3>Discovery call</h3>
                <p>A 15-minute conversation to map your operation: timeline, headcount plan, sector specifics, and how funds will move in and out. You leave with a clear scope and price.</p>
                <div className="step-meta">15 minutes</div>
              </article>
              <article className="step reveal reveal-d2">
                <span className="step-num">2</span>
                <h3>We assemble your stack</h3>
                <p>Legal, banking, accounting, and HR — coordinated by one project lead at Landar. You approve milestones; we handle execution and paperwork.</p>
                <div className="step-meta">~ 30 to 60 days</div>
              </article>
              <article className="step reveal reveal-d3">
                <span className="step-num">3</span>
                <h3>You operate</h3>
                <p>Hire, pay, invoice, and report through a single contact and a shared dashboard. We stay on as your operating partner for as long as it makes sense.</p>
                <div className="step-meta">Ongoing</div>
              </article>
            </div>
          </div>
        </section>

        {/* ===== WHY US ===== */}
        <section className="block" id="why">
          <div className="wrap">
            <div className="block-head">
              <div className="section-label reveal">04 — Why us</div>
              <h2 className="h2 reveal reveal-d1">Built on operating infrastructure — not slide decks.</h2>
            </div>
            <div className="why">
              <div className="reveal reveal-d2">
                <div className="why-card">
                  <span className="pill"><i />On the ground in Argentina</span>
                  <h3>Operating teams already in market.</h3>
                  <p>We work with legal, banking, accounting, and HR teams across Buenos Aires, Mendoza, and Neuquén — the same partners used by foreign operators already in country. You inherit the relationships, not the cold-outreach roadmap.</p>
                  <div className="why-facts">
                    <div className="why-fact"><div className="k">1</div><div className="l">Project lead — every workstream, one accountable contact.</div></div>
                    <div className="why-fact"><div className="k">3</div><div className="l">Operating regions across Buenos Aires, Mendoza &amp; Neuquén.</div></div>
                    <div className="why-fact"><div className="k">45<span className="small">d</span></div><div className="l">Typical time from kickoff to operating-ready entity.</div></div>
                    <div className="why-fact"><div className="k">EN<span className="small"> / ES</span></div><div className="l">Bilingual delivery — no friction between HQ and local teams.</div></div>
                  </div>
                </div>
              </div>

              <div className="reveal reveal-d3">
                <p className="body-text" style={{ margin: "0 0 18px" }}>Built for the operations actually moving into Argentina right now:</p>
                <ul className="sectors">
                  <li>
                    <span className="tag">Energy</span>
                    <span className="desc"><b>Lithium, renewables, and Vaca Muerta</b> <span>— entity structures designed for project finance, JVs, and long-cycle capex.</span></span>
                  </li>
                  <li>
                    <span className="tag">Tech</span>
                    <span className="desc"><b>Nearshoring teams</b> <span>— fast EOR hiring while we stand up your local entity, then a clean transition.</span></span>
                  </li>
                  <li>
                    <span className="tag">Regional</span>
                    <span className="desc"><b>LATAM HQs &amp; expansion</b> <span>— use Argentina as a base for engineering, shared services, or regional sales.</span></span>
                  </li>
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
              <div className="section-label">05 — Get started</div>
              <h2>Ready to land in Argentina?</h2>
              <p>A 15-minute call. No pitch deck, no obligation. You leave with a clear scope, timeline, and price — or with a useful map of what setting up in Argentina actually takes.</p>
              <div className="hero-ctas">
                <a className="btn btn-primary btn-lg" href={CALENDLY} target="_blank" rel="noopener">
                  Book a 15-min call
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
              <span>Landar · Operating partner for foreign companies in Argentina</span>
            </div>
            <div className="foot-right">© 2026 · Buenos Aires, AR</div>
          </div>
        </footer>

      </main>
    </>
  );
}
