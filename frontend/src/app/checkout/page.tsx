"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { FOOTER_CONTENT } from "@/data/home.content";
import { useCart, useClearCart } from "@/hooks/use-cart";

const banks = [
  "Bancolombia",
  "Banco de Bogotá",
  "Davivienda",
  "BBVA Colombia",
  "Banco Popular",
];

export default function Checkout() {
  const { data: cart, isLoading, isError } = useCart();
  const clearCart = useClearCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    documentType: "CC",
    documentNumber: "",
    bank: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const items = cart?.items ?? [];
  const total = cart?.total ?? 0;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.bank) {
      setConfirmation("Selecciona un banco para continuar con tu pago PSE.");
      return;
    }

    setIsSubmitting(true);
    setConfirmation(null);

    await new Promise((resolve) => window.setTimeout(resolve, 800));

    clearCart.mutate();
    setConfirmation(
      `Tu pago con PSE ha sido registrado correctamente. Te redirigiremos al portal de ${formData.bank} para finalizar la transacción.`
    );
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,215,203,0.35),_transparent_55%)]">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-4 py-24 pt-32">
          <p className="text-gray-500">Cargando checkout...</p>
        </div>
        <Footer {...FOOTER_CONTENT} />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,215,203,0.35),_transparent_55%)]">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-4 py-24 pt-32">
          <p className="text-gray-500">No se pudo cargar tu pedido. Intenta nuevamente más tarde.</p>
        </div>
        <Footer {...FOOTER_CONTENT} />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,215,203,0.35),_transparent_55%)]">
        <Navbar />
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-24 pt-32 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-[#c05264]">Checkout</p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">Tu carrito está vacío</h1>
          <p className="mt-4 max-w-xl text-sm text-gray-600 sm:text-base">
            Agrega productos para continuar con el proceso de pago por PSE.
          </p>
          <Link
            href="/productos"
            className="mt-6 inline-flex rounded-full bg-[#c05264] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#a84354]"
          >
            Explorar productos
          </Link>
        </div>
        <Footer {...FOOTER_CONTENT} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,215,203,0.35),_transparent_55%)]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.32em] text-[#c05264]">Checkout</p>
          <h1 className="mt-3 text-4xl font-semibold text-gray-900 md:text-5xl">Finaliza tu compra con PSE</h1>
          <p className="mt-4 max-w-3xl text-sm text-gray-600 md:text-base">
            Completa tus datos y paga de forma segura desde tu banco preferido.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#f2d9d1] bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Datos del comprador</h2>
                <p className="mt-2 text-sm text-gray-500">Ingresa tus datos para generar la transacción PSE.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-gray-700">
                  <span className="mb-2 block font-medium">Nombre completo</span>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-200 px-4 py-3 outline-none ring-0 focus:border-[#c05264]"
                    placeholder="Tu nombre"
                  />
                </label>
                <label className="text-sm text-gray-700">
                  <span className="mb-2 block font-medium">Correo electrónico</span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-200 px-4 py-3 outline-none ring-0 focus:border-[#c05264]"
                    placeholder="correo@ejemplo.com"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-gray-700">
                  <span className="mb-2 block font-medium">Tipo de documento</span>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    className="w-full rounded-full border border-gray-200 px-4 py-3 outline-none focus:border-[#c05264]"
                  >
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="CE">Cédula de extranjería</option>
                    <option value="NIT">NIT</option>
                  </select>
                </label>
                <label className="text-sm text-gray-700">
                  <span className="mb-2 block font-medium">Número de documento</span>
                  <input
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-200 px-4 py-3 outline-none focus:border-[#c05264]"
                    placeholder="1234567890"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-gray-700">
                  <span className="mb-2 block font-medium">Teléfono</span>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-200 px-4 py-3 outline-none focus:border-[#c05264]"
                    placeholder="3001234567"
                  />
                </label>
                <label className="text-sm text-gray-700">
                  <span className="mb-2 block font-medium">Banco para PSE</span>
                  <select
                    name="bank"
                    value={formData.bank}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-200 px-4 py-3 outline-none focus:border-[#c05264]"
                  >
                    <option value="">Selecciona tu banco</option>
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block text-sm text-gray-700">
                <span className="mb-2 block font-medium">Dirección de entrega</span>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-[1.25rem] border border-gray-200 px-4 py-3 outline-none focus:border-[#c05264]"
                  placeholder="Ciudad, dirección y detalles"
                />
              </label>

              <div className="rounded-[1.25rem] border border-[#f2d9d1] bg-[#fff9f8] p-4 text-sm text-gray-600">
                <p className="font-medium text-gray-800">Pago seguro con PSE</p>
                <p className="mt-2">
                  Al confirmar, se generará la transacción para que pagues desde tu banca en línea o app móvil del banco seleccionado.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#c05264] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a84354] disabled:cursor-not-allowed disabled:bg-[#d79ca2]"
              >
                {isSubmitting ? "Procesando pago..." : "Pagar con PSE"}
              </button>
            </div>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-[#f2d9d1] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Resumen del pedido</h2>
              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between text-sm text-gray-600">
                    <span>{item.productName}</span>
                    <span>{item.quantity} × ${item.unitPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#f2d9d1] bg-[#fff9f8] p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">¿Qué incluye PSE?</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Pago desde tu banca en línea.</li>
                <li>• Confirmación inmediata de la transacción.</li>
                <li>• Compatibilidad con bancos nacionales.</li>
              </ul>
            </div>

            {confirmation && (
              <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                {confirmation}
              </div>
            )}
          </aside>
        </div>
      </div>
      <Footer {...FOOTER_CONTENT} />
    </main>
  );
}
