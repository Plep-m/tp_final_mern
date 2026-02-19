/**
 * Order Model - Business layer for Order operations
 * Consumes ApiService and exposes typed Order operations to the frontend
 */

import { IOrder, IOrderItem } from '@ligue-sportive/shared';
import { ApiService } from './api';

export class OrderModel {
  static async create(items: IOrderItem[], userId: string): Promise<IOrder> {
    return ApiService.createOrder(items, userId);
  }

  static async getAll(userId?: string): Promise<IOrder[]> {
    return ApiService.getOrders(userId);
  }

  static async getById(orderId: string): Promise<IOrder> {
    return ApiService.getOrderById(orderId);
  }
}
