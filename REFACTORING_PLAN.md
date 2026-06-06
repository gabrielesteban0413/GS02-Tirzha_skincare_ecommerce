# 🏗️ PLAN DE REFACTORING - CLEAN ARCHITECTURE
## Tirzha Skincare Ecommerce

**Fecha**: 2026-06-05  
**Objetivo**: Restaurar Clean Architecture en backend y frontend  
**Estimado**: 8-12 horas (fases iterativas)

---

## 📋 ESTRUCTURA DEL PLAN

```
FASE 0: Preparación (0.5h)
│
FASE 1: BACKEND REFACTORING (4-6h)
├── 1.1 Enriquecer Domain Entities
├── 1.2 Implementar DI Container
├── 1.3 Mapeo Entity/Repository Pattern
├── 1.4 Errores de Dominio Específicos
└── 1.5 Validación en Application Layer
│
FASE 2: FRONTEND REFACTORING (2-4h)
├── 2.1 Eliminar carpeta /application
├── 2.2 Refactor Hooks con React Query
├── 2.3 Implementar API Clients
└── 2.4 Implementar Stores globales
│
FASE 3: Testing y Validación (1-2h)
└── Pruebas de build, despliegue local
```

---

## 🔧 FASE 0: PREPARACIÓN

### Paso 0.1: Crear rama de feature
```bash
git checkout -b refactor/clean-architecture
```

### Paso 0.2: Identificar archivos críticos
```
BACKEND:
- backend/src/domain/entities/
- backend/src/domain/errors/
- backend/src/domain/ports/
- backend/src/application/
- backend/src/infrastructure/di/
- backend/src/infrastructure/database/
- backend/src/presentation/

FRONTEND:
- frontend/src/application/       ← ELIMINAR
- frontend/src/hooks/
- frontend/src/infrastructure/api/
- frontend/src/stores/
```

---

## 🏛️ FASE 1: BACKEND REFACTORING

### FASE 1.1: Enriquecer Domain Entities

**Objetivo**: Las entidades deben contener lógica de negocio, no ser solo shells.

#### 1.1.1 User Entity
```typescript
// backend/src/domain/entities/user.entity.ts
export class User {
  private id: string;
  private email: Email;
  private name: string;
  private password: string;
  private createdAt: Date;

  constructor(email: Email, name: string, hashedPassword: string) {
    this.id = crypto.randomUUID();
    this.validateName(name);
    this.email = email;
    this.name = name;
    this.password = hashedPassword;
    this.createdAt = new Date();
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new InvalidUserNameError('Name must be at least 2 characters');
    }
  }

  static createFromDB(data: any): User {
    const user = new User(Email.create(data.email), data.name, data.password);
    user.id = data.id;
    user.createdAt = data.createdAt;
    return user;
  }

  getId(): string { return this.id; }
  getEmail(): Email { return this.email; }
  getName(): string { return this.name; }
  getPassword(): string { return this.password; }
  getCreatedAt(): Date { return this.createdAt; }
}
```

#### 1.1.2 Product Entity
```typescript
// backend/src/domain/entities/product.entity.ts
export class Product {
  private id: string;
  private name: string;
  private slug: string;
  private price: Money;
  private stock: Stock;
  private description: string;
  private category: ProductCategory;
  private type: ProductType;
  private solution: ProductSolution;
  private isActive: boolean;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    name: string,
    slug: string,
    price: Money,
    stock: Stock,
    description: string,
    category: ProductCategory,
  ) {
    this.id = crypto.randomUUID();
    this.validateProduct(name, slug, description);
    this.name = name;
    this.slug = slug;
    this.price = price;
    this.stock = stock;
    this.description = description;
    this.category = category;
    this.isActive = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  private validateProduct(name: string, slug: string, desc: string): void {
    if (!name || name.trim().length < 3) {
      throw new InvalidProductNameError();
    }
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      throw new InvalidProductSlugError();
    }
    if (!desc || desc.trim().length < 10) {
      throw new InvalidProductDescriptionError();
    }
  }

  reduceStock(quantity: number): void {
    if (quantity <= 0) {
      throw new InvalidQuantityError();
    }
    if (!this.stock.canReduce(quantity)) {
      throw new OutOfStockError(this.id, quantity, this.stock.getQuantity());
    }
    this.stock = this.stock.reduce(quantity);
    this.updatedAt = new Date();
  }

  increaseStock(quantity: number): void {
    if (quantity <= 0) throw new InvalidQuantityError();
    this.stock = this.stock.increase(quantity);
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  isAvailable(): boolean {
    return this.isActive && this.stock.getQuantity() > 0;
  }

  // Getters
  getId(): string { return this.id; }
  getName(): string { return this.name; }
  getSlug(): string { return this.slug; }
  getPrice(): Money { return this.price; }
  getStock(): Stock { return this.stock; }
  // ... etc
}
```

#### 1.1.3 Order Entity
```typescript
// backend/src/domain/entities/order.entity.ts
export class Order {
  private id: string;
  private userId: string;
  private items: OrderItem[] = [];
  private total: Money;
  private status: OrderStatus;
  private shippingAddress: Address;
  private createdAt: Date;
  private paidAt: Date | null;
  private shippedAt: Date | null;

  constructor(userId: string, shippingAddress: Address) {
    this.id = crypto.randomUUID();
    this.userId = userId;
    this.shippingAddress = shippingAddress;
    this.status = OrderStatus.PENDING;
    this.createdAt = new Date();
    this.total = Money.create(0, 'USD');
  }

  addItem(item: OrderItem): void {
    if (!item.isValid()) {
      throw new InvalidOrderItemError();
    }
    const existingItem = this.items.find(i => i.getProductId() === item.getProductId());
    if (existingItem) {
      throw new DuplicateOrderItemError();
    }
    this.items.push(item);
    this.recalculateTotal();
  }

  removeItem(productId: string): void {
    const index = this.items.findIndex(i => i.getProductId() === productId);
    if (index === -1) throw new OrderItemNotFoundError();
    this.items.splice(index, 1);
    this.recalculateTotal();
  }

  private recalculateTotal(): void {
    this.total = this.items.reduce(
      (acc, item) => acc.add(item.getSubtotal()),
      Money.create(0, 'USD')
    );
  }

  canBePaid(): boolean {
    return this.status === OrderStatus.PENDING && this.items.length > 0;
  }

  markAsPaid(): void {
    if (!this.canBePaid()) {
      throw new OrderCannotBePaidError();
    }
    this.status = OrderStatus.PAID;
    this.paidAt = new Date();
  }

  markAsShipped(): void {
    if (this.status !== OrderStatus.PAID) {
      throw new OrderNotPaidError();
    }
    this.status = OrderStatus.SHIPPED;
    this.shippedAt = new Date();
  }

  // Getters
  getId(): string { return this.id; }
  getUserId(): string { return this.userId; }
  getItems(): OrderItem[] { return [...this.items]; }
  getTotal(): Money { return this.total; }
  getStatus(): OrderStatus { return this.status; }
  // ... etc
}
```

#### Tareas 1.1:
- [ ] Crear `backend/src/domain/entities/user.entity.ts` (con validación)
- [ ] Enriquecer `backend/src/domain/entities/product.entity.ts` (métodos de negocio)
- [ ] Crear `backend/src/domain/entities/order.entity.ts` (completo)
- [ ] Crear `backend/src/domain/entities/cart.entity.ts`
- [ ] Crear Value Objects: `Money.ts`, `Email.ts`, `Stock.ts`, `Address.ts`, `OrderStatus.ts`

---

### FASE 1.2: Implementar DI Container

**Objetivo**: Centralizar la inyección de dependencias usando un contenedor (tsyringe o similar).

#### 1.2.1 Instalar tsyringe
```bash
pnpm add tsyringe
```

#### 1.2.2 Crear contenedor
```typescript
// backend/src/infrastructure/di/container.ts
import 'reflect-metadata';
import { Container } from 'tsyringe';

// Repositories
import { ProductPrismaRepository } from '../database/prisma/product.prisma.repository';
import { UserPrismaRepository } from '../database/prisma/user.prisma.repository';
import { OrderPrismaRepository } from '../database/prisma/order.prisma.repository';
import { CartPrismaRepository } from '../database/prisma/cart.prisma.repository';

// Use Cases
import { GetProductsByTypeUseCase } from '../../application/product/get-products-by-type.use-case';
import { GetProductBySlugUseCase } from '../../application/product/get-product-by-slug.use-case';
import { CreateOrderUseCase } from '../../application/order/create-order.use-case';
import { RegisterUserUseCase } from '../../application/auth/register.use-case';
import { LoginUserUseCase } from '../../application/auth/login.use-case';

// Controllers
import { ProductController } from '../../presentation/controllers/product.controller';
import { AuthController } from '../../presentation/controllers/auth.controller';
import { OrderController } from '../../presentation/controllers/order.controller';

export const setupDIContainer = (): Container => {
  const container = new Container();

  // REPOSITORIES
  container.registerSingleton('ProductRepository', ProductPrismaRepository);
  container.registerSingleton('UserRepository', UserPrismaRepository);
  container.registerSingleton('OrderRepository', OrderPrismaRepository);
  container.registerSingleton('CartRepository', CartPrismaRepository);

  // USE CASES
  container.registerSingleton(GetProductsByTypeUseCase);
  container.registerSingleton(GetProductBySlugUseCase);
  container.registerSingleton(CreateOrderUseCase);
  container.registerSingleton(RegisterUserUseCase);
  container.registerSingleton(LoginUserUseCase);

  // CONTROLLERS
  container.registerSingleton(ProductController);
  container.registerSingleton(AuthController);
  container.registerSingleton(OrderController);

  return container;
};

export const container = setupDIContainer();
```

#### 1.2.3 Actualizar routes
```typescript
// backend/src/presentation/routes/index.ts
import 'reflect-metadata';
import { Router } from 'express';
import { container } from '../../../infrastructure/di/container';
import { ProductController } from '../controllers/product.controller';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

// Resolver controllers desde contenedor
const productController = container.resolve(ProductController);
const authController = container.resolve(AuthController);

// Routes
router.get('/products/type/:type', (req, res) => 
  productController.getByType(req, res)
);

router.get('/products/slug/:slug', (req, res) => 
  productController.getBySlug(req, res)
);

router.post('/auth/register', (req, res) => 
  authController.register(req, res)
);

export default router;
```

#### Tareas 1.2:
- [ ] Instalar y configurar tsyringe
- [ ] Crear `backend/src/infrastructure/di/container.ts`
- [ ] Registrar todos los repositorios
- [ ] Registrar todos los use cases
- [ ] Registrar todos los controllers
- [ ] Actualizar `backend/src/presentation/routes/index.ts`
- [ ] Verificar que no haya más instancias manuales

---

### FASE 1.3: Mapeo Entity/Repository Pattern

**Objetivo**: Los repositorios deben convertir datos Prisma → Entidades del dominio.

#### 1.3.1 Crear Mappers
```typescript
// backend/src/infrastructure/database/mappers/product.mapper.ts
import { Product as PrismaProduct } from '@prisma/client';
import { Product } from '../../../domain/entities/product.entity';
import { Money } from '../../../domain/value-objects/money';
import { Stock } from '../../../domain/value-objects/stock';

export class ProductMapper {
  static toDomain(raw: PrismaProduct): Product {
    // Convertir datos Prisma a Entity del dominio
    const product = new Product(
      raw.name,
      raw.slug,
      Money.create(Number(raw.price), 'USD'),
      Stock.create(raw.stock),
      raw.description,
      raw.category as ProductCategory,
    );

    // Restaurar atributos privados si es necesario
    (product as any).id = raw.id;
    (product as any).createdAt = raw.createdAt;
    (product as any).updatedAt = raw.updatedAt;
    (product as any).isActive = raw.isActive;

    return product;
  }

  static toPersistence(product: Product): Omit<PrismaProduct, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      name: product.getName(),
      slug: product.getSlug(),
      price: product.getPrice().getAmount().toString(),
      stock: product.getStock().getQuantity(),
      description: product.getDescription(),
      category: product.getCategory(),
      type: product.getType(),
      solution: product.getSolution(),
      isActive: product.isAvailable(),
    };
  }
}
```

#### 1.3.2 Actualizar Repositorio
```typescript
// backend/src/infrastructure/database/prisma/product.prisma.repository.ts
import { injectable } from 'tsyringe';
import { ProductRepository } from '../../../domain/ports/product.repository';
import { Product } from '../../../domain/entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';
import { prisma } from './client';

@injectable()
export class ProductPrismaRepository implements ProductRepository {
  async findByType(type: string): Promise<Product[]> {
    const products = await prisma.product.findMany({ where: { type } });
    return products.map(p => ProductMapper.toDomain(p));
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { slug } });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { id } });
    return product ? ProductMapper.toDomain(product) : null;
  }

  async save(product: Product): Promise<void> {
    await prisma.product.update({
      where: { id: product.getId() },
      data: ProductMapper.toPersistence(product),
    });
  }
}
```

#### Tareas 1.3:
- [ ] Crear `backend/src/infrastructure/database/mappers/product.mapper.ts`
- [ ] Crear `backend/src/infrastructure/database/mappers/user.mapper.ts`
- [ ] Crear `backend/src/infrastructure/database/mappers/order.mapper.ts`
- [ ] Actualizar todos los repositorios Prisma con mappers
- [ ] Asegurar que repos devuelven entidades, no datos crudos

---

### FASE 1.4: Errores de Dominio Específicos

**Objetivo**: Errores con contexto y código específico para cada caso.

#### 1.4.1 Base Error
```typescript
// backend/src/domain/errors/domain.error.ts
export abstract class DomainError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  abstract readonly context?: Record<string, any>;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}
```

#### 1.4.2 Errores Específicos
```typescript
// backend/src/domain/errors/product.errors.ts
import { DomainError } from './domain.error';

export class OutOfStockError extends DomainError {
  readonly code = 'OUT_OF_STOCK';
  readonly statusCode = 400;

  constructor(
    private productId: string,
    private requestedQty: number,
    private availableQty: number
  ) {
    super(
      `Product ${productId} out of stock. Requested: ${requestedQty}, Available: ${availableQty}`
    );
    Object.setPrototypeOf(this, OutOfStockError.prototype);
  }

  getContext() {
    return {
      productId: this.productId,
      requestedQty: this.requestedQty,
      availableQty: this.availableQty,
    };
  }
}

export class ProductNotFoundError extends DomainError {
  readonly code = 'PRODUCT_NOT_FOUND';
  readonly statusCode = 404;

  constructor(productId: string) {
    super(`Product with ID ${productId} not found`);
    Object.setPrototypeOf(this, ProductNotFoundError.prototype);
  }
}

export class InvalidProductError extends DomainError {
  readonly code = 'INVALID_PRODUCT';
  readonly statusCode = 400;

  constructor(reason: string) {
    super(`Product validation failed: ${reason}`);
    Object.setPrototypeOf(this, InvalidProductError.prototype);
  }
}
```

#### Tareas 1.4:
- [ ] Crear `backend/src/domain/errors/domain.error.ts` (base)
- [ ] Crear `backend/src/domain/errors/product.errors.ts`
- [ ] Crear `backend/src/domain/errors/user.errors.ts`
- [ ] Crear `backend/src/domain/errors/order.errors.ts`
- [ ] Crear middleware de error handling en presentation

---

### FASE 1.5: Validación en Application Layer

**Objetivo**: Validar entrada en use cases, no en controllers.

#### 1.5.1 DTO y Validation
```typescript
// backend/src/application/product/dtos/get-products-by-type.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class GetProductsByTypeDto {
  @IsString()
  @IsNotEmpty()
  type: string;
}

// backend/src/application/product/get-products-by-type.use-case.ts
import { injectable } from 'tsyringe';
import { validate } from 'class-validator';
import { Product } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/ports/product.repository';
import { InvalidProductTypeError } from '../../../domain/errors/product.errors';

@injectable()
export class GetProductsByTypeUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(dto: GetProductsByTypeDto): Promise<Product[]> {
    // Validar DTO
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new InvalidProductTypeError('Invalid product type');
    }

    // Lógica de negocio
    const products = await this.productRepository.findByType(dto.type);

    if (products.length === 0) {
      throw new ProductNotFoundError(dto.type);
    }

    return products;
  }
}
```

#### 1.5.2 Controller simplificado
```typescript
// backend/src/presentation/controllers/product.controller.ts
import { Controller, Get, Param, Inject } from 'express';
import { GetProductsByTypeUseCase } from '../../application/product/get-products-by-type.use-case';
import { GetProductsByTypeDto } from '../../application/product/dtos/get-products-by-type.dto';
import { DomainError } from '../../domain/errors/domain.error';

export class ProductController {
  constructor(
    private getProductsByTypeUseCase: GetProductsByTypeUseCase
  ) {}

  async getByType(req: Request, res: Response): Promise<void> {
    try {
      const dto = { type: req.params.type };
      const products = await this.getProductsByTypeUseCase.execute(dto);
      res.json(products);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(error.statusCode).json({
          code: error.code,
          message: error.message,
          context: error.context,
        });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
```

#### Tareas 1.5:
- [ ] Instalar `class-validator` y `class-transformer`
- [ ] Crear DTOs para todos los use cases
- [ ] Mover validación a use cases
- [ ] Simplificar controllers (solo HTTP handling)
- [ ] Crear middleware de error handling global

---

## 🎨 FASE 2: FRONTEND REFACTORING

### FASE 2.1: Eliminar carpeta /application

**Objetivo**: El frontend NO necesita use cases. Solo necesita servicios de API.

#### 2.1.1 Estructura correcta del frontend
```
frontend/src/
├── app/                    ← Next.js app router
├── components/             ← Componentes React
├── hooks/                  ← Custom hooks (sin use cases)
├── infrastructure/
│   ├── api/               ← API clients (AQUÍ va la "aplicación")
│   ├── analytics/
│   └── storage/
├── stores/                 ← Zustand global state
├── lib/                    ← Utilidades
├── types/                  ← Tipos TypeScript
└── constants/

❌ ELIMINAR:
├── application/            ← ESTO NO DEBE EXISTIR EN FRONTEND
```

#### 2.1.2 Plan de eliminación
```bash
# 1. Respaldar la carpeta (por si acaso)
cp -r frontend/src/application frontend/src/application.backup

# 2. Crear archivos para reemplazar use cases
mkdir -p frontend/src/infrastructure/api

# 3. Copiar la lógica API a servicios
# (Los detalles están en 2.3)

# 4. Actualizar los hooks
# (Los detalles están en 2.2)

# 5. Eliminar
rm -rf frontend/src/application
```

#### Tareas 2.1:
- [ ] Crear `frontend/src/infrastructure/api/` servicios
- [ ] Actualizar todos los imports en hooks
- [ ] Verificar que no hay más referencias a `/application`
- [ ] Eliminar `frontend/src/application/`

---

### FASE 2.2: Refactor Hooks con React Query

**Objetivo**: Hooks que usan React Query (no instanciación de use cases).

#### 2.2.1 Instalar React Query
```bash
pnpm add @tanstack/react-query
```

#### 2.2.2 Crear hooks correctos
```typescript
// frontend/src/hooks/use-products-by-type.ts
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../infrastructure/api/product.api';

export function useProductsByType(type: string) {
  return useQuery({
    queryKey: ['products', 'type', type],
    queryFn: () => productApi.getByType(type),
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: !!type, // Solo ejecutar si type existe
  });
}

// frontend/src/hooks/use-product-by-slug.ts
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../infrastructure/api/product.api';

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ['products', 'slug', slug],
    queryFn: () => productApi.getBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutos
    enabled: !!slug,
  });
}

// frontend/src/hooks/use-create-order.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../infrastructure/api/order.api';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderPayload) => orderApi.create(data),
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: Error) => {
      console.error('Failed to create order:', error.message);
    },
  });
}
```

#### 2.2.3 Crear QueryClient
```typescript
// frontend/src/infrastructure/react-query/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 10, // 10 minutos (antes: cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

#### 2.2.4 Configurar en layout
```typescript
// frontend/src/app/layout.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/infrastructure/react-query/query-client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

#### Tareas 2.2:
- [ ] Instalar React Query (@tanstack/react-query)
- [ ] Crear `frontend/src/infrastructure/react-query/query-client.ts`
- [ ] Refactor `frontend/src/hooks/use-products-by-type.ts` con React Query
- [ ] Refactor `frontend/src/hooks/use-product-by-slug.ts` con React Query
- [ ] Refactor `frontend/src/hooks/use-auth.ts` con React Query (login/register)
- [ ] Refactor `frontend/src/hooks/use-cart.ts` con React Query
- [ ] Actualizar `frontend/src/app/layout.tsx` con QueryClientProvider

---

### FASE 2.3: Implementar API Clients

**Objetivo**: Crear servicios API tipados con error handling.

#### 2.3.1 Base API client
```typescript
// frontend/src/infrastructure/api/base-api.ts
import axios, { AxiosInstance, AxiosError } from 'axios';

interface ApiErrorResponse {
  code: string;
  message: string;
  context?: Record<string, any>;
}

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor de respuesta para error handling
    this.client.interceptors.response.use(
      (response) => response.data,
      (error: AxiosError<ApiErrorResponse>) => {
        const apiError = error.response?.data;
        const message = apiError?.message || error.message;
        throw new Error(message);
      }
    );
  }

  protected getClient(): AxiosInstance {
    return this.client;
  }
}
```

#### 2.3.2 Product API
```typescript
// frontend/src/infrastructure/api/product.api.ts
import { ApiClient } from './base-api';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  type: string;
  solution: string;
  isActive: boolean;
  createdAt: string;
}

class ProductApi extends ApiClient {
  async getByType(type: string): Promise<Product[]> {
    const client = this.getClient();
    return client.get(`/products/type/${type}`);
  }

  async getBySlug(slug: string): Promise<Product> {
    const client = this.getClient();
    return client.get(`/products/slug/${slug}`);
  }

  async search(query: string): Promise<Product[]> {
    const client = this.getClient();
    return client.get('/products/search', { params: { q: query } });
  }

  async getBySolution(solution: string): Promise<Product[]> {
    const client = this.getClient();
    return client.get(`/products/solution/${solution}`);
  }
}

export const productApi = new ProductApi();
```

#### 2.3.3 Auth API
```typescript
// frontend/src/infrastructure/api/auth.api.ts
import { ApiClient } from './base-api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

class AuthApi extends ApiClient {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const client = this.getClient();
    return client.post('/auth/login', payload);
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const client = this.getClient();
    return client.post('/auth/register', payload);
  }

  async logout(): Promise<void> {
    const client = this.getClient();
    return client.post('/auth/logout');
  }
}

export const authApi = new AuthApi();
```

#### 2.3.4 Order API
```typescript
// frontend/src/infrastructure/api/order.api.ts
import { ApiClient } from './base-api';

export interface CreateOrderPayload {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: string;
  createdAt: string;
}

class OrderApi extends ApiClient {
  async create(payload: CreateOrderPayload): Promise<Order> {
    const client = this.getClient();
    return client.post('/orders', payload);
  }

  async getById(orderId: string): Promise<Order> {
    const client = this.getClient();
    return client.get(`/orders/${orderId}`);
  }

  async list(): Promise<Order[]> {
    const client = this.getClient();
    return client.get('/orders');
  }
}

export const orderApi = new OrderApi();
```

#### Tareas 2.3:
- [ ] Instalar axios
- [ ] Crear `frontend/src/infrastructure/api/base-api.ts`
- [ ] Crear `frontend/src/infrastructure/api/product.api.ts`
- [ ] Crear `frontend/src/infrastructure/api/auth.api.ts`
- [ ] Crear `frontend/src/infrastructure/api/order.api.ts`
- [ ] Crear `frontend/src/infrastructure/api/cart.api.ts`
- [ ] Crear `frontend/src/infrastructure/api/routine.api.ts` (si existe)
- [ ] Exportar todo desde `frontend/src/infrastructure/api/index.ts`

---

### FASE 2.4: Implementar Stores Globales

**Objetivo**: Usar Zustand para estado global (auth, UI), no para datos del servidor.

#### 2.4.1 Auth Store
```typescript
// frontend/src/stores/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-store' }
  )
);
```

#### 2.4.2 UI Store (para estado de navegación, modales, etc.)
```typescript
// frontend/src/stores/ui.store.ts
import { create } from 'zustand';

interface UIStore {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleCart: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));
```

#### 2.4.3 Eliminar o refactorizar Cart Store
```typescript
// ⚠️ IMPORTANTE: Cart NO debe ser un Zustand store
// El carrito debe venir del backend/servidor (persisten en BD)
// Solo en localStorage si es temporal

// frontend/src/hooks/use-cart.ts - Usar React Query en su lugar
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/infrastructure/api/cart.api';

export function useCart() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get(),
  });

  const addToCart = useMutation({
    mutationFn: (data: any) => cartApi.addItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return { ...query, addToCart };
}
```

#### Tareas 2.4:
- [ ] Instalar zustand (si no está)
- [ ] Crear `frontend/src/stores/auth.store.ts`
- [ ] Crear `frontend/src/stores/ui.store.ts`
- [ ] Refactorizar `frontend/src/stores/cart.store.ts` → usar React Query en hooks
- [ ] Eliminar stores innecesarios
- [ ] Actualizar componentes para usar hooks en lugar de stores

---

## ✅ FASE 3: TESTING Y VALIDACIÓN

### 3.1 Verificar build
```bash
cd backend
pnpm build

cd ../frontend
pnpm build
```

### 3.2 Verificar tipos
```bash
pnpm typecheck
```

### 3.3 Ejecutar linting
```bash
pnpm lint
```

### 3.4 Tests unitarios (backend)
```bash
cd backend
pnpm test
```

### 3.5 Prueba manual
```bash
# Terminal 1: Backend
cd backend
pnpm dev

# Terminal 2: Frontend
cd frontend
pnpm dev

# Verificar en http://localhost:3000
# Revisar Network tab en DevTools
# Verificar que las queries funcionan
```

### 3.6 Validar arquitectura
- [ ] Verificar que no hay imports de `/application` en frontend
- [ ] Verificar que controllers solo hacen HTTP handling
- [ ] Verificar que use cases tienen DTOs validados
- [ ] Verificar que entities tienen métodos de negocio
- [ ] Verificar que repositories hacen mapeo
- [ ] Verificar que DI container resuelve todas las dependencias

#### Tareas 3:
- [ ] Ejecutar `pnpm build` sin errores
- [ ] Ejecutar `pnpm typecheck` sin errores
- [ ] Ejecutar `pnpm lint` sin errores
- [ ] Prueba manual del flujo usuario (login → productos → orden)
- [ ] Revisar Network tab: todas las APIs funcionan
- [ ] Revisar Console: sin warnings

---

## 🎯 ORDEN DE EJECUCIÓN RECOMENDADO

### Día 1 (Backend - 4-6 horas)
1. **FASE 1.1** - Enriquecer entities (2h)
2. **FASE 1.2** - DI Container (1h)
3. **FASE 1.3** - Mapeo de repositorios (1h)
4. **FASE 1.4** - Errores de dominio (0.5h)
5. **FASE 1.5** - Validación en use cases (0.5h)
6. **Test**: `pnpm build && pnpm test`

### Día 2 (Frontend - 2-3 horas)
1. **FASE 2.1** - Eliminar application folder (0.5h)
2. **FASE 2.2** - Refactor hooks con React Query (1h)
3. **FASE 2.3** - Crear API clients (0.5h)
4. **FASE 2.4** - Stores globales (0.5h)
5. **FASE 3** - Testing y validación (0.5h)

---

## 🔍 CHECKLIST DE VERIFICACIÓN FINAL

### Backend
- [ ] Entities tienen métodos de negocio
- [ ] Use cases validan DTOs
- [ ] Repositorios devuelven entities (no datos crudos)
- [ ] Errores tienen código y statusCode
- [ ] DI Container gestiona todas las dependencias
- [ ] Controllers solo hacen HTTP handling
- [ ] `pnpm build` pasa sin errores
- [ ] `pnpm typecheck` pasa sin errores

### Frontend
- [ ] NO existe carpeta `/application`
- [ ] Hooks usan React Query
- [ ] API clients usan axios con error handling
- [ ] Stores solo para estado local (auth, UI)
- [ ] Todos los tipos están en TypeScript (no `any`)
- [ ] `pnpm build` pasa sin errores
- [ ] `pnpm typecheck` pasa sin errores

### Integración
- [ ] Backend y frontend se comunican correctamente
- [ ] No hay console errors o warnings
- [ ] Flujo completo usuario funciona (login → productos → orden)
- [ ] Despliegue local exitoso

---

## 📚 RECURSOS

- Clean Architecture: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- TypeScript DI: https://github.com/microsoft/tsyringe
- React Query: https://tanstack.com/query/latest
- Zustand: https://github.com/pmndrs/zustand
- Prisma Mapper Pattern: https://docs.prisma.io/concepts/components/prisma-client/repositories

---

**Última actualización**: 2026-06-05  
**Autor**: GitHub Copilot  
**Estado**: Listo para ejecutar
