-- Requests sent from the site forms, kept even when the email notification fails.
-- Personal data: readable and writable by the server's service role only.
BEGIN;

CREATE TABLE IF NOT EXISTS public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  lead_type text NOT NULL CHECK (lead_type IN ('corporate', 'private', 'partner', 'contact')),
  name text NOT NULL CHECK (length(name) BETWEEN 1 AND 10000),
  email text NOT NULL CHECK (length(email) BETWEEN 3 AND 254),
  phone text,
  company text,
  message text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- accepted = taken in charge by the email provider, not proof of delivery
  email_status text NOT NULL DEFAULT 'pending' CHECK (email_status IN ('pending', 'accepted', 'failed'))
);

CREATE INDEX IF NOT EXISTS contact_requests_created_at_idx
  ON public.contact_requests (created_at DESC);

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.contact_requests FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_requests TO service_role;

COMMIT;
