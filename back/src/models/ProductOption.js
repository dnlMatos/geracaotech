import { DataTypes } from "sequelize";
import sequelize from "../connection/connection.js";

const ProductOption = sequelize.define(
  "product_options",
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
      defaultValue: "square",
    },
    radius: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM("text", "color"),
      defaultValue: "text",
    },
    option_values: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

export default ProductOption;
