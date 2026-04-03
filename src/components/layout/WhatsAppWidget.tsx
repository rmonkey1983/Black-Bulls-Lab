"use client";

import { MessageCircle } from "lucide-react";
const WHATSAPP_NUMBER = "393342010067";
const WHATSAPP_TEXT = encodeURIComponent("Ciao! Vorrei informazioni su un evento con Black Bulls Lab 🎭");

export function WhatsAppWidget() {
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contattaci su WhatsApp"
            className="fixed bottom-20 right-4 md:bottom-8 md:right-6 z-[90] group flex items-center gap-3"
        >
            {/* Tooltip label */}
            <span className="hidden md:flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-[#0a0a0a] border border-white/10 text-white font-outfit text-sm px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
                Scrivici su WhatsApp
            </span>

            {/* Button */}
            <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] group-hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all duration-300 group-hover:scale-110">
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
                <MessageCircle size={26} className="text-white relative z-10" fill="white" />
            </div>
        </a>
    );
}
