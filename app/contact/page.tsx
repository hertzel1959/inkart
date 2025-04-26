"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log("Contact Form Data:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un envío de 1s
    setSubmitted(true);
    reset();
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="max-w-lg w-full">
        <h1 className="text-4xl font-serif font-bold mb-8">Contact Me</h1>

        {submitted ? (
          <div className="text-green-600 font-medium text-lg animate-pulse">
            Thank you for reaching out! 💌
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col text-left">
              <label htmlFor="name" className="text-sm font-medium mb-1">Name</label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-black"
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
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
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="message" className="text-sm font-medium mb-1">Message</label>
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
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-black text-white rounded-lg px-6 py-3 font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
