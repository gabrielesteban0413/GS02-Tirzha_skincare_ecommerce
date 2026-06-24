export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <p className="text-sm uppercase tracking-[0.32em] text-[#c05264] mb-3">Sobre Nosotros</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">Tirzha Skincare</h1>
        <p className="mt-6 text-gray-600 leading-relaxed text-sm md:text-base">
          En Tirzha trabajamos para que cada piel recupere equilibrio, luminosidad y salud real. Usamos ingredientes respaldados por la ciencia y rutinas pensadas para tus necesidades diarias.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 p-6 bg-[#fff7f5]">
            <h2 className="text-xl font-semibold text-gray-900">Nuestra misión</h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Crear soluciones de skincare accesibles, efectivas y sostenibles para todas las edades y tipos de piel.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 p-6 bg-[#fffaf8]">
            <h2 className="text-xl font-semibold text-gray-900">Qué hacemos</h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Desarrollamos productos con fórmulas suaves, texturas agradables y resultados visibles. Queremos que tu rutina sea un momento de cuidado real.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
