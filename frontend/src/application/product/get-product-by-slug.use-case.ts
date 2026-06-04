import { productApi } from '../../infrastructure/api/product.api';

export class GetProductBySlugUseCase {
  async execute(slug: string) {
    return productApi.getBySlug(slug);
  }
}