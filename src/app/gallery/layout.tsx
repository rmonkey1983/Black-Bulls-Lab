import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Gallery",
    description:
        "Esplora la galleria fotografica di Black Bulls Lab. Guarda i momenti più iconici dei nostri dinner show, performance e serate esclusive a Torino.",
    alternates: { canonical: `${SITE_URL}/gallery` },
    robots: { index: false, follow: true },
    openGraph: {
        title: "Galleria Foto | Black Bulls Lab — Momenti d'Atmosfera",
        description: "Rivivi le emozioni delle serate Black Bulls Lab attraverso i nostri scatti più belli.",
        url: `${SITE_URL}/gallery`,
    },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    return children;
}
