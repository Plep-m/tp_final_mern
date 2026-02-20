/**
 * Cart Page - Shopping Cart with Checkout
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartService, CartItem as CartItemType } from '../../models/cart';
import { OrderModel } from '../../models/order';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setCart(CartService.getCart());
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    CartService.updateQuantity(productId, quantity);
    setCart(CartService.getCart());
  };

  const handleRemove = (productId: string) => {
    CartService.removeFromCart(productId);
    setCart(CartService.getCart());
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    try {
      setLoading(true);
      // TODO: Get userId from AuthContext when auth is implemented
      const userId = 'user123'; // Temporary hardcoded userId

      await OrderModel.create(cart, userId);
      
      // Clear cart after successful order
      CartService.clearCart();
      setCart([]);
      
      alert('Order created successfully!');
      navigate('/orders');
    } catch (error: unknown) {
      alert('Failed to create order: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/products')}>Continue Shopping</button>
        <button onClick={() => navigate('/orders')} style={{ marginLeft: '10px' }}>My Orders</button>
      </div>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button onClick={() => navigate('/products')}>Start Shopping</button>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}

          <div style={{ 
            marginTop: '20px', 
            padding: '20px', 
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <h3>Cart Summary</h3>
            <p style={{ fontSize: '18px' }}>
              <strong>Total Items:</strong> {totalItems}
            </p>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              style={{ 
                padding: '12px 30px',
                fontSize: '16px',
                background: loading ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
