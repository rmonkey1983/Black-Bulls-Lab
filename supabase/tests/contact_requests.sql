-- Run only against an isolated database, after the contact_requests migration.
BEGIN;
SET LOCAL ROLE service_role;
INSERT INTO public.contact_requests (id, lead_type, name, email, message)
VALUES ('00000000-0000-4000-8000-0000000000aa', 'private', 'Audit', 'audit@example.com', 'Prova');
UPDATE public.contact_requests SET email_status = 'accepted'
WHERE id = '00000000-0000-4000-8000-0000000000aa';
DO $$
BEGIN
  ASSERT (SELECT email_status FROM public.contact_requests
    WHERE id = '00000000-0000-4000-8000-0000000000aa') = 'accepted';
  BEGIN
    INSERT INTO public.contact_requests (lead_type, name, email, message) VALUES ('altro', 'A', 'a@example.com', 'x');
    RAISE EXCEPTION 'Expected check violation' USING ERRCODE = 'P0001';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
END;
$$;
RESET ROLE;

DO $$
DECLARE
  r text;
  stmt text;
BEGIN
  FOREACH r IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH stmt IN ARRAY ARRAY[
      'SELECT count(*) FROM public.contact_requests',
      'INSERT INTO public.contact_requests (lead_type, name, email, message) VALUES (''contact'',''x'',''x@x.it'',''x'')',
      'UPDATE public.contact_requests SET name = ''x''',
      'DELETE FROM public.contact_requests'
    ] LOOP
      EXECUTE format('SET LOCAL ROLE %I', r);
      BEGIN
        EXECUTE stmt;
        RAISE EXCEPTION 'Expected denial for %: %', r, stmt USING ERRCODE = 'P0001';
      EXCEPTION WHEN insufficient_privilege THEN NULL;
      END;
      RESET ROLE;
    END LOOP;
  END LOOP;
END;
$$;
ROLLBACK;
