const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  image: String,
  brand: String, 
  name: String,
  price: String,
  category: String,
  orderAddedDate: {
    type: Date,
  }
});

// Define a pre-save middleware to set the orderAddedDate only if it's a new document
ProductSchema.pre('save', function(next) {
  if (!this.isNew || this.orderAddedDate) {
    // If the document is not new or the orderAddedDate is already set, skip setting it
    return next();
  }
  this.orderAddedDate = new Date();
  next();
});



module.exports = mongoose.model("Product", ProductSchema);
