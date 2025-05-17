import Router from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrderStatus } from '../controllers/order.controller.js';
import { isAdmin } from '../middleware/admin.check.js';
const router = Router();


router.post('/create', createOrder);
router.put('/update/:id', isAdmin, updateOrderStatus);
router.get('/view', isAdmin, getAllOrders);
router.get('/view/:id',  getOrderById);


export default router