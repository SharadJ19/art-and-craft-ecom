const asyncHandler = require('express-async-handler');
const db = require('../models');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { items } = req.body;

    if (!items || items.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }

    // Check stock first
    for (const item of items) {
        const product = await db.Product.findByPk(item.id);
        if (!product || product.stock < item.quantity) {
            res.status(400);
            throw new Error(`Not enough stock for ${product?.name || 'product'}`);
        }
    }

    // Create order
    const order = await db.Order.create({
        userId: req.user.id,
        total: req.body.total,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod
    });

    // Create order items
    const orderItems = items.map(item => ({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        price: item.price
    }));

    await db.OrderItem.bulkCreate(orderItems);

    // Update product stock
    for (const item of items) {
        await db.Product.decrement('stock', {
            by: item.quantity,
            where: { id: item.id }
        });
    }

    res.status(201).json(order);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await db.Order.findByPk(req.params.id, {
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
                    attributes: ['id', 'name', 'imageUrl']
                }
            }
        ]
    });

    if (order) {
        if (order.userId === req.user.id || req.user.isAdmin) {
            res.json(order);
        } else {
            res.status(401);
            throw new Error('Not authorized to view this order');
        }
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    try {
      const orders = await db.Order.findAll({
        where: { userId: req.user.id },
        include: {
          model: db.OrderItem,
          as: 'items',
          include: {
            model: db.Product,
            as: 'product',
            attributes: ['id', 'name', 'imageUrl']
          }
        },
        order: [['createdAt', 'DESC']]
      });
      //console.log('Fetched Orders:', orders);  // Debug: Check the fetched orders
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Error fetching orders' });
    }
  });
  

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await db.Order.findAll({
        include: [
            {
                model: db.User,
                as: 'user',
                attributes: ['id', 'name']
            },
            {
                model: db.OrderItem,
                as: 'items'
            }
        ],
        order: [['createdAt', 'DESC']]
    });
    res.json(orders);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await db.Order.findByPk(req.params.id);

    if (order) {
        order.status = 'Completed';
        await order.save();

        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

module.exports = {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToDelivered
};