import express from "express";
import { createOrder } from "./orderControllers.js";

const orderRouter = express.Router();

orderRouter.post("/api/orders", createOrder);

export default orderRouter;
