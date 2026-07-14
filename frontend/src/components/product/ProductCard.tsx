import Image from 'next/image';
import Link from 'next/link';

const formatPrice = (price: number | string) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export const ProductCard = ({ product }: { product: any }) => (
  <Link href={`/productos/${product.slug}`} className="group block h-full">
    <div className="relative h-full overflow-hidden rounded-[24px] border border-[#f2d9df] bg-[#fffafc] p-4 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_-20px_rgba(192,82,100,0.4)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_transparent_55%)]" />
      <div className="relative">
        <div className="overflow-hidden rounded-[18px] bg-white/70">
          <Image
            src={product.imageUrl || '/images/products/placeholder.webp'}
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
      </div>
    </div>
  </Link>
);