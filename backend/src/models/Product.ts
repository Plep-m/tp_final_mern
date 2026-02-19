/**
 * Product Model (Mongoose Schema)
 * TODO: Implement Product schema with name, description, category, stock, imageUrl
 */

import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '@ligue-sportive/shared';

export interface IProductDocument extends IProduct, Document {}

const ProductSchema = new Schema<IProductDocument>({
  // TODO: Define schema fields
});

export const Product = mongoose.model<IProductDocument>('Product', ProductSchema);
