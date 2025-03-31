const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const cors = require("cors");
const path = require("path");
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
      type: DataTypes.STRING(45),
      allowNull: false,
      field: "productName",
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "stockQUANTITY",
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "IMAGEURL",
    },
  },
  {
    tableName: "stockTable",
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
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      field: "createdAt",
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    house_no: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    town: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    county: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
  },
  {
    tableName: "userTable",
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
      field: "userID",
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "totalAmount",
    },
    status: {
      type: DataTypes.STRING(45),
      defaultValue: "Pending",
      field: "status",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      field: "createdAt",
    },
  },
  {
    tableName: "ordersTable",
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
      field: "orderID",
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "stockID",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "unitPrice",
    },
  },
  {
    tableName: "orderItemsTable",
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
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../Assets/Images")));

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

// Get user by ID
app.get("/api/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      id: user.id,
      first_name: user.first_name,
      surname: user.surname,
      street: user.street,
      house_no: user.house_no,
      town: user.town,
      city: user.city,
      county: user.county,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user by ID
app.put("/api/users/:id", async (req, res) => {
  console.log("PUT /api/users/:id called with ID:", req.params.id);
  console.log("Request body:", req.body);

  const userId = parseInt(req.params.id);
  const {
    first_name,
    surname,
    email,
    phone,
    street,
    house_no,
    town,
    city,
    county,
  } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the new email is already taken by another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        console.log("Email already exists:", email);
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    await user.update({
      first_name,
      surname,
      email,
      phone,
      street,
      house_no,
      town,
      city,
      county,
    });

    console.log("User updated successfully:", userId);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Create a new order
app.post("/api/orders", async (req, res) => {
  const { user_id, items } = req.body;

  if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ error: "Invalid request: user_id and items are required" });
  }

  try {
    // Validate user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate total amount and validate stock
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

    // Add shipping cost (static $5.00)
    totalAmount += 5.0;

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

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ id: user.id, username: user.email, email: user.email });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Register endpoint
app.post("/api/register", async (req, res) => {
  const {
    email,
    password,
    first_name,
    surname,
    street,
    house_no,
    town,
    city,
    county,
    phone,
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = await User.create({
      email,
      password,
      first_name,
      surname,
      street,
      house_no,
      town,
      city,
      county,
      phone,
      created_at: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    console.error("Error registering user:", error);
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
    await sequelize.sync({ force: false });
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
