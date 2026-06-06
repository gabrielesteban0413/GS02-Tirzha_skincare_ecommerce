export enum ProductTypeEnum {
  CLEANSER = 'cleanser',
  TONER = 'toner',
  ESSENCE = 'essence',
  SERUM = 'serum',
  CREAM = 'cream',
  MASK = 'mask',
  SUNSCREEN = 'sunscreen',
  OIL = 'oil',
  EXFOLIANT = 'exfoliant',
  TREATMENT = 'treatment',
}

export class ProductType {
  private readonly value: ProductTypeEnum;

  private constructor(value: ProductTypeEnum) {
    this.value = value;
  }

  static create(type: string): ProductType {
    const normalizedType = type.toLowerCase() as ProductTypeEnum;
    if (!Object.values(ProductTypeEnum).includes(normalizedType)) {
      throw new Error(`Invalid product type: ${type}. Allowed: ${Object.values(ProductTypeEnum).join(', ')}`);
    }
    return new ProductType(normalizedType);
  }

  getValue(): ProductTypeEnum {
    return this.value;
  }

  equals(other: ProductType): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
