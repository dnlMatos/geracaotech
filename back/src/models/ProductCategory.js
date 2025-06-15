import sequelize from "../connection/connection.js";
import { DataTypes, Model } from "sequelize";

class ProductCategory extends Model {}

ProductCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products", // Use o nome da tabela em vez da classe diretamente
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories", // Use o nome da tabela em vez da classe diretamente
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

// Product.belongsToMany(Category, {
//   through: ProductCategory,
//   foreignKey: "product_id",
// });
// Category.belongsToMany(Product, {
//   through: ProductCategory,
//   foreignKey: "category_id",
// });

// Product.hasMany(ProductCategory, { foreignKey: "product_id" });
// ProductCategory.belongsTo(Product, { foreignKey: "product_id" });
// Category.hasMany(ProductCategory, { foreignKey: "category_id" });
// ProductCategory.belongsTo(Category, { foreignKey: "category_id" });

export default ProductCategory;
