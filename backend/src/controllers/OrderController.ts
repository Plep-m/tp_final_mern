/**
 * Order Controller
 * Handles order management
 */

import { Request, Response } from 'express';
import { IOrderItem } from '@ligue-sportive/shared';
import { Order } from '../models/Order';

export class OrderController {
  // POST /api/orders
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { items } = req.body;
      const userId = req.user!._id;

      let totalAmount = 0;
      for (const item of items) {
        totalAmount += item.quantity;
      }

      const order = await Order.create({
        userId,
        items: items.map((item: IOrderItem) => ({
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
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Internal server error' },
      });
    }
  }

  // GET /api/orders
  static async getUserOrders(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!._id;
      const orders = await Order.find({ userId }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Internal server error' },
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
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Internal server error' },
      });
    }
  }
}
