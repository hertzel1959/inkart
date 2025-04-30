import './globals.css'
import { Cormorant_Garamond, Outfit } from "next/font/google"
import { ThemeProvider } from '@/components/theme-provider' // ajusta la ruta si es diferente
// import type { Metadata } from 'next'
import Header from "@/components/header";
import Footer from "@/components/footer"; // 👈 Importa Footer
import { Toaster } from "sonner"; // tu toaster sigue




const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // ✅ o puedes usar ["300", "400", "700"], etc.
  variable: "--font-cormorant",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // ✅ igual aquí puedes incluir más si los usas
  variable: "--font-outfit",
})

// export const metadata: Metadata = {
//   title: 'Mabel InkArt',
//   description: 'An artistic space showcasing detailed ink illustrations by Mabel.',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased ${outfit.variable} ${cormorant.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="pt-20">{children}</main> {/* ⬅️ aquí van las páginas */}
          <Footer /> {/* ⬅️ después del main */}
        </ThemeProvider>
       {/* Toaster configurado bonito */}
       <Toaster 
          theme="system"    // Usa light o dark automáticamente
          position="top-right"  // Donde aparecen los toasts (opcional)
          richColors         // Permite colores más suaves y elegantes
          closeButton        // Cada toast tiene su propia "X" para cerrar
          duration={3000}    // Cada toast dura 3 segundos (personalizable)
        />
      </body>
    </html>
  )
}
