"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { PROCESS_STEPS } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";

export function Process() {
  return (
    <section id="process" className="py-24 sm:py-32 relative bg-transparent">
      {/* Background line connector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="The Methodology"
          title="Engineered Step by Step to Perfection"
          subtitle="Our four-stage production framework balances blue-sky artistic imagination with uncompromising project management rigor."
        />

        {/* Process Timeline */}
        <div className="relative mt-16 sm:mt-20">
          {/* Vertical Connecting Line on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[1px] bg-gradient-to-b from-[var(--accent)]/50 via-[var(--accent)]/20 to-transparent -translate-x-1/2 pointer-events-none" />

          <div className="space-y-12 lg:space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 1;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Box (Half width) */}
                  <div className="w-full lg:w-1/2">
                    <div
                      className={`p-8 sm:p-10 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all duration-300 shadow-xl relative overflow-hidden group ${
                        isEven ? "lg:text-left" : "lg:text-left"
                      }`}
                    >
                      {/* Ambient corner glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-bl-full pointer-events-none" />

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
                          Phase {step.step}
                        </span>
                        <span className="w-8 h-[1px] bg-[var(--accent)]/40" />
                        <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-mono">
                          {step.title}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-serif font-light text-[var(--text-primary)] group-hover:text-gold-gradient transition-colors mb-2">
                        {step.title}
                      </h3>

                      <p className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] mb-4">
                        {step.subtitle}
                      </p>

                      <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Deliverables pill box */}
                      <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">
                          Key Milestones:
                        </span>
                        {step.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
                          >
                            <div className="w-4 h-4 rounded-full bg-[var(--accent)]/15 flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 text-[var(--accent)]" />
                            </div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Node Badge on desktop */}
                  <div className="hidden lg:flex w-16 h-16 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent)] items-center justify-center shrink-0 shadow-lg shadow-[var(--accent-glow)] z-10">
                    <span className="font-mono text-sm font-bold text-[var(--accent)]">
                      {step.step}
                    </span>
                  </div>

                  {/* Empty Spacer on desktop to balance timeline */}
                  <div className="hidden lg:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process CTA footer */}
        <div className="mt-16 sm:mt-24 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-xl">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[var(--accent)]" />
              <span className="text-sm text-[var(--text-primary)] font-medium">
                Have an event date or concept already in mind?
              </span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection("#contact")}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start Phase 01: Discover
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
