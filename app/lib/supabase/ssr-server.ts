import "server-only";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

// Cliente Supabase con sesión basada en cookies (para Auth en el panel admin).
// Usa la anon key + las cookies de la request (lee/escribe sesión). Devuelve
// null si Supabase no está configurado.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function createSsrClient(): Promise<SupabaseClient | null> {
  if (!url || !anonKey) return null;
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(toSet) {
        try {
          for (const { name, value, options } of toSet) {
            cookieStore.set(name, value, options as CookieOptions);
          }
        } catch {
          // setAll puede fallar si se llama desde un Server Component (sin
          // mutación de cookies). En ese caso el refresh de sesión lo maneja
          // el callback/route handler. Ignorar es seguro.
        }
      },
    },
  });
}
