import { Metadata } from "next";
import { getEvent, getEvents } from "@/lib/dataStore";
import { notFound } from "next/navigation";
import { EventProfileClient } from "./EventProfileClient";
import { EventSchema } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";

interface EventPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const events = await getEvents();
    return events.map((event) => ({
        slug: event.slug,
    }));
}

export async function generateMetadata({
    params,
}: EventPageProps): Promise<Metadata> {
    const { slug } = await params;
    const event = await getEvent(slug);

    if (!event) return {};

    return {
        title: event.title,
        description: event.description.substring(0, 155),
        openGraph: {
            title: `${event.title} | Black Bulls Lab`,
            description: event.description.substring(0, 155),
            images: [{ url: event.image }],
            url: `${SITE_URL}/events/${slug}`,
        },
    };
}

export default async function EventPage({ params }: EventPageProps) {
    const { slug } = await params;
    const event = await getEvent(slug);

    if (!event) {
        notFound();
    }

    return (
        <>
            <EventSchema
                name={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                image={event.image}
                url={`${SITE_URL}/events/${event.slug}`}
                price={event.price}
            />
            <EventProfileClient event={event} />
        </>
    );
}
