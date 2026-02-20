/**
 * Protected Route Component
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthController';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { token, user, isAdmin, isLoading } = useAuth();

  // Show loading state while auth is initializing
  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  // Check if user is authenticated
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if admin role required
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/products" replace />;
  }

  // User is authorized
  return <>{children}</>;
};

export default ProtectedRoute;