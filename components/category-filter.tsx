'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'nature', label: 'Nature' },
  { id: 'animals', label: 'Animals' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'humans', label: 'Humans' },
  { id: 'geometric', label: 'Geometric' },
]

export default function CategoryFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Tomamos la categoría actual desde los parámetros o usamos "all"
  const initialCategory = searchParams.get("category") || "all"
  const [currentCategory, setCurrentCategory] = useState(initialCategory)

  // Escuchar cambios en los searchParams (cuando se navega con el botón atrás/adelante)
  useEffect(() => {
    const param = searchParams.get("category") || "all"
    setCurrentCategory(param)
  }, [searchParams])

  const handleCategoryChange = (id: string) => {
    startTransition(() => {
      const newParams = new URLSearchParams(searchParams.toString())

      if (id === 'all') {
        newParams.delete('category')
      } else {
        newParams.set('category', id)
      }

      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false })
      setCurrentCategory(id)
    })
  }

  return (
    <div className="flex justify-start mb-12 overflow-x-auto py-2 no-scrollbar">
      <div className="flex gap-2 px-2">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
              currentCategory === category.id
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => handleCategoryChange(category.id)}
            disabled={isPending}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentCategory === category.id && (
              <motion.span
                className="absolute inset-0 bg-black rounded-full -z-10"
                layoutId="categoryBackground"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="tracking-wide">{category.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
