// NOTA: El carrito debe ser manejado por el servidor (backend).
// Los datos del carrito se obtienen y manejan mediante React Query hooks en `frontend/src/hooks/use-cart.ts`
// Este archivo se mantiene solo por compatibilidad con código existente.

// Para interactuar con el carrito, usa los hooks:
// - useCart(): Obtener carrito actual
// - useAddToCart(): Agregar item
// - useRemoveFromCart(): Eliminar item
// - useUpdateCartItemQuantity(): Actualizar cantidad
// - useClearCart(): Limpiar carrito

export const useCartStore = () => {
  throw new Error(
    'useCartStore is deprecated. Use hooks from frontend/src/hooks/use-cart.ts instead'
  );
};
