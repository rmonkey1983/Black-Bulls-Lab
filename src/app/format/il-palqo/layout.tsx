import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: `Il PalQo | ${SITE_NAME}`,
    description: "Format immersivo dove il pubblico diventa il protagonista dello show.",
    alternates: { canonical: "/format/il-palqo" },
    openGraph: {
        title: `Il PalQo | ${SITE_NAME}`,
        description: "L'arena sperimentale dell'intrattenimento a Torino.",
        url: `${SITE_URL}/format/il-palqo`,
        images: [{ url: "/images/brand/bg-hero-wide.webp", width: 1200, height: 630, alt: "Il PalQo — Black Bulls Lab" }],
    },
};

export default function IlPalQoLayout({ children }: { children: React.ReactNode }) {
    return children;
}
