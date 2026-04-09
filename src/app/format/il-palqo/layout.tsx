import type { Metadata } from "next";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: `Il PalQo | ${SITE_NAME}`,
    description: "Format immersivo dove il pubblico diventa il protagonista dello show.",
    alternates: { canonical: "/format/il-palqo" },
    openGraph: {
        title: `Il PalQo | ${SITE_NAME}`,
        description: "L'arena sperimentale dell'intrattenimento a Torino.",
        url: `${SITE_URL}/format/il-palqo`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Il PalQo — Black Bulls Lab" }],
    },
};

export default function IlPalQoLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <EventSchema
                name={`Il PalQo — ${SITE_NAME}`}
                description="Format immersivo di intrattenimento dove il pubblico diventa protagonista della serata. Uno show di community experience unico a Torino."
                date={new Date().toISOString().split("T")[0]}
                location="Torino, Italia"
                url={`${SITE_URL}/format/il-palqo`}
                price={45}
            />
            {children}
        </>
    );
}
