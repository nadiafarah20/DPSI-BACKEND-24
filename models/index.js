// models/index.js
const { Sequelize, DataTypes } = require('sequelize'); // Pastikan DataTypes diimpor dari sequelize
const sequelize = new Sequelize('onlineshopping_2200016104', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false // Nonaktifkan timestamps secara global
    }
});

const Customer = require('./customer')(sequelize, DataTypes);
const Employee = require('./employee')(sequelize, DataTypes);
const Category = require('./category')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Supplier = require('./supplier')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const Shipper = require('./shipper')(sequelize, DataTypes);
const OrderDetail = require('./orderDetail')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes); // Pastikan User diimpor dengan benar

// Relasi antara model
Customer.hasMany(Order, { foreignKey: 'customerID' });
Order.belongsTo(Customer, { foreignKey: 'customerID' });

Employee.hasMany(Order, { foreignKey: 'employeeID' });
Order.belongsTo(Employee, { foreignKey: 'employeeID' });

Shipper.hasMany(Order, { foreignKey: 'shipperID' });
Order.belongsTo(Shipper, { foreignKey: 'shipperID' });

Supplier.hasMany(Product, { foreignKey: 'supplierID' });
Product.belongsTo(Supplier, { foreignKey: 'supplierID' });

Category.hasMany(Product, { foreignKey: 'categoryID' });
Product.belongsTo(Category, { foreignKey: 'categoryID' });

Order.hasMany(OrderDetail, { foreignKey: 'orderID' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderID' });

Product.hasMany(OrderDetail, { foreignKey: 'productID' });
OrderDetail.belongsTo(Product, { foreignKey: 'productID' });

// Uji koneksi
sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
    })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports = {
    sequelize, // Pastikan sequelize diekspor dengan benar
    User,
    Customer,
    Category,
    Employee,
    Supplier,
    Shipper,
    Product,
    Order,
    OrderDetail
};
