'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.Product, {
                through: 'Product_Cart',
                foreignKey: 'CartID',
                as: 'products'
            });
            this.belongsTo(models.User, {
                foreignKey: 'UserID',
                as: 'user'
            });
        }

    }
    Cart.init({
        CartID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Qty: DataTypes.INTEGER,
        Total_Price: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Cart',
        timestamps: false, // disable automatic createdAt/updatedAt fields
    });
    return Cart;
};