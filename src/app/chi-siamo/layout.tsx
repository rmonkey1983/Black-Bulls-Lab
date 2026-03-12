import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chi Siamo — Il Laboratorio Urbano",
    description:
        "Scopri la storia e i valori di Black Bulls Lab, il laboratorio urbano di esperienze gastronomiche e performative nato a Torino nel 2026.",
    alternates: { canonical: "/chi-siamo" },
    openGraph: {
        title: "Chi Siamo — Black Bulls Lab",
        description: "Dove cucina di qualità, intrattenimento live e socialità si fondono in esperienze memorabili.",
        url: "/chi-siamo",
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
