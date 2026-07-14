'use client';

import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApi, AddToCartPayload, Cart } from '@/infrastructure/api/cart.api';

const CART_STORAGE_KEY = 'tirzha-cart';

function createEmptyCart(): Cart {
  return {
    id: 'local-cart',
    userId: 'guest',
    items: [],
    total: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function normalizeCart(cart: Cart): Cart {
  const items = (cart?.items ?? []).map((item) => ({
    ...item,
    quantity: Number(item.quantity) || 0,
    unitPrice: Number(item.unitPrice) || 0,
    subtotal: Number(item.subtotal) || 0,
  }));

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    ...createEmptyCart(),
    ...cart,
    items,
    total,
  };
}

function readLocalCart(): Cart {
  if (typeof window === 'undefined') return createEmptyCart();

  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return createEmptyCart();

    const parsed = JSON.parse(saved) as Partial<Cart>;
    return normalizeCart({
      ...createEmptyCart(),
      ...parsed,
      items: Array.isArray(parsed.items) ? parsed.items : [],
    });
  } catch {
    return createEmptyCart();
  }
}

function writeLocalCart(cart: Cart) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizeCart(cart)));
}

function addOrUpdateLocalItem(existingCart: Cart, payload: AddToCartPayload): Cart {
  const existingItem = existingCart.items.find((item) => item.productId === payload.productId);
  const nextItems = existingItem
    ? existingCart.items.map((item) =>
        item.productId === payload.productId
          ? {
              ...item,
              quantity: item.quantity + payload.quantity,
              unitPrice: payload.unitPrice,
              subtotal: (item.quantity + payload.quantity) * payload.unitPrice,
            }
          : item
      )
    : [
        ...existingCart.items,
        {
          productId: payload.productId,
          productName: payload.productName,
          quantity: payload.quantity,
          unitPrice: payload.unitPrice,
          subtotal: payload.subtotal,
        },
      ];

  return normalizeCart({
    ...existingCart,
    items: nextItems,
  });
}

function updateLocalItem(existingCart: Cart, productId: string, quantity: number): Cart {
  const nextItems = existingCart.items
    .map((item) => {
      if (item.productId !== productId) return item;
      const nextQuantity = Math.max(0, quantity);
      return {
        ...item,
        quantity: nextQuantity,
        subtotal: nextQuantity * item.unitPrice,
      };
    })
    .filter((item) => item.quantity > 0);

  return normalizeCart({
    ...existingCart,
    items: nextItems,
  });
}

function removeLocalItem(existingCart: Cart, productId: string): Cart {
  return normalizeCart({
    ...existingCart,
    items: existingCart.items.filter((item) => item.productId !== productId),
  });
}

export function useCart() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const persisted = readLocalCart();
    queryClient.setQueryData(['cart'], persisted);
  }, [queryClient]);

  return useQuery<Cart>({
    queryKey: ['cart'],
    initialData: createEmptyCart(),
    queryFn: async () => {
      try {
        const cart = await cartApi.get();
        const normalized = normalizeCart(cart);
        writeLocalCart(normalized);
        return normalized;
      } catch {
        return readLocalCart();
      }
    },
    staleTime: 1 * 60 * 1000,
    retry: false,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation<Cart, Error, AddToCartPayload>({
    mutationFn: async (data) => {
      try {
        const cart = await cartApi.addItem(data);
        const normalized = normalizeCart(cart);
        writeLocalCart(normalized);
        return normalized;
      } catch {
        const fallback = addOrUpdateLocalItem(readLocalCart(), data);
        writeLocalCart(fallback);
        return fallback;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation<Cart, Error, string>({
    mutationFn: async (productId) => {
      try {
        const cart = await cartApi.removeItem(productId);
        const normalized = normalizeCart(cart);
        writeLocalCart(normalized);
        return normalized;
      } catch {
        const fallback = removeLocalItem(readLocalCart(), productId);
        writeLocalCart(fallback);
        return fallback;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
}

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  return useMutation<Cart, Error, { productId: string; quantity: number }>({
    mutationFn: async ({ productId, quantity }) => {
      try {
        const cart = await cartApi.updateItemQuantity(productId, quantity);
        const normalized = normalizeCart(cart);
        writeLocalCart(normalized);
        return normalized;
      } catch {
        const fallback = updateLocalItem(readLocalCart(), productId, quantity);
        writeLocalCart(fallback);
        return fallback;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      try {
        await cartApi.clear();
      } catch {
        // fallback local clear
      }

      const cleared = createEmptyCart();
      writeLocalCart(cleared);
      queryClient.setQueryData(['cart'], cleared);
      return;
    },
    onSuccess: () => {
      queryClient.setQueryData(['cart'], createEmptyCart());
    },
  });
}
