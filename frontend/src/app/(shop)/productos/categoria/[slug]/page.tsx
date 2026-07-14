"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { useProductsByType } from "@/hooks/use-products";
import { FOOTER_CONTENT } from "@/data/home.content";

const CATEGORY_META: Record<string, { title: string; description: string; type: string }> = {
  limpiadores: {
    title: "LIMPIADORES",
    description: "Limpieza suave y eficaz para preparar la piel con delicadeza y confort.",
    type: "limpiadores",
  },
  esencias: {
    title: "ESENCIAS",
    description: "Tratamientos ligeros que potencian y preparan la piel para el resto de la rutina.",
    type: "esencias",
  },
  exfoliantes: {
    title: "EXFOLIANTES",
    description: "Renovación suave para una piel más uniforme, luminosa y fresca.",
    type: "exfoliantes",
  },
  hidratantes: {
    title: "HIDRATANTES",
    description: "Fórmulas para nutrir, calmar y reforzar la barrera cutánea.",
    type: "hidratantes",
  },
  sueros: {
    title: "SUEROS",
    description: "Concentrados premium para tratamientos y resultados visibles.",
    type: "sueros",
  },
  tonicos: {
    title: "TÓNICOS",
    description: "Equilibrio y confort para cerrar cada rutina con armonía.",
    type: "tonicos",
  },
  "contorno-de-ojos": {
    title: "CONTORNO DE OJOS",
    description: "Atención específica para una de las zonas más delicadas del rostro.",
    type: "contorno-de-ojos",
  },
  "protectores-solares": {
    title: "PROTECTORES SOLARES",
    description: "Protección de alto confort para la piel en cada momento del día.",
    type: "protectores-solares",
  },
  maquillaje: {
    title: "MAQUILLAJE",
    description: "Acabados impecables y sofisticados para realzar tu belleza natural.",
    type: "maquillaje",
  },
  mascarillas: {
    title: "MASCARILLAS",
    description: "Rituales intensivos para una piel más descansada y luminosa.",
    type: "mascarillas",
  },
  suplementos: {
    title: "SUPLEMENTOS",
    description: "Apoyo interno para una piel más fuerte y equilibrada.",
    type: "suplementos",
  },
  "tratamiento-para-cabello": {
    title: "TRATAMIENTO PARA CABELLO",
    description: "Cuidado especializado para nutrir y fortalecer el cabello con estilo.",
    type: "tratamiento-para-cabello",
  },
};

export default function ProductCategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  const meta = useMemo(() => {
    return CATEGORY_META[slug] ?? {
      title: slug.replace(/-/g, " ").toUpperCase(),
      description: "Explora todos los productos de esta categoría en una sola vista.",
      type: slug,
    };
  }, [slug]);

  const { data: products = [], isLoading } = useProductsByType(meta.type);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(252,229,234,0.9),_transparent_45%),linear-gradient(135deg,_#fffdfd_0%,_#fff7f9_100%)] text-gray-800">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 md:px-6 lg:px-8 lg:pt-32">
        <div className="rounded-[32px] border border-[#f2d6dc] bg-white/80 p-8 shadow-[0_25px_60px_-24px_rgba(192,82,100,0.35)] backdrop-blur md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#c05264] font-semibold">Categoría</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">{meta.title}</h1>
              <p className="mt-4 text-base text-gray-600">{meta.description}</p>
            </div>
            <Link href="/productos" className="inline-flex items-center justify-center rounded-full border border-[#e7c7cf] bg-[#fff8fa] px-5 py-2.5 text-sm font-medium text-[#c05264] transition-all duration-300 hover:bg-[#fdf0f2]">
              Volver al catálogo
            </Link>
          </div>
        </div>

        <section className="mt-8 rounded-[28px] border border-[#f1d9df] bg-white/90 p-6 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.2)] backdrop-blur md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#c05264]">Todos los productos</p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900">{products.length} producto{products.length === 1 ? "" : "s"} disponibles</h2>
            </div>
            <p className="text-sm text-gray-500">Explora cada opción con más detalle y elige la que mejor se adapte a tu rutina.</p>
          </div>

          {isLoading ? (
            <div className="rounded-[20px] border border-dashed border-[#ecbec8] bg-[#fff8fa] p-10 text-center text-sm text-gray-500">
              Cargando productos de esta categoría...
            </div>
          ) : products.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product: any) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-[#ecbec8] bg-[#fff8fa] p-10 text-center text-sm text-gray-500">
              Aún no hay productos para esta categoría, pero la vista ya está preparada para cuando los agregues.
            </div>
          )}
        </section>
      </main>

      <Footer {...FOOTER_CONTENT} />
    </div>
  );
}
