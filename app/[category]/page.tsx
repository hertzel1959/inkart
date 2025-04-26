"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/baby drags.png" // <-- recuerda poner tu imagen en /public
        alt="Artistic Vision"
        fill
        className="object-cover brightness-75"
        priority
      />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
          Artistic Vision
        </h1>
        <p className="text-white text-lg md:text-2xl mb-8 animate-fadeIn delay-150">
          Exploring the boundaries of contemporary art through unique perspectives
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn delay-300">
          <Button asChild size="lg">
            <Link href="/gallery">View Gallery</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/wishlist">View Wishlist</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
