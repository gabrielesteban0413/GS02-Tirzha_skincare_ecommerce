export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <p className="text-sm uppercase tracking-[0.32em] text-[#c05264] mb-3">Política de Privacidad</p>
        <h1 className="text-4xl font-semibold text-gray-900">Privacidad y seguridad</h1>
        <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
          Nos comprometemos a proteger tu información personal y a usarla sólo con fines de mejora de tu experiencia de compra.
        </p>
        <div className="mt-10 rounded-3xl border border-gray-200 bg-[#fff9f8] p-6">
          <h2 className="text-lg font-semibold text-gray-900">Tu información está segura</h2>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            No vendemos tus datos y sólo compartimos información cuando es necesario para procesar pedidos o cuando la ley lo exige.
          </p>
        </div>
      </div>
    </main>
  );
}
