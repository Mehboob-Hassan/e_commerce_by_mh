import Router from 'express';
import express from 'express';
import { createStripeCheckout, stripeWebhook } from '../controllers/stripe.controller.js';
import { authenticateUser } from '../middleware/authenticate.js';
const router = Router();

router.post('/create-checkout-session', authenticateUser, createStripeCheckout);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

export default router;