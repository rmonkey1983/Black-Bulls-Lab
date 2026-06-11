"use client";

import React from "react";

export function BackgroundWrapper() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.15]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint-grid" width="240" height="240" patternUnits="userSpaceOnUse">
            {/* Major grid lines */}
            <path d="M 240 0 L 0 0 0 240" fill="none" stroke="#EAB308" strokeWidth="1" strokeOpacity="0.15" />
            
            {/* Sub-grid lines (blueprint style) */}
            <path d="M 60 0 L 60 240 M 120 0 L 120 240 M 180 0 L 180 240" fill="none" stroke="#EAB308" strokeWidth="0.5" strokeOpacity="0.05" />
            <path d="M 0 60 L 240 60 M 0 120 L 240 120 M 0 180 L 240 180" fill="none" stroke="#EAB308" strokeWidth="0.5" strokeOpacity="0.05" />

            {/* Technical Dots/Intersections */}
            <circle cx="0" cy="0" r="1.5" fill="#EAB308" fillOpacity="0.4" />
            <circle cx="120" cy="120" r="1" fill="#EAB308" fillOpacity="0.2" />
            
            {/* Geometric Technical Accents */}
            <path d="M 20 20 L 50 20 L 50 50" fill="none" stroke="#EAB308" strokeWidth="0.5" strokeOpacity="0.3" />
            <circle cx="50" cy="50" r="3" fill="none" stroke="#EAB308" strokeWidth="0.5" strokeOpacity="0.2" />
            
            <path d="M 220 220 L 190 220 L 190 190" fill="none" stroke="#EAB308" strokeWidth="0.5" strokeOpacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
      </svg>
      
      {/* Immersive depth radial gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-zinc-950/90" />
      
      {/* Noise texture overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.webp')] mix-blend-overlay" />
    </div>
  );
}
