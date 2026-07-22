-- ============================================================
-- MIGRATION 03: Add unit_price_cents to events table
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Add unit_price_cents column with strict positive constraint
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS unit_price_cents INTEGER CHECK (unit_price_cents > 0);

-- 2. Backfill existing events that have a legacy 'price' column or set default (5000 cents = €50.00)
UPDATE public.events 
SET unit_price_cents = 5000 
WHERE unit_price_cents IS NULL;

-- 3. Comment for documentation
COMMENT ON COLUMN public.events.unit_price_cents IS 'Canonical event ticket price stored in integer cents (e.g., 5000 = €50.00). Must be strictly positive.';
