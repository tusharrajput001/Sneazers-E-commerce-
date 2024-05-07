const express = require("express");
const RegisterModel = require("../Models/Register.model");
// Router Import
const router = express.Router();

// registration data
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
    if (user) {
      if (user.password === password) {
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
