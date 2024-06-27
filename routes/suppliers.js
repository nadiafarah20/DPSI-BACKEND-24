// routes/suppliers.js

const express = require('express');
const router = express.Router();
const { Supplier } = require('../models'); 

// POST create a new supplier
router.post('/', async (req, res, next) => {
    try {
        const { supplierName, contactName, address, city, postalCode, country, phone } = req.body;
        const newSupplier = await Supplier.create({ supplierName, contactName, address, city, postalCode, country, phone });
        res.status(201).json(newSupplier);
    } catch (err) {
        next(err);
    }
});

// GET all suppliers
router.get('/', async (req, res, next) => {
    try {
        const suppliers = await Supplier.findAll();
        res.json(suppliers);
    } catch (err) {
        next(err);
    }
});

// GET supplier by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(supplier);
    } catch (err) {
        next(err);
    }
});

// PUT update a supplier by ID
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { supplierName, contactName, address, city, postalCode, country, phone } = req.body;
        const supplier = await Supplier.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        await supplier.update({ supplierName, contactName, address, city, postalCode, country, phone });
        res.json(supplier);
    } catch (err) {
        next(err);
    }
});

// DELETE supplier by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        await supplier.destroy();
        res.json({ message: 'Supplier deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
