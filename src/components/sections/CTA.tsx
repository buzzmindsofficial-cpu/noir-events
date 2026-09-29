"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/config/site";
import { scrollToSection } from "@/lib/utils";

export function CTA() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-transparent">
      {/* Radiant ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-r from-[var(--accent)]/15 via-[var(--accent)]/25 to-purple-600/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Subtle border outline container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl border border-[var(--border-accent)] bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] p-8 sm:p-16 lg:p-20 text-center shadow-2xl overflow-hidden">
          {/* Subtle decorative gold lines */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full border border-[var(--accent)]/20 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border border-[var(--accent)]/20 pointer-events-none" />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
              The Stage Is Set
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight text-[var(--text-primary)] leading-[1.05] max-w-4xl mx-auto"
          >
            LET&apos;S CREATE <br />
            <span className="italic font-serif text-gold-gradient">SOMETHING</span> <br />
            UNFORGETTABLE.
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base sm:text-xl text-[var(--text-secondary)] font-light max-w-xl mx-auto leading-relaxed"
          >
            Tell us what you&apos;re imagining. We&apos;ll take care of everything else.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("#contact")}
              magnetic
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start Planning
            </Button>

            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors px-6 py-4 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--accent)]"
            >
              <PhoneCall className="w-4 h-4 text-[var(--accent)]" />
              <span>Direct Concierge</span>
            </a>
          </motion.div>

          <p className="mt-8 text-xs text-[var(--text-muted)] font-mono">
            Direct Concierge: {SITE_CONFIG.contact.phone} • Typical response time: under 4 hours
          </p>
        </div>
      </div>
    </section>
  );
}
