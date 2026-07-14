// frontend/src/components/layout/Footer.tsx
"use client";

import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
}

interface FooterProps {
  company: {
    name: string;
    description: string;
  };
  sections: FooterSection[];
  social: SocialLink[];
}

export function Footer({ company, sections, social }: FooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative text-white">
      <div
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(90deg, rgba(8, 8, 10, 0.76), rgba(15, 23, 42, 0.87)), url('/images/footer-bg.jpg')" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10vw] md:text-[8vw] lg:text-[6.5vw] font-extrabold tracking-tight text-white/10 select-none">TIRZAH SKINCARE</span>
          </div>
        </div>

        <div className="px-6 py-16 md:px-12 md:py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left area - CTA */}
            <div className="lg:col-span-1">
              <h2 className="text-sm uppercase tracking-widest text-[#f8d7db]">Tirzah Skincare</h2>

              <p className="mt-4 text-sm text-white/80 max-w-md">Cuidado de piel premium con ingredientes naturales y científicamente probados.</p>
              <div className="mt-6 flex items-center gap-4">
                <a href="/ofertas" className="btn-offers">Ver Ofertas</a>
                <a href="mailto:hello@tirzahskincare.com" className="text-sm text-white/90">hello@tirzahskincare.com</a>
              </div>
            </div>

            {/* Right area - Links columns */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold text-white/90 mb-3">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/60">© {currentYear} {company.name}. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>Privacy & Terms</span>
              <span>|</span>
              <span>+1 (234) 567-890</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
