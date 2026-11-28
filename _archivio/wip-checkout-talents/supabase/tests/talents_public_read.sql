-- Run only against an isolated database, after the talents migration.
BEGIN;
INSERT INTO public.talents (id, name, role, image, code, bio, category)
VALUES ('test-artist', 'Test Artist', 'Test', '/test.webp', 'SECRET', NULL, 'Test');

SET LOCAL ROLE anon;
DO $$
DECLARE
  stmt text;
BEGIN
  ASSERT (SELECT count(*) FROM (SELECT id, name, role, image, bio, category
    FROM public.talents ORDER BY name) t WHERE id = 'test-artist') = 1;

  FOREACH stmt IN ARRAY ARRAY[
    'SELECT code FROM public.talents',
    'SELECT * FROM public.talents',
    'INSERT INTO public.talents (id, name, role, image, code) VALUES (''x'',''x'',''x'',''x'',''x'')',
    'UPDATE public.talents SET name = ''x''',
    'DELETE FROM public.talents',
    'TRUNCATE public.talents'
  ] LOOP
    BEGIN
      EXECUTE stmt;
      RAISE EXCEPTION 'Expected denial: %', stmt USING ERRCODE = 'P0001';
    EXCEPTION WHEN insufficient_privilege THEN NULL;
    END;
  END LOOP;
END;
$$;
RESET ROLE;
ROLLBACK;
