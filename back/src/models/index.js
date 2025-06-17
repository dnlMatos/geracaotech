const sequelize = require("../config/database");
const User = require("./user")(sequelize);
const Category = require("./category")(sequelize);
const Product = require("./product")(sequelize);
const ProductImage = require("./productImage")(sequelize);
const ProductOption = require("./productOption")(sequelize);
const ProductCategory = require("./productCategory")(sequelize);

// Associations
Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: "product_id",
  otherKey: "category_id",
  as: "categories",
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: "category_id",
  otherKey: "product_id",
  as: "products",
});
Product.hasMany(ProductImage, { foreignKey: "product_id", as: "images" });
Product.hasMany(ProductOption, { foreignKey: "product_id", as: "options" });
ProductImage.belongsTo(Product, { foreignKey: "product_id" });
ProductOption.belongsTo(Product, { foreignKey: "product_id" });

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  ProductImage,
  ProductOption,
  ProductCategory,
};
