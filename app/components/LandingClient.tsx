"use client";

import { useEffect } from "react";

export default function LandingClient() {
  useEffect(() => {
    // Slow video
    const v = document.querySelector<HTMLVideoElement>(".bg-video");
    if (v) {
      const setRate = () => { try { v.playbackRate = 0.5; } catch (_) {} };
      setRate();
      v.addEventListener("loadedmetadata", setRate);
      v.addEventListener("play", setRate);
    }

    // Character animation
    const el = document.getElementById("heading");
    if (el) {
      const text = el.dataset.text?.replace(/\\n/g, "\n") ?? "";
      const lines = text.split("\n");
      const charDelay = 30;
      const initialDelay = 200;
      el.innerHTML = "";
      lines.forEach((line, lineIdx) => {
        const lineEl = document.createElement("span");
        lineEl.style.display = "block";
        [...line].forEach((ch, charIdx) => {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = ch === " " ? " " : ch;
          const delay = initialDelay + lineIdx * line.length * charDelay + charIdx * charDelay;
          span.style.transitionDelay = delay + "ms";
          lineEl.appendChild(span);
        });
        el.appendChild(lineEl);
      });
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("animate")));
      setTimeout(() => document.getElementById("lead")?.classList.add("in"), 800);
      setTimeout(() => document.getElementById("ctas")?.classList.add("in"), 1200);
      setTimeout(() => document.getElementById("tagCol")?.classList.add("in"), 1400);
      setTimeout(() => document.getElementById("meta")?.classList.add("in"), 1600);
    }

    // Language picker
    const lang = document.getElementById("lang");
    const langBtn = document.getElementById("langBtn");
    const langFlag = document.getElementById("langFlag");
    const langCode = document.getElementById("langCode");
    if (lang && langBtn && langFlag && langCode) {
      const toggle = (e: Event) => {
        e.stopPropagation();
        const open = lang.classList.toggle("open");
        langBtn.setAttribute("aria-expanded", String(open));
      };
      langBtn.addEventListener("click", toggle);
      document.addEventListener("click", (e) => {
        if (!lang.contains(e.target as Node)) {
          lang.classList.remove("open");
          langBtn.setAttribute("aria-expanded", "false");
        }
      });
      lang.querySelectorAll<HTMLButtonElement>(".lang-item").forEach((item) => {
        item.addEventListener("click", () => {
          langFlag.textContent = item.dataset.flag ?? "";
          langCode.textContent = item.dataset.code ?? "";
          lang.querySelectorAll(".lang-item").forEach((i) => i.removeAttribute("aria-current"));
          item.setAttribute("aria-current", "true");
          lang.classList.remove("open");
          langBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Sticky nav
    const shell = document.getElementById("navShell");
    if (shell) {
      const heroEl = document.querySelector<HTMLElement>(".hero");
      const onScroll = () => {
        const heroBottom = (heroEl?.offsetHeight ?? 0) - 120;
        shell.classList.toggle("fixed", window.scrollY > heroBottom);
      };
      document.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => document.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    // Scroll reveal
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return null;
}
