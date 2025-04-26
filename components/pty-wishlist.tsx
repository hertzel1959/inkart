"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <Image
        src="/empty-wishlist.svg"
        alt="No wishlist items"
        width={220}
        height={220}
        priority
        className="opacity-80 mb-6 animate-pulse"
      />
      <h2 className="text-2xl font-bold text-gray-700">Your wishlist is feeling lonely...</h2>
      <p className="text-gray-500 mt-3 text-sm">
        You haven't added anything yet. Explore our gallery and find your favorites ✨
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          Explore Gallery
        </Link>
      </Button>
    </div>
  );
}
