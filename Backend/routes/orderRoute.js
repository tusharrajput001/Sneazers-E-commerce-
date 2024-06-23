const express = require("express");
const Order = require("../Models/order.model");
const router = express.Router();

// Create an order
// Create an order with logging
router.post("/orders", async (req, res) => {
  try {
    console.log("Order request received:", req.body);
    const { userId, items, totalAmount } = req.body;
    const newOrder = new Order({ userId, items, totalAmount });
    const savedOrder = await newOrder.save();
    console.log("Order saved:", savedOrder);
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ message: err.message });
  }
});


// Get orders for a user
router.get("/orders/:userId", async (req, res) => {
  try {
    console.log("Fetching orders for userId:", req.params.userId);
    const orders = await Order.find({ userId: req.params.userId });
    console.log("Orders fetched:", orders);
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
