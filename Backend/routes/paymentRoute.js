const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/createOrder', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
    currency: 'INR',
    receipt: `receipt_order_${Math.random() * 10}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
