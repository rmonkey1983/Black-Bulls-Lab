import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  // Interroghiamo l'information_schema per vedere le colonne reali
  const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'bookings' });
  
  if (error) {
    // Se non c'è una funzione RPC, proviamo con una query grezza se possibile (anche se Supabase non lo permette facilmente via client)
    // Proviamo allora a fare una SELECT di una riga se esiste
    const { data: rows } = await supabase.from('bookings').select('*').limit(1);
    if (rows && rows.length > 0) {
       console.log("COLONNE:", Object.keys(rows[0]));
    } else {
       console.log("Tabella vuota e niente RPC. Provo l'ultima spiaggia: leggere il file dataStore.ts di nuovo.");
    }
  } else {
    console.log("COLONNE:", data);
  }
}

check();
