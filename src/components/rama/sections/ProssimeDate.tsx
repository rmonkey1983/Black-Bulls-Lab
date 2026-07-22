"use client";

import Link from "next/link";
import { Calendar, Users, ArrowRight, Bell } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_WHATSAPP } from "@/lib/constants";

interface EventDate {
  id: string;
  location_name: string;
  title?: string;
  event_date: string;
  available_slots: number;
  price?: number;
}

interface ProssimeDateProps {
  events: EventDate[];
}

export function ProssimeDate({ events }: ProssimeDateProps) {
  if (!events || events.length === 0) return null;

  return (
    <section id="prossime-date" className="reveal-section section-padding bg-black-pure border-t border-white/5" suppressHydrationWarning>
      <div className="container-max">
        <SectionHeading
          title="PROSSIME"
          highlight="DATE"
          subtitle="Prossime Sessioni d'Esperienza"
          align="center"
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-24 lg:mt-40">
          {events.map((event) => {
            const isSoldOut = event.available_slots === 0;
            const dateObj = new Date(event.event_date);
            
            return (
              <Link
                key={event.id}
                href={`/calendario/${event.id}`}
                className="group relative flex flex-col justify-between p-6 md:p-10 lg:p-12 border border-white/5 bg-black-elevated/10 rounded-none backdrop-blur-3xl transition-[border-color,box-shadow] duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-accent-gold/20 hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] stagger-item"
                suppressHydrationWarning
              >
                {/* Spots Badge */}
                <div className="absolute top-5 right-5 md:top-8 md:right-8">
                  <span className={`inline-flex items-center gap-2 px-4 py-1.5 border text-[9px] font-syne font-bold uppercase tracking-[0.4em] ${
                    isSoldOut 
                      ? "bg-red-500/5 border-red-500/20 text-red-500" 
                      : "bg-accent-gold/5 border-accent-gold/20 text-accent-gold"
                  }`}>
                    <Users size={12} strokeWidth={1.2} />
                    {isSoldOut ? "Tutto Esaurito" : `${event.available_slots} Posti Rimasti`}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-12">
                  {/* Date */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-gold/5 border border-accent-gold/20 flex items-center justify-center">
                      <Calendar size={18} strokeWidth={1.2} className="text-accent-gold" />
                    </div>
                    <span className="font-syne text-[10px] text-text-secondary uppercase tracking-[0.4em] font-bold opacity-40">
                      {dateObj.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Format Name / Title */}
                  <h3 className="font-syne text-3xl lg:text-4xl font-bold uppercase text-text-primary tracking-tighter leading-none group-hover:text-accent-gold transition-colors duration-700">
                    {event.title || event.location_name}
                  </h3>

                  {/* Price */}
                  <p className="font-inter text-xs uppercase tracking-[0.3em] text-text-secondary opacity-40">
                    Ingresso: <span className="text-text-primary font-bold">€{event.price || 50}</span>
                  </p>
                </div>

                {/* CTA */}
                <div className="pt-6 mt-6 md:pt-12 md:mt-12 flex items-center justify-between border-t border-white/5">
                  <span className="font-syne text-[9px] font-bold uppercase tracking-[0.4em] text-text-secondary group-hover:text-accent-gold transition-colors duration-700">
                    {isSoldOut ? "Scopri" : "Ottieni Accesso"}
                  </span>
                  <div className={`w-10 h-10 flex items-center justify-center border border-accent-gold/20 transition-[background-color,color,border-color] duration-700 ${
                    isSoldOut ? "bg-white/5 text-text-secondary" : "bg-accent-gold text-black-pure group-hover:bg-text-primary group-hover:translate-x-1"
                  }`}>
                    <ArrowRight size={16} strokeWidth={1.2} />
                  </div>
                </div>
                
                {/* Cinematic Details */}
                <div className="absolute inset-0 pointer-events-none z-30">
                  <div className="absolute inset-0 opacity-[0.02] bg-[url('/noise.webp')] mix-blend-overlay" />
                  <div className="absolute inset-0 bg-linear-to-br from-white/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Notify CTA */}
        <div className="mt-24 lg:mt-40 text-center">
          <a
            href={`https://wa.me/${CONTACT_WHATSAPP}?text=Ciao!%20Sarei%20interessato%2Fa%20a%20essere%20inserito%20nella%20waitlist%20per%20le%20prossime%20date%202026.%20Spero%20di%20sentirvi%20presto!`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 px-10 py-5 border border-white/5 bg-black-elevated/20 hover:border-accent-gold/30 transition-[border-color,background-color] duration-700"
            suppressHydrationWarning
          >
            <Bell size={18} strokeWidth={1.2} className="text-accent-gold ambient-float" />
            <span className="font-syne text-[10px] uppercase tracking-[0.4em] font-bold text-text-secondary group-hover:text-text-primary transition-colors">
              Richiedi Notifica
            </span>
            <ArrowRight size={16} strokeWidth={1.5} className="text-text-secondary group-hover:text-accent-gold group-hover:translate-x-2 transition-[border-color,background-color] duration-700" />
          </a>
        </div>
      </div>
    </section>
  );
}
