// frontend/src/components/home/FavoritesSection.tsx
"use client";

import { useRef, useState, useEffect, useCallback, type MouseEvent, type TouchEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useFeaturedProducts } from "@/hooks/use-products";
import { useAddToCart } from "@/hooks/use-cart";

interface FavoritesSectionProps {
  title: string;
  subtitle: string;
}

export function FavoritesSection({ title, subtitle }: FavoritesSectionProps) {
  const router = useRouter();
  const { data: products = [], isLoading, error } = useFeaturedProducts();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const VISIBLE = 3;
  const featured = products.slice(0, 12);
  const total = featured.length;

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, total - VISIBLE));
    setCurrent(clamped);
  }, [total]);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1 > total - VISIBLE ? 0 : prev + 1));
    }, 3200);
    return () => clearInterval(autoRef.current!);
  }, [total]);

  const stopAuto = () => clearInterval(autoRef.current!);
  const startAuto = () => {
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1 > total - VISIBLE ? 0 : prev + 1));
    }, 3200);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX ?? null;

    if (startX === null || endX === null) return;

    const delta = startX - endX;
    if (delta > 50) {
      goTo(current + 1);
    } else if (delta < -50) {
      goTo(current - 1);
    }

    touchStartX.current = null;
  };

  const bgColors = [
    "#fdf0f2", "#e8f4f9", "#f2ecfb",
    "#fbf0e4", "#e4f5ec", "#fef3e6", "#fbeaf0",
  ];

  const handleAddToCart = (
    event: MouseEvent<HTMLButtonElement>,
    product: { id: string; name: string; price: number }
  ) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart({
      productId: product.id,
      productName: product.name,
      quantity: 1,
      unitPrice: Number(product.price) || 0,
      subtotal: Number(product.price) || 0,
    });
  };

  if (isLoading) {
    return (
      <section className="relative isolate py-16 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-[#c05264] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  const CARD_W = 226;

  return (
    <section className="relative isolate py-16 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#c05264] font-medium mb-3">
            Lo más solicitado
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-700 leading-none">
            {title}
          </h2>
          <div className="w-12 md:w-16 h-px bg-[#c05264]/40 mx-auto my-4 md:my-6" />
          <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>
        </motion.div>

        {/* Carousel */}
        <div className="space-y-8">

          {/* Navigation arrows */}
          <div className="hidden md:flex gap-2 justify-end pr-1">
            <button
              onClick={() => goTo(current - 1)}
              className="w-10 h-10 rounded-full border border-[#c05264]/30 text-[#c05264] flex items-center justify-center hover:bg-[#c05264] hover:text-white transition-all duration-300"
              aria-label="Anterior"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="w-10 h-10 rounded-full border border-[#c05264]/30 text-[#c05264] flex items-center justify-center hover:bg-[#c05264] hover:text-white transition-all duration-300"
              aria-label="Siguiente"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {featured.length > 0 && (
            <div
              className="overflow-hidden touch-pan-y"
              onMouseEnter={stopAuto}
              onMouseLeave={startAuto}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                ref={trackRef}
                className="flex gap-4 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{ transform: `translateX(-${current * CARD_W}px)` }}
              >
                {featured.map((product, i) => (
                  <motion.div
                    key={product.id}
                    onClick={() => router.push(`/productos/${product.slug}`)}
                    className="relative flex-shrink-0 w-[210px] rounded-[20px] overflow-hidden cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
                    style={{ background: bgColors[i % bgColors.length] }}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.55, delay: Math.min(i * 0.03, 0.12), ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {/* Image */}
                    <div className="relative w-full h-[240px] overflow-hidden">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="210px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full border border-[#c05264]/40 flex items-center justify-center">
                            <span className="font-['Cormorant_Garamond'] text-2xl font-light text-[#c05264] opacity-70">
                              {product.name[0]}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="font-['Cormorant_Garamond'] text-lg font-medium text-gray-700 leading-tight mb-1">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-gray-400 leading-relaxed mb-3 line-clamp-2">
                        {product.description ?? "Fórmula premium para piel radiante"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-[#c05264]">${product.price}</span>
                        <button
                          aria-label="Agregar al carrito"
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={isAddingToCart}
                          className="w-8 h-8 rounded-full bg-[#c05264] flex items-center justify-center hover:bg-[#a84354] transition-all duration-300 hover:scale-110 will-change-transform disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {!featured.length && (
            <div className="py-16 text-center text-gray-500">
              {error
                ? 'No se pudieron cargar los productos. Intenta refrescar la página.'
                : 'No hay productos disponibles en este momento.'}
            </div>
          )}

        {/* Dots */}
        {featured.length > 0 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: Math.max(0, total - VISIBLE + 1) }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-5 bg-[#c05264]" : "w-1.5 bg-[#c05264]/20"
                }`}
                aria-label={`Ir a ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-12 md:mt-16">
        <button
          onClick={() => router.push("/productos")}
          className="border border-[#c05264]/30 text-[#c05264] hover:bg-[#c05264] hover:text-white rounded-full px-8 md:px-10 py-2 md:py-3 text-sm md:text-base transition-all duration-300"
        >
          Ver Todos los Productos
        </button>
      </div>

    </div>
  </section>
  );
}
