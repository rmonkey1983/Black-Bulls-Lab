import React from "react";
import Link from "next/link";
import { ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rama-accent/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full border border-rama-accent/20 flex items-center justify-center bg-rama-accent/5 animate-pulse">
                <Ghost size={48} className="text-rama-accent" />
            </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-heading font-bold text-white text-8xl md:text-[12rem] leading-none tracking-tighter opacity-10">
            404
          </h1>
          <h2 className="font-rock-salt text-rama-accent text-2xl md:text-4xl transform -rotate-2 -mt-12 md:-mt-20 relative z-10">
            Protocollo Sconosciuto
          </h2>
        </div>

        <p className="font-sans text-rama-muted text-lg md:text-xl leading-relaxed">
          Spiacenti, l&apos;esperimento che stai cercando non esiste o è stato archiviato in una zona segreta del laboratorio.
        </p>

        <div className="pt-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-white text-black font-heading font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-full hover:bg-rama-accent transition-all transform active:scale-95"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Torna alla Base
          </Link>
        </div>

        <div className="pt-12">
            <p className="text-[10px] font-heading text-white/20 uppercase tracking-[0.5em]">
                Black Bulls Lab / Error-Log: 0404-NF
            </p>
        </div>
      </div>
    </main>
  );
}
