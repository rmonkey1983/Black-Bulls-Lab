"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { ArrowLeft, Instagram, Star, Award, BookOpen } from "lucide-react";
import { CONTACT_WHATSAPP } from "@/lib/constants";
import { TeamMember } from "@/lib/teamData";

interface TeamMemberClientProps {
  member: TeamMember;
}

export function TeamMemberClient({ member }: TeamMemberClientProps) {
  const [imageError, setImageError] = React.useState(false);

  useGSAP(() => {
    // Reveal animation for specific profile content
    gsap.from(".profile-content", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2
    });
  }, [member.id]);

  const whatsappMessage = encodeURIComponent(`Ciao Julian, vorrei informazioni per prenotare ${member.name}`);
  const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <div className="profile-content mb-12">
          <Link 
            href="/chi-siamo" 
            suppressHydrationWarning
            className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 font-sans uppercase tracking-widest text-xs"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Torna al Team
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Image Centerpiece */}
          <div className="lg:col-span-5 profile-content">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/5 shadow-2xl group bg-zinc-900 flex items-center justify-center">
              {!imageError ? (
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  priority
                  onError={() => setImageError(true)}
                  className={`object-cover transition-all duration-1000 
                    ${member.id === 'manuel' ? 'grayscale contrast-125' : 'md:grayscale'} 
                    hover:grayscale-0 hover:scale-105 hover:contrast-100`}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-zinc-900 w-full h-full">
                  <div className="w-20 h-20 rounded-full border border-yellow-500/20 flex items-center justify-center mb-4">
                    <span className="font-heading text-3xl text-yellow-500">{member.name[0]}</span>
                  </div>
                  <span className="font-heading text-xl text-white/50 uppercase tracking-widest">{member.name}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-8">
              {/* Header */}
              <div className="profile-content">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-8 bg-yellow-500/40" />
                  <span className="font-rock-salt text-yellow-500 transform -rotate-2 text-lg">
                    Artist Profile
                  </span>
                </div>
                <h1 className="font-heading font-bold text-6xl md:text-8xl text-white uppercase leading-[0.85] tracking-tighter">
                  {member.name}
                </h1>
                <p className="font-heading text-xl md:text-2xl text-yellow-500 uppercase tracking-[0.2em] font-medium mt-4">
                  {member.role}
                </p>
              </div>

              {/* Bio Section */}
              <div className="profile-content space-y-6">
                <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-xs font-bold">
                  <BookOpen size={14} className="text-yellow-500" />
                  <span>Biografia</span>
                </div>
                <div className="font-sans text-lg md:text-xl text-zinc-300 space-y-6 leading-relaxed font-light max-w-2xl">
                  {member.fullBio ? (
                    member.fullBio.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{member.bio}</p>
                  )}
                </div>
              </div>

              {/* Specific Skills & Training - Premium Blocks */}
              {(member.qualifiche || member.formazione) && (
                <div className="profile-content grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {/* Qualifiche */}
                  {member.qualifiche && member.qualifiche.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-yellow-500/20 transition-all duration-500">
                      <div className="flex items-center gap-2 text-yellow-500 uppercase tracking-widest text-xs font-bold mb-6">
                        <Award size={16} />
                        <span>Skill & Qualifiche</span>
                      </div>
                      <ul className="space-y-4">
                        {member.qualifiche.map((q, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)] shrink-0" />
                            <span className="font-sans text-zinc-300 text-sm tracking-wide uppercase">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Formazione */}
                  {member.formazione && member.formazione.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-yellow-500/20 transition-all duration-500">
                      <div className="flex items-center gap-2 text-yellow-500 uppercase tracking-widest text-xs font-bold mb-6">
                        <Star size={16} />
                        <span>Formazione</span>
                      </div>
                      <ul className="space-y-3">
                        {member.formazione.map((f, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40 mt-1.5 shrink-0" />
                            <span className="font-sans text-zinc-400 text-sm leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="profile-content pt-10 flex flex-wrap gap-6">
                <PrimaryButton href={whatsappUrl} size="lg">
                    PRENOTA PER IL TUO EVENTO
                </PrimaryButton>
                
                {member.socialUrl && (
                  <SecondaryButton href={member.socialUrl} size="lg">
                    <Instagram size={18} className="mr-2" />
                    <span>Segui su Instagram</span>
                  </SecondaryButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
}
