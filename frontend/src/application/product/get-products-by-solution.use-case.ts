import { productApi } from '../../infrastructure/api/product.api';

export class GetProductsBySolutionUseCase {
  async execute(solution: string) {
    return productApi.getBySolution(solution);
  }
}