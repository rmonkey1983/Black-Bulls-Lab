import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      <div className="relative">
        {/* Pulsing ring */}
        <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-rama-accent/20 animate-ping" />
        <div className="absolute inset-0 w-24 h-24 rounded-full border border-rama-accent animate-pulse" />
        
        {/* Core circle */}
        <div className="w-24 h-24 rounded-full bg-black border border-rama-accent/50 flex items-center justify-center relative z-10">
          <div className="font-mohave font-bold text-rama-accent tracking-tighter text-2xl animate-pulse">
            BBL
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-2 text-center">
        <p className="font-mohave uppercase font-bold tracking-[0.3em] text-white/40 text-xs animate-pulse">
          Inizializzazione Protocollo
        </p>
        <div className="flex justify-center gap-1">
          <div className="w-1 h-1 bg-rama-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1 h-1 bg-rama-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1 h-1 bg-rama-accent rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
