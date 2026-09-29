"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TESTIMONIALS_DATA.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TESTIMONIALS_DATA.length - 1 ? 0 : prevIndex + 1
    );
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[var(--accent)] opacity-[0.05] blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Client Endorsements"
          title="What Visionaries Say About Working With Noir"
          subtitle="From Fortune 500 chief executives to private families, our clients trust us with their most momentous occasions."
          align="center"
          className="text-center"
        />

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto mt-12 sm:mt-16">
          {/* Large Quote Mark Backing */}
          <div className="absolute -top-10 left-6 text-[var(--accent)]/15 pointer-events-none select-none">
            <Quote className="w-24 h-24 sm:w-32 sm:h-32" />
          </div>

          <div className="relative rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-8 sm:p-14 shadow-2xl overflow-hidden min-h-[340px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* 5-star rating */}
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]"
                    />
                  ))}
                  <span className="ml-2 text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
                    5.0 Verifiable Client Review
                  </span>
                </div>

                {/* Quote Body */}
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-[var(--text-primary)] leading-snug">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--accent)]/50 shrink-0">
                      <Image
                        src={current.avatar}
                        alt={current.author}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-base text-[var(--text-primary)]">
                        {current.author}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {current.role} • <span className="text-[var(--accent)]">{current.company}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] sm:text-right">
                    <span>Occasion: </span>
                    <span className="text-[var(--text-primary)] font-medium block sm:inline">
                      {current.event}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-[var(--border-subtle)]">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS_DATA.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(idx)}
                    type="button"
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? "w-8 bg-[var(--accent)]"
                        : "w-2 bg-[var(--border-subtle)] hover:bg-[var(--accent)]/50"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  type="button"
                  className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  type="button"
                  className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent)] flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
