-- ============================================================
-- FIX SCHEMA FOR EVENTS TABLE
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Ensure columns exist in the 'events' table
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Dinner Show';
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS location_name TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS location_address TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS event_date TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS total_slots INTEGER DEFAULT 0;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS available_slots INTEGER DEFAULT 0;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS location TEXT;

-- 2. Ensure constraints are met (slug must be unique)
-- First, clean up any null slugs if necessary (not needed for IF NOT EXISTS)
-- CREATE UNIQUE INDEX IF NOT EXISTS events_slug_idx ON public.events (slug);

-- 3. Reload PostgREST cache (this happens automatically when DDL is run)
-- But just in case, we can run a dummy command
COMMENT ON TABLE public.events IS 'Table updated on 2026-05-02 for new event management system';

-- 4. Enable RLS (Service role will bypass this, but for safety)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow authenticated write" ON public.events;
CREATE POLICY "Allow authenticated write" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public read" ON public.events;
CREATE POLICY "Allow public read" ON public.events FOR SELECT USING (true);
