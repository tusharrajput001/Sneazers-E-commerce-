const express = require("express");
const Order = require("../Models/order.model");
const router = express.Router();

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

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('items.productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
