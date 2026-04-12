import type { Metadata } from "next";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: `Cena Con Delitto a Torino | ${SITE_NAME} — Dinner Show Investigativo`,
    description: "Una serata a Torino dove sei tu l'investigatore. Cena gourmet, attori dal vivo e un mistero da risolvere. Cena Con Delitto by Black Bulls Lab — da 50€/persona.",
    alternates: { canonical: "/format/cena-con-delitto" },
    openGraph: {
        title: `Cena Con Delitto a Torino | ${SITE_NAME}`,
        description: "Risolvi il mistero, interroga i sospetti e scopri il colpevole. L'esperienza investigativa più immersiva di Torino.",
        url: `${SITE_URL}/format/cena-con-delitto`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Cena Con Delitto — Black Bulls Lab" }],
    },
};

export default function CenaConDelittoLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <EventSchema
                name="Cena Con Delitto — Black Bulls Lab"
                description="Dinner show investigativo dove gli ospiti devono risolvere un crimine tra una portata e l'altra. Teatro immersivo e alta cucina a Torino."
                date={new Date().toISOString().split("T")[0]}
                location="Torino, Italia"
                url="https://blackbullslab.com/format/cena-con-delitto"
                price={50}
            />
            {children}
        </>
    );
}
