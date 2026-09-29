"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Users, Sparkles, ArrowRight } from "lucide-react";
import { FeaturedEvent } from "@/types";
import { Button } from "./Button";
import { scrollToSection } from "@/lib/utils";

interface EventModalProps {
  event: FeaturedEvent | null;
  onClose: () => void;
  onInquire?: (event: FeaturedEvent) => void;
}

export function EventModal({ event, onClose, onInquire }: EventModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (event) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const handleInquireClick = () => {
    onClose();
    if (onInquire) {
      onInquire(event);
    } else {
      scrollToSection("#contact");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl z-10 text-[var(--text-primary)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image */}
          <div className="relative w-full h-72 sm:h-96 overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-[var(--accent)] text-black font-semibold mb-3">
                {event.category}
              </span>
              <h3 id="modal-title" className="text-2xl sm:text-4xl font-serif font-light text-white">
                {event.title}
              </h3>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Meta details bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-3 border-y border-[var(--border-subtle)] text-sm">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Production Year {event.year}</span>
              </div>
              {event.attendees && (
                <div className="flex items-center gap-2 text-[var(--text-secondary)] col-span-2 sm:col-span-1">
                  <Users className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span>{event.attendees}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold font-mono">
                Project Narrative & Experience
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                {event.extendedDescription || event.description}
              </p>
            </div>

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold font-mono mb-3">
                  Production Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {event.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-sm"
                    >
                      <Sparkles className="w-4 h-4 text-[var(--accent)] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-muted)]">
                Ready to engineer a world-class production of this caliber?
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleInquireClick}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Plan Similar Event
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
