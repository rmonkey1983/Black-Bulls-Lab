import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const WAITLIST_PATH = path.join(process.cwd(), "data", "waitlist.json");

// Simple email regex
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface WaitlistEntry {
    email: string;
    createdAt: string;
}

async function readWaitlist(): Promise<WaitlistEntry[]> {
    try {
        const raw = await fs.readFile(WAITLIST_PATH, "utf-8");
        return JSON.parse(raw) as WaitlistEntry[];
    } catch {
        return [];
    }
}

async function writeWaitlist(entries: WaitlistEntry[]): Promise<void> {
    await fs.mkdir(path.dirname(WAITLIST_PATH), { recursive: true });
    await fs.writeFile(WAITLIST_PATH, JSON.stringify(entries, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null);
        const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

        if (!email || !EMAIL_RE.test(email)) {
            return NextResponse.json({ error: "Indirizzo email non valido." }, { status: 400 });
        }

        const entries = await readWaitlist();

        // Deduplicate — silently succeed if already present
        if (entries.some((e) => e.email === email)) {
            console.log(`[waitlist] already registered: ${email}`);
            return NextResponse.json({ ok: true, duplicate: true });
        }

        const newEntry: WaitlistEntry = { email, createdAt: new Date().toISOString() };
        entries.push(newEntry);
        await writeWaitlist(entries);

        console.log(`[waitlist] new signup: ${email} (total: ${entries.length})`);
        return NextResponse.json({ ok: true }, { status: 201 });
    } catch (err) {
        console.error("[waitlist] error:", err);
        return NextResponse.json({ error: "Errore del server. Riprova più tardi." }, { status: 500 });
    }
}

// GET — read the list (useful for admin inspection in dev)
export async function GET() {
    try {
        const entries = await readWaitlist();
        return NextResponse.json({ count: entries.length, entries });
    } catch {
        return NextResponse.json({ error: "Unable to read waitlist." }, { status: 500 });
    }
}
