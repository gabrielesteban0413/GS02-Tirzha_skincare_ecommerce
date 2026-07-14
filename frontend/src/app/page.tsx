// frontend/src/app/page.tsx
"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrendingStrip } from "@/components/home/TrendingStrip";
import { PremiumTreatments } from "@/components/home/PremiumTreatments";
import { FavoritesSection } from "@/components/home/FavoritesSection";
// PersonalizedGuideSection removed per request
import { OffersConsultationSection } from "@/components/offers/OffersConsultationSection";
import {
  HERO_CONTENT,
  TREATMENTS_CONTENT,
  FAVORITES_CONTENT,
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
      <OffersConsultationSection />
      <a
        href="https://wa.me/+573003524615"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-floating"
        aria-label="Hablar por WhatsApp"
      >
        <svg viewBox="0 0 448 512" className="h-7 w-7 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M380.9 97.1C339-5.4 229.5-28.1 145.5 21.6 62 70.8 25.2 170.9 54 264.8L32 448l188.7-22.3c95.7 34.9 200.6-11.5 232.1-101.6 28.9-83.9 6.2-193.4-71.9-227Z M224.6 338.3c-27.9 0-55.4-7.5-79.2-21.6l-5.7-3.4-46.9 5.5 12.5-45.8-3.8-6c-19.1-30.1-27.7-66.1-23.2-101.1 7-60.6 60.2-108.3 121.3-114.5 84.8-8.6 160.3 58.4 160.3 141.3 0 77.2-62 140-139.5 140Z M306.2 301.5c-4.9 13.8-28.3 26.4-39.1 28.1-10.6 1.6-23.7.9-60-14.5-46.7-19.3-76.8-66.9-79.3-70.5-2.6-3.6-21.6-28.1-21.6-53.6 0-25.4 13.5-35.6 18.3-40 4.8-4.4 10.5-5.5 14-5.5 3.5 0 6.8.1 9.8.1 3 .1 8.7-1.1 13.3 10 4.6 11.1 15 38.5 16.3 41.3 1.3 2.8 2.1 6.3-.6 10-2.7 3.7-4.1 5.9-7.5 9.6-3.4 3.7-7.1 8.2-10.1 11.1-3.1 3-6.3 6.4-3.9 12.2 2.5 5.8 11 19 23.4 30.7 16 15.2 29.4 20.6 41.6 26.2 13.5 6.2 26.1 5 31.8 4 5.7-1.1 28.5-11.6 32.6-22.9 4-11.3 4-21 2.8-22.9-1.3-1.9-4.8-2.8-9.7-4.9-4.9-2.1-28.8-11-33.7-12.2-4.9-1.2-8.5-1.8-12.2.7-3.7 2.5-14.2 11.4-17.6 13.9-3.4 2.5-6.8 2.8-11.7.8-4.9-2-21-7.8-39.4-24.4-18.4-16.6-30-37.6-33.5-45.6-3.5-8-1.2-12.1 1.9-14.3 3.1-2.2 9.2-6.7 13.9-9.6 4.7-2.9 9.4-5.1 13.4-6.5 4-1.5 9.2-2.8 18.5-1.8 9.3 1 56.8 19.5 66 22.8 9.2 3.3 15.4 4.9 17.6 7.6 2.2 2.7 2.2 15.7-2.7 29.5Z"/>
        </svg>
      </a>
      <Footer {...FOOTER_CONTENT} />
    </main>
  );
}