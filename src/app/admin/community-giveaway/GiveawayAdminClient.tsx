"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Trophy,
  Users,
  ShieldAlert,
  Download,
  Lock,
  Eye,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Hash,
  FileText,
} from "lucide-react";

export default function GiveawayAdminClient() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [unmaskModal, setUnmaskModal] = useState(false);
  const [unmaskReason, setUnmaskReason] = useState("");
  const [unmasking, setUnmasking] = useState(false);
  const [isUnmasked, setIsUnmasked] = useState(false);

  // Form registrazioni verbale
  const [protocolNumber, setProtocolNumber] = useState("");
  const [selectedWinnerId, setSelectedWinnerId] = useState("");
  const [selectedReserve1Id, setSelectedReserve1Id] = useState("");
  const [selectedReserve2Id, setSelectedReserve2Id] = useState("");
  const [recordingDraw, setRecordingDraw] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchData = useCallback(async (unmask = false, reason = "") => {
    setLoading(true);
    try {
      const url = `/api/admin/community-giveaway?unmask=${unmask}${reason ? `&reason=${encodeURIComponent(reason)}` : ""}`;
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setIsUnmasked(Boolean(json.isUnmasked));
    } catch (e) {
      console.error("Errore recupero dati giveaway:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUnmaskRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unmaskReason.trim()) return;
    setUnmasking(true);
    await fetchData(true, unmaskReason);
    setUnmasking(false);
    setUnmaskModal(false);
    setUnmaskReason("");
  };

  const handleLockSnapshot = async () => {
    if (!confirm("Confermi il blocco dello snapshot per il ciclo attuale? L'elenco idonei diventerà immutabile.")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/community-giveaway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "LOCK_SNAPSHOT" }),
      });
      const json = await res.json();
      if (json.success) {
        setActionSuccess(`Snapshot bloccato! Hash SHA-256: ${json.hash}`);
        fetchData();
      }
    } catch (err) {
      console.error("Errore blocco snapshot:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordOfficialDraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!protocolNumber || !selectedWinnerId) return;
    setRecordingDraw(true);
    try {
      const res = await fetch("/api/admin/community-giveaway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RECORD_OFFICIAL_DRAW",
          payload: {
            officialProtocolNumber: protocolNumber,
            winnerWaitlistId: selectedWinnerId,
            reserve1WaitlistId: selectedReserve1Id,
            reserve2WaitlistId: selectedReserve2Id,
          },
        }),
      });
      const json = await res.json();
      if (json.success) {
        setActionSuccess("Verbale ed esito ufficiale salvati con successo.");
        setProtocolNumber("");
        setSelectedWinnerId("");
        setSelectedReserve1Id("");
        setSelectedReserve2Id("");
        fetchData();
      }
    } catch (err) {
      console.error("Errore registrazione verbale:", err);
    } finally {
      setRecordingDraw(false);
    }
  };

  const handleExportCSV = async () => {
    if (!data?.participants) return;
    // Logga export
    await fetch("/api/admin/community-giveaway", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "LOG_EXPORT",
        payload: { reason: "Download CSV per verbale ufficiale", count: data.participants.length },
      }),
    });

    const headers = ["ID", "Nome", "Email", "Telefono", "Citta", "Sorgente", "Stato_Idoneita", "Data_Iscrizione"];
    const rows = data.participants.map((p: any) => [
      p.id,
      `"${p.name}"`,
      `"${p.email}"`,
      `"${p.phone}"`,
      `"${p.city}"`,
      `"${p.source}"`,
      p.status,
      p.created_at,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e: any) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `giveaway_eligible_snapshot_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading && !data) {
    return (
      <div className="p-8 text-center text-zinc-500 font-mono">
        <RefreshCw className="animate-spin mx-auto mb-4 text-accent-gold" size={28} />
        Caricamento infrastruttura giveaway in corso...
      </div>
    );
  }

  const kpi = data?.kpi || {};
  const participants = data?.participants || [];
  const eligibleOnly = participants.filter((p: any) => p.status === "eligible");

  return (
    <div className="p-4 md:p-8 space-y-10 text-white font-sans">
      {/* Header */}
      <header className="relative border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <span className="data-readout text-[10px] text-accent-gold tracking-[0.3em] uppercase">
              GWY // Community Giveaway Infrastructure
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Community <span className="text-accent-gold">Giveaway</span>
          </h1>
          <p className="font-sans text-zinc-400 mt-2 text-sm max-w-xl font-light">
            Dashboard privata di audit, qualificazione e gestione verbali ufficiali per la lista d&apos;attesa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLockSnapshot}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-accent-gold/40 text-accent-gold hover:bg-accent-gold/10 font-mono text-xs uppercase tracking-wider rounded-lg transition"
          >
            <Lock size={14} /> Blocca Snapshot
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-accent-gold text-black font-mono text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-white transition"
          >
            <Download size={14} /> Esporta Idonei CSV
          </button>
        </div>
      </header>

      {/* Banner Notifica Successo */}
      {actionSuccess && (
        <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3 text-emerald-400 text-sm">
          <CheckCircle2 size={18} />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-950 border border-white/5 p-5 rounded-xl">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest">Iscritti Totali</span>
            <Users size={16} className="text-accent-gold" />
          </div>
          <div className="text-3xl font-black text-white">{kpi.totalRegistrations || 0}</div>
          <div className="text-[11px] text-zinc-500 mt-1 font-mono">Nel database waitlist</div>
        </div>

        <div className="bg-zinc-950 border border-emerald-500/20 p-5 rounded-xl">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest">Idonei Qualificati</span>
            <FileCheck size={16} />
          </div>
          <div className="text-3xl font-black text-emerald-400">{kpi.eligibleCount || 0}</div>
          <div className="text-[11px] text-zinc-500 mt-1 font-mono">
            Soglia: {kpi.eligibleCount || 0} / {kpi.currentThreshold || 30}
          </div>
        </div>

        <div className="bg-zinc-950 border border-amber-500/20 p-5 rounded-xl">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest">Mancanti alla Soglia</span>
            <AlertTriangle size={16} />
          </div>
          <div className="text-3xl font-black text-amber-400">{kpi.missingToThreshold || 0}</div>
          <div className="text-[11px] text-zinc-500 mt-1 font-mono">Per attivare verbale</div>
        </div>

        <div className="bg-zinc-950 border border-white/5 p-5 rounded-xl">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-[10px] uppercase font-mono tracking-widest">Consenso Marketing</span>
            <Trophy size={16} className="text-accent-gold" />
          </div>
          <div className="text-3xl font-black text-white">{kpi.marketingConsentPercentage || 0}%</div>
          <div className="text-[11px] text-zinc-500 mt-1 font-mono">
            {kpi.marketingConsentsCount || 0} consensi facoltativi
          </div>
        </div>
      </div>

      {/* SEZIONE: REGISTRAZIONE VERBALE UFFICIALE (SENZA ESTRAZIONE AUTOMATICA) */}
      <section className="bg-zinc-950 border border-accent-gold/20 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Hash className="text-accent-gold" size={20} />
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">
              Registrazione Verbale Ufficiale di Assegnazione
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Nessuna estrazione automatica. Registra manualmente l&apos;esito dell&apos;assegnazione ufficiale svolta con verbale.
            </p>
          </div>
        </div>

        <form onSubmit={handleRecordOfficialDraw} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[10px] font-mono uppercase text-accent-gold mb-2">N. Protocollo Verbale</label>
            <input
              type="text"
              value={protocolNumber}
              onChange={(e) => setProtocolNumber(e.target.value)}
              placeholder="es. VRB-2026-09-001"
              className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm font-mono rounded text-white focus:outline-none focus:border-accent-gold"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-emerald-400 mb-2">Vincitore Assegnato</label>
            <select
              value={selectedWinnerId}
              onChange={(e) => setSelectedWinnerId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm font-mono rounded text-white focus:outline-none focus:border-emerald-400"
              required
            >
              <option value="">-- Seleziona idoneo --</option>
              {eligibleOnly.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-2">Riserva 1</label>
            <select
              value={selectedReserve1Id}
              onChange={(e) => setSelectedReserve1Id(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm font-mono rounded text-white focus:outline-none focus:border-zinc-500"
            >
              <option value="">-- Opzionale --</option>
              {eligibleOnly
                .filter((p: any) => p.id !== selectedWinnerId)
                .map((p: any) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.email})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={recordingDraw}
              className="w-full py-2.5 bg-accent-gold text-black font-bold uppercase text-xs font-mono tracking-wider rounded hover:bg-white transition disabled:opacity-50"
            >
              {recordingDraw ? "Salvataggio..." : "Registra Esito Verbale"}
            </button>
          </div>
        </form>
      </section>

      {/* SEZIONE: ELENCO PARTECIPANTI CON MASCHERAMENTO PII */}
      <section className="bg-zinc-950 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-accent-gold" size={18} />
              <h2 className="text-lg font-bold uppercase tracking-wider text-white">Elenco Partecipanti</h2>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Privacy by Design: i dati personali (email e telefono) sono mascherati per default.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono px-3 py-1 rounded border ${isUnmasked ? "bg-amber-950/40 text-amber-400 border-amber-500/30" : "bg-zinc-900 text-zinc-400 border-zinc-800"}`}>
              {isUnmasked ? "UNMASKED (Loggato)" : "MASKED (Sicuro)"}
            </span>

            {!isUnmasked ? (
              <button
                onClick={() => setUnmaskModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-xs font-mono text-white rounded hover:bg-zinc-800 transition"
              >
                <Eye size={14} /> Sblocca Vista Completa
              </button>
            ) : (
              <button
                onClick={() => fetchData(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-400 rounded hover:bg-zinc-800 transition"
              >
                Rimaschera Dati
              </button>
            )}
          </div>
        </div>

        {/* Tabella Partecipanti */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead className="bg-zinc-900/60 border-b border-white/10 text-zinc-400 uppercase">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Telefono</th>
                <th className="px-6 py-4">Sorgente / UTM</th>
                <th className="px-6 py-4">Status Idoneità</th>
                <th className="px-6 py-4">Data Iscrizione</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {participants.map((p: any) => (
                <tr key={p.id} className="hover:bg-white/2 transition">
                  <td className="px-6 py-4 font-bold text-white">{p.name}</td>
                  <td className="px-6 py-4">{p.email}</td>
                  <td className="px-6 py-4 text-zinc-400">{p.phone}</td>
                  <td className="px-6 py-4 text-zinc-400">{p.source}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${p.status === "eligible" ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30" : "bg-red-950/60 text-red-400 border border-red-500/30"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    {new Date(p.created_at).toLocaleString("it-IT", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </td>
                </tr>
              ))}
              {participants.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    Nessun iscritto trovato nella lista d&apos;attesa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEZIONE: AUDIT LOG */}
      <section className="bg-zinc-950 border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <FileText size={18} className="text-accent-gold" />
          <h2 className="text-base font-bold uppercase tracking-wider text-white">Registro Audit Log Immutabile</h2>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto font-mono text-xs">
          {data?.auditLog?.map((log: any) => (
            <div key={log.id} className="bg-zinc-900/40 p-3 rounded border border-white/5 flex items-start justify-between">
              <div>
                <span className="text-accent-gold font-bold">{log.action}</span>
                <span className="text-zinc-500 ml-2">by {log.actor_id}</span>
                <div className="text-zinc-400 text-[11px] mt-1">{JSON.stringify(log.details)}</div>
              </div>
              <span className="text-[10px] text-zinc-600">
                {new Date(log.created_at).toLocaleString("it-IT")}
              </span>
            </div>
          ))}
          {(!data?.auditLog || data.auditLog.length === 0) && (
            <div className="text-zinc-600 text-xs py-4 text-center">Nessuna operazione registrata nel log di audit.</div>
          )}
        </div>
      </section>

      {/* MODAL SBLOCCO PII CON MOTIVAZIONE OBBLIGATORIA */}
      {unmaskModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-amber-500/40 max-w-md w-full p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle size={20} />
              <h3 className="font-bold text-lg uppercase tracking-wider">Richiesta Accesso Dati PII</h3>
            </div>
            <p className="text-xs text-zinc-300">
              L&apos;accesso ai dati personali in chiaro viene registrato nel Log di Audit per conformità GDPR. Inserisci la motivazione ufficiale.
            </p>

            <form onSubmit={handleUnmaskRequest} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Motivazione Accesso</label>
                <textarea
                  value={unmaskReason}
                  onChange={(e) => setUnmaskReason(e.target.value)}
                  placeholder="es. Verifica verbale con notaio / Controllo idoneità finale"
                  className="w-full bg-zinc-900 border border-zinc-700 p-3 text-xs font-mono text-white rounded focus:outline-none focus:border-amber-400"
                  rows={3}
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUnmaskModal(false)}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-400 rounded hover:bg-zinc-800"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={unmasking}
                  className="px-4 py-2 bg-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider rounded hover:bg-amber-400 transition"
                >
                  {unmasking ? "Registrazione..." : "Conferma & Visualizza"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
