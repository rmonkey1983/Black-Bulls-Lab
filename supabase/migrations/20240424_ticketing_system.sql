-- ============================================================
-- TICKETING SYSTEM SCHEMA & RPC
-- ============================================================

-- Ensure the tables match the user requirements exactly

-- Update or Create Events Table
-- Note: We use available_slots for concurrency management
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    format_id TEXT NOT NULL,
    title TEXT NOT NULL,
    available_slots INT NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Bookings Table: Tracks the Stripe transaction
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id),
    customer_email TEXT NOT NULL,
    stripe_session_id TEXT UNIQUE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Tickets Table: Individual tickets for QR codes
CREATE TABLE IF NOT EXISTS public.tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Used for QR Code
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id),
    guest_name TEXT NOT NULL,
    allergies TEXT,
    is_checked_in BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- RPC: Handle Atomic Booking
-- This handles concurrency (SELECT FOR UPDATE) and multi-table insertion
CREATE OR REPLACE FUNCTION public.handle_event_booking(
    p_event_id UUID,
    p_customer_email TEXT,
    p_stripe_session_id TEXT,
    p_total_amount DECIMAL,
    p_ticket_quantity INT,
    p_guest_name TEXT,
    p_allergies TEXT
)
RETURNS JSON AS $$
DECLARE
    v_booking_id UUID;
    v_available INT;
    v_result JSON;
BEGIN
    -- 1. Lock the event row for update to prevent concurrent overbooking
    SELECT available_slots INTO v_available
    FROM public.events
    WHERE id = p_event_id
    FOR UPDATE;

    -- 2. Check availability
    IF v_available < p_ticket_quantity THEN
        RAISE EXCEPTION 'Insufficient slots available';
    END IF;

    -- 3. Decrement slots
    UPDATE public.events
    SET available_slots = available_slots - p_ticket_quantity
    WHERE id = p_event_id;

    -- 4. Create Booking record
    INSERT INTO public.bookings (event_id, customer_email, stripe_session_id, total_amount)
    VALUES (p_event_id, p_customer_email, p_stripe_session_id, p_total_amount)
    RETURNING id INTO v_booking_id;

    -- 5. Create N Ticket records
    FOR i IN 1..p_ticket_quantity LOOP
        INSERT INTO public.tickets (booking_id, event_id, guest_name, allergies)
        VALUES (v_booking_id, p_event_id, p_guest_name, p_allergies);
    END LOOP;

    -- 6. Return success with the IDs
    v_result := json_build_object(
        'success', true,
        'booking_id', v_booking_id,
        'event_id', p_event_id,
        'tickets_created', p_ticket_quantity
    );

    RETURN v_result;

EXCEPTION WHEN OTHERS THEN
    -- Rollback is automatic in PL/pgSQL when an exception is raised
    RETURN json_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
