// frontend/src/components/home/RecommendedSection.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProductsByType } from "@/hooks/use-products";

interface RecommendedSectionProps {
  title: string;
  subtitle: string;
}

export function RecommendedSection({ title, subtitle }: RecommendedSectionProps) {
  const router = useRouter();
  const { data: products = [], isLoading } = useProductsByType("hidratantes");
  const featured = products.slice(0, 8);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-[#fef7f2]">
        <div className="max-w-7xl mx-auto text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-[#c05264] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-[#fef7f2] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#c05264] font-medium mb-3">
            Para ti
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-700 leading-none">
            {title}
          </h2>
          <div className="w-12 md:w-16 h-px bg-[#c05264]/40 mx-auto my-4 md:my-6" />
          <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>
        </div>

        {/* Recommended Products */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {featured.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/productos/${product.slug}`)}
                className="group cursor-pointer relative isolate"
              >
                <div className="text-center space-y-2">
                  {/* Image */}
                  <div className="relative isolate aspect-square bg-gradient-to-br from-[#fdf0f2] to-[#fce8d5] rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                        sizes="210px"
                      />
                    ) : (
                      <span className="text-2xl">V</span>
                    )}
                  </div>

                  {/* Name and Price */}
                  <h3 className="font-medium text-xs md:text-sm text-gray-700 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[#c05264] font-semibold text-xs md:text-sm">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No hay productos disponibles</div>
        )}
      </div>
    </section>
  );
}
