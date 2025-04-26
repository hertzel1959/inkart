"use client"

import { getWishlist, removeFromWishlist } from "@/lib/wishlist"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function WishlistPage() {
  const router = useRouter()
  const [wishlist, setWishlist] = useState(getWishlist())

  useEffect(() => {
    const stored = getWishlist()
    setWishlist(stored)
  }, [])

  const handleRemove = (id: number) => {
    removeFromWishlist(id)
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h2 className="text-2xl font-serif mb-4">Your wishlist is empty</h2>
        <Button onClick={() => router.push("/")}>Go back to gallery</Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif mb-6 text-center">My Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="relative bg-white p-2 rounded-lg shadow hover:shadow-lg transition-all flex flex-col items-center"
          >
            <div className="relative w-full h-40 mb-4">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain rounded-md"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <h3 className="text-sm font-semibold text-center">{item.title}</h3>
            <Button
              variant="destructive"
              size="sm"
              className="mt-2"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button onClick={() => router.push("/")}>← Back to Gallery</Button>
      </div>
    </div>
  )
}
