/**
 * Protected Route Component
 * TODO: Restore auth checks when AuthController is implemented
 * TEMPORARY: Bypassing auth for development testing
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthController';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  // TODO: Restore authentication check when AuthController is ready
  // const { user, isAdmin } = useAuth();
  // if (!user) return <Navigate to="/login" replace />;
  // if (adminOnly && !isAdmin()) return <Navigate to="/products" replace />;

  // TEMPORARY: Skip all auth checks for development
  return <>{children}</>;
};

export default ProtectedRoute;