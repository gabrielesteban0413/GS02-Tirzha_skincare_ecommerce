export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <p className="text-sm uppercase tracking-[0.32em] text-[#c05264] mb-3">Preguntas Frecuentes</p>
        <h1 className="text-4xl font-semibold text-gray-900">Preguntas frecuentes</h1>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border border-gray-200 bg-[#fff9f8] p-6">
            <h2 className="text-xl font-semibold text-gray-900">¿Cómo elijo el producto adecuado?</h2>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Revisa la descripción del producto y filtra por tipo o solución. Si tienes dudas, contáctanos para recibir una recomendación personalizada.
            </p>
          </section>
          <section className="rounded-3xl border border-gray-200 bg-[#fff9f8] p-6">
            <h2 className="text-xl font-semibold text-gray-900">¿Cuánto tarda el envío?</h2>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              El envío normal tarda entre 3 y 7 días hábiles. Consulta los detalles en nuestra sección de envíos y devoluciones.
            </p>
          </section>
          <section className="rounded-3xl border border-gray-200 bg-[#fff9f8] p-6">
            <h2 className="text-xl font-semibold text-gray-900">¿Puedo devolver un producto?</h2>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Sí, aceptamos devoluciones dentro del plazo indicado en nuestra política de envíos y devoluciones.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
