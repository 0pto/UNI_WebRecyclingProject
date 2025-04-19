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
    createdAt: {
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
    isAdmin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
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

// Multi-Bookings Table
const MultiBooking = sequelize.define(
  "MultiBooking",
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

// Ticket model
const Ticket = sequelize.define(
  "Ticket",
  {
    ticketid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    adminResponce: {
      // Changed from adminResponse to match the database column name
      type: DataTypes.TEXT,
      allowNull: true,
    },
    datetime: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    tableName: "tickets",
    timestamps: false,
  }
);

// Single-Bookings Table
const SingleBooking = sequelize.define(
  "SingleBooking",
  {
    singlebookingid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    datetime: {
      type: DataTypes.STRING(20),
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

// Define Relationships
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Stock.hasMany(OrderItem, { foreignKey: "stock_id" });
OrderItem.belongsTo(Stock, { foreignKey: "stock_id" });

User.hasMany(MultiBooking, { foreignKey: "userid" });
MultiBooking.belongsTo(User, { foreignKey: "userid" });

User.hasMany(SingleBooking, { foreignKey: "userid" });
SingleBooking.belongsTo(User, { foreignKey: "userid" });

// Define Relationships
User.hasMany(Ticket, { foreignKey: "account" });
Ticket.belongsTo(User, { foreignKey: "account" });

// Set up Express server
const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../Assets/Images")));

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
    const user = await User.findByPk(userId); // Use the User model directly (already defined earlier in app.js)
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
      isAdmin: user.isAdmin, // Include isAdmin in the response
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
    password,
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
      ...(password && { password }),
    });

    console.log("User updated successfully:", userId);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Update a ticket (status and adminResponce)
app.put("/api/tickets/:id", async (req, res) => {
  const ticketId = parseInt(req.params.id);
  const { status, adminResponce } = req.body; // Changed from adminResponse

  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    await ticket.update({ status, adminResponce }); // Changed from adminResponse
    res.json({ message: "Ticket updated successfully" });
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Delete a ticket
app.delete("/api/tickets/:id", async (req, res) => {
  const ticketId = parseInt(req.params.id);

  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    await ticket.destroy();
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Delete a ticket
app.delete("/api/tickets/:id", async (req, res) => {
  const ticketId = parseInt(req.params.id);

  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    await ticket.destroy();
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
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
    res.json({
      id: user.id,
      username: user.email,
      email: user.email,
      isAdmin: user.isAdmin, // Include isAdmin
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));

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

// Add API Endpoints for Multi-Bookings
// Get all multi-bookings for a user
app.get("/api/multi-bookings", async (req, res) => {
  const userId = req.query.userId;

  try {
    const bookings = await MultiBooking.findAll({ where: { userid: userId } });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching multi-bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all tickets (secured for admins only)
app.get("/api/tickets", async (req, res) => {
  const isAdmin = req.headers["x-is-admin"] === "true";
  const userId = req.query.userId;

  try {
    let tickets;
    if (isAdmin) {
      // Admins can see all tickets
      tickets = await Ticket.findAll();
    } else {
      // Non-admins can only see their own tickets
      if (!userId) {
        return res
          .status(400)
          .json({ error: "User ID is required for non-admin access" });
      }
      tickets = await Ticket.findAll({ where: { account: userId } });
    }
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a multi-booking
app.put("/api/multi-bookings/:id", async (req, res) => {
  const bookingId = parseInt(req.params.id);
  const { startdate, enddate, collectday, address, itemtype, binsize } =
    req.body;

  try {
    const booking = await MultiBooking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Validate start date (cannot be in the past)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today
    const startDateObj = new Date(startdate);
    if (startDateObj < today) {
      return res
        .status(400)
        .json({ error: "Start date cannot be in the past" });
    }

    // Validate end date (if provided, must be after start date)
    if (enddate) {
      const endDateObj = new Date(enddate);
      if (endDateObj <= startDateObj) {
        return res
          .status(400)
          .json({ error: "End date must be after start date" });
      }
    }

    // Validate itemtype
    const validItemTypes = ["Paper", "Plastic", "Electronics", "Glass"];
    if (!validItemTypes.includes(itemtype)) {
      return res.status(400).json({
        error: "Item type must be one of: Paper, Plastic, Electronics, Glass",
      });
    }

    // Validate binsize
    const validBinSizes = ["Small", "Medium", "Big"];
    if (!validBinSizes.includes(binsize)) {
      return res
        .status(400)
        .json({ error: "Bin size must be one of: Small, Medium, Big" });
    }

    // Calculate price (example logic, adjust as needed)
    const basePrice = 10; // Base price per collection
    const binSizeMultiplier = { Small: 1, Medium: 1.5, Big: 2 };
    const itemTypeMultiplier = {
      Paper: 1,
      Plastic: 1.2,
      Electronics: 1.5,
      Glass: 1.3,
    };
    const price =
      basePrice * binSizeMultiplier[binsize] * itemTypeMultiplier[itemtype];

    await booking.update({
      startdate,
      enddate,
      collectday,
      address,
      itemtype,
      price, // Price is calculated, not taken from user input
      binsize,
    });

    res.json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error("Error updating multi-booking:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Add API Endpoints for Single-Bookings
// Get all single-bookings for a user
app.get("/api/single-bookings", async (req, res) => {
  const userId = req.query.userId;

  try {
    const bookings = await SingleBooking.findAll({ where: { userid: userId } });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching single-bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a single-booking
app.put("/api/single-bookings/:id", async (req, res) => {
  const bookingId = parseInt(req.params.id);
  const { datetime, address, itemtype, price } = req.body;

  try {
    const booking = await SingleBooking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await booking.update({
      datetime,
      address,
      itemtype,
      price,
    });

    res.json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error("Error updating single-booking:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Delete a single-booking
app.delete("/api/single-bookings/:id", async (req, res) => {
  const bookingId = parseInt(req.params.id);

  try {
    const booking = await SingleBooking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await booking.destroy();
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting single-booking:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
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
