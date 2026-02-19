/**
 * Order Controller
 * Handles order management
 */

import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';

export class OrderController {
  // POST /api/orders
  static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { items } = req.body;
      const userId = (req as any).user.userId;

      // TODO: Implement product stock validation (requires Product model)
      // For now, just calculate total from quantity
      let totalAmount = 0;
      for (const item of items) {
        totalAmount += item.quantity;
      }

      // Create order
      const order = await Order.create({
        userId,
        items: items.map((item: any) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
        })),
        totalAmount,
      });

      // TODO: Update product stock after Product model is implemented
      // for (const item of items) {
      //   await Product.findByIdAndUpdate(item.productId, {
      //     $inc: { stock: -item.quantity },
      //   });
      // }

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
      const userId = (req as any).user.userId;
      const orders = await Order.find({ userId }).sort({ createdAt: -1 });

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
      const userId = (req as any).user.userId;
      const order = await Order.findOne({ 
        _id: req.params.id, 
        userId 
      });

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
