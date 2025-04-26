"use client";

import { useState, useEffect } from "react";
import { getWishlist, removeFromWishlist } from "@/lib/wishlist";
import type { WishlistItem } from "@/lib/wishlist"; // 👈 Asegúrate de ponerlo así
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";



export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>(getWishlist());

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleRemove = (id: number) => {
    removeFromWishlist(id);
    setWishlist(getWishlist());
    toast.info("Artwork removed from Wishlist 🗑️");
  };



  if (wishlist.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <Image
          src="/empty-wishlist.svg"
          alt="Empty wishlist"
          width={200}
          height={200}
          priority
          className="opacity-70 mb-6"
        />
        <h2 className="text-2xl font-semibold mb-2">Your Wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Start adding your favorite artworks ✨</p>
        <Button asChild>
          <Link href="/gallery">← Back to Gallery</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif text-center mb-10">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center p-4"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-contain rounded-md"
              />
            </div>
            <h3 className="text-lg font-semibold text-center">{item.title}</h3>
            <Button
              variant="destructive"
              size="sm"
              className="mt-3"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button asChild>
          <Link href="/gallery">← Back to Gallery</Link>
        </Button>
      </div>
    </div>
  );
}
