
import ContactForm from "./contactform";

// export const metadata = {
//   title: "Contact Mabel | InkArt",
//   description: "Get in touch with Mabel to inquire about her handcrafted artworks, commissions, and collaborations.",
//   openGraph: {
//     title: "Contact Mabel | InkArt",
//     description: "Reach out to discuss commissions, collaborations, or custom artwork ideas.",
//     url: "https://inkart-seven.vercel.app/contact",
//     siteName: "Mabel's InkArt",
//     images: [
//       {
//         url: "https://inkart-seven.vercel.app/contact-og.png",
//         width: 1200,
//         height: 630,
//         alt: "Mabel's InkArt Contact",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   robots: {
//     index: true,
//     follow: true,
//   },
// };

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="max-w-lg w-full">

        {/* Título inspirador animado */}
        

        {/* Formulario de contacto */}
        <ContactForm />

      </div>
    </main>
  );
}