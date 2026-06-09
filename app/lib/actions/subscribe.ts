"use server";

import { getServiceClient } from "../supabase/server";

// Server Action de suscripción al feed semanal. Inserta en `suscriptores` con
// la service-role key (el anon nunca toca esa tabla). Idempotente: re-suscribir
// el mismo email no duplica ni falla.

export type SubscribeState = {
  status: "idle" | "ok" | "invalid" | "error" | "unconfigured";
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const lang = String(formData.get("lang") ?? "").trim() || null;

  if (!EMAIL_RE.test(email) || email.length > 200) {
    return { status: "invalid" };
  }

  const sb = getServiceClient();
  if (!sb) return { status: "unconfigured" };

  const { error } = await sb
    .from("suscriptores")
    .upsert(
      { email, lang, source: "radar" },
      { onConflict: "email", ignoreDuplicates: true },
    );

  if (error) return { status: "error" };
  return { status: "ok" };
}
