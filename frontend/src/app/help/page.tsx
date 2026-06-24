export default function HelpPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <p className="text-sm uppercase tracking-[0.32em] text-[#c05264] mb-3">Centro de ayuda</p>
        <h1 className="text-4xl font-semibold text-gray-900">¿En qué podemos ayudarte?</h1>
        <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
          Encuentra respuestas rápidas sobre pedidos, envíos, devoluciones y más.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-[#fff9f8] p-6">
            <h2 className="text-lg font-semibold text-gray-900">Pedidos</h2>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Revisa el estado de tu orden o consulta tiempos de entrega.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-[#fff9f8] p-6">
            <h2 className="text-lg font-semibold text-gray-900">Devoluciones</h2>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              Aprende el proceso para devolver un producto y cómo recibir tu reembolso.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
