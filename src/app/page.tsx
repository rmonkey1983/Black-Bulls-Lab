import { HeroSection } from "@/components/layout/HeroSection";
import { HappeningVibes } from "@/components/ui/HappeningVibes";
import { EventCard } from "@/components/ui/EventCard";
import { Marquee } from "@/components/polish/Marquee";

export default function Home() {
  const events = [
    {
      id: "1",
      slug: "notte-medievale",
      title: "Notte Medievale: Il Banchetto del Toro",
      date: "15.06.2026",
      location: "Sala dei Cavalieri",
      category: "Dinner Show",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "2",
      slug: "neon-jazz",
      title: "Neon Jazz Experience",
      date: "22.06.2026",
      location: "Rooftop Lounge",
      category: "Music & Drink",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "3",
      slug: "comedy-club",
      title: "Comedy Club: Risate al Buio",
      date: "29.06.2026",
      location: "Underground Stage",
      category: "Comedy",
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      <HeroSection />

      {/* Data Stream Divider */}
      <div className="py-6 border-y border-green/10 bg-green/[0.02] relative z-30">
        <Marquee className="text-green/70 font-bold text-sm uppercase tracking-[0.3em]" direction="left">
          <span className="mx-6 text-green/30">◆</span> LIVE EXPERIMENTS
          <span className="mx-6 text-green/30">◆</span> SPECIMEN ANALYSIS
          <span className="mx-6 text-green/30">◆</span> MOLECULAR FUSION
          <span className="mx-6 text-green/30">◆</span> SENSORY PROTOCOLS
        </Marquee>
      </div>

      <div className="space-y-12 py-12 relative z-20">
        {/* Active Specimens */}
        <div className="space-y-4">
          <div className="px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-green/50" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Campioni Attivi
              </h2>
            </div>
            <span className="data-readout text-[10px] font-semibold text-green/60 uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse-glow shadow-[0_0_6px_rgba(0,255,136,0.4)]" /> In Corso
            </span>
          </div>
          <HappeningVibes />
        </div>

        {/* Data Stream Divider 2 */}
        <div className="py-3 border-y border-green/5 bg-green/[0.01]">
          <Marquee className="text-green/20 text-[10px] uppercase tracking-[0.5em]" direction="right">
            TORINO UNDERGROUND CULTURE ◇ BLACK BULLS LAB ◇ EST. 2026 ◇ PROTOCOLLO ESPERIMANTALE ◇
          </Marquee>
        </div>

        {/* Prossimi Esperimenti */}
        <div className="px-6 space-y-6">
          <div className="flex items-end justify-between border-b border-green/10 pb-4">
            <div>
              <span className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase block mb-2">
                Catalogo // Prossimi
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Prossimi Esperimenti
              </h2>
              <p className="text-gray-500 text-sm mt-1 data-readout">
                Seleziona il tuo prossimo protocollo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
