// app.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const userRoute = require("./routes/userRoute");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.URI, {})
  .then(() => {
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log("running successfully at", process.env.PORT || 8000);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(userRoute);
