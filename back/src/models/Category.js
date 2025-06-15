import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/connection.js";
import Product from "./Product.js";
import ProductCategory from "./ProductCategory.js";

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    timestamps: true,
    underscored: true,
    sequelize: sequelize,
  }
);

Product.belongsToMany(Category, {
  through: {
    model: ProductCategory,
  },
  foreignKey: "product_id",
  constraints: true,
});

Category.belongsToMany(Product, {
  through: {
    model: ProductCategory,
  },
  foreignKey: "category_id",
  constraints: true,
});

Product.hasMany(ProductCategory, { foreignKey: "product_id" });
ProductCategory.belongsTo(Product, { foreignKey: "product_id" });
Category.hasMany(ProductCategory, { foreignKey: "category_id" });
ProductCategory.belongsTo(Category, { foreignKey: "category_id" });

export default Category;
