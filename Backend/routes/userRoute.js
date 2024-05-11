const express = require("express");
//Model import
const RegisterModel = require("../Models/Register.model");
// Router Import
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const register = await RegisterModel.create(req.body);
    res.json(register);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// registration data (SignUp)
router.post("/", async (req, res) => {
  try {
    const register = await RegisterModel.create(req.body);
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

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await RegisterModel.findOne({ email: email });
    if (user && user.password === password) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
