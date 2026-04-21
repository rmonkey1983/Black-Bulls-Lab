"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSettings } from "@/lib/dataStore";
import {
    LayoutDashboard,
    FlaskConical,
    Image as ImageIcon,
    Users,
    Settings,
    LogOut,
    Lock,
    Shield,
    Eye,
    EyeOff,
    MessageSquare,
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, code: "DSH" },
    { name: "Richieste", href: "/admin/richieste", icon: MessageSquare, code: "REQ" },
    { name: "Eventi", href: "/admin/events", icon: FlaskConical, code: "EVT" },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon, code: "GAL" },
    { name: "Artisti", href: "/admin/talents", icon: Users, code: "TAL" },
    { name: "Impostazioni", href: "/admin/settings", icon: Settings, code: "SET" },
];

function LoginGate({ onLogin }: { onLogin: () => void }) {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const settings = await getSettings();
        if (password === settings.adminPassword) {
            sessionStorage.setItem("bbl_admin_auth", "true");
            onLogin();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-lab-dark flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="border border-green/15 bg-lab-card/50 relative">
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green/30" />
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green/30" />
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green/30" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-green/30" />

                    <div className="flex items-center gap-2 px-6 py-3 border-b border-green/10 bg-green/[0.02]">
                        <Shield size={14} className="text-green/50" />
                        <span className="data-readout text-[10px] text-green/50 tracking-[0.3em] uppercase">
                            Autenticazione Richiesta
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        <div className="text-center mb-4">
                            <Lock size={32} className="text-green/30 mx-auto mb-3" />
                            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                            <p className="data-readout text-[10px] text-gray-500 mt-1 tracking-wider">
                                BLACK BULLS LAB // CONTROL CENTER
                            </p>
                        </div>

                        <div>
                            <label className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase block mb-2">
                                Password di Accesso
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Inserisci password..."
                                    className={`w-full bg-lab-dark/80 border px-4 py-3 pr-12 text-white text-sm data-readout
                                        placeholder:text-gray-600
                                        focus:outline-none transition-all duration-300
                                        ${error
                                            ? "border-red shadow-[0_0_15px_rgba(255,51,51,0.1)]"
                                            : "border-green/15 focus:border-green/40 focus:shadow-[0_0_15px_rgba(0,255,136,0.05)]"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-green/30 hover:text-green/70 transition-colors duration-200 cursor-pointer"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {error && (
                                <span className="data-readout text-[10px] text-red mt-2 block tracking-wider">
                                    ⚠ ACCESSO NEGATO — Password non valida
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 border border-green/40 bg-green/10 text-green text-sm font-bold
                                uppercase tracking-wider data-readout
                                hover:bg-green/20 hover:border-green/60 hover:shadow-[0_0_20px_rgba(0,255,136,0.15)]
                                transition-all duration-300"
                        >
                            Accedi al Sistema
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [authed, setAuthed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const auth = sessionStorage.getItem("bbl_admin_auth");
        if (auth === "true") setAuthed(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-lab-dark flex items-center justify-center">
                <div className="text-green/40 data-readout text-sm animate-pulse-glow">Inizializzazione sistema...</div>
            </div>
        );
    }

    if (!authed) {
        return <LoginGate onLogin={() => setAuthed(true)} />;
    }

    return (
        <div className="min-h-screen bg-lab-dark flex">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-lab-card/80 border-r border-green/10 z-40 flex flex-col">
                {/* Logo */}
                <div className="px-5 py-5 border-b border-green/10">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-6 h-6 border border-green/40 flex items-center justify-center rotate-45">
                            <div className="w-2 h-2 bg-green/60 rotate-[-45deg]" />
                        </div>
                        <span className="text-sm font-bold tracking-tighter text-white">
                            BBL <span className="text-green text-glow-green">ADMIN</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-glow" />
                        <span className="data-readout text-[8px] text-green/40 tracking-widest uppercase">Control Center</span>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== "/admin" && pathname.startsWith(item.href));
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider
                                    transition-all duration-200 group
                                    ${isActive
                                        ? "text-green bg-green/10 border-l-2 border-green"
                                        : "text-gray-400 hover:text-green hover:bg-green/5 border-l-2 border-transparent"
                                    }`}
                            >
                                <Icon size={16} />
                                <span>{item.name}</span>
                                <span className="ml-auto data-readout text-[8px] text-gray-muted/40 group-hover:text-green/30">
                                    {item.code}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-green/10 space-y-1">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2 text-xs text-gray-500 hover:text-cyan
                            uppercase tracking-wider transition-colors"
                    >
                        ← Torna al Sito
                    </Link>
                    <button
                        onClick={() => {
                            sessionStorage.removeItem("bbl_admin_auth");
                            setAuthed(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2 text-xs text-gray-500 hover:text-red
                            uppercase tracking-wider transition-colors w-full cursor-pointer"
                    >
                        <LogOut size={14} />
                        Disconnetti
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 pt-6">
                {children}
            </main>
        </div>
    );
}
