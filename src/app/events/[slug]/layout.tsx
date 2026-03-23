import { Metadata } from "next";
import { getEvent } from "@/lib/dataStore";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const event = await getEvent(slug);

    if (!event) {
        return {
            title: "Evento Non Trovato — Black Bulls Lab",
            description: "L'evento che stai cercando non è disponibile.",
        };
    }

    return {
        title: `${event.title} — Black Bulls Lab`,
        description: event.description || `${event.title} — Un'esperienza immersiva del Black Bulls Lab a Torino.`,
        openGraph: {
            title: `${event.title} — Black Bulls Lab`,
            description: event.description || `${event.title} — Un'esperienza immersiva del Black Bulls Lab a Torino.`,
            images: event.image ? [{ url: event.image }] : undefined,
            url: `/events/${event.slug}`,
        },
    };
}

export default function EventSlugLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
