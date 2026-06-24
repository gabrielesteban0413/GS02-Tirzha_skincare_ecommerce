"use client";

import { useProductsByCategory } from "@/hooks/use-products";
import { ProductCard } from "@/components/product/ProductCard";

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ProductCategoryPage({ params }: { params: { slug: string } }) {
  const { data: products = [], isLoading } = useProductsByCategory(params.slug);
  const title = humanizeSlug(params.slug);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.32em] text-[#c05264] mb-3">Categoría</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-4 text-gray-600 max-w-3xl text-sm md:text-base">
            Productos seleccionados para la categoría «{title}». Explora fórmulas y texturas pensadas para tu rutina.
          </p>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-gray-500">Cargando productos...</div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-gray-500">No se encontraron productos para esta categoría.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
