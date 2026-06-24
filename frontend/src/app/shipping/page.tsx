export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <p className="text-sm uppercase tracking-[0.32em] text-[#c05264] mb-3">Envíos y Devoluciones</p>
        <h1 className="text-4xl font-semibold text-gray-900">Envíos y devoluciones</h1>
        <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
          Ofrecemos envíos nacionales con seguimiento desde el momento en que tu pedido sale de nuestros almacenes.
        </p>
        <div className="mt-10 rounded-3xl border border-gray-200 bg-[#fff9f8] p-6">
          <h2 className="text-lg font-semibold text-gray-900">Política de devoluciones</h2>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Si no quedas satisfecho con tu compra, inicia una solicitud de devolución dentro de los 15 días posteriores a la recepción del pedido.
          </p>
        </div>
      </div>
    </main>
  );
}
