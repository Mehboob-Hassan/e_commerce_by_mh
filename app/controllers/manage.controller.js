import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const getStats = async (req, res, next) => {
    try {
        const [totalOrders, paidOrders, totalUsers, totalProducts] = await Promise.all([
            Order.countDocuments(),
            Order.countDocuments({ isPaid: true }),
            User.countDocuments(),
            Product.countDocuments()
        ]);

        const salesData = await Order.aggregate([
            { $match: { isPaid: true } },
            { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } }
        ])

        const totalSales = salesData[0].totalSales || 0;

        res.status(200).json({
            totalSales,
            totalOrders,
            totalUsers,
            totalProducts,
            paidOrders,
            unpaidOrders: totalOrders - paidOrders
        })

    } catch (error) {
        next(error);
    }
}

export { getStats }