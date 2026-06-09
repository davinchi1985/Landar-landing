import "server-only";
import { getServiceClient } from "./supabase/server";
import type { MedidaRow } from "./supabase/types";

// Lecturas para el panel admin: service-role, sin caché, incluye no publicadas.

export async function listMedidasAdmin(): Promise<MedidaRow[]> {
  const sb = getServiceClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from("medidas")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error || !data) return [];
  return data as MedidaRow[];
}

export async function getMedidaRowAdmin(id: string): Promise<MedidaRow | null> {
  const sb = getServiceClient();
  if (!sb) return null;
  const { data, error } = await sb
    .from("medidas")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data as MedidaRow;
}
