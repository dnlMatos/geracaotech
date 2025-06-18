const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const database = require("../config/database");

class UserModel {
  constructor() {
    this.model = database.define(
      "User",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        underscored: true,
        tableName: "users",
      }
    );
  }
}

module.exports = new UserModel().model;
