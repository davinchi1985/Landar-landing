import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Buscadores tradicionales + crawlers de IA (GEO): los dejamos pasar
      // a propósito — queremos aparecer en respuestas de ChatGPT, Perplexity, etc.
      // /admin y /auth NO se listan acá (sería anunciar que existen): van con
      // X-Robots-Tag noindex vía next.config + auth real en la ruta.
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
