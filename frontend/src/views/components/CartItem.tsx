/**
 * CartItem Component
 */

import { CartItem as CartItemType } from '../../models/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => (
  <div className="cart-item">
    <div>
      <div className="cart-item-name">{item.productName}</div>
    </div>
    <div className="cart-item-controls">
      <button className="qty-btn" onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}>−</button>
      <span className="qty-value">{item.quantity}</span>
      <button className="qty-btn" onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
      <button className="btn btn-danger btn-sm" style={{ marginLeft: '8px' }} onClick={() => onRemove(item.productId)}>
        Supprimer
      </button>
    </div>
  </div>
);

export default CartItem;
