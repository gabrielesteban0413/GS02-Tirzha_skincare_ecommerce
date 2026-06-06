export class Stock {
  private readonly quantity: number;
  private readonly minThreshold: number = 0;
  private readonly maxThreshold: number = 10000;

  private constructor(quantity: number) {
    this.validateQuantity(quantity);
    this.quantity = quantity;
  }

  static create(quantity: number): Stock {
    return new Stock(quantity);
  }

  static zero(): Stock {
    return new Stock(0);
  }

  private validateQuantity(quantity: number): void {
    if (!Number.isInteger(quantity) || quantity < this.minThreshold) {
      throw new Error(`Invalid stock quantity: ${quantity}. Must be a non-negative integer`);
    }
    if (quantity > this.maxThreshold) {
      throw new Error(`Stock quantity ${quantity} exceeds maximum allowed: ${this.maxThreshold}`);
    }
  }

  getQuantity(): number {
    return this.quantity;
  }

  reduce(amount: number): Stock {
    if (amount <= 0) {
      throw new Error('Reduction amount must be positive');
    }
    if (this.quantity < amount) {
      throw new Error(`Cannot reduce stock by ${amount}. Current stock: ${this.quantity}`);
    }
    return Stock.create(this.quantity - amount);
  }

  increase(amount: number): Stock {
    if (amount <= 0) {
      throw new Error('Increase amount must be positive');
    }
    return Stock.create(this.quantity + amount);
  }

  canReduce(amount: number): boolean {
    return amount > 0 && this.quantity >= amount;
  }

  isLowStock(threshold: number = 5): boolean {
    return this.quantity <= threshold;
  }

  isOutOfStock(): boolean {
    return this.quantity === 0;
  }

  equals(other: Stock): boolean {
    return this.quantity === other.quantity;
  }

  toString(): string {
    return `Stock(${this.quantity})`;
  }
}
