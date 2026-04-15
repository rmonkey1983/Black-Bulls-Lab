"use server";

import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(data: FormData) {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;
    const honeypot = data.get("b_contact_name") as string;
    const turnstile = data.get("cf-turnstile-response") as string;

    // 1. Check honeypot
    if (honeypot) return { error: "Spam detected." };
    
    // 2. Validate required
    if (!name || !email || !message) return { error: "Compila tutti i campi obbligatori." };

    // 3. Verify Turnstile if secret exists
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (secretKey && turnstile) {
        try {
            const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
                method: "POST",
                body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(turnstile)}`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            });
            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
                return { error: "Verifica di sicurezza fallita (Turnstile). Riprova." };
            }
        } catch (err) {
            console.error("Turnstile verification error:", err);
            return { error: "Errore durante la verifica di sicurezza." };
        }
    }

    // 4. Save to DB
    try {
        const { error } = await supabase.from('contacts').insert([{ name, email, subject, message }]);
        if (error) {
             console.error("Supabase insert error (contacts):", error.message);
        }
        
        // 5. Send Notification Email via Resend
        await resend.emails.send({
            from: "Black Bulls Lab <onboarding@resend.dev>",
            to: ["info@blackbullslab.com"],
            subject: `Nuovo contatto: ${name} - ${subject || "Nessun Oggetto"}`,
            html: `
                <h2>Nuova richiesta dal sito Black Bulls Lab</h2>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Oggetto:</strong> ${subject || "Nessuno"}</p>
                <p><strong>Messaggio:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr />
                <p><em>Rispondi entro 24 ore per mantenere gli standard del Lab.</em></p>
            `,
        });

        return { success: true };
    } catch (e: unknown) {
        console.error("submitContact error:", e);
        return { error: "Errore di connessione. Riprova più tardi." };
    }
}
