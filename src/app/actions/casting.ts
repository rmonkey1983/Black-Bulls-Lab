"use server";

import { supabase } from "@/lib/supabase";

export async function submitCasting(formData: FormData) {
    // Extract fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const age = formData.get("age") as string;
    const signature_song = formData.get("signature_song") as string;
    const media_link = formData.get("media_link") as string;

    const honeypot = formData.get("b_contact_name") as string;

    // 1. Check honeypot
    if (honeypot) return { success: false, error: "Spam detected." };

    // Basic validation
    if (!name || !email || !phone || !signature_song) {
        return { success: false, error: "Tutti i campi obbligatori devono essere compilati." };
    }

    if (!email.includes("@")) {
        return { success: false, error: "Inserisci un indirizzo email valido." };
    }

    try {
        const { error } = await supabase
            .from("golden_voice_casting")
            .insert([
                {
                    name,
                    email,
                    phone,
                    age,
                    signature_song,
                    media_link,
                }
            ]);

        if (error) {
            console.error("Supabase insert error:", error);
            return {
                success: false,
                error: "Si è verificato un errore durante l'invio della candidatura. Riprova più tardi."
            };
        }

        // Send Notification Email to Admin
        try {
            const { Resend } = await import("resend");
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
                from: "Black Bulls Lab <info@blackbullslab.com>",
                to: ["info@blackbullslab.com"],
                subject: `Nuova Candidatura Casting: ${name}`,
                html: `
                    <h2>Nuova candidatura per The Golden Voice</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Telefono:</strong> ${phone}</p>
                    <p><strong>Età:</strong> ${age}</p>
                    <p><strong>Brano:</strong> ${signature_song}</p>
                    <p><strong>Media Link:</strong> ${media_link || "Nessuno"}</p>
                    <hr />
                    <p><em>Gestisci la candidatura dalla dashboard Supabase.</em></p>
                `,
            });
        } catch (emailErr) {
            console.error("Non-critical error: failed to send casting notification email", emailErr);
        }

        return { success: true, message: "CANDIDATURA INVIATA CON SUCCESSO!" };
    } catch (err) {
        console.error("Unexpected error submitting casting:", err);
        return {
            success: false,
            error: "Si è verificato un errore imprevisto. Riprova più tardi."
        };
    }
}
