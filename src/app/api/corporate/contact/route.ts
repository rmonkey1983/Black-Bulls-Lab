import { NextResponse } from "next/server";
import { submitContactForm } from "@/app/actions/contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!company || !name || !email || !phone || !message) {
      return NextResponse.json({ error: "Mancano campi obbligatori" }, { status: 400 });
    }

    const result = await submitContactForm({
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
