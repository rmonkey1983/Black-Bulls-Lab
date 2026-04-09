import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cena con Delitto e Dinner Show a Torino | Format Black Bulls Lab",
    description:
        "Scopri i format immersivi di Black Bulls Lab: Cena con Delitto, Il PalQo e The Golden Voice. Serate uniche a Torino da 50€ a persona.",
    alternates: { canonical: "/format" },
    openGraph: {
        title: "Cena con Delitto e Dinner Show a Torino | Format Black Bulls Lab",
        description:
            "Scopri i format immersivi di Black Bulls Lab: Cena con Delitto, Il PalQo e The Golden Voice. Serate uniche a Torino da 50€ a persona.",
        url: "https://blackbullslab.com/format",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Format Dinner Show — Black Bulls Lab" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Cena con Delitto e Dinner Show a Torino | Format Black Bulls Lab",
        description:
            "Scopri i format immersivi di Black Bulls Lab: Cena con Delitto, Il PalQo e The Golden Voice. Serate uniche a Torino da 50€ a persona.",
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
