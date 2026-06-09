import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../lib/site";
import { ESTADO_LABEL, type Medida } from "../lib/oportunidades";
import { getMedidas, getTandas } from "../lib/radar";
import { hasServiceClient } from "../lib/supabase/server";
import Feed from "./Feed";
import SubscribeBox from "./SubscribeBox";
import FreedomBand from "./FreedomBand";

const TITLE = "Radar de oportunidades regulatorias";
const DESC =
  "Cada desregulación de la Nueva Argentina, traducida a una oportunidad concreta de negocio, inversión o contenido. Qué cambió, qué habilita y dónde leerlo.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/oportunidades" },
  openGraph: {
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESC,
    type: "website",
    url: "/oportunidades",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESC,
  },
};

function buildJsonLd(medidas: Medida[]) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    description: DESC,
    numberOfItems: medidas.length,
    itemListElement: medidas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.titulo,
      description: `${m.resumen} (Estado: ${ESTADO_LABEL[m.estado]})`,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: TITLE,
        item: `${SITE_URL}/oportunidades`,
      },
    ],
  };

  return [itemList, breadcrumb];
}

function RadarNav() {
  return (
    <header className="nav is-stuck">
      <div className="nav__inner">
        <Link className="logo" href="/" aria-label="Inteligenci·AR — home">
          <svg viewBox="0 0 26 26" className="logo__mark" aria-hidden="true">
            <rect width="26" height="26" rx="7" fill="#1C1B17" />
            <path d="M5.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#C9613D" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
            <path d="M20.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#C9613D" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
            <path d="M13 4.6 Q13 11 13 17.8" fill="none" stroke="#C9613D" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
            <circle cx="13" cy="18" r="2.1" fill="#C9613D" />
          </svg>
          <span className="logo__word">Inteligenci<span className="ar">·AR</span></span>
        </Link>
        <a className="btn btn--primary" href="/#contact">Get in touch</a>
      </div>
    </header>
  );
}

export default async function OportunidadesPage() {
  const [medidas, tandas] = await Promise.all([getMedidas(), getTandas()]);
  const jsonLd = buildJsonLd(medidas);
  const fuente = tandas[0]?.fuente;
  const ultimaActualizacion =
    fuente?.ingesta_fecha ?? fuente?.fecha_publicacion ?? "";

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <RadarNav />

      <main className="radar wrap">
        <header className="radar-head">
          <span className="eyebrow">Inteligencia regulatoria · Nueva Argentina</span>
          <h1>Radar de oportunidades regulatorias</h1>
          <p className="lede">
            Cada desregulación, traducida a una oportunidad concreta de negocio,
            inversión o contenido. Qué cambió, qué habilita y dónde leerlo —
            filtrá por sector o estado.
          </p>
          <p className="radar-disclaimer">
            Curado de fuentes públicas. Muchas medidas son <strong>proyecto o
            anuncio</strong>, no normas vigentes: el estado figura en cada
            tarjeta. Es información, no asesoramiento legal.
          </p>
          {fuente && (
            <div className="radar-src">
              <span>
                <b>Última tanda:</b> {fuente.titulo}
              </span>
              {fuente.url && (
                <a href={fuente.url} target="_blank" rel="noopener noreferrer">
                  ver fuente ↗
                </a>
              )}
              {ultimaActualizacion && (
                <span>
                  <b>Actualizado:</b> {ultimaActualizacion}
                </span>
              )}
            </div>
          )}
        </header>

        <FreedomBand />

        <Feed medidas={medidas} />

        {hasServiceClient && <SubscribeBox />}

        <section className="radar-cta">
          <h2>¿Alguna de estas ventanas es tuya?</h2>
          <p className="lede">
            Inteligenci·AR ayuda a empresas a aterrizar, operar y exportar desde
            Argentina — entidad, banco, contabilidad y contratación, con un solo
            interlocutor.
          </p>
          <a className="btn btn--primary btn--lg" href="/#contact">
            Hablemos <span className="arrow">→</span>
          </a>
        </section>
      </main>

      <div style={{ height: "clamp(3rem,7vw,6rem)" }} />
    </>
  );
}
