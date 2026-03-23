import { Metadata } from "next";
import { getTalents } from "@/lib/dataStore";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const talents = await getTalents();
    const talent = talents.find((t) => t.id === slug);

    if (!talent) {
        return {
            title: "Artista Non Trovato — Black Bulls Lab",
            description: "L'artista che stai cercando non è disponibile.",
        };
    }

    const shortBio = talent.bio ? (talent.bio.length > 150 ? `${talent.bio.substring(0, 147)}...` : talent.bio) : "";

    return {
        title: `${talent.name} (${talent.role}) — Black Bulls Lab`,
        description: shortBio || `Scopri ${talent.name}, ${talent.role} al Black Bulls Lab di Torino.`,
        openGraph: {
            title: `${talent.name} — Black Bulls Lab`,
            description: shortBio || `Scopri ${talent.name}, ${talent.role} al Black Bulls Lab di Torino.`,
            images: talent.image ? [{ url: talent.image }] : undefined,
            url: `/talents/${talent.id}`,
        },
    };
}

export default function TalentSlugLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
