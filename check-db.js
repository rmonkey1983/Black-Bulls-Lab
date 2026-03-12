const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
    console.log("Checking tables...");
    const tables = ["events", "gallery", "talents", "settings"];

    for (const table of tables) {
        const { data, error } = await supabase.from(table).select("*").limit(1);
        if (error) {
            console.log(`❌ Table '${table}' ERROR:`, error.message);
        } else {
            console.log(`✅ Table '${table}' OK`);
        }
    }
}

checkTables();
