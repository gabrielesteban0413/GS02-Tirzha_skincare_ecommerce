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
