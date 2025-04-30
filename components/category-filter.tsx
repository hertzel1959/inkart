// src/components/category-filter.tsx
"use client";

import { useRouter } from "next/navigation";

export default function CategoryFilter({
  selected,
}: {
  selected: string;
}) {
  const router = useRouter();
  const cats = ["All", "Architecture", "Nature", "Animals", "Fantasy", "Humans", "Geometric"];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {cats.map((cat) => (
        <button
          key={cat}
          onClick={() => router.push(`/gallery?category=${cat}`)}
          className={`rounded-full px-4 py-2 border ${
            selected === cat
              ? "bg-zinc-800 text-white"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
