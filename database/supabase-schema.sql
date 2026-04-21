-- ============================================================
-- BLACK BULLS LAB — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ===== EVENTS TABLE =====
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT DEFAULT '',
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT DEFAULT '',
    description TEXT DEFAULT '',
    timeline JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== GALLERY TABLE =====
CREATE TABLE IF NOT EXISTS gallery (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    src TEXT NOT NULL,
    alt TEXT DEFAULT '',
    category TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== TALENTS TABLE =====
CREATE TABLE IF NOT EXISTS talents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT DEFAULT '',
    image TEXT DEFAULT '',
    code TEXT DEFAULT '',
    bio TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== SETTINGS TABLE =====
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    site_title TEXT DEFAULT 'Black Bulls Lab',
    site_description TEXT DEFAULT '',
    hero_subtitle TEXT DEFAULT '',
    contact_email TEXT DEFAULT '',
    instagram TEXT DEFAULT '',
    admin_password TEXT DEFAULT 'admin123',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===== NEWSLETTER TABLE =====
CREATE TABLE IF NOT EXISTS newsletter (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== ROW LEVEL SECURITY =====

-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE talents ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anon key)
CREATE POLICY "Allow public read" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON talents FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON settings FOR SELECT USING (true);

-- Allow public write access (managed by app-level auth via admin password)
CREATE POLICY "Allow public write" ON events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write" ON gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write" ON talents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write" ON settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public insert" ON newsletter FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON newsletter FOR SELECT USING (true);


-- ============================================================
-- SEED DATA
-- ============================================================

-- Seed Events
INSERT INTO events (id, slug, title, subtitle, date, location, category, image, description, timeline) VALUES
(
    '1',
    'notte-medievale',
    'Notte Medievale: Il Banchetto del Toro',
    'Un viaggio nel 1300 tra spezie, giullari e fuoco',
    '15.06.2026',
    'Sala dei Cavalieri',
    'Dinner Show',
    'https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800',
    E'Il Banchetto del Toro Nero non è una cena. È un portale temporale.\n\nImmergiti in un''atmosfera unica, dove la luce delle torce danza sulle pareti di pietra.',
    '[
        {"time": "20:00", "title": "Accoglienza & Idromele", "description": "Benvenuto con calice di idromele speziato."},
        {"time": "20:45", "title": "Primo Servizio", "description": "Zuppe di farro e legumi, crostoni al lardo e miele."},
        {"time": "21:30", "title": "Spettacolo del Fuoco", "description": "Performance di giocoleria infuocata."},
        {"time": "22:00", "title": "Secondo Servizio", "description": "Stinco di maiale alla brace."},
        {"time": "23:00", "title": "Gran Finale", "description": "Dolci speziati e danza delle spade."}
    ]'::jsonb
),
(
    '2',
    'neon-jazz',
    'Neon Jazz Experience',
    'Jazz, neon e cocktail d''autore',
    '22.06.2026',
    'Rooftop Lounge',
    'Music & Drink',
    'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800',
    'Una serata di musica jazz avvolta da luci neon e cocktail d''autore.',
    '[
        {"time": "21:00", "title": "Apertura", "description": "Welcome drink e dj set d''atmosfera."},
        {"time": "22:00", "title": "Live Jazz", "description": "Performance dal vivo."}
    ]'::jsonb
),
(
    '3',
    'comedy-club',
    'Comedy Club: Risate al Buio',
    'Stand-up comedy al buio completo',
    '29.06.2026',
    'Underground Stage',
    'Comedy',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800',
    'Uno show di stand-up comedy completamente al buio.',
    '[
        {"time": "21:30", "title": "Apertura", "description": "Benvenuto e introduzione."},
        {"time": "22:00", "title": "Show", "description": "Le luci si spengono e le risate iniziano."}
    ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Seed Gallery
INSERT INTO gallery (id, src, alt, category) VALUES
('1', 'https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800', 'Cocktail Art', 'Bar'),
('2', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800', 'Live Jazz', 'Music'),
('3', 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800', 'Comedy Night', 'Stage'),
('4', 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800', 'Gourmet Dish', 'Food'),
('5', 'https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&q=80&w=800', 'Party Vibes', 'Atmosphere'),
('6', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800', 'DJ Set', 'Music')
ON CONFLICT (id) DO NOTHING;

-- Seed Talents
INSERT INTO talents (id, name, role, image, code, bio) VALUES
('chef-rubio', 'Chef Rubio', 'Direttore Culinario', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800', 'RES-001', 'Maestro della cucina creativa.'),
('dj-set', 'Alex V', 'Architetto Sonoro', 'https://images.unsplash.com/photo-1571266028243-371695063ad6?auto=format&fit=crop&q=80&w=800', 'RES-002', 'Sound designer e DJ.')
ON CONFLICT (id) DO NOTHING;

-- Seed Settings
INSERT INTO settings (id, site_title, site_description, hero_subtitle, contact_email, instagram, admin_password) VALUES
(1, 'Black Bulls Lab', 'Il laboratorio underground dove l''intrattenimento diventa scienza', 'Il laboratorio underground dove l''intrattenimento diventa scienza.', 'info@blackbullslab.com', '@blackbullslab', 'admin123')
ON CONFLICT (id) DO NOTHING;

-- ===== GOLDEN VOICE CASTING TABLE =====
CREATE TABLE IF NOT EXISTS public.golden_voice_casting (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    age TEXT,
    signature_song TEXT NOT NULL,
    media_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.golden_voice_casting ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for public golden_voice_casting" ON public.golden_voice_casting
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users golden_voice_casting" ON public.golden_voice_casting
    FOR SELECT USING (true);
