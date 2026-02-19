/**
 * Order Controller
 * Handles order management
 */

import { Request, Response } from 'express';
import { Order } from '../models/Order';

export class OrderController {
  // POST /api/orders
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { items, userId } = req.body;
      // TODO: Get userId from (req as any).user.userId when auth is implemented

      // TODO: Implement product stock validation (requires Product model)
      // For now, just calculate total from quantity
      let totalAmount = 0;
      for (const item of items) {
        totalAmount += item.quantity;
      }

      // Create order
      const order = await Order.create({
        userId: userId || 'temp-user-id', // TODO: Remove temp userId
        items: items.map((item: any) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
        })),
        totalAmount,
      });

      res.status(201).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { message: error.message },
      });
    }
  }

  // GET /api/orders
  static async getUserOrders(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.query.userId as string; // TODO: Get from auth
      const orders = await Order.find(userId ? { userId } : {}).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { message: error.message },
      });
    }
  }

  // GET /api/orders/:id
  static async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        res.status(404).json({
          success: false,
          error: { message: 'Order not found' },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: { message: error.message },
      });
    }
  }
}
