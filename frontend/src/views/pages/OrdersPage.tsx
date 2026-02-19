/**
 * Orders Page - User Order History
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../../models/api';
import { IOrder } from '@ligue-sportive/shared';
import OrderItem from '../components/OrderItem';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Array<IOrder & { _id: string; createdAt: Date }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      // TODO: Get userId from AuthContext when auth is implemented
      const userId = 'user123'; // Temporary hardcoded userId
      const data = await ApiService.getOrders(userId);
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading orders...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>My Orders</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/products')}>Back to Products</button>
        <button onClick={() => navigate('/cart')} style={{ marginLeft: '10px' }}>View Cart</button>
      </div>

      {orders.length === 0 ? (
        <div>
          <p>No orders yet.</p>
          <button onClick={() => navigate('/products')}>Start Shopping</button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
