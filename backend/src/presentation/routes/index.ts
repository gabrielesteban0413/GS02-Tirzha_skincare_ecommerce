import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { GetProductsByTypeUseCase } from '../../application/product/get-products-by-type.use-case';
import { GetProductsBySolutionUseCase } from '../../application/product/get-products-by-solution.use-case';
import { GetProductBySlugUseCase } from '../../application/product/get-product-by-slug.use-case';
import { ProductPrismaRepo } from '../../infrastructure/database/prisma/product.prisma.repo';

const router = Router();

const productRepo = new ProductPrismaRepo();
const getProductsByTypeUseCase = new GetProductsByTypeUseCase(productRepo);
const getProductsBySolutionUseCase = new GetProductsBySolutionUseCase(productRepo);
const getProductBySlugUseCase = new GetProductBySlugUseCase(productRepo);
const productController = new ProductController(
  getProductsByTypeUseCase,
  getProductsBySolutionUseCase,
  getProductBySlugUseCase,
);

router.get('/products/type/:type', (req, res) => productController.getByType(req, res));
router.get('/products/solution/:solution', (req, res) => productController.getBySolution(req, res));
router.get('/products/:slug', (req, res) => productController.getBySlug(req, res));

export default router;