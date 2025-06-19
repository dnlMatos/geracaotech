const { DataTypes } = require("sequelize");
const database = require("../config/database");
const ProductModel = require("./product");
const CategoryModel = require("./category");

class ProductCategoryModel {
  constructor() {
    this.model = database.define(
      "ProductCategory",
      {
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: ProductModel,
            key: "id",
          },
          primaryKey: true,
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: CategoryModel,
            key: "id",
          },
          primaryKey: true,
        },
      },
      {
        timestamps: false,
        underscored: true,
        tableName: "product_categories",
      }
    );
  }
}

module.exports = new ProductCategoryModel().model;
