/**
 * Cart Service - LocalStorage Management
 * TODO: Implement cart operations in localStorage
 */

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
}

export class CartService {
  static CART_KEY = 'ligue_cart';

  // TODO: Implement getCart() - get cart from localStorage
  static getCart(): CartItem[] {
    throw new Error('Not implemented');
  }

  // TODO: Implement addToCart() - add item to cart
  static addToCart(item: CartItem): void {
    throw new Error('Not implemented');
  }

  // TODO: Implement removeFromCart() - remove item from cart
  static removeFromCart(productId: string): void {
    throw new Error('Not implemented');
  }

  // TODO: Implement clearCart() - empty cart
  static clearCart(): void {
    throw new Error('Not implemented');
  }

  // TODO: Implement updateQuantity() - update item quantity
  static updateQuantity(productId: string, quantity: number): void {
    throw new Error('Not implemented');
  }
}
