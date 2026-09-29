"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  color: string;
  sizePulse: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    // Mouse & Pointer tracking state
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 180, // Influence radius
      isActive: false,
    };

    // Scroll tracking state
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Window resize handler
    const handleResize = () => {
      setupCanvasSize();
      initParticles();
    };

    // Mouse & Touch events
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.isActive = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    // Scroll event handler for particle acceleration
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      scrollVelocity += deltaY * 0.08;
      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Dynamic color provider based on Theme
    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains("dark") || theme === "dark";
      if (isDark) {
        return {
          particles: [
            "#f59e0b", // Radiant Gold
            "#fbbf24", // Bright Amber
            "#d4af37", // Imperial Gold
            "#eab308", // Luminous Gold
            "#c084fc", // Subtle Purple Highlight
            "#38bdf8", // Cyber Cyan Highlight
          ],
          lineColor: "245, 158, 11", // RGB for lines
          mouseGlow: "rgba(245, 158, 11, 0.14)",
        };
      } else {
        return {
          particles: [
            "#b8860b", // Dark Goldenrod
            "#d4af37", // Gold
            "#92400e", // Warm Bronze
            "#475569", // Slate Accent
          ],
          lineColor: "184, 134, 11",
          mouseGlow: "rgba(184, 134, 11, 0.12)",
        };
      }
    };

    let themeColors = getThemeColors();

    // Particle pool setup
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      // Dynamic particle density based on screen resolution
      const density = Math.min(Math.floor((width * height) / 9500), 130);
      const minParticles = Math.max(density, 45);

      for (let i = 0; i < minParticles; i++) {
        const vx = (Math.random() - 0.5) * 0.7;
        const vy = (Math.random() - 0.5) * 0.7;
        const colorIdx = Math.floor(Math.random() * themeColors.particles.length);
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: vx,
          vy: vy,
          baseVx: vx,
          baseVy: vy,
          radius: Math.random() * 2.2 + 1.2,
          alpha: Math.random() * 0.5 + 0.3,
          targetAlpha: Math.random() * 0.5 + 0.3,
          color: themeColors.particles[colorIdx],
          sizePulse: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // Animation Loop
    const render = () => {
      themeColors = getThemeColors();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Friction dampening for scroll velocity
      scrollVelocity *= 0.93;

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      // Render interactive ambient cursor aura on canvas
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const auraGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.1
        );
        auraGradient.addColorStop(0, themeColors.mouseGlow);
        auraGradient.addColorStop(1, "transparent");
        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Size pulsing animation
        p.sizePulse += 0.02;
        const currentRadius = p.radius + Math.sin(p.sizePulse) * 0.45;

        // Apply scroll impulse (shift y based on scroll velocity and particle weight)
        p.y -= scrollVelocity * (p.radius * 0.6);

        // Distance to cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        // Pointer repulsion force
        if (distToMouse < mouse.radius && mouse.isActive) {
          const force = (1 - distToMouse / mouse.radius) * 3.5;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force;
          p.y -= Math.sin(angle) * force;
        }

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Smooth recovery to base floating velocity
        p.vx += (p.baseVx - p.vx) * 0.025;
        p.vy += (p.baseVy - p.vy) * 0.025;

        // Wrap around boundaries seamlessly
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Render Particle Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        if (p.radius > 2) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw constellation lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
          const maxConnectDist = 135;

          if (pDist < maxConnectDist) {
            const lineAlpha = (1 - pDist / maxConnectDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${themeColors.lineColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect line to mouse cursor when close
        if (distToMouse < mouse.radius && mouse.isActive) {
          const mouseLineAlpha = (1 - distToMouse / mouse.radius) * 0.32;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${themeColors.lineColor}, ${mouseLineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
