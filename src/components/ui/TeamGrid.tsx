"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { teamMembers } from "@/lib/teamData";
import { useGSAP } from "@/hooks/useGSAP";
import { animateCards } from "@/lib/gsapAnimations";
import { LOGO_PATH } from "@/lib/constants";
import { gsap } from "gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { Instagram } from "lucide-react";

export function TeamGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    animateCards("#team-grid-container", 0.2);

    // Julian's silhouette pulse animation
    const julianPulse = gsap.to(".julian-silhouette", {
      scale: 1.02,
      opacity: 0.9,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      julianPulse.kill();
    };
  }, { scope: containerRef });

  return (
    <section id="team-grid-container" ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto">


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {teamMembers.map((member) => {
          // Check for Julian's specific profile
          const isJulian = member.id === 'julian';
          
          // Get initials for standard placeholder
          const initials = member.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <PremiumCard 
              key={member.id} 
              href={`/team/${member.id}`}
              className="gsap-card group flex flex-col p-6 h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition-all duration-500">
                {isJulian ? (
                  /* Julian Silhouette */
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden group-hover:bg-zinc-900 transition-colors duration-500">
                    <Image 
                        src={member.imageUrl} 
                        alt={member.name} 
                        fill
                        className="julian_silhouette julian-silhouette object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>
                ) : member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className={`object-cover transition-all duration-700 
                      ${member.id === 'manuel' ? 'grayscale contrast-125' : 'md:grayscale'} 
                      group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-100`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  /* Generic Initial Placeholder */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-zinc-900 overflow-hidden group-hover:bg-zinc-800 transition-colors duration-500">
                    <div className="w-24 h-24 rounded-full border border-yellow-500/10 flex items-center justify-center mb-4 group-hover:border-yellow-500/30 transition-all duration-500">
                      <span className="font-heading text-4xl text-yellow-500/40 group-hover:text-yellow-500 transition-colors duration-500">
                        {initials}
                      </span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="mt-8 space-y-4 flex flex-col flex-grow">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-2xl font-bold uppercase text-white tracking-wide group-hover:text-yellow-500 transition-colors duration-300">
                      {member.name}
                    </h3>
                    {member.socialUrl && (
                      <span
                        className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 relative z-20"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(member.socialUrl, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        <Instagram size={20} />
                      </span>
                    )}
                  </div>
                  <p className="font-heading text-sm text-yellow-500 uppercase tracking-[0.2em] font-medium">
                    {member.role}
                  </p>
                </div>
                
                <div className="h-[1px] w-8 bg-yellow-500/30 group-hover:w-full transition-all duration-500" />
                
                <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </PremiumCard>
          );
        })}
      </div>
    </section>
  );
}
