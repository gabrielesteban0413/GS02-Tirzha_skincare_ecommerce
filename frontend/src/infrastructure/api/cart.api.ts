import { ApiClient } from './base-api';

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartPayload {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

class CartApi extends ApiClient {
  async get(): Promise<Cart> {
    const client = this.getClient();
    return client.get('/cart');
  }

  async addItem(payload: AddToCartPayload): Promise<Cart> {
    const client = this.getClient();
    return client.post('/cart/items', payload);
  }

  async removeItem(productId: string): Promise<Cart> {
    const client = this.getClient();
    return client.delete(`/cart/items/${productId}`);
  }

  async updateItemQuantity(productId: string, quantity: number): Promise<Cart> {
    const client = this.getClient();
    return client.put(`/cart/items/${productId}`, { quantity });
  }

  async clear(): Promise<void> {
    const client = this.getClient();
    await client.delete('/cart');
  }
}

export const cartApi = new CartApi();
