"use client";

import Link from "next/link";
import { useProductsByType } from "@/hooks/use-products";
import { ProductCard } from "@/components/product/ProductCard";
import { categorias } from "@/data/categories";
import { slugify } from "@/lib/url-utils";

export default function ProductsPage() {
  const { data: products = [], isLoading } = useProductsByType("hidratantes");
  const categoryNames = categorias.productos.subcategorias;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.32em] text-[#c05264] mb-3">Productos</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">Encuentra tu cuidado ideal</h1>
          <p className="mt-4 text-gray-600 max-w-3xl text-sm md:text-base">
            Navega por las categorías de productos y descubre fórmulas creadas para cada necesidad de tu piel.
          </p>
        </div>

        <section className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Explora por tipo de producto</h2>
              <p className="mt-2 text-gray-500 text-sm">Selecciona una categoría para ver productos filtrados.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryNames.map((category) => (
              <Link
                key={category}
                href={`/productos/tipo/${slugify(category)}`}
                className="rounded-3xl border border-gray-200 p-5 hover:border-[#c05264] transition-colors bg-white shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#c05264] mb-2">{category}</p>
                <p className="text-sm text-gray-600">Ver productos de esta categoría</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Productos destacados</h2>
              <p className="mt-2 text-gray-500 text-sm">Nuestros favoritos hidratantes para comenzar tu rutina.</p>
            </div>
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-gray-500">Cargando productos...</div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center text-gray-500">No hay productos disponibles en este momento.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl bg-[#fff0f2] p-8 border border-[#f6c1c8]">
          <h2 className="text-2xl font-semibold text-gray-900">Descubre más soluciones</h2>
          <p className="mt-3 text-gray-600 max-w-3xl text-sm md:text-base">
            También puedes explorar productos según solución, rutinas completas y recomendaciones personalizadas.
          </p>
        </section>
      </div>
    </main>
  );
}
