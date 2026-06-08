// frontend/src/components/home/TrendingStrip.tsx
"use client";

export function TrendingStrip() {
  return (
    <div className="relative py-3 md:py-4 overflow-hidden bg-[#c05264]">
      <div className="relative z-10 flex items-center justify-center gap-4 md:gap-8 animate-marquee whitespace-nowrap">
        {Array(30)
          .fill("NEW")
          .map((item, index) => (
            <span
              key={index}
              className="text-white/90 mx-2 md:mx-4 text-xs md:text-sm tracking-wider font-semibold inline-block"
            >
              ✦ {item} ✦
            </span>
          ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 15s;
          }
        }
      `}</style>
    </div>
  );
}