import { ImageResponse } from "next/og";
import { getPost } from "../../lib/posts";

export const alt = "Inteligenci·AR — Argentina market-entry guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CAT: Record<string, string> = {
  legal: "Entity & legal",
  banking: "Banking",
  hiring: "Hiring & HR",
  energy: "Energy",
  strategy: "Strategy",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "The Inteligenci·AR Journal";
  const cat = post ? CAT[post.category] ?? "Guide" : "Journal";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#F0EEE6",
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
          <span style={{ fontSize: 40, fontWeight: 500, color: "#1C1B17", letterSpacing: "-2px" }}>
            Inteligenci
          </span>
          <span style={{ fontSize: 40, fontWeight: 700, color: "#C9613D", letterSpacing: "-1px" }}>
            ·AR
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, color: "#C9613D", fontFamily: "sans-serif", letterSpacing: "1px", marginBottom: 18 }}>
            {cat.toUpperCase()}
          </div>
          <div style={{ fontSize: 52, color: "#1C1B17", lineHeight: 1.12, letterSpacing: "-1.5px", maxWidth: 1010 }}>
            {title}
          </div>
        </div>

        <div style={{ fontSize: 18, color: "#6E6A60", fontFamily: "sans-serif" }}>
          inteligenci.ar/blog
        </div>
      </div>
    ),
    { ...size },
  );
}
