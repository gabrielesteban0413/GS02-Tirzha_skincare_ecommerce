// frontend/src/components/home/VitaminSection.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProductsByType } from "@/hooks/use-products";

interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export function VitaminSection() {
  const router = useRouter();
  const { data: products = [], isLoading, error } = useProductsByType("hidratantes");
  const featured = products.slice(0, 6);

  const [hero, ...rest] = featured;
  const mid = rest.slice(0, 2);
  const small = rest.slice(2, 5);

  const getImageUrl = (product: Product): string => {
    if (product.imageUrl && !product.imageUrl.includes('placeholder') && !product.imageUrl.includes('via.')) {
      return product.imageUrl;
    }
    const imageMap: Record<string, string> = {
      'crema-hidratante-vitamina-c': '/images/products/crema-hidratante-vitamina-c-main.webp',
      'gel-hidratante-aloe-vit-b5': '/images/products/gel-hidratante-aloe-vit-b5.webp',
      'leche-corporal-reparadora': '/images/products/leche-corporal-reparadora.webp',
      'suero-facial-vitamina-e': '/images/products/suero-facial-vitamina-e-main.webp',
    };
    return imageMap[product.slug] || `/images/products/${product.slug}.webp`;
  };

  return (
    <section className="vitamin-section py-10 md:py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[rgba(251,215,203,0.4)] to-[rgba(255,191,207,0.4)] overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header con animación suave */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-4 animate-fade-in-up">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#c05264] font-medium mb-2">
              Premium Collection
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-light text-gray-700 leading-tight sm:leading-none">
              Vita<em className="italic text-[#c05264] not-italic">min</em>
            </h2>
            <div className="w-10 h-px bg-[#c05264]/40 mt-3 sm:mt-4" />
          </div>
          <p className="text-sm text-gray-500 max-w-[200px] text-left sm:text-right leading-relaxed">
            Discover our curated range of vitamin-infused skincare essentials
          </p>
        </div>

        {/* Estados de carga / error / vacío */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-[#c05264] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-gray-600">Cargando productos...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center py-16">
            <div className="text-center bg-red-50 p-6 rounded-lg border border-red-200">
              <p className="text-red-600 font-medium">Error cargando productos</p>
              <p className="text-red-500 text-sm mt-2">{String(error)}</p>
            </div>
          </div>
        )}

        {!isLoading && !error && featured.length === 0 && (
          <div className="flex justify-center py-16">
            <div className="text-center bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <p className="text-yellow-700 font-medium">No hay productos disponibles</p>
              <p className="text-yellow-600 text-sm mt-2">Intenta más tarde</p>
            </div>
          </div>
        )}

        {/* Grid responsive con efectos modernos */}
        {!isLoading && !error && featured.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {/* Hero card */}
            <div
              onClick={() => router.push(`/productos/${hero.slug}`)}
              className="lg:row-span-2 rounded-2xl overflow-hidden cursor-pointer group bg-white/70 backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-[#c05264]/20 hover:-translate-y-2 will-change-transform"
            >
              <div className="relative aspect-[4/3] sm:aspect-[3/4] w-full bg-gradient-to-br from-[#fdf0f2] to-[#fce8d5] overflow-hidden">
                {hero?.imageUrl || hero?.slug ? (
                  <Image
                    src={getImageUrl(hero)}
                    alt={hero.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-14 h-14 rounded-full border border-[#c05264] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="font-['Cormorant_Garamond'] text-2xl text-[#c05264]">V</span>
                    </div>
                  </div>
                )}
                <span className="absolute top-3 right-3 bg-[#c05264] text-white text-[9px] tracking-[0.15em] uppercase px-2 py-1 rounded-full shadow-md group-hover:shadow-lg transition-shadow">
                  New
                </span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <div className="p-4 md:p-5 relative">
                <span className="inline-block text-[10px] tracking-[0.15em] uppercase text-[#c05264] bg-[#c05264]/10 px-3 py-1 rounded-full mb-3 group-hover:bg-[#c05264]/20 transition-colors">
                  Bestseller
                </span>
                <p className="font-['Cormorant_Garamond'] text-lg md:text-xl font-medium text-gray-700 mb-1 group-hover:text-[#c05264] transition-colors">
                  {hero?.name}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {hero?.description?.slice(0, 70)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-[#c05264]">${hero?.price}</span>
                  <button
                    aria-label="Agregar al carrito"
                    className="w-8 h-8 rounded-full bg-[#c05264] flex items-center justify-center hover:bg-[#a84354] transition-all duration-300 hover:scale-110 hover:shadow-lg will-change-transform"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Medium cards */}
            {mid.map((p: Product) => (
              <div
                key={p.id}
                onClick={() => router.push(`/productos/${p.slug}`)}
                className="rounded-2xl overflow-hidden cursor-pointer group bg-white/70 backdrop-blur-sm transition-all duration-400 ease-out hover:shadow-xl hover:-translate-y-1 will-change-transform"
              >
                <div className="relative aspect-[4/3] bg-[#fef9f6] overflow-hidden">
                  {p.imageUrl || p.slug ? (
                    <Image
                      src={getImageUrl(p)}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border border-[#c05264] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="font-['Cormorant_Garamond'] text-lg text-[#c05264]">{p.name[0]}</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
                <div className="p-3 md:p-4">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#c05264] bg-[#c05264]/10 px-2 py-0.5 rounded-full inline-block mb-2 group-hover:bg-[#c05264]/20 transition-colors">
                    Hidratante
                  </span>
                  <p className="text-sm font-medium text-gray-700 truncate mb-3 group-hover:text-[#c05264] transition-colors">
                    {p.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#c05264]">${p.price}</span>
                    <button
                      aria-label="Agregar al carrito"
                      className="w-7 h-7 rounded-full bg-[#c05264] flex items-center justify-center hover:bg-[#a84354] transition-all hover:scale-110 will-change-transform"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Small horizontal cards */}
            {small.map((p: Product) => (
              <div
                key={p.id}
                onClick={() => router.push(`/productos/${p.slug}`)}
                className="rounded-2xl flex items-center gap-3 p-3 cursor-pointer group bg-white/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border border-white/50 will-change-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-[#fdf0f2] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  {p.imageUrl || p.slug ? (
                    <Image
                      src={getImageUrl(p)}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="48px"
                    />
                  ) : (
                    <span className="font-['Cormorant_Garamond'] text-lg text-[#c05264]">{p.name[0]}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 truncate group-hover:text-[#c05264] transition-colors">
                    {p.name}
                  </p>
                  <span className="text-xs font-medium text-[#c05264]">${p.price}</span>
                </div>
                <button
                  aria-label="Agregar al carrito"
                  className="w-6 h-6 rounded-full bg-[#c05264] flex items-center justify-center flex-shrink-0 hover:bg-[#a84354] transition-all hover:scale-110 will-change-transform"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            ))}

            {/* Ver todos */}
            <div
              onClick={() => router.push("/productos")}
              className="rounded-2xl flex items-center gap-3 p-3 cursor-pointer border border-dashed border-[#c05264]/30 hover:border-[#c05264]/60 transition-all duration-300 hover:bg-[#c05264]/10 hover:-translate-y-0.5 will-change-transform bg-white/30 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl border border-dashed border-[#c05264]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#c05264]/60 transition-all">
                <svg className="w-5 h-5 text-[#c05264] transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-[#c05264]">Ver todos</p>
                <span className="text-[11px] text-gray-500">{products.length - 5} productos más</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="flex items-center gap-6 mt-10">
          <div className="flex-1 h-px bg-gray-300/50" />
          <button
            onClick={() => router.push("/productos")}
            className="text-sm text-[#c05264] border border-[#c05264]/30 rounded-full px-7 py-2.5 hover:bg-[#c05264] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 will-change-transform"
          >
            Explorar colección
          </button>
          <div className="flex-1 h-px bg-gray-300/50" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}