import { PrismaClient, Product as PrismaProduct } from '@prisma/client';
import { ProductRepository } from '../../../domain/ports/product.repository';
import { Product } from '../../../domain/entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';

const prisma = new PrismaClient();

export class ProductPrismaRepo implements ProductRepository {
  async findByType(type: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        type: { equals: type, mode: 'insensitive' },
        isActive: true,
      },
    });
    return products.map((p: PrismaProduct) => ProductMapper.toDomain(p));
  }

  async findBySolution(solution: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        solution: { equals: solution, mode: 'insensitive' },
        isActive: true,
      },
    });
    return products.map((p: PrismaProduct) => ProductMapper.toDomain(p));
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { slug },
    });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async save(product: Product): Promise<void> {
    const data = ProductMapper.toPersistence(product);
    await prisma.product.update({
      where: { id: product.getId() },
      data,
    });
  }
}