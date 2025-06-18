const sequelize = require("../config/database");
const ProductModel = require("./product");
const User = require("./user");
const CategoryModel = require("./category");
const ProductCategoryModel = require("./productCategory");

// Associations
// ProductCategoryModel.hasMany(ProductModel, {
//   foreignKey: "product_id",
//   otherKey: "category_id",
//   as: "product_categories",
// });
// ProductModel.belongsTo(ProductCategoryModel, {
//   foreignKey: "product_id",
//   otherKey: "category_id",
//   as: "product_categories",
// });

// CategoryModel.hasMany(ProductCategoryModel, {
//   foreignKey: "category_id",
//   otherKey: "product_id",
//   as: "product_categories",
// });
// ProductCategoryModel.belongsTo(CategoryModel, {
//   foreignKey: "category_id",
//   otherKey: "product_id",
//   as: "product_categories",
// });

module.exports = {
  sequelize,
  CategoryModel,
  ProductModel,
  ProductCategoryModel,
};
