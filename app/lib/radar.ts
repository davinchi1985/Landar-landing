import "server-only";
import { unstable_cache } from "next/cache";
import { getAnonClient } from "./supabase/public";
import {
  tandas as staticTandas,
  type Medida,
  type Tanda,
} from "./oportunidades";
import type { MedidaRow, TandaRow } from "./supabase/types";

// Capa de acceso a datos del radar. Lee de Supabase (lectura pública RLS
// published=true) y, si Supabase no está configurado o falla, cae con gracia a
// la data estática de `oportunidades.ts`. El resultado se cachea con el tag
// `RADAR_TAG`; el panel admin lo invalida con revalidateTag al publicar.

export const RADAR_TAG = "medidas";

function rowToMedida(r: MedidaRow): Medida {
  return {
    id: r.id,
    titulo: r.titulo,
    sector: r.sector,
    organismo_afectado: r.organismo_afectado ?? undefined,
    instrumento: r.instrumento ?? undefined,
    estado: r.estado,
    fecha: r.fecha ?? undefined,
    resumen: r.resumen,
    que_cambia: r.que_cambia ?? undefined,
    oportunidades: r.oportunidades ?? undefined,
    tags: r.tags ?? undefined,
    fuentes: r.fuentes ?? undefined,
  };
}

function rowToTanda(t: TandaRow, medidas: Medida[]): Tanda {
  return {
    fuente: {
      tipo: t.tipo,
      titulo: t.titulo,
      canal: t.canal ?? undefined,
      url: t.url ?? undefined,
      fecha_publicacion: t.fecha_publicacion,
      ingesta_fecha: t.ingesta_fecha ?? undefined,
    },
    medidas,
  };
}

// Trae las tandas con sus medidas publicadas desde la DB.
// Devuelve null si Supabase no está configurado o hubo error (→ fallback).
async function fetchTandasFromDb(): Promise<Tanda[] | null> {
  const sb = getAnonClient();
  if (!sb) return null;

  const [tandasRes, medidasRes] = await Promise.all([
    sb.from("tandas").select("*").order("fecha_publicacion", { ascending: false }),
    sb
      .from("medidas")
      .select("*")
      .eq("published", true)
      .order("orden", { ascending: true, nullsFirst: false })
      .order("fecha", { ascending: false }),
  ]);

  if (tandasRes.error || medidasRes.error) return null;
  const tandaRows = (tandasRes.data ?? []) as TandaRow[];
  const medidaRows = (medidasRes.data ?? []) as MedidaRow[];
  if (medidaRows.length === 0) return null; // sin data publicada → fallback

  const byTanda = new Map<string | null, Medida[]>();
  for (const r of medidaRows) {
    const key = r.tanda_id;
    const list = byTanda.get(key) ?? [];
    list.push(rowToMedida(r));
    byTanda.set(key, list);
  }

  // Sólo tandas que tienen al menos una medida publicada.
  return tandaRows
    .map((t) => rowToTanda(t, byTanda.get(t.id) ?? []))
    .filter((t) => t.medidas.length > 0);
}

const getTandasCached = unstable_cache(
  async (): Promise<Tanda[]> => {
    const fromDb = await fetchTandasFromDb();
    return fromDb && fromDb.length > 0 ? fromDb : staticTandas;
  },
  ["radar-tandas"],
  { tags: [RADAR_TAG], revalidate: 3600 },
);

/** Tandas (fuente + medidas). Cacheado, con fallback estático. */
export async function getTandas(): Promise<Tanda[]> {
  try {
    return await getTandasCached();
  } catch {
    return staticTandas;
  }
}

/** Todas las medidas publicadas, aplanadas. */
export async function getMedidas(): Promise<Medida[]> {
  const tandas = await getTandas();
  return tandas.flatMap((t) => t.medidas);
}

export async function getMedida(id: string): Promise<Medida | undefined> {
  return (await getMedidas()).find((m) => m.id === id);
}

export async function getAllIds(): Promise<string[]> {
  return (await getMedidas()).map((m) => m.id);
}

/** Otras medidas del mismo sector primero (para interlinking en el detalle). */
export async function relacionadas(id: string, max = 3): Promise<Medida[]> {
  const medidas = await getMedidas();
  const base = medidas.find((m) => m.id === id);
  if (!base) return [];
  const mismoSector = medidas.filter((m) => m.id !== id && m.sector === base.sector);
  const resto = medidas.filter((m) => m.id !== id && m.sector !== base.sector);
  return [...mismoSector, ...resto].slice(0, max);
}

/** Tanda/fuente a la que pertenece una medida. */
export async function tandaDe(id: string): Promise<Tanda | undefined> {
  return (await getTandas()).find((t) => t.medidas.some((m) => m.id === id));
}
