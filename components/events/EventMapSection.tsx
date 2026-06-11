"use client";

import dynamic from "next/dynamic";

const EventMap = dynamic(() => import("./EventMap"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-gray-900 animate-pulse rounded-xl" />
});

interface EventMapSectionProps {
    location: string;
}

export function EventMapSection({ location }: EventMapSectionProps) {
    return (
        <section className="py-16 px-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">La Location</h3>
            <EventMap position={[45.0703, 7.6869]} locationName={location} />
        </section>
    );
}
