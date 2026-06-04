import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../../../domain/ports/product.repository';

const prisma = new PrismaClient();

export class ProductPrismaRepo implements ProductRepository {
  async findByType(type: string) {
    return prisma.product.findMany({ where: { type } });
  }

  async findBySolution(solution: string) {
    return prisma.product.findMany({ where: { solution } });
  }

  async findBySlug(slug: string) {
    return prisma.product.findUnique({ where: { slug } });
  }
}