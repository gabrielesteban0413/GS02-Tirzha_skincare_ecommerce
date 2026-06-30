// frontend/src/components/home/FeaturedProducts.tsx
"use client";

import Image from "next/image";
import { ProductCard } from "@/components/ui/product-card";
import type { Product } from "@/application/product/get-products.use-case";
import { motion } from "framer-motion";

interface FeaturedProductsProps {
  products: Product[];
  loading: boolean;
  error: unknown;
}

export function FeaturedProducts({ products, loading, error }: FeaturedProductsProps) {
  if (loading) return <div className="py-20 text-center">Cargando productos...</div>;
  if (error) {
    const message = typeof error === 'string' ? error : (error as any)?.message ?? String(error);
    return <div className="py-20 text-center text-red-500">Error: {message}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Best Sellers</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto my-4 rounded-full" />
          <p className="text-gray-500 max-w-md mx-auto">
            Discover our most loved products, chosen by thousands for radiant skin.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}