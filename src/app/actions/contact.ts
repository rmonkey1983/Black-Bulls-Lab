"use server";

import { supabase } from "@/lib/supabase";

export async function submitContact(data: FormData) {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;
    const honeypot = data.get("honeypot") as string;
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

    // 4. Save to DB (optional/graceful fallback)
    try {
        const { error } = await supabase.from('contacts').insert([{ name, email, subject, message }]);
        if (error) {
             console.error("Supabase insert error (contacts):", error.message);
             // Return success anyway to not block UI if table doesn't exist yet
        }
        
        console.log("Nuovo contatto ricevuto:", { name, email, subject, message });
        return { success: true };
    } catch (e: any) {
        console.error("submitContact error:", e);
        return { error: "Errore di connessione al database. Riprova più tardi." };
    }
}
