"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart }      from "@/context/CartContext";
import Image            from "next/image";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();

  if (cart.length === 0) {
    return <p className="text-center mt-20">Your cart is empty.</p>;
  }

  const grandTotal = total.toFixed(2);          // PayPal quiere string

  return (
    <section className="container mx-auto max-w-lg py-16 space-y-8">
      <h1 className="text-3xl font-semibold text-center">Checkout</h1>

      {/* Resumen rápido */}
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex gap-4">
            <Image src={item.image} alt={item.title} width={64} height={64} />
            <div className="flex-1">
              <h2>{item.title}</h2>
              <p className="text-sm text-gray-500">USD${item.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-right font-bold">Total: USD${grandTotal}</div>

      {/* Botones de PayPal */}
{/*        <PayPalButtons
        style={{ layout: "vertical", shape: "pill" }}
        createOrder={(_, actions) =>
          actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: { value: grandTotal, currency_code: "USD" },
                description: "Mabel InkArt purchase",
              },
            ],
          })
        }
        onApprove={(_, actions) =>
          actions.order!.capture().then(() => {
            clearCart();
            alert("Payment completed! 🎉");
          })
        }
        onError={(err) => {
          console.error(err);
          alert("Payment error, try again.");
        }}
      /> 
      
*/}
    </section>
  );
}
