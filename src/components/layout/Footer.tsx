"use client";

import Link from "next/link";
import Image from "next/image";

const WA_NUMBER = "393342010067";
const WA_MSG    = encodeURIComponent("Ciao! Vorrei informazioni su un evento con Black Bulls Lab");

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black-pure border-t border-white/5 py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" aria-label="Black Bulls Lab — Home" suppressHydrationWarning className="block">
              <Image
                src="/brand/logo-white.svg"
                alt="Black Bulls Lab"
                width={160}
                height={36}
                className="w-[140px] md:w-[160px] h-auto"
              />
            </Link>
            <p className="font-syne text-[10px] uppercase tracking-[0.4em] text-text-secondary leading-relaxed max-w-sm">
              Il Laboratorio delle Emozioni. Esperienze immersive, dinner show esclusivi e performance d&apos;avanguardia.
            </p>
            <div className="space-y-2">
              <p className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary opacity-60">Sede Creativa: Torino, Italia</p>
              <p className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary/40" suppressHydrationWarning>
                © {year} Black Bulls Lab. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="space-y-8">
              <p className="font-syne text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold">Serate</p>
              <ul className="space-y-4">
                <li><Link href="/format/a-cena-con-il-bugiardo" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">A Cena Con Il Bugiardo</Link></li>
                <li><Link href="/format/il-palqo" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">Il PalQo</Link></li>
                <li><Link href="/format/cena-con-delitto" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">Cena Con Delitto</Link></li>
                <li><Link href="/format/the-golden-voice" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">The Golden Voice</Link></li>
              </ul>
            </div>
            <div className="space-y-8">
              <p className="font-syne text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold">Lab</p>
              <ul className="space-y-4">
                <li><Link href="/chi-siamo" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">Chi Siamo</Link></li>
                <li><Link href="/talents" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">Artisti</Link></li>
                <li><Link href="/eventi-aziendali" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">Corporate</Link></li>
                <li><Link href="/gallery" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">Galleria</Link></li>
                <li><Link href="/blog" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">Blog</Link></li>
              </ul>
            </div>
            <div className="space-y-8">
              <p className="font-syne text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold">Contatti</p>
              <ul className="space-y-4">
                <li>
                  <a href={`mailto:info@blackbullslab.com`} className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">
                    info@blackbullslab.com
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500"
                  >
                    WhatsApp
                  </a>
                </li>
                <li><Link href="/calendario" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">Prenota una serata</Link></li>
              </ul>
            </div>
            <div className="space-y-8">
              <p className="font-syne text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold">Social</p>
              <ul className="space-y-4">
                <li>
                  <a href="https://instagram.com/blackbullslab" target="_blank" rel="noopener noreferrer" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com/blackbullslab" target="_blank" rel="noopener noreferrer" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com/@blackbullslab" target="_blank" rel="noopener noreferrer" className="font-syne text-[9px] uppercase tracking-[0.3em] text-text-secondary hover:text-accent-gold transition-colors duration-500">
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-syne text-[9px] uppercase tracking-[0.4em] text-text-secondary/40">System Status: Online // Entertainment Laboratory</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="font-syne text-[9px] uppercase tracking-[0.2em] text-text-secondary/40 hover:text-text-primary transition-colors">Privacy</Link>
            <Link href="/cookie-policy" className="font-syne text-[9px] uppercase tracking-[0.2em] text-text-secondary/40 hover:text-text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
