import sequelize from "../connection/connection.js";
import { DataTypes, Model } from "sequelize";
import Product from "./Product.js";
import Category from "./Category.js";

class ProductCategory extends Model {}

ProductCategory.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    underscored: true,
    sequelize: sequelize,
  }
);

export default ProductCategory;
