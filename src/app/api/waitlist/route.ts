import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email mancante' }, { status: 400 });

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') return NextResponse.json({ error: 'Email già registrata' }, { status: 400 });
      throw error;
    }

    return NextResponse.json({ success: true, message: 'Email salvata con successo' }, { status: 200 });
  } catch (error) {
    console.error('Errore Waitlist:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
