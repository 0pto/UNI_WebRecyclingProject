import { DataTypes } from "sequelize";
import sequelizeConnector from "../database/dbConnection.js";

// Single-Bookings Table
export const SingleBooking = sequelizeConnector.define(
  "singleBooking",
  {
    singlebookingid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    userid: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    itemtype: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "singleBookings",
    timestamps: false,
  }
);

// Multi-Bookings Table
export const MultiBooking = sequelizeConnector.define(
  "multiBooking",
  {
    multiBookingsid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startdate: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    enddate: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    collectday: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    userid: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    itemtype: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    binsize: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "Medium",
    },
  },
  {
    tableName: "multiBookings",
    timestamps: false,
  }
);
