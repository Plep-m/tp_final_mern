/**
 * API Service - HTTP Client
 * Handles all API calls to backend
 * TODO: Implement fetch wrapper with auth token injection
 */
import { IProduct, IOrderItem, IOrder } from "@ligue-sportive/shared";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export class ApiService {
  // TODO: Implement fetch wrapper with:
  // - Auth token from localStorage
  // - Error handling
  // - JSON parsing
  
  // Auth endpoints
  static async login(email: string, password: string): Promise<unknown> {
    // TODO: POST /auth/login
    throw new Error('Not implemented');
  }

  static async register(data: unknown): Promise<unknown> {
    // TODO: POST /auth/register
    throw new Error('Not implemented');
  }

  // User endpoints (Admin only)
  static async getUsers(): Promise<unknown> {
    // TODO: GET /users
    throw new Error('Not implemented');
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
