-- Public, read-only access to artist profiles (/talents/[slug]).
-- Review the rows in public.talents BEFORE applying: every row becomes public.
-- Only the columns shown on the site are exposed; writes stay closed to anon.
BEGIN;

ALTER TABLE public.talents
  ADD COLUMN IF NOT EXISTS category text DEFAULT '';

ALTER TABLE public.talents ENABLE ROW LEVEL SECURITY;

-- Legacy policy that allowed every operation to every role.
DROP POLICY IF EXISTS "Allow all operations for anon users" ON public.talents;
DROP POLICY IF EXISTS "Allow public read" ON public.talents;

CREATE POLICY "Allow public read" ON public.talents
  FOR SELECT TO anon, authenticated USING (true);

REVOKE ALL ON public.talents FROM PUBLIC, anon;
GRANT SELECT (id, name, role, image, bio, category) ON public.talents
  TO anon, authenticated;

COMMIT;
