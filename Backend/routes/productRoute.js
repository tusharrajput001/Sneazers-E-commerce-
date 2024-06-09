const express = require("express");
const ProductModel = require("../Models/product.model");
const router = express.Router();

// Route to add a new product
router.post("/addProduct", async (req, res) => {
  const { image, brand, name, price } = req.body;
  try {
    const product = new ProductModel({ image, brand, name, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all products
router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
