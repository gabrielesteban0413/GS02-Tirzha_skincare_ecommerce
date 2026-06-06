'use client';

import { useQuery } from '@tanstack/react-query';
import { productApi, Product } from '@/infrastructure/api/product.api';

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['products', 'slug', slug],
    queryFn: () => productApi.getBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutos
    enabled: !!slug,
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: ['products', 'id', id],
    queryFn: async () => {
      // Nota: Necesitarías agregar un método en productApi.getById(id)
      // Por ahora, lanzamos un error
      throw new Error('useProductById no está implementado en el API');
    },
    enabled: !!id,
  });
}