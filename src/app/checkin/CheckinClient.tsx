"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  { ssr: false, loading: () => <div className="p-8 text-center text-zinc-500">Caricamento fotocamera...</div> }
);

type ScanMessage = { text: string; type: "success" | "error" | "warning" };

export default function CheckinClient() {
  const [scannedId, setScannedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<ScanMessage | null>(null);

  const handleScan = async (rawValue: string) => {
    if (loading || scannedId === rawValue) return;

    const ticketId = rawValue.startsWith("TICKET:")
      ? rawValue.replace("TICKET:", "").split("|")[0]
      : rawValue;

    setScannedId(rawValue);
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(
          res.status === 400 && data.scannedAt
            ? { text: `GIÀ ENTRATO alle ${new Date(data.scannedAt).toLocaleTimeString("it-IT")}`, type: "warning" }
            : { text: data.error || "Errore biglietto", type: "error" }
        );
      } else {
        setMessage({ text: "CHECK-IN VALIDO", type: "success" });
      }
    } catch (error) {
      console.error("Connection error:", error);
      setMessage({ text: "Errore di connessione", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-4">
          <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-3">
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">● Scanner Attivo</span>
          </div>
          <h1 className="text-3xl font-black text-[#FFD700] uppercase tracking-tighter">Check-in</h1>
          <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mt-1">Inquadra il QR Code del cliente</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative min-h-[300px] flex items-center justify-center">
          {!scannedId ? (
            <div className="w-full">
              <Scanner
                onScan={(result) => result?.[0]?.rawValue && handleScan(result[0].rawValue)}
                formats={["qr_code"]}
                components={{ finder: true }}
                styles={{ container: { width: "100%" } }}
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-zinc-950 p-6 text-center w-full">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-[#FFD700]/20 border-t-[#FFD700] rounded-full animate-spin" />
                  <div className="text-[#FFD700] font-bold uppercase tracking-widest text-[10px] animate-pulse">Verifica in corso...</div>
                </div>
              ) : message ? (
                <div className={`font-black text-2xl uppercase tracking-tighter ${message.type === "success" ? "text-green-500" : message.type === "warning" ? "text-yellow-500" : "text-red-500"}`}>
                  <div className="text-5xl mb-2">{message.type === "success" ? "✅" : message.type === "warning" ? "⚠️" : "❌"}</div>
                  {message.text}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {scannedId && !loading && (
          <button
            onClick={() => { setScannedId(null); setMessage(null); }}
            className="w-full mt-8 bg-[#FFD700] text-black font-black py-5 rounded-2xl hover:bg-white transition transform active:scale-95 uppercase tracking-widest text-sm"
          >
            PROSSIMO CLIENTE
          </button>
        )}
      </div>
    </div>
  );
}
