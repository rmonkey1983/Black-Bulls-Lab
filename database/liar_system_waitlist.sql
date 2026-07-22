-- Schema completo per la tabella liar_system_waitlist

CREATE TABLE IF NOT EXISTS public.liar_system_waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    phone TEXT,
    city TEXT DEFAULT 'Torino',
    guests_count INTEGER DEFAULT 1,
    event_consent BOOLEAN DEFAULT true NOT NULL,
    marketing_consent BOOLEAN DEFAULT false NOT NULL,
    source TEXT DEFAULT 'landing_page',
    landing_page TEXT DEFAULT '/format/a-cena-con-il-bugiardo',
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    privacy_version TEXT DEFAULT 'v1.0' NOT NULL,
    consent_timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indici per prestazioni di ricerca
CREATE INDEX IF NOT EXISTS idx_liar_system_waitlist_email ON public.liar_system_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_liar_system_waitlist_created_at ON public.liar_system_waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_liar_system_waitlist_status ON public.liar_system_waitlist(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.liar_system_waitlist ENABLE ROW LEVEL SECURITY;

-- Policy inserimento da parte dell'applicazione (anon/public)
CREATE POLICY "Allow public insert to liar_system_waitlist" 
ON public.liar_system_waitlist 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Policy service_role full access
CREATE POLICY "Allow service_role full access to liar_system_waitlist" 
ON public.liar_system_waitlist 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
