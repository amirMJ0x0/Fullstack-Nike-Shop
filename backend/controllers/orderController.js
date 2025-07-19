const Order = require('../models/Order.js');
const Product = require('../models/Product.js');
const { generateOrderNumber } = require('../utils/generateOrderNumber.js');

// Create a new order
const createOrder = async (req, res) => {
    const orderNumber = await generateOrderNumber();
    if (!req.body.deliveryDate) {
        return res.status(400).json({ message: "Delivery date must be at least 2 days from now" });
    }

    try {
        const order = new Order({
            user: req.user.id,
            orderNumber,
            ...req.body,
        });
        await order.save();
        await order.populate({ path: "items.product", select: "name price imageUrl" });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("items.product")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate({
            path: "items.product",
            model: "Product",
            select: "name price imageUrl",
        });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { createOrder, getOrders, getOrderById }