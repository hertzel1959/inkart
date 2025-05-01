"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

/* ----- Tipos ----- */
export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export interface CartContextType {
  cart: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  clearCart: () => void
  total: number                // ✅ ¡aquí!
}

/* ----- Contexto ----- */
const CartContext = createContext<CartContextType | undefined>(undefined)

/* ----- Provider ----- */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  /* Recuperar del localStorage al montar */
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCart(JSON.parse(stored))
  }, [])

  /* Guardar en localStorage cuando cambie el carrito */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  /* ---------- Acciones ---------- */
  const addItem = (item: Omit<CartItem, "quantity">) => {
    setCart(prev => {
      if (prev.some(i => i.id === item.id)) {
        toast.info("This artwork is already in your cart")
        return prev
      }
      toast.success("Added to cart 🛒")
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const clearCart = () => setCart([])

  /* ---------- Total ---------- */
  const total = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  )

  /* ---------- Value ---------- */
  const value: CartContextType = {
    cart,
    addItem,
    removeItem,
    clearCart,
    total,                 // ✅ ¡ahora sí lo enviamos!
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

/* Hook práctico */
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>")
  return ctx
}
