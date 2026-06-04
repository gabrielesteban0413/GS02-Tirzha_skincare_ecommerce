// frontend/src/components/ui/product-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/productos/${product.slug}`}>
      <div
        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Contenedor de Imagen con Zoom */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-sm">Vitamin</span>
            </div>
          )}
          {/* Badge de Oferta Simulado */}
          <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-full z-10">
            -20%
          </div>
        </div>

        {/* Información del Producto */}
        <div className="p-4 text-center">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-amber-600 font-bold">${product.price}</span>
            <span className="text-gray-400 text-sm line-through">$62.99</span>
          </div>
          <button className="mt-3 w-full bg-gray-100 hover:bg-black hover:text-white text-gray-800 text-sm font-medium py-2 rounded-full transition-colors duration-300">
            Quick Shop
          </button>
        </div>
      </div>
    </Link>
  );
}