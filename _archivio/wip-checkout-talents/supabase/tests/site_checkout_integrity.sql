-- Run only against an isolated database with the website ticketing fixture.
BEGIN;
INSERT INTO public.events (id, available_slots)
VALUES ('00000000-0000-4000-8000-000000000001', 3);

DO $$
DECLARE
  result jsonb;
BEGIN
  result := public.fulfill_site_checkout('00000000-0000-4000-8000-000000000001',
    'cs_test_audit', 'audit@example.com', 'Audit', 40, ARRAY['Audit', 'Secondo ospite'], '');
  ASSERT result->>'success' = 'true';
  ASSERT (SELECT available_slots FROM public.events WHERE id = '00000000-0000-4000-8000-000000000001') = 1;
  ASSERT (SELECT count(*) FROM public.tickets) = 2;
  ASSERT EXISTS(SELECT 1 FROM public.tickets WHERE guest_name = 'Secondo ospite');

  result := public.fulfill_site_checkout('00000000-0000-4000-8000-000000000001',
    'cs_test_audit', 'audit@example.com', 'Audit', 40, ARRAY['Audit', 'Secondo ospite'], '');
  ASSERT result->>'replayed' = 'true';
  ASSERT (SELECT count(*) FROM public.bookings) = 1;
  ASSERT (SELECT count(*) FROM public.tickets) = 2;
  ASSERT (SELECT available_slots FROM public.events WHERE id = '00000000-0000-4000-8000-000000000001') = 1;

  BEGIN
    PERFORM public.fulfill_site_checkout('00000000-0000-4000-8000-000000000001',
      'cs_test_full', 'audit@example.com', 'Audit', 40, ARRAY['Audit', 'Secondo'], '');
    RAISE EXCEPTION 'Expected insufficient slots';
  EXCEPTION WHEN OTHERS THEN
    ASSERT SQLERRM LIKE 'Insufficient slots%';
  END;
  ASSERT (SELECT count(*) FROM public.bookings) = 1;
  ASSERT (SELECT count(*) FROM public.tickets) = 2;

  BEGIN
    PERFORM public.fulfill_site_checkout('00000000-0000-4000-8000-000000000001',
      'cs_test_audit', 'another@example.com', 'Audit', 40, ARRAY['Audit', 'Secondo'], '');
    RAISE EXCEPTION 'Expected reconciliation';
  EXCEPTION WHEN OTHERS THEN
    ASSERT SQLERRM = 'Existing booking requires reconciliation';
  END;

  ASSERT NOT has_function_privilege('anon', 'public.fulfill_site_checkout(uuid,text,text,text,numeric,text[],text)', 'EXECUTE');
  ASSERT NOT has_function_privilege('authenticated', 'public.fulfill_site_checkout(uuid,text,text,text,numeric,text[],text)', 'EXECUTE');
  ASSERT has_function_privilege('service_role', 'public.fulfill_site_checkout(uuid,text,text,text,numeric,text[],text)', 'EXECUTE');
END;
$$;

-- A failing ticket insert must also roll back its booking and seat changes.
ALTER TABLE public.tickets ADD CONSTRAINT test_reject_name CHECK (guest_name <> 'REJECT');
DO $$
BEGIN
  BEGIN
    PERFORM public.fulfill_site_checkout('00000000-0000-4000-8000-000000000001',
      'cs_test_rollback', 'audit@example.com', 'Audit', 20, ARRAY['REJECT'], '');
    RAISE EXCEPTION 'Expected ticket constraint failure';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
  ASSERT NOT EXISTS(SELECT 1 FROM public.bookings WHERE stripe_session_id = 'cs_test_rollback');
  ASSERT (SELECT available_slots FROM public.events WHERE id = '00000000-0000-4000-8000-000000000001') = 1;
END;
$$;
ROLLBACK;
