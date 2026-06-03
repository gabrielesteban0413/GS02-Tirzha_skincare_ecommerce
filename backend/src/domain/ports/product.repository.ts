export interface ProductRepository {
  findByType(type: string): Promise<any[]>;
  findBySolution(solution: string): Promise<any[]>;
  findBySlug(slug: string): Promise<any | null>;
}