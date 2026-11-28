-- Website checkout only. No prices are invented or backfilled.
-- Apply before deploying the webhook that calls fulfill_site_checkout.
BEGIN;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS unit_price_cents integer
  CHECK (unit_price_cents IS NULL OR unit_price_cents > 0);

CREATE OR REPLACE FUNCTION public.fulfill_site_checkout(
  p_event_id uuid,
  p_session_id text,
  p_customer_email text,
  p_customer_name text,
  p_total_amount numeric,
  p_guest_names text[],
  p_allergies text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_booking public.bookings%ROWTYPE;
  v_quantity integer := cardinality(p_guest_names);
  v_available integer;
  v_ticket_count integer;
BEGIN
  IF p_session_id IS NULL OR length(p_session_id) = 0
     OR p_customer_email IS NULL OR length(p_customer_email) = 0
     OR p_customer_name IS NULL OR length(p_customer_name) = 0
     OR p_total_amount IS NULL OR p_total_amount <= 0
     OR v_quantity IS NULL OR v_quantity NOT BETWEEN 1 AND 10 THEN
    RAISE EXCEPTION 'Invalid checkout data';
  END IF;

  -- Serialize retries even if the same session is submitted with another event.
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_session_id, 0));
  SELECT * INTO v_booking FROM public.bookings b
    WHERE b.stripe_session_id = p_session_id;

  IF FOUND THEN
    SELECT count(*) INTO v_ticket_count FROM public.tickets t
      WHERE t.booking_id = v_booking.id;
    IF v_booking.event_id IS DISTINCT FROM p_event_id
       OR v_booking.customer_email IS DISTINCT FROM p_customer_email
       OR v_booking.total_amount IS DISTINCT FROM p_total_amount
       OR v_ticket_count <> v_quantity THEN
      RAISE EXCEPTION 'Existing booking requires reconciliation';
    END IF;
    RETURN jsonb_build_object('success', true, 'booking_id', v_booking.id, 'replayed', true);
  END IF;

  SELECT e.available_slots INTO v_available FROM public.events e
    WHERE e.id = p_event_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Event not found'; END IF;
  IF v_available IS NULL OR v_available < v_quantity THEN
    RAISE EXCEPTION 'Insufficient slots; paid checkout requires reconciliation';
  END IF;

  INSERT INTO public.bookings (event_id, customer_email, stripe_session_id, total_amount)
  VALUES (p_event_id, p_customer_email, p_session_id, p_total_amount)
  RETURNING * INTO v_booking;

  INSERT INTO public.tickets (
    booking_id, event_id, guest_name, allergies, buyer_name, buyer_email, stripe_payment_id
  ) SELECT v_booking.id, p_event_id, coalesce(nullif(btrim(guest.name), ''), 'Ospite ' || guest.position),
      p_allergies, p_customer_name, p_customer_email, p_session_id
    FROM unnest(p_guest_names) WITH ORDINALITY AS guest(name, position);

  UPDATE public.events SET available_slots = available_slots - v_quantity
    WHERE id = p_event_id;

  RETURN jsonb_build_object('success', true, 'booking_id', v_booking.id, 'replayed', false);
END;
$$;

-- Invoker privileges: only the server's service role may fulfill a paid session.
REVOKE ALL ON FUNCTION public.fulfill_site_checkout(uuid, text, text, text, numeric, text[], text)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.fulfill_site_checkout(uuid, text, text, text, numeric, text[], text)
  TO service_role;

COMMIT;
