"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar, Sparkles } from "lucide-react";
import { FEATURED_EVENTS } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventModal } from "@/components/ui/EventModal";
import { FeaturedEvent } from "@/types";
import { scrollToSection } from "@/lib/utils";

export function FeaturedEvents() {
  const [selectedEvent, setSelectedEvent] = useState<FeaturedEvent | null>(null);

  const handleInquire = () => {
    setSelectedEvent(null);
    scrollToSection("#contact");
  };

  const primaryEvent = FEATURED_EVENTS[0];
  const secondaryEvents = FEATURED_EVENTS.slice(1);

  return (
    <section id="events" className="py-24 sm:py-32 relative bg-transparent">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.06] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Selected Experiences"
            title="Signature Productions Around the Globe"
            subtitle="An editorial showcase of high-stakes galas, immersive concert stages, and private celebrations executed with uncompromising artistry."
            className="mb-0 max-w-2xl"
          />

          <div className="mt-6 md:mt-0 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>Click any experience to read case study</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Showcase */}
        <div className="space-y-8 sm:space-y-12">
          {/* Primary Massive Featured Card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedEvent(primaryEvent)}
            className="group relative cursor-pointer rounded-3xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-2xl hover:border-[var(--border-accent)] transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] sm:min-h-[540px]">
              {/* Image side (7 cols) */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] overflow-hidden">
                <Image
                  src={primaryEvent.image}
                  alt={primaryEvent.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-[var(--accent)] text-black font-semibold shadow-md">
                    Featured Masterpiece
                  </span>
                </div>
              </div>

              {/* Text Side (5 cols) */}
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-[var(--accent)] font-mono uppercase tracking-wider">
                    <span>{primaryEvent.category}</span>
                    <span>•</span>
                    <span className="text-[var(--text-muted)]">{primaryEvent.year}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[var(--text-primary)] group-hover:text-gold-gradient transition-colors leading-[1.1]">
                    {primaryEvent.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>{primaryEvent.location}</span>
                  </div>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-light pt-2">
                    {primaryEvent.description}
                  </p>
                </div>

                <div className="pt-8 flex items-center justify-between border-t border-[var(--border-subtle)]">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] inline-flex items-center gap-2">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>

                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    {primaryEvent.attendees}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Asymmetrical Grid (2 Columns, differing heights) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedEvent(event)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-xl hover:border-[var(--border-accent)] transition-all duration-500 flex flex-col"
              >
                {/* Image container */}
                <div className="relative w-full h-64 sm:h-80 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-black/60 backdrop-blur-md text-[var(--accent)] border border-white/10">
                      {event.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{event.year}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-light text-[var(--text-primary)] group-hover:text-gold-gradient transition-colors mb-3">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest font-semibold text-[var(--accent)] inline-flex items-center gap-1.5">
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                    <Sparkles className="w-4 h-4 text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onInquire={handleInquire}
      />
    </section>
  );
}
