-- ==============================================================================
-- MIGRAZIONE: 04_community_giveaway.sql
-- DESCRIZIONE: Infrastruttura dati per concorsi a premio e giveaway legati a liar_system_waitlist.
-- SICUREZZA: RLS attivo su tutte le tabelle. Nessun accesso anonimo/pubblico. Accedibile solo tramite Service Role / Admin Backend.
-- ==============================================================================

-- 1. CAMPAIGNS
CREATE TABLE IF NOT EXISTS public.prize_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'legal_review', 'approved', 'active', 'paused', 'closed')),
    legal_approval_ref TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.prize_campaigns IS 'Campagne promozionali/giveaway con relativo stato di approvazione legale.';

-- 2. CYCLES
CREATE TABLE IF NOT EXISTS public.prize_cycles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES public.prize_campaigns(id) ON DELETE CASCADE,
    cycle_label TEXT NOT NULL,
    threshold INTEGER NOT NULL DEFAULT 30 CHECK (threshold > 0),
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'collecting' CHECK (status IN ('collecting', 'qualified', 'locked', 'draw_pending', 'drawn', 'not_qualified', 'closed')),
    snapshot_hash TEXT,
    snapshot_timestamp TIMESTAMPTZ,
    snapshot_eligible_count INTEGER NOT NULL DEFAULT 0,
    regulation_url TEXT NOT NULL DEFAULT '/privacy-policy',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.prize_cycles IS 'Cicli temporali (es. mensili) per il raggiungimento delle soglie di qualificazione.';

-- 3. ENTRIES
CREATE TABLE IF NOT EXISTS public.prize_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cycle_id UUID NOT NULL REFERENCES public.prize_cycles(id) ON DELETE CASCADE,
    waitlist_id UUID NOT NULL REFERENCES public.liar_system_waitlist(id) ON DELETE CASCADE,
    eligibility_status TEXT NOT NULL DEFAULT 'pending' CHECK (eligibility_status IN ('pending', 'eligible', 'excluded', 'withdrawn')),
    exclusion_reason TEXT,
    entry_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_cycle_waitlist UNIQUE (cycle_id, waitlist_id)
);

COMMENT ON TABLE public.prize_entries IS 'Partecipazioni collegate alla waitlist reale. Non contiene copie di PII.';

-- 4. DRAWS (Assegnazioni ufficiali per verbale)
CREATE TABLE IF NOT EXISTS public.prize_draws (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cycle_id UUID NOT NULL REFERENCES public.prize_cycles(id) ON DELETE CASCADE,
    official_protocol_number TEXT NOT NULL,
    drawn_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    performed_by TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.prize_draws IS 'Registrazione dei verbali ufficiali delle assegnazioni manuali.';

-- 5. DRAW RESULTS
CREATE TABLE IF NOT EXISTS public.prize_draw_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    draw_id UUID NOT NULL REFERENCES public.prize_draws(id) ON DELETE CASCADE,
    entry_id UUID NOT NULL REFERENCES public.prize_entries(id) ON DELETE CASCADE,
    assignment_role TEXT NOT NULL CHECK (assignment_role IN ('winner', 'reserve_1', 'reserve_2')),
    claimed_status TEXT NOT NULL DEFAULT 'pending_contact' CHECK (claimed_status IN ('pending_contact', 'notified', 'accepted', 'rejected', 'expired')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_draw_role UNIQUE (draw_id, assignment_role)
);

COMMENT ON TABLE public.prize_draw_results IS 'Esiti dell assegnazione ufficiale per vincitore e riserve.';

-- 6. AUDIT LOG
CREATE TABLE IF NOT EXISTS public.prize_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cycle_id UUID REFERENCES public.prize_cycles(id) ON DELETE SET NULL,
    actor_id TEXT NOT NULL,
    action TEXT NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.prize_audit_log IS 'Log immutabile di audit per ogni operazione amministrativa o di sblocco dati.';

-- INDICI DI PRESTAZIONE
CREATE INDEX IF NOT EXISTS idx_prize_cycles_campaign ON public.prize_cycles(campaign_id);
CREATE INDEX IF NOT EXISTS idx_prize_cycles_status ON public.prize_cycles(status);
CREATE INDEX IF NOT EXISTS idx_prize_entries_cycle ON public.prize_entries(cycle_id);
CREATE INDEX IF NOT EXISTS idx_prize_entries_waitlist ON public.prize_entries(waitlist_id);
CREATE INDEX IF NOT EXISTS idx_prize_entries_eligibility ON public.prize_entries(eligibility_status);
CREATE INDEX IF NOT EXISTS idx_prize_audit_cycle ON public.prize_audit_log(cycle_id);

-- ATTIVAZIONE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.prize_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prize_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prize_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prize_draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prize_draw_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prize_audit_log ENABLE ROW LEVEL SECURITY;

-- POLITICHE RLS: ACCESSO ESCLUSIVO AL SERVICE ROLE (NESSUNA POLICY PUBBLICA/ANONIMA)
CREATE POLICY "Allow service_role full access to prize_campaigns" ON public.prize_campaigns FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service_role full access to prize_cycles" ON public.prize_cycles FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service_role full access to prize_entries" ON public.prize_entries FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service_role full access to prize_draws" ON public.prize_draws FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service_role full access to prize_draw_results" ON public.prize_draw_results FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service_role full access to prize_audit_log" ON public.prize_audit_log FOR ALL TO service_role USING (true) WITH CHECK (true);
