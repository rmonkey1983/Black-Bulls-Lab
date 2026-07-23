import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  // Method guard for API routes
  if (
    path.startsWith("/api/") &&
    request.method !== "GET" &&
    request.method !== "POST" &&
    request.method !== "PUT" &&
    request.method !== "PATCH" &&
    request.method !== "DELETE"
  ) {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  // Bypass staff checkin route
  if (path.startsWith("/checkin")) {
    return NextResponse.next();
  }

  let sessionResult;
  try {
    sessionResult = await updateSession(request);
  } catch {
    // Fail-closed protection
    if (path.startsWith("/api/admin")) {
      return NextResponse.json(
        { error: "Non autenticato. Sessione o configurazione non valida." },
        {
          status: 401,
          headers: {
            "Cache-Control": "private, no-store, max-age=0, must-revalidate",
            "Content-Type": "application/json",
          },
        }
      );
    }
    if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", `${path}${search}`);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const { supabase, supabaseResponse } = sessionResult;

  // Defensive protection for /api/admin/* (returns JSON 401, never HTML redirect)
  if (path.startsWith("/api/admin")) {
    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
      return NextResponse.json(
        { error: "Non autenticato. Sessione assente o non valida." },
        {
          status: 401,
          headers: {
            "Cache-Control": "private, no-store, max-age=0, must-revalidate",
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  // Optimistic protection for /admin/* pages (except /admin/login)
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", `${path}${search}`);
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*", "/checkin", "/checkin/:path*"],
};
