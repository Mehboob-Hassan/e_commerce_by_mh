import Router from 'express';
import { createStripeCheckout } from '../controllers/payment.controller.js';
const router = Router();

router.post('/create-checkout-session', createStripeCheckout);

export default router;