// frontend/src/components/home/TrendingStrip.tsx
"use client";

import Image from "next/image";

export function TrendingStrip() {
  const items = Array(30).fill("NEW");

  return (
    <div className="relative py-4 overflow-hidden bg-black/90">
      {/* Imagen de Fondo Sutil */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src="/images/home/trending-bg.jpg"
          alt="Trending background"
          fill
          className="object-cover"
        />
      </div>

      {/* Contenido con Efecto de Vidrio */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full ml-4">
          <span className="text-xs font-bold text-white tracking-wider">🔥 TRENDING NOW</span>
        </div>
        <div className="animate-marquee whitespace-nowrap flex-1">
          {items.map((item, index) => (
            <span key={index} className="text-white mx-4 text-sm tracking-wider font-semibold inline-block">
              ✦ {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}