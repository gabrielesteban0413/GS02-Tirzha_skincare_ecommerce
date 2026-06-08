// frontend/src/app/page.tsx
"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrendingStrip } from "@/components/home/TrendingStrip";
import { PremiumTreatments } from "@/components/home/PremiumTreatments";
import { FavoritesSection } from "@/components/home/FavoritesSection";
import { RecommendedSection } from "@/components/home/RecommendedSection";
import {
  HERO_CONTENT,
  TREATMENTS_CONTENT,
  FAVORITES_CONTENT,
  RECOMMENDED_CONTENT,
  FOOTER_CONTENT,
} from "@/data/home.content";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection {...HERO_CONTENT} />
      <TrendingStrip />
      <PremiumTreatments {...TREATMENTS_CONTENT} />
      <FavoritesSection {...FAVORITES_CONTENT} />
      <RecommendedSection {...RECOMMENDED_CONTENT} />
      <Footer {...FOOTER_CONTENT} />
    </main>
  );
}