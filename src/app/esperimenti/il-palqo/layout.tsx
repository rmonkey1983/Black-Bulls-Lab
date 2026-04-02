import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Il PalQo — Community & Show Immersivo | Torino | Black Bulls Lab",
    description:
        "Il PalQo è il format comunitario di Black Bulls Lab: uno show immersivo che mescola performance live, pubblico attivo e atmosfera unica. Scopri le serate a Torino.",
    alternates: { canonical: "/esperimenti/il-palqo" },
    openGraph: {
        title: "Il PalQo — Black Bulls Lab",
        description:
            "Community & Show immersivo a Torino. Entra a far parte dell'esperienza PalQo.",
        url: "/esperimenti/il-palqo",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Il PalQo — Black Bulls Lab" }],
    },
};

export default function IlPalQoLayout({ children }: { children: React.ReactNode }) {
    return children;
}
