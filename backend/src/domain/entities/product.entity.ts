import { Money } from '../value-objects/money.vo';
import { Stock } from '../value-objects/stock.vo';

export class Product {
  private readonly id: string;
  private readonly name: string;
  private readonly slug: string;
  private readonly description: string;
  private readonly price: Money;
  private stock: Stock;
  private readonly type: string;
  private readonly solution: string;
  private readonly imageUrl: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private isActive: boolean;

  private constructor(
    id: string,
    name: string,
    slug: string,
    description: string,
    price: Money,
    stock: Stock,
    type: string,
    solution: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.type = type;
    this.solution = solution;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isActive = isActive;
  }

  static create(
    id: string,
    name: string,
    slug: string,
    description: string,
    price: Money,
    stock: Stock,
    type: string,
    solution: string,
    imageUrl: string
  ): Product {
    Product.validate(name, slug, description);
    return new Product(
      id,
      name,
      slug,
      description,
      price,
      stock,
      type,
      solution,
      imageUrl,
      new Date(),
      new Date(),
      true
    );
  }

  static restore(
    id: string,
    name: string,
    slug: string,
    description: string,
    price: Money,
    stock: Stock,
    type: string,
    solution: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean
  ): Product {
    return new Product(
      id,
      name,
      slug,
      description,
      price,
      stock,
      type,
      solution,
      imageUrl,
      createdAt,
      updatedAt,
      isActive
    );
  }

  private static validate(name: string, slug: string, description: string): void {
    if (!name || name.trim().length < 3) {
      throw new Error('Product name must be at least 3 characters');
    }
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      throw new Error('Product slug must contain only lowercase letters, numbers and hyphens');
    }
    if (!description || description.trim().length < 10) {
      throw new Error('Product description must be at least 10 characters');
    }
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getSlug(): string {
    return this.slug;
  }

  getDescription(): string {
    return this.description;
  }

  getPrice(): Money {
    return this.price;
  }

  getStock(): Stock {
    return this.stock;
  }

  getType(): string {
    return this.type;
  }

  getSolution(): string {
    return this.solution;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  isProductActive(): boolean {
    return this.isActive;
  }

  reduceStock(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    this.stock = this.stock.reduce(quantity);
    this.updatedAt = new Date();
  }

  increaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
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
    return this.isActive && !this.stock.isOutOfStock();
  }

  isLowStock(threshold: number = 5): boolean {
    return this.stock.isLowStock(threshold);
  }
}
