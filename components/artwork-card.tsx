// src/components/ArtworkCard.tsx
"use client";

import { useState, useEffect } from "react";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import ArtworkModal from "./artwork-modal";
import { useCart } from "@/context/CartContext";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  WishlistItem,
} from "@/lib/wishlist";
import type { Artwork } from "@/lib/types";

interface Props {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: Props) {
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState(false);

  /* ---------- wishlist ---------- */
  const [isWishlisted, setIsWishlisted] = useState(false);

  // sincroniza estado local con localStorage
  useEffect(() => {
    const sync = () =>
      setIsWishlisted(getWishlist().some((w) => w.id === artwork.id));
    sync();
    window.addEventListener("wishlist-updated", sync);
    return () => window.removeEventListener("wishlist-updated", sync);
  }, [artwork.id]);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(artwork.id);
      toast.info("Removed from wishlist 💔");
    } else {
      const item: WishlistItem = {
        id: artwork.id,
        title: artwork.title,
        image: artwork.image,
      };
      addToWishlist(item);
      toast.success("Added to wishlist ❤️");
    }
  };

  /* ---------- cart ---------- */
  const { cart, addItem: addCart, removeItem: removeCart } = useCart();
  const isInCart = cart.some((c) => c.id === artwork.id);

  const toggleCart = () => {
    if (isInCart) {
      //removeCart(artwork.id);
      toast.info("This Artwork is alredy in your cart cart 🛒");
    } else {
      addCart({
        id: artwork.id,
        title: artwork.title,
        price: parseFloat(artwork.price.replace(/[^\d.]/g, "")),
        image: artwork.image,
      });
      toast.success("Added to cart 🛒");
    }
  };

  /* ---------- UI ---------- */
  return (
    <>
      <motion.div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileHover={{ y: -4 }}
        className="relative rounded-lg overflow-hidden shadow"
      >
        {/* imagen */}
        <div className="relative w-full h-96">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="object-contain w-full h-full"
          />

          {/* overlay: zoom / wishlist / cart */}
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-4"
              >
                {/* Zoom */}
                <button
                  onClick={() => setModal(true)}
                  className="bg-white p-2 rounded-full shadow"
                  title="View"
                >
                  <ZoomIn size={18} />
                </button>

                {/* Wishlist */}
                <button
                  onClick={toggleWishlist}
                  className={`p-2 rounded-full shadow ${
                    isWishlisted
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-white text-black"
                  }`}
                  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={18} />
                </button>

                {/* Cart */}
                <button
                  onClick={toggleCart}
                  disabled={isInCart}                            // 👈 ← evita clics extra
                  className={`p-2 rounded-full shadow ${
                    isInCart
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-black text-white hover:bg-zinc-900"
                  }`}
                  title={isInCart ? "Remove from cart" : "Add to cart"}
                >
                  <ShoppingCart size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* pie de tarjeta */}
        <div className="p-4 text-center">
          <h3 className="font-serif text-lg">{artwork.title}</h3>
          <p className="text-sm mt-1">{artwork.price}</p>
          <span className="text-xs text-gray-600">
            {artwork.available ? "Available" : "Sold"}
          </span>
        </div>
      </motion.div>

      {/* modal */}
      {modal && (
        <ArtworkModal artwork={artwork} onClose={() => setModal(false)} />
      )}
    </>
  );
}
