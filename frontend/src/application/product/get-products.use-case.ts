import { productApi } from '../../infrastructure/api/product.api';
import { Product, SkinSolution } from '@skincare/core';

export class GetProductsBySolutionUseCase {
  async execute(solution: SkinSolution): Promise<Product[]> {
    const products = await productApi.getBySolution(solution);
    return products.map(
      (p: any) =>
        new Product(p.id, p.name, p.slug, p.description, p.price, p.imageUrl, p.type, p.solution)
    );
  }
}