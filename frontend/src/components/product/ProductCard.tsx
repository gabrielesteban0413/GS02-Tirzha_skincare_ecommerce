import Link from 'next/link';

export const ProductCard = ({ product }: { product: any }) => (
  <Link href={`/productos/${product.slug}`}>
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">
        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
      </p>
    </div>
  </Link>
);