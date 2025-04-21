import { DataTypes } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

const Order = sequelizeConnector.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalAmount: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "ordersTable",
    timestamps: false,
  }
);

export default Order;
