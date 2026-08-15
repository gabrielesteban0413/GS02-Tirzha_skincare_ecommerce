// frontend/src/components/home/ProductCarousel.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFeaturedProducts } from "@/hooks/use-products";

export function ProductCarousel() {
  const router = useRouter();
  const { data: products = [], isLoading, error } = useFeaturedProducts();
  const trackRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [animDuration, setAnimDuration] = useState<number>(0);

  const CARD_W = 226; // fallback card width

  useEffect(() => {
    // compute animation duration based on total width and target speed
    const el = trackRef.current;
    if (!el || !products.length) return;
    // track contains two copies; use half width as the scroll distance
    const totalWidth = el.scrollWidth / 2 || (products.length * CARD_W);
    const speedPxPerSec = CARD_W / 3.2; // same visual speed as before
    const duration = Math.max(8, totalWidth / speedPxPerSec);
    setAnimDuration(duration);
  }, [products.length]);

  const stopAuto = () => {
    setPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  };
  const scheduleResume = (delay = 10000) => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current as number);
    pauseTimeoutRef.current = window.setTimeout(() => {
      setPaused(false);
      pauseTimeoutRef.current = null;
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  if (isLoading) return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#fef7f2]">
      <div className="flex justify-center"><div className="w-8 h-8 border-4 border-[#c05264] border-t-transparent rounded-full animate-spin" /></div>
    </section>
  );

  if (!products.length && !isLoading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#fef7f2] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center py-16 text-gray-500">
          {error
            ? 'No se pudieron cargar los productos destacados. Intenta de nuevo más tarde.'
            : 'No hay productos destacados disponibles en este momento.'}
        </div>
      </section>
    );
  }

  // duplicate items for continuous scroll
  const items = [...products, ...products];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#fef7f2] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#c05264] font-medium mb-2">Colección destacada</p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-gray-700 leading-tight">Nuestros <em className="italic text-[#c05264]">favoritos</em></h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">Cuidado de piel con vitaminas para cada tipo de piel</p>
          </div>
        </div>

        <div
          className="overflow-hidden"
          onMouseEnter={stopAuto}
          onMouseLeave={() => scheduleResume(10000)}
          onPointerDown={stopAuto}
          onPointerUp={() => scheduleResume(10000)}
        >
          <div
            ref={trackRef}
            className={`product-scroll-track ${paused ? 'paused-scroll' : ''}`}
            style={{ animationDuration: `${animDuration}s` } as React.CSSProperties}
          >
            {items.map((product: any, i: number) => (
              <div
                key={`${product.id ?? 'p'}-${i}`}
                onClick={() => router.push(`/productos/${product.slug}`)}
                className="flex-shrink-0 w-[210px] rounded-[20px] overflow-hidden cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
                style={{ background: ["#fdf0f2", "#e8f4f9", "#f2ecfb", "#fbf0e4", "#e4f5ec", "#fef3e6", "#fbeaf0"][i % 7] }}
              >
                <div className="relative w-full h-[240px] overflow-hidden">
                  {product.imageUrl ? (
                    <Image src={product.imageUrl} alt={product.name} fill priority={i < 3} loading={i < 3 ? 'eager' : 'lazy'} className="object-cover group-hover:scale-105 transition-transform duration-500" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCc+PC9zdmc+" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-[#c05264]/40 flex items-center justify-center">
                        <span className="font-['Cormorant_Garamond'] text-2xl font-light text-[#c05264] opacity-70">{product.name?.[0]}</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-full">{product.volume ?? '30ml'}</span>
                </div>
                <div className="p-4">
                  <span className="inline-block text-[10px] tracking-[0.12em] uppercase text-[#c05264] bg-[#c05264]/10 px-2.5 py-0.5 rounded-full mb-2 font-medium">{product.type ?? 'Hidratante'}</span>
                  <p className="font-['Cormorant_Garamond'] text-lg font-medium text-gray-700 leading-tight mb-1">{product.name}</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-3 line-clamp-2">{product.description ?? 'Fórmula vitamínica para piel radiante'}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium text-[#c05264]">${product.price}</span>
                    <button className="w-8 h-8 rounded-full bg-[#c05264] flex items-center justify-center hover:bg-[#a84354] transition-colors" aria-label="Ver producto">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .product-scroll-track { display: flex; gap: 1rem; align-items: stretch; animation-name: scroll-left; animation-timing-function: linear; animation-iteration-count: infinite; }
        .product-scroll-track.paused-scroll { animation-play-state: paused !important; }
        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}