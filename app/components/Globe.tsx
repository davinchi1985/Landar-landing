"use client";

/* ============================================================
   Inteligenci·AR — living globe (ported from the design handoff
   globe.js). A dense land point-cloud projected orthographically
   and spun in 3D; Argentina front-and-centre; coral great-circle
   arcs to its trade-partner network. Static frame on mobile /
   reduced-motion. Uses d3-geo + topojson-client (npm).
   ============================================================ */

import { useEffect, useRef } from "react";
import { geoEquirectangular, geoPath, geoContains, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Globe() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const caption = captionRef.current;
    if (!stage || !canvas) return;

    const DEG = Math.PI / 180;
    const BA = { name: "Buenos Aires", lng: -58.3816, lat: -34.6037 };

    const DESTS = [
      { name: "Buenos Aires", lng: -58.3816, lat: -34.6037 },
      { name: "Neuquén", lng: -68.0591, lat: -38.9516 },
      { name: "Córdoba", lng: -64.1888, lat: -31.4201 },
      { name: "Mendoza", lng: -68.8458, lat: -32.8895 },
      { name: "Rosario", lng: -60.6393, lat: -32.9468 },
      { name: "Salta", lng: -65.4117, lat: -24.7821 },
    ];

    const FLOWS = [
      { mode: "OUT", product: "Oil & gas", route: "Neuquén → world markets", p: 1 },
      { mode: "IN", product: "Capital & trade", route: "global investors → Buenos Aires", p: 0 },
      { mode: "OUT", product: "Beef", route: "Pampas → 50+ markets", p: 4 },
      { mode: "OUT", product: "Lithium", route: "Salta → battery supply chains", p: 5 },
      { mode: "IN", product: "Tech & industry", route: "foreign capital → Córdoba", p: 2 },
      { mode: "OUT", product: "Grain & soy", route: "Rosario → global trade", p: 4 },
      { mode: "OUT", product: "Wine", route: "Mendoza → tables worldwide", p: 3 },
      { mode: "IN", product: "Manufacturing", route: "investment → Neuquén", p: 1 },
    ];

    const CITIES = [
      { name: "São Paulo", lng: -46.6333, lat: -23.5505 },
      { name: "Montevideo", lng: -56.1645, lat: -34.9011 },
      { name: "Asunción", lng: -57.5759, lat: -25.2637 },
      { name: "Santiago", lng: -70.6483, lat: -33.4489 },
      { name: "La Paz", lng: -68.1193, lat: -16.4897 },
      { name: "Lima", lng: -77.0428, lat: -12.0464 },
      { name: "Bogotá", lng: -74.0721, lat: 4.711 },
      { name: "Mexico City", lng: -99.1332, lat: 19.4326 },
      { name: "New York", lng: -74.006, lat: 40.7128 },
      { name: "Madrid", lng: -3.7038, lat: 40.4168 },
      { name: "Cairo", lng: 31.2357, lat: 30.0444 },
      { name: "Tel Aviv", lng: 34.7818, lat: 32.0853 },
      { name: "Johannesburg", lng: 28.0473, lat: -26.2041 },
      { name: "New Delhi", lng: 77.209, lat: 28.6139 },
      { name: "Singapore", lng: 103.8198, lat: 1.3521 },
    ];

    const SATS = [
      { incl: 0.55, node: 0.4, radius: 1.12, speed: 0.22, phase: 0.0 },
      { incl: -0.62, node: 2.1, radius: 1.17, speed: 0.17, phase: 2.2 },
      { incl: 0.16, node: 4.0, radius: 1.09, speed: 0.27, phase: 4.1 },
    ];

    const TILT0 = -0.4;
    const PHI0 = -BA.lng * DEG;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = 0, R = 0, cx = 0, cy = 0;
    let landFeature: any = null, landPts: any[] = [], arcs: any[] = [];
    let argFeature: any = null, argRings: any[] = [];
    let phi = PHI0, tiltCur = TILT0, targetTilt = TILT0;
    const SPIN_IDLE = (Math.PI * 2) / 46;
    let introDone = false, introT = 0;
    const INTRO_DUR = 8.5;
    const IK0 = { p: -0.3, t: 0.2 };
    const IK1 = { p: 1.55, t: -0.08 };
    const IK2 = { p: PHI0, t: TILT0 };
    let ignite = 0, ringPulses: any[] = [], argCentroid: any = null, activeP = 0;
    let ct = Math.cos(TILT0), st = Math.sin(TILT0), cp = Math.cos(PHI0), sp = Math.sin(PHI0);
    let raf: number | null = null, lastT = 0, accentCache: any = null, accentFrame = -1, frameId = 0;
    let dragging = false, lastX = 0, lastY = 0, lastMoveT = 0, interactive = false;
    let started = false, disposed = false;

    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    const easeFn = (t: number) => t * t * (3 - 2 * t);
    const lerpA = (a: number, b: number, t: number) => a + (b - a) * t;
    const unit = (lng: number, lat: number) => {
      const la = lat * DEG, lo = lng * DEG, cl = Math.cos(la);
      return { x: cl * Math.sin(lo), y: Math.sin(la), z: cl * Math.cos(lo) } as any;
    };

    function accentRGB(frame: number) {
      if (frame === accentFrame && accentCache) return accentCache;
      const cs = getComputedStyle(document.documentElement);
      accentCache = {
        r: +cs.getPropertyValue("--accent-r") || 201,
        g: +cs.getPropertyValue("--accent-g") || 97,
        b: +cs.getPropertyValue("--accent-b") || 61,
      };
      accentFrame = frame;
      return accentCache;
    }

    function slerpArc(a: any, b: any, n: number) {
      const va = unit(a.lng, a.lat), vb = unit(b.lng, b.lat);
      const dot = clamp(va.x * vb.x + va.y * vb.y + va.z * vb.z, -1, 1);
      const om = Math.acos(dot), so = Math.sin(om) || 1e-6, pts = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n, k0 = Math.sin((1 - t) * om) / so, k1 = Math.sin(t * om) / so;
        const x = k0 * va.x + k1 * vb.x, y = k0 * va.y + k1 * vb.y, z = k0 * va.z + k1 * vb.z;
        const m = Math.hypot(x, y, z) || 1;
        pts.push({ x: x / m, y: y / m, z: z / m });
      }
      return pts;
    }
    function buildArcs() {
      const pool: number[] = [];
      for (let r = 0; r < 3; r++) for (let d = 0; d < DESTS.length; d++) pool.push(d);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        const tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
      }
      arcs = CITIES.map((c, k) => {
        const di = pool[k % pool.length], dst = DESTS[di];
        const dir = di === 0 || di === 2 ? "in" : "out";
        const pts = slerpArc(c, dst, 64);
        return { pts, from: c, dest: dst, di, dir, destU: unit(dst.lng, dst.lat) };
      });
    }

    function buildLand() {
      landPts = [];
      if (!landFeature) return;
      const W = 2048, H = 1024, off = document.createElement("canvas");
      off.width = W; off.height = H;
      const oc = off.getContext("2d")!;
      const proj = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]);
      const p = geoPath(proj as any, oc);
      oc.beginPath(); p(landFeature); oc.fillStyle = "#000"; oc.fill();
      const data = oc.getImageData(0, 0, W, H).data;
      function isLand(px: number, py: number) {
        px = (px + W) % W; if (py < 0) py = 0; if (py >= H) py = H - 1;
        return data[(py * W + px) * 4 + 3] > 90;
      }
      const dLat = 0.85; let row = 0;
      for (let lat = -82; lat <= 84; lat += dLat, row++) {
        const clat = Math.max(Math.cos(lat * DEG), 0.12), dLng = dLat / clat;
        const phase = (row % 2) * dLng * 0.5;
        for (let lng = -180 + phase; lng < 180; lng += dLng) {
          const px = (((lng + 180) / 360) * W) | 0, py = (((90 - lat) / 180) * H) | 0;
          if (!isLand(px, py)) continue;
          const step = Math.max(1, Math.round((dLng / 360) * W));
          const coast = !isLand(px + step, py) || !isLand(px - step, py) || !isLand(px, py - 1) || !isLand(px, py + 1);
          const u = unit(lng, lat); u.coast = coast;
          u.arg = argFeature ? geoContains(argFeature, [lng, lat]) : false;
          landPts.push(u);
        }
      }
    }

    function setPhi(ph: number) { cp = Math.cos(ph); sp = Math.sin(ph); }
    function rot(v: any) {
      const x1 = v.x * cp + v.z * sp, z1 = -v.x * sp + v.z * cp, y1 = v.y;
      return { x: x1, y: y1 * ct - z1 * st, z: y1 * st + z1 * ct };
    }

    function draw(frame: number) {
      const a = accentRGB(frame);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      const halo = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.16);
      halo.addColorStop(0, "rgba(42,111,168,0.10)"); halo.addColorStop(0.5, "rgba(42,111,168,0.045)"); halo.addColorStop(1, "rgba(42,111,168,0)");
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R * 1.16, 0, Math.PI * 2); ctx.fill();

      const body = ctx.createRadialGradient(cx - R * 0.34, cy - R * 0.38, R * 0.04, cx + R * 0.18, cy + R * 0.22, R * 1.12);
      body.addColorStop(0, "#FFFEFA"); body.addColorStop(0.45, "#F5F2E9"); body.addColorStop(0.82, "#E7E2D3"); body.addColorStop(1, "#D7D1BF");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = body; ctx.fill();

      if (landPts.length) {
        const dotBase = (size / 560) * 0.95;
        const LX = -0.48, LY = 0.52, LZ = 0.71;
        for (let i = 0; i < landPts.length; i++) {
          const rp = rot(landPts[i]);
          if (rp.z <= 0.012) continue;
          const sx = cx + rp.x * R, sy = cy - rp.y * R;
          let b = rp.x * LX + rp.y * LY + rp.z * LZ;
          b = b < 0 ? 0 : b;
          const lit = 0.32 + 0.68 * b;
          const edgeFade = rp.z < 0.12 ? rp.z / 0.12 : 1;
          if (landPts[i].arg) {
            ctx.globalAlpha = Math.min(1, (0.6 + 0.4 * lit) * edgeFade * (1 + ignite * 0.5));
            ctx.fillStyle = "rgb(" + a.r + "," + a.g + "," + a.b + ")";
            ctx.beginPath(); ctx.arc(sx, sy, dotBase * (0.85 + 0.5 * b) * (1 + ignite * 0.35), 0, Math.PI * 2); ctx.fill();
          } else if (landPts[i].coast) {
            ctx.globalAlpha = (0.5 + 0.5 * lit) * edgeFade;
            ctx.fillStyle = "rgb(96,78,58)";
            ctx.beginPath(); ctx.arc(sx, sy, dotBase * (0.6 + 0.5 * b), 0, Math.PI * 2); ctx.fill();
          } else {
            ctx.globalAlpha = (0.18 + 0.72 * lit) * edgeFade;
            ctx.fillStyle = "rgb(132,112,86)";
            ctx.beginPath(); ctx.arc(sx, sy, dotBase * (0.42 + 0.45 * b), 0, Math.PI * 2); ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      const shade = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R);
      shade.addColorStop(0, "rgba(28,27,23,0)"); shade.addColorStop(0.82, "rgba(28,27,23,0)"); shade.addColorStop(1, "rgba(28,27,23,0.10)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = shade; ctx.fill();

      drawArgentina(a);
      drawArcs(a); drawMarkers(a, frame);

      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.lineWidth = 1; ctx.strokeStyle = "rgba(28,27,23,0.12)"; ctx.stroke();

      drawSatellites(a, frame);
    }

    function drawArgentina(a: any) {
      if (!argRings.length) return;
      const cen = argCentroid ? rot(argCentroid) : null;
      const front = cen && cen.z > 0.12;
      function tracePath() {
        for (let r = 0; r < argRings.length; r++) {
          const ring = argRings[r]; let drawing = false;
          for (let i = 0; i < ring.length; i++) {
            const rp = rot(ring[i]);
            if (rp.z <= 0.015) { drawing = false; continue; }
            const sx = cx + rp.x * R, sy = cy - rp.y * R;
            if (!drawing) { ctx.moveTo(sx, sy); drawing = true; } else ctx.lineTo(sx, sy);
          }
        }
      }
      if (front && ignite > 0.01) {
        ctx.save();
        ctx.beginPath(); tracePath();
        ctx.globalAlpha = 0.32 * ignite;
        ctx.fillStyle = "rgb(" + a.r + "," + a.g + "," + a.b + ")";
        ctx.fill();
        ctx.restore();
      }
      ctx.lineWidth = Math.max(1.1, (size / 560) * 1.5); ctx.lineJoin = "round"; ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(" + a.r + "," + a.g + "," + a.b + "," + (0.72 + 0.28 * ignite) + ")";
      ctx.beginPath(); tracePath(); ctx.stroke();
    }

    function drawArcs(a: any) {
      const lw = Math.max(1, (size / 560) * 1.25);
      ctx.lineCap = "round";
      const NEAR = 0.26, FAR = 0.62;
      arcs.forEach((arc) => {
        const du = arc.destU, pts: any[] = []; let visCount = 0;
        for (let i = 0; i < arc.pts.length; i++) {
          const v = arc.pts[i], rp = rot(v);
          const ok = rp.z > 0.02;
          let al = 0;
          if (ok) {
            const ang = Math.acos(clamp(v.x * du.x + v.y * du.y + v.z * du.z, -1, 1));
            al = ang <= NEAR ? 0 : ang >= FAR ? 1 : (ang - NEAR) / (FAR - NEAR);
          }
          pts.push({ x: cx + rp.x * R, y: cy - rp.y * R, v: ok, a: al });
          if (ok && al > 0.05) visCount++;
        }
        if (visCount < 6) return;
        ctx.lineWidth = lw;
        for (let i = 1; i < pts.length; i++) {
          if (!pts[i - 1].v || !pts[i].v) continue;
          const alpha = 0.42 * Math.min(pts[i - 1].a, pts[i].a);
          if (alpha <= 0.012) continue;
          ctx.strokeStyle = "rgba(" + a.r + "," + a.g + "," + a.b + "," + alpha.toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x, pts[i].y);
          ctx.stroke();
        }
      });
    }

    function drawMarkers(a: any, frame: number) {
      const t = frame / 60;
      ignite *= 0.94;
      arcs.forEach((arc, k) => {
        const f = (t * 0.16 + k * 0.09) % 1;
        const u = arc.dir === "out" ? 1 - f : f;
        const n = arc.pts.length - 1, fi = u * n, i0 = fi | 0, fr = fi - i0;
        const p0 = arc.pts[i0], p1 = arc.pts[Math.min(i0 + 1, n)];
        const pv = rot({ x: p0.x + (p1.x - p0.x) * fr, y: p0.y + (p1.y - p0.y) * fr, z: p0.z + (p1.z - p0.z) * fr });
        if (pv.z <= 0.02) return;
        const sx = cx + pv.x * R, sy = cy - pv.y * R, fade = Math.sin(Math.PI * f);
        ctx.globalAlpha = 0.8 * fade;
        ctx.fillStyle = "rgb(" + a.r + "," + a.g + "," + a.b + ")";
        ctx.beginPath(); ctx.arc(sx, sy, Math.max(1.5, (size / 560) * 2.1), 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      });

      for (let ri = ringPulses.length - 1; ri >= 0; ri--) {
        const rp2 = ringPulses[ri], age = (frame - rp2.f) / 64;
        if (age >= 1) { ringPulses.splice(ri, 1); continue; }
        const dv = rot(unit(rp2.d.lng, rp2.d.lat));
        if (dv.z <= 0.02) continue;
        const dx = cx + dv.x * R, dy = cy - dv.y * R;
        ctx.globalAlpha = (1 - age) * 0.55 * Math.min(1, dv.z * 2);
        ctx.lineWidth = Math.max(1, (size / 560) * 1.4);
        ctx.strokeStyle = "rgb(" + a.r + "," + a.g + "," + a.b + ")";
        ctx.beginPath(); ctx.arc(dx, dy, (size / 560) * (4 + age * 40), 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }

      CITIES.forEach((c, k) => {
        const rp = rot(unit(c.lng, c.lat));
        if (rp.z <= 0.02) return;
        const sx = cx + rp.x * R, sy = cy - rp.y * R;
        const mr = Math.max(1.4, (size / 560) * 1.9) * (0.85 + 0.15 * Math.sin(frame * 0.08 + k));
        ctx.beginPath(); ctx.arc(sx, sy, mr, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + a.r + "," + a.g + "," + a.b + "," + (0.4 + 0.4 * rp.z) + ")"; ctx.fill();
      });

      DESTS.forEach((d, k) => {
        const rp = rot(unit(d.lng, d.lat));
        if (rp.z <= 0.02) return;
        const sx = cx + rp.x * R, sy = cy - rp.y * R;
        const active = k === activeP;
        if (active || ignite > 0.02) {
          const gl = ctx.createRadialGradient(sx, sy, 0, sx, sy, (size / 560) * 22);
          gl.addColorStop(0, "rgba(" + a.r + "," + a.g + "," + a.b + "," + ((active ? 0.4 : 0.2) + 0.35 * ignite) + ")");
          gl.addColorStop(1, "rgba(" + a.r + "," + a.g + "," + a.b + ",0)");
          ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(sx, sy, (size / 560) * 22, 0, Math.PI * 2); ctx.fill();
        }
        const mr = Math.max(1.8, (size / 560) * (active ? 3.2 : 2.3)) * (0.92 + 0.08 * Math.sin(frame * 0.07 + k));
        ctx.beginPath(); ctx.arc(sx, sy, mr, 0, Math.PI * 2);
        ctx.fillStyle = "rgb(" + a.r + "," + a.g + "," + a.b + ")"; ctx.fill();
        ctx.beginPath(); ctx.arc(sx, sy, mr, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.7)"; ctx.lineWidth = 1; ctx.stroke();
      });

      const cc = argCentroid ? rot(argCentroid) : null;
      if (cc && cc.z > 0.1) positionCaption(cx + cc.x * R, cy - cc.y * R, Math.min(1, cc.z * 2.4));
      else positionCaption(0, 0, 0);
    }

    function positionCaption(sx: number, sy: number, op: number) {
      if (!caption || !stage) return;
      const rect = stage.getBoundingClientRect();
      caption.style.opacity = op.toFixed(2);
      if (op <= 0) return;
      caption.style.left = clamp(sx + 14, 8, rect.width - 150) + "px";
      caption.style.top = clamp(sy + 12, 8, rect.height - 44) + "px";
    }

    function tick(now: number) {
      if (disposed) return;
      if (!lastT) lastT = now;
      const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;

      if (!dragging) {
        if (!introDone) {
          introT += dt;
          const u = introT / INTRO_DUR;
          if (u >= 1) { introDone = true; phi = IK2.p; targetTilt = IK2.t; }
          else {
            const mid = 0.62; let ph, ti;
            if (u < mid) { const l = easeFn(u / mid); ph = lerpA(IK0.p, IK1.p, l); ti = lerpA(IK0.t, IK1.t, l); }
            else { const l2 = easeFn((u - mid) / (1 - mid)); ph = lerpA(IK1.p, IK2.p, l2); ti = lerpA(IK1.t, IK2.t, l2); }
            phi = ph; tiltCur = ti;
            ct = Math.cos(tiltCur); st = Math.sin(tiltCur);
            setPhi(phi); draw(++frameId);
            raf = requestAnimationFrame(tick);
            return;
          }
        } else {
          phi += SPIN_IDLE * dt;
          targetTilt = TILT0 + Math.sin(now * 0.00022) * 0.045;
        }
      }

      tiltCur += (targetTilt - tiltCur) * Math.min(1, dt * 3);
      ct = Math.cos(tiltCur); st = Math.sin(tiltCur);
      setPhi(phi); draw(++frameId);
      raf = requestAnimationFrame(tick);
    }

    function onPointerDown(e: PointerEvent) {
      dragging = true; introDone = true; canvas!.style.cursor = "grabbing";
      lastX = e.clientX; lastY = e.clientY; lastMoveT = performance.now();
      try { canvas!.setPointerCapture(e.pointerId); } catch {}
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      phi += dx * 0.006;
      tiltCur = clamp(tiltCur + dy * 0.005, -1.05, 0.35);
      targetTilt = tiltCur;
      lastX = e.clientX; lastY = e.clientY; lastMoveT = now;
    }
    function endDrag() {
      if (!dragging) return;
      dragging = false; canvas!.style.cursor = "grab";
      targetTilt = TILT0;
    }
    function attachPointer() {
      if (interactive) return; interactive = true;
      canvas!.style.cursor = "grab";
      canvas!.style.touchAction = "pan-y";
      canvas!.addEventListener("pointerdown", onPointerDown);
      canvas!.addEventListener("pointermove", onPointerMove);
      canvas!.addEventListener("pointerup", endDrag);
      canvas!.addEventListener("pointercancel", endDrag);
    }

    function orbitPoint(s: any, ang: number) {
      const ox = Math.cos(ang) * s.radius, oy = Math.sin(ang) * s.radius;
      const y1 = oy * Math.cos(s.incl), z1 = oy * Math.sin(s.incl), x1 = ox;
      const x2 = x1 * Math.cos(s.node) + z1 * Math.sin(s.node);
      const z2 = -x1 * Math.sin(s.node) + z1 * Math.cos(s.node), y2 = y1;
      const yv = y2 * ct - z2 * st, zv = y2 * st + z2 * ct, xv = x2;
      return { sx: cx + xv * R, sy: cy - yv * R, z: zv };
    }
    function occluded(p: any) { return p.z < 0 && (p.sx - cx) * (p.sx - cx) + (p.sy - cy) * (p.sy - cy) < R * R; }
    function drawSatellites(a: any, frame: number) {
      const time = frame / 60, edge = size * 0.5, fadeFrom = size * 0.45;
      function edgeFade(p: any) {
        const d = Math.hypot(p.sx - cx, p.sy - cy);
        return d <= fadeFrom ? 1 : d >= edge ? 0 : (edge - d) / (edge - fadeFrom);
      }
      SATS.forEach((s) => {
        ctx.lineWidth = Math.max(0.8, (size / 560) * 0.85);
        let prev: any = null;
        for (let i = 0; i <= 72; i++) {
          const p = orbitPoint(s, (i / 72) * Math.PI * 2);
          if (prev) {
            const ef = Math.min(edgeFade(p), edgeFade(prev));
            if (ef > 0.01) {
              const base = occluded(p) ? 0.05 : 0.16;
              ctx.strokeStyle = "rgba(" + (occluded(p) ? "28,27,23" : a.r + "," + a.g + "," + a.b) + "," + (base * ef).toFixed(3) + ")";
              ctx.beginPath(); ctx.moveTo(prev.sx, prev.sy); ctx.lineTo(p.sx, p.sy); ctx.stroke();
            }
          }
          prev = p;
        }
        const spt = orbitPoint(s, s.phase + time * s.speed), occ = occluded(spt), rad = Math.max(2, (size / 560) * 2.6), ef2 = edgeFade(spt);
        if (ef2 <= 0.01) return;
        if (!occ) {
          const g = ctx.createRadialGradient(spt.sx, spt.sy, 0, spt.sx, spt.sy, rad * 3.2);
          g.addColorStop(0, "rgba(" + a.r + "," + a.g + "," + a.b + "," + 0.5 * ef2 + ")");
          g.addColorStop(1, "rgba(" + a.r + "," + a.g + "," + a.b + ",0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(spt.sx, spt.sy, rad * 3.2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = (occ ? 0.28 : 1) * ef2;
        ctx.fillStyle = "#1C1B17";
        ctx.beginPath(); ctx.arc(spt.sx, spt.sy, rad * 0.78, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgb(" + a.r + "," + a.g + "," + a.b + ")";
        ctx.beginPath(); ctx.arc(spt.sx, spt.sy, rad * 0.42, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      });
    }

    function fallback2D() {
      const a = accentRGB(0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, size, size);
      const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      g.addColorStop(0, "#FFFDF8"); g.addColorStop(1, "#E0DBCB");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = "rgba(28,27,23,0.12)"; ctx.stroke();
      setPhi(PHI0); drawArcs(a); drawMarkers(a, 0);
    }

    const isMobile = () => window.matchMedia("(max-width: 760px)").matches;

    function layout() {
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      size = Math.round(Math.min(rect.width, rect.height));
      if (size <= 0) return;
      canvas!.width = size * dpr; canvas!.height = size * dpr;
      canvas!.style.width = size + "px"; canvas!.style.height = size + "px";
      R = size * 0.41; cx = size / 2; cy = size / 2;

      if (landPts.length === 0 && landFeature) buildLand();
      if (arcs.length === 0) buildArcs();

      if (!started) {
        started = true;
        if (reduceMotion || isMobile()) { phi = PHI0; tiltCur = TILT0; targetTilt = TILT0; introDone = true; }
        else { phi = IK0.p; tiltCur = IK0.t; targetTilt = IK0.t; introT = 0; introDone = false; }
      }

      if (raf) cancelAnimationFrame(raf);
      lastT = 0;
      ct = Math.cos(tiltCur); st = Math.sin(tiltCur); setPhi(phi);
      if (!landFeature) { fallback2D(); return; }

      draw(++frameId);
      if (!reduceMotion && size > 360 && !isMobile()) {
        attachPointer();
        raf = requestAnimationFrame(tick);
      }
    }

    let tickerTimer: any = null, flowI = 0, tickerOn = false;
    function startTicker() {
      if (tickerOn) return;
      const el = document.getElementById("tradeBox");
      if (!el) return;
      tickerOn = true;
      const modeEl = document.getElementById("tbMode"),
        prodEl = document.getElementById("tbProduct"),
        routeEl = document.getElementById("tbRoute"),
        arrowEl = document.getElementById("tbArrow");
      function show() {
        const fl = FLOWS[flowI % FLOWS.length]; flowI++;
        activeP = fl.p;
        el!.classList.add("tb-swap");
        setTimeout(() => {
          el!.classList.toggle("is-out", fl.mode === "OUT");
          el!.classList.toggle("is-in", fl.mode === "IN");
          if (modeEl) modeEl.textContent = fl.mode === "OUT" ? "Export" : "Invest in";
          if (arrowEl) arrowEl.textContent = fl.mode === "OUT" ? "↗" : "↘";
          if (prodEl) prodEl.textContent = fl.product;
          if (routeEl) routeEl.textContent = fl.route;
          el!.classList.remove("tb-swap");
          if (!reduceMotion && !isMobile()) { ignite = 1; ringPulses.push({ f: frameId, d: DESTS[fl.p] }); }
        }, 220);
      }
      show();
      if (!reduceMotion && !isMobile()) tickerTimer = setInterval(show, 3000);
    }

    function start() { layout(); startTicker(); }

    function buildArgRings() {
      argRings = [];
      if (!argFeature) return;
      const g = argFeature.geometry, polys = g.type === "MultiPolygon" ? g.coordinates : [g.coordinates];
      polys.forEach((poly: any) => {
        poly.forEach((ring: any) => {
          const out = [];
          for (let i = 0; i < ring.length; i++) out.push(unit(ring[i][0], ring[i][1]));
          argRings.push(out);
        });
      });
      const c = geoCentroid(argFeature);
      argCentroid = unit(c[0], c[1]);
    }

    function loadLand() {
      // Self-hosted (mismo origen, sin DNS/TLS extra); CDN solo como fallback.
      fetch("/world/countries-110m.json")
        .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
        .then((topo) => {
          if (disposed) return;
          const fc: any = feature(topo, topo.objects.countries);
          landFeature = fc;
          for (let i = 0; i < fc.features.length; i++) {
            const f = fc.features[i];
            if (String(f.id) === "032" || (f.properties && f.properties.name === "Argentina")) { argFeature = f; break; }
          }
          if (argFeature) buildArgRings();
          start();
        })
        .catch(() => {
          fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
            .then((r) => r.json())
            .then((topo) => {
              if (disposed) return;
              const fc: any = feature(topo, topo.objects.countries);
              landFeature = fc;
              for (let i = 0; i < fc.features.length; i++) {
                const f = fc.features[i];
                if (String(f.id) === "032" || (f.properties && f.properties.name === "Argentina")) { argFeature = f; break; }
              }
              if (argFeature) buildArgRings();
              start();
            })
            .catch(() => { buildArcs(); start(); });
        });
    }

    let resizeT: any = null;
    const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(layout, 160); };
    window.addEventListener("resize", onResize);

    loadLand();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      if (tickerTimer) clearInterval(tickerTimer);
      clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <div className="globe-stage" id="globeStage" ref={stageRef}>
      <canvas
        id="globe"
        ref={canvasRef}
        role="img"
        aria-label="An interactive globe: trade flows move in and out of Argentina — exports leaving its provinces and capital arriving."
      />
      <div className="globe-caption" id="globeCaption" ref={captionRef}>
        <span className="ba-dot" />
        Argentina{" "}
        <span className="muted" style={{ color: "var(--accent)" }}>·AR</span>
      </div>
    </div>
  );
}
