const sequelize = require("../config/database");
const ProductModel = require("./product");
const User = require("./user");
const CategoryModel = require("./category");
const ProductCategoryModel = require("./productCategory");

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

//MODELO 2 Super Many-to-Many
// ProductModel.hasMany(ProductCategoryModel, {
//   foreignKey: "product_id",
//   as: "product_categories",
// });
// CategoryModel.hasMany(ProductCategoryModel, {
//   foreignKey: "category_id",
//   as: "product_categories",
// });
// ProductCategoryModel.belongsToMany(ProductModel, {
//   foreignKey: "product_id",
//   as: "product",
// });
// ProductCategoryModel.belongsTo(CategoryModel, {
//   foreignKey: "category_id",
//   as: "category",
// });

module.exports = {
  sequelize,
  CategoryModel,
  ProductModel,
  ProductCategoryModel,
};
