"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import { getWishlist } from "@/lib/wishlist"; // 👈 Importa tu función que ya existe
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/wishlist", label: "Wishlist", icon: <Heart size={16} /> },
    { href: "/cart", label: "Cart", icon: <ShoppingCart size={16} /> },
    { href: "/bio", label: "Biography" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detecta cambios en Wishlist
  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = getWishlist();
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount(); // Corre al cargar

    // También actualiza al cambiar localStorage
    window.addEventListener("wishlist-updated", updateWishlistCount);
    

   // return () => window.removeEventListener("storage", updateWishlistCount);
    return () => window.removeEventListener("wishlist-updated", updateWishlistCount);

  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-white/70 backdrop-blur-md py-4"
      }`}>
        <nav className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-serif font-bold">Mabel's InkArt</div>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-sm font-medium ${
                    pathname === link.href ? "text-black font-bold" : "text-gray-600 hover:text-black"
                  } transition-colors`}
                >
                  {link.icon}
                  {link.label}
                       {/* Agregamos el contador al lado del Wishlist */}
                       {link.href === "/wishlist" && wishlistCount > 0 && (
                        <motion.span
                        key={wishlistCount} // 👈 Importante para reiniciar animación
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.3 }}
                        className="ml-1 text-xs bg-red-500 text-white rounded-full px-2 py-0.5"
                      >
                        {wishlistCount}
                      </motion.span>
                      
                        

                     )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-black focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center gap-4 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-base font-medium ${
                    pathname === link.href ? "text-black font-bold" : "text-gray-600 hover:text-black"
                  } transition-colors`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                  {link.href === "/wishlist" && wishlistCount > 0 && (
                    <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
