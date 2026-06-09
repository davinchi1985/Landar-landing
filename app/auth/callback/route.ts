import { NextResponse } from "next/server";
import { createSsrClient } from "../../lib/supabase/ssr-server";

// Callback del magic-link: intercambia el code por sesión (PKCE) y redirige.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  if (code) {
    const sb = await createSsrClient();
    if (sb) {
      const { error } = await sb.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/admin/login?error=auth`);
}
