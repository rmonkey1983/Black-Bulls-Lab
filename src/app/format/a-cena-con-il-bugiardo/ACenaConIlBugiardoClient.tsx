"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Smartphone, CheckCircle2, AlertTriangle, Building2, PartyPopper, Zap, ArrowLeft } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { animateHeroText, animateFade, animateCards } from "@/lib/gsapAnimations";
import { FormatQuickInfo } from "@/components/events/FormatQuickInfo";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export function ACenaConIlBugiardoClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    animateHeroText("#liar-hero", 0.1);
    animateFade(".liar-tag", "up", 0.3);
    animateFade(".liar-desc", "up", 0.4);
    const items = gsap.utils.toArray(".reveal-liar");
    items.forEach((item: any) => {
      gsap.from(item, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className={`${anton.variable} min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-600 selection:text-white`}>
      
      {/* 1. HERO SECTION: L'Impatto */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <Image
            src="/images/brand/background.webp"
            alt="LIAR SYSTEM Background"
            fill
            className="object-contain opacity-20 scale-150"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-20 mix-blend-overlay pointer-events-none" />
        </div>

        <div className="absolute top-24 left-6 z-30">
            <Link
                href="/format"
                suppressHydrationWarning
                className="flex items-center gap-2 text-white/70 hover:text-red-600 transition-colors uppercase text-xs font-bold tracking-widest backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full border border-white/10"
            >
                <ArrowLeft size={14} /> Tutti i format
            </Link>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto p-6 md:p-12 mb-12">
            <div id="liar-hero" className="flex flex-col space-y-8">
                <div className="liar-tag flex flex-wrap items-center gap-3 text-red-600 text-sm font-bold uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2 bg-red-600/10 backdrop-blur-sm px-3 py-1 rounded-full border border-red-600/20">
                        <Zap size={14} /> Social Game Experience
                    </span>
                    <span className="flex items-center gap-2 bg-zinc-800/80 text-white backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                        Protocol: Social Deception
                    </span>
                </div>

                <h1 className="font-anton text-4xl sm:text-5xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter uppercase text-white">
                    <span>IL TUO TAVOLO È</span><br />
                    <span className="text-zinc-500">PIENO DI BUGIARDI.</span><br />
                    <span className="text-red-600">DIMOSTRALO.</span>
                </h1>

                <p className="liar-desc text-base sm:text-xl md:text-2xl text-gray-300 font-light max-w-3xl border-l-4 border-red-600 pl-6 italic">
                    Entra in LIAR SYSTEM. La prima Social Game Experience in cui la fiducia è un difetto, lo smartphone è un'arma e lo spettacolo... siete voi.
                </p>
            </div>
        </div>
      </section>

      {/* QUICK INFO BAR */}
      <FormatQuickInfo 
        duration="3 ore circa"
        capacity="20 - 100+ persone"
        price="Da 50€ / pers"
        highlight="Proprietary Web App"
        highlightLabel="Tecnologia"
      />

      {/* 2. IL FILTRO: Fuori i nostalgici */}
      <section id="disclaimer" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="reveal-liar border border-red-600/30 bg-red-600/5 p-8 md:p-16 rounded-3xl relative overflow-hidden group hover:bg-red-600/10 transition-colors duration-500">
          <div className="absolute -top-10 -right-10 text-red-600/10 group-hover:scale-110 transition-transform duration-1000">
            <AlertTriangle size={200} />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-4">
               <span className="h-px w-12 bg-red-600" />
               <span className="text-red-600 font-bold uppercase tracking-widest text-[10px]">Il Futuro dell&apos;Intrattenimento</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-tight text-white">
              Se amate il fascino del teatro classico e delle indagini guidate da attori professionisti, la nostra Cena con Delitto tradizionale è ciò che fa per voi.
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl font-light">
              (La trovate <Link href="/format/cena-con-delitto" suppressHydrationWarning className="text-white underline decoration-red-600/50 hover:text-red-600 transition-colors">cliccando qui</Link>).
            </p>
            
            <div className="text-xl md:text-3xl font-bold uppercase tracking-tighter leading-tight text-white border-l-4 border-red-600 pl-8 py-2">
              Se invece cercate un&apos;esperienza dove i protagonisti siete voi, pronti a sfidare colleghi e amici in un gioco di strategia supportato da una tecnologia all&apos;avanguardia, allora siete nel posto giusto. <span className="text-red-600">Benvenuti nel futuro dell&apos;intrattenimento.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COME FUNZIONA: Regole spietate */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-anton text-5xl md:text-7xl uppercase tracking-tighter text-white">
              TRE REGOLE. <span className="text-red-600">NESSUNA PIETÀ.</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto" />
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-light pt-4">
              Nessun copione da imparare. Tutto è gestito dalla nostra Web App proprietaria e dal nostro Game Master in sala. Voi dovete solo mangiare, bere e guardarvi le spalle.
            </p>
          </div>

          <div id="rules-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Smartphone className="text-red-600" size={32} />,
                title: "1. Esegui l'Accesso (E taci)",
                desc: "Niente app pesanti da scaricare. Inquadri il QR code sul tavolo, entri nel network e il Sistema ti assegna segretamente un ruolo. Potresti essere un onesto Investigatore o un pessimo individuo."
              },
              {
                icon: <Search className="text-red-600" size={32} />,
                title: "2. Baratta e Menti",
                desc: "Durante la cena, il tuo terminale riceverà indizi frammentati e 'missioni sociali' da completare al tavolo per creare caos. Alzati, negozia informazioni con gli altri, diffondi false piste. Nessuno ha la verità in tasca."
              },
              {
                icon: <CheckCircle2 className="text-red-600" size={32} />,
                title: "3. Emetti la Sentenza",
                desc: "Al momento del dolce, il tavolo deve inserire il nome del colpevole nel Sistema. Sbagliate l'accusa? Il Bugiardo vince, e voi pagate il conto morale della sconfitta."
              }
            ].map((step, i) => (
              <div
                key={i}
                className="reveal-liar bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition duration-500 group flex flex-col items-center text-center gap-6"
              >
                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center text-red-600 shrink-0 group-hover:scale-110 transition-transform duration-500 border border-red-600/20 shadow-[0_0_20px_rgba(220,38,38,0.1)]">
                    {step.icon}
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-gray-400 text-base leading-relaxed font-sans">
                        {step.desc}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. I TARGET: Chi ha il coraggio di giocare? */}
      <section id="targets-section" className="py-24 px-6 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          <div className="reveal-liar space-y-8">
            <div className="inline-flex items-center gap-3 text-red-600 font-bold uppercase tracking-widest text-[10px]">
                <Building2 size={16} /> Team Building Aziendale (B2B)
            </div>
            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none text-white">
              Il vero problem solving <br /> si vede sotto pressione.
            </h3>
            <p className="text-gray-400 text-xl font-light leading-relaxed">
              Le solite attività di team building vi fanno sbadigliare? Mettete alla prova le vere soft skills del vostro ufficio: negoziazione spietata, deduzione logica e pensiero laterale. Ideale per gruppi da 20 a 100+ persone.
            </p>
          </div>

          <div className="reveal-liar space-y-8">
            <div className="inline-flex items-center gap-3 text-red-600 font-bold uppercase tracking-widest text-[10px]">
                <PartyPopper size={16} /> Private Party (B2C)
            </div>
            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none text-white">
              Pensate di <br /> conoscervi bene?
            </h3>
            <p className="text-gray-400 text-xl font-light leading-relaxed">
              Compleanni, feste di laurea, o semplicemente una cena che non sia la solita pizza. Mettete in gioco anni di amicizia. Ridi, bluffa, tradisci la fiducia del tuo migliore amico per un indizio extra e scopri chi è il vero manipolatore del gruppo.
            </p>
          </div>

        </div>
      </section>

      {/* 5. IL GAME MASTER: Il burattinaio */}
      <section id="gamemaster" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="reveal-liar lg:w-1/2 space-y-8">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest">
              <Zap size={16} className="animate-pulse" /> Protocollo Live
            </div>
            <h2 className="font-anton text-6xl md:text-8xl uppercase tracking-tighter leading-[0.85] text-white">
              IL SISTEMA È <br /> <span className="text-red-600">MONITORATO.</span>
            </h2>
            <p className="text-gray-300 text-xl font-light leading-relaxed border-l-4 border-red-600 pl-8">
              Non vi lasciamo soli in balia del caos. Ogni evento LIAR SYSTEM è guidato in presenza da un nostro Game Master. È lui che attiva le missioni, gestisce i colpi di scena dalla console di regia e si assicura che il ritmo della serata non cali mai.
            </p>
          </div>
          
          <div className="reveal-liar lg:w-1/2 relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <Image
              src="/images/brand/bg-venue-crowd.webp"
              alt="Game Master"
              fill
              className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
            <div className="absolute top-8 left-8 border-l border-red-600 pl-4 py-2 bg-black/40 backdrop-blur-md">
                <div className="text-[10px] text-red-600 font-bold tracking-widest uppercase">System Control</div>
                <div className="text-xl font-black text-white">MASTER_ON_SITE</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER: La Chiusura - Solid Red as requested */}
      <section className="py-32 px-6 bg-red-600 text-black text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/noise.webp')] mix-blend-overlay" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          <h2 className="font-anton text-6xl md:text-[8vw] uppercase tracking-tighter leading-[0.85]">
            IL SISTEMA È PRONTO <br className="hidden md:block" /> PER IL TUO GRUPPO. <br />
            <span className="bg-black text-red-600 px-6 inline-block">VOI LO SIETE?</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link 
              href="/calendario" 
              suppressHydrationWarning
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-rama-accent text-black text-xl font-black uppercase tracking-widest hover:bg-white transition duration-500 shadow-[0_20px_50px_rgba(234,179,8,0.3)] rounded-full border border-black/10 hover:scale-105 active:scale-95"
            >
              INIZIALIZZA IL TUO EVENTO
              <Zap size={24} className="text-black group-hover:animate-pulse" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
