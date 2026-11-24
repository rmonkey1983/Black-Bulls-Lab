import { NextResponse } from "next/server";
import { submitContactForm } from "@/app/actions/contact";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: "Formato richiesta non valido." }, { status: 400 });
    }
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!company || !name || !email || !phone || !message) {
      return NextResponse.json({ error: "Mancano campi obbligatori" }, { status: 400 });
    }

    const result = await submitContactForm({
      b_contact_name: typeof body.b_contact_name === "string" ? body.b_contact_name : "",
      guests: typeof body.guests === "string" ? body.guests : "",
      leadType: "corporate",
      company,
      name,
      email,
      phone,
      eventType: "Evento aziendale",
      objective: message,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Impossibile inviare la richiesta" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Corporate contact request failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
