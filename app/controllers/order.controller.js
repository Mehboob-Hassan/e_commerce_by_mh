import Order from '../models/order.model.js';

const createOrder = async (req, res, next) => {
    console.log("Hitting API", req.user);

    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ error: 'No order items' });
        }

        const order = new Order({
            user: req.user.id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json({message: "Order Placed Successfully", updatedOrder});
    } catch (err) {
        next(err);
    }
};



const updateOrderStatus = async (req, res, next) => {
    try {
        const { isPaid, isDelivered } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        if (isPaid) {
            order.isPaid = true;
            order.paidAt = new Date();
        }

        if (isDelivered) {
            order.isDelivered = true;
            order.deliveredAt = new Date();
        }

        const updatedOrder = await order.save();
        res.json({message: "Order Updated Successfully", updatedOrder});
    } catch (err) {
        next(err);
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) return res.status(404).json({ error: 'Order not found' });

        // Allow only user who placed order or admin
        if (order.user._id.toString() !== req.user.id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ error: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { createOrder, updateOrderStatus, getAllOrders, getOrderById };