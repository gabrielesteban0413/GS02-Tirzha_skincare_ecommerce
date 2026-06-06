import { Money } from '../value-objects/money.vo';
import { Address } from '../value-objects/address.vo';
import { OrderStatus } from '../value-objects/order-status.vo';

export interface OrderItemData {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: Money;
  subtotal: Money;
}

export class Order {
  private readonly id: string;
  private readonly userId: string;
  private readonly items: OrderItemData[] = [];
  private total: Money;
  private status: OrderStatus;
  private readonly shippingAddress: Address;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private paidAt: Date | null;
  private shippedAt: Date | null;

  private constructor(
    id: string,
    userId: string,
    shippingAddress: Address,
    items: OrderItemData[] = [],
    total: Money = Money.zero('USD'),
    status: OrderStatus = OrderStatus.PENDING,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    paidAt: Date | null = null,
    shippedAt: Date | null = null
  ) {
    this.id = id;
    this.userId = userId;
    this.shippingAddress = shippingAddress;
    this.items = items;
    this.total = total;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.paidAt = paidAt;
    this.shippedAt = shippedAt;
  }

  static create(id: string, userId: string, shippingAddress: Address): Order {
    if (!userId || userId.trim().length === 0) {
      throw new Error('userId cannot be empty');
    }
    return new Order(id, userId, shippingAddress);
  }

  static restore(
    id: string,
    userId: string,
    shippingAddress: Address,
    items: OrderItemData[],
    total: Money,
    status: OrderStatus,
    createdAt: Date,
    updatedAt: Date,
    paidAt: Date | null,
    shippedAt: Date | null
  ): Order {
    return new Order(
      id,
      userId,
      shippingAddress,
      items,
      total,
      status,
      createdAt,
      updatedAt,
      paidAt,
      shippedAt
    );
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getItems(): OrderItemData[] {
    return [...this.items];
  }

  getTotal(): Money {
    return this.total;
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getShippingAddress(): Address {
    return this.shippingAddress;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getPaidAt(): Date | null {
    return this.paidAt;
  }

  getShippedAt(): Date | null {
    return this.shippedAt;
  }

  addItem(item: OrderItemData): void {
    if (!item.productId || item.productId.trim().length === 0) {
      throw new Error('Product ID cannot be empty');
    }
    if (item.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const existingItem = this.items.find((i) => i.productId === item.productId);
    if (existingItem) {
      throw new Error(`Product ${item.productId} is already in the order`);
    }

    this.items.push(item);
    this.recalculateTotal();
    this.updatedAt = new Date();
  }

  removeItem(productId: string): void {
    const index = this.items.findIndex((i) => i.productId === productId);
    if (index === -1) {
      throw new Error(`Product ${productId} not found in order`);
    }
    this.items.splice(index, 1);
    this.recalculateTotal();
    this.updatedAt = new Date();
  }

  private recalculateTotal(): void {
    if (this.items.length === 0) {
      this.total = Money.zero('USD');
      return;
    }
    this.total = this.items.reduce((acc, item) => acc.add(item.subtotal), Money.zero('USD'));
  }

  canBePaid(): boolean {
    return this.status === OrderStatus.PENDING && this.items.length > 0;
  }

  markAsPaid(): void {
    if (!this.canBePaid()) {
      throw new Error('Order cannot be paid. It must be PENDING and have items');
    }
    this.status = OrderStatus.PAID;
    this.paidAt = new Date();
    this.updatedAt = new Date();
  }

  canBeShipped(): boolean {
    return this.status === OrderStatus.PAID;
  }

  markAsShipped(): void {
    if (!this.canBeShipped()) {
      throw new Error('Order must be PAID before it can be shipped');
    }
    this.status = OrderStatus.SHIPPED;
    this.shippedAt = new Date();
    this.updatedAt = new Date();
  }

  canBeDelivered(): boolean {
    return this.status === OrderStatus.SHIPPED;
  }

  markAsDelivered(): void {
    if (!this.canBeDelivered()) {
      throw new Error('Order must be SHIPPED before it can be delivered');
    }
    this.status = OrderStatus.DELIVERED;
    this.updatedAt = new Date();
  }

  canBeCancelled(): boolean {
    return this.status === OrderStatus.PENDING || this.status === OrderStatus.PAID;
  }

  markAsCancelled(): void {
    if (!this.canBeCancelled()) {
      throw new Error('Order cannot be cancelled at this status');
    }
    this.status = OrderStatus.CANCELLED;
    this.updatedAt = new Date();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
