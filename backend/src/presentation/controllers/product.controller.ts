import { Request, Response } from 'express';
import { GetProductsByTypeUseCase } from '../../application/product/get-products-by-type.use-case';
import { GetProductsBySolutionUseCase } from '../../application/product/get-products-by-solution.use-case';
import { GetProductBySlugUseCase } from '../../application/product/get-product-by-slug.use-case';
import { GetProductsByTypeDto } from '../../application/product/dtos/get-products-by-type.dto';
import { GetProductsBySolutionDto } from '../../application/product/dtos/get-products-by-solution.dto';
import { GetProductBySlugDto } from '../../application/product/dtos/get-product-by-slug.dto';
import { DomainError } from '../../domain/errors/domain.error';

export class ProductController {
  constructor(
    private getProductsByTypeUseCase: GetProductsByTypeUseCase,
    private getProductsBySolutionUseCase: GetProductsBySolutionUseCase,
    private getProductBySlugUseCase: GetProductBySlugUseCase
  ) {}

  async getByType(req: Request, res: Response): Promise<void> {
    try {
      const dto = new GetProductsByTypeDto();
      dto.type = String(req.params.type);

      const products = await this.getProductsByTypeUseCase.execute(dto);
      res.json(products);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getBySolution(req: Request, res: Response): Promise<void> {
    try {
      const dto = new GetProductsBySolutionDto();
      dto.solution = String(req.params.solution);

      const products = await this.getProductsBySolutionUseCase.execute(dto);
      res.json(products);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getBySlug(req: Request, res: Response): Promise<void> {
    try {
      const dto = new GetProductBySlugDto();
      dto.slug = String(req.params.slug);

      const product = await this.getProductBySlugUseCase.execute(dto);
      res.json(product);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response): void {
    if (error instanceof DomainError) {
      res.status(error.statusCode).json({
        code: error.code,
        message: error.message,
      });
    } else if (error instanceof Error) {
      res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: error.message,
      });
    } else {
      res.status(500).json({
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      });
    }
  }
}