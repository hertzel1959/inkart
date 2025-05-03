/* app/layout.tsx */
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import Providers from "./providers";

import { Cormorant_Garamond, Outfit } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight : ["300","400","500","600","700"],
  variable: "--font-cormorant",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight : ["300","400","500","600","700"],
  variable: "--font-outfit",
});

export const metadata = { title: "Mabel InkArt" };    // opcional

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased ${outfit.variable} ${cormorant.variable}`}>
        <Providers>{/* ← todos los contextos, PayPal, etc. */}
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <Toaster theme="system" position="top-right" richColors closeButton duration={3000}/>
        </Providers>
      </body>
    </html>
  );
}
