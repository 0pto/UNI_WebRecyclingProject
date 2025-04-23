import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import sequelizeConnector from "./database/dbConnection.js";

import User from "./models/users.js";
import Post from "./models/posts.js";
import { SingleBooking, MultiBooking } from "./models/Bookings.js";
import Ticket from "./models/tickets.js";
import Stock from "./models/Stock.js";
import Order from "./models/Order.js";
import OrderItem from "./models/OrderItem.js";

import usersRouter from "./users/routes.js";
import usersPostsRouter from "./users/usersPosts/postsRoutes.js";
import quoteRouter from "./quotes/routes.js";
import usersTicketsRouter from "./users/usersTickets/ticketsRoutes.js";
import usersBookingsRouter from "./users/usersBookings/bookingsRoutes.js";
import stockRouter from "./shop/stockRoutes.js";
import orderRouter from "./shop/orderRoutes.js";

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "x-is-admin",
      "X-Is-Admin",
      "Authorization",
    ], // Add Authorization
  })
);
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ limit: 52428800, extended: true }));
app.use(
  "/images",
  express.static(
    path.join(__dirname, "../../../UNI_WebRecyclingProject/Assets/Images")
  )
);

//Set all routes
app.use("/user", usersRouter);
app.use("/", usersPostsRouter);
app.use("/quotes", quoteRouter);
app.use("/", usersTicketsRouter);
app.use("/", usersBookingsRouter);
app.use("/", stockRouter);
app.use("/", orderRouter);

// Define Relationships between models
User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(MultiBooking, { foreignKey: "userid" });
MultiBooking.belongsTo(User, { foreignKey: "userid" });

User.hasMany(SingleBooking, { foreignKey: "userid" });
SingleBooking.belongsTo(User, { foreignKey: "userid" });

User.hasMany(Ticket, { foreignKey: "account" });
Ticket.belongsTo(User, { foreignKey: "account" });

User.hasMany(Order, { foreignKey: "userID" });
Order.belongsTo(User, { foreignKey: "userID" });

Order.hasMany(OrderItem, { foreignKey: "orderID" });
OrderItem.belongsTo(Order, { foreignKey: "orderID" });
OrderItem.belongsTo(Stock, { foreignKey: "stockID" });

//Synch Models to database.
sequelizeConnector
  .sync()
  .then((result) => {
    console.log(`Models successfully synched with mysql table: ${result}`);
  })
  .catch((err) => {
    console.log(`Error whilst synching models to database: ${err}`);
  });

//Set the port to run the app.
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
