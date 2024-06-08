const express = require("express");
const cors = require("cors");
const router = express.Router();
const RegisterModel = require("../models/Register.model");

router.use(cors());

// Registration route
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Password during registration:", password); // Debug log
    const register = await RegisterModel.create({ name, email, password });
    console.log("Saved user:", register); // Debug log
    res.json(register);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all data
router.get("/", async (req, res) => {
  try {
    const registers = await RegisterModel.find({});
    res.json(registers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await RegisterModel.findOne({ email: email });
    if (user) {
      console.log("User found:", user); // Debug log
      console.log("Password entered by user:", password); // Debug log
      console.log("Password stored in database:", user.password); // Debug log

      if (password === user.password) {
        res.json("Success");
      } else {
        res.json("Failed");
      }
    } else {
      res.json("Not registered");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
