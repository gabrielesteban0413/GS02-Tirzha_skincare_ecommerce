// frontend/src/components/home/PremiumTreatments.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Treatment {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
}

interface PremiumTreatmentsProps {
  title: string;
  subtitle: string;
  categories: Treatment[];
}

export function PremiumTreatments({ title, subtitle, categories }: PremiumTreatmentsProps) {
  const router = useRouter();
  const [hero, ...rest] = categories;
  const mid = rest.slice(0, 2);
  const small = rest.slice(2, 5);

  const getCategoryImage = (slug: string): string => {
    return `/images/categories/${slug}.webp`;
  };

  return (
    <section className="vitamin-section relative isolate py-10 md:py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[rgba(251,215,203,0.4)] to-[rgba(255,191,207,0.4)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-4 animate-fade-in-up">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#c05264] font-medium mb-2">
              Especialización
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-light text-gray-700 leading-tight sm:leading-none">
              {title}
            </h2>
            <div className="w-10 h-px bg-[#c05264]/40 mt-3 sm:mt-4" />
          </div>
          <p className="text-sm text-gray-500 max-w-[200px] text-left sm:text-right leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {/* Hero card */}
          {hero && (
            <div
              onClick={() => router.push(`/productos/categoria/${hero.slug}`)}
              className="relative lg:row-span-2 rounded-2xl overflow-hidden cursor-pointer group bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(255,244,247,0.98))] shadow-sm transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-[#c05264]/20 hover:-translate-y-2 will-change-transform"
            >
              <div className="relative aspect-[4/3] sm:aspect-[3/4] w-full bg-[linear-gradient(135deg,#fff6f7_0%,#fff1e8_45%,#f4efff_100%)] overflow-hidden">
                <Image
                  src={getCategoryImage(hero.slug)}
                  alt={hero.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 will-change-transform"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <div className="p-4 md:p-5 relative">
                <span className="inline-block text-[10px] tracking-[0.15em] uppercase text-[#c05264] bg-[#c05264]/10 px-3 py-1 rounded-full mb-3 group-hover:bg-[#c05264]/20 transition-colors">
                  Destacado
                </span>
                <p className="font-['Cormorant_Garamond'] text-lg md:text-xl font-medium text-gray-700 mb-1 group-hover:text-[#c05264] transition-colors">
                  {hero.name}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {hero.description}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/productos/categoria/${hero.slug}`);
                    }}
                    className="inline-flex items-center gap-2 text-[#c05264] font-medium group-hover:translate-x-1 transition-transform text-sm"
                  >
                    Explorar
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Medium cards */}
          {mid.map((category: Treatment) => (
            <div
              key={category.id}
              onClick={() => router.push(`/productos/categoria/${category.slug}`)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(255,245,247,0.98))] shadow-sm transition-all duration-400 ease-out hover:shadow-xl hover:-translate-y-1 will-change-transform"
            >
              <div className="relative aspect-[4/3] bg-[linear-gradient(135deg,#fff6f7_0%,#fff1e8_50%,#f5f0ff_100%)] overflow-hidden">
                <Image
                  src={getCategoryImage(category.slug)}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="p-3 md:p-4">
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#c05264] bg-[#c05264]/10 px-2 py-0.5 rounded-full inline-block mb-2 group-hover:bg-[#c05264]/20 transition-colors">
                  Tratamiento
                </span>
                <p className="font-['Cormorant_Garamond'] text-sm md:text-base font-medium text-gray-700 mb-3 group-hover:text-[#c05264] transition-colors line-clamp-1">
                  {category.name}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/productos/categoria/${category.slug}`);
                    }}
                    className="inline-flex items-center gap-1 text-[#c05264] font-medium group-hover:translate-x-1 transition-transform text-xs"
                  >
                    Explorar
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Small horizontal cards */}
          {small.map((category: Treatment) => (
            <div
              key={category.id}
              onClick={() => router.push(`/productos/categoria/${category.slug}`)}
              className="relative rounded-2xl flex items-center gap-3 p-3 cursor-pointer group bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,245,247,0.96))] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border border-white/60 will-change-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-[#fdf0f2] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <Image
                  src={getCategoryImage(category.slug)}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Cormorant_Garamond'] text-xs md:text-sm font-medium text-gray-700 truncate group-hover:text-[#c05264] transition-colors">
                  {category.name}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/productos/categoria/${category.slug}`);
                }}
                className="w-6 h-6 rounded-full bg-[#c05264] flex items-center justify-center flex-shrink-0 hover:bg-[#a84354] transition-all hover:scale-110 will-change-transform"
              >
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          ))}

          {/* Ver todos */}
          {categories.length > 3 && (
            <div
              onClick={() => router.push("/productos")}
              className="rounded-2xl flex items-center gap-3 p-3 cursor-pointer border border-dashed border-[#c05264]/30 hover:border-[#c05264]/60 transition-all duration-300 hover:bg-[#c05264]/10 hover:-translate-y-0.5 will-change-transform bg-white/30 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl border border-dashed border-[#c05264]/30 flex items-center justify-center flex-shrink-0 hover:border-[#c05264]/60 transition-all">
                <svg className="w-5 h-5 text-[#c05264] transition-transform hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div>
                <p className="font-['Cormorant_Garamond'] text-xs md:text-sm font-medium text-[#c05264]">Todas las categorías</p>
                <span className="text-[11px] text-gray-500">{categories.length} opciones disponibles</span>
              </div>
            </div>
          )}
        </div>

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
    </section>
  );
}
