"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

interface ScrollScrubHeroProps {
  videoSrc?: string;
  poster?: string;
  className?: string;
}

const DEFAULT_VIDEO = "https://raw.githubusercontent.com/gughigug/metro-hero-assets/main/Subway_doors_open_to_city_202608242331.mp4";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ScrollScrubHero({ videoSrc = DEFAULT_VIDEO, poster = "/images/brand/bg-hero-wide.webp", className = "" }: ScrollScrubHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let duration = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / travel, 0, 1);

      if (!reduceMotion && duration > 0 && Number.isFinite(duration)) {
        video.currentTime = progress * duration;
      }

      if (titleRef.current) {
        const visible = 1 - clamp(progress / 0.32, 0, 1);
        titleRef.current.style.opacity = String(visible);
        titleRef.current.style.transform = `translateY(${(1 - visible) * -24}px) scale(${0.96 + visible * 0.04})`;
        titleRef.current.style.filter = `blur(${(1 - visible) * 10}px)`;
      }
      if (taglineRef.current) {
        const visible = reduceMotion ? 1 : clamp((progress - 0.72) / 0.28, 0, 1);
        taglineRef.current.style.opacity = String(visible);
        taglineRef.current.style.transform = `translateY(${(1 - visible) * 20}px)`;
        taglineRef.current.style.filter = `blur(${(1 - visible) * 8}px)`;
      }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onMetadata = () => { duration = video.duration; setVideoReady(true); };
    const onError = () => setVideoReady(false);

    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("error", onError);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("error", onError);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const ctaStyle: CSSProperties = { minHeight: 44 };

  return (
    <section ref={sectionRef} className={`relative h-[190svh] ${className}`} aria-label="Black Bulls Lab: esperienze dal vivo a Torino">
      <div className="sticky top-0 h-svh overflow-hidden bg-black-pure">
        <video ref={videoRef} src={videoSrc} poster={poster} muted playsInline preload="metadata" aria-hidden="true" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoReady ? "opacity-45" : "opacity-0"}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(153,0,0,0.28),transparent_42%),linear-gradient(180deg,rgba(5,5,5,0.28),rgba(5,5,5,0.7)_75%,#050505)]" />
        {!videoReady && <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: `url(${poster})` }} aria-hidden="true" />}

        <div ref={titleRef} className="absolute inset-0 z-10 flex items-center px-6 text-center transition-[opacity,filter,transform] duration-150 will-change-[opacity,filter,transform] motion-reduce:!transform-none motion-reduce:!filter-none motion-reduce:!opacity-100">
          <div className="mx-auto w-full max-w-6xl">
            <p className="mb-6 font-syne text-xs font-bold uppercase tracking-[0.35em] text-accent-gold">Black Bulls Lab · Torino</p>
            <h1 className="w-full max-w-full break-words font-heading text-[clamp(3rem,8vw,8.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.06em] text-white">Il pubblico<br /><span className="text-accent-gold italic">cambia tutto.</span></h1>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-zinc-200 md:text-xl">Format dal vivo in cui non resti a guardare: partecipi, scegli e fai parte di ciò che succede.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="#esperienze" style={ctaStyle} className="inline-flex items-center justify-center gap-3 rounded-lg bg-accent-gold px-7 py-4 font-syne text-xs font-bold uppercase tracking-[0.22em] text-black-pure transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Scopri le esperienze <ArrowRight size={16} /></Link>
              <Link href="/contatti" style={ctaStyle} className="inline-flex items-center justify-center rounded-lg border border-white/30 px-7 py-4 font-syne text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors duration-200 hover:border-accent-gold hover:text-accent-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold">Organizza un evento</Link>
            </div>
          </div>
        </div>

        <div ref={taglineRef} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center opacity-0 will-change-[opacity,filter,transform] motion-reduce:!transform-none motion-reduce:!filter-none motion-reduce:!opacity-100">
          <p className="max-w-5xl font-heading text-[clamp(2rem,5vw,5.5rem)] font-extrabold uppercase leading-[0.92] text-white">Una cena.<br /><span className="text-[#990000] italic">Un bugiardo.</span><br />Nessun attore.</p>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] font-bold uppercase tracking-[0.35em] text-white/70 motion-reduce:hidden"><span>Scorri</span><ArrowDown size={16} className="animate-bounce" /></div>
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/15"><div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-accent-gold" /></div>
      </div>
    </section>
  );
}
