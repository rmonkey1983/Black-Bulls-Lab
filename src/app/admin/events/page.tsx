"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Event, TimelineItem, getEvents, saveEvent, deleteEvent, generateId, slugify, uploadMediaFile } from "@/lib/dataStore";
import { Plus, Edit, Trash2, X, Save, Clock, ChevronUp, ChevronDown, Upload, Image as ImageIcon } from "lucide-react";

function EventForm({ event, onSave, onCancel }: { event?: Event; onSave: () => void; onCancel: () => void }) {
    const [form, setForm] = useState<Omit<Event, "id">>({
        slug: event?.slug || "",
        title: event?.title || "",
        subtitle: event?.subtitle || "",
        date: event?.date || "",
        location: event?.location || "",
        category: event?.category || "",
        image: event?.image || "",
        description: event?.description || "",
        timeline: event?.timeline || [{ time: "", title: "", description: "" }],
        price: event?.price || 0,
    });
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleFileUpload = async (file: File) => {
        setUploading(true);
        const url = await uploadMediaFile(file, "events");
        setUploading(false);
        if (url) {
            setForm((prev) => ({ ...prev, image: url }));
        } else {
            alert("Errore durante il caricamento dell'immagine.");
        }
    };

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
            ...(field === "title" && !event ? { slug: slugify(value) } : {}),
        }));
    };

    const updateTimeline = (index: number, field: keyof TimelineItem, value: string) => {
        const newTimeline = [...form.timeline];
        newTimeline[index] = { ...newTimeline[index], [field]: value };
        setForm((prev) => ({ ...prev, timeline: newTimeline }));
    };

    const addTimelineItem = () => {
        setForm((prev) => ({ ...prev, timeline: [...prev.timeline, { time: "", title: "", description: "" }] }));
    };

    const removeTimelineItem = (index: number) => {
        setForm((prev) => ({ ...prev, timeline: prev.timeline.filter((_, i) => i !== index) }));
    };

    const moveTimeline = (index: number, dir: -1 | 1) => {
        const newTimeline = [...form.timeline];
        const newIndex = index + dir;
        if (newIndex < 0 || newIndex >= newTimeline.length) return;
        [newTimeline[index], newTimeline[newIndex]] = [newTimeline[newIndex], newTimeline[index]];
        setForm((prev) => ({ ...prev, timeline: newTimeline }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setSaving(true);
        try {
            await saveEvent({
                id: event?.id || generateId(),
                ...form,
            });
            onSave();
        } catch (error: any) {
            console.error("Save failure details:", error);
            setErrorMsg(error.message || "Impossibile connettersi a Supabase. Controlla la tua connessione o le API keys in .env.local.");
        } finally {
            setSaving(false);
        }
    };

    const inputClass = "w-full bg-lab-dark/80 border border-green/15 px-4 py-2.5 text-rama-text text-sm data-readout placeholder:text-gray-600 focus:outline-none focus:border-green/40 transition-all duration-300";
    const labelClass = "data-readout text-[10px] text-green/40 tracking-[0.2em] uppercase block mb-1.5";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-green/10 pb-3 mb-4">
                <h3 className="text-lg font-bold text-rama-text">
                    {event ? "Modifica Esperimento" : "Nuovo Esperimento"}
                </h3>
                <button type="button" onClick={onCancel} className="text-gray-500 hover:text-rama-text transition-colors cursor-pointer">
                    <X size={20} />
                </button>
            </div>

            {errorMsg && (
                <div className="bg-red/10 border border-red/30 text-red px-4 py-3 rounded-md mb-4 text-sm flex items-start gap-2">
                    <span className="font-bold mt-0.5">Errore:</span> 
                    <p className="flex-1">{errorMsg}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className={labelClass}>Titolo</label>
                    <input value={form.title} onChange={(e) => handleChange("title", e.target.value)} required placeholder="Notte Medievale..." className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Slug (URL)</label>
                    <input value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} required placeholder="notte-medievale" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Sottotitolo</label>
                    <input value={form.subtitle} onChange={(e) => handleChange("subtitle", e.target.value)} placeholder="Un viaggio nel 1300..." className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Data</label>
                    <input value={form.date} onChange={(e) => handleChange("date", e.target.value)} required placeholder="15.06.2026" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Luogo</label>
                    <input value={form.location} onChange={(e) => handleChange("location", e.target.value)} required placeholder="Sala dei Cavalieri" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Categoria</label>
                    <input value={form.category} onChange={(e) => handleChange("category", e.target.value)} required placeholder="Dinner Show" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Prezzo (€)</label>
                    <input type="number" min="0" value={form.price || ""} onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) || 0 }))} placeholder="85" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                    <label className={labelClass}>Immagine Evento</label>
                    {/* Upload area */}
                    <div
                        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-300 mb-3
                            ${uploading ? 'border-cyan/40 bg-cyan/5' : 'border-green/15 hover:border-green/30 bg-lab-dark/40'}`}
                        onClick={() => !uploading && document.getElementById('event-image-upload')?.click()}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const file = e.dataTransfer.files[0];
                            if (file && file.type.startsWith('image/')) handleFileUpload(file);
                        }}
                    >
                        <input
                            id="event-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                            }}
                        />
                        {uploading ? (
                            <div className="space-y-2">
                                <Upload size={24} className="mx-auto text-cyan animate-pulse" />
                                <p className="data-readout text-xs text-cyan">Caricamento in corso...</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <ImageIcon size={24} className="mx-auto text-green/30" />
                                <p className="data-readout text-xs text-gray-500">Clicca o trascina un'immagine qui</p>
                                <p className="data-readout text-[9px] text-gray-600">JPG, PNG, WEBP</p>
                            </div>
                        )}
                    </div>
                    {/* URL fallback */}
                    <div className="flex items-center gap-2">
                        <span className="data-readout text-[9px] text-gray-600 shrink-0">oppure URL:</span>
                        <input value={form.image} onChange={(e) => handleChange("image", e.target.value)} placeholder="https://..." className={`${inputClass} flex-1`} />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className={labelClass}>Descrizione Breve (Necessari almeno 20 caratteri per la lista eventi)</label>
                    <textarea value={form.description} minLength={20} required onChange={(e) => handleChange("description", e.target.value)} rows={4} placeholder="Descrizione dell'evento..." className={`${inputClass} resize-none`} />
                </div>
            </div>

            {/* Timeline Editor */}
            <div className="border border-green/10 p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <span className="data-readout text-[10px] text-cyan/50 tracking-[0.2em] uppercase flex items-center gap-1.5">
                        <Clock size={10} /> Timeline Esperimento
                    </span>
                    <button type="button" onClick={addTimelineItem} className="text-green text-xs data-readout hover:text-green/80 transition-colors flex items-center gap-1 cursor-pointer">
                        <Plus size={12} /> Aggiungi
                    </button>
                </div>

                {form.timeline.map((item, i) => (
                    <div key={i} className="flex gap-2 items-start bg-lab-dark/50 p-3 border border-green/5">
                        <div className="flex flex-col gap-1">
                            <button type="button" onClick={() => moveTimeline(i, -1)} className="text-gray-600 hover:text-green transition-colors cursor-pointer"><ChevronUp size={12} /></button>
                            <button type="button" onClick={() => moveTimeline(i, 1)} className="text-gray-600 hover:text-green transition-colors cursor-pointer"><ChevronDown size={12} /></button>
                        </div>
                        <input value={item.time} onChange={(e) => updateTimeline(i, "time", e.target.value)} placeholder="20:00" className="w-20 bg-transparent border border-green/10 px-2 py-1.5 text-xs text-cyan data-readout placeholder:text-gray-600 focus:outline-none focus:border-green/30" />
                        <input value={item.title} onChange={(e) => updateTimeline(i, "title", e.target.value)} placeholder="Titolo fase" className="flex-1 bg-transparent border border-green/10 px-2 py-1.5 text-xs text-rama-text data-readout placeholder:text-gray-600 focus:outline-none focus:border-green/30" />
                        <input value={item.description} onChange={(e) => updateTimeline(i, "description", e.target.value)} placeholder="Descrizione" className="flex-[2] bg-transparent border border-green/10 px-2 py-1.5 text-xs text-gray-400 data-readout placeholder:text-gray-600 focus:outline-none focus:border-green/30" />
                        <button type="button" onClick={() => removeTimelineItem(i)} className="text-red/50 hover:text-red transition-colors cursor-pointer"><Trash2 size={14} /></button>
                    </div>
                ))}
            </div>

            {/* Preview Image */}
            {form.image && (
                <div className="border border-green/10 p-2">
                    <span className="data-readout text-[9px] text-gray-muted tracking-wider block mb-1.5">ANTEPRIMA</span>
                    <img src={form.image} alt="Preview" className="w-full h-40 object-cover opacity-80" />
                </div>
            )}

            <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className={`flex-1 py-3 border border-green/40 bg-green/10 text-green text-sm font-bold uppercase tracking-wider data-readout transition-all duration-300 flex items-center justify-center gap-2 ${saving ? 'opacity-50 cursor-wait' : 'hover:bg-green/20 cursor-pointer'}`}>
                    <Save size={14} /> {saving ? "Salvataggio..." : "Salva Esperimento"}
                </button>
                <button type="button" onClick={onCancel} className="px-6 py-3 border border-gray-700 text-gray-400 text-sm data-readout uppercase tracking-wider hover:text-rama-text transition-colors cursor-pointer">
                    Annulla
                </button>
            </div>
        </form>
    );
}

export default function AdminEventsPage() {
    const searchParams = useSearchParams();
    const [events, setEvents] = useState<Event[]>([]);
    const [editing, setEditing] = useState<Event | null>(null);
    const [creating, setCreating] = useState(false);

    const load = () => { getEvents().then(setEvents); };

    useEffect(() => {
        load();
        if (searchParams.get("action") === "new") setCreating(true);
    }, [searchParams]);

    const handleDelete = async (id: string) => {
        if (confirm("Eliminare questo esperimento?")) {
            await deleteEvent(id);
            load();
        }
    };

    if (creating || editing) {
        return (
            <div className="max-w-4xl">
                <EventForm
                    event={editing || undefined}
                    onSave={() => { setCreating(false); setEditing(null); load(); }}
                    onCancel={() => { setCreating(false); setEditing(null); }}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <span className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase">EVT // Gestione</span>
                    <h1 className="text-3xl font-bold text-rama-text mt-1">Esperimenti</h1>
                </div>
                <button
                    onClick={() => setCreating(true)}
                    className="flex items-center gap-2 px-5 py-2.5 border border-green/40 bg-green/10 text-green text-xs
                        font-bold uppercase tracking-wider data-readout
                        hover:bg-green/20 hover:border-green/60 transition-all duration-300 cursor-pointer"
                >
                    <Plus size={14} /> Nuovo Esperimento
                </button>
            </div>

            {/* Events List */}
            <div className="space-y-2">
                {events.map((event) => (
                    <div key={event.id} className="border border-green/10 bg-lab-card/30 p-4 flex items-center gap-4 hover:border-green/20 transition-all duration-300 group">
                        {/* Thumbnail */}
                        <div className="w-20 h-14 bg-lab-dark overflow-hidden shrink-0">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-70" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-rama-text font-bold text-sm truncate">{event.title}</h3>
                            <div className="flex items-center gap-4 data-readout text-[10px] text-gray-500 mt-1">
                                <span className="text-cyan">{event.date}</span>
                                <span>{event.location}</span>
                                <span className="text-green/50 border border-green/15 px-1.5 py-0.5">{event.category}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setEditing(event)} className="p-2 text-cyan hover:text-cyan/80 transition-colors cursor-pointer" title="Modifica">
                                <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(event.id)} className="p-2 text-red/50 hover:text-red transition-colors cursor-pointer" title="Elimina">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {events.length === 0 && (
                    <div className="text-center py-12 text-gray-500 data-readout text-sm">
                        Nessun esperimento trovato. Crea il primo!
                    </div>
                )}
            </div>
        </div>
    );
}
