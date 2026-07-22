import { homepageMetadata } from "@/lib/metadata";
import { getHomepageJsonLd, getFaqJsonLd } from "@/lib/jsonld";
import Script from "next/script";

export const metadata = homepageMetadata;

import dynamic from "next/dynamic";
import { getAllPosts } from "@/lib/blog";
import { createClient } from '@supabase/supabase-js';

const HomeClient = dynamic(() => import("./HomeClient").then(mod => mod.HomeClient));

export default async function HomePage() {
    const latestPosts = getAllPosts().slice(0, 3);

    // Fetch next 3 events from Supabase
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const now = new Date().toISOString();
    const { data: nextEvents } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', now)
        .order('event_date', { ascending: true })
        .limit(3);

    return (
        <main className="w-full bg-zinc-950 min-h-screen">
            <Script
                id="jsonld-homepage"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomepageJsonLd()) }}
            />
            <Script
                id="jsonld-faq"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
            />
            <HomeClient latestPosts={latestPosts} nextEvents={nextEvents || []} />
        </main>
    );
}

