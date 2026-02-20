/**
 * Order Routes
 */

import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, OrderController.createOrder);
router.get('/', authMiddleware, OrderController.getUserOrders);
router.get('/:id', authMiddleware, OrderController.getOrderById);

export default router;
