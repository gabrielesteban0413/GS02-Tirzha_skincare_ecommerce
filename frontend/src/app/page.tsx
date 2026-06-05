"use client";

import { Navbar } from "@/components/layout/navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useProductsByType } from "@/hooks/use-products";

export default function Home() {
  const router = useRouter();
  const { products, loading } = useProductsByType("hidratantes");
  const featuredProducts = products.slice(0, 6);

  const handleShopNow = () => router.push("/productos");
  const handleLearnMore = () => router.push("/about");
  const handleExploreMore = () => router.push("/productos");

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-16 pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/70 via-white/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <div>
                <span className="text-sm font-medium text-rose-400/80 tracking-wider">✦ 01</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-gray-700">
                Tu piel no miente.
                <span className="block font-semibold mt-1 md:mt-2 text-[#c05264]">
                  Dale lo que de verdad necesita.
                </span>
              </h1>
              <p className="text-gray-500 leading-relaxed max-w-md text-sm md:text-base">
                Vitamina + Resultados Reales.
              </p>
              <div className="flex items-center gap-4 pt-2 md:pt-4">
                <span className="text-gray-400 text-sm md:text-base">Desde</span>
                <span className="text-2xl md:text-3xl font-semibold text-[#c05264]">
                  $40.000
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-2 md:pt-4">
                <button
                  onClick={handleShopNow}
                  className="bg-[#c05264] text-white hover:bg-[#a84354] rounded-full px-6 md:px-8 py-2 md:py-3 text-sm md:text-base transition-all duration-300 hover:scale-105 cursor-pointer shadow-md hover:shadow-lg"
                >
                  Compra Ahora
                </button>
                <button
                  onClick={handleLearnMore}
                  className="border border-[#c05264]/30 text-[#c05264] hover:bg-[#c05264]/10 rounded-full px-6 md:px-8 py-2 md:py-3 text-sm md:text-base transition-all duration-300 cursor-pointer"
                >
                  Conoce Más →
                </button>
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[650px] aspect-square mx-auto">
                <Image
                  src="/images/home/hero-product.png"
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

      {/* Trending Strip */}
      <div className="relative py-3 md:py-4 overflow-hidden bg-[#c05264]">
        <div className="relative z-10 flex items-center justify-center gap-4 md:gap-8 animate-marquee whitespace-nowrap">
          {Array(30).fill("NEW").map((item, index) => (
            <span
              key={index}
              className="text-white/90 mx-2 md:mx-4 text-xs md:text-sm tracking-wider font-semibold inline-block"
            >
              ✦ {item} ✦
            </span>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-[#fef7f2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-gray-600">
              Vitamin
            </h2>
            <div className="w-12 md:w-16 h-px bg-[#c05264]/30 mx-auto my-3 md:my-4" />
            <p className="text-gray-400 text-sm md:text-base">
              Discover our premium collection
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-6 h-6 md:w-8 md:h-8 border-4 border-[#c05264] border-t-transparent rounded-full animate-spin" />
              <p className="mt-2 text-gray-500 text-sm md:text-base">
                Cargando productos...
              </p>
            </div>
          )}

          {!loading && featuredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No hay productos disponibles
            </div>
          )}

          {!loading && featuredProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {featuredProducts.map((product: any) => (
                <Link
                  href={`/productos/${product.slug}`}
                  key={product.id}
                  className="group"
                >
                  <div className="text-center">
                    <div className="aspect-square bg-gradient-to-br from-amber-50 to-[#fef2f0] rounded-lg md:rounded-xl mb-2 md:mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-md overflow-hidden relative">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-10 h-10 md:w-16 md:h-16 bg-white/60 rounded-lg mx-auto mb-1 md:mb-2 flex items-center justify-center">
                            <span className="text-xs text-[#c05264]">V</span>
                          </div>
                          <span className="text-xs text-gray-500 hidden md:block">
                            {product.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-xs md:text-sm mb-0.5 md:mb-1 text-gray-600 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[#c05264] text-xs md:text-sm font-medium">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-[#fef7f2]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-600 mb-3 md:mb-4">
            What we offer
          </h2>
          <div className="w-16 md:w-24 h-px bg-[#c05264]/30 mx-auto my-4 md:my-6" />
          <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Our Serums Offer You Not Just Skincare, But An Experience.
          </p>
          <button
            onClick={handleExploreMore}
            className="border border-[#c05264]/30 text-[#c05264] hover:bg-[#c05264] hover:text-white rounded-full px-8 md:px-10 py-2 md:py-3 text-sm md:text-base transition-all duration-300 cursor-pointer"
          >
            Explore More →
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-block;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 15s;
          }
        }
      `}</style>
    </main>
  );
}