// routes/employees.js

const express = require('express');
const router = express.Router();
const { Employee } = require('../models'); // Pastikan Anda mengimpor model Employee dengan benar


// POST /employees - Menambahkan karyawan baru
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body); // Log request body
        const { lastName, firstName, birthDate, photo, notes } = req.body;
        
        const newEmployee = await Employee.create({ lastName, firstName, birthDate, photo, notes });
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (err) {
        next(err);
    }
});

// GET /employees - Mendapatkan daftar semua karyawan
router.get('/', async (req, res, next) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (err) {
        next(err);
    }
});

// GET /employees/:id - Mendapatkan detail karyawan berdasarkan ID
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        next(err);
    }
});

// PUT /employees/:id - Mengupdate karyawan berdasarkan ID
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { lastName, firstName, birthDate, photo, notes } = req.body;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        // Update atribut karyawan
        employee.lastName = lastName;
        employee.firstName = firstName;
        employee.birthDate = birthDate;
        employee.photo = photo;
        employee.notes = notes;

        await employee.save(); // Simpan perubahan
        res.json({ message: 'Employee updated successfully', employee });
    } catch (err) {
        next(err);
    }
});

// DELETE /employees/:id - Menghapus karyawan berdasarkan ID
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        await employee.destroy(); // Hapus karyawan
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
