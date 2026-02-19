/**
 * Auth Middleware
 * Verifies JWT token and attaches user to request
 * TODO: Implement JWT verification middleware
 */

import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: Implement JWT token verification
  // 1. Extract token from Authorization header
  // 2. Verify token with jwt.verify()
  // 3. Attach decoded user to req.user
  // 4. Call next() if valid, return 401 if invalid
  
  res.status(501).json({ message: 'Auth middleware not implemented' });
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: Check if req.user.role === ADMIN
  // Return 403 if not admin
  
  res.status(501).json({ message: 'Admin middleware not implemented' });
};
