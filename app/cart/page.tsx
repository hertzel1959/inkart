"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"

export default function CartPage() {
  const { cart, removeItem, clearCart, total } = useCart()

  if (cart.length === 0) {
    return (
      <section className="container mx-auto max-w-3xl py-16">
        <h1 className="text-3xl font-semibold text-center">Your cart</h1>
        <p className="mt-6 text-center text-gray-500">
          Your cart is empty at the moment 🛒
        </p>
      </section>
    )
  }

  return (
    <section className="container mx-auto max-w-3xl py-16 space-y-8">
      <h1 className="text-3xl font-semibold">Your Shopping cart 🛒</h1>

      {/* Lista de ítems */}
      <ul className="space-y-8">
        {cart.map(item => (
          <li key={item.id} className="flex gap-4 items-start">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />

            <div className="flex-1">
              <h2 className="font-serif text-2xl">{item.title}</h2>
              <p className="text-sm text-gray-600">
                {item.quantity} × USD${item.price.toFixed(2)}
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>

      {/* Total + vaciar */}
      <div className="flex justify-between items-center pt-6 border-t">
        <span className="text-xl font-bold">
          Total:&nbsp;USD&nbsp;${(total ?? 0).toFixed(2)}
        </span>

        <Button variant="secondary" onClick={clearCart}>
          Empty cart
        </Button>
      </div>
    </section>
  )
}
