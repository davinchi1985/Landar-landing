import { ImageResponse } from "next/og";
import { getMedida } from "../../lib/radar";
import { sectorLabel, ESTADO_LABEL } from "../../lib/oportunidades";

export const alt = "Radar de oportunidades — Inteligenci·AR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = await getMedida(id);
  const title = m?.titulo ?? "Radar de oportunidades";
  const sector = m ? sectorLabel(m.sector) : "Argentina";
  const estado = m ? ESTADO_LABEL[m.estado] : "";

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
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: 38, fontWeight: 500, color: "#FBF7EE", letterSpacing: "-2px" }}>
            Inteligenci
          </span>
          <span style={{ fontSize: 38, fontWeight: 700, color: "#2A6FA8", letterSpacing: "-1px" }}>
            ·AR
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, color: "#2A6FA8", fontFamily: "sans-serif", letterSpacing: "1px", marginBottom: 18 }}>
            {`RADAR · ${sector.toUpperCase()}`}
          </div>
          <div style={{ fontSize: 50, color: "#FBF7EE", lineHeight: 1.12, letterSpacing: "-1.5px", maxWidth: 1010 }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          {estado ? (
            <div style={{ display: "flex", fontSize: 20, color: "#FBF7EE", fontFamily: "sans-serif", background: "rgba(42,111,168,0.22)", padding: "8px 18px", borderRadius: 999 }}>
              {estado}
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
          <div style={{ fontSize: 18, color: "rgba(251,247,238,0.5)", fontFamily: "sans-serif" }}>
            inteligenci.ar/oportunidades
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
