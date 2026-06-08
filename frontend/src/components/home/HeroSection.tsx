// frontend/src/components/home/HeroSection.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  priceLabel: string;
  price: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export function HeroSection({
  badge,
  title,
  highlight,
  description,
  priceLabel,
  price,
  ctaPrimary,
  ctaSecondary,
}: HeroSectionProps) {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-16 pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/hero-bg.webp"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/70 via-white/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6">
            <span className="text-sm font-medium text-rose-400/80 tracking-wider">{badge}</span>

            <h1 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight">
              <span className="text-gray-800">{title}</span>
              <span className="block font-semibold mt-2 md:mt-3 text-[#c05264]">{highlight}</span>
            </h1>

            <p className="text-gray-500 leading-relaxed max-w-md text-sm md:text-base">{description}</p>

            {/* Price */}
            <div className="flex items-center gap-4 pt-2 md:pt-4">
              <span className="text-gray-400 text-sm md:text-base">{priceLabel}</span>
              <span className="text-2xl md:text-3xl font-semibold text-[#c05264]">{price}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-2 md:pt-4">
              <button
                onClick={() => router.push("/productos")}
                className="bg-[#c05264] text-white hover:bg-[#a84354] rounded-full px-6 md:px-8 py-2 md:py-3 text-sm md:text-base transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                {ctaPrimary}
              </button>
              <button
                onClick={() => router.push("/about")}
                className="border border-[#c05264]/30 text-[#c05264] hover:bg-[#c05264]/10 rounded-full px-6 md:px-8 py-2 md:py-3 text-sm md:text-base transition-all duration-300"
              >
                {ctaSecondary}
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[650px] aspect-square mx-auto">
              <Image
                src="/images/home/hero-product.webp"
                alt="Hero Product"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 500px, 650px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}