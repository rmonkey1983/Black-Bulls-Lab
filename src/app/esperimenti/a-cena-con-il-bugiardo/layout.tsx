import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "A Cena Con Il Bugiardo — Dinner Show & Social Deception | Torino",
    description:
        "Un dinner show unico: alta cucina e arte dell'inganno si incontrano. Scopri chi è il bugiardo al tuo tavolo prima del dessert. Prenotazioni a Torino con Black Bulls Lab.",
    alternates: { canonical: "/esperimenti/a-cena-con-il-bugiardo" },
    openGraph: {
        title: "A Cena Con Il Bugiardo — Black Bulls Lab",
        description:
            "Dinner Show & Social Deception: chi riesce a ingannare tutti vince. Unisciti all'esperienza a Torino.",
        url: "/esperimenti/a-cena-con-il-bugiardo",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "A Cena Con Il Bugiardo — Black Bulls Lab" }],
    },
};

export default function ACenaConIlBugiardoLayout({ children }: { children: React.ReactNode }) {
    return children;
}
