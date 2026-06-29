import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { FOOTER_CONTENT } from "@/data/home.content";

interface Section {
  title: string;
  content: string;
}

interface InfoPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
  cta?: {
    href: string;
    label: string;
  };
}

export function InfoPage({ eyebrow, title, intro, sections, cta }: InfoPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[rgba(251,215,203,0.4)] to-[rgba(255,191,207,0.4)]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">
        <section className="rounded-[2rem] border border-[#f2d9d1] bg-[#fff9f8] p-8 shadow-sm md:p-10">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c05264] font-semibold">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm sm:text-base leading-7 text-gray-600">
            {intro}
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2" aria-label="Contenido informativo">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.5rem] border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">{section.content}</p>
            </article>
          ))}
        </section>

        {cta && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={cta.href}
              className="rounded-full bg-[#c05264] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#a84354]"
            >
              {cta.label}
            </Link>
            <Link href="/" className="text-sm font-medium text-[#c05264] hover:text-[#a84354]">
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
      <Footer {...FOOTER_CONTENT} />
    </main>
  );
}
