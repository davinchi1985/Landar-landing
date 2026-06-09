import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSsrClient } from "../../lib/supabase/ssr-server";

// Verificación de magic-link por token_hash (flujo robusto, sin code-verifier
// en cookie → funciona aunque el link se abra en otro contexto). Es el patrón
// server-side recomendado por Supabase. El email template apunta acá:
//   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/admin";

  if (token_hash && type) {
    const sb = await createSsrClient();
    if (sb) {
      const { error } = await sb.auth.verifyOtp({ type, token_hash });
      if (!error) return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/admin/login?error=auth`);
}
