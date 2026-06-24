export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <p className="text-sm uppercase tracking-[0.32em] text-[#c05264] mb-3">Contacto</p>
        <h1 className="text-4xl font-semibold text-gray-900">Hablemos</h1>
        <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
          Si tienes dudas sobre nuestros productos o tu pedido, nuestro equipo está listo para ayudarte.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 p-6 bg-[#fff9f8]">
            <h2 className="text-xl font-semibold text-gray-900">Email</h2>
            <p className="mt-3 text-gray-600 text-sm">hola@tirzhaskincare.com</p>
          </div>
          <div className="rounded-3xl border border-gray-200 p-6 bg-[#fff9f8]">
            <h2 className="text-xl font-semibold text-gray-900">Teléfono</h2>
            <p className="mt-3 text-gray-600 text-sm">+52 55 1234 5678</p>
          </div>
        </div>
      </div>
    </main>
  );
}
