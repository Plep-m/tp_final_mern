import { IProduct, ProductCategory } from "@ligue-sportive/shared";
import { ApiService } from "./api";

export type Product = IProduct & {
  _id: string;
};

export { ProductCategory };

export class ProductModel {

  static async create(product: IProduct): Promise<Product> {
    return ApiService.createProduct(product) as Promise<Product>;
  }

  static async update(id: string, product: IProduct): Promise<Product> {
    return ApiService.updateProduct(id, product) as Promise<Product>;
  }

  static async getAll(category?: string): Promise<Product[]> {
    return ApiService.getProducts(category) as Promise<Product[]>;
  }

  static async getById(id: string): Promise<Product> {
    return ApiService.getProductById(id) as Promise<Product>;
  }

  static async delete(id: string): Promise<void> {
    return ApiService.deleteProduct(id);
  }
}
