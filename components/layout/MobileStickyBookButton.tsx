import Link from "next/link";
import { Calendar } from "lucide-react";

export function MobileStickyBookButton() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-100 md:hidden">
            {/* Pulse glow on top border for visibility on dark bg */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-accent-gold to-transparent animate-pulse" />
            <Link
                href="/calendario"
                suppressHydrationWarning
                className="flex items-center justify-center gap-3 p-2.5 bg-accent-gold text-black-pure font-heading uppercase font-bold text-base tracking-widest shadow-[0_-5px_20px_rgba(200,169,107,0.15)] transition-[transform] active:scale-95"
                style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
            >
                <Calendar size={18} strokeWidth={2.5} />
                Prenota una serata
            </Link>
        </div>
    );
}
