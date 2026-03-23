import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Galleria — Momenti Indimenticabili",
    description:
        "Rivivi i momenti migliori delle nostre esperienze. La galleria fotografica del Black Bulls Lab a Torino.",
    alternates: { canonical: "/gallery" },
    openGraph: {
        title: "Galleria — Black Bulls Lab",
        description: "Le foto delle esperienze più belle del Black Bulls Lab.",
        url: "/gallery",
    },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    return children;
}
