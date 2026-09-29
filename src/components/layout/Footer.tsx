"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Sparkles, Mail, Phone, MapPin, Video } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS, SERVICES_DATA } from "@/config/site";
import { scrollToSection } from "@/lib/utils";

// Custom Brand SVGs
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterXIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l16 16m0-16L4 20" />
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Instagram":
        return <InstagramIcon className="w-4 h-4" />;
      case "Linkedin":
        return <LinkedInIcon className="w-4 h-4" />;
      case "Twitter":
        return <TwitterXIcon className="w-4 h-4" />;
      case "Video":
        return <Video className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative bg-transparent border-t border-[var(--border-subtle)] text-[var(--text-primary)] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--accent)] opacity-5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[var(--border-subtle)]">
          {/* Col 1: Brand & Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[var(--accent)] flex items-center justify-center bg-[var(--bg-primary)]">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <span className="font-serif tracking-[0.2em] text-xl font-medium">
                {SITE_CONFIG.name}
              </span>
            </Link>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>

            <div className="space-y-2 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>
                  {SITE_CONFIG.contact.address.line1}, {SITE_CONFIG.contact.address.city}
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {SITE_CONFIG.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all hover:scale-105"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#services");
                    }}
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors block py-0.5 line-clamp-1"
                  >
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Studios / Locations (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              Ateliers
            </h4>
            <div className="space-y-3 text-xs text-[var(--text-secondary)]">
              {SITE_CONFIG.contact.locations.map((loc) => (
                <div key={loc.city} className="border-l border-[var(--accent)]/40 pl-3 py-1">
                  <div className="font-semibold text-[var(--text-primary)]">{loc.city}</div>
                  <div className="text-[var(--text-muted)]">{loc.address}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">
              Terms of Engagement
            </span>
            <Link
              href="/admin"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
            >
              <span>Admin Portal</span>
            </Link>
            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline ml-2 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
