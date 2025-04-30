"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

type Category = "All" | "Architecture" | "Nature" | "Animals" | "Fantasy" | "Humans" | "Geometric"

interface ArtFilterProps {
  onFilterChange: (category: Category) => void
}

export default function ArtFilter({ onFilterChange }: ArtFilterProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const isMobile = useIsMobile()

  const categories: Category[] = [
    "All", "Architecture", "Nature", "Animals", "Fantasy", "Humans", "Geometric"
  ]

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category)
    onFilterChange(category)
  }

  return (
    <div className="w-full px-4 mb-12">
      {isMobile ? (
        <select
          className="w-full rounded-md border border-zinc-300 p-2 text-sm"
          value={activeCategory}
          onChange={(e) => handleCategoryClick(e.target.value as Category)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      ) : (
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`rounded-full text-sm px-4 py-2 transition-colors ${
                activeCategory === category
                  ? "bg-zinc-800 hover:bg-zinc-900 text-white"
                  : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
