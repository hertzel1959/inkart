// src/components/art-gallery.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtworkCard from "./artwork-card";
import ArtworkModal from "./artwork-modal";
import { artworks } from "@/lib/data";
import type { Artwork } from "@/lib/types";

export default function ArtGallery({
  category,
}: {
  category: string;
}) {
  const [filtered, setFiltered] = useState<Artwork[]>([]);

  useEffect(() => {
    if (category === "All") {
      setFiltered(artworks);
    } else {
      setFiltered(
        artworks.filter((a) => a.category.toLowerCase() === category.toLowerCase())
      );
    }
  }, [category]);

  const [selected, setSelected] = useState<Artwork | null>(null);

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((art, i) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              layout
            >

              <ArtworkCard artwork={art} onSelect={() => setSelected(art)} />

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {selected && (
        <ArtworkModal artwork={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
