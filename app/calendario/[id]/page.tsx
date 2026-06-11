import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Clock,
  Ticket,
} from "lucide-react";
import { EventDetailBookingForm } from "@/components/ui/EventDetailBookingForm";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 0;

// ─── Types ────────────────────────────────────────────────────────────────────

interface CalendarioEvent {
  id: string;
  event_date: string;
  location_name: string;
  location_address: string;
  available_slots: number;
  total_slots: number;
  // Optional enriched columns — gracefully degrade if absent
  title?: string;
  description?: string;
  price?: number;
  image_url?: string;
  format?: string;
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("events")
    .select("title, location_name, event_date, image_url")
    .eq("id", id)
    .single();

  if (!data) return { title: "Evento | Black Bulls Lab" };

  const displayTitle =
    data.title || data.location_name || "Evento Black Bulls Lab";
  const eventDate = new Date(data.event_date).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    title: `${displayTitle} — ${eventDate} | Black Bulls Lab`,
    description: `Prenota il tuo posto per ${displayTitle} il ${eventDate}. Posti limitati.`,
    alternates: { canonical: `${SITE_URL}/calendario/${id}` },
    openGraph: {
      title: `${displayTitle} | Black Bulls Lab`,
      description: `Prenota il tuo posto per ${displayTitle} il ${eventDate}.`,
      images: data.image_url ? [{ url: data.image_url }] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single<CalendarioEvent>();

  if (error || !event) {
    console.error("Errore recupero dettaglio evento:", error);
    // In development, show the real error instead of a silent 404
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
          <div className="max-w-2xl w-full bg-zinc-950 border border-red-500/30 rounded-2xl p-8 space-y-4">
            <h1 className="text-red-400 font-bold text-lg uppercase tracking-widest">Evento non trovato — Debug Info</h1>
            <p className="text-zinc-400 text-sm"><strong className="text-white">ID cercato:</strong> {id}</p>
            <p className="text-zinc-400 text-sm"><strong className="text-white">Errore Supabase:</strong> {error?.message || 'Nessun record restituito'}</p>
            <p className="text-zinc-400 text-sm"><strong className="text-white">Codice errore:</strong> {error?.code || 'N/A'}</p>
            <p className="text-zinc-500 text-xs mt-4">Verifica che la tabella Supabase contenga una riga con questo UUID e che le colonne <code className="text-[#FFD700]">event_date</code>, <code className="text-[#FFD700]">available_slots</code>, <code className="text-[#FFD700]">location_name</code> esistano.</p>
            <Link href="/calendario" className="inline-block mt-4 text-xs text-[#FFD700] hover:underline">← Torna al Calendario</Link>
          </div>
        </div>
      );
    }
    notFound();
  }

  const eventDate = new Date(event!.event_date);
  const isSoldOut = event!.available_slots === 0;

  const displayTitle =
    event!.title || event!.location_name || "Evento Black Bulls Lab";
  const price = event!.price ?? 50;
  const availabilityPercent = Math.round(
    ((event!.total_slots - event!.available_slots) / event!.total_slots) * 100
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans pt-24 pb-32 relative z-10">
      {/* ── Back Link ── */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link
          href="/calendario"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#FFD700] transition-colors text-xs uppercase tracking-widest font-bold group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Torna al Calendario
        </Link>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">

          {/* ══════════════════════════════════════════
              LEFT COLUMN — Event Details
          ══════════════════════════════════════════ */}
          <div className="space-y-10">

            {/* Cover Image */}
            {event.image_url ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.image_url}
                  alt={displayTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              </div>
            ) : (
              /* Placeholder cover with date large */
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[#FFD700] text-xs uppercase tracking-[0.4em] font-bold mb-2">
                    {eventDate.toLocaleString("it-IT", { month: "long" })}{" "}
                    {eventDate.getFullYear()}
                  </div>
                  <div className="text-white text-9xl font-black leading-none">
                    {eventDate.getDate()}
                  </div>
                </div>
                {/* Decorative corner lines */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#FFD700]/20" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#FFD700]/20" />
              </div>
            )}

            {/* Title & Format */}
            <div>
              {event.format && (
                <span className="inline-block text-[10px] uppercase tracking-[0.3em] font-bold text-[#FFD700] border border-[#FFD700]/20 bg-[#FFD700]/5 px-3 py-1 rounded-full mb-4">
                  {event.format}
                </span>
              )}
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                {displayTitle}
              </h1>
            </div>

            {/* Quick Info Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex items-start gap-3">
                <Calendar size={18} className="text-[#FFD700]/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-1">
                    Data
                  </p>
                  <p className="text-white text-sm font-semibold capitalize">
                    {eventDate.toLocaleDateString("it-IT", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex items-start gap-3">
                <Clock size={18} className="text-[#FFD700]/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-1">
                    Orario
                  </p>
                  <p className="text-white text-sm font-semibold">
                    {eventDate.toLocaleTimeString("it-IT", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex items-start gap-3">
                <Ticket size={18} className="text-[#FFD700]/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-1">
                    Prezzo
                  </p>
                  <p className="text-white text-sm font-semibold">
                    €{price}{" "}
                    <span className="text-zinc-600 font-normal text-xs">/ persona</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Bar */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#FFD700]/60" />
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                    Disponibilità
                  </span>
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                    isSoldOut
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : event.available_slots <= 5
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-green-500/10 text-green-400 border-green-500/20"
                  }`}
                >
                  {isSoldOut
                    ? "Sold Out"
                    : `${event.available_slots} posti liberi`}
                </span>
              </div>
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition duration-700 ${
                    isSoldOut ? "bg-red-500" : "bg-[#FFD700]"
                  }`}
                  style={{ width: `${availabilityPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-zinc-700 mt-2 text-right">
                {event.total_slots - event.available_slots} /{" "}
                {event.total_slots} posti prenotati
              </p>
            </div>

            {/* Description */}
            {event.description && (
              <div className="prose prose-invert prose-zinc max-w-none">
                <h2 className="text-xs uppercase tracking-[0.3em] text-[#FFD700] font-bold mb-4">
                  L&apos;Esperienza
                </h2>
                <p className="text-zinc-300 leading-relaxed text-base whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            )}

            {/* Location Map */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[#FFD700] font-bold mb-4 flex items-center gap-2">
                <MapPin size={14} /> Location
              </h2>
              <p className="text-white font-semibold mb-1">{event.location_name}</p>
              <p className="text-zinc-500 text-sm mb-5">{event.location_address}</p>
              {/* Embedded Google Maps iframe */}
              <div className="rounded-xl overflow-hidden border border-zinc-800 aspect-16/7">
                <iframe
                  title="Mappa Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${
                    process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ""
                  }&q=${encodeURIComponent(
                    event.location_address || event.location_name
                  )}`}
                />
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  event.location_address || event.location_name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[10px] uppercase tracking-widest font-bold text-zinc-500 hover:text-[#FFD700] transition-colors"
              >
                <MapPin size={12} /> Apri in Google Maps
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              RIGHT COLUMN — Sticky Booking Form
          ══════════════════════════════════════════ */}
          <div className="lg:sticky lg:top-28 space-y-4">
            {/* Form Header */}
            <div className="bg-zinc-950 border border-[#FFD700]/20 rounded-2xl p-6">
              <div className="h-0.5 w-full bg-[#FFD700] rounded-full mb-6" />
              <h2 className="text-xl font-black uppercase tracking-widest text-white mb-1">
                Prenota il tuo posto
              </h2>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Completa i dati e procedi al pagamento sicuro con Stripe.
              </p>
            </div>

            <EventDetailBookingForm
              eventId={event.id}
              eventTitle={displayTitle}
              eventPrice={price}
              availableSlots={event.available_slots}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
