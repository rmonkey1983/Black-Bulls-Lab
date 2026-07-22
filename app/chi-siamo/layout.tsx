import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chi Siamo | Black Bulls Lab — Il Laboratorio di Eventi Immersivi a Torino",
    description:
        "Scopri l'anima di Black Bulls Lab: il laboratorio creativo di Torino specializzato in dinner show, format immersivi e intrattenimento d'avanguardia.",
    alternates: { canonical: "/chi-siamo" },
    openGraph: {
        title: "Chi Siamo | Black Bulls Lab — Eventi e Dinner Show",
        description: "L'agenzia creativa di Torino che trasforma le serate in esperienze memorabili attraverso cucina, arte e mistero.",
        url: "/chi-siamo",
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
