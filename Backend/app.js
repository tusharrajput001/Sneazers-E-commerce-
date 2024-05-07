const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoute = require("./Routes/usersRoutes");
const app = express();
dotenv.config();
app.use(cors());        
app.use(express.json());
const DB = "mongodb+srv://devoptushar:sneazerspass@cluster0.xqxgo0w.mongodb.net/sneazers?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) {
        console.log(err);
        process.exit(1); // Exiting the process if unable to listen on port
      }
      console.log("running successfully at", process.env.PORT || 8000);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1); // Exiting the process if unable to connect to the database
  });

app.use(userRoute);
