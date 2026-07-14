"use client";

import { type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAddToCart } from '@/hooks/use-cart';

const formatPrice = (price: number | string) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

const resolveProductImage = (imageUrl?: string) => {
  if (typeof imageUrl !== 'string' || !imageUrl.trim()) {
    return '/images/home/hero-product.webp';
  }

  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  return '/images/home/hero-product.webp';
};

export const ProductCard = ({ product }: { product: any }) => {
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart({
      productId: String(product.id ?? product.slug ?? product.name),
      productName: product.name,
      quantity: 1,
      unitPrice: Number(product.price) || 0,
      subtotal: Number(product.price) || 0,
    });
  };

  return (
    <div className="group h-full">
      <div className="relative h-full overflow-hidden rounded-[24px] border border-[#f2d9df] bg-[#fffafc] p-4 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_-20px_rgba(192,82,100,0.4)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_transparent_55%)]" />
        <div className="relative">
          <Link href={`/productos/${product.slug}`} className="block">
            <div className="overflow-hidden rounded-[18px] bg-white/70">
              <Image
                src={resolveProductImage(product.imageUrl)}
                alt={product.name}
                width={600}
                height={600}
                className="h-56 w-full object-cover object-center transition duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div className="mt-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#c05264]/80">
                {product.type || 'Producto'}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="mt-2 text-sm text-gray-500">
                {product.description || 'Fórmula premium para cuidar tu piel con estilo y confianza.'}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-[#c05264]">{formatPrice(product.price)}</span>
                <span className="rounded-full border border-[#eec8d1] bg-[#fff0f4] px-3 py-1 text-xs font-medium text-[#c05264]">
                  Ver detalle
                </span>
              </div>
            </div>
          </Link>

          <button
            type="button"
            aria-label={`Agregar ${product.name} al carrito`}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#c05264] text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#a84354] disabled:cursor-not-allowed disabled:opacity-70"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};