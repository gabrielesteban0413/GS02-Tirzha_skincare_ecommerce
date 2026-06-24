"use client";

import { useProductsByType } from "@/hooks/use-products";
import { ProductCard } from "@/components/product/ProductCard";

function humanizePathSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function TreatmentsPage({ params }: { params: { type: string } }) {
  const { data: products = [], isLoading } = useProductsByType(params.type);
  const title = humanizePathSegment(params.type);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.32em] text-[#c05264] mb-3">Tratamientos</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-4 text-gray-600 max-w-3xl text-sm md:text-base">
            Productos diseñados para el cuidado de tu piel y el tratamiento específico que buscas.
          </p>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-gray-500">Cargando tratamientos...</div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-gray-500">Aún no hay productos disponibles para esta selección.</div>
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
