"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { useProductsByType } from "@/hooks/use-products";
import { FOOTER_CONTENT } from "@/data/home.content";

const CATALOG_SECTIONS = [
  {
    key: "limpiadores",
    title: "LIMPIADORES",
    subtitle: "Cuidado suave y esencial para una limpieza impecable.",
    type: "limpiadores",
  },
  {
    key: "esencias",
    title: "ESENCIAS",
    subtitle: "Tratamientos ligeros para preparar y potenciar la piel.",
    type: "esencias",
  },
  {
    key: "exfoliantes",
    title: "EXFOLIANTES",
    subtitle: "Renovación suave para una piel más luminosa y uniforme.",
    type: "exfoliantes",
  },
  {
    key: "hidratantes",
    title: "HIDRATANTES",
    subtitle: "Fórmulas para nutrir, calmar y reforzar la barrera cutánea.",
    type: "hidratantes",
  },
  {
    key: "serums",
    title: "SUEROS",
    subtitle: "Concentrados premium para tratamientos y resultados visibles.",
    type: "sueros",
  },
  {
    key: "tonicos",
    title: "TÓNICOS",
    subtitle: "Balance y confort para cerrar cada rutina con armonía.",
    type: "tonicos",
  },
  {
    key: "contorno",
    title: "CONTORNO DE OJOS",
    subtitle: "Atención específica para la zona más delicada del rostro.",
    type: "contorno-de-ojos",
  },
  {
    key: "protectores",
    title: "PROTECTORES SOLARES",
    subtitle: "Protección diaria con confort, luminosidad y finish elegante.",
    type: "protectores-solares",
  },
  {
    key: "maquillaje",
    title: "MAQUILLAJE",
    subtitle: "Versatilidad y acabado impecable para cada ocasión.",
    type: "maquillaje",
  },
  {
    key: "mascarillas",
    title: "MASCARILLAS",
    subtitle: "Rituales de cuidado profundo para piel descansada y luminosa.",
    type: "mascarillas",
  },
  {
    key: "suplementos",
    title: "SUPLEMENTOS",
    subtitle: "Apoyo interno para una piel más fuerte y equilibrada.",
    type: "suplementos",
  },
  {
    key: "cabello",
    title: "TRATAMIENTO PARA CABELLO",
    subtitle: "Cuidado especializado para fortalecer y nutrir el cabello.",
    type: "tratamiento-para-cabello",
  },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const limpiadores = useProductsByType("limpiadores");
  const esencias = useProductsByType("esencias");
  const exfoliantes = useProductsByType("exfoliantes");
  const hidratantes = useProductsByType("hidratantes");
  const serums = useProductsByType("sueros");
  const tonicos = useProductsByType("tonicos");
  const contorno = useProductsByType("contorno-de-ojos");
  const protectores = useProductsByType("protectores-solares");
  const maquillaje = useProductsByType("maquillaje");
  const mascarillas = useProductsByType("mascarillas");
  const suplementos = useProductsByType("suplementos");
  const cabello = useProductsByType("tratamiento-para-cabello");

  const queries = {
    limpiadores,
    esencias,
    exfoliantes,
    hidratantes,
    serums,
    tonicos,
    contorno,
    protectores,
    maquillaje,
    mascarillas,
    suplementos,
    cabello,
  };

  const visibleSections = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return CATALOG_SECTIONS.map((section) => {
      const query = queries[section.key as keyof typeof queries];
      const allProducts = Array.isArray(query.data) ? query.data : [];
      const products = allProducts.filter((product: any) => {
        if (!normalizedSearch) return true;

        const haystack = [
          product?.name,
          product?.description,
          product?.type,
          product?.solution,
          product?.slug,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedSearch);
      });

      return {
        ...section,
        products: products.slice(0, 4),
        isLoading: query.isLoading,
      };
    });
  }, [search, queries]);

  const hasVisibleProducts = visibleSections.some((section) => section.products.length > 0);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(252,229,234,0.9),_transparent_45%),linear-gradient(135deg,_#fffdfd_0%,_#fff7f9_100%)] text-gray-800">
      <Navbar />

      <main className="relative overflow-hidden pt-24 md:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(192,82,100,0.08),_transparent_35%)]" />

        <section className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="rounded-[32px] border border-[#f2d6dc] bg-white/80 backdrop-blur-sm p-8 shadow-[0_25px_60px_-24px_rgba(192,82,100,0.35)] md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#c05264] font-semibold">Catálogo premium</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Encuentra cada producto en un solo lugar
                </h1>
                <p className="mt-4 text-base text-gray-600 sm:text-lg">
                  Explora rutinas completas, cuidados específicos y fórmulas elegidas con estilo y precisión.
                </p>
              </div>

              <div className="w-full max-w-xl rounded-[24px] border border-[#f0d8de] bg-[#fff8fa] p-4 shadow-sm">
                <label htmlFor="product-search" className="text-sm font-medium text-gray-700">
                  Busca tu producto ideal
                </label>
                <div className="mt-3 flex items-center gap-3 rounded-full border border-[#e9c9d0] bg-white px-4 py-3 shadow-inner">
                  <svg className="h-5 w-5 text-[#c05264]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    id="product-search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Ej. protector solar, contorno, serum..."
                    className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  {search
                    ? "Resultados filtrados para tu búsqueda actual."
                    : "Escribe el nombre del producto o el tipo de cuidado que buscas."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative max-w-7xl mx-auto px-4 pb-20">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#c05264]">Catálogo completo</p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
                {search ? "Resultados destacados" : "Todos los productos, organizados por categoría"}
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              {search ? "Mostramos hasta 4 productos por bloque." : "Cada bloque muestra 4 productos para una vista limpia y elegante."}
            </p>
          </div>

          {visibleSections.map((section) => (
            <div
              key={section.key}
              className="mb-8 rounded-[28px] border border-[#f1d9df] bg-white/90 p-6 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.2)] backdrop-blur transition-all duration-500 ease-out md:p-8"
            >
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{section.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{section.subtitle}</p>
                </div>
                <div className="rounded-full border border-[#f3d3da] bg-[#fff8fa] px-4 py-2 text-sm text-gray-600">
                  {section.isLoading ? "Cargando..." : `${section.products.length} producto${section.products.length === 1 ? "" : "s"}`}
                </div>
              </div>

              {section.isLoading ? (
                <div className="rounded-[20px] border border-dashed border-[#ecbec8] bg-[#fff8fa] p-10 text-center text-sm text-gray-500">
                  Cargando productos de esta categoría...
                </div>
              ) : section.products.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {section.products.map((product: any) => (
                    <ProductCard key={product.id || product.slug} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[20px] border border-dashed border-[#ecbec8] bg-[#fff8fa] p-10 text-center text-sm text-gray-500">
                  No hay productos para mostrar en esta categoría con el filtro actual.
                </div>
              )}
            </div>
          ))}

          {!hasVisibleProducts && search && (
            <div className="rounded-[24px] border border-dashed border-[#e7c8d0] bg-[#fff8fa] p-10 text-center text-sm text-gray-600">
              No encontramos productos para “{search}”. Prueba con otro nombre o una categoría diferente.
            </div>
          )}
        </section>
      </main>

      <Footer {...FOOTER_CONTENT} />
    </div>
  );
}
