"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  TrendingUp,
  Target,
  UserCheck,
  UserX,
  Share2,
  PieChart,
  Download,
  Eye,
  RefreshCw,
  Calendar,
  Layers,
  Archive,
  ShieldCheck,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function CommunityDashboardClient() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  // Filtri
  const [period, setPeriod] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [marketingFilter, setMarketingFilter] = useState("all");

  // Paginazione
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Unmask Modal
  const [unmaskModal, setUnmaskModal] = useState(false);
  const [unmaskReason, setUnmaskReason] = useState("");
  const [unmasking, setUnmasking] = useState(false);
  const [isUnmasked, setIsUnmasked] = useState(false);

  const [exporting, setExporting] = useState(false);

  const fetchData = useCallback(
    async (unmask = false, reason = "") => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          period,
          status: statusFilter,
          source: sourceFilter,
          marketing: marketingFilter,
          unmask: unmask ? "true" : "false",
          reason,
        });

        const res = await fetch(`/api/admin/community?${queryParams.toString()}`);
        const json = await res.json();
        setData(json);
        setIsUnmasked(Boolean(json.isUnmasked));
      } catch (err) {
        console.error("Errore caricamento dati community:", err);
      } finally {
        setLoading(false);
      }
    },
    [period, statusFilter, sourceFilter, marketingFilter]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUnmaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unmaskReason.trim()) return;
    setUnmasking(true);
    await fetchData(true, unmaskReason);
    setUnmasking(false);
    setUnmaskModal(false);
    setUnmaskReason("");
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const res = await fetch("/api/admin/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "EXPORT_CSV",
          reason: "Download report community filtrato",
        }),
      });

      if (!res.ok) throw new Error("Errore durante l'esportazione");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `community_export_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setExporting(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="p-12 text-center text-zinc-500 font-mono">
        <RefreshCw className="animate-spin mx-auto mb-4 text-accent-gold" size={32} />
        Inizializzazione Analytics Crescita Community...
      </div>
    );
  }

  const kpi = data?.kpi || {};
  const party = data?.partyDistribution || {};
  const quality = data?.qualityMetrics || {};
  const sources = data?.sources || [];
  const campaigns = data?.campaigns || [];
  const participants = data?.participants || [];
  const archived = data?.archivedCampaign || {};

  // Paginazione locale dei partecipanti
  const totalPages = Math.ceil(participants.length / pageSize) || 1;
  const paginatedParticipants = participants.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-4 md:p-8 space-y-10 text-white font-sans">
      {/* Header Principale */}
      <header className="relative border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <span className="data-readout text-[10px] text-accent-gold tracking-[0.3em] uppercase">
              BBL // FIRST-PARTY ANALYTICS
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Crescita <span className="text-accent-gold">Community</span>
          </h1>
          <p className="font-sans text-zinc-400 mt-2 text-sm max-w-xl font-light">
            Analisi first-party e monitoraggio dell&apos;obiettivo interno di espansione della lista d&apos;attesa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2.5 bg-accent-gold text-black font-mono text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-white transition disabled:opacity-50"
          >
            <Download size={14} /> {exporting ? "Esportazione..." : "Esporta CSV Protetto"}
          </button>
        </div>
      </header>

      {/* Avviso Trattamento Privacy */}
      <div className="bg-zinc-950 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2 text-accent-gold">
          <ShieldCheck size={16} />
          <span>Uso Dati Conforme Privacy by Design // Nessun Trattamento Promozionale per i Contatti Senza Consenso Marketing</span>
        </div>
        <span className="text-[10px] uppercase text-zinc-500">GDPR Compliant</span>
      </div>

      {/* 1. SEZIONE KPI PRINCIPALI */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-gold">
            01 // Indicatori Chiave (KPI)
          </h2>
          <span className="text-[10px] font-mono text-zinc-500">
            Obiettivo Interno: {kpi.monthlyTarget || 30} iscrizioni/mese
          </span>
        </div>

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-zinc-950 border border-white/5 p-5 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-zinc-500 text-[10px] font-mono uppercase">
              <span>Iscritti Totali</span>
              <Users size={14} className="text-accent-gold" />
            </div>
            <div className="text-3xl font-black text-white">{kpi.totalRegistrations || 0}</div>
            <div className="text-[11px] text-zinc-500 font-mono">Nel database waitlist</div>
          </div>

          <div className="bg-zinc-950 border border-emerald-500/20 p-5 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-emerald-400 text-[10px] font-mono uppercase">
              <span>Nuovi del Mese</span>
              <TrendingUp size={14} />
            </div>
            <div className="text-3xl font-black text-emerald-400">{kpi.newThisMonth || 0}</div>
            <div className="text-[11px] text-zinc-500 font-mono">
              +{kpi.newLast7Days || 0} ultimi 7gg
            </div>
          </div>

          <div className="bg-zinc-950 border border-accent-gold/20 p-5 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-accent-gold text-[10px] font-mono uppercase">
              <span>Obiettivo Interno</span>
              <Target size={14} />
            </div>
            <div className="text-3xl font-black text-accent-gold">{kpi.progressPercentage || 0}%</div>
            <div className="text-[11px] text-zinc-400 font-mono">
              {kpi.missingToMonthlyTarget > 0
                ? `Mancano ${kpi.missingToMonthlyTarget} all'obiettivo`
                : "Obiettivo mensile raggiunto!"}
            </div>
          </div>

          <div className="bg-zinc-950 border border-white/5 p-5 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-zinc-500 text-[10px] font-mono uppercase">
              <span>Partecipanti Potenziali</span>
              <UserCheck size={14} className="text-white" />
            </div>
            <div className="text-3xl font-black text-white">{kpi.potentialParticipantsTotal || 0}</div>
            <div className="text-[11px] text-zinc-500 font-mono">Stima totale posti</div>
          </div>

          <div className="bg-zinc-950 border border-white/5 p-5 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-zinc-500 text-[10px] font-mono uppercase">
              <span>Consenso Marketing</span>
              <PieChart size={14} className="text-accent-gold" />
            </div>
            <div className="text-3xl font-black text-white">{quality.marketingConsentPct || 0}%</div>
            <div className="text-[11px] text-zinc-500 font-mono">
              {kpi.marketingConsents || 0} consensi attivi
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEZIONE ANDAMENTO E DIMENSIONE DEI GRUPPI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Andamento Mensile */}
        <section className="bg-zinc-950 border border-white/10 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-accent-gold" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                Avanzamento Community
              </h2>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">Target: {kpi.monthlyTarget || 30} / mese</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400">Nuovi iscritti questo mese:</span>
              <span className="text-accent-gold font-bold">{kpi.newThisMonth} / {kpi.monthlyTarget}</span>
            </div>

            <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-linear-to-r from-accent-gold/60 to-accent-gold h-full transition-all duration-1000"
                style={{ width: `${kpi.progressPercentage || 0}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2 border-t border-white/5">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Ultimi 30 Giorni</span>
                <span className="text-lg font-bold text-white">{kpi.newLast30Days || 0}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">30 Giorni Precedenti</span>
                <span className="text-lg font-bold text-zinc-400">{kpi.newPrev30Days || 0}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dimensione dei Gruppi */}
        <section className="bg-zinc-950 border border-white/10 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Users className="text-accent-gold" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                Dimensione dei Gruppi
              </h2>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">Media: {party.averagePartySize || 1} p/iscr.</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 text-center font-mono">
            <div className="bg-zinc-900/60 p-3 rounded border border-white/5">
              <span className="text-[10px] text-zinc-500 uppercase block">Singoli</span>
              <span className="text-xl font-bold text-white">{party.individual || 0}</span>
            </div>
            <div className="bg-zinc-900/60 p-3 rounded border border-white/5">
              <span className="text-[10px] text-zinc-500 uppercase block">Coppie</span>
              <span className="text-xl font-bold text-white">{party.couples || 0}</span>
            </div>
            <div className="bg-zinc-900/60 p-3 rounded border border-white/5">
              <span className="text-[10px] text-zinc-500 uppercase block">3-4 Pers.</span>
              <span className="text-xl font-bold text-white">{party.groups3to4 || 0}</span>
            </div>
            <div className="bg-zinc-900/60 p-3 rounded border border-white/5">
              <span className="text-[10px] text-zinc-500 uppercase block">5-6 Pers.</span>
              <span className="text-xl font-bold text-white">{party.groups5to6 || 0}</span>
            </div>
            <div className="bg-zinc-900/60 p-3 rounded border border-white/5">
              <span className="text-[10px] text-zinc-500 uppercase block">&gt; 6 Pers.</span>
              <span className="text-xl font-bold text-white">{party.groupsOver6 || 0}</span>
            </div>
          </div>
        </section>
      </div>

      {/* 3. SEZIONE SORGENTI E QUALITÀ COMMUNITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sorgenti Principali */}
        <section className="bg-zinc-950 border border-white/10 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Share2 className="text-accent-gold" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                Sorgenti Iscrizione
              </h2>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {sources.map((s: any) => (
              <div key={s.name} className="flex justify-between items-center bg-zinc-900/40 p-2.5 rounded border border-white/5">
                <span className="text-zinc-300 font-bold">{s.name}</span>
                <div className="flex items-center gap-4 text-zinc-400">
                  <span>{s.count} iscritti</span>
                  <span className="text-accent-gold">({s.potential} posti est.)</span>
                </div>
              </div>
            ))}
            {sources.length === 0 && (
              <div className="text-zinc-500 text-center py-4">Nessuna sorgente tracciata.</div>
            )}
          </div>
        </section>

        {/* Qualità Dati & Consensi */}
        <section className="bg-zinc-950 border border-white/10 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-accent-gold" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                Qualità Dati & Consensi
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="bg-zinc-900/40 p-3 rounded border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Email Valide</span>
              <span className="text-lg font-bold text-emerald-400">{quality.emailCompletePct}%</span>
            </div>
            <div className="bg-zinc-900/40 p-3 rounded border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Telefoni Presenti</span>
              <span className="text-lg font-bold text-white">{quality.phonePresentPct}%</span>
            </div>
            <div className="bg-zinc-900/40 p-3 rounded border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Consenso Evento</span>
              <span className="text-lg font-bold text-emerald-400">{quality.eventConsentPct}%</span>
            </div>
            <div className="bg-zinc-900/40 p-3 rounded border border-white/5 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Consenso Marketing</span>
              <span className="text-lg font-bold text-accent-gold">{quality.marketingConsentPct}%</span>
            </div>
          </div>
        </section>
      </div>

      {/* 4. FILTRI E TABELLA CONTATTI */}
      <section className="bg-zinc-950 border border-white/10 rounded-xl overflow-hidden space-y-4 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-white font-mono">
              Elenco Contatti Community
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Privacy by Design: i dati identificativi (email e telefono) sono mascherati.
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
                <Eye size={14} /> Richiedi Vista Autorizzata
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

        {/* Filtri */}
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs pb-2">
          <div>
            <label className="block text-[10px] text-zinc-500 uppercase mb-1">Periodo</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-white focus:outline-none focus:border-accent-gold"
            >
              <option value="all">Tutti i periodi</option>
              <option value="today">Oggi</option>
              <option value="last7">Ultimi 7 giorni</option>
              <option value="thisMonth">Mese corrente</option>
              <option value="last30">Ultimi 30 giorni</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-zinc-500 uppercase mb-1">Stato Contatto</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-white focus:outline-none focus:border-accent-gold"
            >
              <option value="all">Tutti gli stati</option>
              <option value="pending">In Attesa</option>
              <option value="withdrawn">Ritirati</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-zinc-500 uppercase mb-1">Fonte / UTM</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-white focus:outline-none focus:border-accent-gold"
            >
              <option value="all">Tutte le fonti</option>
              {sources.map((s: any) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-zinc-500 uppercase mb-1">Consenso Marketing</label>
            <select
              value={marketingFilter}
              onChange={(e) => setMarketingFilter(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-white focus:outline-none focus:border-accent-gold"
            >
              <option value="all">Tutti</option>
              <option value="yes">Solo Accettato</option>
              <option value="no">Solo Negato</option>
            </select>
          </div>
        </div>

        {/* Tabella Partecipanti Paginata */}
        <div className="overflow-x-auto border-t border-white/10 pt-4">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead className="bg-zinc-900/60 text-zinc-400 uppercase">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Telefono</th>
                <th className="px-4 py-3">Città</th>
                <th className="px-4 py-3">Ospiti</th>
                <th className="px-4 py-3">Fonte</th>
                <th className="px-4 py-3">Mkt. Consenso</th>
                <th className="px-4 py-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {paginatedParticipants.map((p: any) => (
                <tr key={p.id} className="hover:bg-white/2 transition">
                  <td className="px-4 py-3 font-bold text-white">{p.name}</td>
                  <td className="px-4 py-3">{p.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{p.phone}</td>
                  <td className="px-4 py-3">{p.city}</td>
                  <td className="px-4 py-3 text-accent-gold font-bold">{p.guests_count}</td>
                  <td className="px-4 py-3 text-zinc-400">{p.source}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${p.marketing_consent ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30" : "bg-zinc-900 text-zinc-500 border border-zinc-800"}`}>
                      {p.marketing_consent ? "SI" : "NO"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">
                    {new Date(p.created_at).toLocaleDateString("it-IT")}
                  </td>
                </tr>
              ))}
              {paginatedParticipants.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-zinc-500">
                    Nessun iscritto trovato per i filtri selezionati.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginazione */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-xs">
          <span className="text-zinc-500">
            Pagina {currentPage} di {totalPages} ({participants.length} contatti filtrati)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 hover:text-white disabled:opacity-30"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. SEZIONE PROGETTI ARCHIVIATI (SOLO LETTURA) */}
      <section className="bg-zinc-950 border border-amber-500/20 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Archive size={18} className="text-amber-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
            Progetti Archiviati (Sola Lettura)
          </h2>
        </div>

        <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold uppercase">{archived.title || "La Prima Bugia"}</span>
              <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-500/30 text-amber-400 text-[9px] uppercase rounded">
                {archived.legal_status || "blocked_no_promoter"}
              </span>
            </div>
            <p className="text-zinc-400 mt-1 font-sans text-xs">{archived.note}</p>
          </div>

          <div className="text-[10px] text-zinc-500 space-y-0.5 text-right">
            <div>Stato: {archived.status}</div>
            <div>Promozione Pubblica: {archived.public_enabled ? "ATTIVA" : "DISATTIVATA"}</div>
            <div>Promotore: {archived.promoter_name || "Nessuno (Bloccato)"}</div>
          </div>
        </div>
      </section>

      {/* MODAL SBLOCCO PII PER VISTA AUTORIZZATA */}
      {unmaskModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-amber-500/40 max-w-md w-full p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle size={20} />
              <h3 className="font-bold text-lg uppercase tracking-wider">Richiesta Accesso Dati PII</h3>
            </div>
            <p className="text-xs text-zinc-300">
              L&apos;accesso ai dati in chiaro viene registrato nel Log di Audit per conformità GDPR. Inserisci la motivazione dell&apos;accesso.
            </p>

            <form onSubmit={handleUnmaskSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Motivazione Accesso</label>
                <textarea
                  value={unmaskReason}
                  onChange={(e) => setUnmaskReason(e.target.value)}
                  placeholder="es. Verifica amministrativa contatti sessione pilota"
                  className="w-full bg-zinc-900 border border-zinc-700 p-3 text-xs font-mono text-white rounded focus:outline-none focus:border-amber-400"
                  rows={3}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 font-mono">
                <button
                  type="button"
                  onClick={() => setUnmaskModal(false)}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-700 text-xs text-zinc-400 rounded hover:bg-zinc-800"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={unmasking}
                  className="px-4 py-2 bg-amber-500 text-black font-bold text-xs uppercase tracking-wider rounded hover:bg-amber-400 transition"
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
