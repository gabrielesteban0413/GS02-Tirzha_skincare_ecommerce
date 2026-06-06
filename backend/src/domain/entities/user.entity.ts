import { Email } from '../value-objects/email.vo';

export class User {
  private readonly id: string;
  private readonly email: Email;
  private readonly name: string;
  private readonly password: string; // hashed password
  private readonly createdAt: Date;
  private updatedAt: Date;
  private isActive: boolean;

  private constructor(
    id: string,
    email: Email,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isActive = isActive;
  }

  static create(
    id: string,
    email: Email,
    name: string,
    hashedPassword: string
  ): User {
    User.validateName(name);
    return new User(
      id,
      email,
      name.trim(),
      hashedPassword,
      new Date(),
      new Date(),
      true
    );
  }

  static restore(
    id: string,
    email: Email,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean
  ): User {
    return new User(id, email, name, password, createdAt, updatedAt, isActive);
  }

  private static validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error('User name must be at least 2 characters');
    }
    if (name.length > 100) {
      throw new Error('User name must not exceed 100 characters');
    }
  }

  getId(): string {
    return this.id;
  }

  getEmail(): Email {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getPassword(): string {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  isUserActive(): boolean {
    return this.isActive;
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  updateName(newName: string): void {
    User.validateName(newName);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).name = newName.trim();
    this.updatedAt = new Date();
  }
}
