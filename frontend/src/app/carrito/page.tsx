"use client";

import Link from "next/link";
import {
  useCart,
  useClearCart,
  useRemoveFromCart,
  useUpdateCartItemQuantity,
} from "@/hooks/use-cart";

export default function CartPage() {
  const { data: cart, isLoading, isError } = useCart();
  const removeItem = useRemoveFromCart();
  const updateQuantity = useUpdateCartItemQuantity();
  const clearCart = useClearCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24">
        <p className="text-gray-500">Cargando carrito...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24">
        <p className="text-gray-500">No se pudo cargar el carrito. Intenta nuevamente más tarde.</p>
      </div>
    );
  }

  const items = cart?.items ?? [];
  const total = cart?.total ?? 0;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.32em] text-[#c05264] mb-3">Mi Carrito</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">Carrito de compras</h1>
          <p className="mt-4 text-gray-600 max-w-3xl text-sm md:text-base">
            Revisa los productos que agregaste y completa tu compra cuando estés listo.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center">
            <p className="text-lg text-gray-700">Tu carrito está vacío.</p>
            <Link href="/productos" className="inline-flex mt-6 rounded-full bg-[#c05264] px-6 py-3 text-white hover:bg-[#a84354] transition-colors">
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.productId} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{item.productName}</p>
                      <p className="mt-1 text-sm text-gray-500">Precio unitario: ${item.unitPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity.mutate({ productId: item.productId, quantity: Math.max(1, item.quantity - 1) })}
                        className="h-10 w-10 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="min-w-[36px] text-center text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity.mutate({ productId: item.productId, quantity: item.quantity + 1 })}
                        className="h-10 w-10 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem.mutate(item.productId)}
                        className="rounded-full border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Subtotal</p>
                      <p className="text-lg font-semibold text-gray-900">${item.subtotal.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">Total de tu pedido</p>
                <p className="text-3xl font-semibold text-gray-900">${total.toFixed(2)}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => clearCart.mutate()}
                  className="rounded-full border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50"
                >
                  Vaciar carrito
                </button>
                <Link href="/checkout" className="rounded-full bg-[#c05264] px-6 py-3 text-white hover:bg-[#a84354] transition-colors">
                  Finalizar compra
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
