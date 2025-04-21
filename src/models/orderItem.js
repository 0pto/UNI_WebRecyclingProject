import { DataTypes } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

const OrderItem = sequelizeConnector.define(
  "orderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stockID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "orderItemsTable",
    timestamps: false,
  }
);

export default OrderItem;
