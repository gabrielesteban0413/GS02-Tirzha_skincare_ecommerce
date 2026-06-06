import { Product } from '../../domain/entities/product.entity';
import { ProductResponseDto } from '../dtos/product.response.dto';

export class ProductPresenterMapper {
  static toResponseDto(product: Product): ProductResponseDto {
    return new ProductResponseDto({
      id: product.getId(),
      name: product.getName(),
      slug: product.getSlug(),
      description: product.getDescription(),
      price: product.getPrice().getAmount(),
      stock: product.getStock().getQuantity(),
      imageUrl: product.getImageUrl(),
      type: product.getType(),
      solution: product.getSolution(),
      isActive: product.isProductActive(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt(),
    });
  }

  static toResponseDtoArray(products: Product[]): ProductResponseDto[] {
    return products.map((product) => this.toResponseDto(product));
  }
}
