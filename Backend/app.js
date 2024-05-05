const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./Models/Register.model");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Sneazers");

app.post("/register", (req, res) => {
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
    }
    else{
        res.json("Not registered")
    }
  });
});

app.listen(3000, () => {
  console.log("server running....");
});
