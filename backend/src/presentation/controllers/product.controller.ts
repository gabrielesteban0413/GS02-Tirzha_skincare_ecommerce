import { Request, Response } from 'express';
import { GetProductsByTypeUseCase } from '../../application/product/get-products-by-type.use-case';
import { GetProductsBySolutionUseCase } from '../../application/product/get-products-by-solution.use-case';
import { GetProductBySlugUseCase } from '../../application/product/get-product-by-slug.use-case';

export class ProductController {
  constructor(
    private getProductsByTypeUseCase: GetProductsByTypeUseCase,
    private getProductsBySolutionUseCase: GetProductsBySolutionUseCase,
    private getProductBySlugUseCase: GetProductBySlugUseCase,
  ) {}

  async getByType(req: Request, res: Response) {
    const type = req.params.type;
    const products = await this.getProductsByTypeUseCase.execute(type);
    res.json(products);
  }

  async getBySolution(req: Request, res: Response) {
    const solution = req.params.solution;
    const products = await this.getProductsBySolutionUseCase.execute(solution);
    res.json(products);
  }

  async getBySlug(req: Request, res: Response) {
    const product = await this.getProductBySlugUseCase.execute(req.params.slug);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  }
}