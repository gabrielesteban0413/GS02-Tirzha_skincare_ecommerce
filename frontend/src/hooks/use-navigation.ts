import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useNavigation() {
  const router = useRouter();

  const goToHome = useCallback(() => router.push("/"), [router]);
  const goToProducts = useCallback(() => router.push("/productos"), [router]);
  const goToAbout = useCallback(() => router.push("/about"), [router]);
  const goToCart = useCallback(() => router.push("/carrito"), [router]);
  const goToRoutines = useCallback(() => router.push("/rutinas"), [router]);
  const goToCheckout = useCallback(() => router.push("/checkout"), [router]);

  // Puedes agregar más según necesites

  return {
    goToHome,
    goToProducts,
    goToAbout,
    goToCart,
    goToRoutines,
    goToCheckout,
  };
}