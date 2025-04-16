const asyncHandler = require('express-async-handler');
const db = require('../models');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
    try {
        // Get counts
        const totalProducts = await db.Product.count();
        const totalOrders = await db.Order.count();
        const totalUsers = await db.User.count();

        // Get recent orders with user info
        const recentOrders = await db.Order.findAll({
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: db.OrderItem,
                    as: 'items',
                    include: {
                        model: db.Product,
                        as: 'product',
                        attributes: ['name']
                    }
                }
            ]
        });

        // Format recent orders for frontend
        const formattedOrders = recentOrders.map(order => ({
            id: order.id,
            total: order.total,
            status: order.status,
            createdAt: order.createdAt,
            user: {
                id: order.user.id,
                name: order.user.name,
                email: order.user.email
            },
            items: order.items.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price,
                product: {
                    name: item.product.name
                }
            }))
        }));

        res.json({
            success: true,
            stats: {
                totalProducts,
                totalOrders,
                totalUsers,
                recentOrders: formattedOrders
            }
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching admin stats'
        });
    }
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    try {
        const { status } = req.body;
        const order = await db.Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Validate status
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        order.status = status;
        await order.save();

        res.json({
            success: true,
            order: {
                id: order.id,
                status: order.status,
                updatedAt: order.updatedAt
            }
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating order status'
        });
    }
});

module.exports = {
    getAdminStats,
    updateOrderStatus
};