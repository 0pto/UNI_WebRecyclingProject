import { DataTypes } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

const Stock = sequelizeConnector.define(
  "stock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ImageURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "stockTable",
    timestamps: false,
  }
);

export default Stock;
