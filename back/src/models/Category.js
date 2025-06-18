const { DataTypes } = require("sequelize");
const database = require("../config/database");

class CategoryModel {
  constructor() {
    this.model = database.define(
      "Category",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
          allowNull: true,
          defaultValue: false,
        },
      },
      {
        timestamps: true,
        underscored: true,
        tableName: "categories",
      }
    );
  }
}

module.exports = new CategoryModel().model;
