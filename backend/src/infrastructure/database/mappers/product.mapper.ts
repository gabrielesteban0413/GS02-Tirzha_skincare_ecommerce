import { Product as PrismaProduct } from '@prisma/client';
import { Product } from '../../../domain/entities/product.entity';
import { Money } from '../../../domain/value-objects/money.vo';
import { Stock } from '../../../domain/value-objects/stock.vo';

export class ProductMapper {
  static toDomain(raw: PrismaProduct): Product {
    return Product.restore(
      raw.id,
      raw.name,
      raw.slug,
      raw.description,
      Money.create(raw.price, 'COP'),
      Stock.create(raw.stock || 0),
      raw.type,
      raw.solution,
      raw.imageUrl,
      raw.createdAt,
      raw.updatedAt,
      raw.isActive !== false
    );
  }

  static toPersistence(
    product: Product
  ): {
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    type: string;
    solution: string;
    imageUrl: string;
    isActive: boolean;
    updatedAt: Date;
  } {
    return {
      name: product.getName(),
      slug: product.getSlug(),
      description: product.getDescription(),
      price: product.getPrice().getAmount(),
      stock: product.getStock().getQuantity(),
      type: product.getType(),
      solution: product.getSolution(),
      imageUrl: product.getImageUrl(),
      isActive: product.isProductActive(),
      updatedAt: product.getUpdatedAt(),
    };
  }
}
