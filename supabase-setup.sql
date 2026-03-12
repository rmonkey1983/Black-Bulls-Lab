-- Schema per Black Bulls Lab Admin Panel

-- 1. Tabella Eventi
CREATE TABLE IF NOT EXISTS public.events (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  date text NOT NULL,
  location text NOT NULL,
  category text NOT NULL,
  image text,
  description text,
  timeline jsonb DEFAULT '[]'::jsonb,
  price numeric,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabella Galleria
CREATE TABLE IF NOT EXISTS public.gallery (
  id text PRIMARY KEY,
  src text NOT NULL,
  alt text NOT NULL,
  category text NOT NULL,
  type text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabella Ricercatori (Talents)
CREATE TABLE IF NOT EXISTS public.talents (
  id text PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  image text NOT NULL,
  code text NOT NULL,
  bio text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabella Impostazioni
CREATE TABLE IF NOT EXISTS public.settings (
  id integer PRIMARY KEY DEFAULT 1,
  site_title text NOT NULL,
  site_description text NOT NULL,
  hero_subtitle text NOT NULL,
  contact_email text NOT NULL,
  instagram text NOT NULL,
  admin_password text NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Inserimento impostazioni di default (se non esistono)
INSERT INTO public.settings (id, site_title, site_description, hero_subtitle, contact_email, instagram, admin_password)
VALUES (1, 'Black Bulls Lab', 'Il laboratorio underground dove l''intrattenimento diventa scienza', 'Il laboratorio underground dove l''intrattenimento diventa scienza.', 'info@blackbullslab.it', '@blackbullslab', 'admin123')
ON CONFLICT (id) DO NOTHING;

-- PERMESSI TEMPORANEI: Abilitazione Row Level Security e Policy Anonime
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations for anon user
CREATE POLICY "Allow all operations for anon users" ON public.events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for anon users" ON public.gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for anon users" ON public.talents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for anon users" ON public.settings FOR ALL USING (true) WITH CHECK (true);

-- STORAGE BUCKET: Media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT DO NOTHING;
CREATE POLICY "Allow all operations for anon users" ON storage.objects FOR ALL USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');
