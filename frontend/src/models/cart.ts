/**
 * Cart Service - LocalStorage Management
 */

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
}

export class CartService {
  static CART_KEY = 'ligue_cart';

  static getCart(): CartItem[] {
    try {
      const cart = localStorage.getItem(CartService.CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  }

  static addToCart(item: CartItem): void {
    try {
      const cart = CartService.getCart();
      const existingIndex = cart.findIndex(i => i.productId === item.productId);

      if (existingIndex > -1) {
        // Item exists, update quantity
        cart[existingIndex].quantity += item.quantity;
      } else {
        // New item, add to cart
        cart.push(item);
      }

      localStorage.setItem(CartService.CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Failed to add item to cart');
    }
  }

  static removeFromCart(productId: string): void {
    try {
      const cart = CartService.getCart();
      const filtered = cart.filter(item => item.productId !== productId);
      localStorage.setItem(CartService.CART_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new Error('Failed to remove item from cart');
    }
  }

  static clearCart(): void {
    try {
      localStorage.removeItem(CartService.CART_KEY);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw new Error('Failed to clear cart');
    }
  }

  static updateQuantity(productId: string, quantity: number): void {
    try {
      if (quantity <= 0) {
        CartService.removeFromCart(productId);
        return;
      }

      const cart = CartService.getCart();
      const item = cart.find(i => i.productId === productId);

      if (item) {
        item.quantity = quantity;
        localStorage.setItem(CartService.CART_KEY, JSON.stringify(cart));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw new Error('Failed to update quantity');
    }
  }

  static getCartTotal(): number {
    const cart = CartService.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
}
