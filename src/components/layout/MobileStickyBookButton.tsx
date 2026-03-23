import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function MobileStickyBookButton() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
            <Link
                href="/events"
                className="flex items-center justify-center p-4 bg-rama-accent text-black font-mohave uppercase font-bold text-xl tracking-widest shadow-[0_-10px_20px_rgba(255,215,0,0.1)] transition-transform active:scale-95"
            >
                PRENOTA ORA
                <ArrowUpRight strokeWidth={3} className="ml-2 w-6 h-6" />
            </Link>
        </div>
    );
}
