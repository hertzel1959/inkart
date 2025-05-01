// app/layout.tsx
import "./globals.css";
import React from "react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${outfit.variable} ${cormorant.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* CartProvider envuelve TODO para que Header también tenga acceso */}
          <CartProvider>
            <Header />

            <main className="pt-20">{children}</main>

            <Footer />
          </CartProvider>
        </ThemeProvider>

       {/*  ⬇️  Aquí dejas el Toaster minimal   */}
      <Toaster
        position="bottom-center"
        theme="light"      // o "system"
        visibleToasts={2}  // máximo simultáneo

      />
      </body>
    </html>
  );
}
