import { validate } from 'class-validator';
import { ProductRepository } from '../../domain/ports/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { GetProductsBySolutionDto } from './dtos/get-products-by-solution.dto';

export class GetProductsBySolutionUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(dto: GetProductsBySolutionDto): Promise<Product[]> {
    // Validate DTO
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.map((e) => e.toString()).join(', ')}`);
    }

    // Execute use case logic
    const products = await this.productRepo.findBySolution(dto.solution);

    // Return empty array if no products found (not an error condition)
    return products || [];
  }
}