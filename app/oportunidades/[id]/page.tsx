import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../../lib/site";
import { sectorLabel, ESTADO_LABEL, TIPO_LABEL, medidaFaqs } from "../../lib/oportunidades";
import { getAllIds, getMedida, relacionadas, tandaDe } from "../../lib/radar";

export async function generateStaticParams() {
  const ids = await getAllIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const m = await getMedida(id);
  if (!m) return {};
  const title = `${m.titulo} — ${ESTADO_LABEL[m.estado]}`;
  return {
    title,
    description: m.resumen,
    alternates: { canonical: `/oportunidades/${id}` },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: m.resumen,
      type: "article",
      url: `/oportunidades/${id}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: `${m.titulo} | ${SITE_NAME}`,
      description: m.resumen,
    },
  };
}

function RadarNav() {
  return (
    <header className="nav is-stuck">
      <div className="nav__inner">
        <Link className="logo" href="/" aria-label="Inteligenci·AR — home">
          <svg viewBox="0 0 26 26" className="logo__mark" aria-hidden="true">
            <rect width="26" height="26" rx="7" fill="#14202B" />
            <path d="M5.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#74ACDF" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
            <path d="M20.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#74ACDF" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
            <path d="M13 4.6 Q13 11 13 17.8" fill="none" stroke="#74ACDF" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
            <circle cx="13" cy="18" r="2.1" fill="#F6B40E" />
          </svg>
          <span className="logo__word">Inteligenci<span className="ar">·AR</span></span>
        </Link>
        <a className="btn btn--primary" href="/#contact">Get in touch</a>
      </div>
    </header>
  );
}

export default async function MedidaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = await getMedida(id);
  if (!m) notFound();

  const [tanda, rel] = await Promise.all([tandaDe(id), relacionadas(id)]);
  const faqs = medidaFaqs(m);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: m.titulo,
    description: m.resumen,
    articleSection: sectorLabel(m.sector),
    keywords: (m.tags ?? []).join(", "),
    ...(tanda?.fuente.fecha_publicacion && {
      datePublished: tanda.fuente.fecha_publicacion,
      dateModified: tanda.fuente.ingesta_fecha ?? tanda.fuente.fecha_publicacion,
    }),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/oportunidades/${id}`,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Radar de oportunidades",
        item: `${SITE_URL}/oportunidades`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: m.titulo,
        item: `${SITE_URL}/oportunidades/${id}`,
      },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {[article, breadcrumb, faqPage].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <RadarNav />

      <main className="radar radar-detail wrap">
        <nav className="radar-crumbs" aria-label="Breadcrumb">
          <Link href="/oportunidades">Radar</Link>
          <span aria-hidden="true">/</span>
          <span>{sectorLabel(m.sector)}</span>
        </nav>

        <header className="radar-detail__head">
          <div className="radar-badges">
            <span className="radar-b sector">{sectorLabel(m.sector)}</span>
            <span className={`radar-b estado ${m.estado}`}>{ESTADO_LABEL[m.estado]}</span>
            {m.fecha && <span className="radar-b">{m.fecha}</span>}
          </div>
          <h1>{m.titulo}</h1>
          <p className="lede">{m.resumen}</p>

          <dl className="radar-facts">
            {m.instrumento && (
              <div>
                <dt>Instrumento</dt>
                <dd>{m.instrumento}</dd>
              </div>
            )}
            {m.organismo_afectado && (
              <div>
                <dt>Organismo afectado</dt>
                <dd>{m.organismo_afectado}</dd>
              </div>
            )}
            <div>
              <dt>Estado</dt>
              <dd>{ESTADO_LABEL[m.estado]}</dd>
            </div>
          </dl>
        </header>

        {m.que_cambia && m.que_cambia.length > 0 && (
          <section className="radar-detail__block">
            <h2>Qué cambia</h2>
            <ul className="radar-changes">
              {m.que_cambia.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>
        )}

        {m.oportunidades && m.oportunidades.length > 0 && (
          <section className="radar-detail__block">
            <h2>Oportunidades</h2>
            <div className="radar-ops">
              {m.oportunidades.map((o, i) => (
                <div className="radar-op" key={i}>
                  <div className="radar-ophead">
                    <span className={`radar-tipo ${o.tipo}`}>{TIPO_LABEL[o.tipo]}</span>
                    <span>{o.titulo}</span>
                  </div>
                  {o.descripcion && <p className="radar-opdesc">{o.descripcion}</p>}
                  {o.perfil && <p className="radar-opperfil">Perfil: {o.perfil}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {m.tags && m.tags.length > 0 && (
          <div className="radar-tags">
            {m.tags.map((t) => (
              <span className="radar-tag" key={t}>#{t}</span>
            ))}
          </div>
        )}

        {m.fuentes && m.fuentes.length > 0 && (
          <section className="radar-detail__sources">
            <h2>Fuentes</h2>
            <ul>
              {m.fuentes.map((f, i) => (
                <li key={i}>
                  <a href={f.url} target="_blank" rel="noopener noreferrer">
                    {f.medio} ↗
                  </a>
                </li>
              ))}
            </ul>
            {tanda?.fuente && (
              <p className="radar-prov">
                Registro construido a partir de: {tanda.fuente.titulo}
                {tanda.fuente.ingesta_fecha && ` · ingesta ${tanda.fuente.ingesta_fecha}`}.
                Es información, no asesoramiento legal.
              </p>
            )}
          </section>
        )}

        {faqs.length > 0 && (
          <section className="radar-detail__block radar-faq">
            <h2>Preguntas frecuentes</h2>
            <div className="radar-faq__list">
              {faqs.map((f, i) => (
                <details className="radar-faq__item" key={i}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="radar-cta">
          <h2>¿Querés aprovechar esta ventana?</h2>
          <p className="lede">
            Inteligenci·AR ayuda a empresas a aterrizar, operar y exportar desde
            Argentina — entidad, banco, contabilidad y contratación, con un solo
            interlocutor.
          </p>
          <a className="btn btn--primary btn--lg" href="/#contact">
            Hablemos <span className="arrow">→</span>
          </a>
        </section>

        {rel.length > 0 && (
          <section className="radar-detail__related">
            <h2>Otras desregulaciones</h2>
            <div className="radar-related-grid">
              {rel.map((r) => (
                <Link className="radar-related-card" key={r.id} href={`/oportunidades/${r.id}`}>
                  <span className="radar-b sector">{sectorLabel(r.sector)}</span>
                  <span className="radar-related-card__title">{r.titulo}</span>
                </Link>
              ))}
            </div>
            <p className="radar-back">
              <Link href="/oportunidades">← Ver todo el radar</Link>
            </p>
          </section>
        )}
      </main>

      <div style={{ height: "clamp(3rem,7vw,6rem)" }} />
    </>
  );
}
