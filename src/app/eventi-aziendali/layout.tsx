import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eventi Aziendali e Team Building a Torino | Black Bulls Lab",
    description:
        "Organizza il tuo evento aziendale a Torino con Black Bulls Lab. Dinner show immersivi, team building originali e gala dinner personalizzati. Soluzioni da 50€/persona.",
    keywords: ["team building Torino", "cena aziendale Torino", "dinner show aziendale", "eventi corporate Torino", "gala dinner Torino"],
    alternates: { canonical: "/eventi-aziendali" },
    openGraph: {
        title: "Eventi Aziendali e Team Building a Torino | Black Bulls Lab",
        description:
            "Format immersivi per cene aziendali, team building e gala a Torino. Trasforma il tuo evento in un'esperienza indimenticabile.",
        url: "https://blackbullslab.com/eventi-aziendali",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Team Building e Cene Aziendali — Black Bulls Lab" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Eventi Aziendali e Team Building a Torino | Black Bulls Lab",
        description:
            "Format immersivi per cene aziendali, team building e gala a Torino. Soluzioni personalizzate da 50€/persona.",
        images: ["/og-image.jpg"],
    },
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
    return children;
}
