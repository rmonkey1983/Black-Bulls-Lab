import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rama-accent/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Vertical accent lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 text-center space-y-10 max-w-2xl">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 font-heading text-[10px] uppercase tracking-[0.3em] text-red-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            ERROR_404
          </span>
        </div>

        {/* Glitch 404 */}
        <div className="relative select-none" aria-hidden="true">
          <span className="font-heading font-bold text-[10rem] md:text-[14rem] leading-none tracking-tighter text-white/[0.04] block glitch-text">
            404
          </span>
        </div>

        {/* Copy */}
        <div className="space-y-4 -mt-16 relative z-10">
          <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter italic -skew-x-2 text-white">
            ESPERIMENTO <span className="text-rama-accent">FALLITO.</span>
          </h1>
          <p className="font-sans text-zinc-400 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
            Questa pagina non esiste nel laboratorio.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-rama-accent text-black font-heading font-bold uppercase tracking-[0.2em] text-xs px-10 py-5 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(229,182,12,0.25)]"
          >
            Torna al Lab
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Tech footer */}
        <p className="pt-12 text-[8px] font-heading text-zinc-600 uppercase tracking-[0.8em]">
          Black Bulls Lab / Protocol-Null / 0404-NF
        </p>
      </div>

      {/* CSS-only glitch animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .glitch-text {
              animation: glitch 3s infinite;
            }
            @keyframes glitch {
              0%, 90%, 100% { transform: translate(0); }
              92% { transform: translate(-4px, 2px); filter: hue-rotate(90deg); }
              94% { transform: translate(4px, -2px); }
              96% { transform: translate(-2px, -1px); filter: hue-rotate(0deg); }
              98% { transform: translate(2px, 1px); }
            }
          `,
        }}
      />
    </main>
  );
}
