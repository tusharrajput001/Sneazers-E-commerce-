const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: String,
  brand: String, 
  name: String,
  price: String,
  category: String,
  orderAddedDate: {
    type: Date, // Store date and time
    required: true // Ensure orderAddedDate is always provided
  }
});

module.exports = mongoose.model("Product", ProductSchema);
