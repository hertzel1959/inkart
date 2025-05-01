"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ IMPORTAR el router
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, ZoomIn } from "lucide-react";
import ArtworkModal from "./artwork-modal";
import { Button } from "@/components/ui/button";
import { addToWishlist, removeFromWishlist, getWishlist } from "@/lib/wishlist";
import { toast } from "sonner"; // O react-hot-toast
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";


interface Artwork {
  id: number;
  title: string;
  description: string;
  medium: string;
  size: string;
  price: string;
  available: boolean;
  category: string;
  image: string;
}
interface ArtworkCardProps {
  artwork: Artwork;
  onSelect?: () => void;
}

export default function ArtworkCard({ artwork, onSelect }: ArtworkCardProps) {

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter(); // ✅ AQUÍ, solo una vez
  const { addItem } = useCart();
  const handleAddToWishlist = () => {
    addToWishlist({
      id: artwork.id,
      title: artwork.title,
      image: artwork.image,
    });
    setIsWishlisted(true);
    toast.success("Added to Wishlist! ❤️");
  };
  useEffect(() => {
    const wishlist = getWishlist();
    setIsWishlisted(wishlist.some(item => item.id === artwork.id));
  }, [artwork.id]);

  return (
    <>
      <motion.div
        className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
      >
        <div className="relative aspect-square overflow-hidden bg-white p-4">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              fill
              priority
              className="object-contain transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          <AnimatePresence>
  {isHovered && (
    <motion.div
      className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Botón abrir modal */}
      <motion.button
        className="bg-white text-black p-3 rounded-full shadow-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
        onClick={() => setIsModalOpen(true)}
      >
        <ZoomIn size={18} />
      </motion.button>

      {/* Botón wishlist */}
      <motion.button
  className={`p-3 rounded-full ${isWishlisted ? "bg-red-500 text-white" : "bg-white text-black"} shadow-md`}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{
    opacity: 1,
    scale: isWishlisted ? [1, 1.3, 1] : 1, // 🔥 Latido: agranda y vuelve
    rotate: isWishlisted ? [0, -10, 10, -5, 5, 0] : 0, // 🔥 Mini temblor de emoción
  }}
  exit={{ opacity: 0, scale: 0.8 }}
  transition={{
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
    delay: 0.2,
  }}
  onClick={handleAddToWishlist}

>
  <Heart size={18} />
</motion.button>

      {/* Botón carrito */}
      {artwork.available && (
        <motion.button
        onClick={() =>
          addItem({
            id: artwork.id,
            title: artwork.title,
            price: parseFloat(artwork.price.replace(/[^0-9.]/g, "")),
            image: artwork.image,
          })
        }
        
        className="bg-black text-white p-3 rounded-full shadow-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}        >
        <ShoppingCart size={18} />
        </motion.button>
      )}
    </motion.div>
  )}
</AnimatePresence>

        </div>

        <div className="p-4">
          <h3 className="font-serif text-lg">{artwork.title}</h3>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">{artwork.price}</p>
            <Badge variant={artwork.available ? "outline" : "secondary"} className="text-xs">
              {artwork.available ? "Available" : "Sold"}
            </Badge>
          </div>
        </div>
      </motion.div>

      {isModalOpen && (
        <ArtworkModal artwork={artwork} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
