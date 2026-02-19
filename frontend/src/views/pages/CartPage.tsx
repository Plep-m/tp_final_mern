/**
 * Cart Page - Shopping Cart with Checkout
 * TODO: Remove dummy data when ProductsPage is ready to add items
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartService, CartItem } from '../../models/cart';
import { ApiService } from '../../models/api';

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cartItems = CartService.getCart();
    
    // TODO: Remove this dummy data when ProductsPage allows adding items
    if (cartItems.length === 0) {
      // Add dummy items for testing
      const dummyItems: CartItem[] = [
        { productId: 'dummy1', productName: 'Football Ball (DUMMY)', quantity: 2 },
        { productId: 'dummy2', productName: 'Swimming Goggles (DUMMY)', quantity: 1 },
      ];
      dummyItems.forEach(item => CartService.addToCart(item));
      setCart(dummyItems);
    } else {
      setCart(cartItems);
    }
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

      await ApiService.createOrder(cart, userId);
      
      // Clear cart after successful order
      CartService.clearCart();
      setCart([]);
      
      alert('Order created successfully!');
      navigate('/orders');
    } catch (error: any) {
      alert('Failed to create order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Shopping Cart</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/products')}>Continue Shopping</button>
        <button onClick={() => navigate('/orders')} style={{ marginLeft: '10px' }}>My Orders</button>
      </div>

      {/* TODO: Remove this warning when ProductsPage is ready */}
      <div style={{ 
        background: '#fff3cd', 
        padding: '10px', 
        marginBottom: '20px',
        border: '1px solid #ffc107',
        borderRadius: '5px'
      }}>
        ⚠️ <strong>TODO:</strong> Dummy data shown. Remove when ProductsPage allows adding items.
      </div>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button onClick={() => navigate('/products')}>Start Shopping</button>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div 
              key={item.productId}
              style={{ 
                border: '1px solid #ddd', 
                padding: '15px', 
                marginBottom: '10px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <strong>{item.productName}</strong>
                <br />
                <small>Product ID: {item.productId}</small>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>
                  -
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>
                  +
                </button>
                <button 
                  onClick={() => handleRemove(item.productId)}
                  style={{ marginLeft: '10px', color: 'red' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            background: '#f8f9fa',
            borderRadius: '5px'
          }}>
            <h3>Cart Summary</h3>
            <p><strong>Total Items:</strong> {totalItems}</p>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              style={{ 
                padding: '10px 20px',
                fontSize: '16px',
                background: loading ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer'
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
