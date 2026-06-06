import { DomainError } from './domain.error';

export class InvalidProductError extends DomainError {
  readonly code = 'INVALID_PRODUCT';
  readonly statusCode = 400;

  constructor(reason: string) {
    super(`Product validation failed: ${reason}`);
    Object.setPrototypeOf(this, InvalidProductError.prototype);
  }
}
