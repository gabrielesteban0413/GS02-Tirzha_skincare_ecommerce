import { Money } from '../value-objects/money.vo';

export interface CartItemData {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: Money;
  subtotal: Money;
}

export class Cart {
  private readonly id: string;
  private readonly userId: string;
  private readonly items: CartItemData[] = [];
  private total: Money;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(
    id: string,
    userId: string,
    items: CartItemData[] = [],
    total: Money = Money.zero('USD'),
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.total = total;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(id: string, userId: string): Cart {
    if (!userId || userId.trim().length === 0) {
      throw new Error('userId cannot be empty');
    }
    return new Cart(id, userId);
  }

  static restore(
    id: string,
    userId: string,
    items: CartItemData[],
    total: Money,
    createdAt: Date,
    updatedAt: Date
  ): Cart {
    return new Cart(id, userId, items, total, createdAt, updatedAt);
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getItems(): CartItemData[] {
    return [...this.items];
  }

  getTotal(): Money {
    return this.total;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  addItem(item: CartItemData): void {
    if (!item.productId || item.productId.trim().length === 0) {
      throw new Error('Product ID cannot be empty');
    }
    if (item.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const existingItem = this.items.find((i) => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.subtotal = existingItem.unitPrice.multiply(existingItem.quantity);
    } else {
      this.items.push(item);
    }

    this.recalculateTotal();
    this.updatedAt = new Date();
  }

  removeItem(productId: string): void {
    const index = this.items.findIndex((i) => i.productId === productId);
    if (index === -1) {
      throw new Error(`Product ${productId} not found in cart`);
    }
    this.items.splice(index, 1);
    this.recalculateTotal();
    this.updatedAt = new Date();
  }

  updateItemQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    const item = this.items.find((i) => i.productId === productId);
    if (!item) {
      throw new Error(`Product ${productId} not found in cart`);
    }
    item.quantity = quantity;
    item.subtotal = item.unitPrice.multiply(quantity);
    this.recalculateTotal();
    this.updatedAt = new Date();
  }

  clear(): void {
    this.items.length = 0;
    this.total = Money.zero('USD');
    this.updatedAt = new Date();
  }

  private recalculateTotal(): void {
    if (this.items.length === 0) {
      this.total = Money.zero('USD');
      return;
    }
    this.total = this.items.reduce((acc, item) => acc.add(item.subtotal), Money.zero('USD'));
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getItemCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }
}
