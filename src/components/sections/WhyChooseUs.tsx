"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, ShieldCheck, Cpu, Sparkles } from "lucide-react";
import { PRINCIPLES_DATA } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyChooseUs() {
  const getIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-[var(--accent)]" };
    switch (iconName) {
      case "Compass":
        return <Compass {...props} />;
      case "ShieldCheck":
        return <ShieldCheck {...props} />;
      case "Cpu":
        return <Cpu {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.05] blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The Noir Philosophy"
              title="From the first idea to the final applause, we handle every detail."
              className="mb-6"
            />
            <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed">
              We do not produce generic gatherings. We engineer bespoke realities where spatial scenography, culinary theatre, and technical precision converge to create lasting cultural impact.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRINCIPLES_DATA.map((principle, index) => (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 sm:p-8 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-xl hover:shadow-[var(--accent-glow)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
                      [{principle.number}]
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:scale-105 group-hover:border-[var(--accent)] transition-all">
                      {getIcon(principle.iconName)}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-light text-[var(--text-primary)] group-hover:text-gold-gradient transition-colors mb-3">
                    {principle.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>Uncompromised Standard</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
