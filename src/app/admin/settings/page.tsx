"use client";

import { useEffect, useState } from "react";
import { SiteSettings, getSettings, saveSettings } from "@/lib/dataStore";
import { Save, Settings, Eye, EyeOff } from "lucide-react";

export default function AdminSettingsPage() {
    const [form, setForm] = useState<SiteSettings | null>(null);
    const [saved, setSaved] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        getSettings().then(setForm);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        if (form) {
            try {
                await saveSettings(form);
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Errore di connessione a Supabase.";
                setErrorMsg(message);
            }
        }
    };

    if (!form) return null;

    const inputClass = "w-full bg-lab-dark/80 border border-green/15 px-4 py-2.5 text-rama-text text-sm data-readout placeholder:text-gray-600 focus:outline-none focus:border-green/40 transition-all duration-300";
    const labelClass = "data-readout text-[10px] text-green/40 tracking-[0.2em] uppercase block mb-1.5";

    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <span className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase">SET // Configurazione</span>
                <h1 className="text-3xl font-bold text-rama-text mt-1">Impostazioni</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General */}
                <div className="border border-green/10 bg-lab-card/30 p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-green/10 pb-2">
                        <Settings size={14} className="text-green/40" />
                        <span className="data-readout text-[10px] text-green/40 tracking-[0.2em] uppercase">Informazioni Generali</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Titolo Sito</label>
                            <input value={form.siteTitle} onChange={(e) => setForm({ ...form, siteTitle: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Email Contatto</label>
                            <input value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} type="email" className={inputClass} />
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelClass}>Descrizione Sito</label>
                            <input value={form.siteDescription} onChange={(e) => setForm({ ...form, siteDescription: e.target.value })} className={inputClass} />
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelClass}>Sottotitolo Hero</label>
                            <input value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Social */}
                <div className="border border-green/10 bg-lab-card/30 p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-green/10 pb-2">
                        <span className="data-readout text-[10px] text-cyan/40 tracking-[0.2em] uppercase">Canali Social</span>
                    </div>
                    <div>
                        <label className={labelClass}>Instagram</label>
                        <input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder="@blackbullslab" className={inputClass} />
                    </div>
                </div>

                {/* Security */}
                <div className="border border-amber/10 bg-lab-card/30 p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-amber/10 pb-2">
                        <span className="data-readout text-[10px] text-amber/40 tracking-[0.2em] uppercase">⚠ Sicurezza</span>
                    </div>
                    <div>
                        <label className={labelClass}>Password Admin</label>
                        <div className="relative">
                            <input
                                value={form.adminPassword}
                                onChange={(e) => setForm({ ...form, adminPassword: e.target.value })}
                                type={showPassword ? "text" : "password"}
                                className={inputClass}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-rama-text cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        <span className="data-readout text-[9px] text-amber/30 mt-1 block tracking-wider">
                            Modifica la password di accesso al pannello admin
                        </span>
                    </div>
                </div>

                {errorMsg && (
                    <div className="bg-red/10 border border-red/40 text-red text-sm px-4 py-3 data-readout">
                        ⚠ ERRORE: {errorMsg}
                    </div>
                )}

                {/* Save */}
                <button
                    type="submit"
                    className={`w-full py-3 border text-sm font-bold uppercase tracking-wider data-readout
                        flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer
                        ${saved
                            ? "border-green bg-green/20 text-green"
                            : "border-green/40 bg-green/10 text-green hover:bg-green/20 hover:border-green/60"
                        }`}
                >
                    <Save size={14} />
                    {saved ? "✓ Salvato con Successo" : "Salva Impostazioni"}
                </button>
            </form>
        </div>
    );
}
