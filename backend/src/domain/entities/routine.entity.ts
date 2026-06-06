export interface RoutineStepData {
  order: number;
  description: string;
  productIds: string[];
}

export class Routine {
  private readonly id: string;
  private readonly name: string;
  private readonly slug: string;
  private readonly description: string;
  private readonly steps: RoutineStepData[] = [];
  private readonly imageUrl: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private isActive: boolean;

  private constructor(
    id: string,
    name: string,
    slug: string,
    description: string,
    imageUrl: string,
    steps: RoutineStepData[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    isActive: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.imageUrl = imageUrl;
    this.steps = steps;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isActive = isActive;
  }

  static create(
    id: string,
    name: string,
    slug: string,
    description: string,
    imageUrl: string
  ): Routine {
    Routine.validate(name, slug, description);
    return new Routine(id, name, slug, description, imageUrl);
  }

  static restore(
    id: string,
    name: string,
    slug: string,
    description: string,
    imageUrl: string,
    steps: RoutineStepData[],
    createdAt: Date,
    updatedAt: Date,
    isActive: boolean
  ): Routine {
    return new Routine(id, name, slug, description, imageUrl, steps, createdAt, updatedAt, isActive);
  }

  private static validate(name: string, slug: string, description: string): void {
    if (!name || name.trim().length < 3) {
      throw new Error('Routine name must be at least 3 characters');
    }
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      throw new Error('Routine slug must contain only lowercase letters, numbers and hyphens');
    }
    if (!description || description.trim().length < 10) {
      throw new Error('Routine description must be at least 10 characters');
    }
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getSlug(): string {
    return this.slug;
  }

  getDescription(): string {
    return this.description;
  }

  getSteps(): RoutineStepData[] {
    return [...this.steps];
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  isRoutineActive(): boolean {
    return this.isActive;
  }

  addStep(step: RoutineStepData): void {
    if (step.order < 1) {
      throw new Error('Step order must be at least 1');
    }
    if (!step.description || step.description.trim().length === 0) {
      throw new Error('Step description cannot be empty');
    }
    if (!step.productIds || step.productIds.length === 0) {
      throw new Error('Step must have at least one product');
    }

    const existingStep = this.steps.find((s) => s.order === step.order);
    if (existingStep) {
      throw new Error(`Step ${step.order} already exists`);
    }

    this.steps.push(step);
    this.steps.sort((a, b) => a.order - b.order);
    this.updatedAt = new Date();
  }

  removeStep(stepOrder: number): void {
    const index = this.steps.findIndex((s) => s.order === stepOrder);
    if (index === -1) {
      throw new Error(`Step ${stepOrder} not found`);
    }
    this.steps.splice(index, 1);
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  getStepCount(): number {
    return this.steps.length;
  }
}
