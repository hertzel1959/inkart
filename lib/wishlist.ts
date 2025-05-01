// lib/wishlist.ts  ✅ tu versión, sin cambios
export interface WishlistItem {
  id: number;
  title: string;
  image: string;
}

const KEY = "wishlist";

export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToWishlist(item: WishlistItem) {
  if (typeof window === "undefined") return;
  const list = getWishlist();
  if (!list.some((i) => i.id === item.id)) {
    localStorage.setItem(KEY, JSON.stringify([...list, item]));
    window.dispatchEvent(new Event("wishlist-updated"));
  }
}

export function removeFromWishlist(id: number) {
  if (typeof window === "undefined") return;
  const next = getWishlist().filter((i) => i.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("wishlist-updated"));
}

export function clearWishlist() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("wishlist-updated"));
}
