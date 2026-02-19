/**
 * Order Routes
 */

import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const router = Router();

// Temporarily remove auth middleware for testing
// TODO: Add authMiddleware when Auth is implemented
router.post('/', OrderController.createOrder);
router.get('/', OrderController.getUserOrders);
router.get('/:id', OrderController.getOrderById);

export default router;
