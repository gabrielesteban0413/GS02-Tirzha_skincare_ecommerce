import { useState, useEffect } from 'react';
import { GetProductBySlugUseCase } from '../application/product/get-product-by-slug.use-case';

const useCase = new GetProductBySlugUseCase();

export function useProduct(slug: string) {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useCase.execute(slug).then(setProduct).finally(() => setLoading(false));
  }, [slug]);

  return { product, loading };
}