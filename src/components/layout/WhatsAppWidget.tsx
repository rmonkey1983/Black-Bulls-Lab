"use client";

import { MessageCircle } from "lucide-react";
import { buildWAUrl, WA_MESSAGES } from "@/lib/whatsapp";

export function WhatsAppWidget() {
    const href = buildWAUrl(WA_MESSAGES.default);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contattaci su WhatsApp"
            className="fixed bottom-24 left-5 md:bottom-10 md:left-10 z-[110] group flex flex-row-reverse items-center gap-3"
        >
            {/* Tooltip label */}
            <span className="hidden md:flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 bg-[#0a0a0a] border border-white/10 text-white font-outfit text-sm px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
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
