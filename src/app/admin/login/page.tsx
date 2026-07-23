"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Shield, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user) {
        setErrorMsg("Credenziali non valide o accesso non autorizzato.");
        setLoading(false);
        return;
      }

      // Safe redirect check to prevent open redirects
      const nextParam = searchParams.get("next");
      let targetUrl = "/admin";
      if (
        nextParam &&
        nextParam.startsWith("/admin") &&
        !nextParam.startsWith("//") &&
        !nextParam.includes("\\")
      ) {
        targetUrl = nextParam;
      }

      // Force full navigation to refresh server-side cookies
      window.location.href = targetUrl;
    } catch {
      setErrorMsg("Errore di connessione durante la verifica delle credenziali.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lab-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="border border-green/20 bg-lab-card/90 backdrop-blur-md relative p-1">
          {/* Cyberpunk corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green/40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green/40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green/40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green/40 pointer-events-none" />

          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-green/10 bg-green/5">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-green/70" />
              <span className="data-readout text-[10px] text-green/70 tracking-[0.25em] uppercase font-semibold">
                BLACK BULLS LAB // SECURE AUTH
              </span>
            </div>
            <div className="w-2 h-2 rounded-full bg-green/50 animate-pulse" />
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-green/10 border border-green/20 flex items-center justify-center mx-auto mb-3">
                <Lock size={20} className="text-green" />
              </div>
              <h1 className="text-xl font-bold text-white uppercase tracking-tight font-syne">
                Pannello Amministrativo
              </h1>
              <p className="data-readout text-[11px] text-gray-400 tracking-wider">
                Accesso riservato al personale autorizzato
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red/10 border border-red/30 p-3.5 rounded flex items-center gap-3 animate-in fade-in duration-300">
                <AlertCircle size={16} className="text-red flex-none" />
                <span className="data-readout text-xs text-red font-medium">
                  {errorMsg}
                </span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="admin-email"
                  className="data-readout text-[10px] text-green/70 tracking-[0.2em] uppercase block mb-1.5 font-medium"
                >
                  Identificativo Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@blackbullslab.com"
                  className="w-full bg-black-pure/80 border border-green/20 px-4 py-3 text-white text-sm data-readout focus:outline-none focus:border-green/60 transition-colors rounded-none placeholder:text-gray-600"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="data-readout text-[10px] text-green/70 tracking-[0.2em] uppercase block mb-1.5 font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-black-pure/80 border border-green/20 px-4 py-3 pr-12 text-white text-sm data-readout focus:outline-none focus:border-green/60 transition-colors rounded-none placeholder:text-gray-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 border border-green/50 bg-green/15 text-green text-xs font-bold uppercase tracking-[0.25em] data-readout disabled:opacity-50 hover:bg-green/30 hover:border-green/80 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,128,0.1)] cursor-pointer"
            >
              {loading ? "Verifica In Corso..." : "Autentica Sessione"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-lab-dark flex items-center justify-center">
          <div className="data-readout text-green/50 text-sm animate-pulse">
            Caricamento Gateway...
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
