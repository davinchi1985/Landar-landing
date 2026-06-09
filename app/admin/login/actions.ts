"use server";

import { headers } from "next/headers";
import { createSsrClient } from "../../lib/supabase/ssr-server";

export type LoginState = { status: "idle" | "sent" | "error"; message?: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Envía el magic-link de login. El redirectTo se arma del host de la request
// (sirve igual en local y en prod); ese URL debe estar en la allow-list de
// Supabase → Auth → URL Configuration → Redirect URLs.
export async function requestMagicLink(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { status: "error", message: "Email inválido." };

  const sb = await createSsrClient();
  if (!sb) return { status: "error", message: "Supabase no configurado todavía." };

  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  // Sin query extra: así matchea exacto con la allow-list de Supabase. El
  // callback ya manda a /admin por default. El middleware cubre el caso de
  // fallback al Site URL (code que cae en la raíz).
  const redirectTo = `${proto}://${host}/auth/callback`;

  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
  });
  if (error) return { status: "error", message: error.message };
  return { status: "sent" };
}
