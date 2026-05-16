import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: `A Cena Con Il Bugiardo | Social Deception Experience | ${SITE_NAME}`,
    description: "La fiducia è un difetto. Entra nel format: il primo dinner show di social deception a Torino dove lo smartphone è la tua arma.",
    alternates: { canonical: "/format/a-cena-con-il-bugiardo" },
    openGraph: {
        title: `A Cena Con Il Bugiardo | ${SITE_NAME}`,
        description: "L'esperienza di social deception più coinvolgente del Black Bulls Lab.",
        url: `${SITE_URL}/format/a-cena-con-il-bugiardo`,
        images: [{ url: "/images/brand/bg-hero-wide.webp", width: 1200, height: 630, alt: "A Cena Con Il Bugiardo — Black Bulls Lab" }],
    },
};

export default function ACenaConIlBugiardoLayout({ children }: { children: React.ReactNode }) {
    return children;
}
