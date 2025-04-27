"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    setAtBottom(scrollTop + clientHeight >= scrollHeight - 10); // margen de 10px
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/cart", label: "Cart" },
    { href: "/bio", label: "Biography" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const node = menuRef.current;
    if (!node) return;

    const checkIfAtBottom = () => {
      const isAtBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 5;
      setAtBottom(isAtBottom);
    };

    node.addEventListener("scroll", checkIfAtBottom);
    checkIfAtBottom();

    return () => {
      node.removeEventListener("scroll", checkIfAtBottom);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <nav className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl font-bold">
          Mabel&apos;s <span className="block md:inline">InkArt</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium items-center">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <Link href="/gallery" className="hover:text-gray-600">Gallery</Link>
          <Link href="/wishlist" className="flex items-center gap-1 hover:text-gray-600">
            <Heart size={18} /> Wishlist
          </Link>
          <Link href="/cart" className="flex items-center gap-1 hover:text-gray-600">
            <ShoppingCart size={18} /> Cart
          </Link>
          <Link href="/bio" className="hover:text-gray-600">Biography</Link>
          <Link href="/contact" className="hover:text-gray-600">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed top-16 left-0 w-full h-[calc(100vh-30rem)] bg-white z-50 shadow-md flex flex-col">
            {/* Scrollable content */}
            <motion.div
              ref={menuRef}
              onScroll={handleScroll}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex-1 overflow-y-auto p-6 flex flex-col items-center gap-6"
            >
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={toggleMenu}>
                  {item.label}
                </Link>
              ))}
            </motion.div>

            {/* Static Scroll Indicator */}
            {menuItems.length > 3 && (
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="p-2 text-center text-gray-400 text-sm bg-white"
              >
                {atBottom ? "↑ Back to top" : "↓ Scroll for more"}
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
