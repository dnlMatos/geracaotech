const { DataTypes } = require("sequelize");
const database = require("../config/database");
const ProductModel = require("./product");

class ProductOptionModel {
  constructor() {
    this.model = database.define(
      "ProductOption",
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
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        shape: {
          type: DataTypes.ENUM("square", "circle"),
          allowNull: true,
          defaultValue: "square",
        },
        radius: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        type: {
          type: DataTypes.ENUM("text", "color"),
          allowNull: true,
          defaultValue: "text",
        },
        values: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        underscored: true,
        tableName: "product_options",
      }
    );

    this.model.belongsTo(ProductModel, {
      foreignKey: "product_id",
    });

    ProductModel.hasMany(this.model, {
      foreignKey: "product_id",
    });
  }
}

module.exports = new ProductOptionModel().model;
