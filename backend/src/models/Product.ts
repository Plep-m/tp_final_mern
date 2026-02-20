/**
 * Product Model (Mongoose Schema)
 */

import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '@ligue-sportive/shared';

export interface IProductDocument extends IProduct, Document {}

const ProductSchema = new Schema<IProductDocument>({
  name: { type: String, required: true },
  description: { type: String },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
});

export const Product = mongoose.model<IProductDocument>('Product', ProductSchema);
