// frontend/src/app/page.tsx
"use client";

import { Button } from "@/components/ui/button";


import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrendingStrip />
      <FeaturedProducts />
      <WhatWeOffer />
    </main>
  );
}

// El resto de tus componentes (HeroSection, TrendingStrip, FeaturedProducts, WhatWeOffer) se mantienen igual

// Hero Section - Sin figuras
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-16 pt-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Texto */}
          <div className="space-y-6">
            <div>
              <span className="text-sm font-medium text-gray-400 tracking-wider">01</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
              Unlock Your
              <span className="block font-semibold mt-2">Skin's Natural Beauty</span>
            </h1>
            
            <p className="text-gray-500 leading-relaxed max-w-md">
              Welcome to the world of vitamin skincare, where we believe that beauty starts with 
              healthy, radiant skin. Our mission is simple yet transformative: to unlock your 
              skin's natural beauty potential.
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <span className="text-gray-500">Price</span>
              <span className="text-3xl font-semibold">$39.99</span>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3 transition-colors">
                Shop Now
              </button>
              <button className="border border-gray-300 hover:border-gray-400 rounded-full px-8 py-3 transition-colors">
                Learn More →
              </button>
            </div>
          </div>
          
          {/* Right Content - Vacío por ahora, para tu idea */}
          <div className="relative">
            {/* Aquí puedes agregar lo que tengas pensado */}
          </div>
        </div>
      </div>
    </section>
  );
}

// Trending Strip
function TrendingStrip() {
  const items = Array(30).fill("NEW");
  
  return (
    <div className="bg-black py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {items.map((item, index) => (
          <span key={index} className="text-white mx-4 text-sm tracking-wider font-medium inline-block">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// Featured Products
function FeaturedProducts() {
  const vitamins = [
    { name: "Vitamin", price: 49.99 },
    { name: "Vitamin", price: 49.99 },
    { name: "Vitamin", price: 49.99 },
    { name: "Vitamin", price: 49.99 },
    { name: "Vitamin", price: 49.99 },
    { name: "Vitamin", price: 49.99 }
  ];
  
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {vitamins.map((vitamin, index) => (
            <Link href={`/productos/${index + 1}`} key={index} className="group">
              <div className="text-center">
                <div className="aspect-square bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs text-amber-600">V</span>
                    </div>
                    <span className="text-xs text-gray-500">{vitamin.name}</span>
                  </div>
                </div>
                
                <h3 className="font-medium text-sm mb-1">{vitamin.name}</h3>
                <p className="text-gray-600 text-sm">${vitamin.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// What We Offer Section
function WhatWeOffer() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          What we offer
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Our Serums Offer You Not Just Skincare, But An Experience.
        </p>
        <button className="border border-gray-300 hover:border-gray-400 rounded-full px-10 py-3 transition-colors">
          Explore More →
        </button>
      </div>
    </section>
  );
}