import { validate } from 'class-validator';
import { ProductRepository } from '../../domain/ports/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { GetProductsByTypeDto } from './dtos/get-products-by-type.dto';
import { ProductNotFoundError } from '../../domain/errors/product-not-found.error';

export class GetProductsByTypeUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(dto: GetProductsByTypeDto): Promise<Product[]> {
    // Validate DTO
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.map((e) => e.toString()).join(', ')}`);
    }

    // Execute use case logic
    const products = await this.productRepo.findByType(dto.type);

    if (!products || products.length === 0) {
      throw new ProductNotFoundError(`type:${dto.type}`);
    }

    return products;
  }
}