"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
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
    Ticket,
    QrCode,
    TrendingUp,
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, code: "DSH" },
    { name: "Scanner", href: "/admin/scanner", icon: QrCode, code: "SCN" },
    { name: "Eventi", href: "/admin/events", icon: FlaskConical, code: "EVT" },
    { name: "Prenotazioni", href: "/admin/bookings", icon: Ticket, code: "BKG" },
    { name: "Crescita Community", href: "/admin/community", icon: TrendingUp, code: "COMM" },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon, code: "GAL" },
    { name: "Artisti", href: "/admin/talents", icon: Users, code: "TAL" },
    { name: "Impostazioni", href: "/admin/settings", icon: Settings, code: "SET" },
];

function LoginGate({ onLogin }: { onLogin: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        
        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            if (data.user) {
                // Successo
                onLogin();
            }
        } catch (err: any) {
            console.error("Auth error:", err.message);
            setError(true);
            setTimeout(() => setError(false), 3000);
        } finally {
            setLoading(false);
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

                    <div className="flex items-center gap-2 px-6 py-3 border-b border-green/10 bg-green/2">
                        <Shield size={14} className="text-green/50" />
                        <span className="data-readout text-[10px] text-green/50 tracking-[0.3em] uppercase">
                            Autenticazione Lab
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        <div className="text-center mb-4">
                            <Lock size={32} className="text-green/30 mx-auto mb-3" />
                            <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Admin Access</h2>
                            <p className="data-readout text-[10px] text-gray-500 mt-1 tracking-wider">
                                BLACK BULLS LAB // SECURE GATEWAY
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase block mb-2">
                                    Identificativo (Email)
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@blackbullslab.com"
                                    className="w-full bg-lab-dark/80 border border-green/15 px-4 py-3 text-white text-sm data-readout focus:outline-none focus:border-green/40 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase block mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full bg-lab-dark/80 border px-4 py-3 pr-12 text-white text-sm data-readout
                                            placeholder:text-gray-600 focus:outline-none transition duration-300
                                            ${error ? "border-red" : "border-green/15 focus:border-green/40"}`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green/30 hover:text-green/70 cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red/10 border border-red/20 p-3 rounded">
                                <span className="data-readout text-[9px] text-red block text-center uppercase tracking-widest">
                                    Accesso Negato // Credenziali Errate
                                </span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 border border-green/40 bg-green/10 text-green text-xs font-bold
                                uppercase tracking-[0.2em] data-readout disabled:opacity-50
                                hover:bg-green/20 hover:border-green/60 transition duration-300"
                        >
                            {loading ? "Verifica in corso..." : "Inizializza Sessione"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function AdminLayoutClient({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Whitelist per la pagina di check-in dello staff
    if (pathname.startsWith("/checkin")) {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-lab-dark flex items-center justify-center">
                <div className="text-green/40 data-readout text-sm animate-pulse-glow">Accesso al Database...</div>
            </div>
        );
    }

    if (!user) {
        return <LoginGate onLogin={() => {}} />;
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <div className="min-h-screen bg-lab-dark flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-green/10 bg-lab-card/80 sticky top-0 z-50 backdrop-blur-md">
                <Link href="/admin" className="flex items-center gap-2">
                    <span className="text-sm font-bold tracking-tighter text-white">
                        BBL <span className="text-green">ADMIN</span>
                    </span>
                </Link>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-green/60 hover:text-green"
                >
                    <LayoutDashboard size={24} />
                </button>
            </div>

            {/* Sidebar Overlay (Mobile only) */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static left-0 top-0 bottom-0 w-64 bg-lab-card/80 border-r border-green/10 z-50 flex flex-col
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                {/* Logo (Desktop only) */}
                <div className="hidden md:block px-5 py-5 border-b border-green/10">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-6 h-6 border border-green/40 flex items-center justify-center rotate-45">
                            <div className="w-2 h-2 bg-green/60 -rotate-45" />
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
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider
                                    transition duration-200 group
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
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 text-xs text-gray-500 hover:text-red
                            uppercase tracking-wider transition-colors w-full cursor-pointer text-left"
                    >
                        <LogOut size={14} />
                        Disconnetti
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8 pt-6">
                {children}
            </main>
        </div>
    );
}
