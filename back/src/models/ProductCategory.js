const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
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
  return ProductCategory;
};
