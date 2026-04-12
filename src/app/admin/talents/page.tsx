"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Talent, getTalents, saveTalent, deleteTalent, generateId, slugify, uploadMediaFile } from "@/lib/dataStore";
import { Plus, Edit, Trash2, X, Save, Microscope, Upload, ImageIcon, Link } from "lucide-react";

function TalentForm({ talent, onSave, onCancel }: { talent?: Talent; onSave: () => void; onCancel: () => void }) {
    const [form, setForm] = useState({
        name: talent?.name || "",
        role: talent?.role || "",
        image: talent?.image || "",
        code: talent?.code || "",
        bio: talent?.bio || "",
    });
    const [imageMode, setImageMode] = useState<"upload" | "url">(talent?.image ? "url" : "upload");
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [dragOver, setDragOver] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = useCallback(async (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Solo file immagine sono supportati.");
            return;
        }
        setUploading(true);
        setUploadProgress(10);
        const interval = setInterval(() => {
            setUploadProgress((p) => Math.min(p + 15, 90));
        }, 200);

        const url = await uploadMediaFile(file, "talents");

        clearInterval(interval);
        setUploadProgress(100);

        if (url) {
            setForm((prev) => ({ ...prev, image: url }));
            setTimeout(() => {
                setUploading(false);
                setUploadProgress(0);
            }, 500);
        } else {
            alert("Errore durante il caricamento. Riprova.");
            setUploading(false);
            setUploadProgress(0);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file);
    }, [handleFileUpload]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragOver(false);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        if (!form.image) {
            setErrorMsg("Inserisci o carica un'immagine.");
            return;
        }
        try {
            await saveTalent({
                id: talent?.id || slugify(form.name),
                ...form,
                code: form.code || `RES-${generateId().slice(0, 3).toUpperCase()}`,
            });
            onSave();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Impossibile salvare il ricercatore.";
            setErrorMsg(message);
        }
    };

    const inputClass = "w-full bg-lab-dark/80 border border-green/15 px-4 py-2.5 text-rama-text text-sm data-readout placeholder:text-gray-600 focus:outline-none focus:border-green/40 transition-all duration-300";
    const labelClass = "data-readout text-[10px] text-amber/40 tracking-[0.2em] uppercase block mb-1.5";

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between border-b border-green/10 pb-3 mb-4">
                <h3 className="text-lg font-bold text-rama-text">{talent ? "Modifica Artista" : "Nuovo Artista"}</h3>
                <button type="button" onClick={onCancel} className="text-gray-500 hover:text-rama-text cursor-pointer"><X size={20} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Nome</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Chef Rubio" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Ruolo</label>
                    <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required placeholder="Direttore Culinario" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Codice</label>
                    <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="RES-001" className={inputClass} />
                </div>
            </div>

            {/* Image section */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <label className={`${labelClass} mb-0`}>Foto Artista</label>
                    <div className="flex gap-1 ml-auto">
                        <button
                            type="button"
                            onClick={() => setImageMode("upload")}
                            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] data-readout tracking-wider uppercase border transition-all cursor-pointer ${imageMode === "upload"
                                    ? "border-cyan/40 bg-cyan/10 text-cyan"
                                    : "border-green/10 text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            <Upload size={10} /> Carica
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageMode("url")}
                            className={`flex items-center gap-1 px-2.5 py-1 text-[10px] data-readout tracking-wider uppercase border transition-all cursor-pointer ${imageMode === "url"
                                    ? "border-cyan/40 bg-cyan/10 text-cyan"
                                    : "border-green/10 text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            <Link size={10} /> URL
                        </button>
                    </div>
                </div>

                {imageMode === "upload" ? (
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => !uploading && fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed p-6 text-center transition-all duration-300 cursor-pointer ${dragOver
                                ? "border-cyan/60 bg-cyan/10"
                                : uploading
                                    ? "border-amber/30 bg-amber/5"
                                    : "border-green/15 hover:border-green/30 bg-lab-dark/50"
                            }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                                e.target.value = "";
                            }}
                        />

                        {uploading ? (
                            <div className="space-y-3">
                                <div className="w-full h-1.5 bg-lab-dark/80 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan to-green transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                                <p className="data-readout text-[10px] text-amber/60 tracking-wider">
                                    CARICAMENTO IN CORSO... {uploadProgress}%
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <ImageIcon size={28} className="mx-auto text-green/30" />
                                <p className="data-readout text-xs text-gray-400">
                                    Trascina una foto qui o <span className="text-cyan underline">sfoglia</span>
                                </p>
                                <p className="data-readout text-[9px] text-gray-600 tracking-wider">
                                    JPG, PNG, WEBP
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <input
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        placeholder="https://..."
                        className={inputClass}
                    />
                )}
            </div>

            <div>
                <label className={labelClass}>Biografia</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} placeholder="Breve biografia..." className={`${inputClass} resize-none`} />
            </div>

            {form.image && (
                <div className="border border-amber/10 p-2">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="data-readout text-[9px] text-gray-muted tracking-wider">ANTEPRIMA</span>
                        {form.image && (
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, image: "" })}
                                className="data-readout text-[9px] text-red/50 hover:text-red tracking-wider flex items-center gap-1 cursor-pointer"
                            >
                                <X size={8} /> Rimuovi
                            </button>
                        )}
                    </div>
                    <img src={form.image} alt="Preview" className="w-32 h-40 object-cover opacity-80" />
                </div>
            )}

            {errorMsg && (
                <div className="bg-red/10 border border-red/40 text-red text-sm px-4 py-3 data-readout">
                    ⚠ ERRORE: {errorMsg}
                </div>
            )}

            <div className="flex gap-3 pt-2">
                <button type="submit" disabled={uploading} className="flex-1 py-3 border border-amber/40 bg-amber/10 text-amber text-sm font-bold uppercase tracking-wider data-readout hover:bg-amber/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                    <Save size={14} /> Salva Artista
                </button>
                <button type="button" onClick={onCancel} className="px-6 py-3 border border-gray-700 text-gray-400 text-sm data-readout uppercase tracking-wider hover:text-rama-text transition-colors cursor-pointer">
                    Annulla
                </button>
            </div>
        </form>
    );
}

export default function AdminTalentsPage() {
    const searchParams = useSearchParams();
    const [talents, setTalents] = useState<Talent[]>([]);
    const [editing, setEditing] = useState<Talent | null>(null);
    const [creating, setCreating] = useState(false);

    const load = () => { getTalents().then(setTalents); };

    useEffect(() => {
        load();
        if (searchParams.get("action") === "new") setCreating(true);
    }, [searchParams]);

    const handleDelete = async (id: string) => {
        if (confirm("Eliminare questo artista?")) {
            await deleteTalent(id);
            load();
        }
    };

    if (creating || editing) {
        return (
            <TalentForm
                talent={editing || undefined}
                onSave={() => { setCreating(false); setEditing(null); load(); }}
                onCancel={() => { setCreating(false); setEditing(null); }}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <span className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase">TAL // Team Artisti</span>
                    <h1 className="text-3xl font-bold text-rama-text mt-1">Artisti</h1>
                </div>
                <button onClick={() => setCreating(true)} className="flex items-center gap-2 px-5 py-2.5 border border-amber/40 bg-amber/10 text-amber text-xs font-bold uppercase tracking-wider data-readout hover:bg-amber/20 transition-all cursor-pointer">
                    <Plus size={14} /> Nuovo Artista
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {talents.map((talent) => (
                    <div key={talent.id} className="border border-green/10 bg-lab-card/30 overflow-hidden group hover:border-amber/20 transition-all duration-300">
                        <div className="h-48 overflow-hidden relative">
                            <img src={talent.image} alt={talent.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-lab-dark to-transparent opacity-60" />
                            <div className="absolute top-2 right-2">
                                <span className="data-readout text-[9px] text-green/40 tracking-wider flex items-center gap-1 bg-lab-dark/80 px-2 py-0.5">
                                    <Microscope size={8} /> {talent.code}
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <span className="data-readout text-[10px] text-amber/50 tracking-wider uppercase">{talent.role}</span>
                            <h3 className="text-lg font-bold text-rama-text mt-1">{talent.name}</h3>
                            {talent.bio && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{talent.bio}</p>}
                            <div className="flex items-center gap-2 mt-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditing(talent)} className="flex items-center gap-1 text-cyan text-[10px] data-readout hover:text-cyan/80 cursor-pointer">
                                    <Edit size={12} /> Modifica
                                </button>
                                <button onClick={() => handleDelete(talent.id)} className="flex items-center gap-1 text-red/50 text-[10px] data-readout hover:text-red cursor-pointer">
                                    <Trash2 size={12} /> Elimina
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {talents.length === 0 && (
                <div className="text-center py-12 text-gray-500 data-readout text-sm">
                    Nessun artista. Aggiungi il primo!
                </div>
            )}
        </div>
    );
}
