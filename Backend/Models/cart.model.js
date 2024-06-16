const mongoose = require("mongoose");

// Cart Schema
const cartSchema = new mongoose.Schema({
  userId: String,
  items: Array,
});

// Model
module.exports = mongoose.model("Cart", cartSchema);
