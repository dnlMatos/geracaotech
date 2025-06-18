const { DataTypes } = require("sequelize");
const database = require("../config/database");
const ProductModel = require("./product");

class ProductImageModel {
  constructor() {
    this.model = database.define("ProductImage", {
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
    });

    this.model.belongsToMany(ProductModel, {
      foreignKey: "product_id",
    });

    ProductModel.hasMany(this.model, {
      foreignKey: "product_id",
    });
  }
}

module.exports = new ProductImageModel().model;
