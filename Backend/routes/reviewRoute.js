const express = require("express");
const Review = require("../Models/review.model"); // Adjust the path as necessary
const router = express.Router();

router.post("/reviews", async (req, res) => {
  try {
    const { productId, userId, rating, reviewText } = req.body;
    const newReview = new Review({ productId, userId, rating, reviewText });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/reviews/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
