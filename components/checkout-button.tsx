"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/context/CartContext";

/**
 * Muestra los botones nativos de PayPal y crea un
 * pedido con el total del carrito.
 */
type PayPalCheckoutProps = {
  total: number;
  onSuccess?: () => void;
};

interface CheckoutButtonProps {
  description?: string;      // ⬅️  añade
}
export default function CheckoutButton() {
  const { cart, total, clearCart } = useCart();

  // Si el carrito está vacío no mostramos nada
  if (cart.length === 0) return null;

  return (
    <div className="mt-8 max-w-xs">
 {/*     
      <PayPalButtons
        style={{ layout: "horizontal", color: "gold", height: 45 }}
        createOrder={(_, actions) =>
          actions.order.create({
            purchase_units: [
              {
                description: "Mabel InkArt Purchase",
                amount: {
                currency_code: "USD",
                value: total.toFixed(2),
                },
              },
            ],
            intent: "CAPTURE"
          })
        }
        onApprove={async (_, actions) => {
          await actions.order?.capture();
          clearCart();
          // Puedes mostrar un toast de éxito aquí
        }}
        onError={(err) => {
          console.error("PayPal error", err);
          // toast.error("Something went wrong with PayPal");
        }}
      />
*/}      
    </div>
  );
}
