"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { artworks } from "@/lib/data"
import ArtworkCard from "@/components/artwork-card"
import ArtworkModal from "@/components/artwork-modal"

export default function ArtGallery() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [filteredArtworks, setFilteredArtworks] = useState(artworks)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  useEffect(() => {
    if (!categoryParam || categoryParam === "all") {
      setFilteredArtworks(artworks)
    } else {
      setFilteredArtworks(
        artworks.filter((artwork) => artwork.category.toLowerCase() === categoryParam.toLowerCase())
      )
    }
  }, [categoryParam])

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              layout
            >
             <ArtworkCard artwork={artwork} />

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal centralizado */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </>
  )
}
