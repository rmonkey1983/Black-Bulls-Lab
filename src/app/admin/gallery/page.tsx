"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
    GalleryItem,
    getGalleryItems,
    addGalleryItem,
    deleteGalleryItem,
    generateId,
    uploadMediaFile,
} from "@/lib/dataStore";
import {
    Plus,
    Trash2,
    X,
    Upload,
    Image as ImageIcon,
    Film,
    Loader2,
    Check,
} from "lucide-react";

function isVideo(src: string): boolean {
    return /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(src);
}

export default function AdminGalleryPage() {
    const searchParams = useSearchParams();
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form state for URL mode
    const [formMode, setFormMode] = useState<"upload" | "url">("upload");
    const [form, setForm] = useState({ src: "", alt: "", category: "" });

    // Upload queue state
    const [pendingFiles, setPendingFiles] = useState<File[]>([]);
    const [uploadCategory, setUploadCategory] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const load = () => {
        getGalleryItems().then(setItems);
    };

    useEffect(() => {
        load();
        if (searchParams.get("action") === "new") setShowForm(true);
    }, [searchParams]);

    // ===== FILE HANDLING =====

    const handleFiles = useCallback((files: FileList | File[]) => {
        const validTypes = [
            "image/jpeg", "image/png", "image/gif", "image/webp", "image/avif", "image/svg+xml",
            "video/mp4", "video/webm", "video/quicktime", "video/x-msvideo",
        ];
        const validFiles = Array.from(files).filter((f) => validTypes.includes(f.type));
        if (validFiles.length === 0) return;
        setPendingFiles((prev) => [...prev, ...validFiles]);
        setShowForm(true);
        setFormMode("upload");
    }, []);

    const removePendingFile = (index: number) => {
        setPendingFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // ===== DRAG & DROP =====

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    }, [handleFiles]);

    // ===== UPLOAD =====

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        if (pendingFiles.length === 0) return;
        setUploading(true);
        setUploadProgress({ current: 0, total: pendingFiles.length });

        for (let i = 0; i < pendingFiles.length; i++) {
            const file = pendingFiles[i];
            setUploadProgress({ current: i + 1, total: pendingFiles.length });

            try {
                const url = await uploadMediaFile(file);
                if (url) {
                    const mediaType = file.type.startsWith("video/") ? "video" : "image";
                    await addGalleryItem({
                        id: generateId(),
                        src: url,
                        alt: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
                        category: uploadCategory || "Senza Categoria",
                        type: mediaType as "image" | "video",
                    });
                }
            } catch (err: any) {
                setErrorMsg(err.message || "Errore durante il caricamento del file.");
            }
        }

        setPendingFiles([]);
        setUploadCategory("");
        setShowForm(false);
        setUploading(false);
        setUploadProgress(null);
        load();
    };

    // ===== URL ADD =====

    const handleAddUrl = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        const mediaType = isVideo(form.src) ? "video" : "image";
        try {
            await addGalleryItem({
                id: generateId(),
                src: form.src,
                alt: form.alt,
                category: form.category,
                type: mediaType as "image" | "video",
            });
            setForm({ src: "", alt: "", category: "" });
            setShowForm(false);
            load();
        } catch (err: any) {
            setErrorMsg(err.message || "Impossibile salvare l'elemento nella galleria.");
        }
    };

    // ===== DELETE =====

    const handleDelete = async (id: string) => {
        await deleteGalleryItem(id);
        load();
    };

    const handleBulkDelete = async () => {
        if (confirm(`Eliminare ${selected.size} elementi selezionati?`)) {
            for (const id of selected) {
                await deleteGalleryItem(id);
            }
            setSelected(new Set());
            load();
        }
    };

    const toggleSelect = (id: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const inputClass = "w-full bg-lab-dark/80 border border-green/15 px-4 py-2.5 text-rama-text text-sm data-readout placeholder:text-gray-600 focus:outline-none focus:border-green/40 transition-all duration-300";

    return (
        <div
            className="space-y-6"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Drag overlay */}
            {dragOver && (
                <div className="fixed inset-0 z-50 bg-lab-dark/90 flex items-center justify-center pointer-events-none">
                    <div className="border-2 border-dashed border-cyan/50 rounded-lg p-16 text-center">
                        <Upload size={48} className="text-cyan/60 mx-auto mb-4 animate-bounce" />
                        <p className="text-cyan text-lg font-bold data-readout tracking-wider uppercase">
                            Rilascia i file qui
                        </p>
                        <p className="text-gray-500 text-xs data-readout mt-2">
                            Foto e video supportati
                        </p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <span className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase">GAL // Archivio Campioni</span>
                    <h1 className="text-3xl font-bold text-rama-text mt-1">Gallery</h1>
                </div>
                <div className="flex items-center gap-3">
                    {selected.size > 0 && (
                        <button onClick={handleBulkDelete} className="flex items-center gap-2 px-4 py-2 border border-red/30 bg-red/10 text-red text-xs font-bold uppercase tracking-wider data-readout hover:bg-red/20 transition-all cursor-pointer">
                            <Trash2 size={12} /> Elimina ({selected.size})
                        </button>
                    )}
                    <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-5 py-2.5 border border-cyan/40 bg-cyan/10 text-cyan text-xs font-bold uppercase tracking-wider data-readout hover:bg-cyan/20 transition-all cursor-pointer">
                        <Plus size={14} /> Carica Media
                    </button>
                </div>
            </div>

            {/* Upload / Add Form */}
            {showForm && (
                <div className="border border-cyan/15 bg-lab-card/30 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-cyan/10 pb-2 mb-2">
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setFormMode("upload")}
                                className={`data-readout text-[10px] tracking-[0.2em] uppercase flex items-center gap-1.5 px-3 py-1.5 border transition-all cursor-pointer
                                    ${formMode === "upload"
                                        ? "text-cyan border-cyan/40 bg-cyan/10"
                                        : "text-gray-500 border-gray-700 hover:text-cyan hover:border-cyan/20"
                                    }`}
                            >
                                <Upload size={10} /> Upload File
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormMode("url")}
                                className={`data-readout text-[10px] tracking-[0.2em] uppercase flex items-center gap-1.5 px-3 py-1.5 border transition-all cursor-pointer
                                    ${formMode === "url"
                                        ? "text-cyan border-cyan/40 bg-cyan/10"
                                        : "text-gray-500 border-gray-700 hover:text-cyan hover:border-cyan/20"
                                    }`}
                            >
                                <ImageIcon size={10} /> URL Diretto
                            </button>
                        </div>
                        <button type="button" onClick={() => { setShowForm(false); setPendingFiles([]); }} className="text-gray-500 hover:text-rama-text cursor-pointer">
                            <X size={16} />
                        </button>
                    </div>

                    {formMode === "upload" ? (
                        <form onSubmit={handleUpload} className="space-y-4">
                            {/* Drop zone / File picker */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-cyan/20 hover:border-cyan/40 bg-lab-dark/40 p-8
                                    flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                                    hover:bg-cyan/[0.03]"
                            >
                                <Upload size={32} className="text-cyan/30 mb-3" />
                                <p className="text-rama-text text-sm font-medium mb-1">
                                    Clicca per selezionare o trascina qui
                                </p>
                                <p className="text-gray-500 text-xs data-readout">
                                    JPG, PNG, GIF, WebP, MP4, WebM, MOV
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files) handleFiles(e.target.files);
                                        e.target.value = "";
                                    }}
                                />
                            </div>

                            {/* Pending files preview */}
                            {pendingFiles.length > 0 && (
                                <div className="space-y-2">
                                    <span className="data-readout text-[10px] text-cyan/40 tracking-[0.2em] uppercase">
                                        {pendingFiles.length} file selezionat{pendingFiles.length === 1 ? "o" : "i"}
                                    </span>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                        {pendingFiles.map((file, i) => (
                                            <div key={i} className="relative border border-cyan/10 bg-lab-dark/60 overflow-hidden group">
                                                {file.type.startsWith("video/") ? (
                                                    <div className="w-full h-24 flex items-center justify-center bg-lab-dark">
                                                        <Film size={24} className="text-cyan/30" />
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        className="w-full h-24 object-cover"
                                                    />
                                                )}
                                                <div className="p-1.5">
                                                    <span className="data-readout text-[8px] text-gray-500 truncate block">
                                                        {file.name}
                                                    </span>
                                                    <span className="data-readout text-[8px] text-cyan/30">
                                                        {(file.size / 1024 / 1024).toFixed(1)} MB
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removePendingFile(i)}
                                                    className="absolute top-1 right-1 w-5 h-5 bg-lab-dark/80 border border-red/30 flex items-center justify-center
                                                        text-red/50 hover:text-red hover:border-red transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Category input */}
                            {pendingFiles.length > 0 && (
                                <div>
                                    <label className="data-readout text-[10px] text-cyan/40 tracking-[0.2em] uppercase block mb-1.5">
                                        Categoria (per tutti i file)
                                    </label>
                                    <input
                                        value={uploadCategory}
                                        onChange={(e) => setUploadCategory(e.target.value)}
                                        placeholder="Bar, Music, Stage, Food..."
                                        className={inputClass}
                                    />
                                </div>
                            )}

                            {/* Upload button */}
                            {pendingFiles.length > 0 && (
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className={`w-full py-3 border text-sm font-bold uppercase tracking-wider data-readout
                                        flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer
                                        ${uploading
                                            ? "border-cyan/20 bg-cyan/5 text-cyan/50"
                                            : "border-cyan/40 bg-cyan/10 text-cyan hover:bg-cyan/20 hover:border-cyan/60"
                                        }`}
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            Caricamento {uploadProgress?.current}/{uploadProgress?.total}...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={14} />
                                            Carica {pendingFiles.length} file
                                        </>
                                    )}
                                </button>
                            )}
                        </form>
                    ) : (
                        /* URL Mode */
                        <form onSubmit={handleAddUrl} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label className="data-readout text-[10px] text-cyan/40 tracking-[0.2em] uppercase block mb-1.5">URL Immagine/Video</label>
                                    <input value={form.src} onChange={(e) => setForm({ ...form, src: e.target.value })} required placeholder="https://..." className={inputClass} />
                                </div>
                                <div>
                                    <label className="data-readout text-[10px] text-cyan/40 tracking-[0.2em] uppercase block mb-1.5">Categoria</label>
                                    <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required placeholder="Bar, Music..." className={inputClass} />
                                </div>
                            </div>
                            <div>
                                <label className="data-readout text-[10px] text-cyan/40 tracking-[0.2em] uppercase block mb-1.5">Descrizione</label>
                                <input value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} required placeholder="Descrizione del media" className={inputClass} />
                            </div>
                            {form.src && (
                                <div className="border border-cyan/10 p-2">
                                    <span className="data-readout text-[9px] text-gray-muted tracking-wider block mb-1.5">ANTEPRIMA</span>
                                    {isVideo(form.src) ? (
                                        <video src={form.src} controls className="w-full h-32 object-cover opacity-80" />
                                    ) : (
                                        <img src={form.src} alt="Preview" className="w-full h-32 object-cover opacity-80" />
                                    )}
                                </div>
                            )}
                            <button type="submit" className="w-full py-2.5 border border-cyan/40 bg-cyan/10 text-cyan text-sm font-bold uppercase tracking-wider data-readout hover:bg-cyan/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
                                <Check size={14} /> Salva
                            </button>
                        </form>
                    )}

                    {errorMsg && (
                        <div className="bg-red/10 border border-red/40 text-red text-sm px-4 py-3 data-readout mt-4">
                            ⚠ ERRORE: {errorMsg}
                        </div>
                    )}
                </div>
            )}

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.map((item) => (
                    <div key={item.id} className={`relative group border transition-all duration-300 overflow-hidden
                        ${selected.has(item.id) ? "border-cyan/50 shadow-[0_0_15px_rgba(0,212,255,0.1)]" : "border-green/10 hover:border-green/25"}`}
                    >
                        {item.type === "video" || isVideo(item.src) ? (
                            <video src={item.src} muted className="w-full h-40 object-cover" />
                        ) : (
                            <img src={item.src} alt={item.alt} className="w-full h-40 object-cover" />
                        )}

                        {/* Video badge */}
                        {(item.type === "video" || isVideo(item.src)) && (
                            <div className="absolute top-2 left-2 bg-lab-dark/80 border border-cyan/30 px-1.5 py-0.5 flex items-center gap-1">
                                <Film size={10} className="text-cyan" />
                                <span className="data-readout text-[8px] text-cyan tracking-wider">VIDEO</span>
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-lab-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                                onClick={() => toggleSelect(item.id)}
                                className={`w-8 h-8 border flex items-center justify-center transition-all cursor-pointer
                                    ${selected.has(item.id)
                                        ? "border-cyan bg-cyan/20 text-cyan"
                                        : "border-white/30 text-rama-text hover:border-cyan"
                                    }`}
                            >
                                ✓
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="w-8 h-8 border border-red/30 flex items-center justify-center text-red/50 hover:text-red hover:border-red transition-all cursor-pointer">
                                <Trash2 size={14} />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="p-2 bg-lab-card/50">
                            <span className="data-readout text-[9px] text-gray-muted truncate block">{item.alt}</span>
                            <span className="data-readout text-[8px] text-green/40 tracking-wider uppercase">{item.category}</span>
                        </div>

                        {/* Selection indicator */}
                        {selected.has(item.id) && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-cyan/80 flex items-center justify-center text-lab-dark text-xs font-bold">✓</div>
                        )}
                    </div>
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center py-12 text-gray-500 data-readout text-sm">
                    Nessun media nell&apos;archivio. Carica il primo!
                </div>
            )}
        </div>
    );
}
