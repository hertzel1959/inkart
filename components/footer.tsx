"use client";

import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-10">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        {/* Copyright */}
        <div className="text-gray-600">
          © {currentYear} Mabel&apos;s InkArt. All rights reserved.
        </div>

        {/* Links */}
        <div className="flex gap-6 text-gray-600">
          <Link href="/contact" className="hover:text-black transition-colors">
            <Mail size={18} />
          </Link>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            <Facebook size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
