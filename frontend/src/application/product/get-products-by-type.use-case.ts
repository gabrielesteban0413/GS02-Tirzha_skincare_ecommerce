import { productApi } from '../../infrastructure/api/product.api';

export class GetProductsByTypeUseCase {
  async execute(type: string) {
    return productApi.getByType(type);
  }
}