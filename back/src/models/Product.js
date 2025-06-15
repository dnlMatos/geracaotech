import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/connection.js";
import Category from "./Category.js";
import ProductCategory from "./ProductCategory.js";

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },

  {
    timestamps: true,
    underscored: true,
    sequelize: sequelize,
  }
);

// Product.belongsToMany(Category, {
//   through: {
//     model: ProductCategory,
//   },
//   foreignKey: "product_id",
//   constraints: true,
// });

// Category.belongsToMany(Product, {
//   through: {
//     model: ProductCategory,
//   },
//   foreignKey: "category_id",
//   constraints: true,
// });

// Product.hasMany(ProductCategory, { foreignKey: "product_id" });
// ProductCategory.belongsTo(Product, { foreignKey: "product_id" });
// Category.hasMany(ProductCategory, { foreignKey: "category_id" });
// ProductCategory.belongsTo(Category, { foreignKey: "category_id" });

export default Product;
