"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Category = "All" | "Architecture" | "Nature" | "Animals" | "Fantasy" | "Humans" | "Geometric"

interface ArtFilterProps {
  onFilterChange: (category: Category) => void
}

export default function ArtFilter({ onFilterChange }: ArtFilterProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const categories: Category[] = ["All", "Architecture", "Nature", "Animals", "Fantasy", "Humans", "Geometric"]

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category)
    onFilterChange(category)
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          className={`rounded-full ${activeCategory === category ? "bg-zinc-800 hover:bg-zinc-900" : ""}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
