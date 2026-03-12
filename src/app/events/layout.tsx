import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eventi — Prossime Esperienze Immersive",
    description:
        "Scopri gli eventi del Black Bulls Lab a Torino: dinner show, performance live, serate a tema. Prenota la tua esperienza memorabile.",
    alternates: { canonical: "/events" },
    openGraph: {
        title: "Eventi — Black Bulls Lab",
        description: "Dinner show, performance live e serate immersive a Torino.",
        url: "/events",
    },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
