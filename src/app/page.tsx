import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: {
        absolute: "Dinner Show Torino | Black Bulls Lab: Esperienze Immersive",
    },
    description:
        "Dinner Show Torino: vivi serate immersive e format originali con Black Bulls Lab. Cena con Delitto e show interattivi per eventi aziendali e privati. Prenota ora!",
    alternates: { canonical: "/" },
    openGraph: {
        title: "Dinner Show Torino | Black Bulls Lab: Esperienze Immersive",
        description:
            "Dinner Show Torino: vivi serate immersive e format originali con Black Bulls Lab. Cena con Delitto e show interattivi per eventi aziendali e privati. Prenota ora!",
        url: "https://blackbullslab.com",
        images: [{ url: "/images/brand/bg-hero-wide.webp", width: 1200, height: 630, alt: "Black Bulls Lab | Dinner Show Torino" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Dinner Show Torino | Black Bulls Lab: Esperienze Immersive",
        description:
            "Dinner Show Torino: vivi serate immersive e format originali con Black Bulls Lab. Cena con Delitto e show interattivi per eventi aziendali e privati. Prenota ora!",
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

