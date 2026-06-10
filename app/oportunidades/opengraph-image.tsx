import { ImageResponse } from "next/og";
import { freedomIndex as f } from "../lib/freedom-index";

export const runtime = "edge";
export const alt =
  "Radar de oportunidades regulatorias — Inteligenci·AR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#16242E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: 44, fontWeight: 500, color: "#FBF7EE", letterSpacing: "-2px" }}>
            Inteligenci
          </span>
          <span style={{ fontSize: 44, fontWeight: 700, color: "#2A6FA8", letterSpacing: "-1px" }}>
            ·AR
          </span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#2A6FA8", fontFamily: "sans-serif", marginBottom: 14, letterSpacing: "1px" }}>
            RADAR DE OPORTUNIDADES
          </div>
          <div style={{ fontSize: 58, color: "#FBF7EE", lineHeight: 1.08, maxWidth: 960, letterSpacing: "-2px" }}>
            {`Argentina, el país que más subió en libertad económica del mundo en ${f.year}.`}
          </div>
        </div>

        {/* Stat row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 56, color: "#FBF7EE", letterSpacing: "-2px" }}>{`${f.score}`}</span>
              <span style={{ fontSize: 18, color: "rgba(251,247,238,0.6)", fontFamily: "sans-serif" }}>{`Score · ▲ +${f.delta}`}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 56, color: "#FBF7EE", letterSpacing: "-2px" }}>{`#${f.rank}`}</span>
              <span style={{ fontSize: 18, color: "rgba(251,247,238,0.6)", fontFamily: "sans-serif" }}>Ranking mundial</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 56, color: "#2A6FA8", letterSpacing: "-2px" }}>#1</span>
              <span style={{ fontSize: 18, color: "rgba(251,247,238,0.6)", fontFamily: "sans-serif" }}>en mejora global</span>
            </div>
          </div>
          <div style={{ fontSize: 18, color: "rgba(251,247,238,0.5)", fontFamily: "sans-serif" }}>
            inteligenci.ar/oportunidades
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
