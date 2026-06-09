import "server-only";
import { redirect } from "next/navigation";
import { createSsrClient } from "./supabase/ssr-server";

// Whitelist de emails admin (coma-separada). Default: el fundador.
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "cohen.david@gmail.com")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export type AdminUser = { id: string; email: string };

/** Devuelve el usuario admin autenticado y whitelisted, o null. */
export async function getAdminUser(): Promise<AdminUser | null> {
  const sb = await createSsrClient();
  if (!sb) return null;
  // getUser() valida el token contra Supabase (más seguro que getSession).
  const {
    data: { user },
  } = await sb.auth.getUser();
  const email = user?.email?.toLowerCase();
  if (!user || !email) return null;
  if (ADMIN_EMAILS.length > 0 && !ADMIN_EMAILS.includes(email)) return null;
  return { id: user.id, email };
}

/** Exige sesión admin; si no, redirige al login. */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
