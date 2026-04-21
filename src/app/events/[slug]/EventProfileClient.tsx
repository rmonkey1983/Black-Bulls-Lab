"use client";

import React from "react";
import { Event } from "@/lib/dataStore";
import { EventHero } from "@/components/events/EventHero";
import { EventConcept } from "@/components/events/EventConcept";
import { EventTimeline } from "@/components/events/EventTimeline";
import { EventBookingSection } from "./EventBookingSection";
import { EventMapSection } from "@/components/events/EventMapSection";

interface EventProfileClientProps {
    event: Event;
}

export function EventProfileClient({ event }: EventProfileClientProps) {
    return (
        <div className="min-h-screen pb-32">
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
