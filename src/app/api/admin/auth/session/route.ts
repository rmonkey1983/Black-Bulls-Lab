import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const headers = {
    "Cache-Control": "private, no-store, max-age=0, must-revalidate",
    "Content-Type": "application/json",
  };

  const auth = await requireAdmin();

  if (!auth.authorized) {
    return NextResponse.json(
      { authenticated: false, error: auth.error },
      { status: auth.status, headers }
    );
  }

  return NextResponse.json(
    { authenticated: true, email: auth.email },
    { status: 200, headers }
  );
}

export async function POST() {
  return new Response(null, { status: 405, headers: { Allow: "GET" } });
}

export async function PUT() {
  return new Response(null, { status: 405, headers: { Allow: "GET" } });
}

export async function PATCH() {
  return new Response(null, { status: 405, headers: { Allow: "GET" } });
}

export async function DELETE() {
  return new Response(null, { status: 405, headers: { Allow: "GET" } });
}
