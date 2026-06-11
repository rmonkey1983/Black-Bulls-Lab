"use server";

import { supabase } from "@/lib/supabase";

export interface ContactSubmissionData {
    name: string;
    email: string;
    experience: string;
    message: string;
    b_contact_name?: string; // honeypot
}

export async function submitContactForm(data: ContactSubmissionData) {
    const { name, email, experience, message, b_contact_name } = data;

    // 1. Honeypot check (Spam prevention)
    if (b_contact_name) {
        return { success: false, error: "Spam detected." };
    }

    // 2. Validation
    if (!name || !email || !experience || !message) {
        return { success: false, error: "Tutti i campi sono obbligatori per procedere." };
    }

    if (!email.includes("@")) {
        return { success: false, error: "Inserisci un indirizzo email valido." };
    }

    try {
        // 3. Database Insertion (Graceful fallback if contact_submissions table doesn't exist)
        try {
            const { error: dbError } = await supabase
                .from("contact_submissions")
                .insert([
                    {
                        name,
                        email,
                        experience,
                        message,
                        created_at: new Date().toISOString(),
                    }
                ]);

            if (dbError) {
                console.warn("Non-critical: Supabase insert failed. Falling back to email dispatch only.", dbError.message);
            }
        } catch (dbErr) {
            console.warn("Non-critical: Database connection or table absent. Falling back to email.", dbErr);
        }

        // 4. Send Premium Email Notification using Resend
        try {
            const { Resend } = await import("resend");
            
            if (process.env.RESEND_API_KEY) {
                const resend = new Resend(process.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: "Black Bulls Lab <info@blackbullslab.com>",
                    to: ["info@blackbullslab.com"],
                    subject: `[Contatti Lab] Nuova Richiesta Esperienza: ${name}`,
                    html: `
                        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #060606; color: #ffffff; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #c8a96b;">
                            <h2 style="color: #c8a96b; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; border-bottom: 1px solid rgba(200, 169, 107, 0.2); padding-bottom: 10px;">
                                NUOVA RICHIESTA CONTATTO
                            </h2>
                            <p style="font-size: 16px; margin: 10px 0;"><strong style="color: #c8a96b;">Nome:</strong> ${name}</p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong style="color: #c8a96b;">Email:</strong> <a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a></p>
                            <p style="font-size: 16px; margin: 10px 0;"><strong style="color: #c8a96b;">Esperienza Selezionata:</strong> <span style="background-color: rgba(200, 169, 107, 0.1); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(200, 169, 107, 0.3); font-weight: bold;">${experience}</span></p>
                            
                            <div style="margin-top: 30px; background-color: rgba(255, 255, 255, 0.03); border-left: 3px solid #c8a96b; padding: 20px; border-radius: 4px;">
                                <p style="margin: 0; font-size: 15px; font-style: italic; line-height: 1.6; color: #dcdcdc;">
                                    "${message}"
                                </p>
                            </div>
                            
                            <hr style="border: 0; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 30px 0;" />
                            <p style="font-size: 11px; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; letter-spacing: 1px; text-align: center;">
                                BLACK BULLS LAB // IMMERSIVE EXPERIENCES PROTOCOL
                            </p>
                        </div>
                    `,
                });
            } else {
                console.warn("RESEND_API_KEY is not defined in environment variables. Email notification skipped.");
            }
        } catch (emailErr) {
            console.error("Non-critical error: failed to send contact notification email", emailErr);
        }

        return { success: true };
    } catch (err) {
        console.error("Unexpected error in contact submission:", err);
        return {
            success: false,
            error: "Si è verificato un errore imprevisto. Riprova più tardi."
        };
    }
}
