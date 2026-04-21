import React from "react";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogList } from "./BlogList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PreFooterCTA } from "@/components/layout/PreFooterCTA";

export const metadata: Metadata = {
  title: "Blog | Idee e Storie dal Laboratorio",
  description:
    "Idee per serate originali a Torino, dietro le quinte dei nostri format e storie del team. Entra nel laboratorio delle emozioni di Black Bulls Lab",
  openGraph: {
    title: "Blog | Idee e Storie dal Laboratorio | Black Bulls Lab",
    description: "Idee, storie e ispirazione dal laboratorio delle emozioni di Black Bulls Lab a Torino",
    url: "https://blackbullslab.com/blog",
  },
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <SectionHeading
            level="h1"
            title="DAL"
            highlight="LABORATORIO."
            subtitle="I Nostri Appunti"
            align="center"
          />
          <p className="max-w-2xl mx-auto font-sans text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
            Idee, storie e ispirazione per chi vuole vivere qualcosa di vero.
          </p>
        </div>
      </section>

      {/* Blog List & Filters */}
      <section className="px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <BlogList posts={posts} />
        </div>
      </section>

      {/* Pre-footer CTA */}
      <div className="mt-32">
        <PreFooterCTA />
      </div>
    </div>
  );
}
