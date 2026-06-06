export class Address {
  private readonly street: string;
  private readonly city: string;
  private readonly state: string;
  private readonly zipCode: string;
  private readonly country: string;

  private constructor(
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string = 'US'
  ) {
    this.validateAddress(street, city, state, zipCode);
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
  }

  static create(
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country?: string
  ): Address {
    return new Address(street, city, state, zipCode, country);
  }

  private validateAddress(
    street: string,
    city: string,
    state: string,
    zipCode: string
  ): void {
    if (!street || street.trim().length < 3) {
      throw new Error('Street address must be at least 3 characters');
    }
    if (!city || city.trim().length < 2) {
      throw new Error('City must be at least 2 characters');
    }
    if (!state || state.trim().length < 2) {
      throw new Error('State must be at least 2 characters');
    }
    if (!zipCode || zipCode.trim().length < 2) {
      throw new Error('ZIP code must be at least 2 characters');
    }
  }

  getStreet(): string {
    return this.street;
  }

  getCity(): string {
    return this.city;
  }

  getState(): string {
    return this.state;
  }

  getZipCode(): string {
    return this.zipCode;
  }

  getCountry(): string {
    return this.country;
  }

  equals(other: Address): boolean {
    return (
      this.street === other.street &&
      this.city === other.city &&
      this.state === other.state &&
      this.zipCode === other.zipCode &&
      this.country === other.country
    );
  }

  toString(): string {
    return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}, ${this.country}`;
  }
}
