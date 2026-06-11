"use client";

import React from "react";

export function GeometricBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.12]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-circuit" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Technical grid lines */}
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#EAB308" strokeWidth="0.5" strokeOpacity="0.2" />
            
            {/* Geometric accents */}
            <circle cx="0" cy="0" r="1.5" fill="#EAB308" />
            <circle cx="200" cy="0" r="1.5" fill="#EAB308" />
            <circle cx="0" cy="200" r="1.5" fill="#EAB308" />
            
            {/* Circuit paths */}
            <path d="M 50 0 L 50 50 L 100 50" fill="none" stroke="#EAB308" strokeWidth="0.5" />
            <path d="M 150 200 L 150 150 L 100 150" fill="none" stroke="#EAB308" strokeWidth="0.5" />
            <circle cx="100" cy="50" r="2" fill="none" stroke="#EAB308" strokeWidth="0.5" />
            <circle cx="100" cy="150" r="2" fill="none" stroke="#EAB308" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-circuit)" />
      </svg>
      {/* Radial overlay for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-zinc-950/80" />
    </div>
  );
}
