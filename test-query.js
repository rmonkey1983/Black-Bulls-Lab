const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEvent() {
    const slug = 'mmlytqjbq2s1y'; // From user screenshot
    console.log(`Checking DB for event slug: ${slug}...`);
    
    // Check by slug
    const { data: event, error: eventErr } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();
        
    if (eventErr) {
        console.error("Error looking up event by slug:", eventErr);
    } else {
        console.log("Found event by slug:", event);
    }

    // Dump all events just to double check what is in there
    const { data: allEvents, error: allErr } = await supabase
        .from('events')
        .select('id, slug, title');
        
    console.log("All events currently in DB:", allEvents);
}

checkEvent();
