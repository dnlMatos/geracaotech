import { DataTypes } from "sequelize";
import sequelize from "../connection/connection.js";
import ProductImage from "./ProductImage.js";
import ProductOption from "./ProductOption.js";
import ProductCategory from "./ProductCategory.js";
import Category from "./Category.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: [
      {
        type: String,
        default: [],
      },
    ],
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
  }
);

// Associações
Product.hasMany(ProductImage, { as: "images", foreignKey: "product_id" });
ProductImage.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(ProductOption, { as: "options", foreignKey: "product_id" });
ProductOption.belongsTo(Product, { foreignKey: "product_id" });

// Associação muitos-para-muitos correta:
Product.belongsToMany(Category, {
  through: ProductCategory,
  as: "categories",
  foreignKey: "product_id",
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  as: "products",
  foreignKey: "category_id",
});

// Se precisar da relação direta com ProductCategory:
Product.hasMany(ProductCategory, {
  as: "productCategories", // alias diferente!
  foreignKey: "product_id",
});
ProductCategory.belongsTo(Product, { foreignKey: "product_id" });

export default Product;
