import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Red de seguridad para el login admin: si Supabase manda el `code` de
// auth a la raíz (fallback al Site URL en vez de a /auth/callback), lo
// reencaminamos al callback que lo procesa.
export function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;
  const code = searchParams.get("code");
  if (code && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/callback";
    if (!url.searchParams.get("next")) url.searchParams.set("next", "/admin");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
