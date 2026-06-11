"use client";

import { useState, useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
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
  // Trust: oculto hasta tener casos reales (decisión David, jun 2026)
  const SHOW_TRUST: boolean = false;

  // nav
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState("");
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
  const aiFired = useRef(false);

  // boot language from storage + keep <html lang> in sync
  useEffect(() => {
    try {
      const s = localStorage.getItem("landar.lang") as Lang | null;
      if (s && s !== lang && LANGS.some((l) => l.code === s)) setLang(s);
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

  // scrollspy — highlight the nav link of the section near the viewport centre
  useEffect(() => {
    const ids = ["problem", "services", "how", "why", "ai"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // fire once when the AI readiness self-check reaches 100%
  useEffect(() => {
    if (aiScore >= 100 && !aiFired.current) { aiFired.current = true; track("ai_ready"); }
  }, [aiScore]);

  // close dropdowns on outside click / escape.
  // NOTE: ignore clicks that originate inside a .lang menu — React 19 delegates
  // its synthetic events on `document`, so e.stopPropagation() in JSX can't stop
  // this sibling native listener; without the closest() guard the menu would
  // open and close on the very same click (the "languages don't work" bug).
  useEffect(() => {
    const close = () => { setLangOpen(false); setLangFooterOpen(false); };
    const onDocClick = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(".lang")) return;
      close();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onDocClick); document.removeEventListener("keydown", onKey); };
  }, []);

  // scroll reveal + timeline (IntersectionObserver-driven — fires reliably no
  // matter how an element enters the viewport: scroll, anchor jump, resize or
  // programmatic. No scroll listener → lighter main thread. Content is visible
  // by default; JS only arms below-the-fold nodes, which then animate in.)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const vh = () => window.innerHeight || document.documentElement.clientHeight;

    function animateTimeline() {
      const fill = document.getElementById("trackFill");
      const nodes = document.querySelectorAll("#track .tnode");
      if (fill) requestAnimationFrame(() => { (fill as HTMLElement).style.width = "100%"; });
      nodes.forEach((n, i) => setTimeout(() => n.classList.add("is-on"), reduce ? 0 : 220 + i * 260));
    }
    function trigger(el: HTMLElement) {
      el.classList.remove("is-armed");
      if (el.id === "timeline") animateTimeline();
    }

    // Above-the-fold content shows immediately; only arm what's below it.
    const armed: HTMLElement[] = [];
    reveals.forEach((el) => {
      if (!reduce && el.getBoundingClientRect().top >= vh() * 0.9) {
        el.classList.add("is-armed");
        armed.push(el);
      } else {
        trigger(el);
      }
    });
    if (!armed.length) return;
    if (reduce || !("IntersectionObserver" in window)) { armed.forEach(trigger); return; }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { trigger(e.target as HTMLElement); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );
    armed.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // EL FARO — "El Faro del Fin del Mundo": a lighthouse beam sweeps the relief
  // map and lights each export commodity. Ported from the FARO export (vanilla
  // → effect). Values in DATA are indicative until wired to a real source.
  useEffect(() => {
    const scene = document.getElementById("scene");
    const map = document.getElementById("map");
    const beam = document.getElementById("beam");
    const halo = document.getElementById("halo");
    const light = document.getElementById("lhLight");
    const panel = document.getElementById("panel");
    const trackA = document.getElementById("trackA");
    const trackB = document.getElementById("trackB");
    const tfEl = document.getElementById("tf");
    if (!scene || !map || !beam || !halo || !light || !panel || !trackA || !trackB || !tfEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Row = { commodity: string; city: string; x: number; y: number; index?: boolean; tf: number[]; icon: string };
    // commodity → province, coords as % of the map, % change per timeframe [1D,1W,1M,1Y,3Y]
    const DATA: Row[] = [
      { commodity: "MERVAL",           city: "Buenos Aires · the index",       x: 53, y: 37, index: true, tf: [0.4, 1.8, 4.2, 31, 156], icon: "M3 17l5-5 4 3 6-8M21 7h-4M21 7v4" },
      { commodity: "Oil & Gas",        city: "Neuquén · Vaca Muerta",          x: 43, y: 50, tf: [0.6, 2.1, 5.4, 28, 142], icon: "M7 21V9l5-6 5 6v12M10 21v-5h4v5" },
      { commodity: "Lithium",          city: "Jujuy & Salta · the triangle",   x: 47, y: 18, tf: [-0.4, -1.8, -3.2, -9, -46], icon: "M12 2l3 6 6 .8-4.5 4.2 1.2 6.2L12 22l-5.9 3.2 1.2-6.2L2.8 8.8 9 8z" },
      { commodity: "Copper & Gold",    city: "San Juan · the Andes",           x: 44, y: 39, tf: [0.3, 1.2, 4.1, 23, 71], icon: "M12 3l8 5v8l-8 5-8-5V8z" },
      { commodity: "Grain & Beef",     city: "The Pampas · Buenos Aires",      x: 49, y: 40, tf: [0.2, 0.8, 2.4, 7, 19], icon: "M12 2c-3 4-3 8 0 12 3-4 3-8 0-12zM6 14c-1 4 1 7 6 8 5-1 7-4 6-8-3 2-9 2-12 0z" },
      { commodity: "Wine",             city: "Mendoza · Cuyo",                 x: 44, y: 45, tf: [-0.1, 0.3, -0.8, -2, 11], icon: "M8 3h8l-1 6a4 4 0 11-6 0zM12 16v4M9 21h6" },
      { commodity: "Fishing",          city: "Mar Argentino · the coast",      x: 44, y: 60, tf: [0.1, -0.4, 1.1, 1, 8], icon: "M3 12c4-5 11-5 15 0-4 5-11 5-15 0zM20 12l1.5-2v4zM8 11.5v1" },
      { commodity: "Solar & Wind",     city: "Patagonia · La Puna",            x: 41, y: 57, tf: [0.7, 2.4, 6.1, 33, 118], icon: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" },
      { commodity: "Lemons & Citrus",  city: "Tucumán · the Northwest",        x: 46, y: 24, tf: [0.5, 1.6, 3.8, 12, 34], icon: "M12 3a9 9 0 109 9A9 9 0 0012 3zM12 3v18M3 12h18" },
      { commodity: "Soy & Grains",     city: "Rosario · Santa Fe",             x: 50, y: 33, tf: [-0.3, 0.6, 1.9, 5, 22], icon: "M12 2c-2 3-2 6 0 9 2-3 2-6 0-9zM12 13c-2 3-2 6 0 9 2-3 2-6 0-9z" },
      { commodity: "Yerba Mate",       city: "Misiones · the Litoral",         x: 64, y: 23, tf: [0.2, 0.5, 1.4, 4, 16], icon: "M7 8h10v8a4 4 0 01-4 4h-2a4 4 0 01-4-4zM12 8V4M16 9h2a2 2 0 010 4h-1" },
      { commodity: "Honey",            city: "Entre Ríos · the Litoral",       x: 55, y: 33, tf: [0.0, -0.2, 0.9, 3, 13], icon: "M12 3s6 6 6 10a6 6 0 11-12 0c0-4 6-10 6-10z" },
      { commodity: "Aluminium & Steel", city: "Puerto Madryn · Chubut",        x: 39, y: 53, tf: [0.4, 1.0, 2.6, 9, 27], icon: "M3 9h18v6H3zM7 9v6M12 9v6M17 9v6" },
    ];
    const TFS = [{ k: 0, l: "1D" }, { k: 1, l: "1W" }, { k: 2, l: "1M" }, { k: 3, l: "1Y" }, { k: 4, l: "3Y" }];
    let tfIdx = 3; // default 1Y

    // animation + interaction state
    let originX = 0, originY = 0;
    let idleMin = 150, idleMax = 210, idleLen = 420, idleT = 0;
    let curA = 180, tgtA = 180, curI = 0.14, tgtI = 0.14, curL = 400, tgtL = 400, lastT = 0;
    let mouseActive = false, manual = false, lastMouseCity = -1, tourI = 0;
    let raf = 0;
    let tourT: ReturnType<typeof setTimeout> | undefined;
    let activeTimers: ReturnType<typeof setTimeout>[] = [];
    let io: IntersectionObserver | undefined;
    const pins: HTMLElement[] = [];

    const trendOf = (v: number) => (v > 1.2 ? "up" : v < -1.2 ? "down" : "flat");
    const arrow = (t: string) => (t === "up" ? "▲" : t === "down" ? "▼" : "▸");
    const fmt = (v: number) => { const a = Math.abs(v); return (v > 0 ? "+" : v < 0 ? "−" : "") + a.toFixed(a < 10 ? 1 : 0) + "%"; };
    const spark = (t: string) => {
      const pts = t === "up" ? "0,12 9,10 18,12 27,6 36,8 44,2"
        : t === "down" ? "0,3 9,6 18,4 27,9 36,7 44,13"
          : "0,8 9,7 18,9 27,7 36,8 44,7";
      const col = t === "up" ? "#5BBA84" : t === "down" ? "#E0604D" : "#E6AC4B";
      return '<svg class="spark" viewBox="0 0 44 15" preserveAspectRatio="none" fill="none">'
        + '<polyline points="' + pts + '" stroke="' + col + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    };

    function aim(pin: HTMLElement) {
      const m = map!.getBoundingClientRect(), r = pin.getBoundingClientRect();
      const tx = r.left + r.width / 2 - m.left, ty = r.top + r.height / 2 - m.top;
      const dx = tx - originX, dy = ty - originY;
      let ang = Math.atan2(dy, dx) * 180 / Math.PI; if (ang < 0) ang += 360;
      return { ang, len: Math.hypot(dx, dy) };
    }
    function measure() {
      const m = map!.getBoundingClientRect(), l = light!.getBoundingClientRect();
      originX = l.left + l.width / 2 - m.left; originY = l.top + l.height / 2 - m.top;
      beam!.style.left = originX + "px"; beam!.style.top = originY + "px";
      beam!.style.marginTop = (-beam!.offsetHeight / 2) + "px"; // center the cone apex on the lantern
      halo!.style.left = originX + "px"; halo!.style.top = originY + "px";
      if (pins.length) {
        const a0 = aim(pins[0]), a1 = aim(pins[pins.length - 1]);
        idleMin = Math.min(a0.ang, a1.ang); idleMax = Math.max(a0.ang, a1.ang); idleLen = (a0.len + a1.len) / 2;
      }
    }
    function render() {
      beam!.style.transform = "rotate(" + curA.toFixed(2) + "deg)";
      beam!.style.width = curL.toFixed(1) + "px";
      beam!.style.setProperty("--i", curI.toFixed(3));
      halo!.style.opacity = (0.17 + 0.72 * curI).toFixed(3);
      halo!.style.transform = "scale(" + (0.66 + 0.8 * curI).toFixed(3) + ")";
    }
    function frame(now: number) {
      if (!lastT) lastT = now; const dt = Math.min(64, now - lastT); lastT = now;
      if (!manual && !mouseActive) {
        idleT += dt;
        const k = (Math.sin(idleT * 0.0003) + 1) / 2; // very slow sweep
        tgtA = idleMin + (idleMax - idleMin) * k; tgtI = 0.12; tgtL = idleLen;
      }
      const ea = manual ? 0.085 : mouseActive ? 0.12 : 0.038;
      const diff = ((tgtA - curA + 540) % 360) - 180; // shortest path
      curA += diff * ea; curL += (tgtL - curL) * 0.07; curI += (tgtI - curI) * 0.06;
      render(); raf = requestAnimationFrame(frame);
    }
    function lightCity(i: number, strong: boolean, delay?: number) {
      measure();
      const a = aim(pins[i]);
      tgtA = a.ang; tgtL = a.len + map!.getBoundingClientRect().width * 0.02;
      panel!.classList.add("focusing");
      pins.forEach((p) => p.classList.remove("lit"));
      scene!.querySelectorAll(".comm").forEach((c) => c.classList.remove("is-on"));
      scene!.querySelectorAll('.comm[data-i="' + i + '"]').forEach((c) => c.classList.add("is-on"));
      beam!.classList.remove("locked");
      tgtI = 0.5;
      const rad = a.ang * Math.PI / 180, pull = strong ? 11 : 8;
      pins.forEach((p) => { p.style.setProperty("--pull-x", "0px"); p.style.setProperty("--pull-y", "0px"); });
      activeTimers.forEach((t) => clearTimeout(t)); activeTimers = [];
      activeTimers.push(setTimeout(() => {
        beam!.classList.add("locked"); tgtI = strong ? 1.35 : 0.86;
        pins[i].classList.add("lit");
        pins[i].style.setProperty("--pull-x", (-Math.cos(rad) * pull).toFixed(1) + "px");
        pins[i].style.setProperty("--pull-y", (-Math.sin(rad) * pull).toFixed(1) + "px");
      }, reduce ? 0 : (delay == null ? 200 : delay)));
    }
    function tourStep() {
      if (manual || mouseActive) return;
      lightCity(tourI, false);
      tourI = (tourI + 1) % DATA.length;
      tourT = setTimeout(tourStep, 3600);
    }
    function scheduleTour(delay: number) { clearTimeout(tourT); tourT = setTimeout(tourStep, delay); }

    function applyTF() {
      DATA.forEach((d, i) => {
        const v = d.tf[TFS[tfIdx].k], tr2 = trendOf(v), lbl = TFS[tfIdx].l;
        scene!.querySelectorAll('.comm[data-i="' + i + '"]').forEach((card) => {
          const ytd = card.querySelector(".comm__ytd") as HTMLElement | null;
          if (ytd) { ytd.className = "comm__ytd trend--" + tr2; ytd.innerHTML = '<i class="cur">US$</i><i class="arr">' + arrow(tr2) + "</i>" + fmt(v); }
          const sp = card.querySelector(".comm__spark") as HTMLElement | null;
          if (sp) sp.innerHTML = spark(tr2);
        });
        const cy = pins[i].querySelector(".chip .ytd") as HTMLElement | null;
        if (cy) { cy.className = "ytd trend--" + tr2; cy.textContent = arrow(tr2) + " " + fmt(v) + " US$ · " + lbl; }
      });
    }

    function makeCard(d: Row, i: number) {
      const b = document.createElement("button");
      b.className = "comm"; b.type = "button"; b.setAttribute("data-i", String(i));
      if (d.index) b.classList.add("is-index");
      b.innerHTML =
        '<span class="comm__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="' + d.icon + '"/></svg></span>' +
        '<span class="comm__main"><span class="comm__t">' + d.commodity + '</span><span class="comm__ytd"></span></span>' +
        '<span class="comm__sub"><span class="comm__s">' + d.city + '</span><span class="comm__spark"></span></span>';
      b.addEventListener("pointerenter", () => { manual = true; clearTimeout(tourT); lightCity(i, true); });
      b.addEventListener("pointerleave", () => { manual = false; scheduleTour(900); });
      return b;
    }

    DATA.forEach((d, i) => {
      const pin = document.createElement("div");
      pin.className = "pin"; pin.style.left = d.x + "%"; pin.style.top = d.y + "%";
      pin.innerHTML =
        '<div class="pin__stalk"></div><div class="pin__base"></div>' +
        '<div class="pin__glow"></div><div class="pin__ring"></div><div class="pin__dot"></div>' +
        '<div class="chip"><b>' + d.commodity + '</b><span class="ytd"></span></div>';
      map.appendChild(pin); pins.push(pin);
    });

    const half = Math.ceil(DATA.length / 2);
    const fill = (track: HTMLElement, from: number, to: number) => {
      for (let pass = 0; pass < 2; pass++) { for (let i = from; i < to; i++) track.appendChild(makeCard(DATA[i], i)); }
    };
    fill(trackA, 0, half);
    fill(trackB, half, DATA.length);
    applyTF();

    function onTf(e: Event) {
      const b = (e.target as HTMLElement).closest("button[data-tf]"); if (!b) return;
      tfIdx = parseInt(b.getAttribute("data-tf") || "0", 10);
      tfEl!.querySelectorAll("button").forEach((x) => {
        const on = x === b;
        x.classList.toggle("is-sel", on);
        x.setAttribute("aria-pressed", String(on));
      });
      applyTF();
    }
    tfEl.addEventListener("click", onTf);

    function onPointerMove(e: PointerEvent) {
      if (manual) return;
      const py = panel!.getBoundingClientRect().top;
      if (e.clientY > py - 6) { if (mouseActive) { mouseActive = false; lastMouseCity = -1; scheduleTour(700); } return; }
      const m = map!.getBoundingClientRect();
      const mx = e.clientX - m.left, my = e.clientY - m.top;
      if (!mouseActive) { mouseActive = true; clearTimeout(tourT); }
      let best = -1, bd = 1e18;
      for (let i = 0; i < pins.length; i++) {
        const pr = pins[i].getBoundingClientRect();
        const ddx = (pr.left + pr.width / 2 - m.left) - mx, ddy = (pr.top + pr.height / 2 - m.top) - my;
        const dd = ddx * ddx + ddy * ddy; if (dd < bd) { bd = dd; best = i; }
      }
      if (best >= 0 && best !== lastMouseCity) { lastMouseCity = best; lightCity(best, true, 40); }
    }
    function onSceneLeave() { mouseActive = false; lastMouseCity = -1; scheduleTour(800); }
    function onResize() { measure(); }

    function boot() {
      measure(); curA = tgtA = 180; render();
      raf = requestAnimationFrame(frame);
      scene!.addEventListener("pointermove", onPointerMove);
      scene!.addEventListener("pointerleave", onSceneLeave);
      if (reduce) {
        tgtI = 0.55; curI = 0.55; pins.forEach((p) => p.classList.add("lit"));
        const a = aim(pins[0]); curA = tgtA = a.ang; curL = tgtL = a.len; render(); return;
      }
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver((es) => {
          es.forEach((entry) => { if (entry.isIntersecting) { scheduleTour(700); io!.disconnect(); } });
        }, { threshold: 0.35 });
        io.observe(scene!);
      } else scheduleTour(700);
    }

    window.addEventListener("resize", onResize);
    const img = map.querySelector(".map__img") as HTMLImageElement | null;
    const start = () => boot();
    if (img && img.complete && img.naturalWidth) start();
    else if (img) { img.addEventListener("load", start); img.addEventListener("error", start); }
    else start();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tourT);
      activeTimers.forEach((t) => clearTimeout(t));
      window.removeEventListener("resize", onResize);
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerleave", onSceneLeave);
      tfEl.removeEventListener("click", onTf);
      if (io) io.disconnect();
      if (img) { img.removeEventListener("load", start); img.removeEventListener("error", start); }
      pins.forEach((p) => p.remove());
      trackA.innerHTML = ""; trackB.innerHTML = "";
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

    let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0, moved = false;
    const down = (e: PointerEvent) => {
      moved = false;
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
      if (Math.abs(e.clientX - sx) > 5 || Math.abs(e.clientY - sy) > 5) moved = true;
      const hr = hero.getBoundingClientRect();
      const nx = clampN(ox + (e.clientX - sx), 0, hr.width - box.offsetWidth);
      const ny = clampN(oy + (e.clientY - sy), 0, hr.height - box.offsetHeight);
      box.style.left = nx + "px"; box.style.top = ny + "px";
    };
    // a clean click (no drag) follows the trade flow into the Export section
    const onClick = () => {
      if (moved) { moved = false; return; }
      document.getElementById("network")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    box.addEventListener("click", onClick);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } };
    box.addEventListener("keydown", onKey);
    return () => {
      box.removeEventListener("pointerdown", down);
      box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerup", end);
      box.removeEventListener("pointercancel", end);
      box.removeEventListener("click", onClick);
      box.removeEventListener("keydown", onKey);
    };
  }, []);

  function chooseLang(l: Lang) { track("lang_change", { lang: l }); setLang(l); setLangOpen(false); setLangFooterOpen(false); }

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
    if (step < 3) { track("wizard_step", { completed: step + 1 }); setStep(step + 1); return; }
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
    if (hs || fs) {
      track("lead_submit", { country: country || "—", timeline: timeline || "—", services: services.join(",") || "—" });
      setDone(true); setStatus("idle");
    } else {
      track("lead_error");
      setStatus("error");
    }
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
        <rect width="26" height="26" rx="7" fill="#14202B" />
        <path d="M5.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#74ACDF" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
        <path d="M20.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#74ACDF" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
        <path d="M13 4.6 Q13 11 13 17.8" fill="none" stroke="#74ACDF" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        <circle cx="13" cy="18" r="2.1" fill="#F6B40E" />
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
            <a href="#problem" className={active === "problem" ? "is-active" : undefined}>{tr("nav.problem")}</a>
            <a href="#services" className={active === "services" ? "is-active" : undefined}>{tr("nav.services")}</a>
            <a href="#how" className={active === "how" ? "is-active" : undefined}>{tr("nav.how")}</a>
            <a href="#why" className={active === "why" ? "is-active" : undefined}>{tr("nav.why")}</a>
            <a href="#ai" className={active === "ai" ? "is-active" : undefined}>{tr("nav.ai")}</a>
            <a href="/oportunidades">{tr("nav.radar")}</a>
          </nav>
          <div className="nav__right">
            <LangMenu open={langOpen} setOpen={setLangOpen} idSuffix="" />
            <a className="btn btn--primary" href="#contact" onClick={() => track("cta_click", { where: "nav" })}>{tr("nav.cta")}</a>
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
          <a href="/oportunidades" onClick={() => setNavOpen(false)}>{tr("nav.radar")}</a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero wrap" id="hero">
          <div className="hero__grid">
            <div className="hero__copy">
              <h1 className="reveal" dangerouslySetInnerHTML={{ __html: tr("hero.h1") }} />
              <p className="hero__sub lede reveal" style={{ ["--reveal-delay" as string]: ".12s" }} dangerouslySetInnerHTML={{ __html: tr("hero.sub") }} />
              <div className="hero__cta reveal" style={{ ["--reveal-delay" as string]: ".18s" }}>
                <a className="btn btn--primary btn--lg" href="#contact" onClick={() => track("cta_click", { where: "hero" })}>{tr("hero.cta1")} <span className="arrow">→</span></a>
                <a className="btn btn--ghost btn--lg" href="#how">{tr("hero.cta2")}</a>
              </div>
              <div className="hero__status reveal" style={{ ["--reveal-delay" as string]: ".24s" }}>
                <span className="pill"><span className="dot"></span><span>{tr("hero.status")}</span></span>
              </div>
            </div>

            <Globe />
          </div>

          {/* Decorative live-trade ticker — a mouse shortcut into the Export
              section (the section itself is reachable by scroll). Hidden from
              AT, so no role/tabindex and no name/content mismatch. */}
          <div className="trade-box is-out" id="tradeBox" aria-hidden="true">
            <span className="tb-grip"><i></i><i></i></span>
            <div className="tb-top">
              <span className="tb-live"><span className="tb-dot"></span>Live · Argentina</span>
              <span className="tb-badge"><span className="tb-arrow" id="tbArrow">↗</span><span id="tbMode">Export</span></span>
            </div>
            <div className="tb-product" id="tbProduct">Oil &amp; gas</div>
            <div className="tb-route" id="tbRoute">Neuquén → world markets</div>
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

        {/* FREEDOM INDEX — proof strip + interlink al radar */}
        <section className="section--tight" id="freedom">
          <div className="wrap">
            <a className="freedom-strip reveal" href="/oportunidades" onClick={() => track("cta_click", { where: "freedom_strip" })}>
              <span className="fstrip__fact"><b>#1</b><span>{tr("freedom.fact")}</span></span>
              <span className="fstrip__cta">{tr("freedom.cta")} <span className="arrow">→</span></span>
            </a>
          </div>
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
                <a className="btn btn--primary" href="#contact" style={{ marginTop: "1.4rem" }} onClick={() => track("cta_click", { where: "ai" })}>{tr("ai.cta")} <span className="arrow">→</span></a>
                <p className="ai-disclaimer">{tr("ai.note")}</p>
              </div>
              <div className={"ai-check" + (aiScore >= 100 ? " is-complete" : "")}>
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

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="wrap">
            <div className="s-head reveal">
              <span className="eyebrow"><span className="num">02</span> <span>{tr("services.eyebrow")}</span></span>
              <h2 style={{ marginTop: "1.2rem" }}>{tr("services.h2")}</h2>
            </div>
            <div className="pillars-v2">
              {[
                { no: "01", d: ".0s" },
                { no: "02", d: ".06s" },
                { no: "03", d: ".12s" },
                { no: "04", d: ".18s" },
              ].map((p, i) => (
                <article className="pcol reveal" key={p.no} style={{ ["--reveal-delay" as string]: p.d }}>
                  <span className="pcol__no">{p.no}</span>
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
              {[{ n: "~45", k: "stats.s1" }, { n: "4 → 1", k: "stats.s2" }, { n: "15+", k: "stats.s3" }, { n: "4", k: "stats.s4" }].map((s, i) => (
                <div className="stat reveal" key={s.k} style={{ ["--reveal-delay" as string]: `.${i * 6}s` }}>
                  <span className="stat__n">{s.n}</span>
                  <span className="stat__l">{tr(s.k)}</span>
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

        {/* EL FARO — El Faro del Fin del Mundo: relief map + sweeping beam */}
        <section className="section" id="faro">
          <div className="wrap">
            <div className="scene reveal" id="scene">
              <div className="map" id="map">
                <img className="map__img" src="/argentina-relief.webp" alt="Relief map of Argentina" width={1280} height={960} loading="lazy" decoding="async" />
                <div className="map__dusk" />
                <div className="geo geo--ar" style={{ left: "45%", top: "33%" }}>
                  <span className="geo__name">Argentina</span>
                  <span className="geo__stick" />
                  <span className="geo__dot" />
                </div>
                <div className="map__tone" />

                <div className="lh__halo" id="halo" aria-hidden="true" />
                <div className="beam" id="beam" aria-hidden="true">
                  <div className="beam__cone" />
                  <div className="beam__src" />
                </div>

                <div className="lh" id="lh" aria-hidden="true">
                  <svg viewBox="0 0 120 210">
                    <defs>
                      <linearGradient id="tw" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#c9bda9" /><stop offset="0.18" stopColor="#f3ede0" />
                        <stop offset="0.5" stopColor="#fffdf8" /><stop offset="0.82" stopColor="#ece5d6" />
                        <stop offset="1" stopColor="#c4b9a4" />
                      </linearGradient>
                      <linearGradient id="bd" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#226092" /><stop offset="0.5" stopColor="#4A93CE" /><stop offset="1" stopColor="#1F5884" />
                      </linearGradient>
                      <radialGradient id="ln" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor="#fff3df" /><stop offset="0.45" stopColor="#ffd9a8" />
                        <stop offset="0.78" stopColor="#E0903C" /><stop offset="1" stopColor="#E0903C" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="60" cy="176" rx="30" ry="4" fill="#000" opacity="0.18" />
                    <path d="M44 160 h32 l6 14 H38 Z" fill="#221e19" />
                    <path d="M50 56 L40 160 H80 L70 56 Z" fill="url(#tw)" />
                    <path d="M56 58 L52 158" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
                    <path d="M47.5 86 H72.5 L73.6 102 H46.4 Z" fill="url(#bd)" />
                    <path d="M44.5 124 H75.5 L76.8 140 H43.2 Z" fill="url(#bd)" />
                    <path d="M46 52 H74 L77 60 H43 Z" fill="#221e19" stroke="rgba(239,235,226,.16)" />
                    <rect x="44" y="44" width="32" height="2" rx="1" fill="rgba(239,235,226,.5)" />
                    <path d="M50 44 V30 Q50 27 53 27 H67 Q70 27 70 30 V44 Z" fill="#1b1813" stroke="rgba(239,235,226,.32)" strokeWidth="1" />
                    <circle id="lhLight" cx="60" cy="36" r="8" fill="url(#ln)" />
                    <circle cx="60" cy="36" r="3.6" fill="#fff1d8" />
                    <rect x="44" y="25" width="32" height="2.6" rx="1.3" fill="#26221c" />
                    <path d="M47 26 Q60 8 73 26 Z" fill="#2a2620" />
                    <circle cx="60" cy="6" r="2.4" fill="#F6B40E" />
                    <rect x="59" y="6" width="2" height="7" fill="#2a2620" />
                  </svg>
                </div>
                {/* city markers injected by the faro effect */}
              </div>

              <div className="title">
                <span className="sc-eyebrow"><span className="num">03</span> {tr("faro.eyebrow")}</span>
                <h2>{tr("faro.h2")}</h2>
              </div>

              <div className="tf" id="tf" role="group" aria-label="Timeframe">
                <button data-tf="0" type="button" aria-pressed={false}>1D</button>
                <button data-tf="1" type="button" aria-pressed={false}>1W</button>
                <button data-tf="2" type="button" aria-pressed={false}>1M</button>
                <button data-tf="3" type="button" className="is-sel" aria-pressed={true}>1Y</button>
                <button data-tf="4" type="button" aria-pressed={false}>3Y</button>
              </div>

              <div className="panel" id="panel">
                <div className="panel__h">{tr("faro.panel")}</div>
                <div className="sc-track sc-track--right"><div className="sc-track__in" id="trackA" /></div>
                <div className="sc-track sc-track--left"><div className="sc-track__in" id="trackB" /></div>
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
            <div className="why-panel reveal">
              <div className="why-cols">
                {[
                  { icon: <><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" /></> },
                  { icon: <><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="12" cy="18" r="2.4" /><path d="M7.5 7.5L11 15.5M16.5 7.5L13 15.5M8 6h8" /></> },
                  { icon: <><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></> },
                ].map((c, i) => (
                  <div className="why-col" key={i}>
                    <div className="why-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>{c.icon}</svg></div>
                    <h3>{tr(`why.c${i + 1}.t`)}</h3>
                    <p>{tr(`why.c${i + 1}.d`)}</p>
                  </div>
                ))}
              </div>
              <div className="why-facts">
                <div className="why-fact">{tr("why.t1")}</div>
                <div className="why-fact">{tr("why.t2")}</div>
                <div className="why-fact">{tr("why.t3")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST — oculto hasta tener casos reales (David, jun 2026) */}
        {SHOW_TRUST && (
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
        )}

        {/* CONTACT WIZARD */}
        <section className="section" id="contact">
          <div className="wrap">
            <div className="contact-shell reveal">
              <aside className="contact-aside">
                <div>
                  <span className="eyebrow" style={{ color: "rgba(239,235,226,0.6)" }}><span className="num">06</span> <span>{tr("contact.eyebrow")}</span></span>
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
              <svg className="sol" viewBox="0 0 64 64" aria-hidden="true" fill="currentColor">
                <g className="rays">
                  <g stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" fill="none">
                    <path d="M32 7 C34 10.5, 30 13, 32 16.5" />
                    <path d="M57 32 C53.5 34, 51 30, 47.5 32" />
                    <path d="M32 57 C30 53.5, 34 51, 32 47.5" />
                    <path d="M7 32 C10.5 30, 13 34, 16.5 32" />
                  </g>
                  <g>
                    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
                      <path d="M32 2 L34.3 14 L29.7 14 Z" transform={`rotate(${deg} 32 32)`} key={deg} />
                    ))}
                  </g>
                  <g stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" fill="none">
                    {[45, 135, 225, 315].map((deg) => (
                      <path d="M32 7 C34 10.5, 30 13, 32 16.5" transform={`rotate(${deg} 32 32)`} key={deg} />
                    ))}
                  </g>
                </g>
                <circle cx="32" cy="32" r="10" />
                <circle cx="32" cy="32" r="6.5" fill="#FFE9B0" />
              </svg>
              <span className="eyebrow" style={{ color: "rgba(251,247,238,0.6)", position: "relative" }}>{tr("final.eyebrow")}</span>
              <h2 style={{ marginTop: "1.2rem", position: "relative" }}>{tr("final.h2")}</h2>
              <p className="lede">{tr("final.lede")}</p>
              <div className="hero__cta">
                <a className="btn btn--primary btn--lg" href="#contact" onClick={() => track("cta_click", { where: "final" })}>{tr("final.cta1")} <span className="arrow">→</span></a>
                <a className="btn btn--ghost btn--lg" href="#services">{tr("final.cta2")}</a>
              </div>
              <p className="final-love">{tr("final.love")}</p>
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
              <h3>{tr("footer.h1")}</h3>
              <ul>
                <li><a href="#problem">{tr("nav.problem")}</a></li>
                <li><a href="#services">{tr("nav.services")}</a></li>
                <li><a href="#why">{tr("nav.why")}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>{tr("footer.h2")}</h3>
              <ul>
                <li><a href="#how">{tr("nav.how")}</a></li>
                <li><a href="#ai">{tr("footer.ai")}</a></li>
                <li><a href="/oportunidades">{tr("footer.radar")}</a></li>
                <li><a href="/blog">{tr("footer.blog")}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>{tr("footer.h3")}</h3>
              <ul>
                <li><a href="#contact">{tr("footer.contact")}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Inteligenci·AR. {tr("footer.rights")} <em className="footer-love">{tr("footer.love")}</em></span>
            <LangMenu open={langFooterOpen} setOpen={setLangFooterOpen} idSuffix="Footer" />
          </div>
        </div>
      </footer>
    </>
  );
}
