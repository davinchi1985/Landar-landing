"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ESTADO_LABEL,
  TIPO_LABEL,
  sectorLabel,
  type EstadoMedida,
  type Medida,
} from "../lib/oportunidades";

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  next.has(value) ? next.delete(value) : next.add(value);
  return next;
}

export default function Feed({ medidas }: { medidas: Medida[] }) {
  const [q, setQ] = useState("");
  const [sectors, setSectors] = useState<Set<string>>(new Set());
  const [estados, setEstados] = useState<Set<EstadoMedida>>(new Set());

  const allSectors = useMemo(
    () => [...new Set(medidas.map((m) => m.sector))].sort(),
    [medidas],
  );
  const allEstados = useMemo(
    () => [...new Set(medidas.map((m) => m.estado))],
    [medidas],
  );

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return medidas.filter((m) => {
      if (sectors.size && !sectors.has(m.sector)) return false;
      if (estados.size && !estados.has(m.estado)) return false;
      if (needle) {
        const hay = [
          m.titulo,
          m.resumen,
          ...(m.tags ?? []),
          ...(m.que_cambia ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [medidas, q, sectors, estados]);

  return (
    <>
      <div className="radar-filters">
        <div className="radar-frow">
          <input
            className="radar-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título, resumen o etiqueta…"
            aria-label="Buscar en el radar"
          />
          <span className="radar-count">
            <b>{list.length}</b> / {medidas.length} medidas
          </span>
        </div>
        <div className="radar-frow">
          <span className="radar-flabel">Sector</span>
          {allSectors.map((s) => (
            <button
              key={s}
              type="button"
              className={`radar-chip${sectors.has(s) ? " on" : ""}`}
              onClick={() => setSectors((prev) => toggle(prev, s))}
            >
              {sectorLabel(s)}
            </button>
          ))}
        </div>
        <div className="radar-frow">
          <span className="radar-flabel">Estado</span>
          {allEstados.map((e) => (
            <button
              key={e}
              type="button"
              className={`radar-chip${estados.has(e) ? " on" : ""}`}
              onClick={() => setEstados((prev) => toggle(prev, e))}
            >
              {ESTADO_LABEL[e]}
            </button>
          ))}
        </div>
      </div>

      <div className="radar-grid">
        {list.length === 0 ? (
          <div className="radar-empty">
            Nada matchea esos filtros. Aflojá alguno.
          </div>
        ) : (
          list.map((m) => <Card key={m.id} m={m} />)
        )}
      </div>
    </>
  );
}

function Card({ m }: { m: Medida }) {
  return (
    <article className="radar-card">
      <div className="radar-badges">
        <span className="radar-b sector">{sectorLabel(m.sector)}</span>
        <span className={`radar-b estado ${m.estado}`}>
          {ESTADO_LABEL[m.estado]}
        </span>
        {m.fecha && <span className="radar-b">{m.fecha}</span>}
      </div>

      <h3 className="radar-card__title">
        <Link href={`/oportunidades/${m.id}`}>{m.titulo}</Link>
      </h3>
      <p className="radar-resumen">{m.resumen}</p>

      {m.que_cambia && m.que_cambia.length > 0 && (
        <ul className="radar-changes">
          {m.que_cambia.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      )}

      {m.oportunidades && m.oportunidades.length > 0 && (
        <div className="radar-ops">
          {m.oportunidades.map((o, i) => (
            <div className="radar-op" key={i}>
              <div className="radar-ophead">
                <span className={`radar-tipo ${o.tipo}`}>
                  {TIPO_LABEL[o.tipo]}
                </span>
                <span>{o.titulo}</span>
              </div>
              {o.descripcion && (
                <p className="radar-opdesc">{o.descripcion}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {m.tags && m.tags.length > 0 && (
        <div className="radar-tags">
          {m.tags.map((t) => (
            <span className="radar-tag" key={t}>
              #{t}
            </span>
          ))}
        </div>
      )}

      {m.fuentes && m.fuentes.length > 0 && (
        <div className="radar-foot">
          {m.fuentes.map((f, i) => (
            <a key={i} href={f.url} target="_blank" rel="noopener noreferrer">
              {f.medio} ↗
            </a>
          ))}
        </div>
      )}

      <Link className="radar-more" href={`/oportunidades/${m.id}`}>
        Ver detalle <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
