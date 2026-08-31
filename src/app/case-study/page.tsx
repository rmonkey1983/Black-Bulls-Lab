import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Case Study", description: "Archivio dei progetti documentati Black Bulls Lab.", robots: { index: false, follow: true }, alternates: { canonical: "/case-study" }, openGraph: { title: "Case Study | Black Bulls Lab", description: "Archivio dei progetti documentati Black Bulls Lab.", url: "https://blackbullslab.com/case-study" } };

export default function CaseStudyPage() {
  return <main className="bg-black-pure text-text-primary min-h-screen"><section className="max-w-[900px] mx-auto px-6 md:px-12 pt-48 pb-24"><p className="text-accent-gold text-xs uppercase tracking-[.35em] mb-6">Archivio</p><h1 className="text-5xl md:text-8xl leading-[.88]">Case Study</h1><p className="max-w-2xl text-xl md:text-2xl leading-relaxed mt-12">Una pagina informativa di Black Bulls Lab.</p><Link href="/contatti" className="inline-flex items-center gap-3 mt-8 text-accent-gold font-syne text-xs uppercase tracking-[.25em] hover:text-white transition-colors">Parla con noi di un progetto <ArrowRight size={16} /></Link></section></main>;
}
