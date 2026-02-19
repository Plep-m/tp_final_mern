/**
 * Order Model (Mongoose Schema)
 * TODO: Implement Order schema with userId, items[], totalAmount, status
 */

import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from '@ligue-sportive/shared';

export interface IOrderDocument extends IOrder, Document {}

const OrderSchema = new Schema<IOrderDocument>({
  // TODO: Define schema fields
});

export const Order = mongoose.model<IOrderDocument>('Order', OrderSchema);
