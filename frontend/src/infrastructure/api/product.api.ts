import { ApiClient } from './base-api';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  description: string;
  type: string;
  solution: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

class ProductApi extends ApiClient {
  async getByType(type: string): Promise<Product[]> {
    const client = this.getClient();
    return client.get(`/products/type/${type}`);
  }

  async getBySolution(solution: string): Promise<Product[]> {
    const client = this.getClient();
    return client.get(`/products/solution/${solution}`);
  }

  async getBySlug(slug: string): Promise<Product> {
    const client = this.getClient();
    return client.get(`/products/slug/${slug}`);
  }

  async search(query: string): Promise<Product[]> {
    const client = this.getClient();
    return client.get('/products/search', { params: { q: query } });
  }

  async getCategory(category: string): Promise<Product[]> {
    const client = this.getClient();
    return client.get(`/products/category/${category}`);
  }
}

export const productApi = new ProductApi();