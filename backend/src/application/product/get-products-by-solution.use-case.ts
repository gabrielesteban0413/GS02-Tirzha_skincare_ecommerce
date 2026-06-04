import { ProductRepository } from '../../domain/ports/product.repository';

export class GetProductsBySolutionUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(solution: string) {
    return this.productRepo.findBySolution(solution);
  }
}