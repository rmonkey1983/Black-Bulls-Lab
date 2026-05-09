import type { Metadata } from "next";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: `LIAR SYSTEM | Social Deception Experience | ${SITE_NAME}`,
    description: "La fiducia è un difetto. Entra nel LIAR SYSTEM: il primo dinner show di social deception a Torino dove lo smartphone è la tua arma.",
    alternates: { canonical: "/format/a-cena-con-il-bugiardo" },
    openGraph: {
        title: `LIAR SYSTEM | ${SITE_NAME}`,
        description: "L'esperienza di social deception più coinvolgente del Black Bulls Lab.",
        url: `${SITE_URL}/format/a-cena-con-il-bugiardo`,
        images: [{ url: "/images/brand/liar-system-logo.webp", width: 1200, height: 630, alt: "LIAR SYSTEM — Black Bulls Lab" }],
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
