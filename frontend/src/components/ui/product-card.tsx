// frontend/src/components/ui/product-card.tsx
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/productos/${product.id}`}>
      <div className="group cursor-pointer">
        <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-gray-500 text-sm">{product.name}</span>
          )}
        </div>
        <div className="text-center">
          <h3 className="font-medium text-sm md:text-base">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}