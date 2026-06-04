import os

root = r"C:\Users\Sanch\Downloads\REPO\GS02-Tirzha_skincare_ecommerce"

files = {
    # 1. Repositorio Prisma (agrega findBySlug)
    r"backend\src\infrastructure\database\prisma\product.prisma.repo.ts": """
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
""".strip(),

    # 2. Puerto del repositorio (agrega findBySlug)
    r"backend\src\domain\ports\product.repository.ts": """
export interface ProductRepository {
  findByType(type: string): Promise<any[]>;
  findBySolution(solution: string): Promise<any[]>;
  findBySlug(slug: string): Promise<any | null>;
}
""".strip(),

    # 3. Caso de uso para obtener producto por slug
    r"backend\src\application\product\get-product-by-slug.use-case.ts": """
import { ProductRepository } from '../../domain/ports/product.repository';

export class GetProductBySlugUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute(slug: string) {
    return this.productRepo.findBySlug(slug);
  }
}
""".strip(),

    # 4. Controlador de productos (actualizado con getBySlug)
    r"backend\src\presentation\controllers\product.controller.ts": """
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
""".strip(),

    # 5. Rutas (actualizado con la ruta de slug)
    r"backend\src\presentation\routes\index.ts": """
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
""".strip(),

    # 6. API del frontend (agrega getBySlug)
    r"frontend\src\infrastructure\api\product.api.ts": """
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const productApi = {
  getByType: async (type: string) => {
    const res = await fetch(`${API_URL}/products/type/${type}`);
    if (!res.ok) throw new Error('Error fetching products');
    return res.json();
  },
  getBySolution: async (solution: string) => {
    const res = await fetch(`${API_URL}/products/solution/${solution}`);
    if (!res.ok) throw new Error('Error fetching products');
    return res.json();
  },
  getBySlug: async (slug: string) => {
    const res = await fetch(`${API_URL}/products/${slug}`);
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },
};
""".strip(),

    # 7. Caso de uso del frontend para slug
    r"frontend\src\application\product\get-product-by-slug.use-case.ts": """
import { productApi } from '../../infrastructure/api/product.api';

export class GetProductBySlugUseCase {
  async execute(slug: string) {
    return productApi.getBySlug(slug);
  }
}
""".strip(),

    # 8. Hook useProduct
    r"frontend\src\hooks\use-product.ts": """
import { useState, useEffect } from 'react';
import { GetProductBySlugUseCase } from '../application/product/get-product-by-slug.use-case';

const useCase = new GetProductBySlugUseCase();

export function useProduct(slug: string) {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useCase.execute(slug).then(setProduct).finally(() => setLoading(false));
  }, [slug]);

  return { product, loading };
}
""".strip(),

    # 9. Página de detalle de producto
    r"frontend\src\app\(shop)\productos\[slug]\page.tsx": """
'use client';

import { useProduct } from '@/hooks/use-product';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const { product, loading } = useProduct(params.slug);

  if (loading) return <p className="p-8">Cargando...</p>;
  if (!product) return <p className="p-8">Producto no encontrado.</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-pink-600 mt-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mt-6">{product.description}</p>
          <button className="mt-8 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
""".strip(),
}

for rel_path, content in files.items():
    full_path = os.path.join(root, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Actualizado: {rel_path}")

print("\n🚀 Detalle de producto implementado. Ahora ejecuta:")
print("   Remove-Item -Recurse -Force frontend\\.next")
print("   pnpm dev")
print("   Luego visita http://localhost:3000/productos/tipo/limpiadores y haz clic en el producto.")