import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Inteligenci·AR — Set up your AI-entity & operate in Argentina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F0EEE6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: 28 }}>
          <span style={{ fontSize: 70, fontWeight: 500, color: "#1C1B17", letterSpacing: "-3px" }}>
            Inteligenci
          </span>
          <span style={{ fontSize: 70, fontWeight: 700, color: "#C9613D", letterSpacing: "-2px" }}>
            ·AR
          </span>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 34, color: "#1C1B17", lineHeight: 1.35, maxWidth: 760, letterSpacing: "-1px" }}>
          Set up your AI-entity in Argentina — and land, operate and export from Buenos Aires.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
          {["AI-entity", "Land & operate", "Export from Argentina"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(201,97,61,0.45)",
                color: "#C9613D",
                fontSize: 18,
                display: "flex",
                fontFamily: "sans-serif",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ marginTop: 48, fontSize: 16, color: "#6E6A60", fontFamily: "sans-serif" }}>
          inteligenci.ar
        </div>
      </div>
    ),
    { ...size }
  );
}
