-- Run only against an isolated database, after the retention migration.
BEGIN;
INSERT INTO public.contact_requests (id, created_at, lead_type, name, email, message) VALUES
  ('00000000-0000-4000-8000-0000000000b1', now() - interval '12 months 1 day', 'contact', 'Vecchia', 'a@example.com', 'x'),
  ('00000000-0000-4000-8000-0000000000b2', now() - interval '11 months 29 days', 'contact', 'Recente', 'b@example.com', 'x'),
  ('00000000-0000-4000-8000-0000000000b3', now(), 'contact', 'Nuova', 'c@example.com', 'x');

SET LOCAL ROLE service_role;
DO $$
BEGIN
  ASSERT public.purge_contact_requests() = 1;
  ASSERT NOT EXISTS (SELECT 1 FROM public.contact_requests WHERE name = 'Vecchia');
  ASSERT (SELECT count(*) FROM public.contact_requests WHERE name IN ('Recente', 'Nuova')) = 2;
  ASSERT public.purge_contact_requests() = 0;
END;
$$;
RESET ROLE;

DO $$
DECLARE
  r text;
BEGIN
  FOREACH r IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    EXECUTE format('SET LOCAL ROLE %I', r);
    BEGIN
      PERFORM public.purge_contact_requests();
      RAISE EXCEPTION 'Expected denial for %', r USING ERRCODE = 'P0001';
    EXCEPTION WHEN insufficient_privilege THEN NULL;
    END;
    RESET ROLE;
  END LOOP;
END;
$$;
ROLLBACK;
