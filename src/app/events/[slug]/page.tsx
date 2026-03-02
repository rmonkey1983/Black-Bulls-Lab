import { notFound } from "next/navigation";
import { EventHero } from "@/components/events/EventHero";
import { EventConcept } from "@/components/events/EventConcept";
import { EventTimeline } from "@/components/events/EventTimeline";
import { EventMapSection } from "@/components/events/EventMapSection";
import { EventBookingSection } from "./EventBookingSection";

// Mock Data Source
const events = [
    {
        id: "1",
        slug: "notte-medievale",
        title: "Notte Medievale: Il Banchetto del Toro",
        subtitle: "Un viaggio nel 1300 tra spezie, giullari e fuoco",
        date: "15 Giugno 2026",
        location: "Sala dei Cavalieri",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=1200",
        description: `Il Banchetto del Toro Nero non è una cena. È un portale temporale.\n\nImmergiti in un'atmosfera unica, dove la luce delle torce danza sulle pareti di pietra e il profumo di spezie antiche riempie l'aria. I nostri chef hanno ricreato fedelmente le ricette del XIV secolo, rivisitandole per il palato contemporaneo ma mantenendo intatta la loro anima rustica e potente.\n\nTra una portata e l'altra, giullari, mangiafuoco e musicisti vi intratterranno come se foste alla corte di un nobile signore. Non aspettatevi il solito spettacolo: qui voi siete parte della scena.`,
        timeline: [
            { time: "20:00", title: "Accoglienza & Idromele", description: "Benvenuto con calice di idromele speziato e assegnazione del casato." },
            { time: "20:45", title: "Primo Servizio: La Terra", description: "Zuppe di farro e legumi, crostoni al lardo e miele." },
            { time: "21:30", title: "Spettacolo del Fuoco", description: "Performance di giocoleria infuocata al centro della sala." },
            { time: "22:00", title: "Secondo Servizio: La Caccia", description: "Stinco di maiale alla brace, verdure di stagione glassate." },
            { time: "23:00", title: "Gran Finale", description: "Dolci speziati e danza delle spade." },
        ],
    },
    // Add more mock events if needed
];

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = events.find((e) => e.slug === slug);

    if (!event) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-black pb-32">
            <EventHero
                title={event.title}
                subtitle={event.subtitle}
                image={event.image}
                date={event.date}
                location={event.location}
            />

            <EventConcept description={event.description} />

            <EventTimeline timeline={event.timeline} />

            {/* Map Section */}
            <EventMapSection location={event.location} />

            {/* Seat Selection + Booking Bar */}
            <EventBookingSection eventId={event.id} />
        </div>
    );
}
