import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripeCheckout = async (req, res, next) => {
    const { orderItems } = req.body;
    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ error: 'No items to checkout' });
    }
    try {
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

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_ur: `${process.env.CLIENT_URL}/cancel`,
            metadata: {
                userId: req.user.id.toString()
            },
        })

        res.json({ url: session.url });

    } catch (error) {
        next();
    }
}



const stripeWebhook = async (req, res, next) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_SECRET_KEY);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.metadata.userId;
        console.log(`💰 Payment received from user ${userId}`);
    }
    res.json({ received: true })
}


export { createStripeCheckout, stripeWebhook }