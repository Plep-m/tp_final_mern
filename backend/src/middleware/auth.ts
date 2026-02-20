/**
 * Auth Middleware
 * TODO: Implement JWT verification when Auth is ready
 * TEMPORARY: Skipping auth for development
 */

import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: Implement JWT token verification
  // For now, skip auth to allow Order routes to work
  (req as any).user = { userId: 'temp-user-id', role: 'MEMBER' };
  next();
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: Implement admin check
  // For now, skip check
  next();
};