import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contattaci — Parliamone",
    description:
        "Contatta Black Bulls Lab per informazioni, prenotazioni o collaborazioni. Siamo a Torino, pronti a creare la tua esperienza.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contattaci — Black Bulls Lab",
        description: "Scrivici per prenotazioni, collaborazioni o informazioni.",
        url: "/contact",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
