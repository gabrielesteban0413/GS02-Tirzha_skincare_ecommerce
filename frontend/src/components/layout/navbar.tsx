// frontend/src/components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const categorias = {
    productos: {
      nombre: "Productos",
      subcategorias: [
        "LIMPIADORES", "ESENCIAS", "EXFOLIANTES", "HIDRATANTES",
        "SUEROS", "TÓNICOS", "CONTORNO DE OJOS", "PROTECTORES SOLARES",
        "MAQUILLAJE", "MASCARILLAS", "SUPLEMENTOS", "TRATAMIENTO PARA CABELLO"
      ]
    },
    tratamientos: {
      nombre: "Tratamientos",
      subcategorias: [
        "ACLARANTES", "ANTI ENVEJECIMIENTO", "CONTROL DE ACNÉ", "CUIDADO DEL CABELLO",
        "IRRITACIÓN O ENROJECIMIENTO", "PIEL ROSACEA", "HIDRATACIÓN",
        "LUMINOSIDAD Y BRILLO", "MANCHAS & CICATRICES", "PUNTOS NEGROS",
        "PROTECCIÓN SOLAR", "SUPLEMENTOS"
      ]
    },
    informacion: {
      nombre: "Información",
      subcategorias: [
        "Rutinas", "Contacto", "Preguntas Frecuentes",
        "Formas de Pago", "Envíos y Devoluciones", "Tarjetas de Regalo"
      ]
    }
  };

  const getSubcategoriaUrl = (categoria: string, subcategoria: string) => {
    const subSlug = subcategoria.toLowerCase()
      .replace(/ & /g, "-")
      .replace(/Ó/g, "o")
      .replace(/É/g, "e")
      .replace(/ /g, "-");
    
    if (categoria === "productos") return `/productos/tipo/${subSlug}`;
    if (categoria === "tratamientos") return `/productos/solucion/${subSlug}`;
    return `/${subSlug}`;
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-white/80 backdrop-blur-sm py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                TIRZHA SKINCARE
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {Object.entries(categorias).map(([key, categoria]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                      openDropdown === key ? "text-amber-600 bg-amber-50" : "text-gray-600 hover:text-amber-600"
                    }`}
                  >
                    {categoria.nombre}
                  </button>
                  {openDropdown === key && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border">
                      <div className="py-2 max-h-96 overflow-y-auto">
                        {categoria.subcategorias.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={getSubcategoriaUrl(key, sub)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-amber-50"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/carrito" className="p-2 text-gray-600 hover:text-amber-600">
                🛒
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
                ☰
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 md:hidden">
          <div className="p-4">
            {Object.entries(categorias).map(([key, categoria]) => (
              <div key={key} className="mb-4">
                <div className="font-semibold mb-2">{categoria.nombre}</div>
                {categoria.subcategorias.map((sub, idx) => (
                  <Link key={idx} href={getSubcategoriaUrl(key, sub)} className="block py-1 text-sm">
                    {sub}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}