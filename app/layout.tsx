import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_EMAIL, CALENDLY_URL } from "./lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const TITLE = "Landar — Land & operate your company in Argentina";
const DESCRIPTION =
  "One point of contact for entity setup, banking, accounting, and hiring in Argentina. Operating-ready, not just incorporated — handled from day one by a team on the ground.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | Landar",
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "business",
  keywords: [
    "company formation Argentina",
    "set up company in Argentina",
    "register a company in Argentina as foreigner",
    "doing business in Argentina",
    "Argentina market entry",
    "operate in Argentina as a foreign company",
    "Argentina operating setup",
    "employer of record Argentina",
    "payroll services Argentina",
    "open business bank account Argentina",
    "accounting services Argentina foreign company",
    "hire employees in Argentina",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "3IQ0Har5PvrMEJDBRlIiAoOjNu29DPm_bmdiUbmDs4Q",
  },
};

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: SITE_URL,
      email: SITE_EMAIL,
      logo: `${SITE_URL}/opengraph-image`,
      image: `${SITE_URL}/opengraph-image`,
      description:
        "Landar helps foreign companies land operations in Argentina — entity setup, banking, accounting, and hiring from a single point of contact.",
      slogan: "One point of contact to land and operate in Argentina.",
      areaServed: { "@type": "Country", name: "Argentina" },
      address: { "@type": "PostalAddress", addressCountry: "AR", addressLocality: "Buenos Aires" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE_EMAIL,
        url: CALENDLY_URL,
        availableLanguage: ["English", "Spanish", "Portuguese", "German"],
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      name: "Landar — Argentina Operating Setup",
      url: SITE_URL,
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "Argentina" },
      description:
        "End-to-end market entry and operations setup for foreign companies in Argentina: legal entity, corporate banking, accounting & tax, and hiring & payroll, coordinated by a single project lead.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Argentina Operating Setup",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Entity & legal setup", description: "Company formation, legal coordination, CUIT and registrations in Argentina." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Banking readiness", description: "Documentation, bank introductions and ARS/USD account support in Argentina." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax & accounting setup", description: "Tax registration, accounting structure and compliance calendar in Argentina." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hiring & payroll", description: "Local hiring, payroll and Employer of Record (EOR) in Argentina." } },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
