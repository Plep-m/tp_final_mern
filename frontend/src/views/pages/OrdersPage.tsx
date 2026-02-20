/**
 * Orders Page
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderModel } from '../../models/order';
import { IOrder } from '@ligue-sportive/shared';
import OrderItem from '../components/OrderItem';

const OrdersPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => { loadOrders(); }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await OrderModel.getAll();
      setOrders(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-state">Chargement des commandes...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">📦 Mes commandes</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <div className="empty-state-text">Aucune commande pour l'instant</div>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Commencer mes achats
          </button>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
