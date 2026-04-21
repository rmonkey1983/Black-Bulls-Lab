"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Users, ArrowRight, Bell } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_WHATSAPP } from "@/lib/constants";

interface EventDate {
  format: string;
  date: string;
  spots: string;
  price: string;
  slug: string;
}

const DEFAULT_EVENTS: EventDate[] = [
  { format: "Cena Con Delitto", date: "Spring 2026", spots: "Waitlist aperta", price: "Da €35 a persona", slug: "/format/cena-con-delitto" },
  { format: "A Cena Con Il Bugiardo", date: "Maggio 2026", spots: "Pochi posti", price: "Da €35 a persona", slug: "/format/a-cena-con-il-bugiardo" },
  { format: "Eventi Aziendali", date: "Su richiesta", spots: "Esclusivo", price: "Personalizzato da €45", slug: "/eventi-aziendali" },
];

interface ProssimeDateProps {
  events?: EventDate[];
}

export function ProssimeDate({ events = DEFAULT_EVENTS }: ProssimeDateProps) {
  return (
    <section id="prossime-date" className="py-20 md:py-32 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="PROSSIME"
          highlight="DATE."
          subtitle="Upcoming"
          align="center"
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {events.slice(0, 3).map((event, i) => (
            <Link
              key={i}
              href={event.slug}
              className="group relative flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-md hover:border-yellow-500/30 transition-all duration-500"
            >
              {/* Spots Badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-heading font-bold uppercase tracking-widest text-red-400">
                  <Users size={10} />
                  {event.spots}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                    <Calendar size={18} className="text-yellow-500" />
                  </div>
                  <span className="font-heading text-xs text-zinc-400 uppercase tracking-[0.2em] font-bold">
                    {event.date}
                  </span>
                </div>

                {/* Format Name */}
                <h3 className="font-heading text-2xl lg:text-3xl font-bold uppercase text-white tracking-tighter leading-none group-hover:text-yellow-500 transition-colors duration-500">
                  {event.format}
                </h3>

                {/* Price */}
                <p className="font-sans text-sm text-zinc-400 font-light">
                  {event.price}
                </p>
              </div>

              {/* CTA */}
              <div className="pt-8 mt-auto flex items-center justify-between border-t border-white/5">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">
                  Prenota
                </span>
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black group-hover:translate-x-1 transition-transform duration-300 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Notify CTA */}
        <div className="mt-16 text-center">
          <a
            href={`https://wa.me/${CONTACT_WHATSAPP}?text=Ciao!%20Sarei%20interessato%2Fa%20a%20essere%20inserito%20nella%20waitlist%20per%20le%20prossime%20date%202026.%20Spero%20di%20sentirvi%20presto!`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all duration-300"
          >
            <Bell size={16} className="text-yellow-500" />
            <span className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-zinc-300 group-hover:text-white transition-colors">
              Vuoi essere avvisato?
            </span>
            <ArrowRight size={14} className="text-zinc-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
          </a>
        </div>
      </div>
    </section>
  );
}
