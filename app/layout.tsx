import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const BASE_URL = "https://landar-landing.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Landar — Land your operation in Argentina",
    template: "%s | Landar",
  },
  description:
    "One point of contact for entity setup, banking, accounting, and hiring in Argentina — handled from day one by a team on the ground.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    siteName: "Landar",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Landar",
  url: BASE_URL,
  description:
    "Landar helps foreign companies land operations in Argentina — entity setup, banking, accounting, and hiring from a single point of contact.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://calendly.com/davinchicohen/30min",
  },
  areaServed: "AR",
  serviceType: [
    "Company formation Argentina",
    "Employer of Record Argentina",
    "Corporate banking Argentina",
    "Payroll Argentina",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        {children}
        <Script id="crisp-chat" strategy="afterInteractive">
          {`
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="418b4a97-b152-4ace-a5d4-4b06230c5aae";
            (function(){var d=document;var s=d.createElement("script");
            s.src="https://client.crisp.chat/l.js";
            s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
          `}
        </Script>
      </body>
    </html>
  );
}
