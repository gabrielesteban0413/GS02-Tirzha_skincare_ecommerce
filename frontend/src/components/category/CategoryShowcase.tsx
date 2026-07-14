"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CategoryPageItem } from "@/data/categories";

interface CategoryShowcaseProps {
  title: string;
  intro: string;
  items: CategoryPageItem[];
}

export function CategoryShowcase({ title, intro, items }: CategoryShowcaseProps) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="overflow-hidden rounded-[2rem] border border-[#f2d9d1] bg-[#fff9f8] shadow-sm">
        <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10 lg:p-12">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c05264]">
              Tratamientos premium
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
              {intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/productos"
                className="rounded-full bg-[#c05264] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#a84354]"
              >
                Explorar productos
              </Link>
              <Link
                href="/rutinas"
                className="rounded-full border border-[#c05264]/30 px-6 py-3 text-sm font-medium text-[#c05264] transition-all duration-300 hover:bg-[#fdf0f2]"
              >
                Ver rutinas
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative overflow-hidden rounded-[1.5rem] border border-[#f2d9d1] bg-white p-3 shadow-sm"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem]">
              <Image
                src="/images/categories/rutinas.webp"
                alt="Categorías de skincare premium Tirzha"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#ffd9de]">Colección</p>
                <h2 className="mt-2 text-2xl font-semibold">Soluciones pensadas para cada paso</h2>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <motion.article
            key={item.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c05264]">
                {item.badge}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex text-sm font-medium text-[#c05264] transition-all duration-300 group-hover:translate-x-1"
              >
                Ver productos →
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
