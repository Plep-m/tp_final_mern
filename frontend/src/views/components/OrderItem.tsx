/**
 * OrderItem Component
 * Displays individual order with items and details
 */

import { IOrder, OrderStatus } from '@ligue-sportive/shared';

interface OrderItemProps {
  order: IOrder;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return '#ffc107';
      case OrderStatus.CONFIRMED: return '#28a745';
      case OrderStatus.CANCELLED: return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div 
      style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        marginBottom: '15px',
        borderRadius: '8px',
        background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      {/* Order Header */}
      <div style={{ 
        marginBottom: '15px',
        paddingBottom: '15px',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ fontSize: '14px', color: '#666' }}>Order ID:</strong>
            <br />
            <span style={{ fontSize: '12px', fontFamily: 'monospace' }}>{order._id}</span>
          </div>
          
          <span 
            style={{ 
              padding: '5px 15px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'white',
              background: getStatusColor(order.status)
            }}
          >
            {order.status}
          </span>
        </div>
        
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}
        </div>
      </div>

      {/* Order Items */}
      <div style={{ marginBottom: '15px' }}>
        <strong style={{ fontSize: '15px', marginBottom: '10px', display: 'block' }}>
          Items:
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {order.items.map((item, index) => (
            <li key={index} style={{ padding: '5px 0' }}>
              <strong>{item.productName}</strong> 
              <span style={{ color: '#666' }}> × {item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Summary */}
      <div style={{ 
        paddingTop: '15px',
        borderTop: '1px solid #eee',
        fontSize: '16px'
      }}>
        <strong>Total Items:</strong> 
        <span style={{ marginLeft: '10px', fontSize: '18px', color: '#28a745' }}>
          {order.totalAmount}
        </span>
      </div>
    </div>
  );
};

export default OrderItem;
