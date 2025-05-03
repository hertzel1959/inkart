/* app/cart/page.tsx */
"use client"


import CheckoutButton from "@/components/checkout-button"
import { useCart } from "@/context/CartContext"
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart, total, clearCart, removeItem } = useCart();

  /* ---------- carrito vacío ---------- */
  if (cart.length === 0) {
    return (
      <section className="container mx-auto max-w-3xl py-16 space-y-6">
        <h1 className="text-3xl font-semibold text-center">Your cart</h1>
        <p className="text-center text-gray-500">
          Your cart is empty at the moment 🛒
        </p>
      </section>
    )
  }

  /* ---------- carrito con productos ---------- */
  return (
    <section className="container mx-auto max-w-3xl py-16 space-y-8">
      <h1 className="text-3xl font-semibold">Your shopping cart 🛒</h1>

      {/* Lista de ítems */}
      <ul className="space-y-8">
        {cart.map((item) => (
          <li key={item.id} className="flex gap-4 items-start">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="font-serif text-2xl">{item.title}</h2>
              <p className="text-sm text-gray-600">
                {item.quantity} × USD&nbsp;{item.price.toFixed(2)}
              </p>
            </div>

            <Button variant="destructive" onClick={() => removeItem(item.id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>

      {/* Total + Vaciar carrito + Checkout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t pt-6">
        <span className="text-xl font-bold">
          Total:&nbsp;USD&nbsp;{total.toFixed(2)}
        </span>

        <div className="flex gap-4">
          <Button variant="secondary" onClick={clearCart}>
            Empty cart
          </Button>

          {/* Botón PayPal */}
          <CheckoutButton />
        </div>
      </div>
    </section>
  )
}
