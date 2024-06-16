const express = require("express");
const CartModel = require("../Models/cart.model");
const router = express.Router();

// Save or Update Cart
router.post("/cart", async (req, res) => {
  const { userId, items } = req.body;
  try {
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      cart.items = items;
    } else {
      cart = new CartModel({ userId, items });
    }

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Error saving cart', error });
  }
});

// Get Cart
router.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await CartModel.findOne({ userId });
    res.status(200).send(cart || { items: [] });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching cart', error });
  }
});

// Remove Item from Cart
router.delete("/cart/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;
  try {
    const cart = await CartModel.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter((item) => item._id !== itemId);
      await cart.save();
    }

    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Error removing item from cart', error });
  }
});

module.exports = router;
