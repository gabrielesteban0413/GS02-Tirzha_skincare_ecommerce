'use client';

import { useProduct } from '@/hooks/use-product';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const { product, loading } = useProduct(params.slug);

  if (loading) return <p className="p-8">Cargando...</p>;
  if (!product) return <p className="p-8">Producto no encontrado.</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-pink-600 mt-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mt-6">{product.description}</p>
          <button className="mt-8 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}