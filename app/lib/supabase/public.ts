import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente anon: respeta RLS (lectura pública sólo de filas published=true).
// Apto para lecturas del feed desde Server Components. La key es pública por diseño.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** true si las env públicas de Supabase están cargadas. */
export const hasAnonClient = Boolean(url && anonKey);

/** Devuelve el cliente anon, o null si falta configuración (→ fallback). */
export function getAnonClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
