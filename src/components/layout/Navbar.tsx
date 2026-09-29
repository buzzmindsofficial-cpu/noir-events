"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/config/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { scrollToSection } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(href);
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    scrollToSection("#contact");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[var(--header-glass)] backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-lg shadow-black/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
          aria-label={`${SITE_CONFIG.name} Home`}
        >
          <div className="relative w-8 h-8 rounded-full border border-[var(--accent)] flex items-center justify-center bg-[var(--bg-secondary)] overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <Sparkles className="w-4 h-4 text-[var(--accent)] transition-transform duration-700 group-hover:rotate-180" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.22em] text-lg sm:text-xl font-medium text-[var(--text-primary)]">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)] -mt-1 font-mono">
              STUDIO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/70 backdrop-blur-md"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3.5 py-1.5 text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-medium rounded-full hover:bg-[var(--accent-subtle)]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions: Theme Toggle & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="primary"
            size="sm"
            onClick={handleCtaClick}
            magnetic
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Plan Your Event
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] px-6 py-8 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] font-mono">
                Menu Directory
              </span>
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="text-2xl font-serif font-light text-[var(--text-primary)] hover:text-[var(--accent)] py-1 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--accent)] opacity-60" />
                </motion.a>
              ))}

              <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col gap-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCtaClick}
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  className="w-full"
                >
                  Plan Your Event
                </Button>
                <div className="text-xs text-[var(--text-muted)] text-center">
                  {SITE_CONFIG.contact.phone} • {SITE_CONFIG.contact.email}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
