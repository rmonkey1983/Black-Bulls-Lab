-- Deletes contact requests older than 12 months, as stated in the privacy policy.
-- Apply after 20261124130000_contact_requests.sql. Deletion is permanent.
BEGIN;

CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE OR REPLACE FUNCTION public.purge_contact_requests()
RETURNS bigint
LANGUAGE sql
SECURITY INVOKER
SET search_path = ''
AS $$
  WITH purged AS (
    DELETE FROM public.contact_requests
    WHERE created_at < now() - interval '12 months'
    RETURNING 1
  )
  SELECT count(*) FROM purged;
$$;

REVOKE ALL ON FUNCTION public.purge_contact_requests() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_contact_requests() TO service_role;

-- Every night at 03:17 UTC. The job name makes this statement safe to re-run.
SELECT cron.schedule(
  'purge-contact-requests',
  '17 3 * * *',
  'SELECT public.purge_contact_requests()'
);

COMMIT;
