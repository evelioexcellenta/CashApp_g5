'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasOne(models.Cart, {
                foreignKey: 'UserID',
                as: 'cart'
            });
            this.hasMany(models.Order, {
                foreignKey: 'UserID',
                as: 'orders'
            });
        }

    }
    User.init({
        UserID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Fullname: DataTypes.STRING,
        Username: DataTypes.STRING,
        Email: DataTypes.STRING,
        Password: DataTypes.STRING,
        Role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        timestamps: false, // disable automatic createdAt/updatedAt fields

    });
    return User;
};