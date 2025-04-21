import Stock from "../models/Stock.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Stock.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
