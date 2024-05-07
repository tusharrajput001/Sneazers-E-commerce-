const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const RegisterModel = require("../Models/Register.model");

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

// registration data
app.post("/", async (req, res) => {
  try {
    const register = await RegisterModel.create(req.body);
    res.json(register);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all data
app.get("/", async (req, res) => {
  try {
    const registers = await RegisterModel.find({});
    res.json(registers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// login
app.post("/login", async (req, res) => {
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

module.exports = app;
