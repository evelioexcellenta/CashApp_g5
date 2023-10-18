"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: "CategoryID",
        as: "category",
      })
      this.belongsToMany(models.Cart, {
        through: "Product_Cart",
        foreignKey: "ProductID",
        as: "carts",
      })
      this.belongsTo(models.User, { foreignKey: "UserID" })
    }
  }
  Product.init(
    {
      ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Product_Name: DataTypes.STRING,
      Price: DataTypes.INTEGER,
      Description: DataTypes.STRING,
      CategoryID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: false, // disable automatic createdAt/updatedAt fields
    }
  )
  return Product
}
