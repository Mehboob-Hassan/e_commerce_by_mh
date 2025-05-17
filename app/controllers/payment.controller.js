import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/order.model.js';
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripeCheckout = async (req, res, next) => {
    const { orderItems, orderId } = req.body;
    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ error: 'No items to checkout' });
    }


    console.log("ORDER ID ", orderId.toString());


    const lineItems = orderItems.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
            },
            unit_amount: Math.round(item.price * 100)
        },
        quantity: item.qty
    }));

    console.log(`${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`);
    console.log(`${process.env.CLIENT_URL}/cancel`)

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            metadata: {
                userId: req.user.id.toString(),
                orderId: orderId.toString()
            },
        })

        // console.log("Inside Body ======>", session);


        res.json({ url: session.url });

    } catch (error) {
        console.log("Error Occured", error);
        next(error);
    }
}



const stripeWebhook = async (req, res, next) => {

    console.log("Inside Web hook");


    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const orderId = session.metadata.orderId;

        console.log("Order Id Be Like ", orderId || "NO ID");
        try {
            if (orderId) {
                await Order.findByIdAndUpdate(orderId, {
                    isPaid: true
                });
            }
        } catch (error) {
            next(error)
        }


        console.log(`💰 Payment received from user ${userId}`);
    }
    res.json({ received: true })
}


export { createStripeCheckout, stripeWebhook }