import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cena con Delitto e Dinner Show a Torino | Format Black Bulls Lab",
    description:
        "Scopri i 4 format immersivi di Black Bulls Lab a Torino: A Cena Con Il Bugiardo, Il PalQo, Cena Con Delitto e THE GOLDEN VOICE. Serate uniche da 50€ a persona.",
    alternates: { canonical: "/format" },
    openGraph: {
        title: "Cena con Delitto e Dinner Show a Torino | Format Black Bulls Lab",
        description:
            "Scopri i 4 format immersivi di Black Bulls Lab a Torino: A Cena Con Il Bugiardo, Il PalQo, Cena Con Delitto e THE GOLDEN VOICE. Serate uniche da 50€ a persona.",
        url: "https://blackbullslab.com/format",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Format Dinner Show — Black Bulls Lab" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Cena con Delitto e Dinner Show a Torino | Format Black Bulls Lab",
        description:
            "Scopri i 4 format immersivi di Black Bulls Lab a Torino: A Cena Con Il Bugiardo, Il PalQo, Cena Con Delitto e THE GOLDEN VOICE. Serate uniche da 50€ a persona.",
        images: ["/og-image.jpg"],
    },
};

export default function FormatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
