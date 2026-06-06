import { ApiClient } from './base-api';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CreateOrderPayload {
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress: any;
  createdAt: string;
  paidAt: string | null;
  shippedAt: string | null;
}

class OrderApi extends ApiClient {
  async create(payload: CreateOrderPayload): Promise<Order> {
    const client = this.getClient();
    return client.post('/orders', payload);
  }

  async getById(orderId: string): Promise<Order> {
    const client = this.getClient();
    return client.get(`/orders/${orderId}`);
  }

  async list(): Promise<Order[]> {
    const client = this.getClient();
    return client.get('/orders');
  }

  async cancel(orderId: string): Promise<Order> {
    const client = this.getClient();
    return client.post(`/orders/${orderId}/cancel`);
  }
}

export const orderApi = new OrderApi();
