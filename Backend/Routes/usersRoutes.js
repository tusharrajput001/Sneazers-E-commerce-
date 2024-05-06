const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const RegisterModel = require("../Models/Register.model");

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

// Route to fetch all data
app.get("/", (req, res) => {
  RegisterModel.find({})
    .then((registers) => res.json(registers))
    .catch((err) => res.json(err));
});



app.post("/", (req, res) => {
  RegisterModel.create(req.body)
    .then((registers) => res.json(registers))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  RegisterModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Failed");
      }
    } else {
      res.json("Not registered");
    }
  });
});

module.exports = app;
