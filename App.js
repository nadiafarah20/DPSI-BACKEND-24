// app.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var customersRouter = require('./routes/customers');
var employeesRouter = require('./routes/employees');
var ordersRouter = require('./routes/orders');
var orderDetailsRouter = require('./routes/orderDetails');
var authRouter = require('./routes/auth');

var { sequelize } = require('./models'); // Impor sequelize dari models/index.js
var shippersRouter = require('./routes/shippers');
var suppliersRouter = require('./routes/suppliers');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads')); // Middleware untuk menyajikan file statis

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/customers', customersRouter);
app.use('/employees', employeesRouter);
app.use('/suppliers', suppliersRouter);
app.use('/shippers', shippersRouter);
app.use('/orders', ordersRouter);
app.use('/orderDetails', orderDetailsRouter);


sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });


module.exports = app;
