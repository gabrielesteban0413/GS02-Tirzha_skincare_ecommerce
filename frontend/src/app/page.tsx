// frontend/src/app/page.tsx
"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrendingStrip } from "@/components/home/TrendingStrip";
import { PremiumTreatments } from "@/components/home/PremiumTreatments";
import dynamic from "next/dynamic";
const FavoritesSection = dynamic(() => import("@/components/home/FavoritesSection").then(mod => mod.FavoritesSection), { ssr: false, loading: () => <div className="py-16">Cargando...</div> });
// PersonalizedGuideSection removed per request
import { OffersConsultationSection } from "@/components/offers/OffersConsultationSection";
import {
  HERO_CONTENT,
  FAVORITES_CONTENT,
  TREATMENTS_CONTENT,
  FOOTER_CONTENT,
} from "@/data/home.content";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection {...HERO_CONTENT} />
      <TrendingStrip />
      <FavoritesSection {...FAVORITES_CONTENT} />
      <PremiumTreatments {...TREATMENTS_CONTENT} />
      <OffersConsultationSection />
      <a
        href="https://wa.me/+573003524615"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-floating"
        aria-label="Hablar por WhatsApp"
      >
        <Image src="/images/whatsapp-official.svg" alt="WhatsApp" width={40} height={40} className="block" />
      </a>
      <Footer {...FOOTER_CONTENT} />
    </main>
  );
}