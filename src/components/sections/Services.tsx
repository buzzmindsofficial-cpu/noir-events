"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Briefcase,
  Heart,
  Music,
  Sparkles,
  GlassWater,
  Users,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { SERVICES_DATA } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scrollToSection } from "@/lib/utils";

export function Services() {
  const getServiceIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[var(--accent)]" };
    switch (iconName) {
      case "Briefcase":
        return <Briefcase {...props} />;
      case "Heart":
        return <Heart {...props} />;
      case "Music":
        return <Music {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "GlassWater":
        return <GlassWater {...props} />;
      case "Users":
        return <Users {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  const handleInquireForService = () => {
    scrollToSection("#contact");
  };

  return (
    <section id="services" className="py-24 sm:py-32 relative bg-transparent">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--accent)] opacity-5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Disciplines & Capabilities"
          title="Bespoke Event Management & Creative Production"
          subtitle="Every project we undertake is custom-conceived from first principles. We merge architectural spatial staging, cinematic lighting, and white-glove hospitality."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-[var(--border-accent)] hover:shadow-2xl hover:shadow-[var(--accent-glow)] hover:-translate-y-1.5"
            >
              {/* Background ambient image reveal on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-black/40 to-black/20" />
              </div>

              <div className="relative z-10">
                {/* Header row: Number and Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs tracking-widest text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                    [{service.number}]
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-subtle)]">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl sm:text-2xl font-serif font-light text-[var(--text-primary)] group-hover:text-gold-gradient transition-colors mb-2">
                  {service.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-mono font-medium mb-4">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                {/* Features / Deliverables pill list */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action trigger row */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between relative z-10">
                <button
                  type="button"
                  onClick={handleInquireForService}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[var(--accent)]" />
                </button>

                <span className="w-2 h-2 rounded-full bg-[var(--border-subtle)] group-hover:bg-[var(--accent)] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
