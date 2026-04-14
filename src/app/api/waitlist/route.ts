import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null);
        const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

        if (!email) {
            return NextResponse.json({ error: "Email missing" }, { status: 400 });
        }

        console.log(`[WAITLIST LEAD]: ${email}`);
        
        // TODO: Integrare Resend o Supabase per salvare i lead (Non usare file JSON locali)
        
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[waitlist] error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

