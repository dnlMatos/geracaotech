const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProductOption = sequelize.define(
    "ProductOption",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shape: {
        type: DataTypes.ENUM("square", "circle"),
        allowNull: true,
        defaultValue: "square",
      },
      radius: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.ENUM("text", "color"),
        allowNull: true,
        defaultValue: "text",
      },
      values: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "product_options",
    }
  );
  return ProductOption;
};
