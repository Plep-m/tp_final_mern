/**
 * Shared Types - Product
 * TODO: Define product-related types and enums
 */

// TODO: Define ProductCategory enum (FOOTBALL, NATATION, etc.)
export enum ProductCategory{
    FOOTBALL = "Football",
    NATATION = "Natation",
    TENNIS = "Tennis",
    BASKET = "Basket",
    RUGBY = "Rugby",
    HANDBALL = "Handball"
}
// TODO: Define IProduct interface
export interface IProduct {
  name: string;
  description?: string;
  category: ProductCategory;
  stock: number;
  imageUrl?: string;
}

