import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { artworks } from "@/lib/data"
import Link from "next/link";
<Link
  href="/gallery"
  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
>
  Go to Gallery
</Link>
export function generateStaticParams() {
  return [
    { category: "all" },
    { category: "architecture" },
    { category: "nature" },
    { category: "animals" },
    { category: "fantasy" },
    { category: "humans" },
    { category: "geometric" },
  ]
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.toLowerCase()

  const validCategories = ["all", "architecture", "nature", "animals", "fantasy", "humans", "geometric"]

  if (!validCategories.includes(category)) {
    notFound()
  }

  const filteredArtworks =
    category === "all" ? artworks : artworks.filter((artwork) => artwork.category.toLowerCase() === category)

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-serif text-center my-8">Mabel's InkArt</h1>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
        {validCategories.slice(1).map((cat) => (
        <Button
          asChild
          key={cat}
          variant={category === cat ? "default" : "outline"}
          className={`rounded-full ${category === cat ? "bg-zinc-800 hover:bg-zinc-900" : ""}`}
        >
          <Link href={`/${cat}`}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        </Button>
      ))}

          {validCategories.slice(1).map((cat) => (
  <Button
    asChild
    key={cat}
    variant={category === cat ? "default" : "outline"}
    className={`rounded-full ${category === cat ? "bg-zinc-800 hover:bg-zinc-900" : ""}`}
  >
    <Link href={`/${cat}`}>
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
    </Link>
  </Button>
))}


        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-4 relative">
                <div className="border-8 border-black bg-gray-100">
                  <div className="relative aspect-square">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {artwork.id === 1 && (
                  <div className="absolute top-8 left-12 bg-white p-4 shadow-lg max-w-[250px] text-sm">
                    <p className="mb-4">{artwork.description}</p>
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium">Medium:</span> {artwork.medium}
                      </p>
                      <p>
                        <span className="font-medium">Size:</span> {artwork.size}
                      </p>
                      <p>
                        <span className="font-medium">Price:</span> {artwork.price}
                      </p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {artwork.available ? "Available" : "Sold"}
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="text-center py-2 bg-zinc-800 text-white mt-0">{artwork.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
