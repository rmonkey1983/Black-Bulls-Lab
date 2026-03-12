"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Users, Image } from "lucide-react";

export function BottomNav() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin") || pathname.startsWith("/rama")) return null;

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Eventi", href: "/events", icon: Calendar },
        { name: "Artisti", href: "/talents", icon: Users },
        { name: "Galleria", href: "/gallery", icon: Image },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-bg-dark/95 backdrop-blur-xl border-t border-gold/[0.08] z-50 md:hidden pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            suppressHydrationWarning
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300
                                ${isActive
                                    ? "text-gold"
                                    : "text-gray-500 hover:text-gold/70"
                                }`}
                        >
                            <div className="relative">
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold shadow-[0_0_8px_rgba(200,164,78,0.4)]" />
                                )}
                            </div>
                            <span className={`text-[9px] uppercase tracking-[0.15em] font-semibold
                                ${isActive ? "text-glow-gold" : ""}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
