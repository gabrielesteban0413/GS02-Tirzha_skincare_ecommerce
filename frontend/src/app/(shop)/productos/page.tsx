"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductSection } from "@/components/product/ProductSection";
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
    key: "sueros",
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
    key: "contorno-de-ojos",
    title: "CONTORNO DE OJOS",
    subtitle: "Atención específica para la zona más delicada del rostro.",
    type: "contorno-de-ojos",
  },
  {
    key: "protectores-solares",
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
    key: "tratamiento-para-cabello",
    title: "TRATAMIENTO PARA CABELLO",
    subtitle: "Cuidado especializado para fortalecer y nutrir el cabello.",
    type: "tratamiento-para-cabello",
  },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  // Defer product fetching to individual ProductSection components to avoid
  // running many queries on initial render. Each section will fetch when
  // it enters the viewport or when a search is active.
  const visibleSections = CATALOG_SECTIONS;
  const hasVisibleProducts = true;

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
            <ProductSection key={section.key} section={section} search={search} />
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
