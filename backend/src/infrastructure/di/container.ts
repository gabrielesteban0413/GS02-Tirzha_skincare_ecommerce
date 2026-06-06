import 'reflect-metadata';
import { container } from 'tsyringe';

// Repositories
import { ProductPrismaRepo } from '../database/prisma/product.prisma.repo';
import { ProductRepository } from '../../domain/ports/product.repository';

// Use Cases - Product
import { GetProductsByTypeUseCase } from '../../application/product/get-products-by-type.use-case';
import { GetProductsBySolutionUseCase } from '../../application/product/get-products-by-solution.use-case';
import { GetProductBySlugUseCase } from '../../application/product/get-product-by-slug.use-case';

// Controllers
import { ProductController } from '../../presentation/controllers/product.controller';

export const setupDIContainer = () => {
  // REPOSITORIES
  container.registerSingleton<ProductRepository>('ProductRepository', ProductPrismaRepo);

  // USE CASES - Product
  container.registerSingleton(GetProductsByTypeUseCase);
  container.registerSingleton(GetProductsBySolutionUseCase);
  container.registerSingleton(GetProductBySlugUseCase);

  // CONTROLLERS
  container.registerSingleton(ProductController);

  return container;
};

export { container };
