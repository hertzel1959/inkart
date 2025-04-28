"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion"; // ⬅️ Esto está bien

// Tipos del formulario
type FormData = {
  name: string;
  email: string;
  message: string;
  _gotcha?: string; // Honeypot
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const [submitted, setSubmitted] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (data._gotcha) return;

    try {
      const response = await fetch("https://formspree.io/f/movdvgzw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
      } else {
        setErrorSubmit(true);
      }
    } catch (error) {
      setErrorSubmit(true);
    }
  };

  return (
    <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-serif font-bold mb-4">
            Your ideas inspire me
          </h1>
          <p className="text-gray-600 text-lg">
            Share your vision, and let's bring it to life! ✨
          </p>
        </motion.div>




     {submitted ? (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="relative flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 p-8 rounded-2xl shadow-2xl text-green-800 font-semibold space-y-4"
  >
    {/* Botón de cerrar */}
    <button
      onClick={() => setSubmitted(false)}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
      aria-label="Close"
    >
      ×
    </button>

    {/* Corazón animado */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className="text-6xl"
    >
      💌
    </motion.div>

    <h2 className="text-2xl font-serif text-black">
      I'd love to hear from you!
    </h2>
    <p className="text-gray-600 text-base">
      Thank you for your message. I will get back to you as soon as possible!
    </p>
  </motion.div>
) : errorSubmit ? (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-red-600 font-medium text-lg animate-pulse"
  >
    Oops! Something went wrong. Please try again.
  </motion.div>
) : (
  // Aquí sigue el formulario...
    <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 relative"
        >
          {/* Honeypot invisible */}
          <input
            type="text"
            {...register("_gotcha")}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
  
          {/* Input Name */}
          <div className="flex flex-col text-left">
            <label htmlFor="name" className="text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-black"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
  
          {/* Input Email */}
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-black"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
  
          {/* Input Message */}
          <div className="flex flex-col text-left">
            <label htmlFor="message" className="text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message should be at least 10 characters",
                },
              })}
              className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.message ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-black"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black text-white rounded-lg px-6 py-3 font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div> // <-- Aquí está el cierre que faltaba
  );
}