'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product_Cart extends Model {
        static associate(models) {
            // define association here
        }
    }
    Product_Cart.init({
        CartID: DataTypes.INTEGER,
        ProductID: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product_Cart',
        timestamps: false, // disable automatic createdAt/updatedAt fields

    });
    return Product_Cart;
};