import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Buscadores tradicionales + crawlers de IA (GEO): los dejamos pasar
      // a propósito — queremos aparecer en respuestas de ChatGPT, Perplexity, etc.
      // /admin y /auth son privados: fuera del índice.
      { userAgent: "*", allow: "/", disallow: ["/admin", "/auth"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
