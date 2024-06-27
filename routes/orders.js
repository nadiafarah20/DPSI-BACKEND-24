// routes/orders.js

const express = require('express');
const router = express.Router();
const { Order } = require('../models');

// POST create a new order
router.post('/', async (req, res, next) => {
    try {
        const { customerID, firstName, employeeID, orderDate, shipperID } = req.body;
        const newOrder = await Order.create({ customerID, firstName, employeeID, orderDate, shipperID });
        res.status(201).json(newOrder);
    } catch (err) {
        next(err);
    }
});

// GET all orders
router.get('/', async (req, res, next) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (err) {
        next(err);
    }
});

// GET order by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        next(err);
    }
});


// PUT update an order by ID
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { customerID, firstName, employeeID, orderDate, shipperID } = req.body;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.update({ customerID, firstName, employeeID, orderDate, shipperID });
        res.json(order);
    } catch (err) {
        next(err);
    }
});

// DELETE order by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
