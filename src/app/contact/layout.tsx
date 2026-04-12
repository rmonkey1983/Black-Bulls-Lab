import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contatti | Black Bulls Lab — Prenota il Tuo Evento a Torino",
    description:
        "Contatta Black Bulls Lab per informazioni, prenotazioni o per organizzare il tuo evento aziendale a Torino. Siamo a tua disposizione tramite WhatsApp ed Email.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contattaci | Black Bulls Lab — Dinner Show e Aziendali",
        description: "Scrivici per prenotazioni, collaborazioni o per ricevere un preventivo per il tuo evento a Torino.",
        url: "/contact",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
