import { NextResponse } from "next/server";
import { submitContactForm } from "@/app/actions/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Tutti i campi (Nome, Email, Messaggio) sono obbligatori." },
        { status: 400 }
      );
    }

    // Call the existing server action
    const result = await submitContactForm({
      name,
      email,
      leadType: "contact",
      experience: "Contatto generale",
      message,
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || "Impossibile salvare la richiesta." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in /api/contact route:", error);
    return NextResponse.json(
      { success: false, error: "Si è verificato un errore interno del server. Riprova più tardi." },
      { status: 500 }
    );
  }
}
