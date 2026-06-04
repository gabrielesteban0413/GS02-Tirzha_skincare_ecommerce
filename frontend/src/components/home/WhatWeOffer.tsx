// frontend/src/components/home/WhatWeOffer.tsx
"use client";

interface WhatWeOfferProps {
  onExploreMore: () => void;
}

export function WhatWeOffer({ onExploreMore }: WhatWeOfferProps) {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          What we offer
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Our Serums Offer You Not Just Skincare, But An Experience.
        </p>
        <button
          onClick={onExploreMore}
          className="border border-gray-300 hover:border-gray-400 rounded-full px-10 py-3 transition-colors"
        >
          Explore More →
        </button>
      </div>
    </section>
  );
}