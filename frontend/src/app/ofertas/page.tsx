"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RecommendedSection } from "@/components/home/RecommendedSection";
import { RECOMMENDED_CONTENT } from "@/data/home.content";

export default function OfertasPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#fffdfb_0%,_#fff7f2_100%)] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden rounded-[32px] border border-[#f4d9df] bg-white/80 px-6 py-12 shadow-[0_25px_80px_-45px_rgba(192,82,100,0.45)] backdrop-blur md:px-10 lg:px-14"
        >
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#c05264] font-medium">
              Ofertas exclusivas
            </p>
            <h1 className="mt-3 text-4xl font-light leading-tight text-slate-700 md:text-5xl lg:text-6xl">
              Descubre promociones pensadas para tu rutina.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">
              Aquí encontrarás los mejores descuentos y una experiencia más cercana para elegir productos que realmente encajan con tu piel.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/productos"
                className="rounded-full bg-[#c05264] px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-[#a84354]"
              >
                Ver productos
              </Link>
              <Link
                href="/contacto"
                className="rounded-full border border-[#c05264]/30 px-6 py-3 text-sm font-medium text-[#c05264] transition duration-300 hover:bg-[#c05264] hover:text-white"
              >
                Hablar con asesoría
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-[32px] border border-[#f4d9df] bg-white/70 p-6 shadow-[0_20px_70px_-50px_rgba(15,23,42,0.5)] md:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#c05264] font-medium">
                Curación especial
              </p>
              <h2 className="mt-2 text-3xl font-light text-slate-700 md:text-4xl">
                Te lo Recomendamos
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Selección de productos premium con beneficios pensados para hidratación, protección y luminosidad.
            </p>
          </div>

          <div className="mt-8">
            <RecommendedSection {...RECOMMENDED_CONTENT} />
          </div>
        </motion.section>

      </div>
    </main>
  );
}
