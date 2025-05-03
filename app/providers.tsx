/* app/providers.tsx */
"use client";

import { PayPalScriptProvider, type ReactPayPalScriptOptions } from "@paypal/react-paypal-js";
import { ThemeProvider }    from "@/components/theme-provider";
import { CartProvider }     from "@/context/CartContext";

const PAYPAL_ID = "AZL0Z8A_R9uOGcERpC8oCLDqLGnW-SY2EUjpGSdze4UiS8c0ik7TELbExiRQzmGfQm7Z7-rd524hQKlz";
   // ⚠️ tu ID sandbox

const paypalOptions: ReactPayPalScriptOptions = {
  "client-id": PAYPAL_ID,      //   (duplica por si usas versiones viejas del SDK)
  currency   : "USD",
  //intent     : "CAPTURE",
  clientId   : PAYPAL_ID,      // <-- la clave correcta (y con guion también)
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider 
      options={paypalOptions}
      deferLoading={false}

    >
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </PayPalScriptProvider>
  );
}
