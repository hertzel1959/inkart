"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Mabel's InkArt - Unique Handcrafted Artworks</title>
        <meta name="description" content="Discover the beauty of handcrafted drawings and ink art by Mabel. Explore original pieces inspired by nature, geometry, and fantasy." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mabel's InkArt" />
        <meta property="og:description" content="Explore the magic of handmade art and creativity." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.icresil.com/" />
      </Head>

      <main className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/baby_drags.png"
          alt="Artistic Vision"
          fill
          className="object-cover brightness-75"
          priority
        />

        {/* Fondo negro transparente */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Contenido */}
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
      </main>
    </>
  );
}
