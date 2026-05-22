import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Landar — Land your operation in Argentina";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#070A12",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: 28 }}>
          <span style={{ fontSize: 72, fontWeight: 300, color: "#ffffff", letterSpacing: "-3px" }}>
            Land
          </span>
          <span style={{ fontSize: 72, fontWeight: 700, color: "#74ACDF", letterSpacing: "-2px" }}>
            ·AR
          </span>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.7)", lineHeight: 1.4, maxWidth: 680 }}>
          Land your operation in Argentina. Entity, banking, hiring — from day one.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
          {["Entity setup", "Banking", "Hiring & payroll"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(116,172,223,0.4)",
                color: "#74ACDF",
                fontSize: 18,
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ marginTop: 48, fontSize: 16, color: "rgba(255,255,255,0.3)" }}>
          landar-landing.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
