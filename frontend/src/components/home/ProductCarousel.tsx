// frontend/src/components/home/ProductCarousel.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFeaturedProducts } from "@/hooks/use-products";

export function ProductCarousel() {
  const router = useRouter();
  const { data: products = [], isLoading, error } = useFeaturedProducts();
  const trackRef = useRef<HTMLDivElement>(null);
  const VISIBLE = 3;
  const [current, setCurrent] = useState(VISIBLE);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = products.length;
  const extended = total > 0 ? [...products.slice(-VISIBLE), ...products, ...products.slice(0, VISIBLE)] : [];

  const goTo = useCallback((idx: number) => {
    const pagesCount = Math.max(1, total - VISIBLE + 1);
    const clamped = Math.max(0, Math.min(idx, pagesCount - 1));
    setCurrent(clamped + VISIBLE);
  }, [total]);

  useEffect(() => {
    if (total <= VISIBLE) return;
    autoRef.current = setInterval(() => {
      setCurrent(prev => prev + 1);
    }, 3200);
    return () => clearInterval(autoRef.current!);
  }, [total]);

  // compute card width dynamically (responsive) and update on resize
  useEffect(() => {
    const calc = () => {
      const el = trackRef.current;
      if (!el || !el.children.length) return setCardWidth(CARD_W);
      const first = el.children[0] as HTMLElement;
      const style = getComputedStyle(el);
      const gap = parseFloat(getComputedStyle(el).gap || "16") || 16;
      const w = Math.round(first.getBoundingClientRect().width + gap);
      setCardWidth(w || CARD_W);
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [extended.length]);

  const stopAuto = () => clearInterval(autoRef.current!);
  const startAuto = () => {
    if (total <= VISIBLE) return;
    autoRef.current = setInterval(() => {
      setCurrent(prev => prev + 1);
    }, 3200);
  };

  const CARD_W = 226; // 210px card + 16px gap

  const [cardWidth, setCardWidth] = useState(CARD_W);
  const [isResetting, setIsResetting] = useState(false);

  const bgColors = [
    "#fdf0f2", "#e8f4f9", "#f2ecfb",
    "#fbf0e4", "#e4f5ec", "#fef3e6", "#fbeaf0",
  ];

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

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#fef7f2] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#c05264] font-medium mb-2">
              Colección destacada
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-gray-700 leading-tight">
              Nuestros <em className="italic text-[#c05264]">favoritos</em>
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">
              Cuidado de piel con vitaminas para cada tipo de piel
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => {
                const pages = Math.max(1, total - VISIBLE + 1);
                const currentPage = ((current - VISIBLE) % pages + pages) % pages;
                const prev = (currentPage - 1 + pages) % pages;
                goTo(prev);
              }}
              className="w-10 h-10 rounded-full border border-[#c05264]/30 text-[#c05264] flex items-center justify-center hover:bg-[#c05264] hover:text-white transition-all"
              aria-label="Anterior"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const pages = Math.max(1, total - VISIBLE + 1);
                const currentPage = ((current - VISIBLE) % pages + pages) % pages;
                const next = (currentPage + 1) % pages;
                goTo(next);
              }}
              className="w-10 h-10 rounded-full border border-[#c05264]/30 text-[#c05264] flex items-center justify-center hover:bg-[#c05264] hover:text-white transition-all"
              aria-label="Siguiente"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Track */}
        <div className="overflow-hidden" onMouseEnter={stopAuto} onMouseLeave={startAuto}>
          <div
            ref={trackRef}
            className={`flex gap-4 ${isResetting ? "" : "transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"}`}
            style={{ transform: `translateX(-${current * cardWidth}px)` }}
            onTransitionEnd={() => {
              // when we reach the cloned tail area, snap to real start
              if (current >= total + VISIBLE) {
                stopAuto();
                // remove transition class during snap
                setIsResetting(true);
                requestAnimationFrame(() => {
                  setCurrent(VISIBLE);
                  // force reflow
                  trackRef.current && trackRef.current.offsetWidth;
                  requestAnimationFrame(() => {
                    setIsResetting(false);
                    startAuto();
                  });
                });
              }
              if (current < VISIBLE) {
                stopAuto();
                setIsResetting(true);
                requestAnimationFrame(() => {
                  setCurrent(total + VISIBLE - 1);
                  trackRef.current && trackRef.current.offsetWidth;
                  requestAnimationFrame(() => {
                    setIsResetting(false);
                    startAuto();
                  });
                });
              }
            }}
          >
            {extended.map((product: any, i: number) => (
              <div
                key={`${product.id ?? 'ext'}-${i}`}
                onClick={() => router.push(`/productos/${product.slug}`)}
                className="flex-shrink-0 w-[210px] rounded-[20px] overflow-hidden cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
                style={{ background: bgColors[i % bgColors.length] }}
              >
                {/* Image area */}
                <div className="relative w-full h-[240px] overflow-hidden">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      priority={i < VISIBLE}
                      loading={i < VISIBLE ? "eager" : "lazy"}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCc+PC9zdmc+"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-[#c05264]/40 flex items-center justify-center">
                        <span className="font-['Cormorant_Garamond'] text-2xl font-light text-[#c05264] opacity-70">
                          {product.name[0]}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Duration badge */}
                  <span className="absolute top-3 right-3 bg-white/90 text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-full">
                    {product.volume ?? "30ml"}
                  </span>
                  {/* Rating */}
                  <div className="absolute bottom-14 right-3 flex items-center gap-1 text-yellow-400 text-[11px] font-medium">
                    <svg className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {product.rating ?? "4.8"}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <span className="inline-block text-[10px] tracking-[0.12em] uppercase text-[#c05264] bg-[#c05264]/10 px-2.5 py-0.5 rounded-full mb-2 font-medium">
                    {product.type ?? "Hidratante"}
                  </span>
                  <p className="font-['Cormorant_Garamond'] text-lg font-medium text-gray-700 leading-tight mb-1">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-3 line-clamp-2">
                    {product.description ?? "Fórmula vitamínica para piel radiante"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium text-[#c05264]">${product.price}</span>
                    <button
                      className="w-8 h-8 rounded-full bg-[#c05264] flex items-center justify-center hover:bg-[#a84354] transition-colors"
                      aria-label="Ver producto"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: Math.max(1, total - VISIBLE + 1) }).map((_, i) => {
            const pages = Math.max(1, total - VISIBLE + 1);
            const activeIndex = ((current - VISIBLE) % pages + pages) % pages;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-5 bg-[#c05264]" : "w-1.5 bg-[#c05264]/20"
                }`}
                aria-label={`Ir a ${i + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}