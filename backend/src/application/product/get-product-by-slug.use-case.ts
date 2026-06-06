import { validate } from 'class-validator';
import { ProductRepository } from '../../domain/ports/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { GetProductBySlugDto } from './dtos/get-product-by-slug.dto';
import { ProductNotFoundError } from '../../domain/errors/product-not-found.error';

export class GetProductBySlugUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(dto: GetProductBySlugDto): Promise<Product> {
    // Validate DTO
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.map((e) => e.toString()).join(', ')}`);
    }

    // Execute use case logic
    const product = await this.productRepo.findBySlug(dto.slug);

    if (!product) {
      throw new ProductNotFoundError(`slug:${dto.slug}`);
    }

    return product;
  }
}