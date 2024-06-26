const express = require("express");
const Order = require("../Models/order.model");
const router = express.Router();

// Create a new order
router.post("/orders", async (req, res) => {
  try {
    const { userId, items, totalAmount, name, email, contact, address } = req.body;
    const newOrder = new Order({ userId, items, totalAmount, name, email, contact, address });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get orders by user ID
router.get("/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status
router.put("/orders/:orderId/status", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Handle return request
router.post("/orders/:orderId/return", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { productId } = req.body;

    // Update the order status to "Return Initiated"
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "Return Initiated" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
