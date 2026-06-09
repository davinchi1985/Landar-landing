// Seed inicial del radar: carga las tandas + medidas estáticas de
// `app/lib/oportunidades.ts` a Supabase. Idempotente (upsert por slug / id).
//
// Requisitos: schema ya creado (supabase/schema.sql) y las 3 env de Supabase.
// Correr desde inteligenci.ar/ con Node 24+:
//
//   node --env-file=.env.local scripts/seed-radar.ts
//
// La data sale del mismo archivo que el fallback → DB, seed y fallback idénticos.

import { createClient } from "@supabase/supabase-js";
import { tandas } from "../app/lib/oportunidades.ts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "✗ Faltan NEXT_PUBLIC_SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY.\n" +
      "  Cargalas en .env.local (ver .env.example) y reintentá.",
  );
  process.exit(1);
}

const sb = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function tandaSlug(fechaPublicacion: string, titulo: string): string {
  // Slug estable y ASCII-safe: lo no alfanumérico (incl. acentos) → "-".
  const base = titulo
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
  return `${fechaPublicacion}-${base}`;
}

let nMedidas = 0;

for (const tanda of tandas) {
  const f = tanda.fuente;
  const slug = tandaSlug(f.fecha_publicacion, f.titulo);

  const { data: tandaRow, error: te } = await sb
    .from("tandas")
    .upsert(
      {
        slug,
        tipo: f.tipo,
        titulo: f.titulo,
        canal: f.canal ?? null,
        url: f.url ?? null,
        fecha_publicacion: f.fecha_publicacion,
        ingesta_fecha: f.ingesta_fecha ?? null,
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();

  if (te || !tandaRow) {
    console.error("✗ Error al cargar tanda:", te?.message);
    process.exit(1);
  }

  let orden = 0;
  for (const m of tanda.medidas) {
    const { error: me } = await sb.from("medidas").upsert(
      {
        id: m.id,
        tanda_id: tandaRow.id,
        titulo: m.titulo,
        sector: m.sector,
        organismo_afectado: m.organismo_afectado ?? null,
        instrumento: m.instrumento ?? null,
        estado: m.estado,
        fecha: m.fecha ?? null,
        resumen: m.resumen,
        que_cambia: m.que_cambia ?? null,
        oportunidades: m.oportunidades ?? null,
        tags: m.tags ?? null,
        fuentes: m.fuentes ?? null,
        published: true,
        orden: orden++,
      },
      { onConflict: "id" },
    );
    if (me) {
      console.error(`✗ Error al cargar medida ${m.id}:`, me.message);
      process.exit(1);
    }
    nMedidas++;
  }
}

console.log(`✓ Seed completo: ${tandas.length} tanda(s), ${nMedidas} medida(s) publicadas.`);
process.exit(0);
