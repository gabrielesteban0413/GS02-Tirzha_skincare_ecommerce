export enum ProductCategoryEnum {
  SKINCARE = 'skincare',
  HAIRCARE = 'haircare',
  BODYCARE = 'bodycare',
  TOOLS = 'tools',
  SUPPLEMENTS = 'supplements',
}

export class ProductCategory {
  private readonly value: ProductCategoryEnum;

  private constructor(value: ProductCategoryEnum) {
    this.value = value;
  }

  static create(category: string): ProductCategory {
    const normalizedCategory = category.toLowerCase() as ProductCategoryEnum;
    if (!Object.values(ProductCategoryEnum).includes(normalizedCategory)) {
      throw new Error(`Invalid category: ${category}. Allowed: ${Object.values(ProductCategoryEnum).join(', ')}`);
    }
    return new ProductCategory(normalizedCategory);
  }

  getValue(): ProductCategoryEnum {
    return this.value;
  }

  equals(other: ProductCategory): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
