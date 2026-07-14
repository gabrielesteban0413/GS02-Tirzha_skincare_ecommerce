import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryShowcase } from "@/components/category/CategoryShowcase";
import { FOOTER_CONTENT } from "@/data/home.content";
import { CATEGORY_PAGE_ITEMS } from "@/data/categories";

export const metadata: Metadata = {
  title: "Tratamientos premium | Tirzha Skincare",
  description:
    "Explora tratamientos premium para luminosidad, hidratación, protección, acné y más, organizados para construir una rutina completa.",
  alternates: {
    canonical: "/categorias",
  },
  openGraph: {
    title: "Tratamientos premium | Tirzha Skincare",
    description:
      "Descubre tratamientos premium organizados por necesidad y objetivo de cuidado facial.",
    type: "website",
    url: "/categorias",
  },
};

export default function CategoriasPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tratamientos premium | Tirzha Skincare",
    description:
      "Explora tratamientos premium para luminosidad, hidratación, protección, acné y más, organizados para construir una rutina completa.",
    url: "https://www.tirzhaskincare.com/categorias",
    hasPart: CATEGORY_PAGE_ITEMS.map((item) => ({
      "@type": "Thing",
      name: item.title,
      description: item.description,
    })),
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,215,203,0.35),_transparent_55%)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <CategoryShowcase
        title="Encuentra el tratamiento ideal para tu rutina."
        intro="Explora tratamientos pensados para luminosidad, hidratación, protección, acné y más, organizados por necesidad y objetivo de cuidado facial. Cada selección está pensada para ofrecerte una experiencia premium, visualmente atractiva y fácil de navegar."
        items={CATEGORY_PAGE_ITEMS}
      />
      <Footer {...FOOTER_CONTENT} />
    </main>
  );
}
