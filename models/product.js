// models/product.js

module.exports = (sequelize, DataTypes) => {
   const Product = sequelize.define('Product', {
      productID: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      productName: {
         type: DataTypes.STRING,
         allowNull: false
      },
      supplierID: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      categoryID: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      unit: {
         type: DataTypes.STRING,
         allowNull: false
      },
      price: {
         type: DataTypes.DECIMAL(10, 2), // Misalkan harga memiliki presisi 10 digit dan 2 desimal
         allowNull: false
      },
   }, {
      timestamps: true
      
      });
   
   return Product;
}; 