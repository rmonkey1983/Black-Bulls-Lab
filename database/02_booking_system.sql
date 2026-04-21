-- 02_booking_system.sql
-- Run this script in your Supabase SQL Editor to create the necessary tables for the Calendar and Booking system.

-- 1. Table: event_dates (Stores the scheduled dates and their capacities)
CREATE TABLE IF NOT EXISTS public.event_dates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_slug TEXT NOT NULL,
    date DATE NOT NULL,
    capacity INT DEFAULT 30 NOT NULL,
    booked_seats INT DEFAULT 0 NOT NULL,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold_out', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    UNIQUE(event_slug, date)
);

-- Protect against bookings exceeding capacity
ALTER TABLE public.event_dates ADD CONSTRAINT check_capacity CHECK (booked_seats <= capacity);

-- 2. Table: bookings (Stores the actual reservations)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_date_id UUID REFERENCES public.event_dates(id) ON DELETE RESTRICT,
    guest_name TEXT NOT NULL,
    guest_surname TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    quantity INT NOT NULL CHECK (quantity > 0 AND quantity <= 10),
    allergies TEXT,
    occasion TEXT,
    stripe_session_id TEXT UNIQUE NOT NULL,
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'cancelled')),
    amount_paid NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.event_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to event_dates
CREATE POLICY "Allow public read access to event_dates" ON public.event_dates FOR SELECT USING (true);
-- Allow anon/authenticated restricted insert/update on bookings (optional depending on frontend architecture)
CREATE POLICY "Strict public insert on bookings (Pending Only)" 
    ON public.bookings 
    FOR INSERT 
    WITH CHECK (payment_status = 'pending');
-- (In a real app, you might restrict updates/selects on bookings to admins or the user who created it)

-- 4. Set up an RPC function to increment booked_seats atomically
-- This ensures no race conditions when two webhooks fire at the exact same millisecond.
CREATE OR REPLACE FUNCTION increment_booked_seats(target_date_id UUID, seats_to_add INT)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.event_dates
    SET booked_seats = booked_seats + seats_to_add
    WHERE id = target_date_id;
END;
$$;
