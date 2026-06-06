import { DomainError } from './domain.error';

export class OrderNotFoundError extends DomainError {
  readonly code = 'ORDER_NOT_FOUND';
  readonly statusCode = 404;

  constructor(orderId: string) {
    super(`Order not found: ${orderId}`);
    Object.setPrototypeOf(this, OrderNotFoundError.prototype);
  }
}

export class OrderCannotBePaidError extends DomainError {
  readonly code = 'ORDER_CANNOT_BE_PAID';
  readonly statusCode = 400;

  constructor(orderId: string, status: string) {
    super(`Order ${orderId} cannot be paid. Current status: ${status}`);
    Object.setPrototypeOf(this, OrderCannotBePaidError.prototype);
  }
}

export class OrderCannotBeShippedError extends DomainError {
  readonly code = 'ORDER_CANNOT_BE_SHIPPED';
  readonly statusCode = 400;

  constructor(orderId: string, status: string) {
    super(`Order ${orderId} cannot be shipped. Current status: ${status}`);
    Object.setPrototypeOf(this, OrderCannotBeShippedError.prototype);
  }
}

export class EmptyOrderError extends DomainError {
  readonly code = 'EMPTY_ORDER';
  readonly statusCode = 400;

  constructor() {
    super('Cannot create order with empty items');
    Object.setPrototypeOf(this, EmptyOrderError.prototype);
  }
}
