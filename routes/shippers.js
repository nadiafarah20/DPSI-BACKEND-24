// routes/shippers.js

const express = require('express');
const router = express.Router();
const { Shipper } = require('../models');

// POST create a new shipper
router.post('/', async (req, res, next) => {
    try {
        const { shipperName, phone } = req.body;
        const newShipper = await Shipper.create({ shipperName, phone });
        res.status(201).json(newShipper);
    } catch (err) {
        next(err);
    }
});

// GET all shippers
router.get('/', async (req, res, next) => {
    try {
        const shippers = await Shipper.findAll();
        res.json(shippers);
    } catch (err) {
        next(err);
    }
});

// GET shipper by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const shipper = await Shipper.findByPk(id);
        if (!shipper) {
            return res.status(404).json({ message: 'Shipper not found' });
        }
        res.json(shipper);
    } catch (err) {
        next(err);
    }
});

// PUT update a shipper by ID
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { shipperName, phone } = req.body;
        const shipper = await Shipper.findByPk(id);
        if (!shipper) {
            return res.status(404).json({ message: 'Shipper not found' });
        }
        await shipper.update({ shipperName, phone });
        res.json(shipper);
    } catch (err) {
        next(err);
    }
});

// DELETE shipper by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const shipper = await Shipper.findByPk(id);
        if (!shipper) {
            return res.status(404).json({ message: 'Shipper not found' });
        }
        await shipper.destroy();
        res.json({ message: 'Shipper deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
