"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Award, ShieldCheck, Star, Zap } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[550px] bg-[var(--accent)] opacity-[0.1] blur-[160px] pointer-events-none" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Main Call to Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Luxury Agency Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-8 h-[1px] bg-[var(--accent)]" />
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[var(--border-accent)] bg-[var(--bg-glass)] text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--accent)] shadow-md backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Luxury Experiential Agency</span>
              </div>
            </motion.div>

            {/* Oversized Responsive Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-serif font-light text-[var(--text-primary)] leading-[1.04] tracking-tight"
            >
              <span>{SITE_CONFIG.headline.line1}</span>
              <br />
              <span className="font-serif italic font-normal text-gold-gradient">
                {SITE_CONFIG.headline.line2}
              </span>
              <br />
              <span>{SITE_CONFIG.headline.line3}</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 sm:mt-8 text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-xl"
            >
              {SITE_CONFIG.description}
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection("#contact")}
                magnetic
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Plan Your Event
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("#events")}
                magnetic
              >
                Explore Our Work
              </Button>
            </motion.div>

            {/* Trust and Key Performance Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 sm:mt-16 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {SITE_CONFIG.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-serif font-light text-gold-gradient tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] mt-0.5">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                    {stat.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Interactive Luxury Feature Showcase (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Feature Showcase Grid Cards */}
            <div className="w-full max-w-[480px] grid grid-cols-1 gap-4 relative">
              {/* Main Luxury Credentials Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-accent)] bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-glass)] to-[var(--bg-tertiary)] shadow-2xl relative overflow-hidden group hover:border-[var(--accent)] transition-all duration-500">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[var(--accent)]/20 transition-all" />

                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/15 border border-[var(--border-accent)] flex items-center justify-center text-[var(--accent)] shadow-inner">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--accent)] px-3 py-1 rounded-full bg-[var(--accent-subtle)] border border-[var(--border-accent)] font-semibold">
                    Global Standards
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-light text-[var(--text-primary)] leading-tight mb-2">
                  Architectural Precision & Luxury Execution
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-light">
                  From high-stakes summits in Dubai to private galas in Paris, we engineer bespoke immersive environments with uncompromised artistry.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--border-subtle)] text-xs">
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                    <ShieldCheck className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>Turnkey Production</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                    <Zap className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>Real-Time Direction</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                    <Star className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>VIP Protocols</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                    <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>Cinematic Audio/Visual</span>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Micro Card */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="glass-panel p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 border border-[var(--border-accent)] flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-[var(--accent)] fill-[var(--accent)]/30" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[var(--text-primary)]">
                      100% Bespoke Creative Direction
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">
                      Zero Off-The-Shelf Templates
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-serif text-gold-gradient font-semibold">
                    4.98★
                  </span>
                  <div className="text-[9px] text-[var(--text-muted)] font-mono">
                    CLIENT RATING
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
