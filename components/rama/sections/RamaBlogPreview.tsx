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
        <section id="blog-preview" className="reveal-section section-padding bg-black-pure border-t border-white/5" suppressHydrationWarning>
            <div className="container-max">
                {/* Header */}
                <div id="blog-preview-header" className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 lg:mb-40 gap-12">
                    <SectionHeading
                        title="DAL"
                        highlight="LABORATORIO"
                        subtitle="Storie, idee e dietro le quinte"
                        align="left"
                    />
                    <Link
                        href="/blog"
                        className="group flex items-center gap-4 text-[10px] text-text-secondary uppercase tracking-[0.4em] font-bold hover:text-accent-gold transition-colors"
                        suppressHydrationWarning
                    >
                        <span>Vedi tutti gli articoli</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div id="blog-preview-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {posts.map((post) => (
                        <PremiumCard key={post.slug} href={`/blog/${post.slug}`}>
                            <div className="space-y-10 p-4">
                                <div className="relative aspect-video overflow-hidden border border-white/5 bg-black-pure">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover grayscale group-hover:grayscale-0 transition-[filter,opacity,transform] duration-1000 group-hover:scale-105 opacity-40 group-hover:opacity-100"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black-pure via-transparent to-transparent" />
                                </div>
                                <div className="space-y-4 px-6 pb-8">
                                    <span className="font-syne text-[10px] uppercase tracking-[0.5em] text-accent-gold/60 font-bold">
                                        {categoryLabels[post.category as keyof typeof categoryLabels] || post.category}
                                    </span>
                                    <h3 className="font-syne text-2xl lg:text-3xl font-bold uppercase text-text-primary group-hover:text-accent-gold transition-colors duration-700 line-clamp-2 leading-tight tracking-tighter">
                                        {post.title}
                                    </h3>
                                    <div className="pt-4 flex items-center justify-between border-t border-white/5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000 delay-200">
                                        <span className="font-syne text-[9px] uppercase tracking-[0.4em] text-accent-gold">Read Article</span>
                                        <ArrowRight size={16} className="text-accent-gold group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </PremiumCard>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 lg:mt-40 text-center">
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-4 px-10 py-5 border border-white/5 bg-black-elevated/20 hover:border-accent-gold/30 transition-[border-color,background-color] duration-700"
                        suppressHydrationWarning
                    >
                        <span className="font-syne text-[10px] uppercase tracking-[0.4em] font-bold text-text-secondary group-hover:text-text-primary transition-colors">Esplora il Blog</span>
                        <ArrowRight size={18} className="text-text-secondary group-hover:text-accent-gold group-hover:translate-x-2 transition-[color,transform] duration-700" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
