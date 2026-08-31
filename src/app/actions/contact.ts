"use server";

export type LeadType = "corporate" | "private" | "partner" | "contact";

export interface ContactSubmissionData {
    name: string;
    email: string;
    leadType: LeadType;
    message?: string;
    phone?: string;
    company?: string;
    eventType?: string;
    experience?: string;
    guests?: string;
    location?: string;
    period?: string;
    objective?: string;
    format?: string;
    venue?: string;
    venueType?: string;
    capacity?: string;
    city?: string;
    b_contact_name?: string;
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[character] ?? character);
}

function formatField(label: string, value?: string): string {
    const trimmed = typeof value === "string" ? value.trim() : "";
    return trimmed ? `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(trimmed)}</p>` : "";
}

export async function submitContactForm(data: ContactSubmissionData) {
    if (data.b_contact_name) {
        return { success: false, error: "Spam detected." };
    }

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";

    const leadLabels: Record<LeadType, string> = {
        corporate: "Evento aziendale",
        private: "Evento privato",
        partner: "Proposta location partner",
        contact: "Contatto generale",
    };

    if (!name || !email || !leadLabels[data.leadType]) {
        return { success: false, error: "Nome, email e tipo di richiesta sono obbligatori." };
    }

    if (!email.includes("@")) {
        return { success: false, error: "Inserisci un indirizzo email valido." };
    }

    const message = typeof data.message === "string" ? data.message.trim() : "";
    const objective = typeof data.objective === "string" ? data.objective.trim() : "";
    if (!message && !objective) {
        return { success: false, error: "Aggiungi un messaggio o un obiettivo alla richiesta." };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("Contact submission unavailable: RESEND_API_KEY is not configured.");
        return { success: false, error: "Servizio temporaneamente non disponibile. Riprova più tardi." };
    }

    const details = [
        formatField("Nome", name),
        formatField("Email", email),
        formatField("Telefono", data.phone),
        formatField("Azienda", data.company),
        formatField("Tipo evento", data.eventType),
        formatField("Esperienza", data.experience),
        formatField("Partecipanti", data.guests),
        formatField("Città/location", data.location),
        formatField("Periodo", data.period),
        formatField("Format", data.format),
        formatField("Locale", data.venue),
        formatField("Tipologia location", data.venueType),
        formatField("Capienza indicativa", data.capacity),
        formatField("Città", data.city),
        formatField("Obiettivo", objective),
        formatField("Messaggio", message),
    ].filter(Boolean).join("");

    try {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
            from: "Black Bulls Lab <info@blackbullslab.com>",
            to: ["info@blackbullslab.com"],
            reply_to: email,
            subject: `[Contatti Lab] ${leadLabels[data.leadType]}`,
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #060606; color: #ffffff; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #c8a96b;">
                    <h1 style="color: #c8a96b; font-size: 22px;">NUOVA RICHIESTA</h1>
                    <p>${escapeHtml(leadLabels[data.leadType])}</p>
                    <div style="line-height: 1.6;">${details}</div>
                </div>
            `,
        });

        if (error) {
            console.error("Contact notification failed:", error.message);
            return { success: false, error: "Non è stato possibile inviare la richiesta. Riprova più tardi." };
        }

        return { success: true };
    } catch (error) {
        console.error("Contact notification failed:", error instanceof Error ? error.message : "unknown error");
        return { success: false, error: "Non è stato possibile inviare la richiesta. Riprova più tardi." };
    }
}
