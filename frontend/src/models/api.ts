/**
 * API Service - HTTP Client
 * Handles all API calls to backend
 * TODO: Implement fetch wrapper with auth token injection
 */

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

  // Product endpoints
  static async getProducts(category?: string): Promise<any> {
    // TODO: GET /products
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
}
