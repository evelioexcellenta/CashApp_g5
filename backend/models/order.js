'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'UserID',
                as: 'user'
            });
        }
    }
    Order.init({
        OrderID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Recipient_Name: DataTypes.STRING,
        Total_Price: DataTypes.INTEGER,
        Order_Date: DataTypes.DATE,
        CartID: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Order',
        timestamps: false, // disable automatic createdAt/updatedAt fields
    });
    return Order;
};