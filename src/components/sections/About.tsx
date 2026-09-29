"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.06] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cinematic Imagery (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] aspect-[4/5] sm:aspect-[5/6] max-h-[640px] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
                alt="Noir Events Production Behind the Scenes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />

              {/* Float badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-panel text-white">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Noir Creed</span>
                </div>
                <p className="font-serif italic text-lg sm:text-xl text-white">
                  &ldquo;We don&apos;t just manage logistics; we curate emotional architecture.&rdquo;
                </p>
                <span className="text-xs text-white/70 block mt-2">
                  — Atelier Director & Spatial Scenographer
                </span>
              </div>
            </div>

            {/* Overlapping aesthetic frame */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-full h-full rounded-3xl border border-[var(--accent)]/30 -z-10 pointer-events-none" />
          </motion.div>

          {/* Right Column: Editorial Narrative & Philosophy (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <SectionHeading
              eyebrow="Behind The Experience"
              title="Where Haute Architecture Meets Theatrical Engineering"
              className="mb-6"
            />

            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed">
              Founded on the belief that extraordinary events possess the gravity of theatrical masterworks, {SITE_CONFIG.name} unites world-class stage designers, structural engineers, lighting artists, and luxury hospitality concierges.
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
              Whether building a temporary glass amphitheatre on the cliffs of Ravello or transforming a historic Parisian palace into an acoustic sanctuary for 600 global luminaries, our mandate remains singular: absolute perfection, delivered with discretion.
            </p>

            {/* Core credentials checklist */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Global Vendor & Talent Network",
                "Diplomatic Level Privacy & NDA Protocols",
                "Full Redundancy Power & AV Backups",
                "Dedicated On-Site Senior Producer",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA action */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => scrollToSection("#contact")}
                magnetic
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Collaborate With Our Atelier
              </Button>

              <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                Based in London, NYC & Paris
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
