"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SITE_CONFIG, INQUIRY_OPTIONS } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budgetRange: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  message?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventType: INQUIRY_OPTIONS.eventTypes[0],
    eventDate: "",
    guestCount: INQUIRY_OPTIONS.guestCounts[1],
    budgetRange: INQUIRY_OPTIONS.budgetRanges[1],
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone or WhatsApp contact is required";
    }

    if (!formData.message.trim() || formData.message.length < 15) {
      newErrors.message = "Please share at least a sentence or two about your vision (min 15 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit inquiry");
      }

      setIsSubmitted(true);
      setIsSubmitting(false);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f59e0b", "#fbbf24", "#d4af37", "#ffffff"],
        });
      } catch {
        // Safe fallback if canvas is unavailable
      }
    } catch (err: unknown) {
      setIsSubmitting(false);
      const message = err instanceof Error ? err.message : "An unexpected error occurred while transmitting your inquiry.";
      setSubmitError(message);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: INQUIRY_OPTIONS.eventTypes[0],
      eventDate: "",
      guestCount: INQUIRY_OPTIONS.guestCounts[1],
      budgetRange: INQUIRY_OPTIONS.budgetRanges[1],
      message: "",
    });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-transparent overflow-hidden">
      {/* Background glow */}
      <div className="absolute -bottom-24 left-1/4 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.05] blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Atelier Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <SectionHeading
              eyebrow="Initiate A Collaboration"
              title="Tell Us What You Are Envisioning"
              subtitle="Whether you are in early ideation or have fixed dates and an established venue, our senior producers are ready to architect your experience."
              className="mb-6"
            />

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent)]/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                    Inquiries & RFPs
                  </span>
                  <div className="text-sm sm:text-base font-medium text-[var(--text-primary)] mt-0.5">
                    <a
                      href={`mailto:${SITE_CONFIG.contact.inquiryEmail}`}
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {SITE_CONFIG.contact.inquiryEmail}
                    </a>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Direct routing to our principal creative directors
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent)]/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                    Concierge Hotline
                  </span>
                  <div className="text-sm sm:text-base font-medium text-[var(--text-primary)] mt-0.5">
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Available Mon–Fri 8am–8pm GMT / EST
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--accent)]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                    Turnaround Commitment
                  </span>
                  <div className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                    Initial Dossier Within 24 Hours
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Every inquiry receives an NDAsafe preliminary review
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] shadow-2xl relative">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)] flex items-center justify-center mx-auto text-[var(--accent)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                        Inquiry Received
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-light text-[var(--text-primary)]">
                        Thank You, {formData.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] font-light max-w-md mx-auto leading-relaxed">
                        Your production brief has been assigned to our senior creative director. We will review your vision and reach out via email or phone within 24 hours.
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button variant="outline" size="sm" onClick={resetForm}>
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                      <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                        Event Project Brief
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono">
                        * Required fields
                      </span>
                    </div>

                    {submitError && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] mb-2"
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Lady Vivienne Montgomery"
                          className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border ${
                            errors.name ? "border-red-500 ring-1 ring-red-500" : "border-[var(--border-subtle)]"
                          } text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all`}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="v.montgomery@luxuryltd.com"
                          className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border ${
                            errors.email ? "border-red-500 ring-1 ring-red-500" : "border-[var(--border-subtle)]"
                          } text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone & Event Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] mb-2"
                        >
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 019-2834"
                          className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border ${
                            errors.phone ? "border-red-500 ring-1 ring-red-500" : "border-[var(--border-subtle)]"
                          } text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all`}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="eventType"
                          className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] mb-2"
                        >
                          Event Classification
                        </label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all"
                        >
                          {INQUIRY_OPTIONS.eventTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Event Date, Guest Count & Budget Range */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label
                          htmlFor="eventDate"
                          className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] mb-2"
                        >
                          Target Date / Season
                        </label>
                        <input
                          type="text"
                          id="eventDate"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          placeholder="e.g. October 2025"
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="guestCount"
                          className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] mb-2"
                        >
                          Anticipated Guests
                        </label>
                        <select
                          id="guestCount"
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all"
                        >
                          {INQUIRY_OPTIONS.guestCounts.map((count) => (
                            <option key={count} value={count}>
                              {count}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="budgetRange"
                          className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] mb-2"
                        >
                          Budget Scope
                        </label>
                        <select
                          id="budgetRange"
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-all"
                        >
                          {INQUIRY_OPTIONS.budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)] mb-2"
                      >
                        Tell Us About Your Vision & Goals *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your desired location, sensory atmosphere, VIP requirements, entertainment wishes, or key objectives..."
                        className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border ${
                          errors.message ? "border-red-500 ring-1 ring-red-500" : "border-[var(--border-subtle)]"
                        } text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all resize-y`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                        icon={
                          isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )
                        }
                      >
                        {isSubmitting ? "Transmitting Brief..." : "Submit Project Inquiry"}
                      </Button>

                      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)] font-mono">
                        <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                        <span>All submissions are protected under mutual non-disclosure (NDA)</span>
                      </div>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
