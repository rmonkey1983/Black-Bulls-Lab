"use client";

import { Download } from "lucide-react";

interface DownloadTicketButtonProps {
  ticketId: string;
}

export function DownloadTicketButton({ ticketId }: DownloadTicketButtonProps) {
  const handleDownload = () => {
    // In a real application, this might generate a PDF on the server or use html2canvas.
    // For now, the simplest robust approach is to trigger the print dialog, 
    // which allows the user to 'Save as PDF'.
    window.print();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #ticket-${ticketId}, #ticket-${ticketId} * {
            visibility: visible;
          }
          #ticket-${ticketId} {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            page-break-inside: avoid;
          }
          @page {
            margin: 0;
            size: auto;
          }
        }
      `}} />
      <button
        onClick={handleDownload}
        className="mt-4 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-xl transition-colors text-sm font-medium uppercase tracking-wider"
      >
        <Download size={16} className="text-[#FFD700]" />
        Scarica Biglietto
      </button>
    </>
  );
}
