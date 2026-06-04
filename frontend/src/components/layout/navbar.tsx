// frontend/src/components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Datos de las 3 categorías principales con sus subcategorías
  const categorias = {
    productos: {
      nombre: "Productos",
      subcategorias: [
        "LIMPIADORES",
        "ESENCIAS",
        "EXFOLIANTES",
        "HIDRATANTES",
        "SUEROS",
        "TÓNICOS",
        "CONTORNO DE OJOS",
        "PROTECTORES SOLARES",
        "MAQUILLAJE",
        "MASCARILLAS",
        "SUPLEMENTOS",
        "TRATAMIENTO PARA CABELLO"
      ]
    },
    tratamientos: {
      nombre: "Tratamientos",
      subcategorias: [
        "ACLARANTES",
        "ANTI ENVEJECIMIENTO",
        "CONTROL DE ACNÉ",
        "CUIDADO DEL CABELLO",
        "IRRITACIÓN O ENROJECIMIENTO",
        "PIEL ROSACEA",
        "HIDRATACIÓN",
        "LUMINOSIDAD Y BRILLO",
        "MANCHAS & CICATRICES",
        "PUNTOS NEGROS",
        "PROTECCIÓN SOLAR",
        "SUPLEMENTOS"
      ]
    },
    informacion: {
      nombre: "Información",
      subcategorias: [
        "Rutinas",
        "Contacto",
        "Preguntas Frecuentes",
        "Formas de Pago",
        "Envíos y Devoluciones",
        "Tarjetas de Regalo"
      ]
    }
  };

  // Función para generar la URL de la subcategoría
  const getSubcategoriaUrl = (categoria: string, subcategoria: string) => {
    const subSlug = subcategoria.toLowerCase()
      .replace(/ & /g, "-")
      .replace(/Ó/g, "o")
      .replace(/É/g, "e")
      .replace(/ /g, "-");
    
    if (categoria === "productos") {
      return `/productos/tipo/${subSlug}`;
    } else if (categoria === "tratamientos") {
      return `/tratamientos/${subSlug}`;
    } else {
      return `/${subSlug.toLowerCase().replace(/ /g, "-")}`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
            : "bg-white/80 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              href="/" 
              className="group relative text-2xl font-bold tracking-tighter"
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Vitamin
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Desktop Navigation - 3 Botones con Dropdown */}
            <div className="hidden md:flex items-center gap-2" ref={dropdownRef}>
              {Object.entries(categorias).map(([key, categoria]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg flex items-center gap-1 ${
                      openDropdown === key
                        ? "text-amber-600 bg-amber-50"
                        : "text-gray-600 hover:text-amber-600 hover:bg-gray-50"
                    }`}
                  >
                    {categoria.nombre}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${openDropdown === key ? "rotate-180" : ""}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {openDropdown === key && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
                      <div className="py-2 max-h-96 overflow-y-auto">
                        {categoria.subcategorias.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={getSubcategoriaUrl(key, sub)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
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

            {/* Right Section - Search & Cart */}
            <div className="flex items-center gap-4">
              {/* Search Button */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="relative p-2 text-gray-600 hover:text-amber-600 transition-colors duration-300 group"
              >
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart Button */}
              <Link href="/carrito" className="relative p-2 text-gray-600 hover:text-amber-600 transition-colors duration-300 group">
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  0
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl mx-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4 border-b">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-3 text-lg focus:outline-none"
                  autoFocus
                />
              </div>
              <div className="p-4 text-sm text-gray-500">
                🔍 Busca por: limpiadores, hidratantes, serums, tratamientos...
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Menu con todas las categorías */}
      <div 
        className={`fixed top-0 left-0 right-0 bottom-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col p-4 space-y-2 overflow-y-auto h-full">
          {Object.entries(categorias).map(([key, categoria]) => (
            <div key={key} className="border-b border-gray-100 pb-2">
              <div className="font-semibold text-gray-800 px-4 py-2 text-sm uppercase tracking-wider">
                {categoria.nombre}
              </div>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {categoria.subcategorias.map((sub, idx) => (
                  <Link
                    key={idx}
                    href={getSubcategoriaUrl(key, sub)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors duration-200"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t my-4 pt-4">
            <Link
              href="/carrito"
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
              </svg>
              Mi Carrito
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay para mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Estilos adicionales */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}