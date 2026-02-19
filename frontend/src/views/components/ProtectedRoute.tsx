/**
 * Protected Route Component
 * TODO: Implement route protection with authentication check
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthController';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  // TODO: Implement:
  // - Check if user is authenticated
  // - Check if admin role required
  // - Redirect to /login if not authenticated
  // - Redirect to /products if not admin

  return <div>Protected Route - TODO: Implement</div>;
};

export default ProtectedRoute;
