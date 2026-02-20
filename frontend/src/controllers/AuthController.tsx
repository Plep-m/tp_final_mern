/**
 * Auth Controller - Authentication Context
 * TODO: Implement auth state management with React Context
 * TEMPORARY: Bypass provider to allow routing without auth
 */

import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Implement full auth logic when needed
  // For now, just render children without auth state
  
  return <>{children}</>;
};

export const useAuth = () => {
  // TODO: Return actual context when auth is implemented
  // For now, return dummy values to avoid errors
  return {
    user: null,
    token: null,
    login: async () => {},
    logout: () => {},
    isAdmin: () => false,
  };
};