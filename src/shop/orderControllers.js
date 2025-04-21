import Order from "../models/Order.js";
import OrderItem from "../models/orderItem.js";
import Stock from "../models/Stock.js";

export const createOrder = async (req, res) => {
  const { userID, totalAmount, status, createdAt, items } = req.body;

  try {
    // Start a transaction
    const transaction = await Order.sequelize.transaction();

    try {
      // Create order
      const order = await Order.create(
        {
          userID,
          totalAmount,
          status,
          createdAt,
        },
        { transaction }
      );

      // Create order items and update stock
      for (const item of items) {
        // Create order item
        await OrderItem.create(
          {
            orderID: order.id,
            stockID: item.id,
            quantity: item.quantity,
            unitPrice: item.price,
          },
          { transaction }
        );

        // Update stock
        const stock = await Stock.findByPk(item.id, { transaction });
        if (!stock || stock.stockQuantity < item.quantity) {
          throw new Error(`Insufficient stock for product ID ${item.id}`);
        }
        await stock.update(
          { stockQuantity: stock.stockQuantity - item.quantity },
          { transaction }
        );
      }

      // Commit transaction
      await transaction.commit();
      res.json({ message: "Order placed successfully" });
    } catch (error) {
      // Rollback transaction on error
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
};
