// models/orderDetail.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('./index');

module.exports = (sequelize, DataTypes) =>{
const OrderDetail = sequelize.define('OrderDetail', {
    orderDetailID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

return OrderDetail;
}