import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Team Building a Torino | Cene Aziendali Originali — Black Bulls Lab",
    description:
        "Formato dinner show per cene aziendali, team building e gala a Torino. Pacchetti da 45€/persona tutto incluso. Preventivo gratuito in 24 ore.",
    keywords: ["team building Torino", "cena aziendale Torino", "dinner show aziendale", "eventi corporate Torino", "gala dinner Torino"],
    alternates: { canonical: "/eventi-aziendali" },
    openGraph: {
        title: "Team Building a Torino | Cene Aziendali Originali — Black Bulls Lab",
        description:
            "Formato dinner show per cene aziendali, team building e gala a Torino. Pacchetti da 45€/persona tutto incluso. Preventivo gratuito in 24 ore.",
        url: "https://blackbullslab.com/eventi-aziendali",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Team Building e Cene Aziendali — Black Bulls Lab" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Team Building a Torino | Cene Aziendali Originali — Black Bulls Lab",
        description:
            "Formato dinner show per cene aziendali, team building e gala a Torino. Pacchetti da 45€/persona tutto incluso.",
        images: ["/og-image.jpg"],
    },
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
    return children;
}
