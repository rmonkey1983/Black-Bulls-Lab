"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { animateFade, animateCards } from "@/lib/gsapAnimations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { BlogPost } from "@/lib/blog";

interface RamaBlogPreviewProps {
    posts: BlogPost[];
}

export function RamaBlogPreview({ posts }: RamaBlogPreviewProps) {
    useGSAP(() => {
        animateFade("#blog-preview-header", "up", 0.1);
        animateCards("#blog-preview-grid");
    });

    const categoryStyles = {
        seo: "text-amber-500",
        eventi: "text-teal-500",
        team: "text-purple-500",
    };

    const categoryLabels = {
        seo: "Idee & Torino",
        eventi: "I Nostri Format",
        team: "Il Team",
    };

    return (
        <section id="blog-preview" className="py-32 bg-zinc-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div id="blog-preview-header" className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <SectionHeading
                        title="DAL"
                        highlight="LABORATORIO."
                        subtitle="Storie, idee e dietro le quinte."
                        align="left"
                    />
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest font-bold hover:text-yellow-500 transition-colors"
                    >
                        Vedi tutti gli articoli <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div id="blog-preview-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PremiumCard key={post.slug} href={`/blog/${post.slug}`} className="group p-5">
                            <div className="space-y-6">
                                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-500">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                </div>
                                <div className="space-y-3">
                                    <span className={`font-heading text-[10px] uppercase tracking-[0.2em] font-bold ${categoryStyles[post.category as keyof typeof categoryStyles] || categoryStyles.seo}`}>
                                        {categoryLabels[post.category as keyof typeof categoryLabels] || post.category}
                                    </span>
                                    <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-white group-hover:text-yellow-500 transition-colors line-clamp-2 leading-tight tracking-tight">
                                        {post.title}
                                    </h3>
                                    <div className="pt-2 flex items-center gap-1.5 text-yellow-500 text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Leggi l&apos;articolo <ArrowRight size={12} />
                                    </div>
                                </div>
                            </div>
                        </PremiumCard>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white font-heading font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-full hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300"
                    >
                        Vai al Blog
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
