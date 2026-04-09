import type { Metadata } from "next";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: `A Cena con il Bugiardo | ${SITE_NAME}`,
    description: "Dinner show interattivo a Torino. Un gioco di bluff, sospetto e divertimento a tavola.",
    alternates: { canonical: "/format/a-cena-con-il-bugiardo" },
    openGraph: {
        title: `A Cena con il Bugiardo | ${SITE_NAME}`,
        description: "L'esperienza di social deception più coinvolgente del Black Bulls Lab.",
        url: `${SITE_URL}/format/a-cena-con-il-bugiardo`,
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "A Cena Con Il Bugiardo — Black Bulls Lab" }],
    },
};

export default function ACenaConIlBugiardoLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <EventSchema
                name="A Cena Con Il Bugiardo — Black Bulls Lab"
                description="Dinner show interattivo dove ogni ospite è sospettato e solo uno è il vero bugiardo. Alta cucina e arte dell'inganno si incontrano a Torino."
                date={new Date().toISOString().split("T")[0]}
                location="Torino, Italia"
                url="https://blackbullslab.com/format/a-cena-con-il-bugiardo"
                price={55}
            />
            {children}
        </>
    );
}
