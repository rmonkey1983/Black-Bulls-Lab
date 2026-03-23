"use server";

import { supabase } from "@/lib/supabase";

export async function subscribeToNewsletter(email: string) {
    if (!email || !email.includes("@")) {
        return { error: "Email non valida." };
    }

    try {
        const { error } = await supabase
            .from("newsletter")
            .insert([{ email }]);

        if (error) {
            if (error.code === '23505') { // Postgres unique violation error code
                return { error: "Questa email è già iscritta." };
            }
            console.error("Newsletter subscription error:", error);
            return { error: "Si è verificato un errore. Riprova più tardi." };
        }

        return { success: true };
    } catch (err) {
        console.error("Newsletter exception:", err);
        return { error: "Si è verificato un errore di connessione." };
    }
}
