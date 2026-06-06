import { DomainError } from './domain.error';

export class ProductNotFoundError extends DomainError {
  readonly code = 'PRODUCT_NOT_FOUND';
  readonly statusCode = 404;

  constructor(identifier: string) {
    super(`Product not found: ${identifier}`);
    Object.setPrototypeOf(this, ProductNotFoundError.prototype);
  }
}
