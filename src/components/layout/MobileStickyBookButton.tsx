import Link from "next/link";
import { Phone } from "lucide-react";

export function MobileStickyBookButton() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
            {/* Pulse glow on top border for visibility on dark bg */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rama-accent to-transparent animate-pulse" />
            <Link
                href="/contact"
                className="flex items-center justify-center gap-3 p-4 bg-rama-accent text-black font-mohave uppercase font-bold text-xl tracking-widest shadow-[0_-10px_30px_rgba(255,215,0,0.2)] transition-[transform] active:scale-95"
                style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
            >
                <Phone size={20} strokeWidth={2.5} />
                Richiedi Info
            </Link>
        </div>
    );
}
