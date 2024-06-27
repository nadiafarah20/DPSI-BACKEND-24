// routes/orderDetails.js

const express = require('express');
const router = express.Router();
const { OrderDetail } = require('../models');

// POST create a new order detail
router.post('/', async (req, res, next) => {
    try {
        const { orderID, productID, quantity } = req.body;
        const newOrderDetail = await OrderDetail.create({ orderID, productID, quantity });
        res.status(201).json(newOrderDetail);
    } catch (err) {
        next(err);
    }
});

// GET all order details
router.get('/', async (req, res, next) => {
    try {
        const orderDetails = await OrderDetail.findAll();
        res.json(orderDetails);
    } catch (err) {
        next(err);
    }
});

// GET order detail by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        res.json(orderDetail);
    } catch (err) {
        next(err);
    }
});


// PUT update an order detail by ID
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { orderID, productID, quantity } = req.body;
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        await orderDetail.update({ orderID, productID, quantity });
        res.json(orderDetail);
    } catch (err) {
        next(err);
    }
});

// DELETE order detail by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        await orderDetail.destroy();
        res.json({ message: 'Order detail deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
