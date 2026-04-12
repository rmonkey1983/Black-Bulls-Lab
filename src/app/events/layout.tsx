import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eventi e Dinner Show a Torino | Black Bulls Lab — Prenota la Tua Serata",
    description:
        "Scopri il calendario degli eventi Black Bulls Lab a Torino. Dinner show, performance live e serate immersive: scegli il tuo format e prenota ora il tuo posto.",
    alternates: { canonical: "/events" },
    openGraph: {
        title: "Eventi e Dinner Show a Torino | Black Bulls Lab",
        description: "Vivi le esperienze immersive di Black Bulls Lab. Scopri le prossime date per i nostri dinner show a Torino.",
        url: "/events",
    },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
