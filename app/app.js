import express from 'express';
const app = express();
import userRouter from './routes/user.routes.js';
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import stripeRouter from "./routes/stripe.routes.js";
import manageRouter from "./routes/manage.routes.js";

import errorHandler from './middleware/error.handler.js';
import { authenticateUser } from './middleware/authenticate.js';
import { stripeWebhook } from './controllers/stripe.controller.js';


app.use('/api/v1/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook);


app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/stripe', authenticateUser, stripeRouter);
app.use('/api/v1/product', authenticateUser, productRouter);
app.use('/api/v1/order', authenticateUser, orderRouter);

app.use('/api/v1/manage', manageRouter);


app.use(errorHandler);
export default app;