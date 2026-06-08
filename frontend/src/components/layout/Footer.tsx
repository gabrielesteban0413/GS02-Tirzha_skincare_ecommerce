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
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Content */}
      <div className="px-4 md:px-8 lg:px-16 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                {company.name}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                {company.description}
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {social.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#c05264] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-[#c05264] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-800 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
              © {currentYear} {company.name}. Todos los derechos reservados.
            </p>

            {/* Payment Methods (Optional) */}
            <div className="flex gap-3 items-center">
              <span className="text-xs text-gray-500">Métodos de pago:</span>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">
                  Tarjeta
                </span>
                <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">
                  Transferencia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
