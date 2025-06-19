const { DataTypes } = require("sequelize");
const database = require("../config/database");
const ProductModel = require("./product");

class ProductImageModel {
  constructor() {
    this.model = database.define(
      "ProductImage",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: ProductModel,
            key: "id",
          },
        },
        enabled: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "product_images",
      }
    );
  }
}

module.exports = new ProductImageModel().model;
