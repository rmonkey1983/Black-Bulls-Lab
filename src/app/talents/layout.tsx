import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Artisti — I Nostri Talenti",
    description:
        "Scopri gli artisti del Black Bulls Lab: chef, DJ, performer e creativi che danno vita ad ogni esperienza unica.",
    alternates: { canonical: "/talents" },
    openGraph: {
        title: "Artisti — Black Bulls Lab",
        description: "Le menti creative che danno vita alle esperienze immersive del Black Bulls Lab.",
        url: "/talents",
    },
};

export default function TalentsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
