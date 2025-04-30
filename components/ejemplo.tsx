import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Electronics", "Clothing", "Books", "Home", "Sports", "Beauty", "Toys", "Automotive"];
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Products by Category</h1>
        
        <div className="w-full px-4">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full text-sm px-4 py-2 transition-colors ${
                  activeCategory === category
                    ? "bg-zinc-800 hover:bg-zinc-900 text-white"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xl text-gray-600">
            {activeCategory === "All" 
              ? "Viewing all products" 
              : `Viewing ${activeCategory} products`}
          </p>
        </div>
      </div>
    </div>
  );
};