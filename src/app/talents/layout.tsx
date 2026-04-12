import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Artisti e Performer | Black Bulls Lab — I Nostri Talenti a Torino",
    description:
        "Scopri gli artisti, i performer e i talenti creativi del Black Bulls Lab. Entra nel nostro laboratorio urbano o candidati per far parte dei nostri dinner show a Torino.",
    alternates: { canonical: "/talents" },
    openGraph: {
        title: "Artisti e Performer | Black Bulls Lab — Talenti Creativi",
        description: "Incontra i protagonisti delle serate Black Bulls Lab. Cantanti, attori e performer che rendono unici i nostri show.",
        url: "/talents",
    },
};

export default function TalentsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
