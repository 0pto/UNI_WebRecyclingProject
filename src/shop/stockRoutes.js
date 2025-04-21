import express from "express";
import { getAllProducts } from "./stockControllers.js";

const stockRouter = express.Router();

stockRouter.get("/api/products", getAllProducts);

export default stockRouter;
