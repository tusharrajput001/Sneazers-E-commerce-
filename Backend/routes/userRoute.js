const express = require("express");
//Model import
const RegisterModel = require("../Models/Register.model");
// Router Import
const cors = require("cors");
const router = express.Router();
const bcrypt = require("bcrypt");

router.use(cors());

// registration data
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const register = RegisterModel.create({ name, email, password: hash });
      res.json(register);
    })
    .catch((err) => {
      console.log(err.message);
    });
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
// login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  RegisterModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            res.json("The password is incorrect");
          }
          if (response) {
            res.json({ message: "Success", email: user.email });
          } else {
            res.json("The password is incorrect");
          }
        });
      } else {
        res.json("No record existed");
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});


module.exports = router;
