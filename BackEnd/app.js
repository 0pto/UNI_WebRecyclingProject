//Databse details for mySqlWorkbench:

//Connection name: Any
//Hostname: databasenameuni.cvmsu4mg4swj.eu-west-2.rds.amazonaws.com
//Username: admin
//Password Recycle999=

const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database connection using .env variables
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    connectTimeout: 30000, // 30 seconds timeout
  },
});

// Define Models
// Stock Table
const Stock = sequelize.define(
  "Stock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Stock",
    timestamps: false,
  }
);

// Users Table
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);

// Orders Table
const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Shipped", "Delivered"),
      defaultValue: "Pending",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "Orders",
    timestamps: false,
  }
);

// OrderItems Table
const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id",
      },
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Stock",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "OrderItems",
    timestamps: false,
  }
);

// Define Relationships
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Stock.hasMany(OrderItem, { foreignKey: "stock_id" });
OrderItem.belongsTo(Stock, { foreignKey: "stock_id" });

// Set up Express server
const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// API Endpoints
// Get all stock items
app.get("/api/stock", async (req, res) => {
  try {
    const stockItems = await Stock.findAll();
    res.json(stockItems);
  } catch (error) {
    console.error("Error fetching stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new order
app.post("/api/orders", async (req, res) => {
  const { user_id, items } = req.body; // Expect user_id and items array [{ stock_id, quantity }]

  try {
    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const stockItem = await Stock.findByPk(item.stock_id);
      if (!stockItem) {
        return res
          .status(404)
          .json({ error: `Stock item with ID ${item.stock_id} not found` });
      }
      if (stockItem.stock_quantity < item.quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for item ${stockItem.name}` });
      }
      totalAmount += stockItem.price * item.quantity;
    }

    // Create the order
    const order = await Order.create({
      user_id,
      total_amount: totalAmount,
      status: "Pending",
    });

    // Create order items and update stock
    for (const item of items) {
      const stockItem = await Stock.findByPk(item.stock_id);
      await OrderItem.create({
        order_id: order.id,
        stock_id: item.stock_id,
        quantity: item.quantity,
        unit_price: stockItem.price,
      });
      // Update stock quantity
      stockItem.stock_quantity -= item.quantity;
      await stockItem.save();
    }

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to AWS RDS database has been established successfully."
    );
    await sequelize.sync({ force: false }); // Sync models with the database
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
