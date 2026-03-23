import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-2xl mx-auto text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-rama-text/70 hover:text-rama-accent transition-colors uppercase text-xs font-bold tracking-widest mb-12"
                >
                    <ArrowLeft size={16} /> Torna alla Home
                </Link>

                <div className="border border-border bg-bg-card/30 p-12 relative">
                    <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-rama-accent/15" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-rama-accent/15" />

                    <div className="w-16 h-16 border border-rama-accent/30 mx-auto flex items-center justify-center mb-6">
                        <User size={28} className="text-rama-accent/50" />
                    </div>
                    <h1 className="font-mohave text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-4">
                        Area <span className="text-rama-accent">Personale</span>
                    </h1>
                    <p className="text-rama-muted font-outfit text-lg">
                        Questa sezione sarà disponibile a breve.
                    </p>
                    <p className="text-rama-muted/60 font-outfit text-sm mt-2">
                        Potrai gestire le tue prenotazioni, i biglietti e le preferenze.
                    </p>
                </div>
            </div>
        </div>
    );
}
