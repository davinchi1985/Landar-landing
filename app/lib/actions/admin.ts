"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../auth";
import { getServiceClient } from "../supabase/server";
import { RADAR_TAG } from "../radar";

// Mutaciones del radar desde el panel admin. Todas exigen sesión admin y
// escriben con service-role; al terminar invalidan el cache del feed.

export type AdminFormState = { status: "idle" | "error"; message?: string };

function parseLines(s: string): string[] | null {
  const arr = s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return arr.length ? arr : null;
}

function parseCsv(s: string): string[] | null {
  const arr = s
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);
  return arr.length ? arr : null;
}

function parseJsonArray(s: string): unknown[] | null {
  const t = s.trim();
  if (!t) return null;
  try {
    const v = JSON.parse(t);
    return Array.isArray(v) ? v : null;
  } catch {
    return null;
  }
}

export async function upsertMedida(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const sb = getServiceClient();
  if (!sb) return { status: "error", message: "Supabase no configurado." };

  const id = String(formData.get("id") ?? "").trim();
  const titulo = String(formData.get("titulo") ?? "").trim();
  const sector = String(formData.get("sector") ?? "").trim();
  const estado = String(formData.get("estado") ?? "").trim();
  const resumen = String(formData.get("resumen") ?? "").trim();
  if (!id || !titulo || !sector || !estado || !resumen) {
    return {
      status: "error",
      message: "Faltan campos obligatorios (id, título, sector, estado, resumen).",
    };
  }
  if (!/^[a-z0-9-]+$/.test(id)) {
    return { status: "error", message: "El id debe ser un slug kebab-case (a-z, 0-9, guiones)." };
  }

  const oportunidadesRaw = String(formData.get("oportunidades") ?? "");
  const fuentesRaw = String(formData.get("fuentes") ?? "");
  const oportunidades = oportunidadesRaw.trim() ? parseJsonArray(oportunidadesRaw) : null;
  const fuentes = fuentesRaw.trim() ? parseJsonArray(fuentesRaw) : null;
  if (oportunidadesRaw.trim() && oportunidades === null)
    return { status: "error", message: "Oportunidades: JSON inválido (debe ser un array)." };
  if (fuentesRaw.trim() && fuentes === null)
    return { status: "error", message: "Fuentes: JSON inválido (debe ser un array)." };

  const row = {
    id,
    titulo,
    sector,
    estado,
    resumen,
    organismo_afectado: String(formData.get("organismo_afectado") ?? "").trim() || null,
    instrumento: String(formData.get("instrumento") ?? "").trim() || null,
    fecha: String(formData.get("fecha") ?? "").trim() || null,
    que_cambia: parseLines(String(formData.get("que_cambia") ?? "")),
    tags: parseCsv(String(formData.get("tags") ?? "")),
    oportunidades,
    fuentes,
    published: formData.get("published") === "on",
  };

  const { error } = await sb.from("medidas").upsert(row, { onConflict: "id" });
  if (error) return { status: "error", message: error.message };

  revalidateTag(RADAR_TAG, { expire: 0 });
  revalidatePath("/oportunidades");
  revalidatePath(`/oportunidades/${id}`);
  redirect("/admin");
}

export async function togglePublished(formData: FormData): Promise<void> {
  await requireAdmin();
  const sb = getServiceClient();
  if (!sb) return;
  const id = String(formData.get("id") ?? "");
  const next = formData.get("next") === "true";
  if (!id) return;
  await sb.from("medidas").update({ published: next }).eq("id", id);
  revalidateTag(RADAR_TAG, { expire: 0 });
  revalidatePath("/oportunidades");
  revalidatePath(`/oportunidades/${id}`);
  revalidatePath("/admin");
}
