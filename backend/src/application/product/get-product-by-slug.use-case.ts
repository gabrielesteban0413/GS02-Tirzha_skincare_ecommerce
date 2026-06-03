import { ProductRepository } from '../../domain/ports/product.repository';

export class GetProductBySlugUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(slug: string) {
    return this.productRepo.findBySlug(slug);
  }
}