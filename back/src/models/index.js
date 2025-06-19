const sequelize = require("../config/database");
const ProductModel = require("./product");
const User = require("./user");
const CategoryModel = require("./category");
const ProductCategoryModel = require("./productCategory");
const ProductImage = require("./ProductImage");
const ProductOption = require("./ProductOption");

// Associations
//MODELO 1 Super N:M
ProductModel.belongsToMany(CategoryModel, {
  through: { model: ProductCategoryModel },
  foreignKey: "product_id",
  otherKey: "category_id",
  as: "product_categories",
});

CategoryModel.belongsToMany(ProductModel, {
  through: { model: ProductCategoryModel },
  foreignKey: "category_id",
  otherKey: "product_id",
  as: "product_categories",
});

ProductModel.hasMany(ProductImage, {
  foreignKey: "product_id",
  as: "product_images",
});

ProductImage.belongsTo(ProductModel, {
  foreignKey: "product_id",
  as: "product_images",
});

ProductModel.hasMany(ProductOption, {
  foreignKey: "product_id",
  as: "product_options",
});

ProductOption.belongsTo(ProductModel, {
  foreignKey: "product_id",
  as: "product_options",
});

module.exports = {
  sequelize,
  CategoryModel,
  ProductModel,
  ProductCategoryModel,
  ProductImage,
  ProductOption,
};
