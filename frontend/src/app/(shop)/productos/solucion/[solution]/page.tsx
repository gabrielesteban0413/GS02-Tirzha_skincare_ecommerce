'use client';

import { useProductsBySolution } from '@/hooks/use-products';
import { ProductCard } from '@/components/product/ProductCard';

export default function SolutionPage({ params }: { params: { solution: string } }) {
  const { products, loading } = useProductsBySolution(params.solution);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{params.solution}</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}