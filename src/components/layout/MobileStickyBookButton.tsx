"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, UserPlus } from "lucide-react";
import { QUOTE_LABEL, getQuoteHref } from "@/lib/quote";
import { FORMAT_ACCENT_OXBLOOD } from "@/lib/constants";

export function MobileStickyBookButton() {
  const pathname = usePathname();
  const isBugiardoPage = pathname === "/format/a-cena-con-il-bugiardo";
  const isHiddenRoute =
    ["/contatti", "/success", "/checkin", "/profile"].includes(pathname) || pathname.startsWith("/admin");

  if (isHiddenRoute) return null;

  const isPartnerPage = pathname === "/locali-partner";
  const isGoldenVoicePage = pathname === "/format/the-golden-voice";
  const href = isPartnerPage ? "#proposta" : isGoldenVoicePage ? "#casting-form" : getQuoteHref(pathname);
  const label = isPartnerPage ? "Proponi la tua location" : isGoldenVoicePage ? "Lascia il tuo interesse" : QUOTE_LABEL;

  if (isBugiardoPage) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-100 md:hidden">
        {/* Pulse glow on top border for visibility on dark bg (Liar Crimson Theme) */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#641F2E] to-transparent animate-pulse" />
        <Link
          href="#lista-attesa"
          suppressHydrationWarning
          className="flex items-center justify-center gap-3 p-3 text-white font-heading uppercase font-bold text-base tracking-widest shadow-[0_-5px_20px_rgba(100,31,46,0.4)] transition-all active:scale-95 active:bg-[#7A293A]"
          style={{ backgroundColor: FORMAT_ACCENT_OXBLOOD, paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        >
          <UserPlus size={18} strokeWidth={2.5} className="text-white animate-bounce" />
          Entra nella lista
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-100 md:hidden">
      {/* Pulse glow on top border for visibility on dark bg */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-accent-gold to-transparent animate-pulse" />
      <Link
        href={href}
        suppressHydrationWarning
        className="flex items-center justify-center gap-3 p-2.5 bg-accent-gold text-black-pure font-heading uppercase font-bold text-base tracking-widest shadow-[0_-5px_20px_rgba(200,169,107,0.15)] transition-[transform] active:scale-95"
        style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
      >
        <FileText size={18} strokeWidth={2.5} />
        {label}
      </Link>
    </div>
  );
}
