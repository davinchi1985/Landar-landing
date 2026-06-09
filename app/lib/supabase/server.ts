import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente service-role: bypassa RLS. SOLO server (seed, panel admin, escritura,
// suscripción). NUNCA importar desde código cliente — el guard `server-only` lo impide.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** true si las env de service-role están cargadas. */
export const hasServiceClient = Boolean(url && serviceKey);

/** Devuelve el cliente service-role, o null si falta configuración (→ fallback). */
export function getServiceClient(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
