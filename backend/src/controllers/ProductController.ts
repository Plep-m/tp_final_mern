/**
 * Product Controller
 * Handles product management (CRUD operations)
 */

import { Request, Response } from 'express';
import { Product } from '../models/Product';

export class ProductController {
  // GET /api/products
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const filter: Record<string, unknown> = {};
      if (req.query.category) {
        filter.category = req.query.category;
      }
      const products = await Product.find(filter);
      res.status(200).json({ success: true, data: products });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Internal server error' },
      });
    }
  }

  // GET /api/products/:id
  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ success: false, error: { message: 'Produit non trouvé' } });
        return;
      }
      res.status(200).json({ success: true, data: product });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Internal server error' },
      });
    }
  }

  // POST /api/products
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json({ success: true, data: savedProduct });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Internal server error' },
      });
    }
  }

  // PUT /api/products/:id
  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) {
        res.status(404).json({ success: false, error: { message: 'Produit non trouvé' } });
        return;
      }
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Internal server error' },
      });
    }
  }

  // DELETE /api/products/:id
  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        res.status(404).json({ success: false, error: { message: 'Produit non trouvé' } });
        return;
      }
      res.status(200).json({ success: true, data: { message: 'Produit supprimé avec succès' } });
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        error: { message: error instanceof Error ? error.message : 'Internal server error' },
      });
    }
  }
}
