import Link from "next/link";
import { Phone } from "lucide-react";

export function MobileStickyBookButton() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
            {/* Pulse glow on top border for visibility on dark bg */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rama-accent to-transparent animate-pulse" />
            <Link
                href="/contact"
                suppressHydrationWarning
                className="flex items-center justify-center gap-3 p-2.5 bg-rama-accent/95 backdrop-blur-md text-black font-heading uppercase font-bold text-base tracking-widest shadow-[0_-5px_20px_rgba(255,215,0,0.15)] transition-[transform] active:scale-95"
                style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
            >
                <Phone size={18} strokeWidth={2.5} />
                Prenota una serata
            </Link>
        </div>
    );
}
