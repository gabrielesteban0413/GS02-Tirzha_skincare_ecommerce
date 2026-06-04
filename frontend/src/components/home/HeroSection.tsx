// frontend/src/components/home/HeroSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion"; // Recuerda instalar: pnpm add framer-motion

interface HeroSectionProps {
  onShopNow: () => void;
  onLearnMore: () => void;
}

export function HeroSection({ onShopNow, onLearnMore }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Imagen de Fondo con Parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto Animado */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-sm font-semibold text-amber-600 tracking-wider bg-amber-100/50 backdrop-blur-sm px-3 py-1 rounded-full inline-block w-fit">
              01 — New Collection
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
              Unlock Your
              <span className="block text-amber-600 mt-2">Skin's Natural Beauty</span>
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-md text-lg">
              Welcome to the world of vitamin skincare, where we believe that beauty starts with
              healthy, radiant skin.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div>
                <span className="text-sm text-gray-500 block">Starting at</span>
                <span className="text-4xl font-bold text-gray-900">$39.99</span>
              </div>
              <button
                onClick={onShopNow}
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Shop Now
              </button>
              <button
                onClick={onLearnMore}
                className="border border-gray-300 hover:border-amber-500 rounded-full px-8 py-3 transition-all hover:bg-amber-50"
              >
                Learn More →
              </button>
            </div>
          </motion.div>

          {/* Imagen del Producto con Efecto de Sombra y Brillo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-amber-400 rounded-full blur-3xl opacity-30 animate-pulse" />
              <Image
                src="/images/home/hero-product.png"
                alt="Hero Product"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}