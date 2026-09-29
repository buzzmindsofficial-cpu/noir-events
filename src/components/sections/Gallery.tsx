"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, MapPin } from "lucide-react";
import { GALLERY_ITEMS } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryItem } from "@/types";

const CATEGORIES = ["All", "Corporate", "Weddings", "Concerts", "Activations"] as const;

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 sm:py-32 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Visual Archives"
            title="The Atmospheres We Build"
            subtitle="Glimpses into our ephemeral spaces, spatial lighting rigs, floral architectures, and the electric energy of crowds."
            className="mb-0"
          />

          {/* Category Filter Pills */}
          <div className="mt-8 md:mt-0 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[var(--accent)] text-black font-semibold shadow-md shadow-[var(--accent-glow)]"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Irregular Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[240px]"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              // Create dynamic spans for masonry aesthetic
              const spanClass =
                item.aspectRatio === "wide"
                  ? "sm:col-span-2 row-span-1"
                  : item.aspectRatio === "tall"
                  ? "sm:col-span-1 row-span-2"
                  : "col-span-1 row-span-1";

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setActiveImage(item)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-[var(--border-subtle)] bg-[var(--bg-secondary)] shadow-lg hover:border-[var(--border-accent)] transition-all duration-500 ${spanClass}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md text-[var(--accent)] border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom details on hover */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between text-white">
                    <div>
                      <h4 className="font-serif text-lg font-light text-white leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/75 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-[var(--accent)]" />
                        <span>{item.location}</span>
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-[80vh] rounded-2xl overflow-hidden border border-white/15 bg-black z-10 flex flex-col justify-end"
            >
              <button
                onClick={() => setActiveImage(null)}
                type="button"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>

              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />

              <div className="relative z-10 p-6 bg-gradient-to-t from-black via-black/60 to-transparent flex items-center justify-between text-white">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
                    {activeImage.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif">{activeImage.title}</h3>
                  <p className="text-xs text-white/70">{activeImage.location}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
