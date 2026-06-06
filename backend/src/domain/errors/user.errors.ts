import { DomainError } from './domain.error';

export class UserNotFoundError extends DomainError {
  readonly code = 'USER_NOT_FOUND';
  readonly statusCode = 404;

  constructor(identifier: string) {
    super(`User not found: ${identifier}`);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class InvalidEmailError extends DomainError {
  readonly code = 'INVALID_EMAIL';
  readonly statusCode = 400;

  constructor(email: string) {
    super(`Invalid email format: ${email}`);
    Object.setPrototypeOf(this, InvalidEmailError.prototype);
  }
}

export class UserAlreadyExistsError extends DomainError {
  readonly code = 'USER_ALREADY_EXISTS';
  readonly statusCode = 409;

  constructor(email: string) {
    super(`User with email ${email} already exists`);
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }
}

export class InvalidPasswordError extends DomainError {
  readonly code = 'INVALID_PASSWORD';
  readonly statusCode = 400;

  constructor(reason: string) {
    super(`Password validation failed: ${reason}`);
    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }
}
