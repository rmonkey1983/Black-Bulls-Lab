"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift } from "lucide-react";

interface GiveawayStats {
  public_enabled: boolean;
  cycle_label: string;
  eligible_count: number;
  threshold: number;
  remaining: number;
  status: string;
  regulation_url: string;
}

export default function GiveawayCounterBlock() {
  const [stats, setStats] = useState<GiveawayStats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/community-giveaway/stats");
        if (res.ok) {
          const data: GiveawayStats = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Giveaway stats error:", err);
      }
    }
    loadStats();
  }, []);

  // Rigorosa feature flag check: Se disattivata o non disponibile, il blocco NON esiste nel DOM.
  if (!stats || !stats.public_enabled) {
    return null;
  }

  const progressPercentage = Math.min(100, Math.round((stats.eligible_count / stats.threshold) * 100));

  return (
    <section className="w-full bg-[#050505] border-y border-accent-gold/20 py-16 px-4 sm:px-6 relative overflow-hidden my-12">
      {/* Glow decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-[10px] font-mono font-bold uppercase tracking-[0.3em] rounded-full">
          <Gift size={14} /> COMMUNITY GIVEAWAY PROTOCOL
        </div>

        <h2 className="font-heading font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-white">
          UNA CENA PER DUE <span className="text-accent-gold italic">POTREBBE ESSERE LA TUA</span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Ogni mese, al raggiungimento di {stats.threshold} nuove iscrizioni valide, viene assegnata una cena per due offerta da Black Bulls Lab.
        </p>

        {/* Progress Bar Container */}
        <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl max-w-md mx-auto space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-400 uppercase tracking-widest">Stato Iscrizioni</span>
            <span className="text-accent-gold font-bold">{stats.eligible_count} / {stats.threshold} nuove iscrizioni valide</span>
          </div>

          <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-white/5">
            <div
              className="bg-linear-to-r from-accent-gold/80 to-accent-gold h-full transition-all duration-1000 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-xs text-zinc-400 font-mono">
            {stats.remaining > 0
              ? `Mancano ${stats.remaining} iscrizioni per attivare l’assegnazione del mese.`
              : "Soglia mensile raggiunta! In corso la preparazione dell'assegnazione ufficiale."}
          </p>
        </div>

        {/* Legal Links */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-500">
          <Link href={stats.regulation_url || "/privacy-policy"} className="hover:text-accent-gold underline transition">
            Regolamento completo
          </Link>
          <span>•</span>
          <Link href="/privacy-policy" className="hover:text-accent-gold underline transition">
            Privacy policy
          </Link>
        </div>
      </div>
    </section>
  );
}
