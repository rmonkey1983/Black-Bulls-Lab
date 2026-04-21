import { Metadata } from "next";
import { getTalents } from "@/lib/dataStore";
import { notFound } from "next/navigation";
import { TalentProfileClient } from "./TalentProfileClient";

interface TalentPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const talents = await getTalents();
    return talents.map((t) => ({
        slug: t.id,
    }));
}

export async function generateMetadata({
    params,
}: TalentPageProps): Promise<Metadata> {
    const { slug } = await params;
    const talents = await getTalents();
    const talent = talents.find((t) => t.id === slug);

    if (!talent) return {};

    return {
        title: talent.name,
        description: talent.bio.substring(0, 155),
        openGraph: {
            title: `${talent.name} | Black Bulls Lab`,
            description: talent.bio.substring(0, 155),
            images: [{ url: talent.image }],
        },
    };
}

export default async function TalentPage({ params }: TalentPageProps) {
    const { slug } = await params;
    const talents = await getTalents();
    const talent = talents.find((t) => t.id === slug);

    if (!talent) {
        notFound();
    }

    return <TalentProfileClient talent={talent} />;
}
