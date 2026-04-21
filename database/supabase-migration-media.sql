-- ============================================================
-- ADD MEDIA TYPE + STORAGE BUCKET
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Add 'type' column to gallery table (photo/video distinction)
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'image';

-- Create the storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the media bucket
CREATE POLICY "Allow public read on media" ON storage.objects
    FOR SELECT USING (bucket_id = 'media');

-- Allow public uploads to the media bucket (managed by app-level auth)
CREATE POLICY "Allow public upload to media" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'media');

-- Allow public delete on media bucket
CREATE POLICY "Allow public delete on media" ON storage.objects
    FOR DELETE USING (bucket_id = 'media');
