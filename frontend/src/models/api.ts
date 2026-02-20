/**
 * API Service - HTTP Client
 * Handles all API calls to backend
 */
import { IProduct, IOrderItem, IOrder } from "@ligue-sportive/shared";

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';

export class ApiService {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: any
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: this.getHeaders(),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<any> {
    return this.request('POST', '/auth/login', { email, password });
  }

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<any> {
    return this.request('POST', '/auth/register', data);
  }

  // User endpoints (Admin only)
  async getUsers(): Promise<any> {
    return this.request('GET', '/users');
  }

  async getUserById(id: string): Promise<any> {
    return this.request('GET', `/users/${id}`);
  }

  async updateUser(id: string, data: any): Promise<any> {
    return this.request('PUT', `/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<any> {
    return this.request('DELETE', `/users/${id}`);
  }

  // Order endpoints
  // TODO: Refactor to use centralized fetch wrapper when implemented
  static async createOrder(items: IOrderItem[], userId: string): Promise<IOrder> {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, userId }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Failed to create order');
    return data.data as IOrder;
  }

  // TODO: Refactor to use centralized fetch wrapper when implemented
  static async getOrders(userId?: string): Promise<IOrder[]> {
    const query = userId ? `?userId=${userId}` : '';
    const response = await fetch(`${API_URL}/orders${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch orders');
    return data.data as IOrder[];
  }

  // TODO: Refactor to use centralized fetch wrapper when implemented
  static async getOrderById(orderId: string): Promise<IOrder> {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch order');
    return data.data as IOrder;
  }

  // Product endpoints
  // TODO: Refactor to use centralized fetch wrapper when implemented
  static async getProducts(category?: string): Promise<IProduct[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const response = await fetch(`${API_URL}/products${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || 'Failed to fetch products');
    return data.data as IProduct[];
  }

  static async getProductById(id: string): Promise<IProduct> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || 'Failed to fetch product');
    return data.data as IProduct;
  }

  static async createProduct(product: IProduct): Promise<IProduct> {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || 'Failed to create product');
    return data.data as IProduct;
  }

  static async updateProduct(id: string, product: IProduct): Promise<IProduct> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || 'Failed to update product');
    return data.data as IProduct;
  }

  static async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || 'Failed to delete product');
  }
}
