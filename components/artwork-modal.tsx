"use client";

import Image from "next/image";
import { X, Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Artwork } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

interface Props {
  artwork: Artwork;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: Props) {
  const { addItem } = useCart();

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };
const handleAddToCart = () => {
    addItem({
      id: artwork.id,
      title: artwork.title,
      // convierte el precio a número si lo guardas como string
      price: parseFloat(artwork.price.replace(/[^0-9.]/g, "")),
      image: artwork.image,
    });
    toast.success("Added to cart 🛒");
    onClose();          // cierra el modal después de añadir
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          className="relative bg-[#fef6e4] max-w-3xl w-full mx-auto rounded-lg overflow-y-auto max-h-[90vh] p-[20px]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-800"
          >
            <X size={20} />
          </button>

          {/* Wishlist botón */}
         <button
            onClick={toggleWishlist}
            className={`absolute top-4 left-4 p-2 rounded-full z-10 transition-colors ${
              isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            title="Add to wishlist"
          >
            <Heart fill={isWishlisted ? "currentColor" : "none"} size={20} />
          </button>


          {/* Imagen + Texto */}
          <div className="flex flex-col items-center gap-6">
            <Image
              src={artwork.image}
              alt={artwork.title}
              width={500}
              height={666}
              priority
              className="object-contain rounded-lg shadow-2xl border border-gray-300"
            />

            <div className="text-center text-gray-800 font-serif px-6 pb-6">
              <h2 className="text-2xl font-semibold mb-2">{artwork.title}</h2>
              <p className="mb-4 text-sm leading-relaxed">{artwork.description}</p>
              <hr className="my-4" />
              <p className="text-sm">
                <strong>Medium:</strong> {artwork.medium}
              </p>
              <p className="text-sm">
                <strong>Size:</strong> {artwork.size}
              </p>
              <p className="text-sm">
                <strong>Price:</strong> {artwork.price}
              </p>
              <p
                className={`text-sm font-medium ${
                  artwork.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {artwork.available ? "Available" : "Sold"}
              </p>
            </div>
          </div>
           {/* Botón agregar al carrito */}
           <button
            onClick={handleAddToCart}
            className="mt-6 flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-md mx-auto"
          >
            <ShoppingCart size={18} />
            Add to cart
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
