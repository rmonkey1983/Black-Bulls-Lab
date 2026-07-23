"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  FlaskConical,
  Image as ImageIcon,
  Users,
  Settings,
  LogOut,
  Ticket,
  QrCode,
  TrendingUp,
  UserCheck,
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

export default function AdminLayoutClient({
  children,
  adminEmail,
}: {
  children: ReactNode;
  adminEmail?: string;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Whitelist for staff checkin page
  if (pathname.startsWith("/checkin")) {
    return <>{children}</>;
  }

  // If currently rendering login page, return children directly
  if (pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-lab-dark flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-green/10 bg-lab-card/80 sticky top-0 z-50 backdrop-blur-md">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tighter text-white font-syne">
            BBL <span className="text-green">ADMIN</span>
          </span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-green/60 hover:text-green cursor-pointer"
          aria-label="Toggle navigation"
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
      <aside
        className={`
          fixed md:static left-0 top-0 bottom-0 w-64 bg-lab-card/80 border-r border-green/10 z-50 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo (Desktop only) */}
        <div className="hidden md:block px-5 py-5 border-b border-green/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-6 h-6 border border-green/40 flex items-center justify-center rotate-45">
              <div className="w-2 h-2 bg-green/60 -rotate-45" />
            </div>
            <span className="text-sm font-bold tracking-tighter text-white font-syne">
              BBL <span className="text-green text-glow-green">ADMIN</span>
            </span>
          </Link>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-glow" />
            <span className="data-readout text-[8px] text-green/40 tracking-widest uppercase">
              Control Center
            </span>
          </div>
          {adminEmail && (
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-1.5">
              <UserCheck size={12} className="text-green/60 flex-none" />
              <span className="data-readout text-[9px] text-gray-400 truncate max-w-[170px]" title={adminEmail}>
                {adminEmail}
              </span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center justify-between px-3 py-2.5 rounded text-[11px] uppercase tracking-wider
                  font-mono transition-all duration-300
                  ${
                    isActive
                      ? "bg-green/10 text-green border border-green/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{item.name}</span>
                </div>
                <span className="data-readout text-[8px] text-gray-muted/40 group-hover:text-green/30">
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
            className="flex items-center gap-3 px-3 py-2 text-xs text-gray-500 hover:text-cyan uppercase tracking-wider transition-colors"
          >
            ← Torna al Sito
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-xs text-gray-500 hover:text-red uppercase tracking-wider transition-colors w-full cursor-pointer text-left"
          >
            <LogOut size={14} />
            Disconnetti
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 pt-6">{children}</main>
    </div>
  );
}
