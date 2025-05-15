import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            name: String,        // Redundant but useful for history
            qty: Number,
            price: Number,
            image: String,
        },
    ],

    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        enum: ['CashOnDelivery', 'CreditCard', 'PayPal'],
        default: 'CashOnDelivery',
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },

    isPaid: {
        type: Boolean,
        default: false,
    },

    paidAt: {
        type: Date,
    },

    isDelivered: {
        type: Boolean,
        default: false,
    },

    deliveredAt: {
        type: Date,
    },

}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
