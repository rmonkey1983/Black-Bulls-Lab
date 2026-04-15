import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email mancante' }, { status: 400 });

    // 1. Salva in sicurezza su Supabase
    const { error: supabaseError } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (supabaseError) {
      if (supabaseError.code === '23505') return NextResponse.json({ error: 'Email già registrata' }, { status: 400 });
      throw supabaseError;
    }

    // 2. Invia notifica a Julian tramite Resend
    const { error: resendError } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Usa onboarding finché il dominio non è verificato
      to: ['info@blackbullslab.com'],
      subject: '🔥 Nuova iscrizione alla Waitlist di Black Bulls Lab!',
      html: `
        <h2>Hai un nuovo contatto in lista d'attesa!</h2>
        <p>L'indirizzo <strong>${email}</strong> si è appena iscritto per partecipare ai prossimi format.</p>
        <p><em>Troverai questo contatto salvato in automatico nel tuo database Supabase.</em></p>
      `
    });

    if (resendError) {
        console.error('Errore invio mail di notifica:', resendError);
        // Non blocchiamo il processo se Supabase è andato a buon fine, ma logghiamo l'errore
    }

    return NextResponse.json({ success: true, message: 'Email salvata con successo' }, { status: 200 });
  } catch (error) {
    console.error('Errore Waitlist:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
