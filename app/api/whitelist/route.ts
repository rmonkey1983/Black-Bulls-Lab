import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; 
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Inizializza Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nome, cognome, data_nascita, cap, email, cellulare, consenso_privacy, consenso_marketing } = data;

    // 1. Validazione campi obbligatori
    if (!nome || !cognome || !data_nascita || !cap || !email || !consenso_privacy) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti.' }, { status: 400 });
    }

    // 2. Controllo duplicati (Regola: solo nuovi utenti)
    const { data: existingUser } = await supabase
      .from('whitelist_bugiardo')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Questa email è già registrata. Solo i nuovi utenti possono partecipare all\'estrazione.' },
        { status: 409 } 
      );
    }

    // 3. Inserimento iniziale per farsi restituire l'ID progressivo da Supabase
    const { data: newUser, error: insertError } = await supabase
      .from('whitelist_bugiardo')
      .insert([
        {
          nome,
          cognome,
          data_nascita,
          cap,
          email,
          cellulare,
          consenso_privacy,
          consenso_marketing,
        }
      ])
      .select('id') 
      .single();

    if (insertError) {
      console.error('Errore inserimento Supabase:', insertError);
      return NextResponse.json({ error: 'Errore durante il salvataggio dei dati.' }, { status: 500 });
    }

    const userId = newUser.id;

    // 4. Formattazione del numero progressivo
    let ticketNumber = '';
    
    if (userId < 100) {
      // Es: ID 1 diventa BGL-01
      ticketNumber = `BGL-${userId.toString().padStart(2, '0')}`;
    } else {
      // Es: ID 100 diventa BGL-0100
      ticketNumber = `BGL-${userId.toString().padStart(4, '0')}`;
    }

    // 5. Aggiornamento del record con il numero definitivo
    const { error: updateError } = await supabase
      .from('whitelist_bugiardo')
      .update({ numero_biglietto: ticketNumber })
      .eq('id', userId);

    if (updateError) {
      console.error('Errore aggiornamento numero:', updateError);
      return NextResponse.json({ error: 'Errore durante la generazione del biglietto.' }, { status: 500 });
    }

    // --- NUOVO BLOCCO: INVIO EMAIL CON RESEND ---
    try {
      await resend.emails.send({
        from: 'Black Bulls Lab <info@blackbullslab.com>', // Sostituisci con la mail che vuoi far apparire al mittente
        to: email, // La mail che l'utente ha inserito nel form
        subject: 'Il tuo codice per A Cena con il Bugiardo 🎭',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d32f2f;">Benvenuto in White List, ${nome}!</h2>
            <p>La tua iscrizione è confermata e ti sei assicurato la possibilità di partecipare all'estrazione.</p>
            <p>Il tuo numero univoco per l'estrazione di una cena gratuita per 2 persone è:</p>
            <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
              <strong style="font-size: 24px; color: #000;">${ticketNumber}</strong>
            </div>
            <p>Conserva questo codice. L'estrazione avverrà una settimana prima dell'evento e ti contatteremo se sarai tu a vincere!</p>
            <br/>
            <p>A presto,<br/><strong>Il team di Black Bulls Lab</strong></p>
          </div>
        `,
      });
    } catch (emailError) {
      // Usiamo un try-catch separato per l'email: se l'email fallisce, 
      // l'utente è comunque salvato a database e non blocchiamo il processo.
      console.error('Errore invio email con Resend:', emailError);
    }
    // --- FINE BLOCCO INVIO EMAIL ---

    // 7. Successo
    return NextResponse.json(
      { 
        success: true, 
        message: 'Iscrizione completata!',
        ticketNumber: ticketNumber 
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error('Errore API Route:', error);
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 });
  }
}
