"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useIsMounted } from "@/lib/useIsMounted";

// Dynamic import with SSR disabled to prevent server-side Canvas rendering issues
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden select-none pointer-events-none">
      {/* Outer ambient glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[var(--accent)] opacity-20 blur-[100px] animate-pulse" />
      
      {/* Aesthetic orbital rings in CSS */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-[var(--accent)]/30 animate-[spin_25s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-dashed border-[var(--accent)]/40 animate-[spin_35s_linear_infinite_reverse]" />
        <div className="absolute inset-12 rounded-full border border-[var(--accent)]/20 animate-[spin_45s_linear_infinite]" />
        
        {/* Core sphere */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[var(--accent-dark)] via-[var(--accent)] to-[var(--accent-light)] shadow-[0_0_50px_rgba(212,175,55,0.4)] opacity-90" />
      </div>
    </div>
  );
}

export function HeroSceneWrapper() {
  const mounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();

  if (!mounted) {
    return <HeroFallback />;
  }

  // If user requests reduced motion, show peaceful elegant fallback instead of 60fps 3D canvas
  if (prefersReducedMotion) {
    return <HeroFallback />;
  }

  return (
    <div className="w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[580px] relative">
      <HeroScene />
    </div>
  );
}
