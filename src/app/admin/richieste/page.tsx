"use client";

import { useEffect, useState } from "react";
import { getContacts, archiveContact } from "@/app/actions/contact";
import { MessageSquare, Calendar, Users, Phone, Star, FileText, Check, Archive, Loader2 } from "lucide-react";

interface ContactRow {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    created_at: string;
}

interface ParsedContact extends ContactRow {
    parsedPhone: string;
    parsedDate: string;
    parsedGuests: string;
    parsedFormat: string;
    parsedNotes: string;
    isBooking: boolean;
}

function parseContactMessage(msg: string): Partial<ParsedContact> {
    const phoneMatch = msg.match(/Telefono:\s*(.*)/);
    const dateMatch = msg.match(/Data Richiesta:\s*(.*)/);
    const guestsMatch = msg.match(/Ospiti:\s*(.*)/);
    const formatMatch = msg.match(/Format:\s*(.*)/);
    
    // Notes usually appear after "Note aggiuntive:"
    const notesSplit = msg.split(/Note aggiuntive:/i);
    const notes = notesSplit.length > 1 ? notesSplit[1].trim() : msg.trim();

    return {
        parsedPhone: phoneMatch ? phoneMatch[1].trim() : "N/A",
        parsedDate: dateMatch ? dateMatch[1].trim() : "N/A",
        parsedGuests: guestsMatch ? guestsMatch[1].trim() : "N/A",
        parsedFormat: formatMatch ? formatMatch[1].trim() : "N/A",
        parsedNotes: notes,
        isBooking: !!(phoneMatch && dateMatch && formatMatch)
    };
}

export default function AdminRichiestePage() {
    const [contacts, setContacts] = useState<ParsedContact[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'nuovo' | 'archiviato'>('nuovo');
    const [archivingId, setArchivingId] = useState<string | null>(null);

    const loadContacts = async () => {
        setLoading(true);
        const { data, error } = await getContacts();
        
        if (error) {
            setErrorMsg(error);
        } else if (data) {
            const parsed = data.map((c: any) => ({
                ...c,
                // Default a 'nuovo' per retrocompatibilità se null
                status: c.status || 'nuovo', 
                ...parseContactMessage(c.message)
            }));
            setContacts(parsed);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleArchive = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Prevenire espansione della riga
        setArchivingId(id);
        const res = await archiveContact(id);
        if (res.success) {
            setContacts(prev => prev.map(c => c.id === id ? { ...c, status: 'archiviato' } : c));
            setExpandedId(null);
        } else {
            alert(res.error);
        }
        setArchivingId(null);
    };

    const filteredContacts = contacts.filter(c => c.status === activeTab);

    return (
        <div className="space-y-6 max-w-7xl">
            <div className="flex items-center justify-between">
                <div>
                    <span className="data-readout text-[10px] text-green/40 tracking-[0.3em] uppercase">REQ // Operazioni</span>
                    <h1 className="text-3xl font-bold text-rama-text mt-1">Richieste & Contatti</h1>
                </div>
                <div className="text-xs data-readout text-gray-500 uppercase tracking-widest border border-green/20 px-4 py-2 bg-lab-card/50">
                    Totale {activeTab}: {filteredContacts.length}
                </div>
            </div>

            {/* Tab Selector */}
            <div className="flex border-b border-green/10">
                <button 
                    onClick={() => setActiveTab('nuovo')}
                    className={`flex items-center gap-2 px-6 py-3 font-bold text-[10px] uppercase tracking-[0.2em] data-readout transition-all relative ${
                        activeTab === 'nuovo' ? 'text-green' : 'text-gray-500 hover:text-green/70'
                    }`}
                >
                    Nuove Richieste
                    {activeTab === 'nuovo' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green"></div>}
                </button>
                <button 
                    onClick={() => setActiveTab('archiviato')}
                    className={`flex items-center gap-2 px-6 py-3 font-bold text-[10px] uppercase tracking-[0.2em] data-readout transition-all relative ${
                        activeTab === 'archiviato' ? 'text-green' : 'text-gray-500 hover:text-green/70'
                    }`}
                >
                    <Archive size={14} /> Archiviate
                    {activeTab === 'archiviato' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green"></div>}
                </button>
            </div>

            {errorMsg && (
                <div className="bg-red/10 border border-red/30 text-red px-4 py-3 rounded-md mb-4 text-sm font-bold">
                    {errorMsg}
                </div>
            )}

            {loading ? (
                <div className="py-20 text-center data-readout text-green/50 animate-pulse">
                    Sincronizzazione archivio richieste in corso...
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredContacts.length === 0 ? (
                        <div className="py-12 border border-green/10 bg-lab-card/30 text-center text-gray-500 text-sm data-readout">
                            Nessuna richiesta in questa directory.
                        </div>
                    ) : (
                        filteredContacts.map((contact) => (
                            <div key={contact.id} className="border border-green/10 bg-lab-card/30 flex flex-col hover:border-green/30 transition-all duration-300 shadow-sm">
                                
                                {/* Header Row (Sempre Visibile) */}
                                <div 
                                    className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer hover:bg-white/5"
                                    onClick={() => toggleExpand(contact.id)}
                                >
                                    {/* Persona */}
                                    <div className="flex-1 w-full md:w-auto min-w-[200px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-rama-text font-bold text-sm truncate">{contact.name}</h3>
                                            {contact.isBooking && (
                                                <span className="bg-rama-accent/10 border border-rama-accent/20 text-rama-accent text-[8px] tracking-wider px-2 py-0.5 rounded-full uppercase">
                                                    Booking
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-cyan text-[11px] data-readout truncate">{contact.email}</div>
                                    </div>

                                    {/* Info Strutturate */}
                                    {contact.isBooking ? (
                                        <div className="flex-1 w-full flex flex-wrap gap-x-6 gap-y-2 data-readout text-gray-400 text-[10px] uppercase">
                                            <div className="flex items-center gap-1.5 min-w-[100px]">
                                                <Phone size={12} className="text-green/50" /> {contact.parsedPhone}
                                            </div>
                                            <div className="flex items-center gap-1.5 min-w-[100px]">
                                                <Calendar size={12} className="text-green/50" /> {contact.parsedDate}
                                            </div>
                                            <div className="flex items-center gap-1.5 min-w-[100px]">
                                                <Users size={12} className="text-green/50" /> {contact.parsedGuests}
                                            </div>
                                            <div className="flex items-center gap-1.5 min-w-[120px]">
                                                <Star size={12} className="text-rama-accent" /> <span className="text-rama-accent/80 truncate max-w-[100px]">{contact.parsedFormat}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex-1 w-full data-readout text-gray-400 text-xs">
                                            <span className="text-green/50">Oggetto:</span> {contact.subject || 'Generico'}
                                        </div>
                                    )}

                                    {/* Data Scrittura e Azioni */}
                                    <div className="text-right shrink-0 flex flex-col md:flex-row items-end md:items-center gap-4">
                                        <div>
                                            <div className="data-readout text-[9px] text-gray-500 tracking-wider">
                                                {new Date(contact.created_at).toLocaleDateString('it-IT')}
                                            </div>
                                            <div className="data-readout text-[9px] text-cyan/30 tracking-wider">
                                                {new Date(contact.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        {contact.status === 'nuovo' && (
                                            <button 
                                                onClick={(e) => handleArchive(e, contact.id)}
                                                disabled={archivingId === contact.id}
                                                className="mt-2 md:mt-0 px-3 py-1.5 border border-green/20 text-green/70 hover:bg-green/10 hover:text-green text-[9px] data-readout uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                                                title="Archivia"
                                            >
                                                {archivingId === contact.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                                                Archivia
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Sezione Espansa (Note Mese) */}
                                {expandedId === contact.id && (
                                    <div className="p-4 pt-0 md:pl-64 border-t border-green/5 bg-black/40 mt-2">
                                        <div className="p-4 bg-lab-dark border border-green/10 rounded-lg mt-4">
                                            <div className="flex items-center gap-2 text-green/50 mb-2">
                                                <FileText size={14} />
                                                <span className="data-readout text-[10px] uppercase tracking-widest font-bold">
                                                    Messaggio / Note Autore
                                                </span>
                                            </div>
                                            <p className="text-gray-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                                                {contact.parsedNotes || "Nessuna nota aggiuntiva fornita."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
