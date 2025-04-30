
import { Suspense } from "react";
import ArtGallery from "@/components/art-gallery";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryFilter from "@/components/category-filter";

 export const metadata = {
   title: "Mabel's InkArt - Gallery",
   description: "Browse the full gallery of Mabel's handcrafted pen and ink masterpieces, celebrating nature and fantasy.",
   openGraph: {
     title: "Mabel's InkArt - Gallery",
     description: "Immerse yourself in Mabel's artistic universe through her detailed ink drawings.",
     url: "https://www.icresil.com/gallery",
     siteName: "Mabel's InkArt",
     images: [
       {
         url: "https://www.icresil.com/gallery-og.png",
         width: 1200,
         height: 630,
         alt: "Gallery of Mabel's InkArt",
       },
     ],
     locale: "en_US",
     type: "website",
   },
   robots: {
     index: true,
     follow: true,
   },
 };



export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-8">
          Gallery
        </h1>

        {/* El filtro de categorías si quieres, aquí */}
        <CategoryFilter />

        {/* Suspense obligatorio para ArtGallery */}
        <Suspense fallback={<GallerySkeleton />}>
          <ArtGallery />
        </Suspense>
      </div>
    </main>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-10 w-full mt-2" />
        </div>
      ))}
    </div>
  );
}
