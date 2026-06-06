export class Money {
  private readonly amount: number;
  private readonly currency: string;

  private constructor(amount: number, currency: string) {
    if (amount < 0) {
      throw new Error('Money amount cannot be negative');
    }
    if (!currency || currency.length !== 3) {
      throw new Error('Currency must be a valid 3-letter code (ISO 4217)');
    }
    this.amount = amount;
    this.currency = currency;
  }

  static create(amount: number, currency: string = 'USD'): Money {
    return new Money(amount, currency);
  }

  static zero(currency: string = 'USD'): Money {
    return new Money(0, currency);
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error(`Cannot add ${other.currency} to ${this.currency}`);
    }
    return Money.create(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error(`Cannot subtract ${other.currency} from ${this.currency}`);
    }
    const result = this.amount - other.amount;
    if (result < 0) {
      throw new Error('Result would be negative');
    }
    return Money.create(result, this.currency);
  }

  multiply(factor: number): Money {
    if (factor < 0) {
      throw new Error('Multiplication factor cannot be negative');
    }
    return Money.create(this.amount * factor, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  greaterThan(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new Error(`Cannot compare ${other.currency} with ${this.currency}`);
    }
    return this.amount > other.amount;
  }

  greaterThanOrEqual(other: Money): boolean {
    return this.equals(other) || this.greaterThan(other);
  }

  lessThan(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new Error(`Cannot compare ${other.currency} with ${this.currency}`);
    }
    return this.amount < other.amount;
  }

  toString(): string {
    return `${this.currency} ${this.amount.toFixed(2)}`;
  }
}
