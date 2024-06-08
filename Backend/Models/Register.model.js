const mongoose = require("mongoose");


//Schema

const RegisterSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


// Model


module.exports = mongoose.model("registers",RegisterSchema);