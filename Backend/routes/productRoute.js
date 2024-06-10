const express = require("express");
const ProductModel = require("../Models/Product.model");
const router = express.Router();

// Route to add a new product
router.post("/addProduct", async (req, res) => {
  const { image, brand, name, price, category } = req.body; // Add category
  try {
    const product = new ProductModel({ image, brand, name, price, category }); // Include category
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

// Route to delete a product
router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a product
router.put("/updateProduct/:id", async (req, res) => {
  const { image, brand, name, price } = req.body;
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { image, brand, name, price },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
