/**
 * CartItem Component
 * Displays individual cart item with quantity controls
 */

import { CartItem as CartItemType } from '../../models/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <div 
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
        <small style={{ color: '#666' }}>Product ID: {item.productId}</small>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button 
          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
          style={{
            padding: '5px 12px',
            fontSize: '16px',
            cursor: 'pointer',
            border: '1px solid #ddd',
            borderRadius: '3px',
            background: '#f8f9fa'
          }}
        >
          -
        </button>
        
        <span style={{ 
          minWidth: '40px', 
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          {item.quantity}
        </span>
        
        <button 
          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
          style={{
            padding: '5px 12px',
            fontSize: '16px',
            cursor: 'pointer',
            border: '1px solid #ddd',
            borderRadius: '3px',
            background: '#f8f9fa'
          }}
        >
          +
        </button>
        
        <button 
          onClick={() => onRemove(item.productId)}
          style={{ 
            marginLeft: '15px',
            padding: '5px 15px',
            color: 'white',
            background: '#dc3545',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
