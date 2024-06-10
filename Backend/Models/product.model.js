const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: String,
  brand: String, 
  name: String,
  price: String,
  category: String, 
});

module.exports = mongoose.model("Product", ProductSchema);
