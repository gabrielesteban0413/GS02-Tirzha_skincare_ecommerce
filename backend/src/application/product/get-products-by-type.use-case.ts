import { ProductRepository } from '../../domain/ports/product.repository';

export class GetProductsByTypeUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(type: string) {
    return this.productRepo.findByType(type);
  }
}