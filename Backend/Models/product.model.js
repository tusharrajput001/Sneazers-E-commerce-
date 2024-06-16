const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  image: String,
  image2: String,
  brand: String, 
  name: String,
  price: String,
  category: String,
  description: String,
  orderAddedDate: {
    type: Date,
  },
});

// Define a pre-save middleware to set the orderAddedDate only if it's a new document
ProductSchema.pre('save', function(next) {
  if (!this.isNew || this.orderAddedDate) {
    return next();
  }
  this.orderAddedDate = new Date();
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
