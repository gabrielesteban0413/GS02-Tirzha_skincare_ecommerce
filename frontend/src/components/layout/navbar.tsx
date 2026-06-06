"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { categorias } from "@/data/categories";
import { getSubcategoriaUrl } from "@/lib/url-utils";

const titleFont = Poppins({ weight: "700", subsets: ["latin"] });

type MenuItem =
  | { name: string; href: string; hasDropdown: false }
  | { name: string; hasDropdown: true; key: keyof typeof categorias };

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<keyof typeof categorias | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const menuItems: MenuItem[] = [
    { name: "HOME", href: "/", hasDropdown: false },
    { name: "PRODUCTOS", hasDropdown: true, key: "productos" },
    { name: "TRATAMIENTOS", hasDropdown: true, key: "tratamientos" },
    { name: "INFORMACION", hasDropdown: true, key: "informacion" },
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#fbe2e3] shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image
                src="/images/logo.png"
                alt="Tirzha Skincare"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className={`${titleFont.className} text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-gray-700" : "text-[#c05264]"
            }`}>
              TIRZHA SKINCARE
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2" ref={dropdownRef}>
            <nav
              className={`flex items-center gap-6 px-6 py-2 shadow-lg transition-all duration-300 ${
                isScrolled
                  ? "bg-[#fbe2e3] shadow-none"
                  : "bg-white/90 backdrop-blur-md rounded-full"
              }`}
            >
              {menuItems.map((item) => {
                if (!item.hasDropdown) {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-[#c05264] ${
                        isActive ? "text-[#c05264]" : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                }
                const category = categorias[item.key];
                if (!category) return null;
                const isOpen = openDropdown === item.key;
                const isActive = pathname.startsWith(`/${item.key}`);
                return (
                  <div key={item.name} className="relative">
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : item.key)}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#c05264] ${
                        isOpen || isActive ? "text-[#c05264]" : "text-gray-700"
                      }`}
                    >
                      {item.name}
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-fadeIn">
                        {category.subcategorias.map((sub) => (
                          <Link
                            key={sub}
                            href={getSubcategoriaUrl(item.key, sub)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-[#c05264] transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/carrito" className="text-gray-700 hover:text-[#c05264] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
              </svg>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-white pt-20 px-4 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => {
            if (!item.hasDropdown) {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 border-b border-gray-100 text-lg ${
                    isActive ? "text-[#c05264]" : "text-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              );
            }
            const category = categorias[item.key];
            if (!category) return null;
            return (
              <div key={item.name} className="border-b border-gray-100 pb-2">
                <div className="font-semibold text-gray-800 py-2">{item.name}</div>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {category.subcategorias.map((sub) => (
                    <Link
                      key={sub}
                      href={getSubcategoriaUrl(item.key, sub)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm text-gray-600 hover:text-[#c05264] py-1"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          <Link
            href="/carrito"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-800 py-2 border-b border-gray-100 text-lg"
          >
            Carrito
          </Link>
        </div>
      </div>

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