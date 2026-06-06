import { validate } from 'class-validator';
import { ProductRepository } from '../../domain/ports/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { GetProductsByTypeDto } from './dtos/get-products-by-type.dto';

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

    // Return empty array if no products found (not an error condition)
    return products || [];
  }
}