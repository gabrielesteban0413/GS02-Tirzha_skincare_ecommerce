"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { useProductsByType } from "@/hooks/use-products";
import { FOOTER_CONTENT } from "@/data/home.content";

const TREATMENT_META: Record<string, { title: string; description: string }> = {
  aclarantes: {
    title: "ACLARANTES",
    description: "Tratamientos concentrados para mejorar luminosidad y un tono más uniforme.",
  },
  "anti-envejecimiento": {
    title: "ANTI ENVEJECIMIENTO",
    description: "Fórmulas diseñadas para fortalecer, reafirmar y suavizar la piel madura.",
  },
  "control-de-acne": {
    title: "CONTROL DE ACNÉ",
    description: "Soluciones específicas para reducir brotes, limpiar poros y equilibrar la piel.",
  },
  "cuidado-del-cabello": {
    title: "CUIDADO DEL CABELLO",
    description: "Productos que nutren, fortifican y protegen la fibra capilar y el cuero cabelludo.",
  },
  "irritacion-o-enrojecimiento": {
    title: "IRRITACIÓN O ENROJECIMIENTO",
    description: "Fórmulas calmantes que ayudan a recuperar la comodidad y el equilibrio cutáneo.",
  },
  "piel-rosacea": {
    title: "PIEL ROSACEA",
    description: "Cuidado suave para reducir rojeces y proteger la piel sensible.",
  },
  hidratacion: {
    title: "HIDRATACIÓN",
    description: "Tratamientos que restauran la barrera cutánea y mantienen la piel fresca y confortable.",
  },
  "luminosidad-y-brillo": {
    title: "LUMINOSIDAD Y BRILLO",
    description: "Ingredientes que revitalizan la piel apagada y aportan un acabado radiante.",
  },
  "manchas-cicatrices": {
    title: "MANCHAS & CICATRICES",
    description: "Cuidado focalizado para mejorar el tono y la textura en zonas con imperfecciones.",
  },
  "puntos-negros": {
    title: "PUNTOS NEGROS",
    description: "Rutinas que ayudan a limpiar poros y reducir la apariencia de puntos negros.",
  },
  "proteccion-solar": {
    title: "PROTECCIÓN SOLAR",
    description: "Defensa diaria para proteger la piel de los daños UV y el fotoenvejecimiento.",
  },
  suplementos: {
    title: "SUPLEMENTOS",
    description: "Apoyo nutricional pensado para cuidar la piel desde adentro.",
  },
};

export default function TreatmentsPage() {
  const params = useParams<{ type: string }>();
  const type = params?.type ?? "";

  const meta = useMemo(() => {
    return TREATMENT_META[type] ?? {
      title: type.replace(/-/g, " ").toUpperCase(),
      description: "Descubre los productos ideales para este tratamiento y completa tu rutina con precisión.",
    };
  }, [type]);

  const { data: products = [], isLoading } = useProductsByType(type);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(252,229,234,0.9),_transparent_45%),linear-gradient(135deg,_#fffdfd_0%,_#fff7f9_100%)] text-gray-800">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 md:px-6 lg:px-8 lg:pt-32">
        <div className="rounded-[32px] border border-[#f2d6dc] bg-white/80 p-8 shadow-[0_25px_60px_-24px_rgba(192,82,100,0.35)] backdrop-blur md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#c05264] font-semibold">Tratamientos</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">{meta.title}</h1>
              <p className="mt-4 text-base text-gray-600">{meta.description}</p>
            </div>
            <Link href="/" className="inline-flex items-center justify-center rounded-full border border-[#e7c7cf] bg-[#fff8fa] px-5 py-2.5 text-sm font-medium text-[#c05264] transition-all duration-300 hover:bg-[#fdf0f2]">
              Volver al inicio
            </Link>
          </div>
        </div>

        <section className="mt-8 rounded-[28px] border border-[#f1d9df] bg-white/90 p-6 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.2)] backdrop-blur md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#c05264]">Resultados</p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900">{products.length} producto{products.length === 1 ? "" : "s"} disponibles</h2>
            </div>
            <p className="text-sm text-gray-500">Explora cada opción con más detalle y encuentra el tratamiento perfecto para tu piel.</p>
          </div>

          {isLoading ? (
            <div className="rounded-[20px] border border-dashed border-[#ecbec8] bg-[#fff8fa] p-10 text-center text-sm text-gray-500">
              Cargando productos de este tratamiento...
            </div>
          ) : products.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product: any) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-[#ecbec8] bg-[#fff8fa] p-10 text-center text-sm text-gray-500">
              Aún no hay productos para este tratamiento, pero la vista ya está preparada para cuando los agregues.
            </div>
          )}
        </section>
      </main>

      <Footer {...FOOTER_CONTENT} />
    </div>
  );
}
