'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { 
            this.hasMany(models.Product, {
                foreignKey: 'CategoryID',
                as: 'products'
            });
        }

    }
    Category.init({
        CategoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Category_Name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Category',
        timestamps: false, // disable automatic createdAt/updatedAt fields
    });
    return Category;
};