"use client";
import Image from "next/image";
import { motion } from "framer-motion";


export default function BioPage() {
  return (
    <>
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-serif font-bold mb-8">About the Artist</h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to Mabel's InkArt, a space where passion meets creativity. 
            Every artwork you see is a piece of my soul, expressed through bold lines using pen, pencil, ink and sometimes colours, and endless inspiration drawn from nature, geometry, and fantasy. Every line carries a story, every pattern a feeling waiting to be shared.In every curve of ink and whisper of color, I find a story waiting to be told — a silent melody between the paper and my heart. 🎶
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            My journey began as a dream and has grown into a collection of pieces meant to inspire and evoke emotion.
            I've been drawing and painting since the moment I could hold a pencil. My love for art was nurtured by my beloved grandfather, who always gifted me colors, sketchbooks, and endless encouragement.🚀
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            I am a self-taught artist, and every piece I create is born straight from my heart. As my hand moves, the drawings evolve naturally, almost as if they have a life of their own, searching for the perfect pattern to fill each space. ✨
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            I am a creative and passionate individual, always striving to push the boundaries of what is possible. I am constantly inspired by the beauty of the world around me, and always looking for new ways to express my creativity. Whether it's through drawing, painting, or any other form of art, I am dedicated to creating something that will touch the hearts of those who see it.🎨
          </p>
          <p className="text-gray-700 leading-relaxed mb-12">
            Thank you for being part of this story. I hope you enjoy exploring my artworks and discovering the magic that lies within each piece. 💖
            
          </p>

         {/* Firma */}
<div className="flex justify-end mt-12">
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    className="pl-16"
  >
    <Image
      src="/mabel.png"
      alt="Artist Signature"
      width={100}
      height={500}
      className="opacity-80"
    />
  </motion.div>
</div>

        </div>
      </main>
    </>
  );
}
