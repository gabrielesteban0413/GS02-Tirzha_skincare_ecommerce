import { useState, useEffect } from 'react';
import { GetProductsByTypeUseCase } from '../application/product/get-products-by-type.use-case';
import { GetProductsBySolutionUseCase } from '../application/product/get-products-by-solution.use-case';

const typeUseCase = new GetProductsByTypeUseCase();
const solutionUseCase = new GetProductsBySolutionUseCase();

export function useProductsByType(type: string) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    typeUseCase.execute(type).then(setProducts).finally(() => setLoading(false));
  }, [type]);

  return { products, loading };
}

export function useProductsBySolution(solution: string) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    solutionUseCase.execute(solution).then(setProducts).finally(() => setLoading(false));
  }, [solution]);

  return { products, loading };
}