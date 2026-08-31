import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Team building ed eventi aziendali a Torino",
    description:
        "Black Bulls Lab progetta team building ed eventi aziendali a Torino basati su format dal vivo, interazione tra partecipanti, regia e dinamiche sociali.",
    keywords: ["team building Torino", "cena aziendale Torino", "dinner show aziendale", "eventi corporate Torino", "gala dinner Torino"],
    alternates: { canonical: "/eventi-aziendali" },
    openGraph: {
        title: "Team building ed eventi aziendali a Torino | Black Bulls Lab",
        description:
            "Format dal vivo per team building, cene aziendali ed eventi interni a Torino.",
        url: "https://blackbullslab.com/eventi-aziendali",
        images: [{ url: "/images/brand/bg-hero-wide.webp", width: 1200, height: 630, alt: "Team Building e Cene Aziendali — Black Bulls Lab" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Eventi Aziendali e Team Building a Torino | Black Bulls Lab",
        description:
            "Format live per cene aziendali, team building e eventi corporate a Torino.",
        images: ["/images/brand/bg-hero-wide.webp"],
    },
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
    return children;
}
