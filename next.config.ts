import type { NextConfig } from "next";

// Content-Security-Policy. Sin nonces a propósito: las páginas son SSG/prerender
// y un nonce las forzaría a render dinámico. 'unsafe-inline' en script-src es el
// costo de mantener estático + JSON-LD + el loader de Crisp inline.
// Orígenes externos permitidos (cada uno tiene un porqué):
//  - *.crisp.chat / wss relay  → live chat (https://docs.crisp.chat/guides/others/whitelisting-our-systems/crisp-domain-names/)
//  - cdn.jsdelivr.net          → world-atlas (topojson del globo del hero)
//  - api.hsforms.com           → HubSpot Forms Submission API (wizard de leads)
//  - formspree.io              → respaldo del wizard
//  - *.supabase.co             → auth magic-link del panel /admin (browser client)
//  - va.vercel-scripts.com     → @vercel/analytics en dev/debug
//  - vercel.live               → toolbar de comentarios en preview deployments
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.crisp.chat https://va.vercel-scripts.com https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://*.crisp.chat",
  "img-src 'self' data: blob: https://*.crisp.chat",
  "font-src 'self' data: https://*.crisp.chat",
  "connect-src 'self' https://*.crisp.chat wss://*.relay.crisp.chat wss://*.relay.rescue.crisp.chat https://cdn.jsdelivr.net https://api.hsforms.com https://formspree.io https://*.supabase.co https://va.vercel-scripts.com https://vercel.live",
  "frame-src https://*.crisp.chat https://vercel.live",
  "media-src 'self' https://*.crisp.chat",
  "worker-src 'self' blob: https://*.crisp.chat",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.hsforms.com https://formspree.io",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // 2 años + subdominios. Vercel ya fuerza HTTPS; esto fija la promesa en el browser.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Data estática versionada (topojson del globo): cache fuerte.
        source: "/world/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Rutas privadas: fuera de los índices sin anunciarlas en robots.txt.
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/auth/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/admin",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
