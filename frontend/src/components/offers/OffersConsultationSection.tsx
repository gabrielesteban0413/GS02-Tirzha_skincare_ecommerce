"use client";

import { motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";

export function OffersConsultationSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleQuickResponse = () => {
    setFormData((prev) => ({ ...prev, message: "Hola, quisiera una recomendación rápida sobre hidratación." }));
    // focus message
    messageRef.current?.focus();
    // scroll form into view
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handlePersonalized = () => {
    setFormData((prev) => ({ ...prev, message: "Solicito una recomendación personalizada para mi tipo de piel (describe brevemente)..." }));
    messageRef.current?.focus();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="relative isolate overflow-hidden rounded-[32px] border border-[#f2d5d8] bg-gradient-to-br from-[#fffaf7] via-white to-[#fef3f0] px-6 py-10 shadow-[0_20px_70px_-40px_rgba(192,82,100,0.45)] md:px-10 md:py-14 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(192,82,100,0.12),_transparent_45%)]" />
      <div className="relative mx-auto grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-5"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#c05264] font-medium">
            Consejo personalizado
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-slate-700">
            Tu rutina ideal, sin complicaciones.
          </h2>
          <p className="max-w-xl text-sm md:text-base text-slate-600 leading-7">
            Si quieres recibir una recomendación más cercana a tus necesidades, compártenos tus datos y te responderemos con una propuesta simple y útil.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <button
              type="button"
              onClick={handleQuickResponse}
              className="rounded-full border border-[#c05264]/20 bg-white/70 px-3 py-1 hover:bg-white/90 transition"
            >
              Respuesta rápida
            </button>
            <button
              type="button"
              onClick={handlePersonalized}
              className="rounded-full border border-[#c05264]/20 bg-white/70 px-3 py-1 hover:bg-white/90 transition"
            >
              Recomendaciones personalizadas
            </button>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          onSubmit={handleSubmit}
          ref={formRef}
          className="rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-[0_12px_35px_-23px_rgba(15,23,42,0.5)] backdrop-blur md:p-7"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                Tu nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder="Ana"
                className="w-full rounded-full border border-slate-200 bg-transparent px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#c05264]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                placeholder="300 000 0000"
                className="w-full rounded-full border border-slate-200 bg-transparent px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#c05264]"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                ¿Qué necesitas?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                ref={messageRef}
                placeholder="Quiero una rutina para piel sensible..."
                className="w-full rounded-[18px] border border-slate-200 bg-transparent px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#c05264]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#c05264] px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-[#a84354]"
          >
            Enviar consulta
          </button>

          {submitted && (
            <p className="mt-4 text-sm text-[#c05264]">
              Gracias, recibimos tu mensaje. Te contactaremos pronto.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
