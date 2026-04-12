import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Galleria Foto | Black Bulls Lab — Rivivi le Nostre Esperienze a Torino",
    description:
        "Esplora la galleria fotografica di Black Bulls Lab. Guarda i momenti più iconici dei nostri dinner show, performance e serate esclusive a Torino.",
    alternates: { canonical: "/gallery" },
    openGraph: {
        title: "Galleria Foto | Black Bulls Lab — Momenti d'Atmosfera",
        description: "Rivivi le emozioni delle serate Black Bulls Lab attraverso i nostri scatti più belli.",
        url: "/gallery",
    },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    return children;
}
