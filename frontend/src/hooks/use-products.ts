'use client';

import { useQuery } from '@tanstack/react-query';
import { productApi, Product } from '@/infrastructure/api/product.api';

export function useProductsByType(type: string) {
  return useQuery({
    queryKey: ['products', 'type', type],
    queryFn: () => productApi.getByType(type),
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: !!type, // Solo ejecutar si type existe
  });
}

export function useProductsBySolution(solution: string) {
  return useQuery({
    queryKey: ['products', 'solution', solution],
    queryFn: () => productApi.getBySolution(solution),
    staleTime: 5 * 60 * 1000,
    enabled: !!solution,
  });
}

export function useAllProducts(filters?: { type?: string; solution?: string }) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let products: Product[] = [];

      if (filters?.type) {
        products = await productApi.getByType(filters.type);
      } else if (filters?.solution) {
        products = await productApi.getBySolution(filters.solution);
      }

      return products;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!(filters?.type || filters?.solution),
  });
}