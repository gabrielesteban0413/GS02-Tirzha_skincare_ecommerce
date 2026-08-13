"use client";

import { useRef, useState, useEffect } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { useProductsByType } from "@/hooks/use-products";

export function ProductSection({ section, search }: { section: any; search: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  const query = useProductsByType(section.type, { enabled: inView || Boolean(search) });

  // Start fetching when section enters viewport or when user searches
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      });
    }, { rootMargin: '200px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // trigger fetch when inView or when search exists
  useEffect(() => {
    if (inView || (search && search.length > 0)) {
      // react-query hook already runs; nothing to do — relying on cache/staleTime
    }
  }, [inView, search]);

  const products = Array.isArray(query.data) ? query.data : [];
  const isLoading = query.isLoading;

  const visible = products
    .filter((p: any) => {
      if (!search) return true;
      const hay = [p.name, p.description, p.type, p.solution, p.slug].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(search.trim().toLowerCase());
    })
    .slice(0, 4);

  return (
    <div ref={ref} className="mb-8 rounded-[28px] border border-[#f1d9df] bg-white/90 p-6 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.2)] backdrop-blur transition-all duration-300 md:p-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">{section.title}</h3>
          <p className="mt-2 text-sm text-gray-500">{section.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-[#f3d3da] bg-[#fff8fa] px-4 py-2 text-sm text-gray-600">
            {isLoading ? "Cargando..." : `${visible.length} producto${visible.length === 1 ? '' : 's'}`}
          </div>
          <a href={`/productos/categoria/${section.key}`} className="rounded-full border border-[#e7c7cf] bg-white px-4 py-2 text-sm font-medium text-[#c05264] transition-all duration-300 hover:bg-[#fdf0f2]">Ver todos</a>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-[20px] border border-dashed border-[#ecbec8] bg-[#fff8fa] p-10 text-center text-sm text-gray-500">Cargando productos de esta categoría...</div>
      ) : visible.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visible.map((product: any) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] border border-dashed border-[#ecbec8] bg-[#fff8fa] p-10 text-center text-sm text-gray-500">No hay productos para mostrar en esta categoría con el filtro actual.</div>
      )}
    </div>
  );
}
