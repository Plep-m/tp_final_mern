/**
 * Order Controller
 * Handles order management
 */

import { Request, Response } from 'express';
import { IOrderItem, OrderStatus } from '@ligue-sportive/shared';
import { Order } from '../models/Order';
import { Product } from '../models/Product';

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
      const { _id: userId, role } = req.user!;
      const filter = (role === 'ADMIN' && req.query.all === 'true') ? {} : { userId };
      const orders = await Order.find(filter).sort({ createdAt: -1 });

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

  // PATCH /api/orders/:id/status  (admin only)
  static async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.body as { status: OrderStatus };

      if (!Object.values(OrderStatus).includes(status)) {
        res.status(400).json({ success: false, error: { message: 'Invalid status value' } });
        return;
      }

      const order = await Order.findById(req.params.id);
      if (!order) {
        res.status(404).json({ success: false, error: { message: 'Order not found' } });
        return;
      }

      const prev = order.status;
      if (prev === status) {
        res.status(400).json({ success: false, error: { message: 'Order already has this status' } });
        return;
      }

      // PENDING → CONFIRMED: check stock then decrement
      if (status === OrderStatus.CONFIRMED && prev === OrderStatus.PENDING) {
        for (const item of order.items) {
          const product = await Product.findById(item.productId);
          if (!product) {
            res.status(400).json({ success: false, error: { message: `Product ${item.productName} not found` } });
            return;
          }
          if (product.stock < item.quantity) {
            res.status(400).json({ success: false, error: { message: `Insufficient stock for ${item.productName} (available: ${product.stock})` } });
            return;
          }
        }
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
        }
      }

      // CONFIRMED → CANCELLED: restore stock
      if (status === OrderStatus.CANCELLED && prev === OrderStatus.CONFIRMED) {
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } });
        }
      }

      order.status = status;
      await order.save();

      res.status(200).json({ success: true, data: order });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Internal server error' },
      });
    }
  }
}
