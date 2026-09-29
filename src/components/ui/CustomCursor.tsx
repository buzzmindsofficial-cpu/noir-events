"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice = !window.matchMedia("(pointer: fine)").matches;
    if (isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest("textarea") ||
          target.getAttribute("role") === "button" ||
          window.getComputedStyle(target).cursor === "pointer";
        setIsPointer(!!isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  if (!isVisible || prefersReducedMotion) return null;

  return (
    <>
      {/* Outer ambient glow following mouse */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full blur-[24px] opacity-25"
        style={{
          width: isPointer ? 120 : 80,
          height: isPointer ? 120 : 80,
          backgroundColor: "var(--accent)",
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.1 }}
      />
      {/* Crisp small ring */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full border border-[var(--accent)]"
        style={{
          width: isPointer ? 32 : 14,
          height: isPointer ? 32 : 14,
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          backgroundColor: isPointer ? "var(--accent-glow)" : "transparent",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.1 }}
      />
    </>
  );
}
