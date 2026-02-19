/**
 * Order Model (Mongoose Schema)
 */

import mongoose, { Schema, Document } from 'mongoose';
import { IOrder, OrderStatus } from '@ligue-sportive/shared';

export interface IOrderDocument extends IOrder, Document {}

const OrderSchema = new Schema<IOrderDocument>({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: Object.values(OrderStatus), 
    default: OrderStatus.PENDING 
  },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<IOrderDocument>('Order', OrderSchema);
