/**
 * API Service - HTTP Client
 * Handles all API calls to backend
 * TODO: Implement fetch wrapper with auth token injection
 */
import { IProduct } from "@ligue-sportive/shared";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export class ApiService {
  // TODO: Implement fetch wrapper with:
  // - Auth token from localStorage
  // - Error handling
  // - JSON parsing
  
  // Auth endpoints
  static async login(email: string, password: string): Promise<any> {
    // TODO: POST /auth/login
    throw new Error('Not implemented');
  }

  static async register(data: any): Promise<any> {
    // TODO: POST /auth/register
    throw new Error('Not implemented');
  }

  // User endpoints (Admin only)
  static async getUsers(): Promise<any> {
    // TODO: GET /users
    throw new Error('Not implemented');
  }

  // Order endpoints
  static async createOrder(items: any[]): Promise<any> {
    // TODO: POST /orders
    throw new Error('Not implemented');
  }

  static async getOrders(): Promise<any> {
    // TODO: GET /orders
    throw new Error('Not implemented');
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
