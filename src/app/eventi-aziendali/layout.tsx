import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Location Eventi Aziendali e Team Building a Torino | Black Bulls Lab",
    description:
        "Organizza la tua cena aziendale o evento di team building a Torino con Black Bulls Lab. Format esperienziali unici per coinvolgere il tuo team.",
    keywords: ["eventi corporate Torino", "team building Torino", "brand experience", "cena aziendale"],
    alternates: { canonical: "/eventi-aziendali" },
    openGraph: {
        title: "Area Corporate — Black Bulls Lab",
        description: "Portiamo la nostra esperienza nel tuo business. Eventi su misura, risultati straordinari.",
        url: "/eventi-aziendali",
    },
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
    return children;
}
