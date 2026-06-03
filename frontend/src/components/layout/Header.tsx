'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ProductType,
  ProductTypeDisplay,
  SkinSolution,
  SkinSolutionDisplay,
} from '@skincare/core';

const productTypes = Object.values(ProductType || {});
const skinSolutions = Object.values(SkinSolution || {});

const infoLinks = [
  { label: 'Contacto', href: '/informacion/contacto' },
  { label: 'Preguntas Frecuentes', href: '/informacion/faq' },
  { label: 'Formas de Pago', href: '/informacion/formas-de-pago' },
  { label: 'Envíos y Devoluciones', href: '/informacion/envios-y-devoluciones' },
  { label: 'Tarjetas de Regalo', href: '/informacion/tarjetas-de-regalo' },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState<'type' | 'solution' | 'info' | null>(null);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          Skincare
        </Link>

        <nav className="hidden md:flex gap-6">
          {/* Tipo de Producto */}
          <div className="relative">
            <button
              className="font-medium hover:text-pink-600"
              onClick={() => setMenuOpen(menuOpen === 'type' ? null : 'type')}
            >
              Tipo de Producto
            </button>
            {menuOpen === 'type' && (
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md py-2 w-56 z-10">
                {productTypes.map((type) => (
                  <Link
                    key={type}
                    href={`/productos/tipo/${type}`}
                    className="block px-4 py-2 hover:bg-pink-50"
                  >
                    {ProductTypeDisplay[type as keyof typeof ProductTypeDisplay]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Soluciones */}
          <div className="relative">
            <button
              className="font-medium hover:text-pink-600"
              onClick={() => setMenuOpen(menuOpen === 'solution' ? null : 'solution')}
            >
              Soluciones
            </button>
            {menuOpen === 'solution' && (
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md py-2 w-56 z-10">
                {skinSolutions.map((solution) => (
                  <Link
                    key={solution}
                    href={`/productos/solucion/${solution}`}
                    className="block px-4 py-2 hover:bg-pink-50"
                  >
                    {SkinSolutionDisplay[solution as keyof typeof SkinSolutionDisplay]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Información */}
          <div className="relative">
            <button
              className="font-medium hover:text-pink-600"
              onClick={() => setMenuOpen(menuOpen === 'info' ? null : 'info')}
            >
              Información
            </button>
            {menuOpen === 'info' && (
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md py-2 w-56 z-10">
                {infoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 hover:bg-pink-50"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/rutinas"
                  className="block px-4 py-2 hover:bg-pink-50 font-semibold"
                >
                  Rutinas
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};