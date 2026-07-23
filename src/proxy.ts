import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Block disallowed HTTP methods for /api/ routes
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

  // Bypass for /checkin route if present
  if (path.startsWith("/checkin")) {
    return NextResponse.next();
  }

  const { supabase, supabaseResponse } = await updateSession(request);

  // Optimistic protection for /admin routes (except /admin/login)
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*", "/checkin", "/checkin/:path*"],
};
