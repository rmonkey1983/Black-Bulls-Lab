import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: {
        absolute: "Dinner Show Torino e Eventi Immersivi | Black Bulls Lab",
    },
    description:
        "Scopri l'universo Black Bulls Lab a Torino: Dinner Show interattivi, Cena con Delitto digitale e format immersivi unici. Prenota ora la tua serata tra divertimento e tecnologia.",
    alternates: { canonical: "/" },
    openGraph: {
        title: "Dinner Show Torino e Eventi Immersivi | Black Bulls Lab",
        description:
            "Vivi esperienze interattive uniche a Torino. Scopri i mockumentary, i nostri dinner show e lasciati stupire da una cena spettacolo curata nei minimi dettagli.",
        url: "https://blackbullslab.com",
        images: [{ url: "/images/brand/bg-hero-wide.webp", width: 1200, height: 630, alt: "Black Bulls Lab | Dinner Show Torino" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Dinner Show Torino e Eventi Immersivi | Black Bulls Lab",
        description:
            "Vivi esperienze interattive uniche a Torino. Scopri i mockumentary, i nostri dinner show e lasciati stupire da una cena spettacolo curata nei minimi dettagli.",
        images: ["/og-image.jpg"],
    },
};

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
            <HomeClient latestPosts={latestPosts} nextEvents={nextEvents || []} />
        </main>
    );
}

