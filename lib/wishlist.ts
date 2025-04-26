export interface WishlistItem {
    id: number;
    title: string;
    image: string;
  }
  
  export function getWishlist(): WishlistItem[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  }
  
  export function addToWishlist(item: WishlistItem): void {
    if (typeof window === "undefined") return;
    const wishlist = getWishlist();
    const exists = wishlist.some((i) => i.id === item.id);
    if (!exists) {
      wishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlist-updated")); // 👈 Agregamos esta línea
    }
  }
  
  export function removeFromWishlist(id: number): void {
    if (typeof window === "undefined") return;
    const wishlist = getWishlist().filter((i) => i.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlist-updated")); // 👈 Y aquí también
  }
  
  export function clearWishlist(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("wishlist");
  }
  