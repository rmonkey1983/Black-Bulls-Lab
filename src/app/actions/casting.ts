"use server";

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitCasting(formData: FormData) {
    // Extract fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const age = formData.get("age") as string;
    const signature_song = formData.get("signature_song") as string;
    const media_link = formData.get("media_link") as string;

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

        return { success: true, message: "CANDIDATURA INVIATA CON SUCCESSO!" };
    } catch (err) {
        console.error("Unexpected error submitting casting:", err);
        return {
            success: false,
            error: "Si è verificato un errore imprevisto. Riprova più tardi."
        };
    }
}
