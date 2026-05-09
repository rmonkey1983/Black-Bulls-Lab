import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { ticketId } = await req.json();

    if (!ticketId) {
      return NextResponse.json({ error: 'ID Biglietto mancante' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Recuperiamo il biglietto e i dati della prenotazione associata
    // Usiamo guest_name dal ticket per il nome individuale dell'ospite
    const { data: ticket, error: ticketError } = await supabaseAdmin
      .from('tickets')
      .select('*, bookings(customer_email)')
      .eq('id', ticketId)
      .single();

    if (ticketError || !ticket) {
      console.error('❌ Ticket not found:', ticketError?.message);
      return NextResponse.json({ error: 'Biglietto non trovato o non valido' }, { status: 404 });
    }

    // 2. Controllo sicurezza: è già stato usato?
    if (ticket.is_scanned) {
      return NextResponse.json({ 
        error: 'Biglietto già utilizzato!', 
        scannedAt: ticket.scanned_at 
      }, { status: 400 });
    }

    // 3. AGGIORNAMENTO: Segna biglietto come scansionato + Crea profilo gioco
    //playerName preso dal ticket (guest_name) per avere il nome specifico della persona
    const playerName = ticket.guest_name || 'Ospite';
    const playerEmail = (ticket.bookings as any)?.customer_email || '';

    // Segnamo il biglietto come scansionato (Update atomico)
    const { error: updateError } = await supabaseAdmin
      .from('tickets')
      .update({ 
        is_scanned: true, 
        scanned_at: new Date().toISOString() 
      })
      .eq('id', ticketId);

    if (updateError) {
        console.error('❌ Error updating ticket status:', updateError.message);
        throw updateError;
    }

    // Creiamo il profilo nel gioco "A Cena Con Il Bugiardo"
    // Nota: Assicurati che la tabella 'game_profiles' esista con queste colonne
    const { data: gameProfile, error: gameError } = await supabaseAdmin
      .from('game_profiles')
      .insert([{
        ticket_id: ticketId,
        player_name: playerName,
        player_email: playerEmail,
        game_role: 'investigatore', // Ruolo base di partenza
        is_active: true
      }])
      .select()
      .single();

    if (gameError) {
        console.error('❌ Error creating game profile:', gameError.message);
        // Anche se il profilo gioco fallisce, il ticket è segnato come scansionato.
        // In produzione potresti voler gestire questo con una transazione RPC.
        return NextResponse.json({
            success: true,
            message: `Check-in completato per ${playerName}, ma errore creazione profilo gioco.`,
            warning: gameError.message
        });
    }

    console.log(`✅ Check-in completato per ${playerName} (Profile: ${gameProfile.id})`);

    return NextResponse.json({
      success: true,
      message: `Check-in completato per ${playerName}`,
      profileId: gameProfile.id
    });

  } catch (error: any) {
    console.error('❌ Errore critico Scan API:', error);
    return NextResponse.json({ error: 'Errore interno al server durante lo scan' }, { status: 500 });
  }
}
