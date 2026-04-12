"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Event, getEvent } from "@/lib/dataStore";
import { EventHero } from "@/components/events/EventHero";
import { EventConcept } from "@/components/events/EventConcept";
import { EventTimeline } from "@/components/events/EventTimeline";
import { EventBookingSection } from "./EventBookingSection";
import { EventMapSection } from "@/components/events/EventMapSection";
import { EventSchema } from "@/components/seo/JsonLd";

export default function EventPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [event, setEvent] = useState<Event | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        getEvent(slug).then((data) => {
            if (data) {
                setEvent(data);
            } else {
                setNotFound(true);
            }
        }).catch(() => {
            setNotFound(true);
        });
    }, [slug]);

    if (notFound) {
        return (
            <div className="min-h-screen  flex items-center justify-center">
                <div className="text-center">
                    <span className="text-[10px] text-bordeaux-light tracking-[0.3em] uppercase font-medium">404</span>
                    <h1 className="text-3xl font-bold text-rama-text mt-2">Evento Non Trovato</h1>
                    <p className="text-gray-400 mt-2 text-sm">L&apos;evento che stai cercando non è disponibile.</p>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen  flex items-center justify-center">
                <div className="text-rama-accent/40 text-sm animate-pulse-glow">Caricamento evento...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  pb-32">
            <title>{`${event.title} — Black Bulls Lab`}</title>
            <meta name="description" content={event.description || `${event.title} — Un'esperienza immersiva del Black Bulls Lab a Torino.`} />
            <EventSchema
                name={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                image={event.image}
                url={`https://blackbullslab.com/events/${event.slug}`}
                price={event.price}
            />
            <EventHero
                title={event.title}
                subtitle={event.subtitle}
                image={event.image}
                date={event.date}
                location={event.location}
            />

            <EventConcept description={event.description} />

            <EventTimeline timeline={event.timeline} />

            <EventBookingSection
                eventId={event.id}
                slug={event.slug}
                title={event.title}
                date={event.date}
                location={event.location}
                price={event.price}
            />

            <EventMapSection location={event.location} />
        </div>
    );
}
