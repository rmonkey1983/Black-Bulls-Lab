import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Dinner Show a Torino | Black Bulls Lab — Cena Con Delitto e Format Immersivi",
    description:
        "Organizza una serata indimenticabile a Torino con Black Bulls Lab. Dinner show, cena con delitto e team building da 50€/persona. Gruppi da 20 a 100 persone. Risposta in 24 ore.",
    alternates: { canonical: "/" },
    openGraph: {
        title: "Dinner Show a Torino | Black Bulls Lab — Cena Con Delitto e Format Immersivi",
        description:
            "Organizza una serata indimenticabile a Torino con Black Bulls Lab. Dinner show, cena con delitto e team building da 50€/persona. Gruppi da 20 a 100 persone. Risposta in 24 ore.",
        url: "https://blackbullslab.com",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Black Bulls Lab — Dinner Show a Torino" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Dinner Show a Torino | Black Bulls Lab — Cena con Delitto e Format Immersivi",
        description:
            "Organizza una serata indimenticabile a Torino con Black Bulls Lab. Dinner show, cena con delitto e team building da 50€/persona.",
        images: ["/og-image.jpg"],
    },
};

import dynamic from "next/dynamic";
import { getAllPosts } from "@/lib/blog";

const HomeClient = dynamic(() => import("./HomeClient").then(mod => mod.HomeClient));

export default function HomePage() {
    const latestPosts = getAllPosts().slice(0, 3);

    return (
        <main className="w-full bg-zinc-950 min-h-screen">
            <HomeClient latestPosts={latestPosts} />
        </main>
    );
}

