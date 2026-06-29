'use client';

import { useMemo } from 'react';
import { useProductsByType } from '@/hooks/use-products';
import { ProductCard } from '@/components/product/ProductCard';

const TYPE_LABELS: Record<string, string> = {
  hidratantes: 'Hidratantes',
  'protectores-solares': 'Protectores Solares',
  'contorno-de-ojos': 'Contorno de Ojos',
  sueros: 'Sérums',
  mascarillas: 'Mascarillas',
  tonicos: 'Tónicos',
  limpiadores: 'Limpiadores',
  kits: 'Kits',
};

interface ProductTypeClientProps {
  type: string;
}

export function ProductTypeClient({ type }: ProductTypeClientProps) {
  const { data: products = [], isLoading, isError, error } = useProductsByType(type);
  const title = useMemo(() => TYPE_LABELS[type] ?? type.replace(/-/g, ' '), [type]);

  return (
    <section className="rounded-[2rem] bg-white shadow-[0_35px_90px_rgba(220,184,192,0.14)] p-6 md:p-8">
      <div className="flex flex-col gap-2 md:gap-4 mb-8">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c05264] font-semibold">{title}</span>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Productos clave para tu rutina</h2>
        <p className="max-w-2xl text-sm md:text-base text-gray-600 leading-relaxed">
          Aquí encuentras cremas, tratamientos y fórmulas seleccionadas para restaurar, calmar y cuidar la hidratación de tu piel.
        </p>
      </div>

      {isLoading ? (
        <div className="py-16 text-center text-gray-500">Cargando productos...</div>
      ) : isError ? (
        <div className="py-16 text-center text-red-500">
          Ocurrió un error al cargar los productos. Intenta nuevamente más tarde.
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center text-gray-500">No hay productos disponibles para esta categoría.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
