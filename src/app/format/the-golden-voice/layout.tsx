import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Golden Voice — Singing Contest Immersivo | Torino | Black Bulls Lab",
    description:
        "The Golden Voice è il talent show di Black Bulls Lab: un singing contest unico che unisce performance vocali, giuria dal vivo e cena spettacolo a Torino. Candidati ora.",
    alternates: { canonical: "/format/the-golden-voice" },
    openGraph: {
        title: "The Golden Voice — Black Bulls Lab",
        description:
            "Singing Contest immersivo a Torino. Hai la voce per vincere? Candidati o vieni a scoprire i talenti.",
        url: "/format/the-golden-voice",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Golden Voice — Black Bulls Lab" }],
    },
};

export default function TheGoldenVoiceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
