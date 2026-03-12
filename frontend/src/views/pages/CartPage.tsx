/**
 * Cart Page
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

  useEffect(() => { setCart(CartService.getCart()); }, []);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    CartService.updateQuantity(productId, quantity);
    setCart(CartService.getCart());
  };

  const handleRemove = (productId: string) => {
    CartService.removeFromCart(productId);
    setCart(CartService.getCart());
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      setLoading(true);
      await OrderModel.create(cart);
      CartService.clearCart();
      setCart([]);
      navigate('/orders');
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Erreur lors de la commande');
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">🛒 Mon panier</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <div className="empty-state-text">Votre panier est vide</div>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Continuer mes achats
          </button>
        </div>
      ) : (
        <>
          <div>
            {cart.map(item => (
              <CartItem
                key={item.productId}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="cart-summary">
            <div>
              <span className="text-muted">Total articles : </span>
              <span className="cart-summary-total">{totalItems}</span>
            </div>
            <button
              className="btn btn-success btn-lg"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Traitement...' : 'Commander'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
